# CCSP Domain 3 核心觀念與架構 / Cloud Platform & Infrastructure Security

> **Domain 3 定位：** 本領域涵蓋雲端平台與基礎設施安全，包括虛擬化、容器、Serverless、網路分段與架構防禦。考題著重於各層控制的正確歸屬與設計原則，而非工具操作細節。

## 虛擬化、容器、Serverless、分段隔離與架構安全

**版本**：1.0  
**適用對象**：CCSP 認證考生  
**涵蓋範圍**：Domain 3 — Cloud Platform and Infrastructure Security

---

## 學習目標

完成本講義後，學習者應能：

- 區分不同控制層級（hypervisor、VM-to-VM、control plane、runtime、serverless、cloud segmentation），並選對對應的主控制措施。
- 正確判斷考題中的風險所在層級，避免以「次級控制」取代「主控制」。
- 掌握 Type 1/Type 2 hypervisor、live migration、container 與 VM 隔離、serverless 安全模型、VLAN/SDN/microsegmentation 等核心概念與考點。

---

## 第一章 Domain 3 核心架構：分層與控制對應

### 1.1 總原則

**先判斷風險發生在哪一層，再選擇該層的主控制。**

考題常見的失分原因之一，是將「網路分段」「VLAN」等控制誤用於 hypervisor 層風險，或將傳統主機/網路思維套用於 serverless。本講義依「層級」整理關鍵詞與常見正確答案，供系統化判斷。

### 1.2 層級對照表

| 層級 | 關鍵詞 | 主控制常見答案 |
|------|--------|----------------|
| **Hypervisor / virtualization** | VM escape, guest-to-host, hypervisor compromise, hypervisor security, long-term hypervisor protection | patch management, security-focused updates, hardening, privileged access control, RBAC / least privilege（管理介面） |
| **VM-to-VM / tenant-to-tenant** | east-west traffic, lateral movement, inter-VM communication, tenant separation, segmentation | microsegmentation, virtual firewalls, SDN, network isolation |
| **Container runtime / control plane** | orchestration, control plane, cluster administration, container isolation, tenant isolation | granular RBAC, process isolation, separate VMs for strongest isolation, workload identity / secrets protection |
| **Serverless** | ephemeral, FaaS, no host access, function monitoring, provider-managed infrastructure | provider-native monitoring/logging/tracing, IAM / permissions, configuration security, event visibility |
| **Cloud segmentation** | cloud-scale, multi-tenant segmentation, virtualization networking, VLAN limitation, software-defined segmentation | SDN, microsegmentation, virtual firewalls |

---

## 第二章 Hypervisor 與 VM Escape

### 2.1 常見觀念誤區

以下控制本身並不錯，但其主要作用為：

- **Network segmentation / microsegmentation / virtual firewall / VLAN segmentation**  
  → 主要處理 **VM-to-VM**、**橫向移動**、**爆炸半徑控制**。

上述控制**並非**用來修補：

- **hypervisor 本體漏洞**
- **VM-to-host**
- **guest escape 的根本原因**

### 2.2 正確判斷原則

當題幹核心為下列情境時：

- VM escape
- guest-to-host
- hypervisor compromise
- future prevention of hypervisor exploit
- long-term hypervisor security

**主答案應優先考慮**：hypervisor patching、patch management、hardening、security updates。

### 2.3 核心對照

| 控制類型 | 主要防護對象 |
|----------|--------------|
| **Network segmentation** | VM-to-VM（橫向移動） |
| **Hypervisor patching** | VM-to-host（guest escape / hypervisor 漏洞） |

### 2.4 考題判斷要點

題幹若出現：exploited hypervisor vulnerability、escape from guest、access to host、compromise across multiple VMs after hypervisor weakness。

**判斷重點**：題目是在問「後續移動（lateral movement）」還是「起始突破點（root cause）」？  
若為**起始突破點**，主控制應為 **patch / hardening**，而非 segmentation。

---

## 第三章 Type 1 與 Type 2 Hypervisor

### 3.1 安全意涵

從安全角度，Type 1 常優於 Type 2 的原因在於：

- 直接運行於硬體（directly on hardware）
- 無中間 host OS
- 較小攻擊面（smaller attack surface）

### 3.2 標準對照

- **Type 1**：較小 attack surface，安全上通常較佳。
- **Type 2**：多一層 host OS，多一層可被攻擊面。

### 3.3 答題注意事項

若題目明確問 **security implication**、**multi-tenant cloud**、**performance + security**，主軸應為：  
**少一層 host OS = 少一層 attack surface**。  
不宜以 scalability、management convenience 或 popularity 作為安全題的主答案。

---

## 第四章 Live Migration

### 4.1 本質判斷

Live migration 的本質**不是** storage、snapshot 或 CPU 優化問題，而是：

**Data in transit problem（傳輸中資料問題）。**

### 4.2 理由說明

VM 移轉時可能攜帶 memory contents、active session state、runtime data 及敏感資訊。因此主要風險在於**移轉途中資料是否暴露**，而非僅有無快照。

### 4.3 主控制

最對應的控制為：**encryption in transit（傳輸加密）**。

### 4.4 對照記憶

- **Data at rest** → 靜態加密  
- **Data in transit** → 傳輸加密  
- **Live migration** → 本質上屬於 **transit** 情境  

---

## 第五章 Hypervisor 與管理介面安全

### 5.1 題型辨識

當情境為：多位管理者、不同職責、大型企業、長期治理、需避免過大權限、管理 hypervisor / orchestrator / control plane 時，主答案通常為：

- **RBAC**
- **Least privilege**
- **Regular access review / audit**

### 5.2 權限與時間控制的優先序

Time-based access 僅回答「何時可登入」，未先解決「誰能做什麼」。在管理面題目中，建議優先序為：

1. 定義權限  
2. 限縮權限（least privilege）  
3. 審查權限（access review / audit）  
4. 再談時間限制等補強  

---

## 第六章 Container 與 VM 隔離

### 6.1 觀念釐清

Container 具有 efficient、lightweight、flexible 等特性，但**不等同於** strongest isolation。兩者需分開判斷。

### 6.2 最強隔離題型

當題目出現：multi-tenant、highly sensitive data、strongest isolation、tenant boundary、financial or regulated data 時，常見最佳答案為：

**Run containers in separate VMs（在獨立 VM 中運行容器）。**

### 6.3 理由說明

- Containers **share a kernel**。  
- VMs 提供 **thicker isolation boundary**。  

因此：  
- 比**效率** → container 常有優勢。  
- 比**隔離強度** → VM 常更強。  

### 6.4 對照記憶

- **Container** → 效率高、資源共享多。  
- **VM** → 邊界更厚、隔離較強。  

---

## 第七章 Container 安全的兩類考法

### 7.1 Control Plane / Orchestrator 題

題目若涉及：orchestration security、control plane protection、large-scale containerized environments、management plane，主答案常為：

**Granular RBAC。**

Control plane 一旦失守，攻擊者可能部署惡意 workload、修改 policy、影響其他租戶資源、濫用 runtime permissions / secrets，故權限與職責分離為首要。

### 7.2 Runtime / Foundation 題

題目若問「最基礎、最核心、最能維持系統完整性的能力」，則常偏向：

**Process isolation。**

若 process isolation 不足，單一 container 事件可能影響其他 containers 甚至 host。

### 7.3 對照記憶

| 題型 | 優先考慮之控制 |
|------|----------------|
| **Control plane** | RBAC |
| **Runtime foundation** | Process isolation |

---

## 第八章 Serverless 安全模型

### 8.1 特性與常見誤區

Serverless 特性包括：ephemeral、short-lived、provider-managed infrastructure、limited/no host access。

不宜直接套用：agent-based tools、host-based monitoring、traditional EDR/IDS 思維。

### 8.2 監控與可見度

題目若問：best monitoring strategy、effective overall security monitoring、operational visibility in serverless，主答案通常為：

- **Provider-native monitoring**
- **Provider-native logging**
- **Provider-native tracing**

### 8.3 責任共擔（Shared Responsibility）

- **好處**：減少自管 OS/host 面、攻擊面可能變小、部分攻擊鏈可能被切斷。  
- **代價**：對底層 infra 控制較少、可見度改變、更依賴 provider、傳統工具不一定適用。  

### 8.4 對照記憶

- **Serverless 監控與可見度** → 先考慮 provider-native 工具。  
- **避免** → 優先採用 host/agent 型方案。  
- **責任共擔** → 少管許多底層，同時也少控制許多底層。  

---

## 第九章 VLAN、SDN 與 Microsegmentation

### 9.1 雲端多租戶情境

在 cloud multi-tenant 題目中，不宜僅以傳統 L2/L3 設備思維作答；需考慮虛擬化與軟體定義網路情境。

### 9.2 VLAN 的定位

VLAN 較偏向：traditional segmentation、L2 segmentation、static / coarse-grained segmentation。  
在多租戶雲端情境下，常非最佳單一答案。

### 9.3 雲端多租戶常見答案

題目若強調：cloud-scale、multi-tenant、virtualization、stronger tenant separation、flexible policy enforcement，較常見的答案為：

- **SDN**
- **Microsegmentation**
- **Virtual firewalls**

### 9.4 對照記憶

| 類型 | 特性 |
|------|------|
| **VLAN** | 傳統、較靜態、較粗粒度 |
| **SDN / microsegmentation** | 雲端、較動態、較細粒度 |

---

## 第十章 VLAN Hopping、Trunk 與 DTP

### 10.1 基本概念

- **Access port**：供單一 VLAN 使用，一般終端設備常接此類 port。  
- **Trunk port**：同一連線承載多個 VLAN 流量，常用於 switch-to-switch、switch-to-host 基礎設施連線。  
- **DTP（Dynamic Trunking Protocol）**：用於協商連線是否成為 trunk。  

### 10.2 VLAN Hopping 概念

典型情境：**本應為 access port 的埠被協商或設定為 trunk port**，使攻擊者從僅能接觸單一 VLAN，變為可能接觸多個 VLAN。

### 10.3 典型緩解措施

教科書式 VLAN hopping 緩解，常見最佳答案為：**disable DTP on access ports**（access port 固定為 access，不自動協商成 trunk）。

### 10.4 對照記憶

- **Access** = 單一 VLAN  
- **Trunk** = 多 VLAN 同線傳輸  
- **DTP** = 自動協商是否為 trunk  
- **VLAN hopping** = 不該為 trunk 的埠變成 trunk  

---

## 第十一章 Side-Channel 與 VM Escape

### 11.1 區別

- **VM escape**：直接突破 VM 邊界，往 host / hypervisor；屬虛擬化層的直接突破。  
- **Side-channel**：利用共享硬體資源（如 CPU cache、timing behavior、shared hardware characteristics）觀察或推測資訊，不一定直接打穿 hypervisor。  

### 11.2 對照記憶

- **VM escape** → 直接往 host / hypervisor 攻擊。  
- **Side-channel** → 利用共享硬體資源推測或竊取資訊。  

---

## 第十二章 IoT 與 AI 整合之安全意涵

### 12.1 立即影響

題目若問「立即影響最大」時，通常優先考慮的不是 policy consistency 或 governance complexity，而是：

**Attack surface expansion（攻擊面擴大）。**

### 12.2 理由

IoT 與 AI 導入後：connected devices 增加、entry points 增加、data flows 增加、exposure surface 增加。  
故「立即影響最大」常見描述為：**Expanded attack surface due to numerous connected devices**。

---

## 第十三章 資料中心選址（Site Selection）

### 13.1 地緣政治穩定性

題目若明確提及 **geopolitical stability**、long-term operation、country-level risk，除自然災害（地震、洪水、氣候）外，更需考慮：

- political stability  
- regulatory predictability  
- long-term continuity  
- sovereignty / jurisdiction issues  

### 13.2 對照記憶

若題目比較 **environmental sustainability** 與 **geopolitical stability**，常需優先想到：**長期政治穩定的國家/地區**。

---

## 第十四章 易錯對照與選項排除

| 題目關鍵 | 不宜優先選擇 | 應優先考慮 |
|----------|--------------|------------|
| Hypervisor 弱點 | segmentation, VLAN, virtual firewall | patch, hardening, hypervisor management |
| Strongest isolation | container-specific hardening, image security, network segmentation | VM boundary（如 separate VMs） |
| Control plane / orchestrator | image naming, general segmentation | RBAC, least privilege, admin governance |
| Serverless monitoring | agents, host EDR, traditional IDS on host | provider-native logging / monitoring / tracing |
| Cloud multi-tenant segmentation | more VLANs, ACL on interfaces | SDN, microsegmentation, virtual firewalls |
| VLAN hopping | DHCP snooping, firewall, general ACL | access port 設定、trunk 控制、disable DTP |

---

## 第十五章 考場解題流程建議

### Step 1：判斷風險所在層級

區分為：hypervisor、VM-to-VM、control plane、runtime、serverless、cloud segmentation 等。

### Step 2：對應 root cause 與主控制

- Hypervisor exploit → patching  
- Lateral movement → segmentation  
- Control plane abuse → RBAC  
- Serverless monitoring → provider-native tools  

### Step 3：注意題目用語

如 **most effective**、**most critical**、**best long-term**、**primary concern**、**strongest isolation**、**most appropriate**，通常表示應選**主控制**，而非補充控制。

### Step 4：區分 root-layer 與 blast-radius 控制

- **Root-layer**：patching, hardening, RBAC, process isolation  
- **Blast-radius**：segmentation, firewalls, east-west monitoring, VLAN design  

### Step 5：排除層級不符的選項

許多失分來自選到「有幫助但非最對位」的次級控制；務必對應題目所問的層級與主因。

---

## 第十六章 考前重點摘要（必背十句）

1. 考哪一層，就先選哪一層的主控制。  
2. Hypervisor 題先想 patch，不要先想 segmentation。  
3. VM escape 是 VM-to-host，不是 VM-to-VM。  
4. Type 1 少一層 host OS，attack surface 較小。  
5. Live migration 本質是 data in transit。  
6. 管理介面題先想 RBAC，不先想 time restriction。  
7. 最強隔離題，通常 VM > container。  
8. Control plane 題先保護 RBAC 與最小權限。  
9. Serverless 先想 provider-native，不先想 agent。  
10. Cloud multi-tenant segmentation 常是 SDN，不是只靠 VLAN。  

---

## 第十七章 複習優先順序建議

依 Domain 3 常見命題與易錯點，建議複習優先順序：

1. **第一優先**：Hypervisor / VM escape（根因控制 vs 網路控制）。  
2. **第二優先**：Container vs VM isolation（效率與隔離強度分開判斷）。  
3. **第三優先**：Serverless security model（no host、ephemeral、provider-native）。  
4. **第四優先**：Cloud segmentation vs traditional VLAN（辨識傳統網路題與 cloud multi-tenant 題）。  

---

## 總結

Domain 3 常見失分原因之一，是將**次級控制**選為**主控制**。  
答題時應先判斷風險與題目所問的層級，再選擇該層級的主控制（如：VM escape → patching；live migration → encryption in transit；strongest isolation → separate VMs；serverless monitoring → provider-native tools；VLAN hopping → disable DTP on access ports），以提升答題準確度。

---

*本講義可搭配「一頁式考前速記」與官方 CCSP 教材使用，以鞏固 Domain 3 考點。*
