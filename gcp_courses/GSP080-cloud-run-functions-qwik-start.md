# GSP080 — Cloud Run Functions: Qwik Start (CLI) / Cloud Run Functions 快速入門（指令列）

> **Lab ID:** GSP080  
> **Platform:** Google Skills / Qwiklabs  
> **Level:** Introductory  
> **Main Service:** Cloud Run functions (Cloud Functions Gen2)  
> **Trigger:** Pub/Sub topic  
> **Runtime:** Node.js  
> **Function:** `nodejs-pubsub-function`  
> **Entry Point:** `helloPubSub`  
> **Topic:** `cf-demo`  
> **Region Used:** `asia-south1`

---

## 1. Lab Objectives / 實驗目標

**English:** Build, deploy, and test a **Cloud Run function (Gen2)** triggered by a **Pub/Sub topic** using the Cloud Shell CLI.

**繁體中文：** 透過 Cloud Shell 指令列，建立、部署並測試由 **Pub/Sub topic** 觸發的 **Cloud Run function（Gen2）**。

完成後應能：

1. Configure Cloud Run functions region / 設定 Cloud Run functions 區域
2. Write a Node.js CloudEvent handler / 撰寫 Node.js CloudEvent 處理函式
3. Create `index.js` and `package.json` / 建立 `index.js` 與 `package.json`
4. Install Functions Framework via `npm install` / 安裝 Functions Framework
5. Deploy a Gen2 function with `gcloud functions deploy --gen2` / 部署 Gen2 函式
6. Trigger via Pub/Sub and verify logs / 以 Pub/Sub 觸發並驗證 log
7. Handle `constraints/gcp.resourceLocations` / 處理 Qwiklabs 區域限制

---

## 2. What Are Cloud Run Functions? / Cloud Run Functions 是什麼？

**English:** **Cloud Run functions** are event-driven, serverless functions that run code in response to events — no VM management required.

**繁體中文：** **Cloud Run functions** 是事件驅動的 serverless 函式，在事件發生時執行程式碼，無需管理 VM。

| Characteristic | Description / 說明 |
|----------------|-------------------|
| Event-driven | Runs only when triggered / 僅在觸發時執行 |
| Serverless | No server management / 無需管理伺服器 |
| Gen2 | Built on Cloud Run + Eventarc / 基於 Cloud Run 與 Eventarc |

**Common triggers / 常見觸發器:**

| Trigger | Use case / 用途 |
|---------|-----------------|
| Pub/Sub topic | Background message processing / 背景訊息處理 |
| Cloud Storage | File upload events / 檔案上傳事件 |
| HTTP | Simple API endpoints / 簡單 API 端點 |
| Eventarc | Google Cloud event routing / Google Cloud 事件路由 |

---

## 3. Gen2 Architecture / Gen2 架構

```
Pub/Sub Topic: cf-demo
        │ publish "Cloud Function Gen2"
        ▼
Cloud Run function (Gen2)
  entry point: helloPubSub
        │ decode Base64 message
        ▼
console.log("Hello, Cloud Function Gen2!")
        │
        ▼
Cloud Logging
```

**English:** Gen2 functions (`--gen2`) run on Cloud Run infrastructure with Eventarc for event routing.

**繁體中文：** Gen2 函式（`--gen2`）運行於 Cloud Run 基礎架構，透過 Eventarc 路由事件。

---

## 4. Source Code / 原始碼

### `index.js`

```javascript
const functions = require('@google-cloud/functions-framework');

functions.cloudEvent('helloPubSub', cloudEvent => {
  const base64name = cloudEvent.data.message.data;
  const name = base64name
    ? Buffer.from(base64name, 'base64').toString()
    : 'World';
  console.log(`Hello, ${name}!`);
});
```

| Element | Description / 說明 |
|---------|-------------------|
| `cloudEvent('helloPubSub', ...)` | Registers entry point — must match `--entry-point` |
| `cloudEvent.data.message.data` | Pub/Sub payload (Base64-encoded) |
| `Buffer.from(..., 'base64')` | Decodes message to plain text |
| `console.log(...)` | Writes to Cloud Logging |

### `package.json`

```json
{
  "name": "gcf_hello_world",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.0.0"
  }
}
```

---

## 5. Step-by-Step Instructions / 操作步驟

### Step 1 — Set region / 設定區域

```bash
gcloud config set run/region asia-south1
gcloud config set functions/region asia-south1
gcloud config set compute/region asia-south1
```

---

### Step 2 — Create source directory / 建立原始碼目錄

```bash
mkdir gcf_hello_world && cd gcf_hello_world
# Create index.js and package.json (see Section 4)
npm install
```

---

### Step 3 — Enable required APIs / 啟用必要 API

```bash
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable eventarc.googleapis.com
gcloud services enable pubsub.googleapis.com
gcloud services enable storage.googleapis.com
gcloud services enable logging.googleapis.com
```

---

### Step 4 — Create supporting resources / 建立支援資源

```bash
PROJECT_ID="$(gcloud config get-value project)"
REGION="asia-south1"
BUCKET="${PROJECT_ID}-bucket"
SA="cloudfunctionsa@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud iam service-accounts create cloudfunctionsa \
  --display-name="Cloud Functions runtime service account" || true

gcloud pubsub topics create cf-demo || true

gcloud storage buckets create "gs://${BUCKET}" \
  --location="$REGION" \
  --uniform-bucket-level-access || true
```

---

### Step 5 — Deploy function / 部署函式

```bash
gcloud functions deploy nodejs-pubsub-function \
  --gen2 \
  --runtime=nodejs20 \
  --region="$REGION" \
  --source=. \
  --entry-point=helloPubSub \
  --trigger-topic cf-demo \
  --stage-bucket "$BUCKET" \
  --service-account "$SA" \
  --allow-unauthenticated
```

Verify state / 驗證狀態:

```bash
gcloud functions describe nodejs-pubsub-function \
  --gen2 --region="$REGION" \
  --format='value(state)'
# Expected: ACTIVE
```

---

### Step 6 — Test with Pub/Sub / 以 Pub/Sub 測試

```bash
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
```

Expected log / 預期 log:

```
Hello, Cloud Function Gen2!
```

---

### Step 7 — Read logs / 查看 Log

```bash
gcloud functions logs read nodejs-pubsub-function \
  --region=asia-south1 \
  --limit=20
```

> **Note:** Logs may take 1–10 minutes to appear.  
> **注意：** Log 可能需要 1–10 分鐘才會出現。

**Fallback via Cloud Logging:**

```bash
gcloud logging read \
  'resource.type="cloud_run_revision" AND resource.labels.service_name="nodejs-pubsub-function"' \
  --limit=10 \
  --format='table(timestamp,textPayload)'
```

---

## 6. Region Policy / 區域限制

**English:** Before deploying, check `constraints/gcp.resourceLocations` and use an exact allowed region (e.g., `asia-south1`), not broad values like `US` or `asia`.

**繁體中文：** 部署前先查詢 `constraints/gcp.resourceLocations`，使用 `allowedValues` 中的具體 region（如 `asia-south1`），不要用 `US`、`asia` 等寬泛值。

```bash
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \
  --project="$PROJECT_ID" \
  --effective
```

---

## 7. Deploy Parameters Reference / 部署參數說明

| Parameter | Description / 說明 |
|-----------|-------------------|
| `--gen2` | Deploy as Cloud Functions Gen2 / 部署為 Gen2 |
| `--runtime=nodejs20` | Node.js runtime version |
| `--entry-point=helloPubSub` | Must match `functions.cloudEvent()` name |
| `--trigger-topic cf-demo` | Pub/Sub topic trigger |
| `--stage-bucket` | Staging bucket for source upload |
| `--service-account` | Runtime service account (least privilege) |

---

## 8. Troubleshooting / 疑難排解

| Issue | Fix / 解法 |
|-------|-----------|
| `violates constraint gcp.resourceLocations` | Query policy, use allowed exact region |
| `Regional Access Boundary` warning | Ignore if deploy succeeds |
| No logs yet | Wait 1–10 min, retry `gcloud functions logs read` |
| Function not ACTIVE | `gcloud functions describe ... --format=yaml(state)` |
| `serviceAccountTokenCreator` prompt | Press `n` in lab environment |

---

## 9. Security Notes / 安全補充

**English:** In production, use a dedicated service account with least-privilege roles (`logging.logWriter`, `pubsub.subscriber`, `eventarc.eventReceiver`) — not Owner or Editor.

**繁體中文：** 正式環境應使用專用 service account，授予最小權限角色，避免使用 Owner 或 Editor。

---

## 10. Comparison / 服務比較

| | Cloud Run functions | Cloud Run | Compute Engine |
|---|---------------------|-----------|----------------|
| Unit | Function source | Container / source | VM |
| Scaling | Automatic | Automatic | Manual |
| Best for | Event handlers | Full services | Long-running processes |

---

## 11. Summary / 總結

**English:** GSP080 teaches the Gen2 Cloud Run functions workflow — write a Node.js CloudEvent handler, deploy with Pub/Sub trigger, publish a message, and verify logs. Key concepts: Base64 Pub/Sub payloads, `--entry-point` matching, and region policy checks in Qwiklabs.

**繁體中文：** GSP080 教導 Gen2 Cloud Run functions 完整流程：撰寫 Node.js CloudEvent 處理函式 → 以 Pub/Sub 觸發部署 → 發布訊息 → 驗證 log。重點：Pub/Sub 訊息為 Base64 編碼、`--entry-point` 須與程式碼一致、Qwiklabs 需先確認 region 政策。
