#!/usr/bin/env bash
set -Eeuo pipefail

# GSP211 - Multiple VPC networks / VM instances / multi-NIC appliance
# Designed for Google Cloud Skills Boost / Qwiklabs Cloud Shell.
# This script is intentionally idempotent for lab practice:
# - It creates missing VPC networks, subnets, firewall rules.
# - It deletes and recreates only the graded VM names to avoid wrong-zone checker failures.
#
# Verified lab placement from this run:
#   REGION_1=us-west1
#   REGION_2=asia-southeast1
#   US_ZONE=us-west1-b
#
# Override when a different lab instance explicitly says another region/zone:
#   export REGION_1=us-west1
#   export REGION_2=asia-southeast1
#   export US_ZONE=us-west1-b
#   ./gsp211_vpc_multinic_lab.sh

log()  { printf '\n\033[1;34m[INFO]\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m[OK]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[WARN]\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31m[FAIL]\033[0m %s\n' "$*" >&2; exit 1; }

PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
[[ -n "${PROJECT_ID}" && "${PROJECT_ID}" != "(unset)" ]] || fail "No active project. Run: gcloud config set project <PROJECT_ID>"

gcloud config set project "${PROJECT_ID}" --quiet >/dev/null

# Lab-specific defaults. Keep these unless the lab page explicitly shows different values.
REGION_1="${REGION_1:-us-west1}"
REGION_2="${REGION_2:-asia-southeast1}"
US_REGION="${US_REGION:-${REGION_1}}"
US_ZONE="${US_ZONE:-us-west1-b}"

log "Project: ${PROJECT_ID}"
log "Lab placement: REGION_1=${REGION_1}, REGION_2=${REGION_2}, US_ZONE=${US_ZONE}"

gcloud config set compute/region "${US_REGION}" --quiet >/dev/null
gcloud config set compute/zone "${US_ZONE}" --quiet >/dev/null

log "Checking Compute Engine API"
gcloud services enable compute.googleapis.com --quiet >/dev/null 2>&1 || warn "Could not enable compute.googleapis.com; it may already be enabled in this lab."

# -----------------------------------------------------------------------------
# Optional guardrail: read resource location policy, then warn if target placement
# is not visible in allowedValues. This does not block execution because Qwiklabs
# policies can emit folder/org aliases such as us-west1-locations or US.
# -----------------------------------------------------------------------------
log "Reading constraints/gcp.resourceLocations effective policy if accessible"
POLICY_JSON="$(mktemp)"
if gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \
  --project="${PROJECT_ID}" --effective --format=json >"${POLICY_JSON}" 2>/dev/null; then
  :
elif gcloud org-policies describe constraints/gcp.resourceLocations \
  --project="${PROJECT_ID}" --effective --format=json >"${POLICY_JSON}" 2>/dev/null; then
  :
else
  : >"${POLICY_JSON}"
  warn "Could not read resourceLocations policy. Continuing with lab-specified region/zone."
fi

if [[ -s "${POLICY_JSON}" ]]; then
  ALLOWED_LINE="$(python3 - "${POLICY_JSON}" <<'PY'
import json, sys
path=sys.argv[1]
try:
    data=json.load(open(path))
except Exception:
    print("")
    raise SystemExit
vals=[]
for key in ("allowedValues", "deniedValues"):
    pass
# Support common org-policy shapes.
for rule in data.get("spec", {}).get("rules", []) + data.get("rules", []):
    vals += rule.get("values", {}).get("allowedValues", []) or []
print(" ".join(vals))
PY
)"
  [[ -n "${ALLOWED_LINE}" ]] && ok "resourceLocations allowedValues: ${ALLOWED_LINE}" || warn "No explicit allowedValues were found in policy output."
fi

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------
network_exists() {
  gcloud compute networks describe "$1" --format='value(name)' >/dev/null 2>&1
}

subnet_exists() {
  local subnet="$1" region="$2"
  gcloud compute networks subnets describe "${subnet}" --region="${region}" --format='value(name)' >/dev/null 2>&1
}

firewall_exists() {
  gcloud compute firewall-rules describe "$1" --format='value(name)' >/dev/null 2>&1
}

create_network_if_missing() {
  local network="$1"
  if network_exists "${network}"; then
    ok "Network exists: ${network}"
  else
    log "Creating custom-mode VPC network: ${network}"
    gcloud compute networks create "${network}" --subnet-mode=custom
  fi
}

create_subnet_if_missing() {
  local subnet="$1" network="$2" region="$3" range="$4"
  if subnet_exists "${subnet}" "${region}"; then
    ok "Subnet exists: ${subnet} / ${region}"
  else
    log "Creating subnet: ${subnet} / ${network} / ${region} / ${range}"
    gcloud compute networks subnets create "${subnet}" \
      --network="${network}" \
      --region="${region}" \
      --range="${range}"
  fi
}

create_firewall_if_missing() {
  local name="$1" network="$2"
  if firewall_exists "${name}"; then
    ok "Firewall exists: ${name}"
  else
    log "Creating firewall rule: ${name}"
    gcloud compute firewall-rules create "${name}" \
      --direction=INGRESS \
      --priority=1000 \
      --network="${network}" \
      --action=ALLOW \
      --rules=icmp,tcp:22,tcp:3389 \
      --source-ranges=0.0.0.0/0
  fi
}

delete_instance_any_zone() {
  local instance="$1"
  local zones
  zones="$(gcloud compute instances list --filter="name=('${instance}')" --format='value(zone)' 2>/dev/null || true)"
  if [[ -z "${zones}" ]]; then
    ok "No existing instance named ${instance}"
    return 0
  fi
  while IFS= read -r zone; do
    [[ -n "${zone}" ]] || continue
    log "Deleting existing instance: ${instance} / ${zone}"
    gcloud compute instances delete "${instance}" --zone="${zone}" --quiet
  done <<< "${zones}"
}

wait_for_instance_running() {
  local instance="$1" zone="$2"
  for _ in {1..30}; do
    local status
    status="$(gcloud compute instances describe "${instance}" --zone="${zone}" --format='value(status)' 2>/dev/null || true)"
    [[ "${status}" == "RUNNING" ]] && { ok "Instance running: ${instance}"; return 0; }
    sleep 2
  done
  fail "Instance did not reach RUNNING state: ${instance} / ${zone}"
}

# -----------------------------------------------------------------------------
# Task 1: custom-mode VPC networks, subnets, firewall rules
# -----------------------------------------------------------------------------
log "Task 1: Creating VPC networks, custom subnets, and firewall rules"

create_network_if_missing managementnet
create_subnet_if_missing managementsubnet-1 managementnet "${REGION_1}" 10.130.0.0/20

create_network_if_missing privatenet
create_subnet_if_missing privatesubnet-1 privatenet "${REGION_1}" 172.16.0.0/24
create_subnet_if_missing privatesubnet-2 privatenet "${REGION_2}" 172.20.0.0/20

network_exists mynetwork || fail "Pre-created lab network 'mynetwork' not found. Confirm the lab has started correctly."
ok "Pre-created network exists: mynetwork"

create_firewall_if_missing managementnet-allow-icmp-ssh-rdp managementnet
create_firewall_if_missing privatenet-allow-icmp-ssh-rdp privatenet

# -----------------------------------------------------------------------------
# Task 2 and Task 4 graded VMs.
# The checker is zone-sensitive. For this lab instance, use us-west1-b.
# -----------------------------------------------------------------------------
log "Deleting graded VM names from any existing zone to avoid wrong-zone checker failures"
delete_instance_any_zone managementnet-vm-1
delete_instance_any_zone privatenet-vm-1
delete_instance_any_zone vm-appliance

log "Task 2: Creating managementnet-vm-1 in ${US_ZONE}"
gcloud compute instances create managementnet-vm-1 \
  --zone="${US_ZONE}" \
  --machine-type=e2-micro \
  --network-interface=network=managementnet,subnet=managementsubnet-1
wait_for_instance_running managementnet-vm-1 "${US_ZONE}"

log "Task 2: Creating privatenet-vm-1 in ${US_ZONE}"
gcloud compute instances create privatenet-vm-1 \
  --zone="${US_ZONE}" \
  --machine-type=e2-micro \
  --network-interface=network=privatenet,subnet=privatesubnet-1
wait_for_instance_running privatenet-vm-1 "${US_ZONE}"

log "Task 4: Creating vm-appliance with three network interfaces in ${US_ZONE}"
gcloud compute instances create vm-appliance \
  --zone="${US_ZONE}" \
  --machine-type=e2-standard-4 \
  --network-interface=network=privatenet,subnet=privatesubnet-1 \
  --network-interface=network=managementnet,subnet=managementsubnet-1 \
  --network-interface=network=mynetwork,subnet=mynetwork
wait_for_instance_running vm-appliance "${US_ZONE}"

# -----------------------------------------------------------------------------
# Verification commands
# -----------------------------------------------------------------------------
log "Verification: networks"
gcloud compute networks list --sort-by=NAME

log "Verification: subnets"
gcloud compute networks subnets list --sort-by=NETWORK

log "Verification: firewall rules"
gcloud compute firewall-rules list --sort-by=NETWORK \
  --filter='name=(managementnet-allow-icmp-ssh-rdp privatenet-allow-icmp-ssh-rdp)'

log "Verification: VM placement and network bindings"
gcloud compute instances list \
  --filter='name=(mynet-vm-1 mynet-vm-2 managementnet-vm-1 privatenet-vm-1 vm-appliance)' \
  --format='table(name,zone,machineType.basename(),networkInterfaces[].network.basename():label=NETWORKS,networkInterfaces[].subnetwork.basename():label=SUBNETS,status)'

log "Verification: vm-appliance NIC order"
gcloud compute instances describe vm-appliance --zone="${US_ZONE}" \
  --format='table(networkInterfaces[].name,networkInterfaces[].network.basename(),networkInterfaces[].subnetwork.basename(),networkInterfaces[].networkIP)'

cat <<NEXT_STEPS

[POST-LAB CHECKS]
1. Wait 30-90 seconds.
2. Refresh the lab page if the checker still shows stale status.
3. Click these Check my progress buttons:
   - Create the managementnet-vm instance
   - Create the privatenet-vm instance
   - Create a VM instance with multiple network interfaces

[OPTIONAL CONNECTIVITY CHECKS]
# Inspect NICs and route table from vm-appliance:
gcloud compute ssh vm-appliance --zone=${US_ZONE} --quiet --command='sudo ifconfig || ip addr; echo; ip route'

# Internal DNS should resolve privatenet-vm-1 to its primary NIC target:
gcloud compute ssh vm-appliance --zone=${US_ZONE} --quiet --command='ping -c 3 privatenet-vm-1 || true'

# Public/private connectivity behavior is explained in the markdown notes.
NEXT_STEPS

ok "GSP211 script completed."
