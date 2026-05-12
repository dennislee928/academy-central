# 冷門地區 PaaS / Cloud Provider 技術選型筆記

> **用途定位**：整理適合部署 Go / Gin、Next.js、Docker、Kubernetes、Redis、Kafka、監控工具與邊緣節點服務的非主流或區域型雲端平台。  
> **English Purpose**: A structured bilingual reference for evaluating lesser-known PaaS, IaaS, edge cloud, and regional cloud providers for Go, Next.js, Docker, Kubernetes, Redis, Kafka, monitoring agents, and distributed infrastructure experiments.

---

## 0. 閱讀說明 / Reading Notes

本筆記將原始資料重新整理為以下結構：

1. **快速選型總覽**：先用表格判斷哪個平台適合哪種部署情境。
2. **區域分組**：依照亞太、歐洲 / 東歐、俄羅斯 / CIS、中東、大洋洲等區域整理。
3. **服務商詳解**：每個平台包含中文摘要、英文摘要、技術能力、適合情境與注意事項。
4. **技術對照表**：統整 K8s、DB、Redis、Kafka、Serverless、Free Tier / Trial 等資訊。
5. **查證提醒**：免費額度、節點位置、政治 / 合規限制可能變動，需要部署前再次確認官方文件。

> **Verification Note**: Pricing, free-tier quotas, regional availability, sanctions, export-control restrictions, and payment requirements may change. Before production deployment, re-check each provider’s official documentation and terms of service.

---

## 1. Executive Summary / 快速結論

### 1.1 推薦選型

| 使用情境 | 優先考慮平台 | 原因 |
|---|---|---|
| Go / Gin + Next.js 快速部署 | Zeabur, Northflank, Liara, Patr | PaaS 友善、支援 Docker / Git-based deploy、上手成本低 |
| 複雜微服務 / Kafka / Redis | Northflank, Selectel, Servercore, Exoscale | 容器化、代管 DB、Kafka / Redis 支援較完整 |
| 免費或低成本長期測試 | Oracle Cloud Always Free, Zeabur, Scaleway, Catalyst Cloud | 免費額度或試用金較適合 PoC / Side Project |
| 東歐 / CIS / 俄羅斯節點研究 | Selectel, VK Cloud, Cloud.ru, Servercore, Amvera | 區域覆蓋與本地化基礎設施較強 |
| 中東節點 / 區域網路測試 | ArvanCloud, Liara, Oracle Cloud Middle East | 中東區域節點與 PaaS / CDN 能力較突出 |
| 澳洲 / 紐西蘭 / 大洋洲部署 | Catalyst Cloud, Binary Lane, OrionVM, Oracle Cloud Australia | 大洋洲本地低延遲與資料主權情境較適合 |
| Edge / CDN / 全球冷門節點 | Gcore, ArvanCloud, Scaleway, Exoscale | Edge Cloud、FaaS、CDN、全球節點覆蓋較佳 |

### 1.2 English Overview

| Scenario | Recommended Providers | Reason |
|---|---|---|
| Fast Go / Gin + Next.js deployment | Zeabur, Northflank, Liara, Patr | Developer-friendly PaaS, Docker support, Git-based deployment |
| Complex microservices with Kafka / Redis | Northflank, Selectel, Servercore, Exoscale | Strong container, managed database, and messaging support |
| Low-cost or free long-term testing | Oracle Cloud Always Free, Zeabur, Scaleway, Catalyst Cloud | Useful free-tier or trial credits for PoC workloads |
| Eastern Europe / CIS / Russia research | Selectel, VK Cloud, Cloud.ru, Servercore, Amvera | Regional infrastructure and localized cloud services |
| Middle East deployment or network testing | ArvanCloud, Liara, Oracle Cloud Middle East | Regional nodes, CDN, and PaaS-oriented offerings |
| Australia / New Zealand workloads | Catalyst Cloud, Binary Lane, OrionVM, Oracle Cloud Australia | Local latency, sovereignty, and Oceania coverage |
| Edge / CDN / unusual global regions | Gcore, ArvanCloud, Scaleway, Exoscale | Edge cloud, FaaS, CDN, and broad regional coverage |

---

## 2. Provider Landscape / 服務商總覽

| 類別 | 服務商 | 主要區域 | 服務定位 | 適合技術棧 |
|---|---|---|---|---|
| Developer PaaS | Zeabur | 台灣 / 新加坡 / 亞太 | 一鍵部署、開發者友善 PaaS | Go, Next.js, Docker, Redis |
| Developer PaaS | Northflank | 英國 / 歐盟 | 類 Choreo / Heroku 的進階 PaaS | Docker, Go, Kafka, Redis, DB |
| Serverless / Cloud | Scaleway | 法國 / 波蘭 | 歐洲雲、Serverless、Containers | Go, Containers, Serverless |
| Always Free IaaS | Oracle Cloud | 中東 / 澳洲 / 全球 | 高規格免費 ARM VPS | Full stack, Docker, K8s, Agent |
| Frontend PaaS | Stormkit | 德國 / 歐洲 | 現代 JS / Full-stack Framework 部署 | Next.js, React |
| Regional PaaS | Amvera | 俄羅斯 | 俄羅斯本地化 Heroku-like PaaS | Go, Python, Node.js, Docker |
| CDN + PaaS | ArvanCloud | 伊朗 / 中東 / 歐洲 | PaaS、CDN、Edge、DDoS 防護 | Containers, Edge, CDN |
| Edge Cloud | Gcore | 盧森堡 / 東歐 / CIS / 全球 | Edge Gateway、FaaS、CDN | Go, Edge Functions, Containers |
| Developer PaaS | Patr | 印度 / 新加坡 | 新興 PaaS、Managed Redis / DB | Next.js, React, Docker, Redis |
| IaaS / VPS | Binary Lane | 澳洲 | 澳洲 VPS / Docker-friendly IaaS | Docker, Go, Agent |
| Cloud Native | Servercore | 中亞 / CIS / 東歐 | K8s、DB、Kafka、Redis | K8s, Kafka, Redis, PostgreSQL |
| Enterprise Cloud | VK Cloud | 俄羅斯 | AWS-like 企業雲、K8s、DBaaS | K8s, API Gateway, Redis, DB |
| OpenStack Cloud | Catalyst Cloud | 紐西蘭 / 大洋洲 | 開源 OpenStack 主權雲 | K8s, OpenStack, DB |
| SEA Cloud | Biznet Gio | 印尼 / 東南亞 | 東南亞低延遲雲與 K8s | K8s, DBaaS, Load Balancer |
| Enterprise Cloud | Cloud.ru | 俄羅斯 | CCE / CSE / 微服務治理 | K8s, Service Mesh, Redis |
| Technical Cloud | Selectel | 俄羅斯 / CIS | 高度技術導向雲平台 | K8s, Redis, Kafka, ClickHouse |
| PaaS | Liara | 伊朗 / 中東 | 中東 Heroku-like PaaS | Go, Next.js, Docker, Redis |
| SEA Cloud | VNG Cloud | 越南 / 東南亞 | 越南雲、vKS、vDB | K8s, DB, Auto-scaling |
| High-performance IaaS | OrionVM | 澳洲 | 高 I/O、自研虛擬化、微分割網路 | Redis, DB, Go, private cloud |
| Sovereign Cloud | Exoscale | 瑞士 / 歐洲 | 非美系主權雲、K8s、Aiven DB | K8s, Kafka, Redis, PostgreSQL |

---

# 3. 亞太與東南亞 / APAC & Southeast Asia

## 3.1 Zeabur — 台灣 / 新加坡開發者友善 PaaS

### 中文摘要

**Zeabur** 是源自台灣的新創部署平台，定位接近 Heroku / Choreo，主打開發者友善的一鍵部署與自動化 CI/CD。對於 Go / Gin、Next.js、Docker、Redis 類型專案，Zeabur 的上手成本低，特別適合快速 PoC、MVP、Side Project 與個人 SaaS 原型。

### English Block

> **Zeabur is a developer-friendly PaaS from Taiwan, optimized for quick deployment workflows. It is suitable for Go, Next.js, Docker-based services, Redis-backed applications, and small-to-medium SaaS prototypes targeting Asia-Pacific users.**

### 技術特點

- 支援 **Go / Gin**、**Next.js**、Node.js 與 Docker 部署。
- 提供 Git-based deployment 與自動化 CI/CD。
- 免費額度採點數或配額模式，適合小型專案測試。
- 亞太節點如東京、新加坡，對台灣、東南亞延遲較低。

### 適合情境

- Go API + Next.js 前端的快速部署。
- Cursor / GitHub workflow 導向的個人開發。
- 不想維護 Kubernetes，但需要比傳統 VPS 更快的部署體驗。

### 注意事項

- 免費額度與計費模式需重新查證。
- 若涉及高流量、長期背景任務或大量資料庫 I/O，需評估配額成本。

---

## 3.2 Patr — 印度 / 新加坡新興 PaaS

### 中文摘要

**Patr** 是年輕的新創 PaaS，重點在於降低部署複雜度。平台支援 Docker Image、Managed Redis 與 Managed DB，適合部署 Next.js、React、Gin API 與輕量微服務。

### English Block

> **Patr is an emerging PaaS focused on simplifying cloud deployment. Its support for Docker, managed databases, and Redis makes it suitable for lightweight microservices and modern full-stack applications in India and Southeast Asia.**

### 技術特點

- 支援 Docker Image 直接拉取與部署。
- 提供 Managed Redis 與 Managed DB。
- Developer Plan 可能包含基礎運算點數。
- 簡化 Horizontal Auto-scaling 操作。

### 適合情境

- Next.js / React 前端與 API 後端部署。
- 需要新加坡 / 印度周邊節點的輕量服務。
- 小型 API、Side Project、低流量 SaaS。

### 注意事項

- 平台規模較小，需評估穩定性、SLA、社群成熟度。
- 免費方案與節點位置需再次查證官方文件。

---

## 3.3 Biznet Gio — 印尼 / 東南亞本地雲

### 中文摘要

**Biznet Gio** 是印尼本土雲端供應商，專注東南亞市場的低延遲與高併發場景。其 NEO Cloud / NEO Kubernetes / NEO DBaaS 對微服務部署、負載平衡與資料庫服務相對友善。

### English Block

> **Biznet Gio is an Indonesian cloud provider optimized for Southeast Asian latency and regional workloads. It is useful for testing distributed agents, telemetry ingestion, and services that require local Indonesian or SEA network characteristics.**

### 技術特點

- 提供 **NEO Cloud**、**NEO Kubernetes** 與 **NEO DBaaS**。
- 支援 Load Balancer 與微服務架構。
- 可能提供短期全功能試用。
- 印尼與東南亞路由表現較佳。

### 適合情境

- 模擬大量終端設備連線。
- 東南亞區域監控工具與資料回傳。
- 需要印尼本地網路或 IP 屬性的專案。

### 注意事項

- 免費試用通常有期限，不適合假設為長期免費。
- 生產環境需確認 SLA、備份與支援語言。

---

## 3.4 VNG Cloud — 越南數位化雲平台

### 中文摘要

**VNG Cloud** 依託越南大型網路生態，提供 vServer、vContainer / vKS、vDB 等基礎建設服務。若需要在越南或東南亞部署監控節點、API 服務或低延遲資料回傳系統，VNG Cloud 具備區域優勢。

### English Block

> **VNG Cloud is a Vietnam-based cloud platform backed by a strong local digital ecosystem. It is suitable for Southeast Asian services that require regional latency optimization, Kubernetes, managed databases, and local network presence.**

### 技術特點

- **vKS / vContainer**：Kubernetes 與容器化服務。
- **vDB**：代管型關聯式資料庫與 NoSQL 服務。
- 支援 Auto-scaling。
- 面向越南與東南亞市場優化。

### 適合情境

- watchdog / agent 類工具在東南亞多點部署。
- 需要越南本地或東南亞跨境流量分析。
- 需要 K8s + DB 的區域型 SaaS。

### 注意事項

- 免費額度、試用限制與計費需再次確認。
- 英文文件完整度與國際支援流程需評估。

---

# 4. 歐洲 / 東歐 / 主權雲 / Europe & Sovereign Cloud

## 4.1 Northflank — 英國 / 歐盟進階 PaaS

### 中文摘要

**Northflank** 是技術深度較高的 PaaS，功能接近 Choreo、Heroku 與小型 Google Cloud 的混合體。它支援微服務、資料庫、作業排程、Build Pipeline 與部署流程，適合比單純 Web App 更複雜的架構。

### English Block

> **Northflank is a technically mature PaaS for deploying containerized applications, databases, jobs, and microservices. It is a strong option when a project needs more operational depth than a frontend hosting platform but less overhead than managing Kubernetes directly.**

### 技術特點

- 支援 Docker、Go、Node.js、Next.js 等技術棧。
- 支援 Redis、Kafka、資料庫與排程任務。
- 提供 Free Tier / 免費專案機制。
- 控制台與平台能力較接近完整 PaaS。

### 適合情境

- Go / Gin API + Next.js 前端。
- Redis / Kafka / Job Worker 型架構。
- 需要比 Zeabur 更完整的微服務治理與部署抽象。

### 注意事項

- 若長期運行多服務，需計算資源、build minutes、DB 成本。
- Kafka / Redis 支援細節需以官方 pricing 與 docs 為準。

---

## 4.2 Scaleway — 法國 / 波蘭 Serverless 與歐洲雲

### 中文摘要

**Scaleway** 是歐洲老牌雲端服務商，產品涵蓋 VPS、Serverless Functions、Containers、Container Registry、Kubernetes 與資料庫。對於需要歐洲地區、尤其波蘭 / 法國節點的專案，Scaleway 適合從低成本 Serverless PoC 逐步升級到完整 IaaS / K8s 架構。

### English Block

> **Scaleway is a European cloud provider offering serverless functions, containers, container registry, Kubernetes, compute instances, and managed infrastructure. It is useful for projects that want to start with low-cost serverless workloads and later move toward full cloud-native infrastructure.**

### 技術特點

- Serverless Functions / Containers。
- Container Registry。
- Managed Kubernetes 與一般雲端運算資源。
- 法國與波蘭等歐洲節點。

### 適合情境

- 高併發 Serverless API。
- Go container / worker 部署。
- 歐洲主權或資料區域需求。

### 注意事項

- Always Free / 免費執行時間需重新查證。
- Serverless 冷啟動、執行時間、記憶體限制需針對應用測試。

---

## 4.3 Stormkit — 德國前端與 Full-stack 部署平台

### 中文摘要

**Stormkit** 專注於現代 JavaScript 框架部署，適合 Next.js、React 與 Jamstack / Full-stack frontend workflow。它不是完整微服務平台，但在前端 SSR / ISR 與現代 Web App 部署上較專注。

### English Block

> **Stormkit is a frontend-focused deployment platform for modern JavaScript frameworks such as Next.js and React. It is best suited for web frontends and lightweight full-stack apps rather than complex backend microservice architectures.**

### 技術特點

- 針對 Next.js / React 等現代框架最佳化。
- 適合前端、SSR、ISR 與靜態資產部署。
- 免費方案可能支援單一 App。

### 適合情境

- 前端展示頁、管理後台、產品 Landing Page。
- Next.js SSR / ISR 渲染。
- 與外部 Go API / Backend Service 分離部署。

### 注意事項

- 不適合重型微服務、Kafka、Redis cluster 或複雜 worker 架構。
- 免費方案與商業限制需重新確認。

---

## 4.4 Exoscale — 瑞士 / 歐洲主權雲

### 中文摘要

**Exoscale** 是以資料主權、隱私與非美系雲端定位為核心的歐洲雲平台。它提供 SKS Kubernetes、DBaaS、Aiven-powered Kafka / Redis / PostgreSQL，以及優雅的 CLI / API，適合資安與 IaC 導向團隊。

### English Block

> **Exoscale is a European sovereign cloud provider focused on privacy, simplicity, Kubernetes, and managed databases. It is a strong fit for teams that value non-US cloud infrastructure, infrastructure-as-code workflows, and managed Kafka / Redis / PostgreSQL services.**

### 技術特點

- **SKS — Scalable Kubernetes Service**。
- DBaaS：Redis、Kafka、PostgreSQL、InfluxDB 等。
- CLI / API 整合性佳。
- 中歐 / 歐洲節點佈局。

### 適合情境

- 資料主權要求較高的歐洲專案。
- Kafka / Redis / PostgreSQL 的代管服務。
- Terraform / GitHub Actions / CI/CD 自動化。

### 注意事項

- 成本通常不是最低，但穩定性與合規性較佳。
- 免費試用或 credit 需官方確認。

---

# 5. 俄羅斯 / CIS / 中亞 / Russia, CIS & Central Asia

## 5.1 Amvera — 俄羅斯本地化 PaaS

### 中文摘要

**Amvera** 是針對俄羅斯市場設計的 Cloud PaaS，使用體驗接近 Heroku / Choreo。其 Git-push-to-deploy、Dockerfile、Go / Python / Node.js 支援對小型服務部署相當友善。

### English Block

> **Amvera is a Russia-focused PaaS with a Heroku-like deployment model. It is suitable for small Go, Python, Node.js, and Docker applications that require Russian regional hosting or localized PaaS workflows.**

### 技術特點

- Git-push-to-deploy。
- 支援 Go、Python、Node.js 與 Dockerfile。
- 自動 SSL 與內部負載平衡。
- 可能提供註冊 Bonus / 試用金。

### 適合情境

- 小型監控工具、API、Bot、PoC。
- 東歐 / 俄羅斯網路環境研究。
- 需要 Heroku-like 體驗但區域位於俄羅斯。

### 注意事項

- 跨境付款、制裁、服務可用性與合規限制需特別查證。
- 不建議未評估風險即部署敏感生產資料。

---

## 5.2 Servercore — 中亞 / CIS 雲原生基礎設施

### 中文摘要

**Servercore** 是中亞與 CIS 地區快速擴張的基礎設施提供商，資料中心涵蓋哈薩克、烏茲別克等地。它提供 Managed Kubernetes、Kafka、Redis、PostgreSQL 等服務，適合分散式系統與非同步事件驅動架構測試。

### English Block

> **Servercore is a cloud infrastructure provider with strong Central Asia and CIS coverage. Its managed Kubernetes, Kafka, Redis, and PostgreSQL offerings make it suitable for testing distributed systems, event-driven services, and regional infrastructure scenarios.**

### 技術特點

- Managed Kubernetes。
- Managed Kafka、Redis、PostgreSQL。
- API 與 Terraform 支援。
- 可能提供新用戶測試贈金。

### 適合情境

- 高吞吐量事件驅動架構。
- Kafka / Redis / K8s 實驗環境。
- 中亞地區節點與區域性合規需求。

### 注意事項

- 測試贈金額度與可用服務需重新查證。
- 國際網路延遲、付款方式、文件語言需評估。

---

## 5.3 VK Cloud — 俄羅斯企業級公有雲

### 中文摘要

**VK Cloud** 是俄羅斯企業級公有雲，前身與 Mail.ru Cloud Solutions 有關。其架構接近 AWS-like 公有雲，提供 Managed Kubernetes、DBaaS、Cloud Functions、API Gateway、Redis、ClickHouse、PostgreSQL 等能力。

### English Block

> **VK Cloud is an enterprise-grade Russian public cloud with Kubernetes, managed databases, serverless functions, and API Gateway. It is useful for security research, regional testing, and cloud-native workloads that require Russian infrastructure.**

### 技術特點

- CNCF-oriented Managed Kubernetes / Cloud Containers。
- DBaaS：PostgreSQL、Redis、ClickHouse 等。
- Cloud Functions 與 API Gateway。
- 支援備份與高可用設定。

### 適合情境

- EDR / SIEM / 日誌分析測試。
- 東歐與俄羅斯網路環境研究。
- API Gateway + Serverless + DB 的企業雲架構。

### 注意事項

- 新用戶 credit、可用地區與付款條件需查證。
- 政治、制裁、資料處理與出口管制風險不可忽略。

---

## 5.4 Cloud.ru — 俄羅斯 Advanced Cloud 與微服務治理

### 中文摘要

**Cloud.ru**（原 SberCloud）偏向大型企業雲，Advanced 服務具備 CCE、CSE、微服務治理、服務註冊、組態管理、熔斷機制、分散式訊息佇列與 Redis 等能力。若目標是測試接近大型商業平台的微服務治理架構，Cloud.ru 值得列入觀察。

### English Block

> **Cloud.ru is an enterprise-oriented Russian cloud platform with advanced container and microservice governance capabilities. Its CCE and CSE-like services are relevant for service discovery, configuration management, resilience patterns, and distributed tracing scenarios.**

### 技術特點

- Cloud Container Engine / CCE。
- Cloud Service Engine / CSE 類型的微服務治理。
- 服務註冊、服務發現、組態管理、熔斷。
- 分散式訊息佇列與 Redis。

### 適合情境

- Service Mesh / 微服務治理 PoC。
- 分散式追蹤、熔斷、服務發現測試。
- 企業級平台能力比較。

### 注意事項

- Grant / 補助金機制需官方確認。
- 企業雲可能申請門檻較高。

---

## 5.5 Selectel — 俄羅斯 / CIS 技術導向雲平台

### 中文摘要

**Selectel** 是俄羅斯與 CIS 地區技術導向明確的雲平台，支援高度自定義 Managed Kubernetes、代管 Redis、Kafka、PostgreSQL、ClickHouse 以及 L4 / L7 Load Balancer。對於習慣 Terraform、K8s API 與 IaC 的工程團隊很有吸引力。

### English Block

> **Selectel is a technically mature cloud provider in Russia and the CIS region. It is well suited for infrastructure engineers who need Kubernetes, Redis, Kafka, PostgreSQL, ClickHouse, load balancers, and infrastructure-as-code friendly workflows.**

### 技術特點

- Managed Kubernetes，支援自定義節點配置。
- Cloud Databases：Redis、Kafka、PostgreSQL、ClickHouse。
- L4 / L7 Load Balancers。
- 文件與控制台偏工程導向。

### 適合情境

- 日誌分析、監控資料、ClickHouse pipeline。
- Gin microservices + L7 Load Balancer。
- Terraform / IaC 導向部署。

### 注意事項

- 若涉及跨境資料與資安研究，需考慮法規與組織風險。
- 免費額度不應假設存在，需確認官方促銷或 trial。

---

# 6. 中東 / Middle East

## 6.1 ArvanCloud — 中東 CDN / PaaS / Edge 平台

### 中文摘要

**ArvanCloud** 是中東地區具代表性的雲端服務商之一，涵蓋 PaaS、CDN、Edge、DDoS 防護與容器化部署。對於中東節點、CDN、網路過濾環境與 DDoS 防禦研究，它具有特殊價值。

### English Block

> **ArvanCloud is a Middle East-focused cloud provider offering PaaS, CDN, edge services, and DDoS protection. It is relevant for regional deployment, network filtering research, and defensive infrastructure testing in Middle Eastern network environments.**

### 技術特點

- PaaS / Containers，可能基於 Kubernetes 抽象化。
- CDN 流量與 Edge Services。
- 類似 Workers 的邊緣運算能力。
- DDoS 防護與網路安全能力。

### 適合情境

- 中東節點服務部署。
- CDN / Edge / WAF / DDoS 防禦測試。
- 容器化 API 與輕量服務。

### 注意事項

- 免費額度、國際可用性、付款與法規限制需重新查證。
- 敏感研究應明確遵守當地法律與平台 AUP。

---

## 6.2 Liara — 伊朗 / 中東 Heroku-like PaaS

### 中文摘要

**Liara** 是中東技術圈中較冷門但具開發者導向的 PaaS。它支援 Go、Next.js、Docker、Managed MongoDB、PostgreSQL、Redis，並提供基礎 DNS / Storage 整合。對於希望快速部署多技術棧應用的專案，Liara 的抽象層較乾淨。

### English Block

> **Liara is a Middle East-based Heroku-like PaaS supporting Go, Next.js, Docker, and managed databases such as MongoDB, PostgreSQL, and Redis. It is useful for fast deployment of mixed-stack applications in a clean PaaS environment.**

### 技術特點

- One-click deploy / PaaS workflow。
- 支援 Go、Next.js、Docker。
- Managed MongoDB、PostgreSQL、Redis。
- DNS / Storage 整合。

### 適合情境

- Go + Next.js 的全端應用。
- Life 3.0 / Side Project / MVP。
- 需要中東區域部署的輕量 API。

### 注意事項

- Free tier、節點位置與資料儲存區域需查證。
- 國際付款與制裁相關限制需特別注意。

---

## 6.3 Oracle Cloud Middle East — Jeddah / Dubai 等節點

### 中文摘要

**Oracle Cloud Always Free** 雖然不是冷門品牌，但其中東與澳洲節點在免費雲市場中相對特殊。ARM Ampere A1 免費額度可提供高規格 CPU / RAM，足以部署多個小型服務、watchdog agent 後端、Grafana / Prometheus / Loki lab 或 Docker-based stack。

### English Block

> **Oracle Cloud Always Free is not a niche provider, but its Middle East and Australia regions can be valuable for free or low-cost infrastructure experiments. The ARM Ampere A1 quota is one of the strongest free VPS-style offerings for Docker, monitoring, and backend workloads.**

### 技術特點

- ARM Ampere A1 Always Free 額度。
- 可部署 Docker、Go API、監控 stack、Agent backend。
- 支援企業級 VCN、Security Lists、IAM。
- 中東與澳洲節點具區域測試價值。

### 適合情境

- 免費 VPS-like 長期測試。
- Docker Compose / K3s / monitoring lab。
- 資安實驗、EDR / SIEM log pipeline lab。

### 注意事項

- Always Free 資源申請常受區域容量影響。
- 通常需要信用卡驗證。
- 免費規則與資源回收條件需定期確認。

---

# 7. 澳洲 / 紐西蘭 / 大洋洲 / Oceania

## 7.1 Catalyst Cloud — 紐西蘭 OpenStack 主權雲

### 中文摘要

**Catalyst Cloud** 是紐西蘭本土開源雲端服務商，底層基於 OpenStack，強調資料主權、開放標準與無 vendor lock-in。它支援 Kubernetes Engine、Managed Database Service 與 Docker Registry，適合需要 OpenStack / IaC / 主權雲測試的專案。

### English Block

> **Catalyst Cloud is a New Zealand-based OpenStack cloud focused on sovereignty, open standards, and reduced vendor lock-in. It is suitable for Kubernetes, managed databases, container registry usage, and infrastructure-as-code testing in Oceania.**

### 技術特點

- Kubernetes Engine，基於 OpenStack Magnum 類型能力。
- Managed Database Service。
- Docker Container Registry。
- 可能提供較高額度 trial credit。

### 適合情境

- OpenStack API / Terraform 測試。
- 紐西蘭 / 澳洲區域部署。
- 主權雲與資料區域合規需求。

### 注意事項

- 免費 credit 效期與額度需確認。
- OpenStack 操作模型比純 PaaS 更接近 IaaS，需要較多基礎設施知識。

---

## 7.2 Binary Lane — 澳洲 VPS / IaaS 延伸

### 中文摘要

**Binary Lane** 偏向澳洲本地 VPS / IaaS，但可透過預裝 Docker stack 與自動化部署達到接近 PaaS 的操作體驗。若專案需要澳洲本地 IP、低延遲或 CPU 單核性能，它比全球大廠的澳洲節點更具本地化特色。

### English Block

> **Binary Lane is an Australian VPS / IaaS provider with Docker-friendly deployment options. It is a practical choice when local Australian IP presence, predictable VPS performance, or region-specific latency matters more than managed PaaS abstraction.**

### 技術特點

- 澳洲本地 VPS / Cloud Server。
- Docker-friendly image / stack。
- 雪梨、墨爾本、布里斯本、伯斯等區域。
- 可能提供新用戶 credit。

### 適合情境

- watchdog.exe 後端或 agent controller。
- 澳洲本地低延遲 API。
- 單 VM + Docker Compose 型部署。

### 注意事項

- 通常不是永久免費。
- Managed DB / K8s 抽象不如 PaaS 平台完整。

---

## 7.3 OrionVM — 澳洲高效能 IaaS / 私有雲底座

### 中文摘要

**OrionVM** 是澳洲特殊的高效能 IaaS 供應商，重點在自研虛擬化堆疊、高 I/O 儲存與微分割網路。它更像是企業私有雲或高效能基礎設施方案，而不是一般開發者 PaaS。

### English Block

> **OrionVM is an Australian high-performance IaaS provider with its own virtualization stack, strong I/O characteristics, and micro-segmented networking. It is better suited for infrastructure-heavy workloads than simple PaaS deployments.**

### 技術特點

- 自研虛擬化 stack。
- High-performance distributed storage。
- Micro-segmented networking。
- 適合高 I/O 資料庫或低延遲後端。

### 適合情境

- Redis / DB 高 I/O workload。
- 微服務網路隔離測試。
- Go 高併發後端或私有雲架構研究。

### 注意事項

- 不一定有免費方案。
- 需要更完整的雲端網路與基礎設施管理能力。

---

# 8. Edge / CDN / 全球冷門節點 / Edge & Unusual Regions

## 8.1 Gcore — 東歐 / CIS / 全球 Edge Cloud

### 中文摘要

**Gcore** 總部位於盧森堡，但在 CIS、東歐與全球邊緣節點上具有優勢。它提供 Edge Gateway、FaaS、CDN 與託管容器，適合低延遲分發、BGP 路徑分析與邊緣運算測試。

### English Block

> **Gcore is an edge-focused cloud and CDN provider with strong coverage in Eastern Europe, CIS regions, and global edge locations. It is useful for latency-sensitive services, edge functions, container deployment, and network path analysis.**

### 技術特點

- Edge Gateway。
- Function-as-a-Service。
- CDN 與全球冷門節點。
- 託管容器與 Edge Cloud。

### 適合情境

- Go API edge distribution。
- BGP / latency / regional routing research。
- CDN / Edge security testing。

### 注意事項

- 免費方案內容需確認。
- Edge 與 Cloud Compute 通常是不同計費模型，需分開估算。

---

# 9. 技術能力總表 / Technical Capability Matrix

| 服務商 | PaaS | IaaS / VPS | K8s | Serverless / FaaS | Redis | Kafka | PostgreSQL / DB | Edge / CDN | Free Tier / Trial 備註 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Zeabur | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | 點數 / 免費額度，需查證 |
| Northflank | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 免費專案 / Free Tier，需查證 |
| Scaleway | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | Serverless / Free Tier，需查證 |
| Oracle Cloud | ⚠️ | ✅ | ✅ | ✅ | 自管 | 自管 | ✅ | ⚠️ | Always Free，需信用卡與容量確認 |
| Stormkit | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ | ⚠️ | ⚠️ | 前端平台免費方案，需查證 |
| Amvera | ✅ | ⚠️ | ⚠️ | ❌ | ⚠️ | ❌ | ⚠️ | ❌ | Bonus / 試用金，需查證 |
| ArvanCloud | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | PaaS / CDN 免費額度需查證 |
| Gcore | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | Edge Cloud 免費方案需查證 |
| Patr | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ❌ | ✅ | ❌ | Developer Plan，需查證 |
| Binary Lane | ❌ | ✅ | 自管 | ❌ | 自管 | 自管 | 自管 | ❌ | 通常為 credit / 促銷，非永久免費 |
| Servercore | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ❌ | 測試贈金需查證 |
| VK Cloud | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | 新用戶額度需查證 |
| Catalyst Cloud | ⚠️ | ✅ | ✅ | ❌ | ⚠️ | ⚠️ | ✅ | ❌ | Trial credit 需查證 |
| Biznet Gio | ⚠️ | ✅ | ✅ | ❌ | ⚠️ | ❌ | ✅ | ❌ | 14 天試用需查證 |
| Cloud.ru | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | Grant / 補助機制需查證 |
| Selectel | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | 免費額度需查證 |
| Liara | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ❌ | ✅ | ⚠️ | Free tier 需查證 |
| VNG Cloud | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | 試用 / credit 需查證 |
| OrionVM | ❌ | ✅ | 自管 | ❌ | 自管 | 自管 | 自管 | ❌ | 多半非免費 |
| Exoscale | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | Trial / credit 需查證 |

> Legend:  
> ✅ = 明確適合 / likely supported  
> ⚠️ = 可能支援或需依方案確認 / depends on plan or implementation  
> ❌ = 非主要定位 / not a core offering  
> 自管 = 可在 VM / K8s 上自行部署 / self-managed

---

# 10. 專案導向建議 / Project-Oriented Recommendations

## 10.1 Go + Next.js SaaS MVP

**建議組合**：

- Frontend / Backend 同平台：Zeabur、Northflank、Liara、Patr。
- Frontend 獨立部署：Stormkit。
- Backend 與 Worker：Northflank、Zeabur、Oracle Cloud。

**English Recommendation**:

> For a Go + Next.js SaaS MVP, start with Zeabur or Northflank if fast deployment matters. Use Stormkit only when the frontend is the primary workload. Use Oracle Cloud Always Free when the project needs long-running backend services with minimal cost.

---

## 10.2 Kafka / Redis / Worker-heavy Microservices

**建議組合**：

- 優先：Northflank、Selectel、Servercore、Exoscale。
- 低成本 Lab：Oracle Cloud 自架 Redis / Kafka / Redpanda。
- 區域型研究：VK Cloud、Cloud.ru、Servercore。

**English Recommendation**:

> For Kafka, Redis, and worker-heavy microservices, choose providers with managed databases and strong container orchestration. Northflank and Exoscale are safer general-purpose options, while Selectel and Servercore are more suitable for CIS / Eastern Europe regional experiments.

---

## 10.3 Watchdog / Agent Backend / Monitoring Lab

**建議組合**：

- 免費長期測試：Oracle Cloud Always Free。
- 亞太低延遲：Zeabur。
- 澳洲節點：Binary Lane、OrionVM、Oracle Cloud Australia。
- 東南亞節點：VNG Cloud、Biznet Gio、Patr。

**English Recommendation**:

> For watchdog agents, telemetry ingestion, and monitoring labs, Oracle Cloud Always Free is the most cost-efficient starting point. For regional latency experiments, use Zeabur in APAC, VNG Cloud or Biznet Gio in Southeast Asia, and Binary Lane or OrionVM in Australia.

---

## 10.4 Edge / CDN / BGP Path Research

**建議組合**：

- Gcore：Edge / CDN / CIS 與東歐覆蓋。
- ArvanCloud：中東 CDN / DDoS 防禦研究。
- Scaleway：歐洲 Serverless / Container / Registry。
- Exoscale：歐洲主權雲與穩定 CLI workflow。

**English Recommendation**:

> For edge deployment, CDN behavior, and BGP path research, prioritize Gcore and ArvanCloud. Scaleway and Exoscale are better when European data residency, serverless workloads, or sovereign-cloud requirements matter.

---

# 11. 部署前查核清單 / Pre-deployment Checklist

## 11.1 技術查核

- [ ] 是否支援 Dockerfile 或 OCI image？
- [ ] 是否支援 Go / Gin 與 Next.js？
- [ ] 是否可跑 background worker？
- [ ] 是否有 Redis / PostgreSQL / Kafka managed service？
- [ ] 是否支援自訂網域與自動 TLS？
- [ ] 是否支援 WebSocket / long-running connection？
- [ ] 是否支援 log export / metrics / alerts？
- [ ] 是否支援 Terraform / CLI / API？

## 11.2 成本查核

- [ ] Free tier 是永久免費、試用金，還是限時 trial？
- [ ] 免費額度是否包含 database / bandwidth / build minutes？
- [ ] 超額後是否自動收費？
- [ ] 是否需要信用卡？
- [ ] 是否有閒置資源回收機制？
- [ ] 出站流量 egress 是否昂貴？

## 11.3 合規與風險查核

- [ ] 是否涉及資料主權或區域合規？
- [ ] 是否有制裁、出口管制、付款限制？
- [ ] 是否允許資安測試、掃描、agent telemetry？
- [ ] AUP 是否限制 proxy、crawler、monitoring、security research？
- [ ] 是否適合存放真實客戶資料？

## 11.4 English Checklist

- [ ] Does the platform support Dockerfile or OCI image deployment?
- [ ] Does it support Go / Gin and Next.js?
- [ ] Can it run background workers or long-running services?
- [ ] Are Redis, PostgreSQL, or Kafka available as managed services?
- [ ] Does it support custom domains and automatic TLS?
- [ ] Does it support WebSocket or persistent outbound connections?
- [ ] Can logs, metrics, and alerts be exported?
- [ ] Does it provide Terraform, CLI, or API access?
- [ ] Is the free tier permanent, credit-based, or time-limited?
- [ ] Are there sanctions, export-control, or payment restrictions?
- [ ] Does the acceptable use policy allow security research and telemetry workloads?

---

# 12. 最終建議 / Final Recommendation

若目標是快速部署一個 **Go + Next.js + Redis / PostgreSQL** 的小型 SaaS 或監控平台，建議採用以下階段式路線：

## Phase 1 — MVP / PoC

- **Zeabur**：亞太低延遲與最快上手。
- **Northflank**：需要微服務、DB、worker、Kafka / Redis 時更穩。
- **Oracle Cloud Always Free**：需要長期免費 VM 與可自管 Docker stack。

## Phase 2 — 區域節點實驗

- **VNG Cloud / Biznet Gio / Patr**：東南亞測試。
- **Gcore / Scaleway / Exoscale**：歐洲、東歐與 Edge 測試。
- **Catalyst Cloud / Binary Lane / OrionVM**：澳洲與紐西蘭測試。

## Phase 3 — 進階微服務與資安研究

- **Selectel / Servercore / VK Cloud / Cloud.ru**：CIS / 俄羅斯 / 中亞區域研究。
- **ArvanCloud / Liara**：中東 PaaS / CDN / Edge / regional deployment。
- **Exoscale**：歐洲主權雲、K8s、Kafka / Redis / PostgreSQL managed service。

### English Final Recommendation

> Start with Zeabur, Northflank, or Oracle Cloud Always Free for an initial MVP. Move to VNG Cloud, Biznet Gio, Gcore, Scaleway, Catalyst Cloud, or Binary Lane when regional latency testing becomes important. For deeper microservice, Kafka, Redis, Kubernetes, or security research scenarios, evaluate Selectel, Servercore, VK Cloud, Cloud.ru, ArvanCloud, Liara, and Exoscale with careful attention to compliance, payment, sanctions, and acceptable-use policies.

---

# 13. 原始資料中的資料來源備註 / Source Link Notes

原始內容中部分資料來源為官方首頁或文件，但也有部分為 Google Search / Gemini conversation link。建議正式採用前，將所有資料來源替換為官方文件頁面，例如：

- Pricing / Free Tier 官方頁
- Product documentation 官方頁
- Region availability 官方頁
- Acceptable Use Policy / Terms of Service
- SLA / Support plan
- Data processing agreement / Privacy policy

> **English Note**: Replace search-result URLs or AI-chat URLs with official provider documentation before using this file as a formal technical reference.
