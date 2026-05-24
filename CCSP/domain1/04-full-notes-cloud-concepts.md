# CCSP Domain 1 完整講義 / Full Notes — Cloud Concepts, Architecture & Design

> 本講義整理自 Domain 1 錯題檢視與互動式分析，重點聚焦於 CCSP Domain 1 常見考點、錯題陷阱、名詞辨析、情境判斷與考前速記。

---

## 目錄

1. Domain 1 核心定位

2. Domain 1 常見考題思路

3. 雲端部署模型：Public、Private、Community、Hybrid

4. 雲端服務模型：IaaS、PaaS、SaaS

5. NIST 五大雲端基本特性

6. Shared Responsibility Model

7. Cloud Roles：Consumer、Provider、Auditor、Carrier、Broker

8. Cloud Governance 雲端治理

9. Cloud Sprawl 與 Shadow IT

10. Vendor Lock-in 供應商鎖定

11. Containerization 容器化

12. Serverless 無伺服器架構

13. Rapid Elasticity 與 Capacity Planning

14. Cloud Migration Strategies：Rehost、Replatform、Refactor、Repurchase、Retire、Retain

15. Infrastructure as Code 與 Configuration Drift

16. SaaS 使用後 IT 角色變化

17. CSA CCM 與 ISO/IEC 27017

18. Domain 1 高頻錯題主軸

19. 互動式題目完整解析

20. 易混淆比較總表

21. 考前速記表

22. 考試答題策略

---

# 1. Domain 1 核心定位

CCSP Domain 1 的主題是：

**Cloud Concepts, Architecture and Design**

也就是：

- 雲端基本概念

- 雲端架構設計

- 雲端部署模型

- 雲端服務模型

- 雲端角色與責任

- 雲端治理

- 雲端風險與設計取捨

- 雲端架構最佳實務

Domain 1 不是只考定義背誦。考題常見形式是給出一個情境，要求判斷最合適的雲端模型、架構策略或治理方式。

常見題型包括：

- 哪一種 cloud deployment model 最符合需求？

- 哪一種 cloud service model 的責任分工最正確？

- 題目是在考可用性、可攜性、可見性，還是治理？

- 哪個雲端特性符合 NIST 定義？

- 哪個選項最能降低 vendor lock-in？

- 哪個選項最能改善 cloud sprawl 或 shadow IT？

- 哪種 migration strategy 最符合題目描述？

---

# 2. Domain 1 常見考題思路

Domain 1 的考試核心不是「看到雲端就選技術名詞」，而是先判斷題目真正問的是什麼。

## 2.1 常見判斷維度

|判斷維度|題目常見問法|可能考點|
|---|---|---|
|控制程度|highest control、dedicated、self-managed|Private cloud、IaaS|
|彈性擴展|fast scaling、dynamic workload、elastic|Public cloud、rapid elasticity|
|混合架構|sensitive on private + non-sensitive on public|Hybrid cloud|
|共同合規|multiple organizations with shared requirements|Community cloud|
|供應商依賴|proprietary APIs、hard to migrate|Vendor lock-in|
|可攜性|standard formats、cloud-agnostic|Portability、lock-in mitigation|
|可見性|serverless、provider-managed infrastructure|Reduced infrastructure visibility|
|治理|tagging、budget、policy、approval|Cloud governance|
|未授權使用|departments using SaaS without IT approval|Shadow IT|
|資源失控|idle VMs、untagged resources、cost explosion|Cloud sprawl|
|自動化基礎設施|manage resources through code|Infrastructure as Code|
|環境偏離設定|manual console changes differ from IaC|Configuration drift|

---

## 2.2 Domain 1 答題原則

1. 先找關鍵字，不急著看答案。

2. 分辨題目是在考「模型」、「責任」、「治理」還是「架構特性」。

3. 看到 maximum / highest control，通常優先考慮 Private cloud 或 IaaS。

4. 看到 public + private 同時出現，通常優先考慮 Hybrid cloud。

5. 看到 multiple organizations + shared mission / shared compliance，通常考 Community cloud。

6. 看到 CSP manages application，通常是 SaaS。

7. 看到 customer manages OS，通常是 IaaS。

8. 看到 customer writes code but does not manage OS/runtime，通常是 PaaS。

9. 看到 proprietary APIs / proprietary databases，通常是 Vendor lock-in。

10. 看到 idle resources / no tags / cost overrun，通常是 Cloud sprawl。

---

# 3. 雲端部署模型：Public、Private、Community、Hybrid

Cloud deployment model 是指雲端環境如何被部署、擁有、使用與共享。

CCSP Domain 1 常考四種主要部署模型：

- Public cloud

- Private cloud

- Community cloud

- Hybrid cloud

---

## 3.1 Public Cloud

### 定義

Public cloud 是由雲端服務商提供給一般大眾或多個客戶使用的雲端環境。底層資源由 CSP 管理，通常具備高度彈性、快速擴展與用多少付多少的特性。

### 特色

- 多租戶架構

- 高擴展性

- 低前期成本

- 快速佈建

- Pay-as-you-go

- CSP 管理底層基礎設施

### 適合情境

- 非敏感工作負載

- 快速開發與測試

- 網站服務

- 彈性流量需求

- 初期成本需要降低的場景

### 常見關鍵字

- public cloud

- scalable

- elastic

- low upfront cost

- pay-as-you-go

- commodity workloads

- non-sensitive workloads

### 注意事項

Public cloud 不代表不安全，但客戶對底層環境控制較少。若題目強調最高控制、專用環境或完全自主管理，通常不是 Public cloud。

---

## 3.2 Private Cloud

### 定義

Private cloud 是專供單一組織使用的雲端環境，可由組織自行管理，也可由第三方代管。重點是專用性與高控制度。

### 特色

- 單一組織專用

- 控制程度較高

- 可自訂安全控制

- 可滿足嚴格合規要求

- 可能需要較高前期投資

- 可支援特定 RTO / RPO 設計

### 適合情境

- 高敏感資料

- 需要最高資料控制

- 嚴格合規環境

- 關鍵業務應用

- 對安全設定、網路、隔離與資料位置有高度要求

### 常見關鍵字

- highest control

- maximum control

- dedicated environment

- single organization

- strict security requirements

- critical business applications

- higher upfront investment

- self-managed security settings

### 考試重點

當題目出現 **highest level of data control** 或 **maximum control**，通常優先考慮 Private cloud。

### 易錯點

題目若同時出現「合規」與「資料控制」，不代表一定是 Community cloud。Community cloud 必須有多個組織共享共同需求。若只有單一組織追求最高控制，通常是 Private cloud。

---

## 3.3 Community Cloud

### 定義

Community cloud 是由多個具有共同需求、共同任務、共同安全要求或共同法規要求的組織共同使用的雲端環境。

### 特色

- 多個相似組織共享

- 共同任務或共同法規需求

- 成本可分攤

- 控制與合規可共同設計

- 常見於政府、醫療、研究、金融同業場景

### 適合情境

- 多家醫院共同使用雲端平台

- 多個政府機關共享合規雲

- 多所研究機構共享研究平台

- 多個金融機構使用共同安全標準的環境

### 常見關鍵字

- multiple organizations

- shared mission

- shared compliance requirements

- common regulatory requirements

- same industry

- community of organizations

### 考試重點

Community cloud 的關鍵不是「合規」本身，而是：

> 多個組織 + 共同需求 + 共享雲環境

---

## 3.4 Hybrid Cloud

### 定義

Hybrid cloud 是由兩種或更多種不同部署模型組成的雲端架構，例如 private cloud + public cloud，並透過技術或流程整合運作。

### 特色

- 結合 private 與 public 的優點

- 敏感資料可留在 private/on-prem

- 非敏感或彈性需求可使用 public cloud

- 可平衡控制、成本與擴展性

- 需要整合網路、身分、資料與管理流程

### 適合情境

- 敏感資料留在本國資料中心

- 非敏感工作負載放 public cloud

- 企業保留部分 legacy 系統，同時使用 public cloud

- 災難復原與 burst capacity

- 法規資料留在受控環境，一般網站服務上 public cloud

### 常見關鍵字

- private cloud + public cloud

- on-prem + public cloud

- sensitive workloads stay private

- non-sensitive workloads use public cloud

- integrated environments

- balance control and scalability

### 考試重點

看到以下組合時，通常是 Hybrid cloud：

> 敏感資料留在 private/on-prem + 非敏感服務放 public cloud

---

## 3.5 Deployment Model 比較表

|模型|核心特徵|控制程度|成本特徵|常見關鍵字|
|---|---|--:|---|---|
|Public cloud|多客戶共享 CSP 環境|較低|低前期成本，用量計費|scalable, public, pay-as-you-go|
|Private cloud|單一組織專用|最高|前期成本較高|highest control, dedicated|
|Community cloud|多個相似組織共享|中高|成本分攤|shared mission, common compliance|
|Hybrid cloud|多種部署模型整合|彈性平衡|視架構而定|private + public, sensitive + non-sensitive|

---

# 4. 雲端服務模型：IaaS、PaaS、SaaS

Cloud service model 是指 CSP 與客戶各自管理哪些層級。

CCSP Domain 1 常考三大服務模型：

- IaaS

- PaaS

- SaaS

核心判斷方式：

> 看 CSP 管到哪一層，以及客戶還需要管理什麼。

---

## 4.1 IaaS：Infrastructure as a Service

### 定義

IaaS 是 CSP 提供底層基礎設施，例如運算、儲存、網路與虛擬化能力。客戶自行管理 OS、patches、runtime、middleware、application 與 data。

### CSP 通常負責

- Physical data center

- Physical servers

- Storage hardware

- Network hardware

- Virtualization layer

- Basic infrastructure availability

### 客戶通常負責

- Operating system

- OS patching

- Runtime

- Middleware

- Application

- Application security

- Data

- Identity and access management

- Security configuration

### 常見關鍵字

- customer manages OS

- OS patching

- virtual machines

- compute instances

- maximum flexibility

- install middleware

- configure operating system

### 考試記法

> IaaS = 租地基，自己蓋房子。

或：

> IaaS = 管系統。

### 常見情境

公司希望 CSP 只管理底層基礎設施，而 OS、runtime、middleware、application 與 data 都自行管理。這就是 IaaS。

---

## 4.2 PaaS：Platform as a Service

### 定義

PaaS 是 CSP 提供應用程式開發與執行的平台，包括底層基礎設施、OS、middleware、runtime。客戶主要負責 application code、data 與部分設定。

### CSP 通常負責

- Infrastructure

- Operating system

- OS patching

- Runtime

- Middleware

- Platform services

- Managed database platform 的底層服務

### 客戶通常負責

- Application code

- Application logic

- Application data

- Application configuration

- User access

- Secure coding

### 常見關鍵字

- developers focus on code

- no OS patching

- runtime managed by CSP

- middleware managed by CSP

- application development platform

- managed platform

### 考試記法

> PaaS = 寫程式，不管 OS / runtime / middleware。

或：

> PaaS = 提供讓 application 跑起來的平台，不是提供完整 application。

### 常見錯點

PaaS 不是提供完整 application。提供完整 application 的是 SaaS。PaaS 提供的是開發與執行 application 的平台。

---

## 4.3 SaaS：Software as a Service

### 定義

SaaS 是 CSP 提供完整可使用的應用程式。客戶通常不管理底層基礎設施、OS、runtime、middleware 或 application 本身，只管理使用者、資料、權限與設定。

### CSP 通常負責

- Application

- Runtime

- Middleware

- OS

- Infrastructure

- Application maintenance

- Application patching

### 客戶通常負責

- Users

- Data

- Permissions

- SaaS configuration

- Identity integration

- Compliance requirements

- Data sharing settings

- Audit logs usage

### 常見關鍵字

- ready-to-use application

- Microsoft 365

- Google Workspace

- Salesforce

- ServiceNow

- HR system

- email service

- no application development

### 考試記法

> SaaS = 直接使用現成軟體。

或：

> SaaS = 用軟體。

### 常見情境

公司使用現成 HR 系統，CSP 負責 application、runtime、OS 與 infrastructure，公司主要管理 users、data、permissions 與 settings。這是 SaaS。

---

## 4.4 IaaS、PaaS、SaaS 比較表

|項目|IaaS|PaaS|SaaS|
|---|---|---|---|
|CSP 管理|Infra、virtualization|Infra、OS、runtime、middleware|Application 到 infra|
|客戶管理|OS 到 data|Code、data、settings|Users、data、permissions、settings|
|代表情境|VM、自己 patch OS|寫 code，不管 runtime|使用現成軟體|
|控制程度|高|中|較低|
|管理負擔|高|中|較低|
|關鍵字|customer manages OS|developers focus on code|CSP manages application|

---

## 4.5 最短記法

- **SaaS = 用軟體**

- **PaaS = 寫程式**

- **IaaS = 管系統**

---

# 5. NIST 五大雲端基本特性

NIST 定義雲端運算的五大 essential characteristics：

1. On-demand self-service

2. Broad network access

3. Resource pooling

4. Rapid elasticity

5. Measured service

---

## 5.1 On-demand Self-service

### 定義

使用者可以不透過人工聯絡 CSP，自行佈建與管理雲端資源。

### 常見例子

- 自己開 VM

- 自己建立 storage bucket

- 自己建立 database

- 自己調整資源大小

- 自助開通服務

### 常見關鍵字

- no human interaction with provider

- self-provisioning

- user can provision resources

- automatically provisioned

### 考試記法

> On-demand self-service = 自助開資源。

---

## 5.2 Broad Network Access

### 定義

雲端服務可透過網路，使用標準機制，從多種裝置存取。

### 常見例子

- 手機存取雲服務

- 筆電存取雲服務

- 平板存取雲服務

- 瀏覽器或 API client 存取雲服務

### 常見關鍵字

- network access

- mobile phones

- tablets

- laptops

- standard mechanisms

- heterogeneous client platforms

### 考試記法

> Broad network access = 透過網路，多種裝置可存取。

---

## 5.3 Resource Pooling

### 定義

CSP 將運算、儲存、網路等資源集中成資源池，並以多租戶模式動態分配給不同客戶。

### 常見例子

- 多個客戶共享同一組底層資源

- 每個客戶資料邏輯隔離

- 資源依需求動態分配

### 常見關鍵字

- multi-tenant

- pooled resources

- dynamically assigned

- shared infrastructure

- location independence

### 考試記法

> Resource pooling = 多租戶共享資源池。

---

## 5.4 Rapid Elasticity

### 定義

雲端資源可以快速擴展與縮減，對使用者而言常像是幾乎無限可用。

### 常見例子

- 流量增加時自動擴 VM

- 高峰期自動增加 container replicas

- 流量下降時自動縮減資源

### 常見關鍵字

- scale out

- scale in

- auto scaling

- elastic

- rapid provisioning

- dynamic scaling

### 考試記法

> Rapid elasticity = 快速擴縮。

### 重要提醒

Rapid elasticity 不代表完全不需要 capacity planning。雲端仍需要規劃，只是規劃方式變成：

- Auto-scaling rules

- Monitoring

- Resource limits

- Budget controls

- Peak demand planning

- Cost governance

---

## 5.5 Measured Service

### 定義

CSP 會計量、監控、報告資源使用量，並通常用於依用量計費。

### 常見例子

- 依 VM 使用時間計費

- 依 storage 容量計費

- 依 API calls 計費

- 產生 usage report

- Pay-as-you-go billing

### 常見關鍵字

- metering

- usage measured

- pay-as-you-go

- usage report

- billing based on consumption

### 考試記法

> Measured service = 用量計量 + 依用量付費。

---

## 5.6 NIST 五大特性比較表

|特性|核心問題|關鍵字|
|---|---|---|
|On-demand self-service|是否能自助開資源？|self-provision, no human interaction|
|Broad network access|是否能透過網路多裝置存取？|network, mobile, laptop, tablet|
|Resource pooling|是否多租戶共享資源池？|multi-tenant, pooled resources|
|Rapid elasticity|是否能快速擴縮？|auto scaling, elastic, scale out|
|Measured service|是否計量與依用量付費？|usage report, metering, pay-as-you-go|

---

# 6. Shared Responsibility Model

## 6.1 核心觀念

Shared Responsibility Model 指雲端安全與合規責任由 CSP 與 cloud consumer 共同承擔。雲端模型不同，責任分界也不同。

核心原則：

> 工作可以外包，責任不能完全外包。

使用雲端服務不代表所有安全、治理與合規責任都由 CSP 承擔。

---

## 6.2 IaaS 中的責任分工

### CSP 通常負責

- Physical data center

- Physical security

- Physical servers

- Network hardware

- Storage hardware

- Virtualization layer

- Cloud infrastructure availability

### 客戶通常負責

- OS configuration

- OS patching

- Runtime

- Middleware

- Application

- Application security

- Data protection

- Identity and access management

- Security groups / firewall rules

- Logging configuration

---

## 6.3 PaaS 中的責任分工

### CSP 通常負責

- Infrastructure

- OS

- Runtime

- Middleware

- Platform patching

### 客戶通常負責

- Application code

- Data

- Secure development

- Configuration

- Identity and access

- Application-level logging

---

## 6.4 SaaS 中的責任分工

### CSP 通常負責

- Full application stack

- Application patching

- Runtime

- OS

- Infrastructure

### 客戶通常負責

- Users

- Data

- Access permissions

- SaaS configuration

- Data classification

- Compliance requirements

- Vendor risk review

- Data retention and export

---

## 6.5 Shared Responsibility 與 Insider Threat

Domain 1 錯題中特別出現 insider threat 與 shared responsibility 的情境。

### 常見錯誤答案

「實作一致 access controls」雖然重要，但通常不是最困難的部分。Access control 可透過 IAM、RBAC、SSO、policy、access review 等方式設計。

### 更困難的部分

在 shared responsibility 模型下，最困難的是：

> 跨組織邊界協調 user activity monitoring。

原因：

- 使用者行為可能分散於客戶端、CSP 端、SaaS 端與管理平面。

- CSP 與客戶的日誌範圍不同。

- Insider threat 需要跨邊界監控、關聯分析與證據整合。

- 可見性與責任邊界會造成調查困難。

### 考試記法

> Shared responsibility + insider threat = visibility、monitoring coordination、evidence integration。

---

# 7. Cloud Roles：Consumer、Provider、Auditor、Carrier、Broker

NIST 雲端角色常在 Domain 1 出現。

---

## 7.1 Cloud Consumer

### 定義

Cloud consumer 是使用雲端服務的一方。

### 例子

- 使用 AWS / Azure / GCP 的企業

- 使用 Microsoft 365 的公司

- 使用 Salesforce 的業務部門

### 關鍵字

- uses cloud services

- customer

- tenant

---

## 7.2 Cloud Provider

### 定義

Cloud provider 是提供雲端服務的一方。

### 例子

- AWS

- Microsoft Azure

- Google Cloud

- Salesforce

- ServiceNow

### 關鍵字

- provides cloud services

- CSP

- service provider

---

## 7.3 Cloud Auditor

### 定義

Cloud auditor 是對雲端服務、控制、合規或安全性進行獨立評估的一方。

### 例子

- 第三方稽核公司

- SOC 2 auditor

- ISO 27001 certification body

### 關鍵字

- independent assessment

- audit

- compliance review

- control verification

---

## 7.4 Cloud Carrier

### 定義

Cloud carrier 是提供 cloud consumer 與 cloud provider 之間連線與傳輸的一方。

### 例子

- ISP

- Telecom provider

- Network carrier

### 關鍵字

- network connectivity

- transport

- connection between consumer and provider

---

## 7.5 Cloud Broker

### 定義

Cloud broker 是管理、仲介、整合或協調不同雲端服務的一方。

### 常見功能

- Service intermediation

- Service aggregation

- Service arbitrage

- Multi-cloud service management

### 關鍵字

- broker

- intermediary

- aggregate services

- manage multiple cloud providers

---

## 7.6 Cloud Roles 比較表

|角色|中文理解|核心功能|
|---|---|---|
|Cloud consumer|雲端使用者|使用雲服務|
|Cloud provider|雲端服務商|提供雲服務|
|Cloud auditor|雲端稽核方|評估安全與合規|
|Cloud carrier|雲端傳輸方|提供網路連線|
|Cloud broker|雲端仲介方|整合或管理多雲服務|

---

# 8. Cloud Governance 雲端治理

## 8.1 定義

Cloud governance 是透過政策、標準、流程、控制、標籤、成本管理與監控，確保雲端資源符合營運、安全、合規與成本要求。

### 核心目標

- 資源可追蹤

- 成本可管理

- 權限可控管

- 安全基準可落實

- 合規要求可證明

- 變更可審核

- 環境可維持一致

---

## 8.2 Cloud Governance 常見內容

- Naming convention

- Tagging policy

- Cost center mapping

- Budget alerts

- Approval workflow

- Security baseline

- Identity governance

- Policy enforcement

- Logging and monitoring standards

- Compliance controls

- Resource lifecycle management

---

## 8.3 Tagging Policy

### 定義

Tagging policy 是要求雲端資源必須附上標籤，以利成本管理、責任歸屬、環境識別、安全政策套用與稽核。

### 常見標籤

- owner

- cost center

- environment：dev / test / prod

- application

- data classification

- business unit

- compliance scope

### 題目關鍵字

- no owner

- no cost center

- cannot identify dev/test/prod

- untagged resources

- cost allocation issue

### 考試判斷

若題目描述資源沒有 owner、cost center 或 environment，通常最先改善的是 tagging policy。

---

## 8.4 Cloud Governance 情境

### 題目情境

公司想建立規則，要求所有雲端資源都符合命名規則、標籤規則、成本控管、安全基準與合規要求。

### 正確概念

Cloud governance。

### 理由

治理關注的是透過政策與流程讓雲端使用可控、可追蹤、可合規。

---

# 9. Cloud Sprawl 與 Shadow IT

Cloud sprawl 與 Shadow IT 很容易混淆，但考點不同。

---

## 9.1 Cloud Sprawl

### 定義

Cloud sprawl 是雲端資源缺乏治理，導致資源過度建立、閒置、重複、未標籤、成本與安全風險失控。

### 常見例子

- VM 開了沒有關

- Storage bucket 沒有 owner 標籤

- 測試環境一直保留

- 不同部門重複建立相同環境

- 成本暴增

- 未使用資源持續計費

- 權限設定無人管理

### 關鍵字

- idle VMs

- untagged storage

- duplicate test environments

- cost explosion

- unmanaged resources

- lack of ownership

- uncontrolled resource growth

### 記法

> Cloud sprawl = 雲資源亂長，管理熵急速增長。

### 改善方式

- Cloud governance

- Tagging policy

- Budget alerts

- Approval workflow

- Resource lifecycle management

- Automated cleanup

- Regular inventory review

---

## 9.2 Sprawl 字義補充

Sprawl 不是 sparrow。

- **sparrow** = 麻雀

- **sprawl** = 蔓延、無序擴張、亂長一片

在雲端語境中：

> Cloud sprawl = cloud resources spreading out of control。

---

## 9.3 Shadow IT

### 定義

Shadow IT 是部門或員工在未通知 IT、未經安全審查或未獲核准的情況下，自行使用 IT 系統、SaaS 工具或雲端服務。

### 常見例子

- 行銷部自行註冊 SaaS 平台

- 業務部自行使用未核准的雲端檔案分享工具

- 團隊用個人信用卡購買雲端服務

- 未經安全審查的 AI 工具被用於處理公司資料

### 關鍵字

- departments use SaaS without IT approval

- no security review

- IT unaware

- unauthorized cloud services

- unsanctioned applications

### 改善方式

- 正式 SaaS 採購流程

- Security review

- Approved tools catalog

- Usage monitoring

- CASB / SaaS discovery

- User education

- Clear governance policy

---

## 9.4 Cloud Sprawl vs Shadow IT

|項目|Cloud Sprawl|Shadow IT|
|---|---|---|
|核心問題|資源太多且失控|未經 IT 核准使用服務|
|常見線索|idle VM、untagged resources、cost explosion|departments use SaaS without IT approval|
|改善重點|governance、tagging、budget、cleanup|approval、visibility、security review|
|主要風險|成本失控、安全設定混亂|未知資料風險、未審查服務|

---

# 10. Vendor Lock-in 供應商鎖定

## 10.1 定義

Vendor lock-in 是指組織過度依賴某雲端服務商的專有技術、API、資料格式或平台能力，導致未來遷移到其他 CSP 或 private cloud 時成本高、難度高或風險高。

---

## 10.2 常見造成原因

- 使用 provider-specific APIs

- 使用專有資料庫

- 使用專有監控工具

- 使用專有身份整合方式

- 使用非標準資料格式

- 應用與某 CSP 平台深度耦合

---

## 10.3 題目關鍵字

- proprietary APIs

- proprietary database

- difficult to migrate

- high rewrite cost

- dependence on one CSP

- hard to move to another provider

---

## 10.4 降低 Vendor Lock-in 的方法

- Cloud-agnostic architecture

- Standard data formats

- Open standards

- Portable container images

- Avoid excessive use of proprietary APIs

- Data export planning

- Multi-cloud strategy when justified

- Abstraction layers

---

## 10.5 考試記法

> 降低 lock-in = 標準化 + 可攜性 + 避免過度依賴 provider-specific features。

### 重要提醒

Cloud-agnostic architecture 與 standard data formats 不能保證完全無痛遷移，但能降低搬遷難度與供應商依賴程度。

---

# 11. Containerization 容器化

## 11.1 定義

Containerization 是將應用程式與其相依套件打包成容器映像檔，使應用能在不同環境中較一致地執行。

常見工具：

- Docker

- Kubernetes

- containerd

- ECS

- AKS

- EKS

- GKE

---

## 11.2 容器的優點

- Portability

- Consistent runtime environment

- Faster deployment

- Easier scaling

- Better resource efficiency compared with full VMs

- Supports microservices architecture

---

## 11.3 容器安全重點

容器不會自動安全。安全仍取決於多個層面。

### Image security

- Base image 是否有漏洞

- 是否使用可信來源映像

- 是否定期掃描 vulnerabilities

- 是否移除不必要工具

### Runtime security

- 是否使用最小權限

- 是否避免 privileged containers

- 是否限制 capabilities

- 是否限制 hostPath mounts

### Secrets management

- 不應將密碼、token、API key 寫入 image

- 使用 secrets manager 或 Kubernetes secrets 等機制

### Orchestration security

- Kubernetes RBAC

- Network policies

- Pod security settings

- Admission controls

- Secure cluster configuration

### Patching

- Base image 需定期更新

- 重新 build 與部署映像

---

## 11.4 常見錯誤觀念

錯誤：只要用了 container，應用就自動安全。  
正確：Container 可提升 portability，但安全仍取決於 image、runtime、secrets、orchestration 與 patching。

---

## 11.5 考試記法

> Container = 提升 portability，不等於自動安全。

---

# 12. Serverless 無伺服器架構

## 12.1 定義

Serverless 是一種雲端運算模式，CSP 負責管理底層基礎設施，客戶主要撰寫與部署 function code 或事件驅動邏輯。

常見例子：

- AWS Lambda

- Azure Functions

- Google Cloud Functions

---

## 12.2 Serverless 優點

- 減少基礎設施管理

- 自動擴展

- 事件驅動

- 依執行次數或時間計費

- 快速部署小型功能

---

## 12.3 Serverless 挑戰

### Reduced infrastructure visibility

因為底層基礎設施由 CSP 管理，客戶無法像 IaaS 那樣直接觀察或控制底層環境。

### Security measurement challenge

安全團隊可能較難量化某些底層安全控制效果，因為 infrastructure visibility 較低。

### Vendor lock-in risk

不同 CSP 的 serverless 事件模型、部署方式、IAM 整合與監控方式可能不同，容易產生供應商依賴。

---

## 12.4 客戶仍可控制的部分

Serverless 並不代表完全無法控制。客戶仍可管理：

- Function code

- IAM permissions

- Event triggers

- Logging settings

- Secrets handling

- Timeout settings

- Memory settings

- Dependency security

---

## 12.5 考試記法

> Serverless = 少管 infrastructure，但底層 visibility 也較少。

---

# 13. Rapid Elasticity 與 Capacity Planning

## 13.1 Rapid Elasticity 適合的架構

Rapid elasticity 最適合：

- Stateless applications

- Loosely coupled applications

- Horizontally scalable architectures

- Microservices

- Event-driven workloads

---

## 13.2 Stateless

Stateless 表示應用不依賴某一台特定伺服器保存狀態。狀態可存放於外部資料庫、cache、object storage 或 session store。

### 優點

- 容易水平擴展

- 容易替換 instance

- 容易 auto-scale

- 故障恢復較容易

---

## 13.3 Loosely Coupled

Loosely coupled 表示系統元件之間依賴較少，元件可較獨立地部署、擴展與替換。

### 優點

- 擴展特定元件較容易

- 單點變更影響較小

- 容易支援分散式架構

- 適合 cloud-native design

---

## 13.4 Rapid Elasticity 的錯誤觀念

錯誤：用了雲端之後完全不需要 capacity planning。  
正確：雲端仍需要 capacity planning，只是方式變成監控、上限、成本與自動化規則。

---

## 13.5 雲端 Capacity Planning 包含

- Auto-scaling rules

- Resource quotas

- Budget alerts

- Monitoring thresholds

- Peak demand forecasts

- Performance testing

- Cost optimization

- Limit planning

- Reserved capacity / savings plans when appropriate

---

## 13.6 常見工具概念

- Kubernetes HPA / VPA / Cluster Autoscaler

- Prometheus monitoring

- Terraform IaC

- Automation scripts

- Cloud-native monitoring services

---

# 14. Cloud Migration Strategies

雲端遷移策略常見六種：

- Rehost

- Replatform

- Refactor

- Repurchase

- Retire

- Retain

有些框架也稱為 6Rs。

---

## 14.1 Rehost

### 定義

Rehost 是將現有系統幾乎不修改，直接搬到雲端 IaaS。

### 俗稱

Lift and shift

### 常見關鍵字

- move existing VM to IaaS

- minimal changes

- no major code changes

- lift and shift

### 記法

> Rehost = 搬家，不裝修。

### 情境

公司想把現有 VM 搬到 IaaS，盡量少改程式。這是 Rehost。

---

## 14.2 Replatform

### 定義

Replatform 是在不完全重寫系統的情況下，做少量調整，使應用更適合雲端。

### 俗稱

Lift, tinker, and shift

### 常見關鍵字

- minor modifications

- use managed database

- small changes

- no full rewrite

- optimize for cloud platform

### 記法

> Replatform = 小改一下，再搬上雲。

### 情境

公司把應用搬到雲端，不想完全重寫，只改用 managed database 或調整少量設定。這是 Replatform。

---

## 14.3 Refactor

### 定義

Refactor 是重新設計應用架構，使其更 cloud-native。

### 常見關鍵字

- redesign architecture

- microservices

- cloud-native

- major code changes

- re-architect

- managed services

### 記法

> Refactor = 重新設計，變 cloud-native。

### 情境

公司將舊系統改成 microservices、使用 managed database、重設計成 cloud-native 架構。這是 Refactor。

---

## 14.4 Repurchase

### 定義

Repurchase 是停止使用原有系統，改買現成 SaaS 產品。

### 俗稱

Drop and shop

### 常見關鍵字

- replace with SaaS

- buy new cloud product

- switch to Salesforce

- SaaS CRM

### 記法

> Repurchase = 換成 SaaS 產品。

### 情境

公司原本使用自建 CRM，後來改用 Salesforce。這是 Repurchase。

---

## 14.5 Retire

### 定義

Retire 是關閉不再需要的系統，不搬到雲端。

### 常見關鍵字

- no longer used

- decommission

- shut down

- not migrate

### 記法

> Retire = 退休，不搬。

---

## 14.6 Retain

### 定義

Retain 是因法規、相依性、技術或成本因素，暫時保留系統在原環境中，不搬到雲端。

### 常見關鍵字

- keep in current environment

- not migrate yet

- regulatory reason

- dependency issue

- remain on-prem

### 記法

> Retain = 保留原狀，先不搬。

---

## 14.7 Migration Strategy 比較表

|策略|核心意思|關鍵字|記法|
|---|---|---|---|
|Rehost|幾乎不改直接搬|lift and shift、VM to IaaS|搬家不裝修|
|Replatform|小改後搬|minor changes、managed DB|小改再搬|
|Refactor|大改架構|microservices、cloud-native|重新設計|
|Repurchase|換 SaaS|replace with SaaS|重買|
|Retire|關閉不用系統|decommission|退休|
|Retain|暫時保留原環境|keep on-prem|保留|

---

# 15. Infrastructure as Code 與 Configuration Drift

## 15.1 Infrastructure as Code（IaC）

### 定義

Infrastructure as Code 是用程式碼或宣告式設定檔管理基礎設施，使雲端資源可被自動建立、修改、刪除與版本控制。

### 常見工具

- Terraform

- CloudFormation

- Azure ARM / Bicep

- Pulumi

- Ansible

### 常見關鍵字

- manage infrastructure through code

- automate resource creation

- API-based provisioning

- version-controlled infrastructure

- repeatable deployment

### 記法

> IaC = 用 code 管 infra。

---

## 15.2 IaC 優點

- 可重複部署

- 可版本控制

- 減少手動錯誤

- 支援審核流程

- 改善一致性

- 支援自動化合規檢查

---

## 15.3 Configuration Drift

### 定義

Configuration drift 是指實際雲端環境設定與 IaC 定義或標準設定不一致。

### 常見原因

- 有人直接在 cloud console 手動修改設定

- 緊急 hotfix 沒有回寫 IaC

- 多個團隊各自改設定

- 自動化 pipeline 沒有同步

- 手動例外設定未被追蹤

### 常見關鍵字

- actual environment differs from code

- manual console changes

- configuration mismatch

- drift detection

- IaC definition not matching deployed resources

### 記法

> IaC 是藍圖，實際環境偏離藍圖 = drift。

---

## 15.4 避免 Configuration Drift 的方法

- IaC pipeline

- Change review

- Version control

- Pull request approval

- Regular drift detection

- Disable or restrict manual console changes

- Policy as Code

- Automated compliance checks

---

# 16. SaaS 使用後 IT 角色變化

## 16.1 常見錯誤觀念

錯誤：使用 SaaS 後，內部 IT 完全不需要管理。  
正確：SaaS 減少 application maintenance，但 IT 仍需管理身分、存取、資料、整合、供應商與合規。

---

## 16.2 SaaS 中 IT 不直接管理的項目

通常不直接管理：

- Backend infrastructure

- Database engine

- OS patching

- Runtime patching

- Provider-side infrastructure IaC

- SaaS application core code

---

## 16.3 SaaS 中 IT 仍需管理的項目

仍需管理或監控：

- Identity and access management

- SSO integration

- MFA enforcement

- User lifecycle

- Role and permission review

- SaaS security settings

- Data classification

- Data sharing controls

- API integrations

- Vendor risk management

- Compliance evidence

- Audit logs

- Backup/export strategy

- Data retention settings

---

## 16.4 考試版句子

> SaaS shifts IT from infrastructure maintenance to governance, identity, data, vendor, and compliance management.

---

# 17. CSA CCM 與 ISO/IEC 27017

Domain 1 也可能考到雲端安全控制框架與標準。

---

## 17.1 CSA CCM

### 全名

Cloud Security Alliance Cloud Controls Matrix

### 定義

CSA CCM 是雲端安全控制矩陣，用來評估雲端安全姿態、對照安全控制與支援合規映射。

### 用途

- 評估 cloud security posture

- 對照安全控制

- 支援雲端風險評估

- 對應 ISO/IEC 27001、PCI DSS、NIST 等框架

### 記法

> CSA CCM = 雲端控制矩陣 / 雲端安全評估框架。

---

## 17.2 ISO/IEC 27017

### 定義

ISO/IEC 27017 是針對雲端服務的安全控制指引，補充 ISO/IEC 27002，提供 cloud-specific security guidance。

### 用途

- 雲端安全控制指引

- 協助雲端服務商與雲端客戶理解責任

- 提供 cloud-specific implementation guidance

### 記法

> ISO/IEC 27017 = 雲端安全控制指引。

---

## 17.3 CSA CCM vs ISO/IEC 27017

|項目|CSA CCM|ISO/IEC 27017|
|---|---|---|
|類型|控制矩陣 / 評估框架|雲端安全控制指引|
|用途|評估與映射雲端安全控制|提供 cloud-specific controls guidance|
|關鍵字|controls matrix、cloud security posture|cloud-specific security guidance|

---

# 18. Domain 1 高頻錯題主軸

本輪檢視中，錯題主軸集中於以下四類：

1. Hybrid cloud vs Community cloud

2. Private cloud vs Hybrid cloud

3. Shared responsibility 下的 insider threat monitoring

4. CIA triad 整體策略 vs 只強化 availability

---

## 18.1 錯題主軸一：Hybrid vs Community

### 題型

組織需要嚴格 data sovereignty、data residency 在本國境內，同時還要使用 public cloud 處理 non-sensitive workloads。

### 錯誤傾向

選 Community cloud。

### 正確概念

Hybrid cloud。

### 解析

題目關鍵是同時使用 private/on-prem 與 public cloud：

- 敏感資料留在本國或受控環境

- 非敏感工作負載使用 public cloud

這代表多種部署模型整合，因此是 Hybrid cloud。

Community cloud 必須看到多個組織共享共同雲環境與共同需求。

---

## 18.2 錯題主軸二：Private vs Hybrid

### 題型

題目強調最高資料控制、critical business applications、自主管理安全設定，且可接受較高前期 DR 成本。

### 錯誤傾向

選 Hybrid cloud。

### 正確概念

Private cloud。

### 解析

Hybrid cloud 強調平衡控制與彈性。但題目如果出現 highest / maximum control，通常優先指向 Private cloud。

---

## 18.3 錯題主軸三：Insider Threat + Shared Responsibility

### 題型

在 shared responsibility model 下，哪個 insider threat 管理最困難？

### 錯誤傾向

選實作一致 access controls。

### 正確概念

跨組織邊界協調 user activity monitoring。

### 解析

Access control 很重要，但可透過 IAM、RBAC、SSO、policy、access review 設計。Insider threat 最困難處在於活動監控與證據整合常跨越 customer、CSP、SaaS provider 等邊界。

---

## 18.4 錯題主軸四：CIA Triad 不只看 Availability

### 題型

在 multi-tenant cloud 中，哪個策略最能維持整體 CIA triad？

### 錯誤傾向

選跨多地理區域複寫資料。

### 正確概念

RBAC、least privilege、regular access reviews。

### 解析

多區域複寫主要強化 availability，但 CIA triad 包含：

- Confidentiality

- Integrity

- Availability

RBAC、least privilege 與 regular access reviews 更能同時支援 confidentiality 與 integrity，也能降低濫權或錯誤配置造成的風險。

---

# 19. 互動式題目完整解析

以下整理本輪互動中出現的練習題與解析。

---

## 題目 1：Hybrid Cloud 判斷

### 題目

一家公司有兩類工作負載：

- 敏感資料必須留在本國資料中心，符合法規與 data residency 要求

- 非敏感的網站服務希望放到 public cloud，取得彈性擴展能力

這最像哪一種 cloud deployment model？

A. Public cloud  
B. Private cloud  
C. Community cloud  
D. Hybrid cloud

### 答案

D. Hybrid cloud

### 解析

敏感資料留在本國資料中心，非敏感服務放 public cloud，代表 private/on-prem 與 public cloud 混合使用。這是 Hybrid cloud。

### 錯誤選項解析

- Public cloud：沒有處理敏感資料保留在本國資料中心的需求。

- Private cloud：沒有處理非敏感服務使用 public cloud 的需求。

- Community cloud：題目沒有多個組織共享共同雲環境。

---

## 題目 2：Community Cloud 判斷

### 題目

多家醫院共同使用同一個雲端環境，因為都需要符合相同醫療法規與安全要求。

這比較像哪一種？

A. Public cloud  
B. Private cloud  
C. Community cloud  
D. Hybrid cloud

### 答案

C. Community cloud

### 解析

多個組織、共同任務、共同法規需求與共享雲環境，符合 Community cloud。

---

## 題目 3：Private Cloud 判斷

### 題目

一家公司有 critical business applications，最重視：

- 最高資料控制

- 自主管理安全設定

- 可能需要較快 RTO

- 願意投入較高前期 DR 成本

這最像哪一種 cloud deployment model？

A. Public cloud  
B. Private cloud  
C. Community cloud  
D. Hybrid cloud

### 答案

B. Private cloud

### 解析

最高資料控制與自主管理安全設定是 Private cloud 的典型線索。

---

## 題目 4：Shared Responsibility 與 Insider Threat

### 題目

在 shared responsibility model 下，管理 insider threat 最困難的是哪一個？

A. 實作一致的 access controls  
B. 加密所有資料  
C. 跨組織邊界協調 user activity monitoring  
D. 選擇較便宜的雲端區域

### 答案

C. 跨組織邊界協調 user activity monitoring

### 解析

Insider threat 需要監控使用者行為。雲端環境中，這些活動可能跨越 customer、CSP、SaaS provider、管理平面與應用層，因此跨組織協調監控與整合證據最困難。

---

## 題目 5：CIA Triad 整體策略

### 題目

在 multi-tenant cloud 中，哪個策略最能維持整體 CIA triad？

A. Replicate data across multiple geographic regions  
B. Use RBAC, least privilege, and regular access reviews  
C. Use the cheapest storage tier  
D. Disable logging to reduce cost

### 答案

B. Use RBAC, least privilege, and regular access reviews

### 解析

跨地區複寫主要提升 availability。RBAC、least privilege、regular access reviews 更能同時支援 confidentiality、integrity 與整體安全治理。

### 名詞修正

Regular access reviews 是 authorization governance，不是 authentication。

- Authentication：確認身分

- Authorization：確認權限

---

## 題目 6：Vendor Lock-in Mitigation

### 題目

一家公司想降低 vendor lock-in，避免未來很難從某一個 CSP 搬走。哪個做法最好？

A. 大量使用 provider-specific APIs  
B. 使用 cloud-agnostic architecture 和 standard data formats  
C. 把所有資料放在同一個 CSP 的專有資料庫  
D. 關閉所有備份

### 答案

B. 使用 cloud-agnostic architecture 和 standard data formats

### 解析

標準資料格式與雲端中立架構可提升 data portability，降低對單一 CSP 的依賴。

---

## 題目 7：Vendor Lock-in 辨識

### 題目

一家公司大量使用某 CSP 的專有資料庫、專有 API、專有監控工具。後來想換到另一家 CSP，但發現改寫成本很高。

這最像哪個風險？

A. Vendor lock-in  
B. Rapid elasticity  
C. Resource pooling  
D. Measured service

### 答案

A. Vendor lock-in

### 解析

專有 API、專有資料庫與高改寫成本是 vendor lock-in 的典型線索。

---

## 題目 8：Serverless Visibility

### 題目

一家公司採用 serverless 架構。安全團隊發現較難量化某些安全控制的效果，因為底層基礎設施由 CSP 管理，客戶看不到很多細節。

這最像 serverless 的哪個特性或挑戰？

A. 更高的底層 infrastructure visibility  
B. 較少管理基礎設施，但也較少底層可見性  
C. 完全不用做 security monitoring  
D. 完全沒有 vendor lock-in 風險

### 答案

B. 較少管理基礎設施，但也較少底層可見性

### 解析

Serverless 減少 infrastructure management，但客戶也無法像 IaaS 那樣直接觀察與控制底層基礎設施。

---

## 題目 9：Rapid Elasticity 適合架構

### 題目

一家公司想利用雲端的 rapid elasticity。哪種應用架構最適合？

A. Stateless and loosely coupled application  
B. Monolithic application with hardcoded server dependencies  
C. Application requiring fixed physical hardware  
D. Application that cannot scale horizontally

### 答案

A. Stateless and loosely coupled application

### 解析

Stateless 可快速水平擴展，loosely coupled 可降低元件耦合，使局部擴展更容易。

---

## 題目 10：Capacity Planning

### 題目

一家公司說：「用了雲端之後，就完全不需要 capacity planning，因為雲端會自動擴展。」這句話哪裡有問題？

A. 雲端完全不能自動擴展  
B. 雲端仍需要 capacity planning，只是方式變成監控、上限、成本與自動化規則  
C. capacity planning 只存在於 private cloud  
D. rapid elasticity 只適用於資料備份

### 答案

B. 雲端仍需要 capacity planning，只是方式變成監控、上限、成本與自動化規則

### 解析

雲端可快速擴展，但仍需要規劃擴展規則、資源上限、成本與監控。

---

## 題目 11：Container Security

### 題目

一家公司使用 containers，認為「只要用了 container，應用就自動安全」。這句話哪裡有問題？

A. Container 完全不能提升 portability  
B. Container 可以提升 portability，但安全仍取決於 image、runtime、secrets、orchestration 設定  
C. Container 只能用在 private cloud  
D. Container 會自動修補所有漏洞

### 答案

B. Container 可以提升 portability，但安全仍取決於 image、runtime、secrets、orchestration 設定

### 解析

Container 可提升 portability，但映像檔漏洞、runtime 權限、secrets 管理與 orchestration 設定仍需要安全管理。

---

## 題目 12：SaaS 責任

### 題目

一家公司使用 SaaS。IT 團隊覺得：「既然是 SaaS，內部 IT 就完全不用管了。」這句話哪裡有問題？

A. SaaS 代表客戶要管理底層硬體  
B. SaaS 減少應用維護負擔，但 IT 仍需管理身分、存取、資料整合、供應商與合規  
C. SaaS 一定比 IaaS 更不安全  
D. SaaS 不能用於企業環境

### 答案

B. SaaS 減少應用維護負擔，但 IT 仍需管理身分、存取、資料整合、供應商與合規

### 解析

SaaS 減少 application maintenance，但 IT 仍需要負責 governance、identity、data、vendor risk 與 compliance。

---

## 題目 13：Measured Service

### 題目

一家公司使用雲端服務時，想依照實際用量付費，並能看到資源使用量報告。

這最像 NIST cloud essential characteristic 的哪一個？

A. Resource pooling  
B. Measured service  
C. Broad network access  
D. Rapid elasticity

### 答案

B. Measured service

### 解析

依用量付費與使用量報告是 measured service。

---

## 題目 14：Resource Pooling

### 題目

一個雲端服務讓多個客戶共享同一組底層資源，但每個客戶的資料與環境都被邏輯隔離。

這最像 NIST cloud essential characteristic 的哪一個？

A. Broad network access  
B. Resource pooling  
C. Rapid elasticity  
D. Measured service

### 答案

B. Resource pooling

### 解析

多個客戶共享資源池並邏輯隔離，這是 resource pooling 與 multi-tenancy 的基礎概念。

---

## 題目 15：Broad Network Access

### 題目

使用者可以透過網路，從手機、筆電、平板等不同裝置存取雲端服務。

這最像 NIST cloud essential characteristic 的哪一個？

A. Broad network access  
B. Measured service  
C. Resource pooling  
D. Rapid elasticity

### 答案

A. Broad network access

### 解析

透過網路與多種裝置存取，是 broad network access。

---

## 題目 16：On-demand Self-service

### 題目

使用者不需要人工聯絡 CSP，就可以自己開 VM、建立 storage bucket、調整資源。

這最像 NIST cloud essential characteristic 的哪一個？

A. On-demand self-service  
B. Broad network access  
C. Resource pooling  
D. Measured service

### 答案

A. On-demand self-service

### 解析

不需人工聯絡 CSP，自助佈建資源，是 on-demand self-service。

---

## 題目 17：Cloud Sprawl

### 題目

公司發現很多閒置 VM、未標籤 storage、重複建立的測試環境，導致雲端成本暴增。

這比較像：

A. Cloud sprawl  
B. Data sovereignty  
C. Legal hold  
D. Chain of custody

### 答案

A. Cloud sprawl

### 解析

閒置資源、未標籤、重複環境與成本暴增，是 cloud sprawl。

---

## 題目 18：改善 Cloud Sprawl

### 題目

公司想改善 cloud sprawl。哪個做法最好？

A. 允許所有人自由建立任何資源  
B. 建立 cloud governance、tagging policy、budget alerts、approval workflow  
C. 關閉所有 logging  
D. 只使用最貴的雲端區域

### 答案

B. 建立 cloud governance、tagging policy、budget alerts、approval workflow

### 解析

Cloud sprawl 需要透過治理、標籤、預算警示與審核流程改善。

---

## 題目 19：Shadow IT

### 題目

公司有很多部門自行註冊 SaaS 工具，沒有通知 IT，也沒有經過安全審查。

這比較像哪個問題？

A. Shadow IT  
B. Rapid elasticity  
C. Resource pooling  
D. Measured service

### 答案

A. Shadow IT

### 解析

未經 IT 核准使用 SaaS 或雲端工具，是 Shadow IT。

---

## 題目 20：降低 Shadow IT

### 題目

公司想降低 Shadow IT 風險，最佳做法是什麼？

A. 完全禁止所有 SaaS  
B. 建立正式 SaaS 採購/審查流程，提供核准工具清單，並監控使用情況  
C. 關閉所有網路  
D. 只要求員工口頭承諾不用 SaaS

### 答案

B. 建立正式 SaaS 採購/審查流程，提供核准工具清單，並監控使用情況

### 解析

降低 Shadow IT 的重點是 governance、approval、security review、visibility 與 monitoring。

---

## 題目 21：Rehost

### 題目

公司想把應用搬到雲端，但希望盡量少改程式，只是把現有 VM 搬到 IaaS。

這比較像哪種 cloud migration strategy？

A. Rehost  
B. Refactor  
C. Retire  
D. Repurchase

### 答案

A. Rehost

### 解析

現有 VM 搬到 IaaS、盡量少改程式，就是 Rehost，也稱 lift and shift。

---

## 題目 22：Repurchase

### 題目

公司原本用自建 CRM 系統，現在決定改用 SaaS CRM，例如 Salesforce。

這比較像哪種 cloud migration strategy？

A. Rehost  
B. Refactor  
C. Repurchase  
D. Retain

### 答案

C. Repurchase

### 解析

自建系統改買 SaaS 產品，是 Repurchase。

---

## 題目 23：Refactor

### 題目

公司把舊系統搬到雲端後，決定重新設計成 microservices、使用 managed database、改成 cloud-native 架構。

這比較像哪種 migration strategy？

A. Rehost  
B. Refactor  
C. Retire  
D. Retain

### 答案

B. Refactor

### 解析

重新設計成 microservices 與 cloud-native 架構，是 Refactor。

---

## 題目 24：Retire

### 題目

公司評估後發現某個舊系統已經沒有人使用，所以決定關閉它，不搬到雲端。

這比較像哪種 migration strategy？

A. Rehost  
B. Refactor  
C. Retire  
D. Repurchase

### 答案

C. Retire

### 解析

沒人使用、關閉、不搬到雲端，是 Retire。

---

## 題目 25：Retain

### 題目

公司有一個舊系統，因為法規、相依性或成本原因，暫時不搬到雲端，先留在原本環境中繼續運作。

這比較像哪種 migration strategy？

A. Rehost  
B. Refactor  
C. Retain  
D. Repurchase

### 答案

C. Retain

### 解析

暫時不搬、保留在原環境，是 Retain。

---

## 題目 26：Replatform

### 題目

公司想把應用搬到雲端，但不想完全重寫。它只做少量調整，例如換成 managed database，或改一些設定來更適合雲端。

這比較像哪種 migration strategy？

A. Rehost  
B. Replatform  
C. Refactor  
D. Retire

### 答案

B. Replatform

### 解析

少量調整、不完全重寫、讓應用更適合雲端，是 Replatform。

---

## 題目 27：SaaS Service Model

### 題目

公司希望 CSP 管理最多內容，包括應用程式、平台、作業系統與基礎設施。公司只想管理使用者、資料與設定。

這比較像哪一種 service model？

A. IaaS  
B. PaaS  
C. SaaS  
D. Private cloud

### 答案

C. SaaS

### 解析

CSP 管到 application，客戶主要管理 users、data 與 settings，是 SaaS。

---

## 題目 28：PaaS Service Model

### 題目

公司希望 CSP 管理基礎設施、作業系統和 runtime。公司自己負責開發與部署 application code。

這比較像哪一種 service model？

A. IaaS  
B. PaaS  
C. SaaS  
D. Community cloud

### 答案

B. PaaS

### 解析

CSP 管 infra、OS、runtime/platform，客戶負責 code 與 data，是 PaaS。

### 名詞修正

Runtime 不是 infrastructure。Infrastructure 通常是 compute、storage、network；runtime 是應用執行環境，例如 Java runtime、Node.js runtime、.NET runtime。

---

## 題目 29：IaaS Service Model

### 題目

公司希望 CSP 只管理底層基礎設施。公司自己管理作業系統、runtime、middleware、application 和 data。

這比較像哪一種 service model？

A. IaaS  
B. PaaS  
C. SaaS  
D. Community cloud

### 答案

A. IaaS

### 解析

客戶自己管理 OS，通常就是 IaaS。

---

## 題目 30：PaaS 開發情境

### 題目

公司要選 cloud model。需求是：

- 快速開發 application

- 不想管理 OS patching

- 想讓 CSP 管 runtime 和 middleware

- 開發團隊只想專注 code

這比較像哪一種？

A. IaaS  
B. PaaS  
C. SaaS  
D. Private cloud

### 答案

B. PaaS

### 解析

開發團隊只專注 code，不管理 OS/runtime/middleware，是 PaaS。

---

## 題目 31：IaaS 控制情境

### 題目

公司想用雲端服務，但希望：

- 自己控制 OS

- 自己安裝 security patches

- 自己設定 middleware

- 需要最高彈性來調整系統環境

這比較像哪一種？

A. IaaS  
B. PaaS  
C. SaaS  
D. Measured service

### 答案

A. IaaS

### 解析

自己控制 OS、自己安裝 security patches、自己設定 middleware，都是 IaaS 線索。

---

## 題目 32：SaaS 現成應用

### 題目

公司想使用現成的電子郵件服務，例如 Microsoft 365 或 Google Workspace。公司不想開發 application，也不想管理 OS、runtime、middleware。

這比較像哪一種？

A. IaaS  
B. PaaS  
C. SaaS  
D. Rehost

### 答案

C. SaaS

### 解析

現成電子郵件服務、不開發 application、不管理 OS/runtime/middleware，是 SaaS。

---

## 題目 33：Infrastructure as Code

### 題目

公司使用雲端時，希望所有資源都能透過 API 自動建立、修改、刪除，並用程式碼管理基礎設施設定。

這比較像哪個概念？

A. Infrastructure as Code  
B. Data sovereignty  
C. Community cloud  
D. Chain of custody

### 答案

A. Infrastructure as Code

### 解析

透過 API 與程式碼管理基礎設施，是 IaC。

---

## 題目 34：Configuration Drift

### 題目

公司使用 IaC 後，安全團隊擔心有人直接在雲端 console 手動修改設定，導致實際環境和程式碼定義不一致。

這種問題比較像什麼？

A. Configuration drift  
B. Data sovereignty  
C. Vendor lock-in  
D. Resource pooling

### 答案

A. Configuration drift

### 解析

實際環境與 IaC 定義不一致，是 configuration drift。

---

## 題目 35：避免 Configuration Drift

### 題目

公司想避免 configuration drift，最佳做法是哪個？

A. 允許所有人直接在 console 修改  
B. 使用 IaC pipeline、變更審核、定期 drift detection  
C. 關閉版本控制  
D. 刪除所有設定文件

### 答案

B. 使用 IaC pipeline、變更審核、定期 drift detection

### 解析

避免 drift 需要標準化變更流程、版本控制、審核與定期偵測。

---

## 題目 36：Cloud Governance

### 題目

公司想用雲端快速建立資源，但也要確保所有資源都有：

- owner 標籤

- cost center 標籤

- environment 標籤，例如 dev / test / prod

- 自動套用安全政策

這最像哪個概念？

A. Cloud governance  
B. Data sovereignty  
C. Chain of custody  
D. Vendor lock-in

### 答案

A. Cloud governance

### 解析

標籤管理、成本中心、owner、環境識別與政策套用都屬於 cloud governance。

---

## 題目 37：Tagging Policy

### 題目

公司發現開發團隊建立了很多雲端資源，但沒有 owner、沒有 cost center，也不知道哪些是測試、哪些是正式環境。

最先應該改善哪一項？

A. Tagging policy  
B. Data sovereignty  
C. Chain of custody  
D. Serverless visibility

### 答案

A. Tagging policy

### 解析

沒有 owner、cost center、environment，代表標籤治理不足，最先應改善 tagging policy。

---

## 題目 38：Cloud Provider

### 題目

在雲端角色中，哪一個角色通常是「提供雲端服務」的一方？

A. Cloud consumer  
B. Cloud provider  
C. Cloud auditor  
D. Cloud carrier

### 答案

B. Cloud provider

### 解析

提供雲端服務的一方是 Cloud provider。

---

## 題目 39：IaaS Shared Responsibility

### 題目

在 shared responsibility model 中，公司使用 IaaS。CSP 通常負責哪一項？

A. 客戶資料分類  
B. 客戶應用程式安全設計  
C. 底層實體資料中心與硬體基礎設施  
D. 客戶使用者權限審核

### 答案

C. 底層實體資料中心與硬體基礎設施

### 解析

IaaS 中，CSP 通常負責 physical data center、hardware、network hardware、storage hardware 與部分 virtualization layer。

---

# 20. 易混淆比較總表

## 20.1 Public vs Private vs Community vs Hybrid

|模型|核心判斷|常見陷阱|
|---|---|---|
|Public|多客戶共享 CSP public environment|不等於不安全|
|Private|單一組織專用、最高控制|題目強調 maximum control 時常是答案|
|Community|多個相似組織共享共同需求|不是只要合規就選|
|Hybrid|private/on-prem + public 整合|敏感與非敏感工作負載分開時常是答案|

---

## 20.2 IaaS vs PaaS vs SaaS

|模型|CSP 管理|客戶管理|關鍵字|
|---|---|---|---|
|IaaS|Infrastructure|OS、runtime、middleware、app、data|customer manages OS|
|PaaS|Infra、OS、runtime、middleware|code、data|developers focus on code|
|SaaS|Application 到 infrastructure|users、data、settings|CSP manages application|

---

## 20.3 Cloud Sprawl vs Shadow IT

|項目|Cloud Sprawl|Shadow IT|
|---|---|---|
|問題|資源亂長失控|未經核准使用服務|
|關鍵字|idle VM、untagged、cost explosion|department uses SaaS without IT approval|
|解法|tagging、budget、cleanup、governance|SaaS approval、security review、monitoring|

---

## 20.4 Rehost vs Replatform vs Refactor

|策略|改動程度|關鍵字|
|---|--:|---|
|Rehost|最少|lift and shift、VM to IaaS|
|Replatform|小改|managed DB、minor changes|
|Refactor|大改|microservices、cloud-native、redesign|

---

## 20.5 Retire vs Retain

|策略|意義|關鍵字|
|---|---|---|
|Retire|關閉不用系統|no longer used、decommission|
|Retain|暫時留在原環境|not migrate yet、regulatory dependency|

---

## 20.6 On-demand vs Rapid Elasticity vs Measured Service

|特性|核心問題|關鍵字|
|---|---|---|
|On-demand self-service|能否自助開資源？|self-provision、no human interaction|
|Rapid elasticity|能否快速擴縮？|scale out、auto scaling、elastic|
|Measured service|是否計量使用量？|metering、usage report、pay-as-you-go|

---

## 20.7 Resource Pooling vs Broad Network Access

|特性|核心問題|關鍵字|
|---|---|---|
|Resource pooling|是否共享底層資源池？|multi-tenant、pooled resources|
|Broad network access|是否能透過網路多裝置存取？|mobile、laptop、network access|

---

## 20.8 Authentication vs Authorization

|名詞|中文|核心問題|例子|
|---|---|---|---|
|Authentication|驗證身分|是誰？|MFA、password、certificate|
|Authorization|授權|能做什麼？|RBAC、least privilege、access review|

Regular access reviews 屬於 authorization governance，不是 authentication。

---

# 21. 考前速記表

|關鍵字|答案|
|---|---|
|highest / maximum control|Private cloud|
|sensitive on private + non-sensitive on public|Hybrid cloud|
|multiple organizations + shared mission/compliance|Community cloud|
|scalable、low upfront、public access|Public cloud|
|CSP manages application|SaaS|
|developers write code, CSP manages runtime|PaaS|
|customer manages OS|IaaS|
|自助開 VM / storage|On-demand self-service|
|多種裝置透過網路存取|Broad network access|
|多租戶共享底層資源|Resource pooling|
|快速擴縮|Rapid elasticity|
|用量計量、pay-as-you-go|Measured service|
|proprietary API / hard to migrate|Vendor lock-in|
|standard data formats / cloud-agnostic|降低 vendor lock-in|
|idle VM、untagged、cost explosion|Cloud sprawl|
|部門私自使用 SaaS|Shadow IT|
|用 code 管 infra|Infrastructure as Code|
|實際設定偏離 IaC|Configuration drift|
|VM 直接搬到 IaaS|Rehost|
|小改後搬到雲端|Replatform|
|重設計 cloud-native|Refactor|
|自建系統改買 SaaS|Repurchase|
|關閉不用系統|Retire|
|暫時保留不搬|Retain|
|container portability|Containerization|
|container 不自動安全|image/runtime/secrets/orchestration|
|serverless 挑戰|reduced infrastructure visibility|
|rapid elasticity 最佳架構|stateless + loosely coupled|
|Cloud consumer|使用雲服務|
|Cloud provider|提供雲服務|
|Cloud auditor|稽核雲服務|
|Cloud carrier|提供網路連線|
|Cloud broker|整合/仲介雲服務|

---

# 22. 考試答題策略

## 22.1 先找關鍵字

CCSP Domain 1 題目通常會藏關鍵字。答題時先看：

- 題目是否強調最高控制？

- 是否同時提到 private 與 public？

- 是否提到多個組織共同需求？

- 是否提到 CSP 管 application？

- 是否提到 customer manages OS？

- 是否提到 proprietary API 或難以遷移？

- 是否提到資源未標籤、成本暴增？

- 是否提到未經 IT 核准使用 SaaS？

---

## 22.2 不要只看一個詞

例如題目出現「CSP 管理 infrastructure」不一定就是 IaaS。必須看 CSP 管到哪一層。

- 只管 infrastructure：IaaS

- 管 infrastructure + OS + runtime：PaaS

- 管 application + platform + OS + infrastructure：SaaS

---

## 22.3 注意最高級形容詞

CCSP 很常用最高級字眼引導答案：

- highest control

- maximum control

- most visibility

- best way

- most appropriate

當題目問最高資料控制，通常偏向 Private cloud。

---

## 22.4 注意題目是否問整體 CIA triad

若題目問 CIA triad 整體，不要只選強化 availability 的答案。

- 多區域複寫：主要是 availability

- RBAC + least privilege + access review：更能支援 confidentiality 與 integrity

---

## 22.5 注意治理題不是純技術題

Cloud governance 題目常出現成本、標籤、命名、安全基準、合規要求。此時答案通常是：

- policy

- governance

- tagging

- budget alerts

- approval workflow

- monitoring

而不是純技術選項。

---

# 23. 最終總結

Domain 1 的核心可用以下幾句話掌握：

1. **Private cloud = 最高控制。**

2. **Hybrid cloud = private/on-prem 與 public cloud 整合。**

3. **Community cloud = 多個相似組織共享共同需求。**

4. **SaaS = 用現成軟體；PaaS = 寫程式；IaaS = 管系統。**

5. **Customer manages OS = IaaS。**

6. **CSP manages application = SaaS。**

7. **Cloud sprawl = 雲端資源亂長失控。**

8. **Shadow IT = 未經 IT 核准使用工具或服務。**

9. **Vendor lock-in = 被專有 API、專有資料庫或平台能力綁住。**

10. **IaC = 用 code 管 infra；configuration drift = 實際環境偏離 code。**

11. **Container 提升 portability，但不自動安全。**

12. **Serverless 少管底層，也少了底層 visibility。**

13. **Rapid elasticity 需要 stateless、loosely coupled 架構，也仍需要 capacity planning。**

14. **Shared responsibility 中，insider threat 最難的是跨組織監控與證據整合。**

---

# 24. 建議複習順序

1. 先背第 21 節「考前速記表」。

2. 再讀第 20 節「易混淆比較總表」。

3. 回到第 18 節重新看錯題主軸。

4. 最後用第 19 節互動題重新自測。

5. 每次答題時強迫先圈關鍵字，再看選項。

---

# 25. 自測題：快速回顧

以下題目可用於考前 5 分鐘快速複習。

## 自測 1

題目出現「sensitive data remains on-prem，non-sensitive workloads run in public cloud」，答案通常是什麼？

答案：Hybrid cloud

---

## 自測 2

題目出現「highest level of data control」，答案通常是什麼？

答案：Private cloud

---

## 自測 3

題目出現「multiple hospitals share a cloud due to common healthcare compliance requirements」，答案通常是什麼？

答案：Community cloud

---

## 自測 4

題目出現「customer manages OS patching」，答案通常是什麼？

答案：IaaS

---

## 自測 5

題目出現「developers only focus on code and CSP manages runtime」，答案通常是什麼？

答案：PaaS

---

## 自測 6

題目出現「CSP manages the application」，答案通常是什麼？

答案：SaaS

---

## 自測 7

題目出現「proprietary APIs and high migration cost」，答案通常是什麼？

答案：Vendor lock-in

---

## 自測 8

題目出現「idle VMs、untagged storage、cost explosion」，答案通常是什麼？

答案：Cloud sprawl

---

## 自測 9

題目出現「departments use SaaS without IT approval」，答案通常是什麼？

答案：Shadow IT

---

## 自測 10

題目出現「actual cloud environment differs from IaC definition」，答案通常是什麼？

答案：Configuration drift

---

## 自測 11

題目出現「move existing VM to IaaS with minimal changes」，答案通常是什麼？

答案：Rehost

---

## 自測 12

題目出現「replace self-hosted CRM with Salesforce」，答案通常是什麼？

答案：Repurchase

---

## 自測 13

題目出現「minor changes, use managed database, no full rewrite」，答案通常是什麼？

答案：Replatform

---

## 自測 14

題目出現「redesign into microservices and cloud-native」，答案通常是什麼？

答案：Refactor

---

## 自測 15

題目出現「multi-tenant shared resources」，答案通常是什麼？

答案：Resource pooling

---

## 自測 16

題目出現「usage report and pay-as-you-go billing」，答案通常是什麼？

答案：Measured service

---

## 自測 17

題目出現「mobile、laptop、tablet access over network」，答案通常是什麼？

答案：Broad network access

---

## 自測 18

題目出現「self-provision VM without contacting CSP」，答案通常是什麼？

答案：On-demand self-service

---

## 自測 19

題目出現「fast scale out / scale in」，答案通常是什麼？

答案：Rapid elasticity

---

## 自測 20

題目出現「serverless makes security benefits hard to quantify due to provider-managed infrastructure」，答案通常是什麼？

答案：Reduced infrastructure visibility

---

# 26. 英文名詞拼字修正表

|錯誤或易混淆拼法|正確拼法|中文理解|
|---|---|---|
|cloud spraw|cloud sprawl|雲端資源無序擴張|
|sparrow|sparrow|麻雀，與 sprawl 不同|
|sprawl|sprawl|蔓延、無序擴張|
|promethous|Prometheus|監控工具|
|vulnerbility|vulnerability|漏洞，單數|
|vulnerabilities|vulnerabilities|漏洞，複數|
|acuthentication|authentication|身分驗證|
|authorization|authorization|授權|
|physical hd|physical hardware|實體硬體|

---

# 27. 最後考前提醒

Domain 1 最常輸在「題目看太快」。許多題目不是考名詞定義，而是考情境中最合適的架構選擇。

建議答題流程：

1. 先判斷題目類型：deployment model、service model、governance、migration、NIST 特性或責任分工。

2. 圈出關鍵字：highest control、public + private、customer manages OS、CSP manages application、proprietary API、untagged resources。

3. 排除純技術干擾項。

4. 確認答案是否符合整個情境，而不只是符合其中一個詞。

5. 對於 best / most appropriate 題目，優先選擇治理、責任分工、可攜性、標準化與風險導向的答案。

---

# 28. 一頁式終極濃縮

## Deployment Models

- Public：多客戶共享，彈性高，低前期成本。

- Private：單一組織專用，控制最高。

- Community：多個相似組織共享共同需求。

- Hybrid：private/on-prem + public 整合。

## Service Models

- IaaS：CSP 管 infra，客戶管 OS 以上。

- PaaS：CSP 管 runtime/platform，客戶寫 code。

- SaaS：CSP 管 application，客戶管 users/data/settings。

## NIST Characteristics

- On-demand：自助開資源。

- Broad network：網路多裝置存取。

- Resource pooling：多租戶資源池。

- Rapid elasticity：快速擴縮。

- Measured service：用量計量。

## Governance

- Cloud governance：政策、標籤、成本、安全、合規。

- Cloud sprawl：資源亂長、成本失控。

- Shadow IT：未經 IT 核准使用服務。

- Configuration drift：實際環境偏離 IaC。

## Migration

- Rehost：搬家不裝修。

- Replatform：小改再搬。

- Refactor：重寫成 cloud-native。

- Repurchase：換 SaaS。

- Retire：關閉不用。

- Retain：先不搬。

## Architecture

- Vendor lock-in：專有 API / DB 導致難搬。

- Container：提升 portability，不自動安全。

- Serverless：少管底層，也少 visibility。

- Rapid elasticity：適合 stateless + loosely coupled。

---

# 結語

本輪 Domain 1 複習的核心成果是建立情境判斷能力。考試時不只需背定義，更要能根據題目線索判斷：控制程度、責任分工、可攜性、治理需求、擴展特性與遷移策略。掌握本講義中的關鍵字表與易混淆比較，Domain 1 的大部分情境題即可快速排除干擾選項並選出最合理答案。