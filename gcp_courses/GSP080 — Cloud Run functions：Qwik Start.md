
 GSP080 — Cloud Run functions：Qwik Start - 指令列  ## Google Cloud 自學實驗室筆記> Lab ID: **GSP080**  > Lab Name: **Cloud Run functions：Qwik Start - 指令列**  > Platform: **Google Skills / Qwiklabs**  > Score: **100 / 100**  > Level: **Introductory**  > Main Service: **Cloud Run functions / Cloud Functions Gen2**  > Trigger Type: **Pub/Sub topic trigger**  > Language Runtime: **Node.js**  > Function Name: `nodejs-pubsub-function`  > Entry Point: `helloPubSub`  > Pub/Sub Topic: `cf-demo`  > Test Message: `Cloud Function Gen2`  > Expected Log: `Hello, Cloud Function Gen2!`  > Final Region Used: `asia-south1`---# 1. Lab 核心目標本實驗室的目標是透過 **Cloud Shell 指令列**建立、部署、測試一個 **Cloud Run function / Cloud Functions Gen2**。完成後應理解：1. 如何設定 Cloud Run functions 的 region。2. 如何撰寫 Node.js CloudEvent function。3. 如何建立 `index.js` 與 `package.json`。4. 如何使用 `npm install` 安裝 Functions Framework。5. 如何部署 Gen2 Cloud Function。6. 如何使用 Pub/Sub topic 觸發 function。7. 如何查看 Cloud Run functions log。8. 如何處理 Qwiklabs 中常見的 `constraints/gcp.resourceLocations` 區域限制。9. 如何判斷 `Regional Access Boundary` warning 是否真的造成失敗。---# 2. Cloud Run functions 是什麼？**Cloud Run functions** 是 Google Cloud 的事件導向 serverless function 服務。它的特徵是：```text事件發生時才執行程式碼不需要維護 VM不需要管理伺服器適合短時間、事件驅動、背景處理工作
```

典型使用情境：

|場景|說明|
|---|---|
|Cloud Storage 事件|檔案上傳後自動產生縮圖|
|Pub/Sub 訊息|收到訊息後執行背景處理|
|Firestore 事件|資料變更後觸發同步或報表|
|HTTP 請求|建立簡單 API endpoint|
|Eventarc 事件|接收 Google Cloud 事件並觸發服務|

本 lab 使用的是：

```
Pub/Sub topic event trigger
```

---

# 3. Cloud Run functions / Cloud Functions Gen2 關係

本 lab 指令使用：

```
gcloud functions deploy ... --gen2
```

這代表部署的是 **Cloud Functions 2nd gen**。  
Cloud Functions Gen2 底層基於 Cloud Run 與 Eventarc，因此 Google Skills 新版教材會稱為：

```
Cloud Run functions
```

可以理解成：

```
Cloud Functions Gen2 = Cloud Run-based functions
```

---

# 4. 本 Lab 架構

```
Pub/Sub Topic: cf-demo        |        | publish message: "Cloud Function Gen2"        vCloud Run function / Gen2 function        |        | entry point: helloPubSub        vDecode Pub/Sub message from base64        |        vconsole.log("Hello, Cloud Function Gen2!")        |        vCloud Logging / gcloud functions logs read
```

---

# 5. Lab 實際完成狀態

|項目|值|
|---|---|
|Score|`100 / 100`|
|Project ID|`qwiklabs-gcp-03-5c6f1c432e48`|
|Active Account|`student-03-f1c27e43f0ae@qwiklabs.net`|
|Selected Region|`asia-south1`|
|Function Name|`nodejs-pubsub-function`|
|Pub/Sub Topic|`cf-demo`|
|Source Directory|`~/gcf_hello_world`|
|Stage Bucket|`gs://PROJECT_ID-bucket`|
|Runtime Service Account|`cloudfunctionsa@PROJECT_ID.iam.gserviceaccount.com`|
|Expected Log|`Hello, Cloud Function Gen2!`|

---

# 6. 重要：Region Selection / Org Policy

## 6.1 為什麼要先檢查 `constraints/gcp.resourceLocations`

Qwiklabs project 經常會套用 organization policy，限制資源只能建立在特定地區。

查詢指令：

```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective
```

要看：

```
constraint: constraints/gcp.resourceLocationslistPolicy:  allowedValues:  - ...
```

本 lab 你遇到的 policy 允許：

```
asia-south1asia-south1-locationsasia-south1-aasia-south1-basia-south1-c
```

因此最終應選：

```
REGION=asia-south1
```

---

## 6.2 為什麼不能只看到 `us` 或 `US` 就選美國區域

Policy 裡有時會出現：

```
usUS
```

但這不代表所有具體 region 都可用，例如：

```
us-central1us-east1us-west1
```

在 Qwiklabs 中，實際建立資源時通常檢查的是具體 region，例如：

```
asia-south1us-east1us-central1
```

因此比較安全的邏輯是：

```
只接受 exact region match或 region-locations match
```

例如：

```
asia-south1asia-south1-locations
```

才視為 `asia-south1` 可用。

---

## 6.3 正確 region 選擇邏輯

你的 GSP080 修正版邏輯是：

```
1. 先讀取 constraints/gcp.resourceLocations2. 解析 allowedValues3. 優先嘗試具體 us-* region4. 若沒有具體 us-* region 可用，再使用 lab 指定或 policy 允許的 region5. 不使用 broad value，例如 us / US / asia / global，作為具體 region 的充分證明
```

這個邏輯是正確的。你之前在 App Engine lab 也已經遇過類似問題：`us-central` 會被轉成 `us-central1` 檢查，而 `us-central1` 若不在 allowedValues 內就會失敗。這類經驗可泛化到 GSP080 的 region selection。

---

# 7. Task 1 — 建立函式程式碼

## 7.1 設定 Cloud Run region

Lab 指定：

```
gcloud config set run/region asia-south1
```

也可以同時設定：

```
gcloud config set functions/region asia-south1gcloud config set compute/region asia-south1
```

其中：

|Config|用途|
|---|---|
|`run/region`|Cloud Run / Cloud Run functions 預設 region|
|`functions/region`|Cloud Functions 預設 region|
|`compute/region`|某些 gcloud 工具或 lab 顯示用|

---

## 7.2 建立工作目錄

Lab 原始指令：

```
mkdir gcf_hello_world && cd $_
```

說明：

|指令|說明|
|---|---|
|`mkdir gcf_hello_world`|建立 function source code 目錄|
|`cd $_`|進入上一個指令的最後一個參數，也就是 `gcf_hello_world`|

等價於：

```
mkdir gcf_hello_worldcd gcf_hello_world
```

---

## 7.3 建立 `index.js`

檔案：

```
nano index.js
```

內容：

```
const functions = require('@google-cloud/functions-framework');// Register a CloudEvent callback with the Functions Framework that will// be executed when the Pub/Sub trigger topic receives a message.functions.cloudEvent('helloPubSub', cloudEvent => {  // The Pub/Sub message is passed as the CloudEvent's data payload.  const base64name = cloudEvent.data.message.data;  const name = base64name    ? Buffer.from(base64name, 'base64').toString()    : 'World';  console.log(`Hello, ${name}!`);});
```

---

# 8. `index.js` 程式碼解釋

## 8.1 載入 Functions Framework

```
const functions = require('@google-cloud/functions-framework');
```

`@google-cloud/functions-framework` 是 Google Cloud 提供的 Node.js functions framework。  
它讓你的本地 Node.js 程式能符合 Cloud Functions / Cloud Run functions 的事件處理格式。

---

## 8.2 註冊 CloudEvent function

```
functions.cloudEvent('helloPubSub', cloudEvent => {
```

這行做兩件事：

|元素|說明|
|---|---|
|`cloudEvent`|表示這是一個 CloudEvent function|
|`helloPubSub`|function 的 entry point|
|`cloudEvent => { ... }`|事件到達時執行的 callback|

部署時要對應：

```
--entry-point=helloPubSub
```

若 entry point 名稱不一致，部署可能成功，但事件不會正確執行。

---

## 8.3 讀取 Pub/Sub message

```
const base64name = cloudEvent.data.message.data;
```

Pub/Sub message 傳入 CloudEvent 時，payload 會放在：

```
cloudEvent.data.message.data
```

而且內容是：

```
Base64 encoded string
```

---

## 8.4 解碼 Base64

```
const name = base64name  ? Buffer.from(base64name, 'base64').toString()  : 'World';
```

邏輯：

|狀況|結果|
|---|---|
|有 Pub/Sub message data|從 Base64 解碼成文字|
|沒有 message data|使用預設值 `World`|

如果發布訊息：

```
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
```

function 內部接收到的是 Base64 後的值，解碼後才會得到：

```
Cloud Function Gen2
```

---

## 8.5 寫入 Cloud Logging

```
console.log(`Hello, ${name}!`);
```

如果 message 是：

```
Cloud Function Gen2
```

log 會顯示：

```
Hello, Cloud Function Gen2!
```

這也是本 lab 的驗證重點。

---

# 9. 建立 `package.json`

檔案：

```
nano package.json
```

內容：

```
{  "name": "gcf_hello_world",  "version": "1.0.0",  "main": "index.js",  "scripts": {    "start": "node index.js",    "test": "echo \"Error: no test specified\" && exit 1"  },  "dependencies": {    "@google-cloud/functions-framework": "^3.0.0"  }}
```

---

# 10. `package.json` 解釋

|欄位|說明|
|---|---|
|`name`|npm package 名稱|
|`version`|package 版本|
|`main`|主要入口檔案|
|`scripts.start`|啟動 script|
|`dependencies`|部署與執行需要的 Node.js 套件|

最重要的是：

```
"@google-cloud/functions-framework": "^3.0.0"
```

它是 Cloud Run functions / Cloud Functions Node.js event handler 的核心依賴。

---

# 11. 安裝 Node.js dependencies

```
npm install
```

完成後會產生：

```
node_modules/package-lock.json
```

常見輸出：

```
added 140 packagesfound 0 vulnerabilities
```

注意：

```
node_modules 不一定需要手動上傳；部署時 Cloud Build 會根據 package.json / package-lock.json 安裝依賴。
```

---

# 12. Task 2 — 部署函式

## 12.1 Lab 指定部署指令結構

```
gcloud functions deploy nodejs-pubsub-function \  --gen2 \  --runtime=nodejs_version \  --region=REGION \  --source=. \  --entry-point=helloPubSub \  --trigger-topic cf-demo \  --stage-bucket PROJECT_ID-bucket \  --service-account cloudfunctionsa@PROJECT_ID.iam.gserviceaccount.com \  --allow-unauthenticated
```

本 lab 實際應代入：

```
REGION=asia-south1PROJECT_ID=qwiklabs-gcp-03-5c6f1c432e48
```

---

## 12.2 參數說明

|參數|說明|
|---|---|
|`nodejs-pubsub-function`|Function 名稱|
|`--gen2`|使用 Cloud Functions Gen2，也就是 Cloud Run functions|
|`--runtime=nodejsXX`|Node.js runtime，例如 `nodejs20`、`nodejs22`|
|`--region=asia-south1`|部署區域|
|`--source=.`|使用目前目錄作為 source code|
|`--entry-point=helloPubSub`|對應 `index.js` 中註冊的 function name|
|`--trigger-topic cf-demo`|Pub/Sub topic 觸發器|
|`--stage-bucket PROJECT_ID-bucket`|部署暫存 bucket|
|`--service-account ...`|Function runtime 使用的 service account|
|`--allow-unauthenticated`|HTTP function 常見參數；本 lab 指令保留此參數|

---

## 12.3 實際部署指令範例

```
PROJECT_ID="$(gcloud config get-value project)"REGION="asia-south1"FUNCTION_NAME="nodejs-pubsub-function"TOPIC_NAME="cf-demo"BUCKET_NAME="${PROJECT_ID}-bucket"SA_EMAIL="cloudfunctionsa@${PROJECT_ID}.iam.gserviceaccount.com"gcloud functions deploy "$FUNCTION_NAME" \  --gen2 \  --runtime=nodejs20 \  --region="$REGION" \  --source=. \  --entry-point=helloPubSub \  --trigger-topic "$TOPIC_NAME" \  --stage-bucket "$BUCKET_NAME" \  --service-account "$SA_EMAIL" \  --allow-unauthenticated
```

---

# 13. 部署前需要的資源

## 13.1 Required APIs

通常需要：

```
gcloud services enable cloudfunctions.googleapis.comgcloud services enable cloudbuild.googleapis.comgcloud services enable run.googleapis.comgcloud services enable eventarc.googleapis.comgcloud services enable pubsub.googleapis.comgcloud services enable artifactregistry.googleapis.comgcloud services enable storage.googleapis.comgcloud services enable logging.googleapis.com
```

用途：

|API|用途|
|---|---|
|`cloudfunctions.googleapis.com`|部署與管理 Gen2 functions|
|`cloudbuild.googleapis.com`|建置 source code|
|`run.googleapis.com`|Gen2 function 底層 Cloud Run service|
|`eventarc.googleapis.com`|事件路由|
|`pubsub.googleapis.com`|Pub/Sub topic trigger|
|`artifactregistry.googleapis.com`|儲存 build image / artifact|
|`storage.googleapis.com`|stage bucket / source upload|
|`logging.googleapis.com`|Cloud Logging|

---

## 13.2 Pub/Sub Topic

Lab topic：

```
cf-demo
```

建立：

```
gcloud pubsub topics create cf-demo
```

檢查：

```
gcloud pubsub topics describe cf-demo
```

---

## 13.3 Stage Bucket

Lab 指定：

```
PROJECT_ID-bucket
```

建立：

```
gcloud storage buckets create "gs://${PROJECT_ID}-bucket" \  --location="asia-south1" \  --uniform-bucket-level-access
```

說明：

|項目|說明|
|---|---|
|Stage bucket|部署時暫存 source archive|
|`--location`|必須符合 resource location policy|
|`--uniform-bucket-level-access`|使用 bucket-level IAM|

---

## 13.4 Service Account

Lab 指定 runtime service account：

```
cloudfunctionsa@PROJECT_ID.iam.gserviceaccount.com
```

建立：

```
gcloud iam service-accounts create cloudfunctionsa \  --display-name="Cloud Functions runtime service account"
```

檢查：

```
gcloud iam service-accounts describe \  cloudfunctionsa@PROJECT_ID.iam.gserviceaccount.com
```

---

# 14. Task 2 — 驗證 Function 狀態

部署後執行：

```
gcloud functions describe nodejs-pubsub-function \  --gen2 \  --region=asia-south1
```

或只看狀態：

```
gcloud functions describe nodejs-pubsub-function \  --gen2 \  --region=asia-south1 \  --format='value(state)'
```

成功狀態：

```
ACTIVE
```

常見輸出欄位：

```
state: ACTIVEbuildConfig:  runtime: nodejs20  entryPoint: helloPubSubserviceConfig:  uri: https://...eventTrigger:  eventType: google.cloud.pubsub.topic.v1.messagePublished
```

---

# 15. Task 3 — 測試函式

## 15.1 發布 Pub/Sub message

```
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
```

成功時會看到：

```
messageIds:- 'xxxxxxxxxxxxxxxx'
```

這代表 Pub/Sub 成功收到 message，接下來會觸發 function。

---

## 15.2 Function 內部實際處理

Pub/Sub message：

```
Cloud Function Gen2
```

會被 Pub/Sub 包成 Base64 後放進 CloudEvent：

```
cloudEvent.data.message.data
```

Function 解碼後：

```
Buffer.from(base64name, 'base64').toString()
```

得到：

```
Cloud Function Gen2
```

最後輸出 log：

```
Hello, Cloud Function Gen2!
```

---

# 16. Task 4 — 查看 Logs

Lab 指令：

```
gcloud functions logs read nodejs-pubsub-function \  --region=asia-south1
```

建議加上 limit：

```
gcloud functions logs read nodejs-pubsub-function \  --region=asia-south1 \  --limit=20
```

預期會看到：

```
LOG: Hello, Cloud Function Gen2!
```

---

## 16.1 Cloud Logging fallback

如果 `gcloud functions logs read` 還沒看到，可以用 Cloud Logging 查詢 Cloud Run revision：

```
gcloud logging read \  "resource.type=\"cloud_run_revision\" AND resource.labels.service_name=\"nodejs-pubsub-function\" AND textPayload:\"Hello, Cloud Function Gen2!\"" \  --limit=10 \  --format='table(timestamp,textPayload)'
```

注意：

```
Cloud Run functions logs 可能需要數分鐘才出現。Lab 文件也提醒 logs 可能需要最多 10 分鐘。
```

---

# 17. 一次完成版命令摘要

以下是概念版，不含 policy-aware selector：

```
PROJECT_ID="$(gcloud config get-value project)"REGION="asia-south1"FUNCTION_NAME="nodejs-pubsub-function"TOPIC_NAME="cf-demo"BUCKET_NAME="${PROJECT_ID}-bucket"SA_EMAIL="cloudfunctionsa@${PROJECT_ID}.iam.gserviceaccount.com"gcloud config set run/region "$REGION"gcloud config set functions/region "$REGION"gcloud config set compute/region "$REGION"gcloud services enable cloudfunctions.googleapis.comgcloud services enable cloudbuild.googleapis.comgcloud services enable run.googleapis.comgcloud services enable eventarc.googleapis.comgcloud services enable pubsub.googleapis.comgcloud services enable artifactregistry.googleapis.comgcloud services enable storage.googleapis.comgcloud services enable logging.googleapis.comgcloud iam service-accounts create cloudfunctionsa \  --display-name="Cloud Functions runtime service account" || truegcloud pubsub topics create cf-demo || truegcloud storage buckets create "gs://${BUCKET_NAME}" \  --location="$REGION" \  --uniform-bucket-level-access || truemkdir -p ~/gcf_hello_worldcd ~/gcf_hello_world
```

建立 source：

```
cat > index.js <<'JS'const functions = require('@google-cloud/functions-framework');functions.cloudEvent('helloPubSub', cloudEvent => {  const base64name = cloudEvent.data.message.data;  const name = base64name    ? Buffer.from(base64name, 'base64').toString()    : 'World';  console.log(`Hello, ${name}!`);});JS
```

建立 package：

```
cat > package.json <<'JSON'{  "name": "gcf_hello_world",  "version": "1.0.0",  "main": "index.js",  "scripts": {    "start": "node index.js",    "test": "echo \"Error: no test specified\" && exit 1"  },  "dependencies": {    "@google-cloud/functions-framework": "^3.0.0"  }}JSON
```

安裝依賴：

```
npm install
```

部署：

```
gcloud functions deploy nodejs-pubsub-function \  --gen2 \  --runtime=nodejs20 \  --region="$REGION" \  --source=. \  --entry-point=helloPubSub \  --trigger-topic cf-demo \  --stage-bucket "$BUCKET_NAME" \  --service-account "$SA_EMAIL" \  --allow-unauthenticated
```

測試：

```
gcloud pubsub topics publish cf-demo --message="Cloud Function Gen2"
```

查看 logs：

```
gcloud functions logs read nodejs-pubsub-function \  --region="$REGION" \  --limit=20
```

---

# 18. Policy-Aware Script 的核心設計筆記

## 18.1 讀取 policy

```
POLICY_TEXT="$(gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective 2>/dev/null)"
```

## 18.2 解析 allowedValues

```
ALLOWED_VALUES="$(printf '%s\n' "$POLICY_TEXT" \  | sed -n '/allowedValues:/,/^[^[:space:]]/p' \  | grep -E '^[[:space:]]*-[[:space:]]*' \  | sed -E 's/^[[:space:]]*-[[:space:]]*//' \  | tr -d '\r')"
```

## 18.3 嚴格判斷 region 是否允許

```
allowed_by_policy() {  local region="$1"  if [[ -z "$ALLOWED_VALUES" ]]; then    return 0  fi  printf '%s\n' "$ALLOWED_VALUES" | grep -qx "$region" && return 0  printf '%s\n' "$ALLOWED_VALUES" | grep -qx "${region}-locations" && return 0  return 1}
```

重點：

```
不把 us / US / asia / global 當成具體 region 可用證明。
```

## 18.4 Region priority

```
PREFERRED_REGIONS=(  us-east1  us-east4  us-east5  us-central1  us-west1  us-west2  us-west3  us-west4  asia-south1  ...)
```

邏輯：

```
先嘗試具體 us-* region如果沒有具體 us-* region 被允許再使用 lab 指定且 policy 允許的 asia-south1
```

---

# 19. Troubleshooting

## 19.1 `Regional Access Boundary HTTP request failed`

常見訊息：

```
Regional Access Boundary HTTP request failed after retriesAccount not found for email ...
```

判斷方式：

|後續輸出|判斷|
|---|---|
|`Updated property`|設定成功，可忽略 warning|
|`Operation finished successfully`|API enable 或操作成功|
|`Created [...]`|資源建立成功|
|`ERROR:`|需要看真正錯誤|

這個 warning 在 Qwiklabs 很常見。不要單獨把它當成失敗。

---

## 19.2 `constraints/gcp.resourceLocations`

錯誤：

```
Location REGION:xxx violates constraint constraints/gcp.resourceLocations
```

原因：

```
Project 的 organization policy 限制可建立資源的地區。
```

處理：

```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective
```

然後選擇 `allowedValues` 中具體允許的 region。

---

## 19.3 allowedValues parser 只抓到第一個值

你原先的 parser 只抓到：

```
aws-eu-central-1
```

但實際 policy 裡還有：

```
asia-south1asia-south1-locations
```

修正方式是使用 `sed + grep` 抓完整 `allowedValues` block，而不是在第一個非縮排行就過早停止。

---

## 19.4 `No usable region found`

原因可能是：

1. parser 壞掉，只抓到部分 allowed values。
2. policy 只有 broad values，例如 `US`，但沒有具體 region。
3. 服務不支援該 region。
4. lab session 配置錯誤。

處理：