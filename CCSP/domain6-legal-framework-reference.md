# CCSP Domain 6：法律、法規與框架總表 / Legal & Framework Reference

> **用途：** 考前速查。以 **2026 ISC2 CCSP official outline 明確點名 ＋ 題庫常出 ＋ 實際遇過**的項目為範圍，不是世界上所有 privacy law 的清單。
> **定位：** 本檔刻意自成一體（與彙整講義有部分重疊），目的是查的時候不必跳檔。完整推導、錯題脈絡與邊界討論見 [`simulate-test/domain6-legal-compliance/01-consolidated-lecture.md`](simulate-test/domain6-legal-compliance/01-consolidated-lecture.md)。
> **讀法：** 先看最後兩節（**Legacy／題庫陷阱表**與**trigger word 索引**），再回頭查分區。
> **姊妹檔：** 若要查的是「這個名稱屬於哪一類」而非細節，用 [`domain6/Framework_Law_Standard_Map.md`](domain6/Framework_Law_Standard_Map.md)（名稱 → 類別的歸位地圖）。
> **外部連結：** 均為官方頁面，供查證現行版本與定義之用。

2026 Domain 6 官方範圍涵蓋 country-specific privacy laws、privacy standards、audit reports、regulated industries、risk frameworks、eDiscovery、forensics、contracts 與 supply-chain security（[ISC2 CCSP Exam Outline](https://www.isc2.org/certifications/ccsp/ccsp-certification-exam-outline)）。

---

## A. 美國 🇺🇸

| 名稱 | 類型 | 主要對象 | CCSP trigger | 最容易混 |
|---|---|---|---|---|
| **HIPAA** | Federal law／rules | Healthcare／PHI | medical records、PHI | HITECH |
| **HITECH** | Federal law | Electronic health records／breach／強化 HIPAA | health IT、breach notification | HIPAA |
| **GLBA** | Federal law | Financial institutions／NPI | bank、loan、financial privacy | PCI DSS |
| **FERPA** | Federal law | Student education records | school／student records | HIPAA |
| **SOX** | Federal law | Public companies／financial reporting | internal controls、CEO/CFO certification | SOC 1 |
| **FISMA** | Federal law | Federal agencies／info systems | federal security program | FedRAMP |
| **FedRAMP** | Federal cloud program | Federal cloud services | CSP authorization／certification | FISMA |
| **NERC CIP** | Mandatory industry standards | Bulk electric system | electric grid、critical infrastructure | 泛用 NIST |
| **PCI DSS** | **Industry standard，不是法律** | Cardholder data | PAN、payment cards | GLBA |

- **HIPAA**：對 individually identifiable health information 的 federal 保護（[HHS Privacy Rule](https://www.hhs.gov/hipaa/for-professionals/privacy/index.html)）。
- **GLBA**：financial institutions ＋ consumer financial information，須說明 sharing practice 並保護 customer data（[FTC GLBA](https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act)）。
- **FERPA**：student education records，適用於接受美國教育部適用經費的學校（[ED FERPA](https://studentprivacy.ed.gov/ferpa)）。
- **SOX**：public company ＋ financial reporting／internal controls／audit；核心是 corporate responsibility、financial disclosure、反會計舞弊（[SEC](https://www.sec.gov/answers/about-lawsshtml.html)）。

### 兩組最常考的速切

```text
Health / PHI                              → HIPAA
Financial institution / customer financial info → GLBA
Payment card / PAN                        → PCI DSS
```

```text
Federal agency information-security law   → FISMA
Federal cloud service assessment/cert     → FedRAMP
```

### PCI DSS merchant tiers（題庫易錯）

所有適用的 merchant 都必須符合 PCI DSS。**Merchant level 影響的是 compliance validation／reporting 的方法與 rigor**，而 merchant levels 由 payment brands／acquirers 定義，不是 PCI SSC 統一規定（[PCI Perspectives](https://blog.pcisecuritystandards.org/important-updates-announced-for-merchants-validating-to-self-assessment-questionnaire-a)）。

| Level | 常見 validation（Visa 典型模型） |
|---|---|
| Level 1 | ROC by QSA／internal assessor ＋ AOC |
| Level 2／3 | SAQ ＋ AOC |
| Level 4 | SAQ／acquirer-defined validation |

```text
PCI DSS controls ≠ merchant tier-specific control sets
Merchant tier   → validation / reporting rigor
```

**不要背**「tier 越高只是 audit 做得比較多」，也**不要背**「不同 tier 有不同 control sets」。

---

## B. EU / EEA 🇪🇺

| 名稱 | 類型 | 核心 |
|---|---|---|
| **GDPR** | Regulation | Personal data／controller／processor／data subject rights |
| **SCCs** | 契約式傳輸機制 | EU/EEA → 非 adequate third country |
| **Adequacy Decision** | EU 執委會決定 | 第三國被認定保護程度充分 |
| **BCRs** | 集團內部傳輸機制 | Multinational corporate groups |
| **EU-U.S. DPF** | Adequacy-based 傳輸框架 | EU → 已認證的美國組織 |
| Privacy Shield | **Legacy／invalid** | 不可當成現行機制 |

### GDPR exam triggers

- Controller = 決定 purposes／means；Processor = 依 controller 指示行事
- data minimization、purpose limitation
- rights of data subjects、breach notification
- cross-border transfer restrictions、DPIA

### EU 國際傳輸決策樹

```text
EU/EEA personal data
       ↓
   Third country
       ↓
   Adequacy?
 ├─ YES → transfer
 └─ NO
      ↓
 appropriate safeguard?
      ├─ SCC
      ├─ BCR
      └─ 其他 GDPR 機制（certification／codes、Article 49 derogations）
```

**SCCs** 是 European Commission 預先核可的契約條款，可作為傳輸至第三國的 safeguard（[European Commission — SCC](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en)）。

現行 adequacy decisions 包含英國、日本、加拿大（商業組織）、南韓、巴西，以及參與 DPF 的美國組織等（[European Commission — Adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en)）。

### Privacy Shield → EU-U.S. DPF 的正確理解

```text
歷史：
  U.S. Department of Commerce  → administered Privacy Shield
  FTC                          → enforced participating companies' commitments

2020 Schrems II（CJEU）        → Privacy Shield 判定 invalid
2023 起                        → EU-U.S. Data Privacy Framework (DPF)
  管理：Commerce / ITA
  執法：FTC / DOT（依管轄）
```

題庫把「administer → FTC」當正解其實不準（[FTC 歷史公告](https://www.ftc.gov/news-events/news/press-releases/2018/09/ftc-reaches-settlements-four-companies-falsely-claimed-participation-eu-us-privacy-shield)、[CJEU Schrems II](https://curia.europa.eu/site/upload/docs/application/pdf/2020-07/cp200091en.pdf)、[Data Privacy Framework](https://www.dataprivacyframework.gov/EU-US-Framework)）。

> 看到 **HHS** 先想 **HIPAA／healthcare**，不是跨境傳輸。

---

## C. 加拿大 🇨🇦

**PIPEDA** — Personal Information Protection and Electronic Documents Act

- 類型：**Federal private-sector privacy law**
- 核心：commercial activity 中 personal information 的 collection／use／disclosure
- 內含 **10 fair-information principles**（[OPC PIPEDA](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/)）

```text
Canadian private company + customer personal information → PIPEDA
```

---

## D. 印度 🇮🇳

**Digital Personal Data Protection Act (DPDP Act), 2023** —— **2026 official outline 明確點名的新內容。**

| 名詞 | 對應 |
|---|---|
| **Data Principal** | ≈ data subject |
| **Data Fiduciary** | ≈ controller-like role |
| **Data Protection Board** | 監管機構 |

範圍：processing of digital personal data、consent／lawful processing、rights 與 obligations。印度已於 2025 發布 DPDP Rules 2025 並採 phased commencement（[MeitY](https://www.meity.gov.in/)）。

```text
India + digital personal data → DPDP Act
```

不需背 implementation dates。

---

## E. 其他國家（P2：認名稱即可）

不需像 GDPR／HIPAA 一樣深讀，但題庫可能出現。

| 地區 | 法規 | 記憶即可 |
|---|---|---|
| Australia | Privacy Act 1988 | national privacy law |
| Argentina | Personal Data Protection Law 25.326 | privacy／data protection |
| Brazil | **LGPD** | GDPR-like framework |
| Japan | **APPI** | personal information |
| Singapore | **PDPA** | personal data |
| UK | UK GDPR ＋ Data Protection Act 2018 | post-Brexit regime |
| China | **PIPL** | personal information protection |

> **Priority：P2 recognition only。** 不要背條文。

---

## F. 國際 ISO / IEC（這張最重要）

| Standard | 一句話 | 考試 trigger |
|---|---|---|
| **ISO 27001** | ISMS requirements／可認證 | holistic security management |
| **ISO 27002** | security controls guidance | how to implement controls |
| **ISO 27017** | cloud 專屬安全控制 | CSP ＋ CSC cloud controls |
| **ISO 27018** | public cloud processor 的 PII 保護 | cloud privacy |
| **ISO 27036** | supplier／supply-chain security | vendor、供應鏈 |
| **ISO 27037** | 數位證據的 identify／collect／acquire／preserve | forensics（證據處理） |
| **ISO 27041** | 調查方法的適切性與保證 | forensic methodology |
| **ISO 27042** | 數位證據的分析與解讀 | forensic analysis |
| **ISO 27043** | 事件調查原則與流程 | investigation |
| **ISO 27050** | eDiscovery | ESI discovery／litigation |
| **ISO 31000** | 一般企業風險管理 | enterprise risk |

## 分類
### 27001/27002 - ISMS
- ISMS 的整體管理
- ISMS 的安全性實施指引

### 27017/27018 - 雲端專屬
- 雲端安全控制
- 雲端個資保護

### 27037/27041/27042/27043 - 數位調查
- 27037 - 數位證據處理及保存
- 27041 - 調查方法合規性保證
- 27042 - 數位證據解讀及分析規範
- 27043 - 調查方法規範


### 27036/27050/31000 - 企業風險相關
- 27036 - 供應鏈管理
- 27050 - eDiscovery
- 31000 - 一般企業風險管理 

### 三組切法

```text
27001 = requirements        ／ 27002 = guidance
27017 = cloud security      ／ 27018 = cloud privacy (PII)
27037 = evidence handling   ／ 27050 = eDiscovery
```

- 27001／27002 的 requirements vs guidance 定位（[ISO 27001](https://www.iso.org/standard/27001)）。
- **ISO 27017 現為 2026 edition；27018 現為 2025 edition**（[ISO 27017](https://www.iso.org/standard/27017)）。
- 27037 的核心正是數位證據的 identification／collection／acquisition／preservation（[ISO 27037](https://www.iso.org/standard/44381.html)）。
- 27050 是 ESI 的 identification → preservation → collection → processing → review → production（[ISO 27050](https://www.iso.org/standard/78647.html)）。

---

## G. NIST / U.S. standards & frameworks

| 名稱 | 核心 |
|---|---|
| **NIST SP 800-37** | RMF（Prepare→Categorize→Select→Implement→Assess→Authorize→Monitor） |
| **NIST SP 800-53** | Security／privacy controls catalog |
| **NIST SP 800-53A** | **評估**上述 controls |
| **NIST SP 800-88** | Media sanitization |
| **FIPS 199** | Security categorization |
| **FIPS 200** | Minimum federal security requirements |
| **FIPS 140-3** | Cryptographic module validation（140-2 為 legacy） |

### 核心鏈

```text
FISMA
  ↓ risk-based federal security
RMF / NIST SP 800-37
  ↓ select controls
NIST SP 800-53
  ↓ assess controls
NIST SP 800-53A
```

RMF 是支援 FISMA 的七步 risk-management process（[NIST CSRC — FISMA](https://csrc.nist.gov/Projects/risk-management/fisma-background)）。

### FedRAMP 的 data residency（不要過度絕對）

較高 assurance class 確有 U.S./U.S. territories／U.S. jurisdiction 的 location requirement，但**不是「所有 federal cloud use 一律 US-only」**。residency 取決於適用的 FedRAMP class／baseline ＋ agency／legal requirements（[FedRAMP](https://www.fedramp.gov/)）。

---

## H. Risk / Governance Frameworks

| 名稱 | 核心 | 不要混 |
|---|---|---|
| **NIST RMF／800-37** | Security／privacy risk lifecycle | ISO 31000 |
| **ISO 31000** | 一般企業風險管理；**不可用於組織認證** | 不是 cyber-specific |
| **COBIT** | Enterprise IT governance／management | 不是純 security RMF |
| **COSO** | Enterprise／internal control／risk governance | COBIT |
| **CIS Controls** | 實務化、已排序的安全控制 | ISO ISMS |
| **ITIL** | IT service management | 不是安全框架 |
| **ISO 20000-1** | ITSM 管理系統**要求** | ISO 27001 |

一行定位：

```text
COBIT  = Govern IT
800-37 = Run RMF
31000  = Manage risk broadly
```

ISO 31000:2018 仍為現行版本（[ISO 31000](https://www.iso.org/standard/65694.html)）。

---

## I. Audit / Assurance

| 名稱 | 是什麼 |
|---|---|
| **SSAE** | 美國 auditor attestation standards（規範 auditor，不是 report） |
| **SOC 1** | 與 financial reporting 相關的控制 |
| **SOC 2** | Trust Services Criteria（Security／Availability／Processing Integrity／Confidentiality／Privacy） |
| **SOC 3** | general-use report |
| **ISAE** | 國際 assurance engagement standard |
| **SAS 70** | **legacy**（後繼為 SOC 1） |
| **ISO 27001 certification** | ISMS 認證，**不等於** SOC report |

```text
Type 1 = point in time / design
Type 2 = period of time + operating effectiveness
```

---

## J. CSA（Cloud Security Alliance）

| 名稱 | 用途 |
|---|---|
| **CCM** | Cloud controls framework ＋ cross-mappings |
| **CAIQ** | 搭配 CCM 的 assessment questionnaire |
| **STAR** | Cloud assurance／registry program |
| STAR **Level 1** | Self-assessment |
| STAR **Level 2** | Third-party assurance／certification |
| STAR **Level 3** | Continuous assurance／monitoring |

```text
CCM  = Controls
CAIQ = Questions
STAR = Assurance        （1 自己看 → 2 別人看 → 3 一直看；沒有 Level 4）
```

> CCM 定義與對映 controls；**實際套用與檢查靠 tooling**（Ansible／CSPM／Policy-as-Code），不要把 enforcement 當成 CCM 的 benefit。

---

## K. OECD 隱私八原則

記憶串：

> **少收 → 收對 → 說目的 → 不亂用 → 保護 → 透明 → 本人參與 → 公司負責**

1. Collection Limitation
2. Data Quality
3. Purpose Specification
4. Use Limitation
5. Security Safeguards
6. Openness
7. Individual Participation
8. Accountability

這類題通常是 **scenario → principle**，不需讀條文全文。

---

## L. Contract / Legal Instruments

| 名稱 | 用途 |
|---|---|
| **SLA** | **可量測**的服務承諾 |
| **MSA** | 整體法律／商務關係 |
| **SOW** | 工作範圍、交付項目、時程 |
| **Right to Audit** | 客戶／評估者的稽核權 |
| **Legal Hold** | 預期訴訟時暫停常規刪除 |
| **eDiscovery** | identify／preserve／collect／review／produce ESI |
| **SCC** | 跨境個資傳輸條款 |
| **Choice of Law** | 應適用哪個 jurisdiction 的法律 |
| **Jurisdiction** | 哪個法院／機關有權受理 |

### 三個 contract 名稱的快速切法

```text
MSA = relationship / rules
SOW = what work
SLA = how well the service must perform
```

**SLA 的判準是 measurable／objective／repeatable**：`99.95% availability`、`response < 200 ms`、`support response ≤ 30 min`、`monthly capacity quota = 20 TB`。而 **jurisdiction for litigation 屬 MSA／governing law／venue，不是 SLA**。

> **nuance：** 不要背「SLA 只能是數字」——data residency、service location 實務上完全可能寫進合約、service schedule 或 SLA。

---

## M. 高監管產業

2026 outline 明確列出 **NERC CIP、HIPAA、HITECH、PCI**。用 domain trigger 記，不背條號：

```text
Healthcare                        → HIPAA / HITECH
Electric grid                     → NERC CIP
Payment card                      → PCI DSS
Public company financial reporting → SOX
Financial institution / customer financial data → GLBA
```

---

## ⭐ Legacy／題庫陷阱表

這張比多背舊法條更重要。

| 題庫可能出 | 2026 應該怎麼想 |
|---|---|
| **Privacy Shield** | obsolete；現行為 **EU-U.S. DPF** |
| Privacy Shield administered by FTC | ❌ **Commerce administered；FTC enforced** |
| **SAS 70** | legacy（後繼 SOC 1） |
| **ISO 31000:2009** | 已撤 → **2018** 為現行 |
| **ISO 27018:2019** | 已撤 → **2025** 為現行 |
| **ISO 27017:2015** | **2026 edition** 為現行 |
| **FIPS 140-2** | legacy 世代 → 現行 **140-3** |
| FedRAMP 代表資料一律只能在美國 | ❌ 太絕對；取決於 class／baseline ＋ agency 要求 |
| PCI merchant tier = 不同的 control sets | ❌ 錯 |
| PCI merchant tier = 只是 audit 數量不同 | ❌ 過度簡化；是 validation／reporting rigor |
| SOC 3 是客戶通常會索取的 | 多半可疑；**SOC 2** 通常才是相關的 assurance |

---

## trigger word 索引（建議的背法）

不要按字母背，按 **scenario → category → framework** 背：

```text
Health                → HIPAA / HITECH
Finance               → GLBA
Payment card          → PCI DSS
Student               → FERPA
Public company        → SOX
Federal security      → FISMA
Federal cloud         → FedRAMP
Electric grid         → NERC CIP

EU personal data      → GDPR
EU transfer           → Adequacy / SCC / BCR / DPF
Canada                → PIPEDA
India                 → DPDP Act

ISMS                  → ISO 27001
Controls guidance     → ISO 27002
Cloud security        → ISO 27017
Cloud PII             → ISO 27018
Supplier              → ISO 27036
Forensics             → ISO 27037 家族
eDiscovery            → ISO 27050

IT governance         → COBIT
Internal control      → COSO
General risk          → ISO 31000
US security RMF       → NIST 800-37
Media sanitization    → NIST 800-88
IT service management → ITIL / ISO 20000-1

Auditor rules         → SSAE
Financial report controls → SOC 1
Trust Services        → SOC 2
Cloud controls        → CSA CCM
Cloud assurance       → CSA STAR
Privacy principles    → OECD
```
