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
- 顯示VM清單

```bash
cat > run_gcelab_safe.sh <<'EOF'
#!/usr/bin/env bash

set +e

echo "========== GCP Compute Engine Lab Safe Runner =========="

PROJECT_ID="$(gcloud config get-value project 2>/dev/null | tail -n1)"
REGION="us-west1"
ZONE="us-west1-a"

echo "[INFO] Project: $PROJECT_ID"
echo "[INFO] Region:  $REGION"
echo "[INFO] Zone:    $ZONE"

if [[ -z "$PROJECT_ID" || "$PROJECT_ID" == "(unset)" ]]; then
  echo "[ERROR] Project ID is not set."
  echo "Run: gcloud config set project PROJECT_ID"
  exit 1
fi

echo ""
echo "========== 1. Set gcloud config =========="
gcloud config set project "$PROJECT_ID"
gcloud config set compute/region "$REGION"
gcloud config set compute/zone "$ZONE"

echo ""
echo "========== 2. Check org policy =========="
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \
  --project="$PROJECT_ID" \
  --effective 2>/dev/null | grep -E "us-west1|allowedValues|constraint" || true

echo ""
echo "========== 3. Enable Compute Engine API =========="
gcloud services enable compute.googleapis.com || true

echo ""
echo "========== 4. Ensure HTTP firewall rule =========="
if gcloud compute firewall-rules describe default-allow-http >/dev/null 2>&1; then
  echo "[OK] Firewall rule default-allow-http already exists."
else
  gcloud compute firewall-rules create default-allow-http \
    --network=default \
    --allow=tcp:80 \
    --target-tags=http-server \
    --source-ranges=0.0.0.0/0
fi

echo ""
echo "========== 5. Check default subnet in us-west1 =========="
gcloud compute networks subnets list \
  --filter="network:default AND region:us-west1" \
  --format="table(name,region,network,range)"

echo ""
echo "========== 6. Create VM: gcelab =========="

if gcloud compute instances describe gcelab --zone="$ZONE" >/dev/null 2>&1; then
  echo "[OK] gcelab already exists. Skipping creation."
else
  gcloud compute instances create gcelab \
    --zone="$ZONE" \
    --machine-type=e2-medium \
    --image-family=debian-12 \
    --image-project=debian-cloud \
    --boot-disk-size=10GB \
    --boot-disk-type=pd-balanced \
    --tags=http-server \
    --metadata=startup-script='#!/bin/bash
apt-get update
apt-get install -y nginx
systemctl enable nginx
systemctl restart nginx
echo "GCELAB NGINX OK" > /var/www/html/gcelab.txt
'
fi

echo ""
echo "========== 7. Wait for NGINX startup script =========="
echo "Waiting 90 seconds..."
sleep 90

echo ""
echo "========== 8. Get external IP =========="
EXTERNAL_IP="$(gcloud compute instances describe gcelab \
  --zone="$ZONE" \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)' 2>/dev/null)"

echo "[INFO] gcelab external IP: $EXTERNAL_IP"

if [[ -n "$EXTERNAL_IP" ]]; then
  echo ""
  echo "========== 9. Test NGINX HTTP =========="
  echo "Testing http://$EXTERNAL_IP/"
  for i in {1..12}; do
    curl -I "http://$EXTERNAL_IP/" && break
    echo "[WAIT] NGINX not ready yet... attempt $i/12"
    sleep 10
  done
else
  echo "[WARN] Could not get external IP."
fi

echo ""
echo "========== 10. Optional SSH check =========="
echo "If SSH fails, this script will continue."

gcloud compute ssh gcelab \
  --zone="$ZONE" \
  --quiet \
  --command="ps auwx | grep nginx | grep -v grep" || echo "[WARN] SSH check failed or NGINX not ready yet."

echo ""
echo "========== 11. Create VM: gcelab2 =========="

if gcloud compute instances describe gcelab2 --zone="$ZONE" >/dev/null 2>&1; then
  echo "[OK] gcelab2 already exists. Skipping creation."
else
  gcloud compute instances create gcelab2 \
    --machine-type=e2-medium \
    --zone="$ZONE"
fi

echo ""
echo "========== 12. Final VM list =========="
gcloud compute instances list

echo ""
echo "========== DONE =========="
echo "Project: $PROJECT_ID"
echo "Region:  $REGION"
echo "Zone:    $ZONE"
echo "VM 1:    gcelab"
echo "VM 2:    gcelab2"
echo "NGINX:   http://$EXTERNAL_IP/"
echo ""
echo "Now click 'Check my progress' in the lab page."
EOF

chmod +x run_gcelab_safe.sh
bash run_gcelab_safe.sh 2>&1 | tee run_gcelab_safe.log
```