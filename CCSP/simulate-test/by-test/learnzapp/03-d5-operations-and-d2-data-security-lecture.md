# CCSP 模擬測驗講義：D5 維運生命週期與 D2 資料安全錯題分析

> **講義類型：** LearnZApp 錯題精華／概念補強  
> **適用領域：** Domain 5 Cloud Security Operations；Domain 2 Cloud Data Security  
> **資料來源：** D5 維運弱點整理；D2 fresh test（`d2-2026-0919.zip`，25 題、16 對／9 錯、64%）  
> **使用方式：** 上篇固定 D5 維運心智模型；下篇切開 DLP、Discovery、Lifecycle。不要把題庫 trivia 當成 2026 考綱必背。

---

## 0. 本講義結論

1. **D5 真正要補的是維運生命週期**，不是機房 trivia。  
2. **D2 不是全面崩潰**，而是兩個高價值 cluster：DLP／Discovery／Classification，以及 Cloud Secure Data Lifecycle。  
3. TLS／PKI 有真實觀念缺口，但必須用現代 TLS 1.3 模型，不要背「憑證會產生 shared secret」。  
4. 責任可以委外操作，**accountability 通常不會消失**。

---

# 上篇：Domain 5 維運生命週期

## 1. 優先補強順序

### 1.1 P0：Patch／Baseline／Hardening／Maintenance

反覆出現的考點：

- baseline 為什麼需要 documentation
- deviations from baseline 如何處理
- hardening 與 auditing／availability 的差異
- vendor secure configuration 的角色
- patch timing、compatibility、responsibility
- snapshot／dormant VM 的 patch 問題
- 跨時區 VM 修補
- clustered host／live migration
- maintenance mode
- management plane isolation

**維運生命週期心智模型**

```text
Baseline → Harden → Document → Monitor
        → Detect deviation → Change management
        → Patch / test → Remediate → Re-baseline
```

**維護模式心智模型**

```text
Drain / migrate workload
        → 必要時阻擋新工作負載
        → 維持 monitoring / logging
        → 執行維護
        → 驗證
        → 恢復服務
```

### 1.2 P1：TLS／PKI／安全網路

TLS 正確模型：

```text
TLS
├─ Authentication
│     └─ 通常為 certificate / PKI（X.509 + digital signature）
├─ Key agreement / establishment
│     └─ TLS 1.3 通常為 (EC)DHE，或 PSK / PSK+(EC)DHE
├─ Derived traffic / session keys
│     └─ symmetric
└─ Application traffic
      └─ symmetric AEAD encryption
```

詳細推導見同資料夾 `05-tls-pki-cryptography-lecture.md`。

### 1.3 值得記、不必死磕

| 值得記 | 現階段不必死背 |
|---|---|
| Uptime Tier I–IV：Basic／Redundant Components／Concurrently Maintainable／Fault Tolerant | Secure KVM chipset 是否焊接 |
| Tier-defined facilities 燃油基準：12 hours at N load | Raised floor 是 18" 還是 24" |
| ASHRAE A1–A4 建議溫度 18–27°C（93°F 過高） | Halon「illegal」字眼 |
| ITIL = IT service management | 醫院一定是 Tier IV |
| NAS vs SAN | SIEM 一定要等三週 |
| SLE = AV × EF | 特定 HVAC airflow 用詞 |
| Risk treatment：avoid／mitigate／transfer／accept；residual risk 必須被接受 | |
| 集中日誌必須時鐘同步 | |

### 1.4 Uptime 四級

| 等級 | 名稱 | 意義 |
|---|---|---|
| Tier I | Basic Capacity | 無同步維護能力 |
| Tier II | Redundant Capacity Components | 元件冗餘 |
| Tier III | Concurrently Maintainable | 可在不停機下維護 |
| Tier IV | Fault Tolerant | 容錯 |

### 1.5 資料中心三層

```text
Physical
├─ site / location
├─ physical access
├─ seismic / flood / fire
└─ facility security

Environmental
├─ HVAC
├─ temperature / humidity
├─ airflow / hot-cold aisle
└─ fire suppression

Resilience
├─ UPS / generators / fuel
├─ redundant power
├─ redundant cooling
└─ redundant connectivity
```

---

## 2. 建議複習問題（不看筆記作答）

1. Baseline、hardening、configuration management 差在哪？  
2. Baseline deviation 正確處理順序是什麼？  
3. 為什麼 production 不能看到 patch 就直接部署？  
4. Golden image／snapshot 為何造成 patch risk？  
5. 進入 maintenance mode 前，workload 怎麼處理？  
6. HA、clustering、live migration 的差異？  
7. 為什麼 management plane 應隔離？  
8. 為什麼 maintenance mode 不能停 logging？

建議對應章節（Jason Dion／Udemy）：Operating System Hardening、System Patch Management、Host Availability Configuration、Securing the Management Plane、Guest Host Resilience。

---

# 下篇：Domain 2 資料安全錯題分析

## 3. 測驗快照

| 項目 | 結果 |
|---|---:|
| 題數 | 25 |
| 答對 | 16 |
| 答錯 | 9 |
| 分數 | 64% |
| Domain 權重 | D2 = 20%（2026 考綱最高權重之一） |

錯題不是平均分散，而是集中在兩個 cluster。

| 弱點 | 錯題 | 題數 | 優先級 |
|---|---|--:|---|
| DLP／Egress monitoring／Data Discovery | Q8、Q14、Q18 | 3 | 最高 |
| Cloud Secure Data Lifecycle／Classification | Q2、Q21、Q22 | 3 | 最高 |
| Cloud storage type | Q7 | 1 | 中 |
| Data deletion／sanitization | Q11 | 1 | 中 |
| CSA CCM mapping trivia | Q17 | 1 | 低 |

六成以上錯題落在：**工具邊界** 與 **生命週期順序**。

---

## 4. 必須一次切清的工具邊界

| 技術 | 核心問題 | 核心功能 |
|---|---|---|
| **Metadata** | 關於這份資料有哪些描述資訊？ | data about data；常自動產生 |
| **Label／Tag** | 這份資料被標記成什麼？ | 刻意附加的分類或治理標誌 |
| **Classification** | 這份資料有多敏感？ | 敏感度／類別決策 |
| **Discovery** | 資料在哪裡？內容是什麼？ | 找出、盤點、內容檢視 |
| **DLP** | 敏感資料正在去哪裡？ | 偵測、監控、阻擋外流 |
| **IRM／DRM** | 授權使用者可以做什麼？ | 持久使用權限：檢視、複製、列印、轉寄 |
| **Encryption** | 未授權者能否讀懂？ | 機密性 |
| **Tokenization** | 能否用替代值降低暴露？ | 以 token 取代真值 |

**記法**

```text
Discovery = find
Classification = decide sensitivity
Label = mark
DLP = movement
IRM = usage rights
```

2026 考綱把 DLP、data discovery、classification、IRM 拆成獨立目標，考試就是要區分，不是混成「資料保護大雜燴」。

---

## 5. Cloud Secure Data Lifecycle

```text
Create → Store → Use → Share → Archive → Destroy
```

口訣：**C-S-U-S-A-D**（CSU-SAD）

| 階段 | 典型活動 |
|---|---|
| **Create** | Classification 應盡早開始 |
| **Store** | 適當儲存與加密 |
| **Use** | 存取、處理、使用控制 |
| **Share** | 傳輸與接收方控制 |
| **Archive** | 保存、長期保護 |
| **Destroy** | 安全刪除／crypto-erasure |

**致命陷阱**

Encryption、tokenization、DLP、validate 都是 **control**，不是 lifecycle phase。  
題目問「Share 的前一個 phase」時，答案是 **Use**，不是 Encrypt。

Classification 不是永久不變。可能觸發重新分類的原因包括：時間、用途改變、所有權移轉、法規狀態改變。顏色改變（color change）通常與敏感度分類無關。

---

## 6. 儲存模型

| 類型 | 本質 | 不是什麼 |
|---|---|---|
| **Volume／Block** | 對 VM／主機呈現為 disk／volume；邏輯掛載，實體位置可遠離 compute | 不是 CDN |
| **Object** | object + metadata + identifier；多經 API 存取 | 不是區塊磁碟 |
| **CDN** | 把內容快取／派發到靠近使用者的位置 | 不是通用附加儲存區 |
| **Ephemeral** | 隨執行個體生命週期存在 | 不是長期保存 |
| **Raw** | 未格式化／直接磁碟存取場景 | 不要當萬用答案 |
| **Long-term** | 歸檔與長期保存 | 不是高效能區塊盤 |

題幹若描述「配置給使用者的邏輯儲存區，實體上不一定接在 compute node」，答案通常是 **Volume storage**。

---

## 7. 雲端刪除與殘餘資料

先問：

> **Who controls the physical media?**

```text
自己控制實體媒體
        → Clear / Purge / Destroy（含 overwrite、物理銷毀）

雲端抽象／多租戶／CSP 控制媒體
        → 常無法保證實體 sector overwrite
        → cryptographic erasure（銷毀金鑰）+ provider process
        → 仍須考慮 replica、snapshot、backup
```

**不要背**

- overwrite 在雲端一定不行，因為「主管機關不喜歡」  
- crypto-shredding 永遠最好  
- physical destruction 永遠最好  

「Regulators frown on overwrite」不是雲端難以覆寫的真正原因。真正原因是抽象化、多租戶、複製與客戶無法保證實體區塊覆寫。

---

## 8. 逐題診斷摘要

| 題目 | 選錯 | 正解 | 品質 | 處理方式 |
|---|---|---|---|---|
| Q2 Classification 在哪個 phase | Define | **Create** | 有效 | 必會 |
| Q7 Volume vs CDN | CDN | **Volume storage** | 基本有效 | 理解儲存模型 |
| Q8 Content-based discovery | DRM | **Egress monitoring／DLP** | 有效 | 必會邊界 |
| Q11 為何 overwrite 不適合（EXCEPT） | 備份複製 | LearnZapp 標「regulators frown」；核心仍是媒體控制權 | 用詞過絕對 | 學原則，不死背該句 |
| Q14 Egress monitoring 通常有什麼 | Stateful inspection | 題庫寫 client agent | **有疑義** | 不背「DLP 一定有 endpoint agent」 |
| Q17 CCM mapping | PCI DSS | 題庫寫 CMM | version-sensitive trivia | 低優先 |
| Q18 DLP 功能 | 仲裁合約違約 | **依分類發現資料資產** | 有效 | 必會 |
| Q21 Share 前一個 phase | Encrypt | **Use** | 有效 | 必背順序 |
| Q22 哪個不是 reclassification 原因 | Time | **Color change** | distractor 過弱 | 學概念即可 |

現代 DLP 可位於 endpoint、network 或 cloud／SaaS／CASB。  
**不要背：** Egress monitoring = 一定有 client agent。  
**要背：** DLP 關心敏感資料移動；stateful inspection 是防火牆思路，不是 DLP 核心。

CSA CCM 是雲端控制框架，可 mapping 多種標準；CAIQ 是問卷；STAR 是保證／登錄計畫。不必背完整 mapping 清單。

---

## 9. 跨域復現弱點

| 主題 | 判讀 |
|---|---|
| Data destruction 連續出現 | 先問誰控制實體媒體 |
| Metadata vs Label vs Classification vs Discovery vs DLP vs IRM | 目前最清楚的 persistent D2 弱點 |
| Configuration maintenance | Social engineering 不是 configuration maintenance |
| Responsibility／Accountability | 操作責任可委外；歸責通常留在 organization／data owner／controller |

**跨 D1／D2／D3／D6 一句話**

> Responsibility can be delegated operationally; accountability usually remains with the organization, data owner, or controller.

---

## 10. 考場秒殺規則

1. Control ≠ lifecycle phase。  
2. Classification 從 Create 開始，並驅動後續控制。  
3. DLP = movement；IRM = usage rights；Discovery = find。  
4. Volume ≠ Object ≠ CDN。  
5. 雲端刪除先問 physical media control。  
6. Snapshot／dormant VM 收不到 patch。  
7. Baseline 沒有 documentation 就無法稽核偏離。  
8. TLS 應用流量用 symmetric AEAD，不是憑證直接加密。  
9. Accountability 通常不能外包掉。  
10. ISC2 常要最直接解決 scenario 目標的答案，不是範圍最大的風險名詞。
