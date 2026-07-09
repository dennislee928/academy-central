# GSP089 — Cloud Monitoring: Qwik Start Lab Notes

> Scope: Google Cloud Self-Paced Lab **GSP089 / Cloud Monitoring: Qwik Start**.  
> Purpose: create a detailed operational note for known workable automation steps, plus documented issues for the non-workable checkpoint behavior observed in this session.

---

## 1. Lab identity and fixed parameters

| Item | Value used in this run |
|---|---|
| Lab ID | `GSP089` |
| Project ID | `qwiklabs-gcp-04-51a3f139b338` |
| Student account | `student-03-a097b7f92bbc@qwiklabs.net` |
| Region | `us-east4` |
| Zone | `us-east4-a` |
| VM name | `lamp-1-vm` |
| VM series / machine | `E2` / `e2-medium` |
| Boot image | Debian GNU/Linux 12 bookworm, **x86/64 amd64**, not Arm64 |
| Network | `default` VPC, `default` subnet in `us-east4` |
| Firewall intent | Allow HTTP traffic using `http-server` tag and TCP `80` |
| Uptime check title | `Lamp Uptime Check` |
| Alert policy title | `Inbound Traffic Alert` |

Recommended Cloud Shell defaults:

```bash
gcloud config set compute/zone "us-east4-a"
export ZONE=$(gcloud config get compute/zone)

gcloud config set compute/region "us-east4"
export REGION=$(gcloud config get compute/region)
```

---

## 2. Lab checkpoint model

The lab has four 25-point checkpoints:

| Checkpoint | Target state | Observed status in session |
|---|---|---|
| 1. Create a Compute Engine instance | `lamp-1-vm` exists in `us-east4-a`, machine `e2-medium`, Debian 12, HTTP firewall selected | **Non-workable / grader did not detect** |
| 2. Add Apache2 HTTP Server to your instance | Apache2 installed and running on the VM | **Workable** |
| 3. Get a success response over External IP of VM instance | `curl http://EXTERNAL_IP/` returns HTTP `200` | **Workable** |
| 4. Create an uptime check and alerting policy | Uptime check and alert policy exist in Cloud Monitoring | **Workable** |

Important observation: checkpoints 2, 3, and 4 passed even though checkpoint 1 remained stuck at `0/25`. This strongly suggests the VM itself was functional and that the first checkpoint was a grader/state issue rather than a resource issue.

---

## 3. Known workable parts

### 3.1 Set project, region, and zone

```bash
gcloud config set project qwiklabs-gcp-04-51a3f139b338
gcloud config set compute/zone us-east4-a
gcloud config set compute/region us-east4
```

### 3.2 Enable APIs

Workable:

```bash
gcloud services enable \
  compute.googleapis.com \
  monitoring.googleapis.com \
  logging.googleapis.com
```

The `Regional Access Boundary HTTP request failed ... Account not found` warning appeared many times in Cloud Shell. In this session it was noisy but non-blocking: API enablement, VM creation, firewall operations, HTTP checks, and monitoring-resource creation still succeeded.

### 3.3 Default VPC and HTTP firewall

Workable:

```bash
# Create default VPC only if missing.
gcloud compute networks describe default >/dev/null 2>&1 || \
  gcloud compute networks create default --subnet-mode=auto

# Create or update HTTP firewall rule.
gcloud compute firewall-rules describe default-allow-http >/dev/null 2>&1 || \
  gcloud compute firewall-rules create default-allow-http \
    --network=default \
    --direction=INGRESS \
    --action=ALLOW \
    --rules=tcp:80 \
    --source-ranges=0.0.0.0/0 \
    --target-tags=http-server
```

The validator expects the VM to have the `http-server` network tag when the firewall rule targets that tag.

### 3.4 Create or repair `lamp-1-vm`

A CLI-created VM with the expected shape was technically valid and worked for later checkpoints:

```bash
gcloud compute instances create lamp-1-vm \
  --zone=us-east4-a \
  --machine-type=e2-medium \
  --image-family=debian-12 \
  --image-project=debian-cloud \
  --network-interface=network-tier=PREMIUM,stack-type=IPV4_ONLY,subnet=default \
  --tags=http-server
```

Validation command:

```bash
gcloud compute instances describe lamp-1-vm \
  --zone=us-east4-a \
  --format="yaml(
    name,
    status,
    zone,
    machineType,
    disks[0].initializeParams.sourceImage,
    disks[0].type,
    networkInterfaces[0].network,
    networkInterfaces[0].subnetwork,
    networkInterfaces[0].accessConfigs,
    tags.items,
    serviceAccounts
  )"
```

Expected important fields:

```yaml
name: lamp-1-vm
status: RUNNING
zone: .../zones/us-east4-a
machineType: .../machineTypes/e2-medium
networkInterfaces:
- accessConfigs:
  - name: External NAT
    networkTier: PREMIUM
    type: ONE_TO_ONE_NAT
  network: .../global/networks/default
  subnetwork: .../regions/us-east4/subnetworks/default
tags:
  items:
  - http-server
```

### 3.5 Install Apache2 HTTP server

Known workable method via SSH:

```bash
gcloud compute ssh lamp-1-vm \
  --zone=us-east4-a \
  --command='
    sudo apt-get update -y
    sudo apt-get install -y apache2 php libapache2-mod-php curl ca-certificates
    sudo systemctl enable apache2
    sudo systemctl restart apache2
    sudo tee /var/www/html/healthz.html >/dev/null <<EOF2
ok
EOF2
  '
```

Known workable method via startup metadata + reset:

```bash
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

gcloud compute instances add-metadata lamp-1-vm \
  --zone=us-east4-a \
  --metadata-from-file=startup-script=/tmp/gsp089_lamp_startup.sh

gcloud compute instances reset lamp-1-vm --zone=us-east4-a --quiet
```

### 3.6 Validate External IP HTTP response

```bash
IP=$(gcloud compute instances describe lamp-1-vm \
  --zone=us-east4-a \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

echo "http://${IP}/"
curl -I "http://${IP}/"
curl -sS -o /tmp/gsp089_body.txt -w '%{http_code}\n' "http://${IP}/"
```

Expected result:

```text
200
```

A short period of `Connection refused` immediately after VM creation/reset is normal while Apache is installing. In this session, several connection-refused attempts occurred before HTTP `200` was returned.

### 3.7 Create Cloud Monitoring uptime check

This REST method was workable:

```bash
PROJECT_ID=$(gcloud config get-value project)
TOKEN=$(gcloud auth print-access-token)
IP=$(gcloud compute instances describe lamp-1-vm \
  --zone=us-east4-a \
  --format="value(networkInterfaces[0].accessConfigs[0].natIP)")

cat > /tmp/gsp089_uptime_create.json <<UPTIME
{
  "displayName": "Lamp Uptime Check",
  "monitoredResource": {
    "type": "uptime_url",
    "labels": {
      "project_id": "${PROJECT_ID}",
      "host": "${IP}"
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

curl -sS -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/uptimeCheckConfigs" \
  -d @/tmp/gsp089_uptime_create.json
```

Delete old duplicate uptime checks with the same display name if the target IP changed:

```bash
curl -sS \
  -H "Authorization: Bearer ${TOKEN}" \
  "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/uptimeCheckConfigs" \
  > /tmp/gsp089_uptime_list.json

python3 - <<'PY' > /tmp/gsp089_delete_uptime_names.txt
import json
try:
    data = json.load(open('/tmp/gsp089_uptime_list.json'))
except Exception:
    data = {}
for c in data.get('uptimeCheckConfigs', []):
    if c.get('displayName') == 'Lamp Uptime Check':
        print(c.get('name', ''))
PY

while read -r name; do
  [ -n "$name" ] && curl -sS -X DELETE \
    -H "Authorization: Bearer ${TOKEN}" \
    "https://monitoring.googleapis.com/v3/${name}"
done < /tmp/gsp089_delete_uptime_names.txt
```

### 3.8 Create alert policy

Known workable title:

```text
Inbound Traffic Alert
```

Known workable API pattern:

```bash
PROJECT_ID=$(gcloud config get-value project)
TOKEN=$(gcloud auth print-access-token)

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

curl -sS -X POST \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  "https://monitoring.googleapis.com/v3/projects/${PROJECT_ID}/alertPolicies" \
  -d @/tmp/gsp089_alert_create.json
```

---

## 4. Non-workable part: Task 1 checkpoint stuck

### Symptom

The lab stayed at `75/100`; only this checkpoint remained at `0/25`:

```text
Create a Compute Engine instance
```

### Why this looks like a grader issue

The VM was repeatedly verified as:

```text
name: lamp-1-vm
zone: us-east4-a
machineType: e2-medium
status: RUNNING
External NAT / External IP present
default VPC and subnet
http-server tag present
```

The later checkpoints passed:

- Apache2 HTTP server passed.
- External IP HTTP success passed.
- Uptime check and alert policy passed.

Log evidence showed `lamp-1-vm` created in `us-east4-a`, `e2-medium`, with an external IP and `http-server` tag; it also showed external HTTP `200` and creation of the uptime check and alert policy.

### Recommended handling

Do not keep deleting and recreating resources once 75/100 is reached. Preserve evidence and submit feedback.

Feedback template:

```text
GSP089 Task 1 checkpoint appears stuck.

The VM exists and matches the lab instruction:
Project: qwiklabs-gcp-04-51a3f139b338
Name: lamp-1-vm
Zone: us-east4-a
Machine type: e2-medium
OS: Debian GNU/Linux 12
Network: default
Subnetwork: default
External IP: present
Network tag: http-server
Status: RUNNING

The other checkpoints already passed:
- Apache2 HTTP Server: 25/25
- External IP success response: 25/25
- Uptime check and alerting policy: 25/25

Only "Create a Compute Engine instance" remains 0/25 despite the VM existing.
Please review the grader for Task 1.
```

---

## 5. Known mistakes and issue log

### 5.1 Wrong lab script was initially used

A GSP215 Cloud Armor / Application Load Balancer script was executed against this GSP089 project. That created unrelated resources:

- `http-lb`
- `http-backend`
- `http-lb-forwarding-rule`
- `http-lb-forwarding-rule-ipv6`
- `http-health-check`
- `denylist-siege`
- `siege-vm`
- MIG and instance template resources

These are not part of GSP089 and should be removed before rerunning GSP089 checks.

Cleanup pattern:

```bash
# Forwarding rules
for fr in http-lb-forwarding-rule http-lb-forwarding-rule-ipv6; do
  gcloud compute forwarding-rules describe "$fr" --global >/dev/null 2>&1 && \
    gcloud compute forwarding-rules delete "$fr" --global --quiet || true
done

# Load balancer chain
gcloud compute target-http-proxies delete http-lb-proxy --quiet 2>/dev/null || true
gcloud compute url-maps delete http-lb --quiet 2>/dev/null || true
gcloud compute backend-services delete http-backend --global --quiet 2>/dev/null || true
gcloud compute health-checks delete http-health-check --quiet 2>/dev/null || true
gcloud compute security-policies delete denylist-siege --quiet 2>/dev/null || true

# Extra VM
gcloud compute instances delete siege-vm --zone=us-east4-a --quiet 2>/dev/null || true
```

### 5.2 RAB warning is noisy but often non-blocking

Repeated warning:

```text
Regional Access Boundary HTTP request failed after retries: ... Account not found ... NOT_FOUND
```

Observed behavior: operations still succeeded after this warning. Treat it as a warning unless the actual `gcloud` command exits with a failure or the resource does not appear.

### 5.3 Debian image architecture

When selecting boot disk in the UI:

- Choose `Debian GNU/Linux 12 (bookworm) x86/64, amd64`.
- Do **not** choose `Arm64` for `E2 / e2-medium`.

### 5.4 Uptime check connection refused

If the uptime check test says:

```text
Connection Error - Refused
```

It means Google Monitoring cannot connect to `VM_EXTERNAL_IP:80` at that moment. Check:

```bash
IP=$(gcloud compute instances describe lamp-1-vm --zone=us-east4-a --format='value(networkInterfaces[0].accessConfigs[0].natIP)')
curl -I "http://${IP}/"
gcloud compute firewall-rules describe default-allow-http --format='yaml(name,allowed,sourceRanges,targetTags)'
gcloud compute instances describe lamp-1-vm --zone=us-east4-a --format='yaml(tags.items)'
```

---

## 6. Fast diagnostic checklist

Run this when the lab appears stuck:

```bash
gcloud config set compute/zone us-east4-a
gcloud config set compute/region us-east4

PROJECT_ID=$(gcloud config get-value project)
echo "PROJECT_ID=${PROJECT_ID}"

gcloud compute instances describe lamp-1-vm \
  --zone=us-east4-a \
  --format="table(name,status,zone.basename(),machineType.basename(),networkInterfaces[0].accessConfigs[0].natIP,tags.items.list())"

IP=$(gcloud compute instances describe lamp-1-vm \
  --zone=us-east4-a \
  --format='value(networkInterfaces[0].accessConfigs[0].natIP)')

curl -sS -o /tmp/gsp089_body.txt -w 'HTTP=%{http_code}\n' "http://${IP}/"

gcloud compute firewall-rules describe default-allow-http \
  --format='yaml(name,allowed,sourceRanges,targetTags)'
```

Expected:

```text
lamp-1-vm RUNNING us-east4-a e2-medium EXTERNAL_IP http-server
HTTP=200
```

---

## 7. Suggested practical sequence for future attempts

1. Start the lab fresh.
2. Set region and zone exactly from the lab page.
3. Create Task 1 VM through the Console UI rather than script if you need the checkpoint to be strict.
4. Select Debian 12 x86/64 amd64.
5. Select `E2 / e2-medium`.
6. Tick only `Allow HTTP traffic`.
7. Wait for green VM status.
8. Check Task 1 immediately.
9. Install Apache via SSH.
10. Check Task 2 and Task 3.
11. Create uptime check and alerting policy.
12. Check Task 4.
13. If Task 1 is stuck but 2/3/4 pass, stop modifying resources and send feedback with evidence.

---

## 8. Downloadable helper script

The paired Bash file is:

```text
gsp089_known_workable_parts.sh
```

It automates only the parts that proved workable:

- project/region/zone setup;
- API enablement;
- default VPC and HTTP firewall;
- optional cleanup of wrong GSP215 resources;
- VM verification;
- Apache install/repair;
- HTTP `200` validation;
- uptime check creation;
- alert policy creation;
- final diagnostic output.

It intentionally prints a warning that Task 1 can be a manual/UI checkpoint issue.
