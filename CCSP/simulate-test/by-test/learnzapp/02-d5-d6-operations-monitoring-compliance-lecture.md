# CCSP 模擬測驗講義：D5 維運監控與 D6 合規風險

> **講義類型：** LearnZApp 錯題精華／概念補強  
> **適用領域：** Domain 5 Cloud Security Operations；Domain 6 Legal, Risk and Compliance  
> **使用方式：** 本講義對應營運監控、修補、基準線、定量風險、成熟度模型、訴訟保全與證據監管。每題先找「先決條件」或「法律義務」，再選技術控制。

---

## 0. 學習目標

讀完本講義應能：

1. 說明日誌關聯的第一先決條件是時鐘同步，不是記憶體或儲存容量。
2. 列出 Honeypot 的合法用途，並排除 luring／entrapment。
3. 解釋為何休眠 VM／snapshot 是自動修補的死角。
4. 指出 baseline 發揮價值的必要條件是 documentation。
5. 區分 CMM 與 CSA STAR。
6. 在訴訟通知下正確啟動 legal hold。
7. 指出證據保管人（evidence custodian）的職責。

---

## 1. 錯題總表

| 題號 | 領域 | 核心盲點 | 秒殺規則 | 建議複習 |
|---|---|---|---|---|
| 2 | D5 營運監控 | 把日誌關鍵要素當成 RAM | 跨系統關聯與事件重建的第一先決條件是 **時鐘同步（NTP／clock sync）** | Cloud Logging and Monitoring |
| 3 | D5 營運安全 | 忽略 Honeypot 的 EXCEPT 題 | Honeypot 用於偵測、分流、拖延、蒐集情報；**禁止主動招攬攻擊者（luring）** | Cloud Security Operations／Incident Management |
| 4 | D5 修補管理 | 忽略離線映像檔狀態 | 自動修補死角是 **snapshot／saved VM images 無法被修補** | Patch management／golden image |
| 5 | D5 基準線 | 選人員培訓 | Baseline 必須 **文件化（documentation）** 才能定義偏離、稽核與還原 | Hardening and baselines |
| 6 | D5 定量風險 | 把 EF 與攻擊目標混淆 | 對 **Exposure Factor** 影響最大的是 **威脅媒介類型（type of threat vector）** | Quantitative risk：SLE、ARO、EF |
| 7 | D6 成熟度 | 看到雲端評估就選 CSA STAR | 評估流程嚴謹度、細節與可重複性用 **CMM**；STAR 檢驗安全控制合規 | Governance and Compliance |
| 8 | D6 訴訟保全 | 收到訴訟通知卻停威脅建模 | Legal hold 要立即 **暫停常規安全銷毀（secure destruction）** | eDiscovery／legal hold |
| 9 | D6 數位鑑識 | 把法庭證據鏈套到 Data Controller | 出庭前監管證物完整性的是 **Evidence Custodian** | Chain of custody |

---

## 2. Domain 5：維運監控與系統生命週期

### 2.1 日誌關聯的先決條件

要把多台主機、多個時區的事件重建成一條時間線，第一條件是：

> **Clock synchronization（NTP）**

不是 RAM、磁碟空間或 SIEM 品牌。沒有一致時間戳，correlation 沒有意義。

### 2.2 Honeypot：能做與不能做

| 合法目的 | 非法／不該選 |
|---|---|
| 偵測攻擊 | **Luring attackers（主動招攬）** |
| 分散注意力（distract） | Entrapment（誘捕入罪） |
| 拖延攻擊者（delay） | 當成生產系統的替代防禦 |
| 蒐集威脅情報 | |

**EXCEPT 題秒選：** Luring attackers。

主動引誘可能構成 legal entrapment，後續難以在法庭追訴。

### 2.3 修補死角：離線才是未修補

自動化修補排程只對 **正在運行** 的機器有效。

存在 storage 裡的：

- snapshots
- saved VM images
- dormant／powered-off guests

都收不到 patch。下次為了突發流量被喚醒時，就帶著已知漏洞上線。

**考場句型**

> Cloud auto-patching 的最大風險？找 **snapshot／saved VM images won't take a patch**。

### 2.4 Baseline 沒有文件就不存在

Baseline 是「比較的標準」，不是防毒軟體或 HIDS。

若系統應有狀態沒有 **documentation**：

- 無法證明 configuration drift
- 無法稽核偏離
- 無法可靠還原

**不要選：** 培訓、HIDS、更多掃描。  
**要選：** Documentation。

### 2.5 Exposure Factor 受什麼影響最大？

定量風險：

```text
SLE = AV × EF
ALE = SLE × ARO
```

**Exposure Factor（EF）** 是單一事件可能造成的資產損失比例。  
威脅媒介類型（type of threat vector）決定破壞機制與可能損失百分比，因此對 EF 影響最大。

不要把 EF 直接等同「攻擊目標」或「資產名稱」。

---

## 3. Domain 6：成熟度、訴訟與鑑識

### 3.1 CMM 對 CSA STAR

| 工具 | 問的問題 |
|---|---|
| **CMM**（Capability Maturity Model） | 流程嚴不嚴謹、細不細、能不能 **repeatable**？ |
| **CSA STAR** | 雲端供應商安全控制是否達到保證／登錄要求？ |
| **CCM／CAIQ** | 控制項框架與問卷，不是成熟度模型本身 |

看到「嚴謹度、細節、可重複性」→ **CMM**。  
看到「雲端控制合規／保證」→ STAR／CCM。

### 3.2 Legal Hold

收到訴訟或 eDiscovery 通知時：

```text
啟動 Legal Hold
        ↓
暫停常規 retention／secure destruction
        ↓
保全可能相關的資料與日誌
```

**不要選：** 暫停威脅建模、先做新的風險評估、繼續原排程銷毀。

### 3.3 Evidence Custodian

在法庭呈現前，負責監管所有證物完整性與狀態的人是 **Evidence Custodian**。

| 角色 | 職責邊界 |
|---|---|
| Data Controller | 決定個人資料處理目的與方式（隱私法） |
| Data Processor | 依指示處理資料 |
| Evidence Custodian | **Chain of custody**、證物完整性與保管狀態 |
| Incident Handler | 事件遏制與調查，未必是出庭證物保管人 |

不要把隱私角色直接套到鑑識證據鏈。

---

## 4. 考場秒殺規則

1. Log correlation 先決條件 = NTP／clock sync。
2. Honeypot EXCEPT = luring attackers。
3. Auto-patch 死角 = snapshot／dormant VM。
4. Baseline 的必要條件 = documentation。
5. EF 最大影響因素 = type of threat vector。
6. Process rigor／repeatability = CMM，不是 STAR。
7. Legal hold = 停銷毀、保證據。
8. 證物完整性 = evidence custodian，不是 data controller。

---

## 5. 自我檢測

1. 為什麼 RAM 不是日誌關聯的第一要素？  
2. Honeypot 可以用來 delay attackers 嗎？可以用來 lure 嗎？  
3. Golden image 一年沒開機，修補狀態會怎樣？  
4. 沒有 documentation 的 baseline 能通過稽核嗎？  
5. 訴訟來了，原本 90 天 log 銷毀政策要怎麼處理？
