# CCSP 模擬測驗講義：D3 架構邊界與 D4 應用安全

> **講義類型：** LearnZApp 錯題精華／概念補強  
> **適用領域：** Domain 3 Cloud Platform & Infrastructure Security；Domain 4 Cloud Application Security  
> **測驗觀察：** D3 約 71%（達合格線）；D4 約 55%（管理視角與定義題失分）  
> **使用方式：** 先讀錯題總表，再記秒殺規則。D4 題先判斷「技術動作」還是「治理／調查優先」。

---

## 0. 學習目標

讀完本講義應能：

1. 說明高架地板、氣流、線材管理在資料中心的真正目的。
2. 區分 MAD 與 RTO，並說出兩者的大小關係。
3. 指出 Hypervisor 在資源調度中的角色。
4. 對應 IaaS／PaaS／SaaS 的典型儲存與派發模式。
5. 在應用安全題中，優先選擇「蒐集更多資料」而非立即中斷營運。
6. 解釋開發人員自測的利益衝突、Forklifting，以及 REST／SOAP、IAM、ISO 27034 的考試定義。

---

## 1. 錯題總表

| 題號 | 領域 | 核心盲點 | 秒殺規則 | 建議複習 |
|---|---|---|---|---|
| 1 | D3 實體安全 | 把高架地板當成避難所 | 高架地板的設計目的是 **空調通風管道（air plenum）與佈線通道**；放置雜物會阻礙氣流 | Cloud Infrastructure Security：資料中心與空調 |
| 2 | D3 BC/DR | 搞不清 RTO 與 MAD | **MAD** 是業務決定的停機上限；**RTO 必須小於 MAD** | Cloud BC/DR：BIA、RTO、RPO、MAD |
| 3 | D3 虛擬化 | 把資源調度歸給管理員 | 攔截與協調硬體資源呼叫的是 **Hypervisor** | Cloud Computing Concepts／Infrastructure Security |
| 4 | D3 雲端儲存 | 把 SaaS 與資料庫綁在一起 | IaaS → Volume／Object；PaaS → Databases；**SaaS 常搭配 CDN** 派發靜態內容 | Cloud Data Storage |
| 5 | D4 應用安全 | 一看到未授權 API 就封鎖 | 可能中斷營運前，先 **蒐集更多資料（gather more data）** | Risk／Incident Management |
| 6 | D4 應用安全 | 以為雲端無法做欄位驗證 | 雲端開發者最容易失去控制的是 **底層日誌（logging）**，設施多由 CSP 掌握 | Cloud Logging and Monitoring |
| 7 | D4 軟體測試 | 選情緒性「工程師不擅長測試」 | 開發人員測自己程式有 **既得利益（vested interest）**，構成利益衝突 | Software Assurance and Validation |
| 8 | D4 雲端遷移 | 不熟遷移術語 | 傳統應用不經修改直接上雲 = **Forklifting／Lift and shift** | Secure Cloud Design |

---

## 2. Domain 3：基礎架構與實體邊界

### 2.1 高架地板與氣流

**正確概念**

高架地板（raised flooring）的設計目的只有兩項：

- 作為空調回風／送風管道（air plenum）
- 作為纜線與管路通道（cable conduit）

**常見陷阱**

- 避難所、儲物空間、人員通道都不是設計目的。
- 地板下方線材不整理，最大危害不是「防跌倒」，而是 **阻礙氣流、降低 HVAC 效率**。

**考場判斷**

看到 raised floor／under-floor cabling，優先想 **airflow + HVAC**，不是 physical safety trivia。

### 2.2 MAD 與 RTO

| 術語 | 全名 | 誰決定 | 意義 |
|---|---|---|---|
| **MAD** | Maximum Allowable Downtime（亦見 MTD） | 業務 | 業務可容忍的停機上限 |
| **RTO** | Recovery Time Objective | IT／DR 規劃 | 實際復原必須達成的時間目標 |
| **RPO** | Recovery Point Objective | 業務／IT | 可容忍的資料損失量（時間） |

**必背關係**

```text
RTO < MAD
```

IT 必須把復原時間設在業務上限之內，否則 BIA／DR 計畫不合規。

### 2.3 Hypervisor 與資源調度

雲端底層負責攔截、協調硬體資源呼叫（orchestrating resource calls）的是 **Hypervisor**，不是一般系統管理員。

管理員可以下達政策與操作，但實際排程 CPU、記憶體、I/O 的控制平面在 Hypervisor。

### 2.4 服務模型與儲存對應

| 服務模型 | 典型儲存／派發 | 不要選 |
|---|---|---|
| **IaaS** | Volume（block）／Object storage | 把資料庫當成 IaaS 預設答案 |
| **PaaS** | Databases／managed data platform | 把 CDN 當成 PaaS 核心 |
| **SaaS** | 常搭配 **CDN** 派發靜態內容 | 把 SaaS 直接等同 databases |

### 2.5 其他 D3 實務判斷

| 主題 | 陷阱選項 | 秒殺規則 |
|---|---|---|
| BC/DR 執行對象 | 只寫給核心 DR 團隊 | 災難時核心人員可能無法連線；計畫必須讓 **具備基本技能的人** 都能執行 |
| 最根本安全原則 | 把 MFA 當成原則 | MFA 是控制項；**Defense in Depth** 才是根本原則 |
| 無意行為後果 | 以為一定造成 disaster | 雲端最常見的 inadvertent activity 是忘記關 VM，造成 **resource sprawl** |

---

## 3. Domain 4：應用安全與管理視角

### 3.1 ISC2 最佳解邏輯

D4 失分多半不是「完全不會」，而是一看到技術威脅就立刻選封鎖、中斷、重寫。

**優先順序**

```text
釐清業務需求與影響
        ↓
蒐集更多資料（gather more data）
        ↓
評估風險與控制選項
        ↓
才採取可能中斷營運的強制動作
```

未授權 API 未必該立刻 block；先確認該 API 是否為合法業務依賴。

### 3.2 雲端開發者失去什麼控制權？

共享責任下，應用欄位驗證仍是開發者可做的事。較容易失去控制的是 **底層日誌設施**，因為 logging infrastructure 常由 CSP 營運。

### 3.3 測試獨立性

開發人員測試自己寫的程式，問題不是「技術能力不足」，而是：

> 他們有既得利益，希望軟體表現良好，因此產生盲點。

考試要的是 **conflict of interest／testing independence**。

### 3.4 Forklifting

將傳統應用 **不經修改** 直接搬上雲端，稱為：

- **Forklifting**
- **Lift and shift**

這不是重構（re-architect）或雲原生改造。

### 3.5 D4 定義與管理視角對照

| 核心盲點 | 陷阱選項 | 秒殺規則 |
|---|---|---|
| API 架構本質 | 認為 REST 建立在嚴格協定標準上 | **SOAP** 依賴嚴格 XML 協定；**REST** 的核心優勢是輕量與可擴展 |
| IAM 終極目的 | 選 Authorization | 授權只是過程；IAM 的最終目的是 **Accountability（可歸責）** |
| 安全最大外部驅動力 | 不斷演進的威脅 | ISC2 語境中，最大外部因素通常是 **Regulation** |
| 找出程式邏輯錯誤 | 弱點掃描 | 弱掃找已知系統弱點；程式邏輯錯誤靠 **原始碼審查／SAST** |
| ISO 27034 | 一個應用對應 3 個 ANF | 組織只有 **1 個 ONF**；每個應用有 **1 個 ANF** |

---

## 4. 考場秒殺規則

1. Raised floor = plenum + cable path；不要當避難所或儲藏室。
2. RTO 必須小於 MAD。
3. 硬體資源協調 = Hypervisor。
4. SaaS 靜態內容派發先想 CDN。
5. 可能中斷業務前，先 gather more data。
6. 雲端開發者最常失去的是 logging 控制權。
7. 開發者自測 = vested interest／conflict of interest。
8. 不改程式直接上雲 = forklifting。
9. IAM 最終要的是 accountability，不是只選 authorization。
10. ONF 全組織一份；ANF 每應用一份。

---

## 5. 自我檢測

1. 高架地板下方亂塞雜物，最先傷害的是什麼？  
2. MAD = 4 小時時，RTO 可以是 6 小時嗎？  
3. REST 與 SOAP，誰比較依賴嚴格協定標準？  
4. IAM 的 ultimate goal 是 authorization 還是 accountability？  
5. ISO 27034 中，ONF 與 ANF 的數量關係是什麼？
