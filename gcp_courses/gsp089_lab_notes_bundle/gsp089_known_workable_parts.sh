#!/usr/bin/env bash
set -Eeuo pipefail

# GSP089 Cloud Monitoring: Qwik Start helper
# Scope: known workable parts only. The Task 1 VM checkpoint may still require UI creation / grader support.
# Usage:
#   bash gsp089_known_workable_parts.sh
#   CLEANUP_GSP215=true bash gsp089_known_workable_parts.sh
#   CREATE_VM_IF_MISSING=true bash gsp089_known_workable_parts.sh
#   FORCE_ZONE=us-east4-a bash gsp089_known_workable_parts.sh

export CLOUDSDK_CORE_DISABLE_PROMPTS=1

GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m"

ok()    { echo -e "${GREEN}[SUCCESS - CHECK OUT IN PANEL]${NC} $*"; }
issue() { echo -e "${RED}[RED - ISSUE]${NC} $*" >&2; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $*"; }
info()  { echo -e "\n${BLUE}[INFO]${NC} $*"; }

PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null || true)}"
ZONE="${FORCE_ZONE:-${ZONE:-us-east4-a}}"
REGION="${REGION:-${ZONE%-*}}"
VM_NAME="${VM_NAME:-lamp-1-vm}"
CLEANUP_GSP215="${CLEANUP_GSP215:-false}"
CREATE_VM_IF_MISSING="${CREATE_VM_IF_MISSING:-false}"

if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  issue "No active project. Run: gcloud config set project PROJECT_ID"
  exit 1
fi

gcloud config set project "${PROJECT_ID}" >/dev/null
gcloud config set compute/zone "${ZONE}" >/dev/null
gcloud config set compute/region "${REGION}" >/dev/null

info "GSP089 helper starting"
echo "PROJECT_ID=${PROJECT_ID}"
echo "REGION=${REGION}"
echo "ZONE=${ZONE}"
echo "VM_NAME=${VM_NAME}"
echo "CLEANUP_GSP215=${CLEANUP_GSP215}"
echo "CREATE_VM_IF_MISSING=${CREATE_VM_IF_MISSING}"

info "Enabling required APIs"
gcloud services enable compute.googleapis.com monitoring.googleapis.com logging.googleapis.com >/dev/null || true
ok "Compute, Monitoring, and Logging APIs are enabled or already enabled"

if [[ "${CLEANUP_GSP215}" == "true" ]]; then
  info "Cleaning wrong-lab GSP215 resources if present"

  for fr in http-lb-forwarding-rule http-lb-forwarding-rule-ipv6; do
    if gcloud compute forwarding-rules describe "$fr" --global >/dev/null 2>&1; then
      gcloud compute forwarding-rules delete "$fr" --global --quiet >/dev/null || true
      ok "Deleted forwarding rule: $fr"
    fi
  done

  gcloud compute target-http-proxies delete http-lb-proxy --quiet >/dev/null 2>&1 || true
  gcloud compute url-maps delete http-lb --quiet >/dev/null 2>&1 || true
  gcloud compute backend-services delete http-backend --global --quiet >/dev/null 2>&1 || true
  gcloud compute health-checks delete http-health-check --quiet >/dev/null 2>&1 || true
  gcloud compute security-policies delete denylist-siege --quiet >/dev/null 2>&1 || true

  while IFS=, read -r mig region zone; do
    [[ -z "${mig}" ]] && continue
    if [[ -n "${region}" ]]; then
      gcloud compute instance-groups managed delete "$mig" --region="$region" --quiet >/dev/null 2>&1 || true
      ok "Deleted regional MIG: $mig / $region"
    elif [[ -n "${zone}" ]]; then
      gcloud compute instance-groups managed delete "$mig" --zone="$zone" --quiet >/dev/null 2>&1 || true
      ok "Deleted zonal MIG: $mig / $zone"
    fi
  done < <(gcloud compute instance-groups managed list --format='csv[no-heading](name,region.basename(),zone.basename())' 2>/dev/null || true)

  gcloud compute instance-templates delete us-east4-template --quiet >/dev/null 2>&1 || true
  gcloud compute instances delete siege-vm --zone="${ZONE}" --quiet >/dev/null 2>&1 || true
  ok "Wrong-lab cleanup completed"
fi

info "Ensuring default VPC and HTTP firewall"
if ! gcloud compute networks describe default >/dev/null 2>&1; then
  gcloud compute networks create default --subnet-mode=auto >/dev/null
  ok "Created default VPC"
else
  ok "Default VPC exists"
fi

if ! gcloud compute firewall-rules describe default-allow-http >/dev/null 2>&1; then
  gcloud compute firewall-rules create default-allow-http \
    --network=default \
    --direction=INGRESS \
    --action=ALLOW \
    --rules=tcp:80 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=http-server \
    >/dev/null
  ok "Created firewall rule: default-allow-http"
else
  gcloud compute firewall-rules update default-allow-http \
    --rules=tcp:80 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=http-server \
    >/dev/null 2>&1 || true
  ok "HTTP firewall rule exists/updated: default-allow-http"
fi

if ! gcloud compute instances describe "${VM_NAME}" --zone="${ZONE}" >/dev/null 2>&1; then
  if [[ "${CREATE_VM_IF_MISSING}" == "true" ]]; then
    info "VM missing. Creating ${VM_NAME}. Note: Task 1 checkpoint might still prefer UI creation."
    gcloud compute instances create "${VM_NAME}" \
      --zone="${ZONE}" \
      --machine-type=e2-medium \
      --image-family=debian-12 \
      --image-project=debian-cloud \
      --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default \
      --tags=http-server \
      >/dev/null
    ok "Created VM: ${VM_NAME}"
  else
    issue "${VM_NAME} is missing in ${ZONE}. For Task 1, create it through Console UI first, or rerun with CREATE_VM_IF_MISSING=true."
    exit 1
  fi
else
  ok "VM exists: ${VM_NAME} / ${ZONE}"
fi

info "Repairing VM network tag"
gcloud compute instances add-tags "${VM_NAME}" --zone="${ZONE}" --tags=http-server >/dev/null 2>&1 || true
ok "VM has or was assigned http-server tag"

info "Inspecting VM"
gcloud compute instances describe "${VM_NAME}" --zone="${ZONE}" \
  --format="table(name,status,zone.basename(),machineType.basename(),networkInterfaces[0].accessConfigs[0].natIP,tags.items.list())"

VM_IP="$(gcloud compute instances describe "${VM_NAME}" --zone="${ZONE}" --format='value(networkInterfaces[0].accessConfigs[0].natIP)' 2>/dev/null || true)"
if [[ -z "${VM_IP}" ]]; then
  issue "VM has no External IP. Add External NAT / ephemeral IPv4 before uptime check."
  exit 1
fi
ok "VM External IP: ${VM_IP}"

info "Installing or repairing Apache2 via startup metadata + reset"
cat > /tmp/gsp089_lamp_startup.sh <<'STARTUP'
#!/usr/bin/env bash
set -euxo pipefail
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y apache2 php libapache2-mod-php curl ca-certificates
cat >/var/www/html/index.html <<'HTML'
<!doctype html>
<html>
<head><title>GSP089 LAMP OK</title></head>
<body><h1>Apache2 HTTP Server is running</h1><p>lamp-1-vm OK</p></body>
</html>
HTML
cat >/var/www/html/healthz.html <<'HTML'
ok
HTML
systemctl enable apache2
systemctl restart apache2
STARTUP

gcloud compute instances add-metadata "${VM_NAME}" \
  --zone="${ZONE}" \
  --metadata-from-file=startup-script=/tmp/gsp089_lamp_startup.sh \
  >/dev/null || true

gcloud compute instances reset "${VM_NAME}" --zone="${ZONE}" --quiet >/dev/null || true

info "Waiting for HTTP 200 from http://${VM_IP}/"
HTTP_CODE=""
for i in $(seq 1 90); do
  HTTP_CODE="$(curl -sS --connect-timeout 5 -m 10 -o /tmp/gsp089_http_body.txt -w '%{http_code}' "http://${VM_IP}/" || true)"
  if [[ "${HTTP_CODE}" == "200" ]]; then
    break
  fi
  echo -n "."
  sleep 10
done
echo

if [[ "${HTTP_CODE}" == "200" ]]; then
  ok "External IP HTTP success: http://${VM_IP}/ returned 200"
else
  issue "External IP did not return HTTP 200. Last code=${HTTP_CODE:-none}"
  exit 1
fi

info "Creating or replacing Lamp Uptime Check"
TOKEN="$(gcloud auth print-access-token)"

curl -sS -H "Authorization: Bearer ${TOKEN}" \
  "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/uptimeCheckConfigs" \
  > /tmp/gsp089_uptime_list.json || true

python3 - <<'PY' > /tmp/gsp089_delete_uptime_names.txt
import json
try:
    data=json.load(open('/tmp/gsp089_uptime_list.json'))
except Exception:
    data={}
for c in data.get('uptimeCheckConfigs', []):
    if c.get('displayName') == 'Lamp Uptime Check':
        print(c.get('name',''))
PY

while read -r uptime_name; do
  [[ -z "${uptime_name}" ]] && continue
  curl -sS -X DELETE \
    -H "Authorization: Bearer ${TOKEN}" \
    "https://monitoring.googleapis.com/v3/${uptime_name}" \
    >/dev/null || true
  ok "Deleted old uptime check: ${uptime_name}"
done < /tmp/gsp089_delete_uptime_names.txt

cat > /tmp/gsp089_uptime_create.json <<UPTIME
{
  "displayName": "Lamp Uptime Check",
  "monitoredResource": {
    "type": "uptime_url",
    "labels": {
      "project_id": "${PROJECT_ID}",
      "host": "${VM_IP}"
    }
  },
  "httpCheck": {
    "requestMethod": "GET",
    "useSsl": false,
    "path": "/",
    "port": 80
  },
  "period": "60s",
  "timeout": "10s"
}
UPTIME

UPTIME_RESP="$(curl -sS -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/uptimeCheckConfigs" \
  -d @/tmp/gsp089_uptime_create.json || true)"

if grep -q '"name"' <<< "${UPTIME_RESP}"; then
  ok "Created Lamp Uptime Check -> ${VM_IP}:80"
else
  warn "Uptime check creation response did not contain name:"
  echo "${UPTIME_RESP}"
fi

info "Ensuring Inbound Traffic Alert exists"
curl -sS -H "Authorization: Bearer ${TOKEN}" \
  "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/alertPolicies" \
  > /tmp/gsp089_alert_list.json || true

if grep -q "Inbound Traffic Alert" /tmp/gsp089_alert_list.json; then
  ok "Alert policy already exists: Inbound Traffic Alert"
else
  cat > /tmp/gsp089_alert_create.json <<'ALERT'
{
  "displayName": "Inbound Traffic Alert",
  "combiner": "OR",
  "enabled": true,
  "documentation": {
    "content": "GSP089 lab alert policy.",
    "mimeType": "text/markdown"
  },
  "conditions": [
    {
      "displayName": "VM instance - Network traffic",
      "conditionThreshold": {
        "filter": "metric.type=\"compute.googleapis.com/instance/network/received_bytes_count\" AND resource.type=\"gce_instance\"",
        "comparison": "COMPARISON_GT",
        "thresholdValue": 500,
        "duration": "60s",
        "aggregations": [
          {
            "alignmentPeriod": "60s",
            "perSeriesAligner": "ALIGN_RATE",
            "crossSeriesReducer": "REDUCE_SUM"
          }
        ],
        "trigger": {
          "count": 1
        }
      }
    }
  ]
}
ALERT

  ALERT_RESP="$(curl -sS -X POST \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "Content-Type: application/json" \
    "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/alertPolicies" \
    -d @/tmp/gsp089_alert_create.json || true)"

  if grep -q '"name"' <<< "${ALERT_RESP}"; then
    ok "Created alert policy: Inbound Traffic Alert"
  else
    warn "Alert policy creation response did not contain name:"
    echo "${ALERT_RESP}"
  fi
fi

info "Final diagnostic output"
echo "PROJECT_ID=${PROJECT_ID}"
echo "REGION=${REGION}"
echo "ZONE=${ZONE}"
echo "VM_NAME=${VM_NAME}"
echo "VM_IP=${VM_IP}"
echo "VM_URL=http://${VM_IP}/"

gcloud compute instances describe "${VM_NAME}" --zone="${ZONE}" \
  --format="yaml(name,status,zone,machineType,networkInterfaces[0].accessConfigs,tags.items,serviceAccounts)"

cat <<SUMMARY

======================================================================
GSP089 known-workable helper completed.

Likely workable checkpoints:
  - Add Apache2 HTTP Server to your instance
  - Get a success response over External IP of VM instance
  - Create an uptime check and alerting policy

Known issue:
  - The first checkpoint, "Create a Compute Engine instance", may remain stuck even when the VM exists.
  - If only this checkpoint is stuck while the other three pass, preserve screenshots and use Send feedback.

Panel action:
  Wait 60 seconds, refresh the lab page, then click the remaining progress checks.
======================================================================
SUMMARY
