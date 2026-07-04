```bash
cat > run_gcelab.sh <<'EOF'
#!/usr/bin/env bash
set -u

echo "========== GCP Compute Engine Lab Auto Runner =========="

# -----------------------------
# 0. Basic project/account setup
# -----------------------------
ACCOUNT="$(gcloud auth list --filter=status:ACTIVE --format='value(account)' 2>/dev/null | head -n1)"
PROJECT_ID="$(gcloud config get-value project 2>/dev/null | tail -n1)"

if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  PROJECT_ID="$(gcloud projects list --filter='projectId:qwiklabs-gcp-*' --format='value(projectId)' 2>/dev/null | head -n1)"
  if [[ -n "${PROJECT_ID}" ]]; then
    gcloud config set project "${PROJECT_ID}"
  fi
fi

echo "[INFO] Active account: ${ACCOUNT:-UNKNOWN}"
echo "[INFO] Project ID: ${PROJECT_ID:-UNKNOWN}"

if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  echo "[ERROR] No active project found. Run: gcloud config set project PROJECT_ID"
  exit 1
fi

# Qwiklabs sometimes prints Regional Access Boundary warnings. We ignore them unless actual resource creation fails.

# -----------------------------
# 1. Enable Compute Engine API
# -----------------------------
echo
echo "========== Checking Compute Engine API =========="
if ! gcloud services list --enabled --format='value(config.name)' | grep -q '^compute.googleapis.com$'; then
  echo "[INFO] Enabling Compute Engine API..."
  gcloud services enable compute.googleapis.com || {
    echo "[ERROR] Failed to enable Compute Engine API. This lab account may not have permission."
    exit 1
  }
  sleep 20
else
  echo "[OK] compute.googleapis.com is enabled."
fi

# -----------------------------
# 2. Candidate zone selection
# -----------------------------
echo
echo "========== Building candidate zone list =========="

# Use existing env vars if provided, otherwise gcloud config.
CONFIG_REGION="$(gcloud config get-value compute/region 2>/dev/null | tail -n1)"
CONFIG_ZONE="$(gcloud config get-value compute/zone 2>/dev/null | tail -n1)"

REGION="${REGION:-}"
ZONE="${ZONE:-}"

if [[ -z "${REGION}" || "${REGION}" == "(unset)" ]]; then
  REGION="${CONFIG_REGION}"
fi

if [[ -z "${ZONE}" || "${ZONE}" == "(unset)" ]]; then
  ZONE="${CONFIG_ZONE}"
fi

CANDIDATE_FILE="$(mktemp)"

# First candidate: current configured zone, if any.
if [[ -n "${ZONE}" && "${ZONE}" != "(unset)" ]]; then
  echo "${ZONE}" >> "${CANDIDATE_FILE}"
fi

# Add zones only from regions that have a default subnet.
# This avoids "No default subnetwork was found in the region".
SUBNET_REGIONS="$(gcloud compute networks subnets list \
  --filter='network:default' \
  --format='value(region)' 2>/dev/null | sort -u)"

if [[ -z "${SUBNET_REGIONS}" ]]; then
  echo "[ERROR] No default subnet regions found. The default VPC may be missing or lab is misconfigured."
  exit 1
fi

for r in ${SUBNET_REGIONS}; do
  gcloud compute zones list \
    --filter="region:${r} AND status:UP" \
    --format='value(name)' 2>/dev/null >> "${CANDIDATE_FILE}"
done

# Remove duplicates.
CANDIDATES="$(sort -u "${CANDIDATE_FILE}")"

echo "[INFO] Candidate zones:"
echo "${CANDIDATES}" | sed 's/^/  - /'

# -----------------------------
# 3. Firewall rule for HTTP
# -----------------------------
echo
echo "========== Ensuring HTTP firewall rule =========="
if gcloud compute firewall-rules describe default-allow-http >/dev/null 2>&1; then
  echo "[OK] Firewall rule default-allow-http already exists."
else
  gcloud compute firewall-rules create default-allow-http \
    --network=default \
    --allow=tcp:80 \
    --target-tags=http-server \
    --source-ranges=0.0.0.0/0 || {
      echo "[WARN] Failed to create firewall rule. Continuing; it may already exist or permissions may be delayed."
    }
fi

# -----------------------------
# 4. Create gcelab VM with NGINX startup script
# -----------------------------
echo
echo "========== Creating VM: gcelab =========="

STARTUP_SCRIPT='#!/bin/bash
apt-get update
apt-get install -y nginx
systemctl enable nginx
systemctl restart nginx
echo "GCELAB NGINX OK" > /var/www/html/gcelab.txt
'

GCELAB_ZONE=""

# If gcelab already exists, reuse it.
EXISTING_ZONE="$(gcloud compute instances list --filter='name=gcelab' --format='value(zone)' 2>/dev/null | head -n1)"
if [[ -n "${EXISTING_ZONE}" ]]; then
  GCELAB_ZONE="$(basename "${EXISTING_ZONE}")"
  echo "[OK] gcelab already exists in zone: ${GCELAB_ZONE}"
else
  for z in ${CANDIDATES}; do
    r="${z%-?}"
    echo
    echo "[TRY] Creating gcelab in ${z} / region ${r}"

    gcloud config set compute/region "${r}" >/dev/null 2>&1 || true
    gcloud config set compute/zone "${z}" >/dev/null 2>&1 || true

    CREATE_OUTPUT="$(mktemp)"
    if gcloud compute instances create gcelab \
      --zone="${z}" \
      --machine-type=e2-medium \
      --image-family=debian-12 \
      --image-project=debian-cloud \
      --boot-disk-size=10GB \
      --boot-disk-type=pd-balanced \
      --tags=http-server \
      --metadata=startup-script="${STARTUP_SCRIPT}" >"${CREATE_OUTPUT}" 2>&1; then
        cat "${CREATE_OUTPUT}"
        GCELAB_ZONE="${z}"
        REGION="${r}"
        ZONE="${z}"
        echo "[OK] Created gcelab in ${GCELAB_ZONE}"
        break
    else
        echo "[FAIL] Could not create in ${z}."
        grep -E "violates constraint|No default subnetwork|Permission denied|not found|Quota|quota|RESOURCE|ERROR" "${CREATE_OUTPUT}" || cat "${CREATE_OUTPUT}"
    fi
  done
fi

if [[ -z "${GCELAB_ZONE}" ]]; then
  echo
  echo "========== FINAL ERROR =========="
  echo "[ERROR] Could not create gcelab in any candidate zone."
  echo
  echo "Most likely causes:"
  echo "1. The lab instructions specify a zone not available in this project."
  echo "2. Org policy constraints/gcp.resourceLocations blocks allowed-looking zones."
  echo "3. Qwiklabs/Google Skills provisioned a broken lab session."
  echo
  echo "Recommended action:"
  echo "- End Lab"
  echo "- Start a new lab session"
  echo "- If it repeats, report the lab issue with the error: constraints/gcp.resourceLocations"
  exit 1
fi

REGION="${GCELAB_ZONE%-?}"
ZONE="${GCELAB_ZONE}"

gcloud config set compute/region "${REGION}" >/dev/null 2>&1 || true
gcloud config set compute/zone "${ZONE}" >/dev/null 2>&1 || true

echo
echo "[OK] Final REGION=${REGION}"
echo "[OK] Final ZONE=${ZONE}"

# -----------------------------
# 5. Wait for NGINX
# -----------------------------
echo
echo "========== Waiting for NGINX startup =========="
sleep 30

EXTERNAL_IP="$(gcloud compute instances describe gcelab \
  --zone="${ZONE}" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)' 2>/dev/null)"

echo "[INFO] gcelab external IP: ${EXTERNAL_IP:-N/A}"

if [[ -n "${EXTERNAL_IP}" ]]; then
  echo "[INFO] Testing HTTP endpoint..."
  for i in {1..20}; do
    if curl -fsS "http://${EXTERNAL_IP}/" >/dev/null 2>&1; then
      echo "[OK] NGINX is reachable: http://${EXTERNAL_IP}/"
      break
    fi
    echo "[WAIT] NGINX not ready yet... (${i}/20)"
    sleep 10
  done
fi

# Also verify through SSH command. --quiet avoids interactive prompts as much as possible.
echo
echo "========== Verifying NGINX process through SSH =========="
gcloud compute ssh gcelab \
  --zone="${ZONE}" \
  --quiet \
  --command="ps auwx | grep nginx | grep -v grep || sudo systemctl status nginx --no-pager" || {
    echo "[WARN] SSH verification failed, but HTTP may still work. Check VM manually if lab progress fails."
  }

# -----------------------------
# 6. Create gcelab2
# -----------------------------
echo
echo "========== Creating VM: gcelab2 =========="

if gcloud compute instances list --filter='name=gcelab2' --format='value(name)' | grep -q '^gcelab2$'; then
  echo "[OK] gcelab2 already exists."
else
  gcloud compute instances create gcelab2 \
    --machine-type=e2-medium \
    --zone="${ZONE}" || {
      echo "[ERROR] Failed to create gcelab2 in ${ZONE}."
      exit 1
    }
fi

# -----------------------------
# 7. Final output
# -----------------------------
echo
echo "========== Final VM List =========="
gcloud compute instances list

echo
echo "========== Lab Summary =========="
echo "Project: ${PROJECT_ID}"
echo "Region:  ${REGION}"
echo "Zone:    ${ZONE}"
echo "VM 1:    gcelab"
echo "VM 2:    gcelab2"
echo "NGINX:   http://${EXTERNAL_IP:-EXTERNAL_IP_NOT_FOUND}/"
echo
echo "[DONE] Now click 'Check my progress' in the lab page."
EOF

chmod +x run_gcelab.sh
./run_gcelab.sh
```