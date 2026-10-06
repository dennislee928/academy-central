# CCSP Domain 6：Legal, Risk and Compliance 彙整講義

> **範圍：** `simulate-test/` 內所有測驗講義中屬於 Domain 6 的內容，跨場次合併後依主題重組。
> **考試權重：** 13%
> **來源：** `by-test/01`、`02`、`03`、`04`、`06`、`07`、`08`、`09`、`10`、`by-test/learnzapp/02`、`04`
> **維護：** 新增測驗講義後，將該檔的 D6 章節併入本檔，並更新 §0 來源對照。
> **註：** 各場次分數、進步判定與補強排程留在 `by-test/` 原檔，不併入本檔。
> **速查表：** 法規、標準與框架的分區總表（含 Legacy／題庫陷阱表與 trigger word 索引）見 [`CCSP/domain6-legal-framework-reference.md`](../../domain6-legal-framework-reference.md)。

---

## 0. 來源對照 / Source Map

| 來源檔 | 原章節 | 併入本檔位置 |
|---|---|---|
| `by-test/01-assessment-test-weakness-lecture.md` | §4.1 法規標準、A 段法規與審計、B 段法律流程、C 段合約治理 | §1.1、§1.2、§1.5、§1.6 |
| `by-test/02-custom-test-1-weakness-lecture.md` | §5.2 Q3／Q4／Q6／Q7／Q11、P0-1 | §1.2、§1.5、§2.1、§2.2 |
| `by-test/03-custom-test-2-weakness-lecture.md` | Q2／Q3／Q7–Q9／Q11／Q16／Q17／Q21–Q24 | §1.1、§1.3、§1.4、§1.7、§2.3 |
| `by-test/04-practice-test-1-weakness-lecture.md` | §10.1–10.6 | §1.2、§1.4、§1.5、§1.6 |
| `by-test/06-d2-drill-1-weakness-lecture.md` | P0-4 法規 taxonomy | §1.1 |
| `by-test/07-practice-test-2-weakness-lecture.md` | §8.4 ALE、§8.5 質性風險、§9.1–9.5 | §1.1、§1.2、§1.8 |
| `by-test/08-d4-drill-1-weakness-lecture.md` | P1-2 ISO 27034 邊界（交叉至 D4） | §1.2 |
| `by-test/09-practice-test-3-weakness-lecture.md` | §7 P2 D6（隱私角色、框架、法規對映、契約誘因、IP） | §1.1、§1.2、§1.4、§1.6、§1.7 |
| `by-test/10-drill-2026-09-30-weakness-lecture.md` | 下篇 §9 USDA／USPTO／OSHA／SEC | §1.7 |
| `by-test/learnzapp/02-...-lecture.md` | §3 成熟度、訴訟與鑑識 | §1.2、§1.5 |
| `by-test/learnzapp/04-two-day-error-essence-lecture.md` | §9 BIA、§13 SOC／FIPS | §1.2、§1.8 |
| `by-test/11-drill-2026-10-01-weakness-lecture.md` | D1 §5 ISO 27001、D5 §1 ARO evidence、D5 §4 NIST RMF | §1.2、§1.8、§2.6 |
| `by-test/13-d2-d6-drill-2026-10-03-weakness-lecture.md` | Part 2 §1 OECD 深入、§2 備考方法、§3 A/D/E/F/G/H/I | §1.2、§1.3、§1.5、§1.6、§1.8、§5 |
| 2026-10-04 recall 缺口分析（內容已併入，原檔未封存） | RMF 中文口訣與因果鏈、COBIT 三行對比、OECD scenario 反推、ALE 算例、Liability vs Reliability、forensics 五要素 | §1.2、§1.3、§1.5、§1.6、§1.8、§5 |
| 2026-10-04 D6 補強講義（內容已併入，原檔未封存） | CSA ecosystem（CCM／CAIQ／STAR L1-L2、CCM ≠ enforcement）、GAAP、GLBA vs PCI DSS、Conflict of Laws | §1.1、§1.2、§1.4 |
| 2026-10-05 D6 新錯題補強講義（內容已併入，原檔未封存） | §1 STAR 三層與無 Level 4、§3–§6 forensic testimony | §1.2、§1.5 |
| 2026-10-06 D6 新錯題 ＋ 法律總表（內容已併入，原檔未封存；速查表見 [`CCSP/domain6-legal-framework-reference.md`](../../domain6-legal-framework-reference.md)） | 6 題錯題 ＋ A–M 法規／標準分區 | §1.1、§1.2、§1.4、§1.5、§1.6 |

---

## 1. 核心觀念 / Core Concepts

### 1.1 法規與產業規範

| 名詞 | 中文理解 | 秒殺判斷 |
|---|---|---|
| **GLBA** | Gramm-Leach-Bliley Act | **美國金融機構 + 客戶財務個資**；要保護的是 **nonpublic personal information** |
| **PCI DSS** | 支付卡產業資料安全標準 | **信用卡／cardholder data**（是 industry standard，不是政府法規） |
| **HIPAA** | 美國醫療資料保護法 | **health information／PHI**；涵蓋電子醫療交易、國家識別碼、covered entities、providers、health plans、employers |
| **HITECH** | 美國醫療資訊科技法 | **electronic health records／breach notification**；強化 HIPAA。最易與 HIPAA 混 |
| **NERC CIP** | 強制性產業標準 | **bulk electric system／critical infrastructure**；不要用泛用 NIST 代替 |
| **SOX** | Sarbanes-Oxley Act | **上市公司財報、內控、審計責任** |
| **GDPR** | 歐盟個資保護規範 | **EU personal data／data subject rights／controller／processor** |
| **CCPA／CPRA** | 加州消費者隱私法 | California consumer privacy rights |
| **PIPEDA** | 加拿大個資保護法 | Canada personal information |
| **FISMA** | 美國聯邦資訊安全管理 | U.S. federal agency information systems |
| **FedRAMP** | 美國聯邦雲端授權框架 | **聯邦機關使用的雲端服務**；民間企業預設不受其強制 |
| **FERPA** | 美國教育資料隱私法 | student education records |
| **DMCA** | 數位千禧年著作權法 | **著作權／IP，不是隱私或資安控制來源** |

**最小必背集合：**

```text
GLBA    = 金融個資
PCI DSS = 支付卡資料
HIPAA   = 醫療 PHI
SOX     = 財報內控
GDPR    = EU 個資
FedRAMP = 美國聯邦雲服務授權
FISMA   = 美國聯邦資訊系統安全
```

#### GLBA vs PCI DSS（最重要的 boundary）

| | **GLBA** | **PCI DSS** |
|---|---|---|
| 性質 | **US federal law**（法律） | **Industry security standard**（產業標準） |
| 對象 | financial institutions（banks、lenders） | 處理支付卡資料的組織 |
| 保護什麼 | **nonpublic／private personal financial information** | **payment card data（cardholder data）** |

題幹若為「**federal law** controlling financial institutions' handling of private information」→ **GLBA**，不是 PCI DSS（PCI DSS 不是法律）。

#### PCI DSS merchant tiers（題庫易錯）

**所有適用的 merchant 都必須符合 PCI DSS。** Merchant level 影響的是 **compliance validation／reporting 的方法與 rigor**，而且 merchant levels 由 **payment brands／acquirers** 定義，不是 PCI SSC 統一規定。

| Level | 常見 validation（Visa 典型模型） |
|---|---|
| Level 1 | ROC by QSA／internal assessor ＋ AOC |
| Level 2／3 | SAQ ＋ AOC |
| Level 4 | SAQ／acquirer-defined validation |

```text
PCI DSS controls ≠ merchant tier-specific control sets
Merchant tier   → validation / reporting rigor
```

> **兩個都不要背：** ❌「tier 越高只是 audit 做得比較多」（過度簡化）、❌「不同 tier 有不同的 control sets」（錯）。

#### FISMA vs FedRAMP 與 data residency

```text
FISMA   = federal information-security law／program requirement
FedRAMP = federal cloud security assessment／certification program
```

較高 assurance class 的 FedRAMP 確實有 U.S.／U.S. territories／U.S. jurisdiction 的 location requirement，但**不是「所有 federal cloud use 一律 US-only」**。

> **不要背「FedRAMP = 永遠 US-only」。** Data residency 取決於**適用的 FedRAMP class／baseline ＋ agency／legal requirements**，不同 baseline（Moderate vs High）的 location assumptions 也可能不同。

**Taxonomy 陷阱（`by-test/06` P0-4）：** CSA CCM 對映的是雲端安全／隱私控制。在 HIPAA、FERPA、PIPEDA、**DMCA** 之中，**DMCA 是唯一的著作權／IP 法**，不是隱私／資安控制來源。

**美國隱私法模式：** 美國是 **sectoral model**，沒有一部涵蓋全體國民個資的綜合聯邦隱私法；GDPR 則是廣泛的歐盟隱私規範。

#### 各國隱私法（2026 outline 明確涵蓋 country-specific privacy laws）

| 地區 | 法規 | 要記什麼 |
|---|---|---|
| **加拿大** | **PIPEDA** | Federal **private-sector** privacy law；管 commercial activity 中 personal information 的 collection／use／disclosure；內含 **10 fair-information principles**。trigger：`Canadian private company + customer personal information` |
| **印度** | **DPDP Act, 2023** | **2026 outline 明確新增。Data Principal ≈ data subject；Data Fiduciary ≈ controller-like role；Data Protection Board** 為監管機構。trigger：`India + digital personal data`。不需背 implementation dates |

**P2（僅需認名，不背條文）：**

| 地區 | 法規 |
|---|---|
| Australia | Privacy Act 1988 |
| Argentina | Personal Data Protection Law 25.326 |
| Brazil | **LGPD**（GDPR-like） |
| Japan | **APPI** |
| Singapore | **PDPA** |
| UK | UK GDPR ＋ Data Protection Act 2018（post-Brexit） |
| China | **PIPL** |

### 1.2 標準、框架與審計報告

#### 兩秒歸類表（`by-test/13` Part 2 §2 Layer 1）

看到名稱要能在兩秒內說出它「是什麼東西」。這一層比記條號重要得多。

| 名稱 | 兩秒內該想到的第一個詞 |
|---|---|
| **OECD Privacy Guidelines** | Privacy principles |
| **ISO 27001** | ISMS requirements／certification |
| **ISO 27002** | Security controls guidance |
| **ISO 31000** | General risk management |
| **NIST SP 800-37** | RMF process |
| **COBIT** | **IT governance** |
| **SOC 2** | Service-provider assurance report |
| **SSAE** | Auditor attestation standard |
| **SAS 70** | **Legacy** |

| 名詞 | 類型 | 秒殺判斷 |
|---|---|---|
| **SSAE 18** | **標準** | Service organization audit／attestation standard，**不是 report**。版本號不必死背——AICPA 現行 SOC 2 Type 2 illustrative report 已引用 **SSAE 21**；看到 `SSAE 18` 認得「attestation standard」即可 |
| **SAS 70** | 報告（已汰換） | **Legacy** service-organization reporting standard；AICPA 現以 SOC 1 作為其後繼體系 |
| **SOC 1** | 報告 | 與**財務報告**相關的控制 |
| **SOC 2** | 報告家族 | 服務組織 controls assurance，採 **Trust Services Criteria**：Security、Availability、Processing Integrity、Confidentiality、Privacy |
| **SOC 2 Type 1** | 報告 | 某一時間點的 controls **design** |
| **SOC 2 Type 2** | 報告 | 一段期間的 controls **operating effectiveness**；詳細且敏感，通常 restricted use |
| **SOC 3** | 報告 | **公開摘要版／可公開發布**，attestation style |
| **SOC 2 Type 3** | — | **不存在** |
| **ISAE 3402** | 國際 attestation 標準 | 類似 SOC 1 的國際版脈絡 |
| **ISO/IEC 27001** | ISMS **認證**標準 | 可被認證；**technology-neutral**：非 cloud-specific、非 on-prem-specific、非 vendor-specific、非 open-source-specific |
| **ISO/IEC 27002** | 控制實務指引 | 控制目錄／guidance，不是認證主體。**2022 版有 93 controls**，分 organizational／people／physical／technological 四大主題 |
| **ISO/IEC 27017** | 雲端安全控制指引 | cloud security controls |
| **ISO/IEC 27018** | 公有雲個資保護 | PII protection in public cloud |
| **ISO/IEC 27034** | 應用安全框架 | 組織 1 個 ONF、每應用 1 個 ANF（見 [Domain 4](../domain4-application/01-consolidated-lecture.md)） |
| **ISO/IEC 27036** | 供應商／供應鏈安全 | vendor、supply chain |
| **ISO/IEC 27037** | **數位證據處理** | identify／collect／acquire／**preserve** digital evidence |
| **ISO/IEC 27041** | 調查方法的適切性與保證 | forensic methodology assurance |
| **ISO/IEC 27042** | 數位證據的分析與解讀 | forensic analysis／interpretation |
| **ISO/IEC 27043** | 事件調查原則與流程 | incident investigation |
| **ISO/IEC 27050** | **eDiscovery** | ESI：identification → preservation → collection → processing → review → production |
| **COBIT** | IT 治理框架 | **Enterprise IT governance ＋ management**；不是只做 security，也不是純 risk framework |
| **COSO** | 內控與風險治理 | Enterprise／internal control／risk governance。**最易與 COBIT 混** |
| **CIS Controls** | 實務控制清單 | 已排序的實務安全控制；不是 ISMS 管理系統 |
| **ISO/IEC 20000-1** | ITSM 管理系統**要求** | IT service management；**最易與 ISO 27001 混**（一個管服務、一個管資安） |
| **ISO 31000** | **風險管理**框架 | 設計、導入與管理風險。**現行為 2018 版**，是 guidelines 不是 certification standard；題庫若出 `ISO 31000:2009` 視為 legacy wording |
| **Hex GBL** | — | **虛構名詞**（Discworld 典故），純 distractor，不必記 |
| **NIST SP 800-37** | 風險管理框架 | **RMF 七步驟**，見 §1.2 末段 |
| **NIST SP 800-53** | 控制目錄 | Security and Privacy Controls for Information Systems and Organizations |
| **NIST SP 800-53A** | 控制評估 | **評估** 800-53 的那些 controls |
| **NIST SP 800-88** | 媒體淨化 | Media sanitization |
| **FIPS 199** | 分級 | Security categorization |
| **FIPS 200** | 最低要求 | Minimum federal security requirements |
| **NIST SP 800-92** | 日誌管理 | Log management |
| **CSA CCM** | 雲端控制矩陣 | 把控制對映到各種要求 |
| **CAIQ** | 問卷 | 搭配 CCM 使用的 CSA 問卷 |
| **CSA STAR** | 保證／登錄計畫 | **三個層級：Level 1 = Self-Assessment；Level 2 = Third-party certification／attestation；Level 3 = Continuous auditing／monitoring**。**沒有 Level 4。**（題庫有時寫 `Tier 1`，看到 self-assessment 就選 Level／Tier 1） |
| **CMM** | 能力成熟度模型 | 流程的**嚴謹度、細節、可重複性（repeatability）** |
| **Common Criteria** | ISO/IEC 15408 | IT 產品安全評估；概念含 TOE、Protection Profile、Security Target、EAL |
| **FIPS 140-2／140-3** | 密碼模組驗證 | **140-2 = legacy；140-3 = current** |
| **GAAP** | 會計原則 | Generally Accepted Accounting Principles——**不是** cloud security audit standard，是 distractor |

**易混淆規則：**

```text
SSAE 18   = 標準；SOC 1/2/3 = 報告
ISO 27001 = ISMS 認證；ISO 27002 = 控制指引
ISO 27017 = 雲端安全；ISO 27018 = 公有雲 PII
CSA CCM   = 控制矩陣；CAIQ = 問卷；STAR = 保證／登錄
CMM       = 成熟度（嚴謹、細節、可重複）→ 不要選 CSA STAR
ISO 31000 / NIST 800-37 = 風險管理框架
NIST 800-92 = 日誌管理
COBIT     = enterprise IT governance
SAS 70    = legacy，後繼為 SOC 1
GAAP      = 會計原則，不是 audit standard
COSO      = internal control / risk governance（不是 IT governance）
CIS Controls = 實務控制清單（不是 ISMS）
ISO 20000-1  = ITSM 要求（不是資安 ISMS）
27036     = supplier／supply chain
27037     = 數位證據處理 ／ 27050 = eDiscovery
```

#### FISMA → RMF → 800-53 → 800-53A 核心鏈

```text
FISMA
  ↓ risk-based federal security
RMF / NIST SP 800-37
  ↓ select controls
NIST SP 800-53
  ↓ assess controls
NIST SP 800-53A
```

#### ⭐ 版本 legacy 陷阱

| 題庫可能出 | 現行 |
|---|---|
| **ISO 31000:2009** | 已撤 → **2018** |
| **ISO 27018:2019** | 已撤 → **2025** |
| **ISO 27017:2015** | **2026 edition** |
| **FIPS 140-2** | legacy 世代 → **140-3** |
| **SAS 70** | legacy → 後繼 **SOC 1** |
| **Privacy Shield** | invalid → **EU-U.S. DPF**（見 §1.4） |

完整的題庫陷阱表見 [`CCSP/domain6-legal-framework-reference.md`](../../domain6-legal-framework-reference.md)。

> **四選一範例：** 問「service organization 的 audit standard 是哪個」，選項為 SOC 1／**SSAE 18**／GAAP／SOC 2 時，正解是 **SSAE 18**——SOC 是 report，GAAP 是會計原則。

#### 鄰近項目的切法（`by-test/13` Part 2 §2 Layer 2）

| 對照 | 切法 |
|---|---|
| **ISO 27001 vs 27002** | `27001 = What an ISMS MUST satisfy（requirements，可認證）`；`27002 = HOW，控制實務指引`。工程類比：**27001 = interface／specification，27002 = implementation guidance** |
| **ISO 27001 vs SOC 2** | `ISO 27001 → organization has an ISMS`（holistic security management program）；`SOC 2 → auditor reports on scoped service controls`（CSP／SaaS 控制是否有效運作 → SOC 2 Type 2） |
| **SOC 2 vs SSAE** | `SSAE = auditor 遵循的 rules／standards`；`SOC 2 = 交付給 stakeholder 的 assurance examination／report`。工程類比接近 **compiler vs binary**，不是兩個競爭的 certification |

#### Exam trigger words（Layer 3）

```text
Holistic ISMS                                → ISO 27001
Security control guidance                    → ISO 27002
Enterprise IT governance                     → COBIT
General risk management                      → ISO 31000
Prepare→Categorize→Select→Implement→Assess
  →Authorize→Monitor                         → NIST RMF / SP 800-37
Service organization assurance               → SOC
Privacy principles                           → OECD
```

**NIST SP 800 系列為何被採用：** 公開可取得、成本效益高（public domain），**不是因為國際強制採用或比較容易**。

#### CSA Ecosystem：CCM → CAIQ → STAR

三者常被混用，要能串成一條線：

```text
CSA
 │
 ├─ CCM    → control framework（哪些 controls？如何對應其他 framework？）
 │
 ├─ CAIQ   → assessment questionnaire（是否已實作這些 controls？）
 │
 └─ STAR   → assurance / registry program
      ├─ Level 1 = Self-Assessment
      ├─ Level 2 = Third-party certification / attestation
      └─ Level 3 = Continuous auditing / monitoring
```

**一句話版：**

```text
CCM  = controls      （應有哪些 controls？）
CAIQ = questions     （這些 controls 做了嗎？）
STAR = assurance maturity / registry
```

#### STAR 的三個層級

```text
STAR Level 1   SELF        → Self-Assessment
STAR Level 2   THIRD PARTY → Third-party Certification / Attestation
STAR Level 3   CONTINUOUS  → Continuous Auditing / Monitoring
```

> **建議的 mnemonic：1 自己看 → 2 別人看 → 3 一直看**

| 層級 | 內容 |
|---|---|
| **Level 1 — Self-Assessment** | 由 CSP 自己揭露、回答 security posture，**直接對應 CAIQ**：`CSP → CCM controls → CAIQ questionnaire → STAR Level 1` |
| **Level 2 — Third-Party Assurance** | 有獨立第三方介入：`Cloud Provider → Independent third party → Certification／Attestation`。問 `STAR level requiring third-party assessment?` → **Level 2** |
| **Level 3 — Continuous** | 持續性的 monitoring／auditing／assurance。問 `highest STAR level?` → **3** |

**⭐ 不要自行發明 Level 4：**

```text
1 = Self
2 = Third party
3 = Continuous
4 = ❌（不存在）
```

> **常見錯誤：** third-party assessment 與 highest level 兩題都誤選 Level 4。

**CCM 的兩個角色：**

1. 回答「cloud security 應有哪些 controls？」
2. 回答「這些 controls 和 ISO、NIST、FedRAMP 等 framework 如何對應？」——即 **cross-mapping**

```text
                 CCM
        Cloud control framework
                 │
     ┌───────────┼───────────┐
     ↓           ↓           ↓
 ISO controls   NIST      FedRAMP
     ↖           ↑           ↗
          control mappings
```

**⭐ CCM 不是 enforcement tool。** 它不是 SIEM、configuration enforcement engine、CSPM scanner、Ansible 或 policy engine。

```text
CCM tells you what controls matter.
Tooling verifies / enforces them.
```

例如：

```text
CCM                               → Require secure configuration baseline
Ansible / CSPM / Policy-as-Code   → Actually apply / check that baseline
```

> **常見錯因：** 把「ensuring baseline configuration is applied」當成 CCM 的 benefit。那是 tooling 的職責，不是 framework 的。這是 **framework vs enforcement** 的邊界問題。

**CAIQ 的定位：**

```text
CCM  = What controls?
CAIQ = Do you implement them?
```

範例：CCM 寫「Key management controls should exist」→ CAIQ 問「Do you maintain documented key-management procedures?」「Do you control cryptographic key access?」。**CAIQ 不是 control catalog 本身**，它是 assessment questionnaire。

#### NIST RMF 七步驟（來源：`by-test/11` D5 §4）

```text
Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor
```

英文口訣 **P-C-S-I-A-A-M** 不好記，建議改用中文生命週期口訣：

> ## **準、分、選、做、驗、准、監**

```text
準 = Prepare     準備 context / roles / risk assumptions
分 = Categorize  系統與資料的 impact 有多高？
選 = Select      選哪些 controls？
做 = Implement   真的部署 controls
驗 = Assess      測試 controls 有沒有作用
准 = Authorize   risk owner／AO 正式接受 residual risk
監 = Monitor     上線後持續監控
```

| 步驟 | 重點 | 工程師類比 |
|---|---|---|
| **Prepare** | 建立 context、角色、風險管理策略 | requirements／threat model／architecture context |
| **Categorize** | 依資訊與系統的影響程度分級 | determine impact／criticality——「這是 blog 還是 national payment system？」 |
| **Select** | 選定控制基線並裁適 | choose security controls（MFA、logging、encryption、segmentation） |
| **Implement** | 落實控制並記錄 | 真的 deploy：Terraform、Ansible、Kubernetes policy、EDR、IAM |
| **Assess** | 評估控制是否正確實作、按預期運作 | vuln scan、audit、pentest、configuration assessment |
| **Authorize** | 權責主管基於風險做出授權決定 | **工程師最不直覺的一步**：管理者正式接受 residual risk、允許系統上線。可想成 production go-live approval，但**不等於 DevOps approve** |
| **Monitor** | 持續監控控制與風險態勢 | drift、vulnerabilities、logs、control effectiveness、environment changes |

**為什麼順序不會錯——它有因果：**

```text
不知道 context       → 不能分類
不知道風險等級       → 不知道選什麼 controls
沒選 controls        → 無法 implement
沒 implement         → 無法 assess
沒 assess            → 不應 authorize
authorize 後         → 必須 monitor
```

**RMF 不是什麼：** 不是 threat-only framework，也不是 cost-only framework。**Threat 與 cost 都只是 risk decision 的 input，不是框架的 foundation。**

```text
Mission/business context
        ↓
Risk
        ↓
Controls
        ↓
Assessment
        ↓
Authorization
        ↓
Continuous monitoring
```

#### 三個常被混用的治理／風險框架（一行定位）

```text
COBIT    = Govern IT            （企業 IT 治理）
800-37   = Run RMF              （執行風險管理流程）
31000    = Manage risk broadly  （一般企業風險管理原則）
```

#### ISO 27001 的 technology-neutral（來源：`by-test/11` D1 §5）

ISO 27001 規範的是 **ISMS requirements**（管理系統要求），不綁任何技術或部署形態。

```text
ISO 27001 = management system / requirements
ISO 27002 = security control guidance
```

遇到「ISO 27001 偏好哪一種技術／部署方式」的題目，答案永遠是**沒有偏好**。

**Auditability：** 指「已準備好接受稽核的狀態」，不等同「受監管」，也不等同 AICPA SOC report 本身。支援稽核的雲端特性是**標準化 baseline、組態證據、可重複性、版本化產出**。

### 1.3 OECD 隱私原則

| 原則 | 重點 |
|---|---|
| Collection limitation | 蒐集限制 |
| **Data quality** | 個資須**準確、完整、現時、可更正** |
| Purpose specification | 明示蒐集目的 |
| **Use limitation** | 僅得用於已揭露／被允許的目的 |
| Security safeguards | 安全保護措施 |
| Openness | 公開透明 |
| Individual participation | 個人參與 |
| Accountability | 可歸責 |

> **陷阱：** **Right to be forgotten／purge 是 GDPR 時代的概念，不是原始 OECD 八原則之一。**

#### 八原則的 lifecycle 串法（`by-test/13` Part 2 §1）

OECD Privacy Guidelines 是一組 **privacy／data-governance principles**，不是像 ISO 27001 那樣的認證標準，而且八條應視為一個整體。最有效的記法不是背英文首字母，而是串成 personal data 的生命週期：

```text
Collect → Keep good data → State why → Don't use it for something else
       → Protect it → Tell people → Let the person inspect/challenge
       → Organization remains accountable
```

| 中文記憶串 | OECD 原則 |
|---|---|
| 少收 | Collection Limitation |
| 收對 | Data Quality |
| 說明目的 | Purpose Specification |
| 不亂用 | Use Limitation |
| 保護 | Security Safeguards |
| 透明 | Openness |
| 本人能查改 | Individual Participation |
| 公司負責 | Accountability |

#### 逐條：工程師 mental model 與 exam trigger

| 原則 | 核心 | 工程師 mental model | **Exam trigger keyword** |
|---|---|---|---|
| **Collection Limitation** | 蒐集要有限制、lawful、fair，適當時需 knowledge／consent | API input 最小化／allow only required fields | **What should we collect?** 過度蒐集與服務無關的欄位 |
| **Data Quality** | 個資須與用途相關，必要時準確、完整、保持更新 | data validation + integrity + freshness | **incorrect／obsolete／incomplete** personal data |
| **Purpose Specification** | 最遲在 collection 時指定用途 | 先宣告 API contract 再處理 | **Why are we collecting this?** |
| **Use Limitation** | 後續使用原則上限於該目的或相容目的，除非有 consent 或 lawful authority | 不得越界呼叫 | 收集時說「送貨通知」，後來把名單賣給廣告商 |
| **Security Safeguards** | 合理 safeguards 防止 loss、unauthorized access、destruction、use、modification、disclosure | encryption／IAM／MFA／RBAC／logging／DLP／backup／network／physical | **Protect PII against unauthorized access／modification／disclosure** |
| **Openness** | 對 personal-data practices／policies 有一般性公開 | documentation／transparency（Privacy Notice） | 有沒有收、收什麼、怎麼用、誰是 controller |
| **Individual Participation** | **data subject**（不是員工）可確認、取得、challenge、要求 rectification | 自助查詢與更正流程 | **access／correct／challenge one's own data** |
| **Accountability** | 治理責任最終要有人承擔，outsource 給 CSP 不等於免責 | controller → policies／controls／processors／CSP，仍須能證明原則被遵守 | 對應 `responsibility can be delegated, accountability remains` |

#### Scenario → Principle 反推表

考題多半給情境而不給名詞，練習時要能反向對應：

| Scenario | Principle |
|---|---|
| 收太多資料 | **Collection Limitation** |
| 資料錯誤／過期 | **Data Quality** |
| 沒說為什麼收 | **Purpose Specification** |
| 拿去做原本沒說的用途 | **Use Limitation** |
| 沒保護 PII | **Security Safeguards** |
| 不透明的 data practice | **Openness** |
| 本人無法 access／correct | **Individual Participation** |
| 組織主張「外包給 CSP 之後就不是本組織的責任」 | **Accountability** |

#### Purpose Specification vs Use Limitation（最常混）

```text
Purpose Specification = Declare why   （先定義用途）
Use Limitation        = Stay within why（之後不要拿去做別的）
```

更口語的版本：

```text
Purpose = 說我要拿來幹嘛
Use     = 不要拿去幹別的
```

> **Individual Participation 的 individual 是 data subject，不是「員工參與資安」。**

### 1.4 隱私角色與跨境傳輸

| 角色 | 定義 |
|---|---|
| **Data subject** | 個資所描述的個人 |
| **Data controller** | 決定處理的**目的與方式** |
| **Data processor** | 依 controller 指示處理；cloud provider 常扮演此角色 |
| **Data custodian** | 資料的日常維護與保護者 |
| **Data owner** | 最終法律責任歸屬者 |

> **核心原則：** Cloud provider 常是 data processor，但 **cloud customer／data owner／controller 仍負最終法律責任**。Outsourcing 不會完全轉移 accountability。

**資料地理三名詞：**

```text
Data residency     = 資料實際放在哪裡
Data sovereignty   = 資料受哪個國家法律管轄
Data localization  = 法規要求資料必須留在特定國家／地區
```

**跨境傳輸：** 練習時抓 **adequacy／cross-border transfer** 的判斷邏輯；實務上的國家清單具時效性，**必須查證現行官方 adequacy 名單**（題庫中「南韓不符合」的敘述已過時，現行 EU adequacy 清單包含大韓民國）。

#### EU 國際傳輸決策樹

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
      └─ 其他 GDPR 機制
```

**四種主要機制：**

| 機制 | 內容 |
|---|---|
| **Adequacy decision** | EU 執委會認定第三國保護程度充分；現行清單含英國、日本、加拿大（商業組織）、南韓、巴西，以及參與 DPF 的美國組織等 |
| **SCCs**（Standard Contractual Clauses） | **European Commission 預先核可的契約條款**，作為傳輸至非 adequate 第三國的 safeguard |
| **BCRs**（Binding Corporate Rules） | 跨國集團的**集團內部**傳輸機制 |
| 其他 | certification／codes of conduct、Article 49 的有限 derogations |

```text
EU → non-adequate third country  →  often SCCs
EU → certified U.S. organization →  EU-U.S. Data Privacy Framework
```

#### ⭐ Privacy Shield → EU-U.S. DPF 的正確理解

```text
歷史：
  U.S. Department of Commerce → administered Privacy Shield
  FTC                         → enforced participating companies' commitments

2020 Schrems II（CJEU）       → Privacy Shield 判定 invalid
2023 起                       → EU-U.S. Data Privacy Framework (DPF)
  管理：Commerce / ITA
  執法：FTC / DOT（依管轄範圍）
```

**兩個題庫問題：**

1. 題庫把「Privacy Shield 由 **FTC** administer」當正解——**不準**。Commerce administer、FTC enforce。
2. 整題前提 **Privacy Shield 已 legacy／invalid**，不應當成現行機制背。

> 看到 **HHS** 先想 **HIPAA／healthcare**，不是跨境傳輸機制。
>
> 題目前提雖已過時，但 **SCC 本身是現行且高價值的概念**，務必記住。

#### Conflict of Laws / Choice of Law

雲端場景天生跨多個 jurisdiction：

```text
Customer    = 台灣
CSP         = 美國
Data center = 德國
Contract    = 英國法條款
Incident    = 法國
```

問「到底適用哪裡的法律」就是 **conflict of laws／choice of law** 的問題。兩個名詞必須分清：

```text
Jurisdiction    = Which court can hear?   （法院有無受理權限）
Choice of Law   = Which law applies?      （應適用哪個地方的實體法）
```

**Restatement (Second) of Conflict of Laws** 是美國用來處理後者的彙編。此為法律名詞，CCSP 不要求 law-school 深度——認得「多 jurisdiction 時判斷適用法」即可。

### 1.5 法律流程、證據與鑑識

| 名詞 | 中文理解 | 秒殺判斷 |
|---|---|---|
| **Legal hold** | 法律保全令 | 有訴訟或調查時，**先保留資料，暫停常規 retention／secure destruction** |
| **eDiscovery** | 電子證據揭露 | identify → preserve → **collect** → process → review → produce |
| **Chain of custody** | 證據保管鏈 | 證明證據自取得到提交未遭竄改 |
| **Forensic image** | 鑑識映像 | bit-level 或可驗證副本 |
| **Spoliation** | 證據破壞 | 該保留卻刪除或破壞 |
| **Subpoena** | 傳票 | 要求提供證據或出庭 |
| **Warrant** | 搜索令 | 執法機關取得搜索／扣押授權 |
| **MLAT** | 跨國司法協助條約 | 跨境取證 |
| **Jurisdiction** | 管轄權 | **哪個法院有權受理案件**（Which court can hear?）——不是「哪個法律適用」，後者是 choice of law |
| **Choice of Law** | 法律選擇 | 既然該法院可受理，**應適用哪個 jurisdiction 的 substantive law**（Which law applies?） |
| **Restatement (Second) of Conflict of Laws** | 衝突法彙編 | 案件涉及多個 jurisdiction 時，用來判斷應適用哪個 jurisdiction 的法律；偏 **choice of law** 一側 |

**Legal hold 流程：**

```text
收到訴訟／eDiscovery 通知
        ↓
啟動 Legal Hold
        ↓
暫停常規 retention／secure destruction
        ↓
保全可能相關的資料與日誌
```

不要選：暫停威脅建模、先做新的風險評估、繼續原排程銷毀。

**鑑識角色：**

| 角色 | 職責邊界 |
|---|---|
| **Evidence Custodian** | 出庭前監管所有證物完整性與保管狀態（chain of custody） |
| Incident Handler | 事件遏制與調查，未必是出庭證物保管人 |

> **不要把隱私角色（controller／processor）直接套到鑑識證據鏈。**

**兩條必記：**

- **Forensic reporting 的最終法律接收者是 the court**（不是 regulator、不是 senior management）。
- **Forensic copy 的完整性值必須與 the original 比對**（不是 backup、不是另一份副本）。

#### 鑑識處理流程與可採性（`by-test/13` Part 2 §3G）

```text
Original Evidence → Forensic image → Hash verification → Working copy → Analysis
```

**修正一個過絕對的說法：** `modified data = automatically inadmissible` **太絕對**。正確理解是：

> **Unexplained／undocumented modifications damage evidence credibility and integrity**——但 modification 本身不必然自動造成 inadmissibility。

真正的重點在 **chain of custody、hashes、documentation、repeatability、original preservation**。Hash 作為完整性驗證手段的說明見 [Domain 2 §1.7](../domain2-data-security/01-consolidated-lecture.md)。

**證據完整性的五要素模型**（把零散的 supporting factors 固定下來）：

```text
Original preservation
        +
Hash / integrity verification
        +
Chain of custody
        +
Documentation
        +
Repeatable / validated process
```

**考場秒答順序：**

```text
Preserve → Hash → Document → Track custody
```

> CCSP 不要求深入 digital forensics 工具操作；看到 evidence 題先找上面四個動作。

#### Forensic Testimony：為什麼要講 Alternative Explanations

題型：`When presenting forensic evidence in court as testimony, include, if possible...` → 正解 **Alternative explanations**。分類 `[J] ISC2 judgment`。

它測的不是法律知識，而是：**forensic examiner 應保持客觀，而不是替某一方 advocacy。**

**假設檢驗模型。** 例如證據顯示：

```text
03:17  Alice's account downloaded secrets.zip
```

較差的推論是直接說「Alice stole the data」——證據只證明**該 account 執行過 download**。合理的 hypotheses 至少有四個：

```text
H1  Alice 主動下載
H2  Alice credential 被盜
H3  Malware 使用 Alice session
H4  Automated process 使用相同 credential
```

專業作法是：① 提出合理的 alternative explanations → ② 用證據逐一驗證或排除 → ③ 最後才提出 professional conclusion。

```text
H2 → MFA records + source IP      → unlikely
H3 → EDR telemetry                → no supporting evidence
H4 → service configuration        → not applicable
H1 → most consistent with evidence
```

**Professional opinion ≠ Personal opinion：**

| | 可以 | 不該 |
|---|---|---|
| 類型 | **Professional opinion** | **Personal opinion** |
| 基於 | evidence、expertise、validated methodology、repeatable analysis | 主觀感受（例如「這個人看起來就很可疑」） |
| 證據價值 | 有 | 無 evidentiary value |

**為什麼「your side of the case」也不是最佳答案：** forensic examiner 不是 plaintiff 的 technical salesman，也不是 defense 的 technical salesman，而應是 **independent technical expert**。

```text
Forensic testimony = objective + evidence-based + considers alternatives
```

ISC2 judgment 的偏好方向：

| 偏好 | 不偏好 |
|---|---|
| objective、evidence-based、complete、documented、considers alternative explanations | defend your side、personal opinion、win the argument |

> **CCSP 的深度界線：** 此題有 courtroom context，但只需到「**forensic expert = objective ＋ professional ＋ considers competing explanations**」。不需深入 rules of evidence、hearsay doctrine、expert witness qualification procedure 或 cross-examination law——這不是需要大量投入的純法律章節。

#### Preponderance of Evidence vs Comparative Negligence（`by-test/13` Part 2 §3H）

這兩個常被題庫混用：

| 名詞 | 回答什麼 |
|---|---|
| **Preponderance of evidence** | **Burden of proof**：某個 factual claim 是否 more likely than not |
| **Comparative negligence** | **Fault 百分比如何影響 damages**（按比例減免） |

pure comparative model 範例：

```text
Defendant = 75% fault
Damage    = $125,000
→ $93,750
```

> 題庫的「75% fault > 51% → 賠 100%」把兩者混為一談，且不同 jurisdiction 規則不同——標記 **`[Q]` 題庫品質**。

#### Seizure 的範圍（`by-test/13` Part 2 §3I）

**不要背「court order 一定拿走 electronic data ＋ hardware」。** 實際可取得什麼，由**法律權限、warrant／order scope、jurisdiction** 決定。

雲端多租戶下，客戶資料位於 CSP 共用硬體，因此執法更可能要求 **CSP production／disclosure**，而不是搬走整台實體伺服器。

> 要知道的是：**digital evidence 與 physical media 都可能成為 seizure 對象。**

### 1.6 合約、供應商治理與責任邊界

| 名詞 | 秒殺判斷 |
|---|---|
| **SLA** | 服務水準承諾（uptime、response time） |
| **SLO／SLI** | 目標性服務水準／可量測指標 |
| **MSA** | 主服務合約 |
| **DPA** | 資料處理協議（GDPR／processor 情境） |
| **NDA** | 保密協議——**分享 SOC 2 Type 2 時常被要求簽署** |
| **Right to audit** | 稽核權，是 assurance 能力，不是技術控制 |
| **Indemnification** | 補償／賠償條款 |
| **Liability** | 誰對損失負責 |
| **Due care** | **DO**：實際採取並維持 reasonable safeguards（encrypt、patch、access control、protect PII） |
| **Due diligence** | **CHECK**：調查與驗證——事前盡職調查，並持續確認 safeguards 確實存在且有效（risk assessment、audit、vendor review、SOC review、continuous monitoring） |
| **Liability** | **CONSEQUENCE**：未盡前兩者時可能承擔的法律責任 |
| **RACI** | Responsible／Accountable／Consulted／Informed |

```text
Outsourcing 不等於責任全部轉移。
SLA 是服務水準承諾，不是完整安全保證。
Right to audit 是 assurance 能力，不是技術控制。
Due Care = DO ／ Due Diligence = CHECK ／ Liability = CONSEQUENCE
```

> **用語註記：** ISC2 教材在「diligence 是事前調查還是持續驗證」上兩種寫法都出現過，本檔採合併表述（事前 ＋ 持續皆屬 diligence）。作答時抓動詞：**investigate／verify／assess → Due diligence**；**implement／maintain safeguards → Due care**。

**四個詞一次釘死（含英文混淆陷阱）：**

```text
Due Diligence = KNOW / investigate / assess / review
Due Care      = DO / implement reasonable safeguards
Liability     = legal responsibility   ← 法律責任
Reliability   = 可靠性                 ← 完全不同的字，不要混
```

> **常見混淆：把 Liability 誤記為「可依賴性」。** 那是 **Reliability**。中文直譯「盡職工作／盡職調查」對考試也不夠精準，建議直接用 `KNOW／DO／legal responsibility` 三個英文定位。

**Contract 是信任的根本機制：** 確保 provider 履行義務的最重要機制是 **contract**；技術控制支援 assurance，但法律責任錨定在合約。

**契約誘因的方向性：**

```text
Customer 的槓桿  → service suspension（中止服務）
Provider 的槓桿  → financial penalties / service credits（違約金與服務抵用）
```

**Vendor M&A 風險：** 待處理的併購可能導致 **vendor lockout 或服務中斷／合約不穩定**。

**供應鏈：** 評估 CSP 須一併評估其 subprocessor（見 [Domain 5 §1.7](../domain5-operations/01-consolidated-lecture.md)）。

### 1.7 智慧財產權

| IP type | 保護對象 | 秒殺 |
|---|---|---|
| **Copyright** | 創作的**具體表達形式**（文章、程式碼、音樂、圖像） | tangible expression |
| **Patent** | **發明、方法、製程、技術設計** | invention／process |
| **Trademark** | 品牌、商標、logo、識別符號 | brand identifier |
| **Trade secret** | 商業秘密（配方、內部流程、未公開資訊） | confidential business info |

**美國主管機關：**

| 縮寫 | 全名 | 秒答 |
|---|---|---|
| **USPTO** | U.S. Patent and Trademark Office | **Patent／Trademark** |
| USDA | U.S. Department of Agriculture | Agriculture |
| OSHA | Occupational Safety and Health Administration | Workplace safety |
| SEC | Securities and Exchange Commission | Securities／public companies |

```text
Farm → USDA ； Patent → USPTO ； Worker → OSHA ； Stocks → SEC
```

**Public domain：** 著作權會到期，**非常古老的著作可能已進入公有領域，使用時不需另行取得授權**。遇到 DMCA／授權題，先確認作品是否仍受保護。

**Code signing** 可支援軟體完整性與**所有權**證明。

### 1.8 風險管理

**處置方式：**

```text
Risk treatment = Avoid / Mitigate / Transfer / Accept
Risk 不能被「reverse（逆轉）」。
Residual risk 必須被明示接受。
```

**量化 vs 質性：**

```text
Quantitative = 數字／金額／機率／ALE
Qualitative  = 分級／評等／high-medium-low／主觀評估
```

**公式：**

```text
SLE = AV × EF          （單一事件損失 = 資產價值 × 暴露係數）
ALE = SLE × ARO        （年度預期損失 = 單一事件損失 × 年度發生率）
```

**三者的單位定位（最快的防混淆法）：**

```text
ARO = 次數 / year        （frequency）
SLE = $ / incident       （loss per occurrence）
ALE = expected $ / year  （expected annual loss）
```

完整鏈：

```text
Asset Value
   × Exposure Factor
   ↓
  SLE
   × ARO
   ↓
  ALE
```

**ARO 算例：**

```text
平均每 5 年一次   → ARO = 1/5 = 0.2
平均每年 4 次     → ARO = 4
```

**完整 worked example：**

```text
一次 ransomware 損失 NT$500,000，平均每 4 年一次

SLE = 500,000
ARO = 0.25
ALE = 500,000 × 0.25 = 125,000 / year
```

> **常見 factual error：把 ARO 誤認為「年度總損失」。** 年度總損失是 **ALE**；ARO 只是頻率。能秒算上面這個例子，就算補完。

**Exposure Factor（EF）** 受 **threat vector 類型**影響最大，因為它決定破壞機制與損失比例；EF 不等同「攻擊目標」或「資產名稱」。

#### ARO 的 evidence vs calculation（來源：`by-test/11` D5 §1）

**ARO（Annualized Rate of Occurrence）** 回答「一年預期發生幾次？」。問「ARO 最直接的依據是什麼」時，正解是 **historical occurrence data**。

```text
Historical data          = evidence（證據／輸入）
Aggregation / average    = calculation technique（處理手法）
```

算例：

```text
5 years, 10 incidents  →  10 / 5 = ARO 2
```

**為什麼 Aggregation 不是最佳答案？** 它是 processing／calculation technique，不是 evidence source。整條鏈是：

```text
Historical data → Aggregation / average → Observed frequency → ARO estimate
```

Aggregation 不是「不能用」，而是**必須先有 historical observations 才能 aggregate**。

**Risk appetite 由高階管理層／董事會決定。**

**Asset inventory vs BIA：**

```text
Asset inventory 回答：What do we have?
BIA           回答：What matters most?
                   （criticality、business impact、dependencies、
                     acceptable downtime、business value）
```

技術資產清單本身無法完整回答 business importance。

---

## 2. 錯題與修正規則 / Errors & Corrections

### 2.1 SOC 報告分類反覆失分（`by-test/02` Q3／Q4／Q7、`by-test/04` §10.2）

- 取得 SOC 2 Type 2 時，provider 可能要求簽 **NDA**（不是叫客戶去申請 CSA STAR）。
- 目的即為公開發布、可放公司網站的是 **SOC 3**。
- 「simply an attestation of audit results」也是 **SOC 3**。
- **SOC 2 Type 3 不存在。**

### 2.2 鑑識流程的接收者與比對基準（`by-test/02` Q6／Q11）

- Forensic reporting phase 的呈現對象是 **the court**；看到「合規／監管」就選 regulator 是錯誤反射。
- Forensic copy 的完整性值要與 **the original** 比對。

### 2.3 框架名稱對映（`by-test/03` Q2／Q21／Q22、`by-test/09` §7）

- 風險管理框架 = **ISO 31000**（或 NIST 800-37）；NIST 800-92 是日誌管理。
- 搭配 CSA CCM 的問卷是 **CAIQ**；FIPS 140-2 是密碼模組驗證；OWASP Top 10 是 web 應用風險清單。
- **ISO 27001 是技術中立的**，不偏好任何產品類型。

### 2.4 FedRAMP 適用對象（`by-test/07` §9.1）

FedRAMP 是美國聯邦雲端授權計畫，**聯邦機關**使用經授權的雲服務；**民間企業預設不受其強制**（EXCEPT 題常考這一點）。

### 2.5 隱私角色 taxonomy（`by-test/09` §7.1）

Data subject／controller／processor／custodian 四者必須分清；不要把 custodian（日常維護者）與 controller（決定目的與方式）混用。

### 2.6 ARO 與 RMF 的 foundation 誤判（`by-test/11` D5 §1、§4）

- 問 ARO 的直接依據時誤選 **aggregation**：那是計算手法，evidence 是 **historical occurrence data**（見 §1.8）。
- 問 RMF 以什麼為 foundation 時誤選 **cost** 或 **threat**：RMF 是 risk-based framework，cost 與 threat 都只是 input（見 §1.2）。

---

## 3. 一句話規則表 / One-liner Rules

| # | 規則 |
|---|---|
| 1 | GLBA = 金融個資；PCI DSS = 支付卡；HIPAA = 醫療 PHI；SOX = 財報內控。 |
| 2 | PCI DSS 是 industry standard，不是政府法規。 |
| 3 | FedRAMP 管美國聯邦機關的雲服務；民間企業預設不受強制。 |
| 4 | 在 HIPAA／FERPA／PIPEDA／DMCA 之中，DMCA 是唯一的著作權法。 |
| 5 | 美國是 sectoral 隱私法模式，沒有綜合聯邦隱私法。 |
| 6 | SSAE 18 是標準；SOC 1／2／3 才是報告。 |
| 7 | SOC 1 = 財報控制；SOC 2 = 詳細 trust services 控制；SOC 3 = 公開摘要。 |
| 8 | SOC 2 Type 1 看設計（時點）；Type 2 看運作有效性（期間）；**Type 3 不存在**。 |
| 9 | 分享 SOC 2 Type 2 常需簽 NDA。 |
| 10 | ISO 27001 = ISMS 認證且技術中立；27002 = 控制指引；27017 = 雲端；27018 = 公有雲 PII。 |
| 11 | ISO 31000 與 NIST 800-37 是風險管理框架；NIST 800-92 是日誌管理；NIST 800-53 是控制目錄。 |
| 12 | CSA CCM = 控制矩陣；CAIQ = 問卷；STAR = 保證／登錄計畫。 |
| 13 | 看到「嚴謹度、細節、可重複性」→ **CMM**，不要選 CSA STAR。 |
| 14 | Common Criteria = ISO/IEC 15408，概念含 TOE、PP、ST、EAL。 |
| 15 | FIPS 140-2 是 legacy，140-3 是現行。 |
| 16 | NIST SP 800 被採用是因為公開可得且成本效益高，不是國際強制。 |
| 17 | Auditability 是「可被稽核的就緒狀態」，不等於受監管或 SOC 報告本身。 |
| 18 | OECD 八原則不含 right to be forgotten；那是 GDPR 時代概念。 |
| 19 | OECD use limitation = 只能用於已揭露目的；data quality = 準確、完整、現時、可更正。 |
| 20 | Controller 決定目的與方式；processor 依指示；custodian 做日常維護；data subject 是本人。 |
| 21 | Cloud provider 常是 processor，但 customer／data owner 仍負最終法律責任。 |
| 22 | Residency = 放哪；Sovereignty = 受誰管；Localization = 必須留在哪。 |
| 23 | 跨境傳輸要抓 adequacy 邏輯；國家清單具時效性，須查證現行官方名單。 |
| 24 | 收到訴訟通知先啟動 **Legal hold**，暫停常規銷毀。 |
| 25 | eDiscovery = identify／preserve／collect／process／review／produce。 |
| 26 | Forensic reporting 的最終接收者是 **the court**。 |
| 27 | Forensic copy 完整性與 **the original** 比對。 |
| 28 | 出庭前的證物保管人是 **Evidence Custodian**。 |
| 29 | 確保 provider 履約的最重要機制是 **contract**。 |
| 30 | Customer 的契約槓桿是中止服務；Provider 的槓桿是違約金／服務抵用。 |
| 31 | Right to audit 是 assurance 能力，不是技術控制。 |
| 32 | Due diligence 是事前調查；due care 是持續合理注意。 |
| 33 | Outsourcing 不會完全轉移 accountability。 |
| 34 | Vendor 併購風險 = vendor lockout／服務中斷／合約不穩。 |
| 35 | Copyright 保護具體表達；Patent 保護發明與製程；Trademark 保護品牌；Trade secret 保護未公開資訊。 |
| 36 | 美國專利與商標申請機關是 **USPTO**。 |
| 37 | 著作權會到期，公有領域作品不需另行取得授權。 |
| 38 | Code signing 可支援軟體所有權與完整性證明。 |
| 39 | Risk treatment = avoid／mitigate／transfer／accept；risk 不能被 reverse。 |
| 40 | SLE = AV × EF；ALE = SLE × ARO；EF 受 threat vector 類型影響最大。 |
| 41 | Quantitative 用數字與金額；Qualitative 用分級與主觀評等。 |
| 42 | Risk appetite 由高階管理層／董事會決定；residual risk 必須被接受。 |
| 43 | Asset inventory 回答「有什麼」；BIA 回答「什麼最重要」。 |
| 44 | **RMF 七步驟：Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor（P-C-S-I-A-A-M）。** |
| 45 | RMF 是 risk-based framework；threat 與 cost 都只是 input，不是 foundation。 |
| 46 | ARO 的 evidence 是 historical occurrence data；aggregation 只是計算手法。 |
| 47 | Aggregation 必須先有 historical observations 才能產生 frequency estimate。 |
| 48 | ISO 27001 是 technology-neutral：非 cloud／on-prem／vendor／open-source specific。 |
| 49 | COBIT = enterprise IT governance；不是純 security 也不是純 risk framework。 |
| 50 | SAS 70 是 legacy，現代後繼體系是 SOC 1。 |
| 51 | ISO 27002:2022 有 **93 controls**，分 organizational／people／physical／technological。 |
| 52 | SOC 2 的 TSC 是 Security、Availability、Processing Integrity、Confidentiality、Privacy。 |
| 53 | SSAE 版本號不必死背；現行 SOC 2 Type 2 illustrative report 已引用 SSAE 21。 |
| 54 | ISO 31000 現行為 2018 版，是 guidelines 不是 certification standard。 |
| 55 | Hex GBL 是虛構名詞，純 distractor。 |
| 56 | OECD 記憶串：少收 → 收對 → 說明目的 → 不亂用 → 保護 → 透明 → 本人能查改 → 公司負責。 |
| 57 | `Purpose = Declare why`；`Use = Stay within why`。 |
| 58 | Individual Participation 的 individual 是 **data subject**，不是員工。 |
| 59 | `modified data = automatically inadmissible` 太絕對；關鍵是 unexplained／undocumented 的修改損害可信度。 |
| 60 | **Preponderance of evidence = burden of proof；comparative negligence 才決定 damages 比例。** |
| 61 | Seizure 範圍由法律權限、warrant scope 與 jurisdiction 決定；digital 與 physical 都可能被取得。 |
| 62 | **Due Care = DO；Due Diligence = CHECK；Liability = CONSEQUENCE。** |
| 63 | **RMF 中文口訣：準、分、選、做、驗、准、監。** |
| 64 | RMF 的 **Authorize** 是管理者正式接受 residual risk，不等於 DevOps approve。 |
| 65 | RMF 順序有因果：沒 context 不能分類、沒 assess 不應 authorize、authorize 後必須 monitor。 |
| 66 | `COBIT = Govern IT`；`800-37 = Run RMF`；`31000 = Manage risk broadly`。 |
| 67 | **ARO = 次數／year；SLE = $／incident；ALE = expected $／year。** |
| 68 | **把 ARO 誤認為年度總損失是常見錯誤——年度總損失是 ALE。** |
| 69 | 一次損失 500,000、每 4 年一次 → ARO 0.25、ALE 125,000／year。 |
| 70 | OECD 題多半給情境，要能從情境反推原則（見 §1.3 反推表）。 |
| 71 | **Liability = legal responsibility；Reliability = 可靠性——兩個字不要混。** |
| 72 | Due Diligence = KNOW／investigate；Due Care = DO／implement。 |
| 73 | 證據完整性五要素：original preservation ＋ hash ＋ chain of custody ＋ documentation ＋ repeatable process。 |
| 74 | 看到 evidence 題的秒答順序：**Preserve → Hash → Document → Track custody**。 |
| 75 | CCM 的兩個角色：定義 cloud controls ＋ **cross-mapping** 到 ISO／NIST／FedRAMP。 |
| 76 | **CCM tells you what controls matter; tooling verifies／enforces them.** |
| 77 | 「ensuring baseline configuration is applied」不是 CCM 的 benefit，是 Ansible／CSPM 的職責。 |
| 78 | `CCM = What controls?`；`CAIQ = Do you implement them?` |
| 79 | **STAR Level 1 = Self-Assessment；Level 2 = Third-party certification；Level 3 = Continuous auditing。** |
| 79a | **STAR 沒有 Level 4**；問 highest level 答 **3**，問 third-party 答 **2**。 |
| 79b | STAR mnemonic：**1 自己看 → 2 別人看 → 3 一直看**。 |
| 79c | STAR Level 1 直接對應 CAIQ：`CCM controls → CAIQ questionnaire → STAR L1 self-assessment`。 |
| 80 | **GAAP 是會計原則，不是 cloud security audit standard**（四選一的 distractor）。 |
| 81 | GLBA 是**美國聯邦法**、管金融機構的 **nonpublic personal information**；PCI DSS 是產業標準、管支付卡資料。 |
| 82 | 題幹出現「federal law ＋ financial institutions ＋ private information」→ **GLBA**。 |
| 83 | **Jurisdiction = Which court can hear?；Choice of Law = Which law applies?** |
| 84 | Restatement (Second) of Conflict of Laws 用於多 jurisdiction 時判斷適用法，偏 choice of law。 |
| 85 | **法庭作證應包含 alternative explanations**——測的是 examiner 的客觀性。 |
| 86 | Forensic examiner 是 **independent technical expert**，不是任一方的 technical salesman。 |
| 87 | Professional opinion 基於 evidence 與 validated methodology；personal opinion 無 evidentiary value。 |
| 88 | ISC2 偏好 objective／evidence-based／documented／considers alternatives，不偏好 defend your side。 |
| 89 | 證據只證明「該 account 做了某事」，不等於「該人做了某事」——要列並排除 credential 被盜、malware、automated process 等假設。 |

---

## 4. 易混淆邊界 / Confusable Boundaries

| A | B | 切法 |
|---|---|---|
| GLBA | PCI DSS | 美國金融法 vs 支付卡產業標準 |
| SSAE 18 | SOC 1／2／3 | 標準 vs 報告 |
| SOC 2 | SOC 3 | 詳細、受限散布 vs 公開摘要 |
| SOC 2 Type 1 | Type 2 | 時點設計 vs 期間有效性 |
| ISO 27001 | ISO 27002 | 可認證的 ISMS vs 控制指引 |
| ISO 27017 | ISO 27018 | 雲端安全控制 vs 公有雲 PII |
| ISO 31000 | NIST 800-92 | 風險管理 vs 日誌管理 |
| CSA CCM | CAIQ | 控制矩陣（有哪些 controls） vs 問卷（有沒有實作） |
| CSA CCM | Ansible／CSPM／policy engine | 定義與對映 controls vs 實際套用與檢查 |
| STAR Level 1 | STAR Level 2 | 自我評估 vs 第三方認證／證明 |
| STAR Level 2 | STAR Level 3 | 第三方一次性認證 vs 持續稽核與監控 |
| SSAE 18 | GAAP | 審計 attestation 標準 vs 會計原則 |
| CMM | CSA STAR | 流程成熟度 vs 雲端控制保證 |
| Auditability | Regulated | 就緒狀態 vs 受監管 |
| Controller | Processor | 決定目的與方式 vs 依指示處理 |
| Custodian | Owner | 日常維護 vs 最終法律責任 |
| Residency | Sovereignty | 放在哪 vs 受誰法律管 |
| Jurisdiction | Choice of Law | 哪個法院可受理 vs 應適用哪個法律 |
| GLBA | PCI DSS | 美國聯邦法、金融機構個資 vs 產業標準、支付卡資料 |
| Sovereignty | Localization | 受誰管 vs 必須留在哪 |
| Legal hold | eDiscovery | 先停止刪除 vs 找出並提交證據 |
| Evidence custodian | Incident handler | 證物保管鏈 vs 事件遏制調查 |
| Court | Regulator | 鑑識報告最終接收者 vs 一般合規對象 |
| Due care | Due diligence | DO／實作維持 vs KNOW／調查驗證 |
| Liability | Reliability | 法律責任 vs 可靠性（英文易混） |
| SLA | Contract | 服務水準承諾 vs 法律責任錨點 |
| Copyright | Patent | 具體表達 vs 發明與製程 |
| Trademark | Trade secret | 品牌識別 vs 未公開商業資訊 |
| SLE | ALE | 單次損失 vs 年度預期損失 |
| EF | ARO | 單次損失比例 vs 年度發生頻率 |
| Historical data | Aggregation | 證據來源 vs 計算手法 |
| ISO 31000 | NIST 800-37（RMF） | 風險管理原則 vs 七步驟流程 |
| ISO 31000 | COBIT | 一般企業風險管理 vs IT 治理 |
| RMF Authorize | DevOps approve | 管理者接受 residual risk vs 部署審核 |
| ISO 27001 | SOC 2 | 組織有 ISMS vs auditor 對特定範圍控制出具報告 |
| SOC 2 | SSAE | 交付的 assurance 報告 vs auditor 遵循的標準 |
| SOC 1 | SAS 70 | 現行 vs 已汰換的前身 |
| Purpose Specification | Use Limitation | 先宣告用途 vs 事後不得越界 |
| Individual Participation | 員工資安參與 | data subject 的查改權 vs 無關概念 |
| Preponderance of evidence | Comparative negligence | 舉證門檻 vs 責任比例與賠償 |
| Professional opinion | Personal opinion | 基於證據與方法論 vs 主觀感受 |
| Independent expert | Advocate for one side | 客觀技術專家 vs 某一方的技術說服者 |
| ARO | ALE | 一年發生幾次 vs 一年預期損失多少錢 |

> **註：** ISO 31000 與 NIST 800-37 都是風險管理框架，差別在前者偏原則與治理架構，後者是可執行的七步驟流程。

---

## 5. 補強演練 / Drills

### Drill A：D6 targeted drill（約 90 分鐘）

| 任務 | 時間 |
|---|---|
| 隱私角色閃卡（subject／controller／processor／custodian） | 15 min |
| CSA CCM／CAIQ／STAR／ISO／NIST 對照 | 20 min |
| GLBA／HIPAA／PCI／GDPR／EU adequacy 快表 | 20 min |
| 契約／SLA 誘因模式 | 15 min |
| D6 targeted questions 20–25 題 | — |
| **Gate** | **≥ 75–80%** |

### 框架題的答題方法（`by-test/13` Part 2 §2）

D6 的 ROI 關鍵是**先建 taxonomy map，而不是通讀標準全文**。ISO 27002:2022 本身就有 93 controls，硬讀的 ROI 對 CCSP 很低。CCSP 的準備目標不是 ISO Lead Auditor。

#### 三層模型

| 層 | 做什麼 | 對應 |
|---|---|---|
| **Layer 1** | 看到名稱兩秒內能歸類「它是什麼東西」 | §1.2 兩秒歸類表 |
| **Layer 2** | 學會與鄰近項目的差異 | §1.2 鄰近項目的切法 |
| **Layer 3** | 只背 exam trigger words | §1.2 trigger words |

**Layer 1 最重要。** 不需要背 ISO 條號。

#### 陌生管理題的四問法

```text
① 這是 standard、framework、report、law 還是 principle？
② 誰使用它：organization、auditor、regulator 還是 customer？
③ 它產出什麼：certification、report、controls 還是 process？
④ 題目在問 governance、audit、risk 還是 privacy？
```

填答範例：

| | **SOC 2** | **ISO 27001** |
|---|---|---|
| What? | report／examination | management-system requirements standard |
| Who? | service organization ＋ independent auditor | organization |
| Output? | assurance report | ISMS ＋ possible certification |
| Purpose? | customer／vendor assurance | systematic information-security governance |

這是 [README 錯題 argue 流程](../README.md) 的 D6 專用變體。

#### 建議的 D6 備考時間配置

| 比例 | 工作 |
|---:|---|
| 40% | LearnZapp fresh questions |
| 25% | 錯題 argue ＋ boundary 修正 |
| 20% | Framework comparison flashcards |
| 10% | Udemy／DestCert targeted review |
| 5% | 官方 summary 查證陌生術語 |

> **原則：** 不要一看到陌生名詞就去讀 30 頁 PDF。先建立 `name → category → purpose → neighboring distinction`，已足以應付大部分 CCSP 題。

#### 補強材料看完後的閉卷檢核

§5 前段的四問法用於**作答**；這一組用於**驗收補強是否生效**。每看完一段材料後關掉它，花 2–3 分鐘閉卷寫：

```text
這個東西是什麼？
它不是什麼？
最容易跟誰混？
題目出什麼 keyword 我會選它？
```

以 SOC 系列為例，能寫出下列四行才算材料有作用：

```text
SSAE       = auditor standard
SOC 2      = assurance report
ISO 27001  = ISMS certification
SAS 70     = legacy
```

**不要一次把補強材料清空。** 每看完一段就先做這組檢核，再看下一段。

#### D6 的閉卷 KPI

這四項能閉卷完成，D6 的主要 retention 缺口就算補起來：

| # | KPI |
|---|---|
| 1 | 寫出 RMF 七步驟（中文口訣亦可）＋每步一句用途 |
| 2 | SSAE／SOC 1-2-3／Type 1-2／ISO 27001-27002 能一眼分類 |
| 3 | 由 scenario 反推是哪一條 OECD 原則 |
| 4 | 秒算 SLE／ARO／ALE（含 worked example） |

### Drill B：法規與標準閉卷默寫（10 分鐘）

寫出 §1.1 的最小必背集合七條，再寫出 §1.2 的易混淆規則七行。

### Drill C：審計報告對照（10 分鐘）

寫出 SSAE 18、SOC 1、SOC 2 Type 1／Type 2、SOC 3 各自的用途，並回答「哪一個可以公開發布」「哪一個需要 NDA」。

### Drill D：法律流程（10 分鐘）

依序寫出 eDiscovery 六個階段，並說明 legal hold 應該在哪一步之前啟動。

### 自我檢測

- SSAE 18 與 SOC 報告的關係是什麼？
- 哪一份報告可以公開放在公司網站？
- Forensic copy 的完整性要跟什麼比對？為什麼不是 backup？
- Right to be forgotten 是 OECD 原則之一嗎？
- Cloud provider 是 processor，那誰負最終法律責任？
- SLE、ALE 的公式各是什麼？EF 受什麼影響最大？
- 確保 provider 履行義務的最重要機制是什麼？
- OECD 八原則用中文記憶串怎麼背？Purpose 與 Use Limitation 差在哪？
- Individual Participation 的「individual」指誰？
- `modified data` 一定不可採證嗎？真正的判準是什麼？
- Preponderance of evidence 與 comparative negligence 各回答什麼問題？
- CCM 能不能「確保 baseline configuration 被套用」？為什麼？
- STAR Level 1 與 Level 2 各是什麼？
- Jurisdiction 與 Choice of Law 差在哪？
- 「federal law 管金融機構的私人資訊」是 GLBA 還是 PCI DSS？
- STAR 有幾個層級？第三方評估與最高層級各是哪一個？
- 法庭作證時為什麼要主動提出 alternative explanations？
- 「Alice 的帳號下載了檔案」能直接推論「Alice 偷了資料」嗎？要先排除哪些假設？
- RMF 七步驟的順序是什麼？RMF 以什麼為 foundation？
- 問 ARO 的直接依據時，為什麼不能選 aggregation？
- ISO 27001 偏好 cloud 還是 on-prem？
