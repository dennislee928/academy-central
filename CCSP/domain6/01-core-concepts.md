# CCSP Domain 6 核心概念速查 / Core Concepts Reference

> **Domain 6 定位：** 本領域測驗範疇為 **法律、風險、合規、稽核、隱私與合約責任**。考題重心不在技術實作，而在責任歸屬、法規識別、證據保存與風險處理。

---

## 1. Domain 6 考試定位 / Exam Focus

Domain 6 核心提問：

- 誰對資料安全負責（責任歸屬）？
- 哪個規範或法律管轄這件事（法規識別）？
- 訴訟或調查時，資料如何保存（證據保全）？
- 風險如何評估與處理（風險管理）？
- 雲服務合約中哪些條款至關重要（合約審查）？

**核心原則：雲端服務可以外包，合規責任不能完全外包。**  
*Cloud services can be outsourced; compliance accountability cannot.*

---

## 2. 法律層級識別 / Legal Hierarchy

| 層級 | 名稱 | 特性 | 典型例子 |
|------|------|------|----------|
| Law（法律） | 政府制定，具強制力 | 違法可能導致罰款、刑事責任 | GDPR、HIPAA、SOX、GLBA |
| Regulation（法規） | 法律下的具體執行要求 | 由監管機關執行，不遵守即罰 | HIPAA Privacy Rule、PCI DSS（被法規引用時） |
| Standard（標準） | 業界最佳實務框架 | 本身非法律，但可被合約或法規引用 | ISO 27001、NIST CSF、CSA CCM |
| Policy（政策） | 組織內部規則 | 由組織自行訂定，可自主更改 | 資料保留政策、存取控制政策 |

**常見混淆點：** PCI DSS 是產業標準，不是聯邦法律；GLBA 才是美國聯邦財務隱私法律。

---

## 3. 關鍵法規速查 / Key Regulations

| 法規 / 標準 | 管轄範圍 | 考試記憶點 |
|-------------|----------|------------|
| **GDPR** | 歐盟，個人資料保護 | 資料主體權利、72 小時通報義務 |
| **HIPAA** | 美國，醫療個資（PHI） | 需簽 BAA；醫療機構及商業夥伴均適用 |
| **SOX** | 美國，上市公司財務報告 | 財務資料稽核、內部控制、不可竄改 |
| **GLBA** | 美國，金融機構客戶隱私 | 保護非公開個人財務資訊 |
| **PCI DSS** | 全球，支付卡資料安全 | 產業標準，非聯邦法律；信用卡資料保護 |
| **ISO 27001** | 全球，資訊安全管理系統 | 認證標準；可作為稽核依據 |
| **CSA CCM** | 雲端安全控制矩陣 | Assessment-oriented；可對應 ISO、NIST、PCI |
| **CSA STAR** | 雲端安全透明認證 | CSP 公開安全控制；分 Level 1–3 |

---

## 4. 雲端責任分工 / Shared Responsibility

| 負責方 | 責任範疇 |
|--------|----------|
| **CSP** | 雲端基礎設施、實體機房、底層平台安全 |
| **客戶（Cloud Customer）** | 資料分類、存取管理、合規需求定義、使用者管理 |
| **雙方共同** | 事件回應、日誌稽核、加密策略、監控、合規證明 |

> **You can outsource work, but not accountability.**  
> 服務可以委外，最終責任仍由客戶承擔。

---

## 5. 合約關鍵條款 / Key Contract Terms

| 文件 | 全名 | 用途 |
|------|------|------|
| **SLA** | Service Level Agreement | 服務等級協議：uptime、RTO/RPO、回應時間 |
| **MSA** | Master Service Agreement | 主服務合約：合作總框架 |
| **DPA** | Data Processing Agreement | 資料處理協議：隱私法合規（如 GDPR） |
| **BAA** | Business Associate Agreement | HIPAA 適用：醫療相關商業夥伴必須簽署 |
| **Right to Audit** | 稽核權 | 客戶是否有權對 CSP 執行第三方稽核 |

---

## 6. 隱私核心概念 / Privacy Fundamentals

| 術語 | 說明 |
|------|------|
| **PII** (Personally Identifiable Information) | 可識別個人身分的資料 |
| **PHI** (Protected Health Information) | 醫療個資，受 HIPAA 保護 |
| **Data Subject** | 資料本人（如 GDPR 中的被收集者） |
| **Data Controller** | 決定資料收集目的與用途的組織 |
| **Data Processor** | 受 Controller 委託處理資料的組織 |
| **Subprocessor** | Processor 再委託的下游處理方 |
| **Data Residency** | 資料實際儲存的地理位置 |
| **Data Sovereignty** | 資料依據哪個國家法律受管轄 |

**高頻混淆：** Data Residency ≠ Data Sovereignty  
- Residency = 資料在哪裡（物理位置）  
- Sovereignty = 哪個法律管（司法管轄）

---

## 7. 電子蒐證與數位鑑識 / eDiscovery & Forensics

### eDiscovery（電子蒐證）

法律程序中搜尋、保留並提交電子證據。  
雲端環境中，資料必須能被搜尋、保全與呈堂。

### Legal Hold（法律保全）

一旦有訴訟可能，**即使到期也不可刪除**相關資料。  
雲端自動刪除策略（如生命週期管理）必須在 Legal Hold 期間暫停。

### Chain of Custody（證據保管鏈）

記錄誰在何時持有、處理過證據，確保其在法庭上的可信度與完整性。

---

## 8. 風險管理 / Risk Management

**風險評估公式：**

$$\text{Risk} = \text{Threat} \times \text{Vulnerability} \times \text{Impact}$$

| 術語 | 說明 |
|------|------|
| **Threat（威脅）** | 可能造成損害的來源（如駭客、天災） |
| **Vulnerability（弱點）** | 可被利用的缺陷（如未修補漏洞） |
| **Impact（影響）** | 事件發生後的損失程度 |
| **Likelihood（可能性）** | 威脅發生的機率 |
| **Inherent Risk（固有風險）** | 未施行任何控制措施前的風險 |
| **Residual Risk（殘餘風險）** | 實施控制後仍存在的剩餘風險 |

**風險處理策略（AMAT）：**

| 策略 | 說明 | 典型場景 |
|------|------|----------|
| **Avoid（避免）** | 不執行該活動 | 放棄高風險業務擴展計畫 |
| **Mitigate（降低）** | 實施控制措施降低風險 | 部署加密、MFA、WAF |
| **Accept（接受）** | 接受殘餘風險 | 低影響、低可能性的已知風險 |
| **Transfer（轉移）** | 將風險移轉第三方 | 購買網路安全保險 |

---

## 9. 稽核 / Audit

稽核的目的是以**可驗證的證據**證明安全控制有效執行。

**常見稽核報告：**

| 報告 | 說明 |
|------|------|
| **SOC 1** | 財務報告相關的內部控制（SSAE 18 標準） |
| **SOC 2** | 安全性、可用性、隱私等信任服務原則 |
| **ISO 27001** | 資訊安全管理系統認證 |
| **CSA STAR** | 雲端服務商安全透明度認證 |

**考試易錯：** SSAE 18 是 **attestation 標準**（認證方法論），SOC 1/2 是**報告類型**，兩者不可混淆。

---

## 10. 高頻考試陷阱 / Common Exam Traps

1. **誤認 CSP 承擔全部責任**：共享責任模型下，資料分類與存取管理仍由客戶負責。
2. **將標準與法律混淆**：PCI DSS 是產業標準，不是聯邦法律；GLBA 才是。
3. **Data Residency 與 Sovereignty 混用**：位置 ≠ 司法管轄。
4. **Legal Hold 時刪除資料**：訴訟保全期間，任何刪除操作均可能構成證據毀滅。
5. **Chain of Custody 的目的**：保護證據可信度，不只是追蹤資料位置。
6. **把 SSAE 18 當成報告類型**：SSAE 18 是標準，SOC 1/2 才是報告。
7. **模糊題優先選治理導向答案**：「best」、「most important」等題幹，通常答案指向責任、合約或風險管理，而非單一技術控制。
