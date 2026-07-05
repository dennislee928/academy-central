# GSP067 — App Engine: Qwik Start (Python) / App Engine 快速入門（Python）

> **Lab ID:** GSP067  
> **Platform:** Google Skills / Qwiklabs  
> **Level:** Introductory  
> **Main Service:** App Engine Standard Environment  
> **Runtime:** Python 3 / Flask  
> **Final App Message:** `Hello, Cruel World!`  
> **Region Used:** `us-east1`

---

## 1. Lab Objectives / 實驗目標

**English:** Deploy a simple Python Flask application to **Google App Engine Standard Environment**, test locally, modify the response, and deploy to production.

**繁體中文：** 將 Python Flask 應用程式部署至 **Google App Engine Standard Environment**，包含本機測試、修改回應內容與正式部署。

完成後應能：

1. Enable the **App Engine Admin API** / 啟用 App Engine Admin API
2. Clone the official Python sample repository / 下載官方 Python 範例程式庫
3. Set up a Python virtual environment / 建立 Python 虛擬環境
4. Test the Flask app locally on port 5000 / 在本機 port 5000 測試 Flask
5. Modify the app response text / 修改應用程式回應內容
6. Deploy with `gcloud app deploy` / 使用 `gcloud app deploy` 部署
7. Browse the deployed URL / 瀏覽已部署的 App Engine URL
8. Handle `constraints/gcp.resourceLocations` in Qwiklabs / 處理 Qwiklabs 區域限制政策

---

## 2. What Is App Engine? / App Engine 是什麼？

**English:** App Engine is Google Cloud's fully managed **serverless application platform**. Developers focus on **application code** — Google manages operating systems, VMs, web servers, load balancing, and scaling.

**繁體中文：** App Engine 是 Google Cloud 的**全代管 serverless 應用平台**。開發者只需專注於**應用程式程式碼**，作業系統、VM、Web 伺服器、負載平衡與擴縮由 Google 代管。

| You manage / 你負責 | Google manages / Google 負責 |
|---------------------|-------------------------------|
| Application code | OS, VMs, patching |
| `app.yaml` config | Load balancing, scaling |
| Dependencies | Infrastructure monitoring |

---

## 3. App Engine vs Other Serverless / 與其他 Serverless 比較

| Service | Best for / 適用場景 |
|---------|---------------------|
| **App Engine** | Full web apps with managed runtime / 完整 Web 應用，代管 runtime |
| **Cloud Functions** | Event-driven short tasks / 事件驅動的短任務 |
| **Cloud Run** | Containerized apps, more flexibility / 容器化應用，彈性更高 |

---

## 4. Lab Architecture / 實驗架構

```
Cloud Shell
    │ git clone sample repo
    ▼
Flask Hello World app (local test :5000)
    │ modify main.py → "Hello, Cruel World!"
    ▼
gcloud app create --region=us-east1
    │
    ▼
gcloud app deploy
    │
    ▼
https://PROJECT_ID.appspot.com
```

---

## 5. Key Files / 重要檔案

| File | Purpose / 用途 |
|------|----------------|
| `main.py` | Flask app with route handlers / Flask 路由主程式 |
| `requirements.txt` | Python dependencies (Flask) / Python 依賴套件 |
| `app.yaml` | App Engine deployment config / App Engine 部署設定 |

**Sample path / 範例路徑:**

```bash
python-docs-samples/appengine/standard_python3/hello_world/
```

---

## 6. Step-by-Step Instructions / 操作步驟

### Step 1 — Enable App Engine Admin API / 啟用 API

**Console:** Navigation menu → APIs & Services → Library → search **App Engine Admin API** → Enable

**CLI:**

```bash
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable storage.googleapis.com
```

---

### Step 2 — Clone and set up / 下載並設定環境

```bash
git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
cd python-docs-samples/appengine/standard_python3/hello_world

sudo apt update && sudo apt install -y python3-venv python3-pip
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
```

---

### Step 3 — Local test / 本機測試

```bash
flask --app main run --host=0.0.0.0 --port=5000
```

Verify / 驗證:

```bash
curl http://127.0.0.1:5000/
# Expected: Hello World!
```

Stop with `Ctrl + C`.

---

### Step 4 — Modify the app / 修改應用程式

```bash
sed -i 's/Hello World!/Hello, Cruel World!/g' main.py
sed -i 's/Hello, World!/Hello, Cruel World!/g' main.py
```

Re-test locally / 再次本機測試:

```bash
flask --app main run --host=0.0.0.0 --port=5000
curl http://127.0.0.1:5000/
# Expected: Hello, Cruel World!
```

---

### Step 5 — Create App Engine app / 建立 App Engine 應用

```bash
gcloud app create --region=us-east1
```

> **Warning / 警告:** App Engine region is **irreversible** — it cannot be changed after creation.  
> App Engine 區域建立後**不可更改**，正式環境部署前需審慎評估。

---

### Step 6 — Deploy / 部署

```bash
gcloud app deploy app.yaml --quiet
```

Expected output / 預期輸出:

```
Deployed service [default] to [https://PROJECT_ID.appspot.com]
```

---

### Step 7 — Verify / 驗證

```bash
gcloud app browse
curl https://PROJECT_ID.appspot.com
# Expected: Hello, Cruel World!
```

---

## 7. Region Policy (`constraints/gcp.resourceLocations`) / 區域限制

**English:** Qwiklabs projects often restrict which regions you can use. Always check the effective org policy before `gcloud app create`.

**繁體中文：** Qwiklabs 專案常限制可使用的區域。執行 `gcloud app create` 前，務必先查詢有效的組織政策。

```bash
PROJECT_ID="$(gcloud config get-value project)"
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \
  --project="$PROJECT_ID" \
  --effective
```

| App Engine Region | Underlying location checked / 底層檢查位置 |
|-------------------|-------------------------------------------|
| `us-central` | `us-central1` |
| `europe-west` | `europe-west1` |
| `us-east1` | `us-east1` |

**Tip:** Use exact region names from `allowedValues`, not broad values like `US` or `us`.  
**提示：** 使用 `allowedValues` 中的具體 region 名稱，不要用 `US`、`us` 等寬泛值。

---

## 8. Troubleshooting / 疑難排解

| Issue | Cause / 原因 | Fix / 解法 |
|-------|-------------|-----------|
| `violates constraint gcp.resourceLocations` | Region not in allowedValues | Query policy, pick allowed region |
| `No App Engine application` | `gcloud app create` not run | Run `gcloud app create --region=VALID` |
| `Unable to retrieve P4SA` | Transient deploy error | Retry `gcloud app deploy --quiet` |
| `Regional Access Boundary` warning | Qwiklabs transient warning | Ignore if resource created successfully |
| Flask won't start | Wrong directory or missing venv | `cd` to app dir, `source myenv/bin/activate` |

---

## 9. gcloud Quick Reference / 指令速查

```bash
# Project & region
gcloud config get-value project
gcloud config set compute/region us-east1

# App Engine
gcloud app regions list
gcloud app create --region=us-east1
gcloud app deploy app.yaml --quiet
gcloud app browse
gcloud app describe --format='value(defaultHostname)'
gcloud app logs tail -s default
```

---

## 10. Quiz Notes / 測驗筆記

| Question | Answer |
|----------|--------|
| What do developers focus on with App Engine? | **Application code** |
| Supported runtimes? | Python, Java, PHP, Go, Node.js, Ruby |
| Similar serverless platforms? | **Cloud Functions**, **Cloud Run** |

---

## 11. Summary / 總結

**English:** GSP067 walks through the full App Engine workflow — clone a Flask sample, test locally, modify the response, create an App Engine app, deploy, and verify. Key takeaways: `app.yaml` drives deployment, App Engine region is permanent, and Qwiklabs org policies may restrict region choice.

**繁體中文：** GSP067 涵蓋 App Engine 完整流程：複製 Flask 範例 → 本機測試 → 修改回應 → 建立 App Engine 應用 → 部署 → 驗證。重點：`app.yaml` 是部署核心、App Engine 區域不可更改、Qwiklabs 可能限制 region 選擇。
