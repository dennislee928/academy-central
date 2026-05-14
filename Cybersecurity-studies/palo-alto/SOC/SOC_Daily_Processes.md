## The Challenges

SOC analysts must pivot between multiple security consoles to gather investigative clues, slowing incident response.

### Too Many Tools

Many organizations deploy over 30 disconnected security tools to block every attack vector. These tools have key limitations:

- **Prioritization** — No easy way to prioritize alerts for review.
- **Full Context** — Lack of comprehensive investigative context.
- **Sophisticated Filtering** — Each organization must create custom rules to filter low-priority alerts.

### Too Many Alerts

The proliferation of tools generates an overwhelming volume of alerts. Organizations can investigate fewer than 7% of alerts received.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/5efb912b426f4c44fe206c8d/large.png)

### Siloed Tools

Siloed tools force network and desktop operators to spend time installing and maintaining extra appliances, servers, and agents.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/652413daab1cd47bac62f733/original.png)

## 挑戰（繁體中文）

SOC 分析師須在多個安全主控台之間切換以蒐集調查線索，拖慢了事件應變速度。

### 工具過多

許多組織部署超過 30 種相互獨立的安全工具以阻擋所有攻擊途徑，但這些工具存在以下限制：

- **優先排序** — 無法有效排列警報的處理優先順序。
- **完整脈絡** — 缺乏調查所需的完整資訊。
- **精細過濾** — 每間組織須自訂規則過濾低優先級警報。

### 警報過量

工具氾濫導致警報量過大，組織僅能調查不到 7% 的警報。

### 工具孤島

各自獨立的安全工具迫使網路與桌面運維人員耗費大量時間安裝與維護額外的設備、伺服器及代理程式。

---

## Typical Alert Investigation Steps

Alert investigation is time-consuming and requires specialized skills. The process follows three key steps:

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/6520ad76ab1cd47bac191f19/large.png)

### Organization Forwards High-Level Alerts

High-level security alerts from separate tools, network traffic analysis, or IDS are forwarded to the SIEM.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/6520ade9ab1cd47bac20d423/large.png)

### SOC Analyst Pivots to Analysis Tool

The analyst pivots from the SIEM to a network traffic analysis tool to view network details, understand why the alert was generated, and identify associated activity.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/6520adfdab1cd47bac255a39/large.png)

### SOC Analyst Reviews Logs and Investigates Malicious Activity

The analyst reviews AD logs to identify the associated user, then pivots to the EDR console to examine running processes for malicious activity.

## 典型警報調查步驟（繁體中文）

警報調查耗時且需專業技能，主要分為三個關鍵步驟：

### 組織轉發高級警報

各安全工具、網路流量分析系統或入侵偵測系統（IDS）產生的高級警報被轉送至 SIEM。

### SOC 分析師切換至分析工具

分析師從 SIEM 切換至網路流量分析工具，檢視網路詳細資訊，了解警報觸發原因及相關活動。

### SOC 分析師檢閱紀錄並調查惡意活動

分析師檢閱 AD 紀錄以識別相關使用者，再切換至 EDR 主控台檢查端點上執行的程序是否含有惡意活動。

---

## Defined Processes

A typical SOC analyst follows well-defined processes to function effectively during daily shifts. These processes prepare analysts to resolve security alarms. Alarm analysis and data analysis tasks can be split across analysts of different levels.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/65240fd0ab1cd47bac4ced68/original.png)

## 明確定義的流程（繁體中文）

典型的 SOC 分析師須遵循組織明確定義的流程，以在值班期間有效運作。這些流程使分析師能妥善處理安全警報。警報分析與資料分析任務可分配給不同層級的分析師分別執行。
