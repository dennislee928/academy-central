## Google Cloud 運算的基本概念：Cloud 運算基礎知識-如何建立虛擬機器 (VM)lab

> Course / Lab: **Google Cloud 運算的基本概念：Cloud 運算基礎知識 → 如何建立虛擬機器 VM**  
> Lab ID: **GSP001**  
> Platform: **Google Skills / Qwiklabs**  
> Score: **100 / 100**  
> Level: **Introductory**  
> Main Service: **Compute Engine**  
> Main Tooling: **Google Cloud Console + Cloud Shell + gcloud CLI**

---

## 1. Lab 目標

本實驗室的核心目標是學會使用 **Google Compute Engine** 建立虛擬機器，並在 VM 上安裝簡單的 Web Server。

完成後應理解：

1. 如何登入 Google Cloud Console。
2. 如何啟動 Cloud Shell。
3. 如何設定 `gcloud` 的 project、region、zone。
4. 如何透過 Cloud Console 建立 Compute Engine VM。
5. 如何透過 `gcloud` CLI 建立 Compute Engine VM。
6. 如何 SSH 進入 VM。
7. 如何在 Debian VM 上安裝 NGINX。
8. 如何開放 HTTP 防火牆規則。
9. 如何透過外部 IP 驗證 Web Server 是否可用。

---

## 2. 本 Lab 使用到的主要 Google Cloud 服務

|服務|功能|
|---|---|
|**Compute Engine**|建立與管理 VM 執行個體|
|**Cloud Shell**|Google Cloud 內建的 Linux Shell 環境|
|**gcloud CLI**|Google Cloud 指令列工具|
|**VPC Network**|VM 所屬的虛擬網路|
|**Firewall Rules**|控制進出 VM 的網路流量|
|**Debian 12**|VM 使用的作業系統映像檔|
|**NGINX**|安裝在 VM 上的 Web Server|

---

## 3. 核心概念整理

### 3.1 Compute Engine 是什麼？

**Compute Engine** 是 Google Cloud 的 IaaS 服務，也就是 Infrastructure as a Service。

它可以讓使用者在 Google Cloud 基礎架構上建立 VM，執行不同作業系統，例如：

- Debian
- Ubuntu
- Red Hat Enterprise Linux
- SUSE
- CoreOS
- Windows Server

在實務上，Compute Engine 可用於：

- Web Server
- API Server
- Batch Processing
- Dev/Test Environment
- Legacy Application Migration
- Load-balanced Backend
- Security Lab / Sandbox
- Container Host

---

### 3.2 VM Instance 是什麼？

VM Instance 是一台虛擬機器，具備：

- CPU
- Memory
- Boot Disk
- Network Interface
- Internal IP
- External IP
- OS Image
- Firewall Tags
- Metadata
- SSH Access

本 lab 建立的 VM：

|欄位|值|
|---|---|
|VM 名稱|`gcelab`|
|Zone|`us-west1-a`|
|Machine Type|`e2-medium`|
|CPU / RAM|2 vCPU / 4 GB RAM|
|OS|Debian GNU/Linux 12 bookworm|
|Boot Disk|Balanced Persistent Disk|
|Disk Size|10 GB|
|HTTP|Enabled|
|Web Server|NGINX|

---

## 4. Region 與 Zone

### 4.1 Region

Region 是 Google Cloud 資源所在的地理區域。

例：

```
us-west1us-central1us-east1europe-west1asia-east1
```

### 4.2 Zone

Zone 是 region 內的資料中心區域。

例：

```
us-west1-aus-west1-bus-west1-c
```

### 4.3 Region / Zone 關係

|Region|Zones|
|---|---|
|`us-west1`|`us-west1-a`, `us-west1-b`, `us-west1-c`|
|`us-central1`|`us-central1-a`, `us-central1-b`, `us-central1-c`, `us-central1-f`|
|`us-east1`|`us-east1-b`, `us-east1-c`, `us-east1-d`|
|`europe-west1`|`europe-west1-b`, `europe-west1-c`, `europe-west1-d`|

### 4.4 為什麼 Zone 很重要？

很多 Compute Engine 資源是 **zonal resources**，例如：

- VM instance
- Persistent Disk

因此：

```
VM 和要掛載的 disk 必須在同一個 zone。
```

如果 VM 在 `us-west1-a`，disk 也必須在 `us-west1-a`。

---

## 5. Cloud Shell 基本操作

### 5.1 啟動 Cloud Shell

在 Google Cloud Console 右上角點擊：

```
Activate Cloud Shell
```

Cloud Shell 是 Google Cloud 提供的臨時 Linux shell，內建：

- `gcloud`
- `git`
- `curl`
- `ssh`
- `vim`
- `nano`
- Python
- Terraform 等常見工具

---

### 5.2 確認登入帳號

```
gcloud auth list
```

預期會看到：

```
ACTIVE: *ACCOUNT: student-xx-xxxxxxxxxxxx@qwiklabs.net
```

重點：

```
ACTIVE: *
```

代表目前使用中的帳號。

---

### 5.3 確認目前 project

```
gcloud config list project
```

或：

```
gcloud config get-value project
```

預期：

```
[core]project = qwiklabs-gcp-xxxx
```

---

## 6. 設定 Region 與 Zone

本 lab 最終成功使用：

```
gcloud config set compute/region us-west1gcloud config set compute/zone us-west1-a
```

也可以設定環境變數：

```
export REGION=us-west1export ZONE=us-west1-a
```

確認：

```
gcloud config get-value compute/regiongcloud config get-value compute/zone
```

預期：

```
us-west1us-west1-a
```

---

## 7. Task 1 — 建立第一台 VM：`gcelab`

### 7.1 Cloud Console 建立方式

路徑：

```
Navigation menu → Compute Engine → VM instances → Create instance
```

設定：

|欄位|值|
|---|---|
|Name|`gcelab`|
|Region|`us-west1`|
|Zone|`us-west1-a`|
|Series|`E2`|
|Machine Type|`e2-medium`|
|OS|Debian|
|Version|Debian GNU/Linux 12 bookworm|
|Boot disk type|Balanced persistent disk|
|Boot disk size|10 GB|
|Firewall|Allow HTTP traffic|

---

### 7.2 等價 gcloud 建立方式

雖然任務 1 指示使用 Console，但 CLI 等價指令如下：

```
gcloud compute instances create gcelab \  --zone=us-west1-a \  --machine-type=e2-medium \  --image-family=debian-12 \  --image-project=debian-cloud \  --boot-disk-size=10GB \  --boot-disk-type=pd-balanced \  --tags=http-server
```

參數說明：

|參數|說明|
|---|---|
|`gcelab`|VM 名稱|
|`--zone=us-west1-a`|VM 所在 zone|
|`--machine-type=e2-medium`|使用 e2-medium 機型|
|`--image-family=debian-12`|使用 Debian 12 image family|
|`--image-project=debian-cloud`|Debian image 所在 project|
|`--boot-disk-size=10GB`|開機磁碟 10 GB|
|`--boot-disk-type=pd-balanced`|平衡型永久磁碟|
|`--tags=http-server`|加上 network tag，用於 firewall rule|

---

## 8. Firewall Rule — 開放 HTTP 80 port

如果在 Console 勾選：

```
Allow HTTP traffic
```

Google Cloud 會自動建立允許 HTTP 的 firewall rule。

CLI 等價指令：

```
gcloud compute firewall-rules create default-allow-http \  --network=default \  --allow=tcp:80 \  --target-tags=http-server \  --source-ranges=0.0.0.0/0
```

### 8.1 Firewall Rule 參數說明

|參數|說明|
|---|---|
|`default-allow-http`|firewall rule 名稱|
|`--network=default`|套用到 default VPC|
|`--allow=tcp:80`|允許 TCP 80 port|
|`--target-tags=http-server`|只套用到有 `http-server` tag 的 VM|
|`--source-ranges=0.0.0.0/0`|允許所有來源 IP|

---

## 9. Task 2 — 安裝 NGINX

### 9.1 SSH 進入 VM

```
gcloud compute ssh gcelab --zone=us-west1-a
```

第一次 SSH 可能會出現：

```
Do you want to continue? (Y/n)
```

輸入：

```
Y
```

若要求 passphrase，可以直接按 Enter 留空。

---

### 9.2 更新 Debian package list

進入 VM 後執行：

```
sudo apt-get update
```

作用：

```
更新 package repository index，讓系統知道目前可安裝的套件版本。
```

---

### 9.3 安裝 NGINX

```
sudo apt-get install -y nginx
```

參數說明：

|指令|說明|
|---|---|
|`sudo`|使用 root 權限|
|`apt-get install`|安裝套件|
|`-y`|自動回答 yes|
|`nginx`|要安裝的套件名稱|

---

### 9.4 確認 NGINX process

```
ps auwx | grep nginx
```

成功時會看到類似：

```
root      1406  0.0  0.0  10380   980 ? Ss  nginx: master processwww-data  1407  0.0  0.2  25580  9512 ? S   nginx: worker processwww-data  1408  0.0  0.2  25580  9512 ? S   nginx: worker process
```

角色說明：

|Process|說明|
|---|---|
|`nginx: master process`|NGINX 主程序|
|`nginx: worker process`|實際處理 HTTP request 的 worker|
|`www-data`|Debian/Ubuntu 上 Web Server 常用 user|

---

### 9.5 離開 VM

```
exit
```

---

## 10. 驗證 NGINX

### 10.1 取得 VM external IP

```
gcloud compute instances describe gcelab \  --zone=us-west1-a \  --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
```

範例：

```
35.252.202.230
```

---

### 10.2 使用 curl 測試

```
curl -I http://EXTERNAL_IP/
```

成功時會看到：

```
HTTP/1.1 200 OKServer: nginx/1.22.1Content-Type: text/html
```

意思：

|回應|說明|
|---|---|
|`HTTP/1.1 200 OK`|Web Server 正常回應|
|`Server: nginx/1.22.1`|回應來自 NGINX|
|`Content-Type: text/html`|回傳 HTML 頁面|

---

### 10.3 用瀏覽器測試

打開：

```
http://EXTERNAL_IP/
```

應該看到：

```
Welcome to nginx!
```

---

## 11. Task 3 — 使用 gcloud 建立第二台 VM：`gcelab2`

### 11.1 指令

```
gcloud compute instances create gcelab2 \  --machine-type=e2-medium \  --zone=$ZONE
```

如果已設定：

```
export ZONE=us-west1-a
```

則等價於：

```
gcloud compute instances create gcelab2 \  --machine-type=e2-medium \  --zone=us-west1-a
```

---

### 11.2 預設值

若未特別指定 image、disk 等設定，Compute Engine 會套用預設值。

本 lab 中預設值包括：

|項目|預設值|
|---|---|
|OS|Debian GNU/Linux 12 bookworm|
|Machine Type|`e2-medium`|
|Boot Disk|與 VM 同名的 persistent disk|
|Disk auto-delete|VM 刪除時一併刪除|
|Network|default VPC|
|Internal IP|自動分配|
|External IP|自動分配|

---

### 11.3 驗證 VM 清單

```
gcloud compute instances list
```

預期看到：

```
NAME      ZONE        MACHINE_TYPE  STATUSgcelab    us-west1-a  e2-medium     RUNNINGgcelab2   us-west1-a  e2-medium     RUNNING
```

---

### 11.4 SSH 進入第二台 VM

```
gcloud compute ssh gcelab2 --zone=us-west1-a
```

離開：

```
exit
```

---

## 12. 一次完成版 Bash Script

這是本次 lab 最實用版本，會自動：

- 設定 region / zone
- 建立 HTTP firewall rule
- 建立 `gcelab`
- 安裝 NGINX
- 測試 HTTP
- 建立 `gcelab2`

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