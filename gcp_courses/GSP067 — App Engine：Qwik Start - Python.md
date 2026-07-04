
# GSP067 — App Engine：Qwik Start - Python  ## Google Cloud 運算的基本概念：Cloud 運算基礎知識> Lab ID: **GSP067**  > Lab Name: **App Engine：Qwik Start - Python**  > Platform: **Google Skills / Qwiklabs**  > Score: **100 / 100**  > Level: **Introductory**  > Main Service: **App Engine Standard Environment**  > Runtime: **Python 3 / Flask**  > Final App Message: **Hello, Cruel World!**  > Final Region Used: **us-east1**  > Project ID: `qwiklabs-gcp-04-96adb8ed109d`  > Note: Lab temporary credentials should not be stored in long-term notes.---# 1. Lab 核心目標本實驗室的目標是將一個簡單的 Python Flask 應用程式部署到 **Google App Engine Standard Environment**。完成後應理解：1. 如何啟用 **App Engine Admin API**。2. 如何下載 Google Cloud 官方 Python sample repository。3. 如何建立 Python virtual environment。4. 如何在 Cloud Shell 本機測試 Flask app。5. 如何修改 Python app 的回應內容。6. 如何部署應用程式到 App Engine。7. 如何使用 `gcloud app browse` 或 App Engine URL 查看部署結果。8. 如何處理 Qwiklabs 中常見的 `constraints/gcp.resourceLocations` 區域限制問題。---# 2. App Engine 是什麼？**App Engine** 是 Google Cloud 的全代管 serverless application platform。它讓開發者專注於：```textApplication code


而不是管理：

```
Operating systemVirtual machinesWeb serversSystem administrationLoad balancingResource schedulingMonitoring infrastructure
```

換句話說，App Engine 幫你處理底層基礎設施，你只需要提供應用程式程式碼與設定檔。

---

# 3. App Engine Standard Environment

本 lab 使用的是：

```
App Engine Standard Environment
```

它支援多種現代語言 runtime：

|Runtime|支援狀態|
|---|---|
|Python|支援|
|Java|支援|
|PHP|支援|
|Go|支援|
|Node.js / JavaScript|支援|
|Ruby|支援|

本 lab 使用：

```
Python 3 + Flask
```

---

# 4. App Engine vs Cloud Run vs Cloud Functions

App Engine 是 Google Cloud 最早期的 serverless runtime。  
Google Cloud 另有兩個常見 serverless 平台：

|服務|適合場景|
|---|---|
|**App Engine**|部署完整 Web application，Google 管理 runtime 和 scaling|
|**Cloud Functions**|事件驅動的短任務，例如 Pub/Sub、Cloud Storage trigger|
|**Cloud Run**|部署 containerized application，較現代、彈性更高|

本 lab 的 quiz 中，和 App Engine 類似的 serverless 平台是：

```
Cloud FunctionsCloud Run
```

---

# 5. Lab 架構總覽

本 lab 的部署流程如下：

```
Cloud Shell   |   | git clone sample repo   vPython Flask Hello World app   |   | local test on port 5000   vModify main.py   |   | Hello World! -> Hello, Cruel World!   vgcloud app deploy   |   vApp Engine Standard Environment   |   vhttps://PROJECT_ID.appspot.com
```

---

# 6. 使用到的主要 Google Cloud 服務

|服務|用途|
|---|---|
|**App Engine**|部署 Python Flask application|
|**App Engine Admin API**|建立與管理 App Engine application|
|**Cloud Build**|部署時可能用於 build / staging|
|**Cloud Storage**|App Engine deploy 過程中的檔案 staging|
|**Cloud Shell**|執行 git、Python、gcloud 指令|
|**Resource Manager / Org Policy**|查詢 `constraints/gcp.resourceLocations`|
|**gcloud CLI**|建立 App Engine app、部署與查看服務|

---

# 7. Lab 實際成功設定

本次 lab 的有效設定如下：

|項目|值|
|---|---|
|Project ID|`qwiklabs-gcp-04-96adb8ed109d`|
|App Engine Region|`us-east1`|
|Local Test Port|`5000`|
|Sample Repo|`GoogleCloudPlatform/python-docs-samples`|
|App Directory|`appengine/standard_python3/hello_world`|
|Final Response|`Hello, Cruel World!`|
|Score|`100 / 100`|

---

# 8. 重要：不要保存 Lab 密碼

Qwiklabs / Google Skills 提供的 username、password、project ID 都是臨時資源。  
長期筆記中可以保存：

```
Project IDLab IDRegionCommandsTroubleshooting notes
```

但不應保存：

```
Temporary lab password
```

原因：

1. 密碼短期有效。
2. 不具長期學習價值。
3. 避免憑證外洩習慣。

---

# 9. Cloud Shell 初始化

## 9.1 確認目前登入帳號

```
gcloud auth list
```

預期會看到：

```
ACTIVE: *ACCOUNT: student-xx-xxxxxxxxxxxx@qwiklabs.net
```

重點是：

```
ACTIVE: *
```

代表目前使用中的 gcloud 帳號。

---

## 9.2 確認目前 Project

```
gcloud config list project
```

或：

```
gcloud config get-value project
```

預期：

```
qwiklabs-gcp-04-96adb8ed109d
```

---

## 9.3 設定 Compute Region

雖然 App Engine deploy 本身不依賴 Compute Engine zone，但 lab 會要求設定 region：

```
gcloud config set compute/region us-east1
```

確認：

```
gcloud config get-value compute/region
```

---

# 10. Task 1 — 啟用 App Engine Admin API

## 10.1 Console 操作

路徑：

```
Navigation menu → APIs & Services → Library
```

搜尋：

```
App Engine Admin API
```

點選：

```
Enable
```

如果已經啟用，則不需額外操作。

---

## 10.2 CLI 等價指令

```
gcloud services enable appengine.googleapis.com
```

部署 App Engine 時也常需要：

```
gcloud services enable cloudbuild.googleapis.comgcloud services enable storage.googleapis.com
```

檢查：

```
gcloud services list --enabled | grep -E 'appengine|cloudbuild|storage'
```

你先前 log 中已看到 `appengine.googleapis.com`、`cloudbuild.googleapis.com`、`storage.googleapis.com` 等服務已啟用。

---

# 11. Task 2 — 下載 Hello World 應用程式

## 11.1 Clone sample repository

```
git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
```

---

## 11.2 進入 App Engine Python Hello World 目錄

```
cd python-docs-samples/appengine/standard_python3/hello_world
```

若使用自動化腳本，路徑通常是：

```
cd ~/gsp067_work/python-docs-samples/appengine/standard_python3/hello_world
```

---

## 11.3 檢查目錄內容

```
ls -la
```

通常會看到：

```
app.yamlmain.pyrequirements.txt
```

這三個檔案是本 lab 的核心。

---

# 12. 重要檔案說明

## 12.1 `main.py`

`main.py` 是 Flask 應用程式主程式。

它負責定義 route，例如：

```
@app.route("/")def hello():    return "Hello World!"
```

本 lab 要將回應改成：

```
return "Hello, Cruel World!"
```

---

## 12.2 `requirements.txt`

`requirements.txt` 定義 Python dependency。

通常包含：

```
Flask
```

部署或本地測試時會安裝這些套件。

---

## 12.3 `app.yaml`

`app.yaml` 是 App Engine 部署設定檔。

它告訴 App Engine：

```
這是一個什麼 runtime 的應用程式如何啟動用哪個 Python runtime
```

常見內容類似：

```
runtime: python312
```

實際內容依 sample repository 版本可能略有不同。

---

# 13. Task 2 — 設定 Python Virtual Environment

## 13.1 安裝 venv

```
sudo apt updatesudo apt install -y python3-venv
```

建議也安裝：

```
sudo apt install -y python3-pip git
```

---

## 13.2 建立 virtual environment

```
python3 -m venv myenv
```

---

## 13.3 啟用 virtual environment

```
source myenv/bin/activate
```

啟用後 shell prompt 通常會出現：

```
(myenv)
```

---

## 13.4 安裝 dependency

如果有 `requirements.txt`：

```
pip install -r requirements.txt
```

或直接安裝 Flask：

```
pip install Flask
```

自動化腳本中也包含建立 venv、安裝 dependency、檢查 Python / Flask 版本等步驟。

---

# 14. Task 3 — 本地測試 Flask App

## 14.1 啟動 Flask development server

在 `main.py` 與 `app.yaml` 所在目錄執行：

```
flask --app main run
```

預設會監聽：

```
127.0.0.1:5000
```

在 Cloud Shell 中若要讓 Web Preview 存取，可使用：

```
flask --app main run --host=0.0.0.0 --port=5000
```

---

## 14.2 用 curl 測試

```
curl http://127.0.0.1:5000/
```

修改前預期：

```
Hello World!
```

---

## 14.3 使用 Cloud Shell Web Preview

操作：

```
Cloud Shell → Web Preview → Change port → 5000
```

瀏覽器應顯示：

```
Hello World!
```

---

## 14.4 停止 Flask server

按：

```
Ctrl + C
```

---

# 15. Task 4 — 修改應用程式

## 15.1 使用 nano 編輯

```
nano main.py
```

將：

```
Hello World!
```

改成：

```
Hello, Cruel World!
```

儲存：

```
Ctrl + S
```

離開：

```
Ctrl + X
```

---

## 15.2 使用 sed 自動替換

也可以用 CLI：

```
sed -i 's/Hello World!/Hello, Cruel World!/g' main.py
```

若 sample 使用 `Hello, World!`：

```
sed -i 's/Hello, World!/Hello, Cruel World!/g' main.py
```

---

## 15.3 自動化腳本中的替換邏輯

你的 policy-aware 腳本會尋找多種可能字串：

```
Hello World!Hello, World!Hello WorldHello, World
```

並替換成：

```
Hello, Cruel World!
```

若找不到明確字串，腳本會嘗試替換第一個 `return "..."`。

---

# 16. Task 4 — 修改後再次本地測試

啟動：

```
flask --app main run --host=0.0.0.0 --port=5000
```

測試：

```
curl http://127.0.0.1:5000/
```

預期：

```
Hello, Cruel World!
```

停止：

```
Ctrl + C
```

---

# 17. Task 5 — 建立 App Engine Application

## 17.1 App Engine Application 是什麼？

在部署服務前，Google Cloud project 需要先初始化一個 App Engine application。

指令：

```
gcloud app create --region=REGION
```

例如本 lab 成功使用：

```
gcloud app create --region=us-east1
```

---

## 17.2 App Engine Region 不可逆

建立 App Engine application 時會看到警告：

```
Creating an App Engine application for a project is irreversible and the region cannot be changed.
```

意思是：

```
同一個 project 的 App Engine region 建立後不能更改。
```

因此在正式環境中，必須先評估：

1. 使用者所在地。
2. 延遲需求。
3. 資料落地要求。
4. 合規要求。
5. 其他後端服務所在地。

---

# 18. 本 Lab 的關鍵坑：`constraints/gcp.resourceLocations`

## 18.1 問題現象

本次 lab 曾遇到：

```
"us-central1" violates constraint "constraints/gcp.resourceLocations"
```

也曾遇到：

```
"us-west1" violates constraint "constraints/gcp.resourceLocations"
```

代表 project 的組織政策限制了資源可以建立的位置。你先前 log 清楚顯示 `us-central` 會映射到 `us-central1`，但 `us-central1` 被 resource location policy 擋住。

---

## 18.2 查詢有效 Org Policy

```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective
```

要看：

```
constraint: constraints/gcp.resourceLocationslistPolicy:  allowedValues:  - ...
```

---

## 18.3 為什麼要先看 `allowedValues`

因為 Qwiklabs 可能動態分配不同 project，不同 session 允許的 region 可能不同。

例如：

```
allowedValues:- us-east1- us-east1-a- us-east1-b- us-east1-c- us-east1-d- us-east1-locations
```

這種情況下，應優先使用：

```
gcloud app create --region=us-east1
```

---

## 18.4 App Engine Region 與底層 Location 映射

某些 App Engine region 名稱和 org policy 實際檢查的 location 不完全相同。

|App Engine Region|可能檢查的底層 Location|
|---|---|
|`us-central`|`us-central1`|
|`europe-west`|`europe-west1`|
|`us-east1`|`us-east1`|
|`us-west1`|`us-west1`|

所以不能只看到：

```
us-central
```

就假設：

```
gcloud app create --region=us-central
```

一定可行。

你的修正版腳本已加入這個 mapping 邏輯：`us-central → us-central1`、`europe-west → europe-west1`，並且優先選擇 `us-east1` 等美國區域。

---

# 19. Task 5 — 部署 App Engine App

## 19.1 部署指令

在 `app.yaml` 所在目錄執行：

```
gcloud app deploy
```

或非互動模式：

```
gcloud app deploy app.yaml --quiet
```

指定 project：

```
gcloud app deploy app.yaml \  --project="$PROJECT_ID" \  --quiet
```

---

## 19.2 部署過程會發生什麼？

`gcloud app deploy` 會做以下事情：

1. 讀取 `app.yaml`。
2. 打包目前目錄的 app source。
3. 上傳檔案到 Google Cloud staging storage。
4. 建立新的 App Engine version。
5. 更新 default service。
6. 將流量導向新版本。
7. 產生公開 URL。

---

## 19.3 常見部署輸出

成功時會看到類似：

```
Beginning deployment of service [default]...Uploading files to Google Cloud StorageUpdating service [default]...done.Deployed service [default] to [https://PROJECT_ID.appspot.com]
```

---

## 19.4 `Unable to retrieve P4SA`

Lab 文件提到：

```
If you receive "Unable to retrieve P4SA", rerun the deploy command.
```

處理：

```
gcloud app deploy app.yaml --quiet
```

如果仍失敗，檢查：

```
gcloud app describegcloud auth listgcloud services list --enabled | grep appengine
```

---

# 20. Task 6 — 查看部署後的應用程式

## 20.1 使用 gcloud app browse

```
gcloud app browse
```

Cloud Shell 可能無法直接開瀏覽器，會回傳：

```
Did not detect your browser. Go to this link to view your app:https://PROJECT_ID.appspot.com
```

---

## 20.2 直接組 URL

```
https://PROJECT_ID.appspot.com
```

本 lab 形式：

```
https://qwiklabs-gcp-04-96adb8ed109d.appspot.com
```

---

## 20.3 使用 curl 驗證

```
curl https://PROJECT_ID.appspot.com
```

預期：

```
Hello, Cruel World!
```

自動化腳本中會透過 `gcloud app describe` 取得 `defaultHostname`，再使用 `curl` 驗證回應是否包含 `Hello, Cruel World!`。

---

# 21. 一次完成版 Policy-Aware Script 筆記

你最後使用的思路是正確的：

```
先檢查 constraints/gcp.resourceLocations再解析 allowedValues再選 App Engine 支援且 policy 允許的 region並且優先選 us 開頭的 region
```

核心設計：

```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective
```

然後從：

```
allowedValues:
```

判斷可用區域。

---

## 21.1 Region 選擇策略

優先順序：

```
1. us-east12. us-west13. us-west24. us-west35. us-west46. us-east47. us-central8. northamerica-northeast19. europe-west10. asia-east1 ...
```

注意：

```
us-central 只有在 us-central1 也被允許時才選。
```

原因：

```
gcloud app create --region=us-central
```

實際可能檢查：

```
us-central1
```

---

## 21.2 為什麼不能只檢查 `US` 或 `us`

Org policy 中可能出現：

```
USusglobal
```

但 App Engine 建立時通常會檢查具體 region，例如：

```
us-east1us-central1us-west1
```

因此腳本不應只看到 `US` 就認定所有美國 region 都可用。  
你修正版的做法是使用更嚴格的 exact match：

```
underlying region exact matchunderlying-locations match
```

這是正確方向。

---

# 22. Troubleshooting 總整理

## 22.1 `Regional Access Boundary HTTP request failed`

常見訊息：

```
Regional Access Boundary HTTP request failed after retriesAccount not found for email ...
```

判斷方式：

|後續輸出|判斷|
|---|---|
|`Updated property`|設定仍成功|
|`Operation finished successfully`|API 或資源操作成功|
|`Created [...]`|資源建立成功|
|`ERROR:`|要看真正錯誤原因|

這個 warning 在 Qwiklabs 很常見，不能單獨當成失敗依據。

---

## 22.2 `FAILED_PRECONDITION: violates constraint constraints/gcp.resourceLocations`

原因：

```
Project 的 organization policy 限制資源只能建立在特定地區。
```

處理：

```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective
```

根據 `allowedValues` 選 App Engine region。

---

## 22.3 `The current Google Cloud project does not contain an App Engine application`

原因：

```
尚未執行 gcloud app create
```

處理：

```
gcloud app create --region=VALID_REGION
```

注意：

```
VALID_REGION 必須符合 resource location policy。
```

---

## 22.4 `Permission denied to enable service`

原因：

```
Qwiklabs student account 可能沒有 Service Usage API 的完整 enable 權限。
```

處理：

1. 先檢查服務是否已啟用：

```
gcloud services list --enabled | grep appengine
```

2. 若已啟用，可忽略 enable failure。
3. 若未啟用，回到 Console 手動啟用 App Engine Admin API。

---

## 22.5 `Unable to retrieve P4SA`

處理：

```
gcloud app deploy app.yaml --quiet
```

或等 1–2 分鐘後重跑。

---

## 22.6 Flask 無法啟動

檢查：

```
pwdls -lapython --versionpython -m flask --versioncat requirements.txt
```

常見原因：

|問題|修法|
|---|---|
|不在 app 目錄|`cd python-docs-samples/appengine/standard_python3/hello_world`|
|未啟用 venv|`source myenv/bin/activate`|
|Flask 未安裝|`pip install -r requirements.txt`|
|port 被占用|`pkill -f "flask --app main run"`|

---

# 23. gcloud 指令速查表

## 23.1 基本帳號 / Project

```
gcloud auth listgcloud config get-value projectgcloud config list projectgcloud config set project PROJECT_ID
```

---

## 23.2 設定 Region

```
gcloud config set compute/region us-east1
```

---

## 23.3 查 App Engine Regions

```
gcloud app regions list
```

---

## 23.4 查 Org Policy

```
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \  --project="$PROJECT_ID" \  --effective
```

---

## 23.5 啟用 API

```
gcloud services enable appengine.googleapis.comgcloud services enable cloudbuild.googleapis.comgcloud services enable storage.googleapis.com
```

---

## 23.6 建立 App Engine Application

```
gcloud app create --region=us-east1
```

---

## 23.7 查看 App Engine Application

```
gcloud app describe
```

---

## 23.8 部署 App

```
gcloud app deploy app.yaml --quiet
```

---

## 23.9 查看 App URL

```
gcloud app browse
```

或：

```
gcloud app describe --format='value(defaultHostname)'
```

---

## 23.10 查看服務與版本

```
gcloud app services listgcloud app versions list
```

---

## 23.11 查看 Log

```
gcloud app logs tail -s default
```

---

# 24. Flask 指令速查表

## 24.1 建立 venv

```
python3 -m venv myenv
```

## 24.2 啟用 venv

```
source myenv/bin/activate
```

## 24.3 安裝依賴

```
pip install -r requirements.txt
```

## 24.4 本機啟動

```
flask --app main run
```

或 Cloud Shell preview 版本：

```
flask --app main run --host=0.0.0.0 --port=5000
```

## 24.5 本機測試

```
curl http://127.0.0.1:5000/
```

---

# 25. 最短完成流程

```
PROJECT_ID="$(gcloud config get-value project)"gcloud config set compute/region us-east1gcloud services enable appengine.googleapis.com || truegcloud services enable cloudbuild.googleapis.com || truegcloud services enable storage.googleapis.com || truegcloud app create --region=us-east1git clone https://github.com/GoogleCloudPlatform/python-docs-samples.gitcd python-docs-samples/appengine/standard_python3/hello_worldsudo apt updatesudo apt install -y python3-venvpython3 -m venv myenvsource myenv/bin/activatepip install -r requirements.txtflask --app main run --host=0.0.0.0 --port=5000
```

停止 Flask：

```
Ctrl + C
```

修改：

```
sed -i 's/Hello World!/Hello, Cruel World!/g' main.pysed -i 's/Hello, World!/Hello, Cruel World!/g' main.py
```

再次測試：

```
flask --app main run --host=0.0.0.0 --port=5000
```

停止：

```
Ctrl + C
```

部署：

```
gcloud app deploy app.yaml --quiet
```

查看：

```
gcloud app browse
```

---

# 26. Quiz 答案筆記

## 26.1 With Google App Engine, what do developers need to focus on?

正確答案：

```
Application code
```

說明：

App Engine 會管理：

```
Operating systemsVirtual machinesWeb serversSystem administration
```

開發者主要專注：

```
Application code
```

---

## 26.2 What modern language runtimes are supported by App Engine?

正確答案：

```
PHPPythonRubyJavaGoNode.js / JavaScript
```

---

## 26.3 What are other serverless platforms from Google Cloud that are similar to App Engine?

正確答案：

```
Cloud FunctionsCloud Run
```

錯誤選項：

```
BigQueryGKE / Kubernetes EngineCompute EngineAll of them
```

---

# 27. App Engine 實務觀點

## 27.1 App Engine 優點

|優點|說明|
|---|---|
|無需管理 VM|不需要處理 OS、patching、instance lifecycle|
|自動擴縮|根據流量調整資源|
|簡化部署|`gcloud app deploy` 即可部署|
|內建 HTTPS|`appspot.com` URL 預設支援 HTTPS|
|適合簡單 Web App|Flask / Node / Go / Java app 很容易部署|

---

## 27.2 App Engine 限制

|限制|說明|
|---|---|
|Region 不可更改|App Engine app 建立後 region 固定|
|Runtime 限制|Standard environment 需使用支援的 runtime|
|客製化程度低於 Cloud Run|若需要 container 或特殊系統依賴，Cloud Run 更適合|
|組織政策會影響 region|`constraints/gcp.resourceLocations` 可能擋部署|

---

## 27.3 什麼時候選 App Engine？

適合：

```
簡單 Web App快速 prototype不想管理 server標準 runtime app教育 / lab / demo傳統 Flask app 快速部署
```

不適合：

```
需要自訂 container需要 GPU需要特殊 OS package需要高度可控的 runtime需要複雜 networking sidecar
```

這些情況通常選：

```
Cloud RunGKECompute Engine
```

---

# 28. Security / DevOps 補充

## 28.1 不要硬編碼 secret

Flask app 不應直接寫入：

```
API_KEY = "..."PASSWORD = "..."
```

正式環境應使用：

```
Secret ManagerEnvironment VariablesIAM Service Account
```

---

## 28.2 App Engine IAM

部署 App Engine 通常需要：

```
App Engine AdminCloud Build permissionsStorage permissionsService Account User
```

Qwiklabs 已預先配置，但有時會因臨時帳號或 org policy 出現 delay。

---

## 28.3 Log 與觀測

查看 App Engine logs：

```
gcloud app logs tail -s default
```

或 Console：

```
App Engine → Services → LogsCloud Logging → Logs Explorer
```

---

# 29. 本次 Lab 的核心學習總結

本 lab 的主線是：

```
Clone Python Flask sample→ Set up Python venv→ Run locally on port 5000→ Modify response→ Create App Engine app→ Deploy with gcloud app deploy→ Browse deployed URL
```

關鍵概念：

1. **App Engine 是 serverless application platform。**
2. **開發者只需要專注 application code。**
3. **`app.yaml` 是 App Engine 部署的核心設定檔。**
4. **`gcloud app deploy` 會部署 default service。**
5. **App Engine region 建立後不可更改。**
6. **Qwiklabs 可能有 `constraints/gcp.resourceLocations`，因此要先檢查 allowed region。**
7. **本 lab 最終使用 `us-east1` 完成部署並取得 100 / 100。**

---

# 30. 一句話版本

**GSP067 教你把一個 Python Flask Hello World app 從 Cloud Shell 本機測試、修改成 `Hello, Cruel World!`，再部署到 App Engine Standard Environment；重點是理解 App Engine 的 serverless 特性、`app.yaml`、`gcloud app deploy`，以及在 Qwiklabs 中處理 resource location policy 的方法。**