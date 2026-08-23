#!/usr/bin/env bash
set -Eeuo pipefail

# GSP1154 - Agent Studio high-success semi-automation helper
# Purpose:
#   1) pick region via constraints/gcp.resourceLocations policy-aware logic
#   2) generate copy-paste prompt pack for all GSP1154 tasks
#   3) clean broken Cloud Run apps created from Untitled prompt
#   4) print exact UI checkpoint sequence
# This lab is UI-heavy; this helper intentionally avoids claiming full gcloud completion.

log()  { printf '\n\033[1;34m[INFO]\033[0m %s\n' "$*"; }
ok()   { printf '\033[1;32m[OK]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[WARN]\033[0m %s\n' "$*"; }
fail() { printf '\033[1;31m[FAIL]\033[0m %s\n' "$*" >&2; exit 1; }
trap 'warn "Command failed near line ${LINENO}. Review output above."' ERR

PROJECT_ID="$(gcloud config get-value project 2>/dev/null || true)"
if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" || "${PROJECT_ID}" == "qwiklabs-resources" ]]; then
  DETECTED="$(gcloud projects list --filter='projectId:qwiklabs-gcp-*' --format='value(projectId)' 2>/dev/null | head -n 1 || true)"
  [[ -n "${DETECTED}" ]] || fail "No qwiklabs-gcp-* project detected. Set it manually: gcloud config set project <PROJECT_ID>"
  PROJECT_ID="${DETECTED}"
  gcloud config set project "${PROJECT_ID}" --quiet >/dev/null
fi

gcloud config set project "${PROJECT_ID}" --quiet >/dev/null
log "Project: ${PROJECT_ID}"

# -----------------------------
# Region policy discovery
# -----------------------------
POLICY_FILE="$(mktemp)"
if gcloud resource-manager org-policies describe constraints/gcp.resourceLocations --project="${PROJECT_ID}" --effective --format=json >"${POLICY_FILE}" 2>/dev/null; then
  :
elif gcloud org-policies describe constraints/gcp.resourceLocations --project="${PROJECT_ID}" --effective --format=json >"${POLICY_FILE}" 2>/dev/null; then
  :
else
  : >"${POLICY_FILE}"
  warn "Could not read constraints/gcp.resourceLocations. Falling back to us-central1."
fi

mapfile -t ALLOWED_VALUES < <(python3 - <<PY "${POLICY_FILE}"
import json, sys
p=sys.argv[1]
try:
    data=json.load(open(p)) if open(p).read().strip() else {}
except Exception:
    data={}
vals=[]
for r in data.get('listPolicy',{}).get('allowedValues',[]) or []:
    if isinstance(r,str): vals.append(r.split('/')[-1])
for r in data.get('spec',{}).get('rules',[]) or []:
    for v in r.get('values',{}).get('allowedValues',[]) or []:
        vals.append(v.split('/')[-1])
for v in vals:
    print(v)
PY
)

log "resourceLocations allowedValues: ${ALLOWED_VALUES[*]:-(none)}"

is_allowed() {
  local loc="$1"
  if [[ ${#ALLOWED_VALUES[@]} -eq 0 ]]; then return 0; fi
  local v
  for v in "${ALLOWED_VALUES[@]}"; do
    case "$v" in
      global|US|us|us-central) [[ "$loc" == us-* || "$loc" == us-central1* ]] && return 0 ;;
      *-locations) [[ "$loc" == "${v%-locations}"* ]] && return 0 ;;
      "$loc") return 0 ;;
    esac
  done
  return 1
}

REGION="${REGION:-}"
ZONE="${ZONE:-}"
if [[ -z "$REGION" ]]; then
  if is_allowed us-central1; then REGION=us-central1
  elif is_allowed us-east4; then REGION=us-east4
  else REGION="$(gcloud compute regions list --format='value(name)' 2>/dev/null | grep '^us-' | while read -r r; do is_allowed "$r" && echo "$r" && break; done || true)"
  fi
fi
[[ -n "$REGION" ]] || REGION=us-central1

if [[ -z "$ZONE" ]]; then
  if is_allowed "${REGION}-a"; then ZONE="${REGION}-a"
  else ZONE="$(gcloud compute zones list --filter="region~/${REGION}$" --format='value(name)' 2>/dev/null | head -n 1 || true)"
  fi
fi
[[ -n "$ZONE" ]] || ZONE="${REGION}-a"

gcloud config set compute/region "$REGION" --quiet >/dev/null || true
gcloud config set compute/zone "$ZONE" --quiet >/dev/null || true
ok "REGION=${REGION}"
ok "ZONE=${ZONE}"
ok "Agent Studio model region in UI: Global"
ok "Prompt save region in UI: us-central1 if available"

# -----------------------------
# Enable APIs opportunistically
# -----------------------------
log "Enabling APIs opportunistically. Warnings are acceptable in Qwiklabs."
for svc in serviceusage.googleapis.com cloudresourcemanager.googleapis.com aiplatform.googleapis.com run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com iam.googleapis.com storage.googleapis.com; do
  gcloud services enable "$svc" --project="$PROJECT_ID" --quiet >/dev/null 2>&1 || warn "Could not enable $svc; continuing."
done

# -----------------------------
# Clean wrong Cloud Run apps
# -----------------------------
log "Deleting wrong Cloud Run apps whose service name starts with genai-app-untitledprompt-* in us-central1."
BAD_SERVICES="$(gcloud run services list --region=us-central1 --format='value(metadata.name)' 2>/dev/null | grep '^genai-app-untitledprompt' || true)"
if [[ -n "$BAD_SERVICES" ]]; then
  while read -r svc; do
    [[ -n "$svc" ]] || continue
    echo "Deleting: $svc"
    gcloud run services delete "$svc" --region=us-central1 --quiet >/dev/null || warn "Could not delete $svc"
  done <<< "$BAD_SERVICES"
else
  ok "No genai-app-untitledprompt-* service found."
fi

# -----------------------------
# Generate prompt pack
# -----------------------------
PACK="${HOME}/gsp1154-agent-studio-pack"
rm -rf "$PACK"
mkdir -p "$PACK/prompts"

cat > "$PACK/00_env.sh" <<ENV
export PROJECT_ID="${PROJECT_ID}"
export REGION="${REGION}"
export ZONE="${ZONE}"
export AGENT_STUDIO_URL="https://console.cloud.google.com/agent-platform/studio/chat?project=${PROJECT_ID}"
export CLOUD_RUN_REGION="us-central1"
ENV

# Copy embedded prompt files from here-docs.
cat > "$PACK/prompts/01_task1_system_instruction.txt" <<'PROMPT'
你是保險核保部門的專業 AI 助理，主要任務是為核保人員提供精簡正確的客戶資訊摘要，並指明潛在風險因素。請保持專業客觀的語氣，只根據提示詞中的資訊回覆，不得自行杜撰細節。
PROMPT
cat > "$PACK/prompts/01_task1_prompt.txt" <<'PROMPT'
「SafeHarbor Warehousing」客戶備註：「申請人的投保標的是一座 50,000 平方英尺的倉庫。該公司成立 5 年，建築物為 2010 年興建的混凝土預鑄結構，內部存放各類非危險性乾貨。消防安全措施包括全套自動灑水系統、中央監控火災警報器，並留有認證第三方機構執行年度檢查的書面記錄。保全措施包括全天候中央監控防盜警報器、全面覆蓋室內外的監視攝影系統、完整周界圍籬，以及特約保全公司的夜間巡邏服務。該公司表示，過去 5 年間並無重大財產或責任損失。此外，申請人要求確保上個月剛安裝的自動化倉儲與取貨系統，也納入保單承保範圍。」

工作目標：
1. 提供「SafeHarbor Warehousing」業務概況與現有安全措施的精簡摘要。
2. 「僅」根據上述備註，找出核保人員應立即詢問的問題，或需進一步考量的潛在風險因素。請先列出摘要，再以條列方式呈現問題與風險。
PROMPT
cat > "$PACK/prompts/01_task1_app_test_message.txt" <<'PROMPT'
新客戶諮詢：
「申請單位『Coastal Goods Delivery』擁有一支由 10 輛貨車組成的車隊，每輛車配備 GPS 與遠端資訊處理系統。營運範圍在發貨中心方圓 100 英里內，駕駛每年都接受安全訓練。去年曾發生一起輕微擦撞事故，無人受傷，損失金額為 $1,500 美元。主要的風險考量點為何？」

請提供重點摘要並列出潛在風險因素。
PROMPT
cat > "$PACK/prompts/02_claim_extract_system_instruction.txt" <<'PROMPT'
你是 AI 助理，擅長從非結構化的保險理賠通知中，剖析與擷取特定的資料點。你的任務是準確辨識並列出關鍵資訊，如果某項資訊未出現，請明確標示「未找到」。
請以「鍵：值」格式輸出擷取的資訊，每項獨立成行。
PROMPT
cat > "$PACK/prompts/02_zero_shot_prompt.txt" <<'PROMPT'
理賠通知內容：
「各位好，剛接到 Eleanor Vance 女士的來電，保單號碼為 #POL458892。她通報 2025 年 5 月 12 日下午 3 點左右發生廚房火警，主要受損範圍似乎是烤箱和周邊櫥櫃，廚房和用餐區也受到煙燻損害。她估計總損失金額約 $7,500 美元，聯絡電話是 555-0123。所幸並無人員受傷通報。」

請擷取下列資訊：
- 保單號碼
- 理賠申請人姓名
- 損失日期
- 損失時間
- 損失類型
- 損害簡述
- 預估損失金額
- 人員受傷通報
PROMPT
cat > "$PACK/prompts/02_few_shot_example_input.txt" <<'PROMPT'
理賠通知內容：
「來自 John Sterling (保單號碼 POL77521) 的電子郵件，內容提及其店面遭遇水損。事故發生於昨天 (2025 年 5 月 10 日) 夜間某時，天花板水管破裂，導致儲藏室淹水且部分庫存受損。目前不確定損失金額，估計約 $5,000 至 $10,000 美元。事發時無人在場，無人受傷。」

請擷取下列資訊：
- 保單號碼
- 理賠申請人姓名
- 損失日期
- 損失時間
- 損失類型
- 損害簡述
- 預估損失金額
- 人員受傷通報
PROMPT
cat > "$PACK/prompts/02_few_shot_example_output.txt" <<'PROMPT'
保單號碼：POL77521
理賠申請人姓名：John Sterling
損失日期：2025 年 5 月 10 日
損失時間：夜間
損失類型：水損
損害簡述：天花板水管破裂，儲藏室淹水，部分庫存受損。
預估損失金額：$5,000 - $10,000 美元
人員受傷通報：無
PROMPT
cat > "$PACK/prompts/02_few_shot_new_input.txt" <<'PROMPT'
理賠通知內容：
「各位好，剛接到 Eleanor Vance 女士的來電，保單號碼為 #POL458892。她通報 2025 年 5 月 12 日下午 3 點左右發生廚房火警，主要受損範圍似乎是烤箱和周邊櫥櫃，廚房和用餐區也受到煙燻損害。她估計總損失金額約 $7,500 美元，聯絡電話是 555-0123。所幸無人受傷。」
PROMPT
cat > "$PACK/prompts/02_few_shot_instruction.txt" <<'PROMPT'
請從提供的理賠通知中擷取下列資料點：
- 保單號碼
- 理賠申請人姓名
- 損失日期
- 損失時間
- 損失類型
- 損害簡述
- 預估損失金額
- 人員受傷通報
PROMPT
cat > "$PACK/prompts/02_story_prompt.txt" <<'PROMPT'
Write the *first paragraph* of a short story about a homeowner who just used a futuristic AI insurance app to file a claim. The claim was for a bizarre and unexpected incident.
PROMPT
cat > "$PACK/prompts/03_risk_base_system_instruction.txt" <<'PROMPT'
你是一位保險風險分析助理，負責從提供的情境中找出潛在風險因素，並精簡說明。
PROMPT
cat > "$PACK/prompts/03_risk_improved_system_instruction.txt" <<'PROMPT'
你是一位專業的保險風險分析助理，負責從提供的情境中找出潛在風險因素，並針對各項因素，簡要提供可能緩解策略，或建議核保人員確認的問題。回覆應條理分明。
PROMPT
cat > "$PACK/prompts/03_risk_prompt.txt" <<'PROMPT'
情境：
「申請單位『The Fiery Grill』是一家新開的高級餐廳，主打柴燒窯烤披薩與明火燒烤。店內廚房已裝設全新的訂製滅火系統，但尚未通過第三方認證。此外，餐廳每逢週末夜晚會安排不插電現場演奏，並設有小型挑高舞台，也規劃提供代客泊車服務。」

請根據上述情境，列出核保人員應考慮的三大主要風險因素。
PROMPT
cat > "$PACK/prompts/03_complex_model_compare_prompt.txt" <<'PROMPT'
情境：
「申請單位『The Fiery Grill』是一家高級餐廳，主打柴燒窯烤和明火燒烤。店內裝設了全新訂製的滅火系統，但尚未通過第三方認證。餐廳設有小型挑高舞台，計劃安排不插電現場演奏，並由自家員工提供代客泊車服務。申請單位沒有過往營業記錄。」

核保準則：
優先順序：責任風險分為以下三類：
- A 類 (關鍵)：火災、結構失效、安全系統故障。
- B 類 (標準)：一般場所責任險 (例如滑倒)。
- C 類 (特定)：車輛責任險。
疊加因素：若某項「疊加風險」(會加劇其他風險的條件) 存在，必須提升至最高優先順位。
經驗不足：缺乏過往營業記錄屬於一般負面因素，但不構成主要風險。
車輛責任：C 類風險 (代客泊車) 僅在採用未經審核的第三方承包商時，才列為主要風險。

工作：
請根據上述情境與核保準則，找出唯一的首要風險，接著引用相關準則，以兩句話說明為何該風險排在首位。
PROMPT
cat > "$PACK/prompts/04_multimodal_image_analysis_prompt.txt" <<'PROMPT'
1. 提供簡短的圖片名稱 (不超過 5 字)。
2. 用一到兩句話描述圖片內容。
3. 擷取圖中所有可見文字，以格式清晰的清單呈現航班時刻表，包含「時間」和「城市」欄位。
PROMPT
cat > "$PACK/prompts/04_multimodal_calculation_question.txt" <<'PROMPT'
根據圖中的航班時刻表，所列航班在上午 11:30 前起飛的百分比為何？如果可以，請顯示計算過程。
PROMPT
cat > "$PACK/prompts/05_imagen_prompt.txt" <<'PROMPT'
一張單隻蜜蜂的寫實特寫相片。畫面中，蜜蜂正從鮮豔的紫色薰衣草花朵上採集花粉，背景則是柔焦處理的花園景色。
PROMPT
cat > "$PACK/prompts/05_chirp_optional_prompt.txt" <<'PROMPT'
歡迎來到 Google Cloud 生成式 AI 的世界
PROMPT

cat > "$PACK/README_GSP1154_ALL_TASKS.md" <<'MD'
# GSP1154 Agent Studio 高成功率半自動清單

## 開始前

- Project 必須是 `qwiklabs-gcp-*`。
- Prompt save region：`us-central1`。
- Model region：若 UI 沒有 Region 選項，使用預設 Global 即可。
- 不要保留 `genai-app-untitledprompt-*` 舊 Cloud Run app；它會造成 Task 1 只拿 10/20。

## Task 1：Create a prompt application with Agent Studio

1. Agent Platform > Studio > New chat。
2. Prompt 名稱改為：`保險風險摘要 - 原型`。
3. System instructions 貼 `prompts/01_task1_system_instruction.txt`。
4. Prompt 貼 `prompts/01_task1_prompt.txt`。
5. Model：`gemini-3.5-flash`。
6. Submit。
7. Save prompt，region 選 `us-central1`。
8. Deploy > Cloud Run > Deploy as application。
9. 勾選確認聲明，Create application 或 Update app。
10. 等狀態 Ready。
11. Open app，確認 App 標題不是 `Untitled prompt`，而是 `保險風險摘要 - 原型`。
12. 在 app 輸入 `prompts/01_task1_app_test_message.txt` 並 Submit。
13. 回 lab 按 Check my progress。

## Task 2：Prompt engineering in Agent Studio

### Zero-shot
1. New chat。
2. Prompt 名稱：`擷取保險理賠資料`。
3. System instructions：`prompts/02_claim_extract_system_instruction.txt`。
4. Main prompt：`prompts/02_zero_shot_prompt.txt`。
5. Model：`gemini-3.5-flash`。
6. Temperature：`0.1`。
7. Output token limit：`1024`。
8. Submit。

### Few-shot
1. New chat。
2. 加入 Example。
3. Example input：`prompts/02_few_shot_example_input.txt`。
4. Example output：`prompts/02_few_shot_example_output.txt`。
5. System instructions 再貼一次 `prompts/02_claim_extract_system_instruction.txt`。
6. `{Input}` 貼 `prompts/02_few_shot_new_input.txt`。
7. Prompt instruction 貼 `prompts/02_few_shot_instruction.txt`。
8. Temperature：`0.1`，Output tokens：`1024`。
9. Submit。

### Model settings exploration
1. New chat。
2. Prompt 名稱：`保險故事`。
3. Prompt：`prompts/02_story_prompt.txt`。
4. Temperature 先設 `1.5` Submit，再改 `0.1` Submit。
5. Output token limit 設 `500` Submit，再還原較高值。
6. Top-P 設 `0.8` Submit，再設 `1.0` Submit。
7. 回 lab 按 Check my progress。

## Task 3：Compare, evaluate, and manage prompts

1. New chat。
2. Prompt 名稱：`辨識保險風險因素`。
3. System：`prompts/03_risk_base_system_instruction.txt`。
4. Prompt：`prompts/03_risk_prompt.txt`。
5. Model：`gemini-3.5-flash`，Temperature：`0.2`。
6. Submit，Save。
7. 右上角三點 > Compare。
8. 右側 system 改成 `prompts/03_risk_improved_system_instruction.txt`。
9. 底部提交 `prompts/03_risk_prompt.txt`。
10. 右側 system 改回 base，右側 Temperature 改 `2.0`，再次提交。
11. 右側模型改 Gemini 2.5 Pro，Temperature `0.2`；左側模型維持 Gemini 3.5 Flash，Temperature `0.2`，思考程度最低。
12. 底部提交 `prompts/03_complex_model_compare_prompt.txt`。
13. 回 lab 按 Check my progress。

## Task 4：Image analysis with Gemini in Agent Studio

1. Agent Studio > New chat。
2. Prompt 名稱：`時刻表圖片分析`。
3. 左下角 `+` > Import from Cloud Storage。
4. 選預建 bucket 的 `timetable.png`。
5. Prompt 貼 `prompts/04_multimodal_image_analysis_prompt.txt`。
6. Submit。
7. 再提交 `prompts/04_multimodal_calculation_question.txt`。
8. Temperature 改 `0.8`，重新提交同一題。
9. Temperature 改回 `0.2`。
10. 回 lab 按 Check my progress。

## Task 5：Explore Agent Platform Media Studio

1. 左上 New chat 下拉 > Image / Generate media / Image。
2. Prompt 貼 `prompts/05_imagen_prompt.txt`。
3. Model：Imagen 4 或最新可用 Imagen。
4. Aspect ratio：`1:1`。
5. Number of results：`4`。
6. Submit。
7. 點其中一張圖打開詳細資料，確認看到 AI actions / SynthID。
8. 回 lab 按 Check my progress。

## 常見卡點

- Task 1 只有 10/20：Cloud Run app 服務名仍是 `genai-app-untitledprompt-*`。刪掉舊 app，重新從正確 prompt 部署。
- 找不到 Temperature：先關閉模型下拉選單，往右側 Model settings 往下捲或展開 Advanced。
- 找不到 Region：新版 UI 可能隱藏 model region。Save prompt 對話框用 `us-central1` 即可。
- 429 quota：等 60 秒再提交。
MD

cat > "$PACK/copyboard.html" <<'HTML'
<!doctype html><html><head><meta charset="utf-8"><title>GSP1154 Copyboard</title><style>body{font-family:sans-serif;margin:2rem;max-width:1100px}textarea{width:100%;height:130px;margin:.5rem 0}button{padding:.4rem .8rem;margin:.2rem}h2{border-top:1px solid #ddd;padding-top:1rem}</style></head><body><h1>GSP1154 Copyboard</h1><p>Open files under <code>~/gsp1154-agent-studio-pack/prompts</code> or use Cloud Shell editor. This static copyboard is generated for local convenience.</p><p>Use the Markdown checklist as source of truth.</p></body></html>
HTML

ok "Prompt pack generated: $PACK"

log "Useful commands"
cat <<EOF2
cloudshell edit ${PACK}/README_GSP1154_ALL_TASKS.md
cloudshell edit ${PACK}/prompts/01_task1_system_instruction.txt
cloudshell edit ${PACK}/prompts/01_task1_prompt.txt

gcloud run services list --region=us-central1 --format='table(metadata.name,status.url)'
EOF2

cat <<EOF3

======================================================================
GSP1154 semi-auto helper completed.

Open Agent Studio:
  https://console.cloud.google.com/agent-platform/studio/chat?project=${PROJECT_ID}

Primary checklist:
  ${PACK}/README_GSP1154_ALL_TASKS.md

Critical Task 1 fix:
  Prompt name must be exactly: 保險風險摘要 - 原型
  Old Cloud Run app name must NOT start with: genai-app-untitledprompt-*
======================================================================
EOF3
