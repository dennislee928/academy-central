## Adverse Events and Security Incidents

An incident is an adverse event or the threat of one occurring in a computing system, network, or application.

### Adverse Event

An adverse event is any event with negative consequences, such as a malware infection, server crash, or unauthorized file access.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/809bddb967435f480778d8376d47bb2dfe603d993efe019ca36ef39c92fcc1c5/course/en/assets/5efa57ac7db1e42067908807/original.png)

### Security Incident

A computer security incident is a violation or imminent threat of violation of cybersecurity policies, acceptable use policies, or security best practices. Examples include data loss, network intrusion, keylogger usage, and denial-of-service attacks.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/809bddb967435f480778d8376d47bb2dfe603d993efe019ca36ef39c92fcc1c5/course/en/assets/5efa57d17db1e42067908809/original.png)

## 不良事件與安全事件（繁體中文）

事件（incident）指發生於電腦系統、網路或應用程式中的不良事件或其威脅。

### 不良事件

不良事件（adverse event）指任何造成負面後果的事件，例如惡意軟體感染、伺服器崩潰或未經授權的檔案存取。

### 安全事件

電腦安全事件（security incident）指違反或即將違反網路安全政策、可接受使用政策或安全最佳實務的事件，包括資料外洩、網路入侵、鍵盤側錄及阻斷服務攻擊等。

---

## Incident Lifecycle

The incident lifecycle is a repeatable process for consistently identifying, investigating, and mitigating threats, while continuously improving security posture. It consists of four main functions:

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/809bddb967435f480778d8376d47bb2dfe603d993efe019ca36ef39c92fcc1c5/course/en/assets/65241cf3ab1cd47baced8cc5/small.png)

### Triage and Classification

Analysts process and classify alerts by severity. Suspected malicious alerts are evaluated as incidents. A critical component is creating an incident response plan with defined staffing, training, processes, procedures, and tools.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/809bddb967435f480778d8376d47bb2dfe603d993efe019ca36ef39c92fcc1c5/course/en/assets/65241ce8ab1cd47bace6ee76/small.png)

### Investigation

Analysts investigate the root cause and impact to determine the best response — quarantine, avoidance, or system restoration. Suspicious activities are formally classified as incidents after triage and investigation are complete.

### Detection and Evidence Collection

After detection, SOC team members collect evidence including memory images, log files, network connections, and running processes.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/809bddb967435f480778d8376d47bb2dfe603d993efe019ca36ef39c92fcc1c5/course/en/assets/65241d04ab1cd47bacf4abc0/small.png)

### Containment, Eradication, and Recovery

Analysts stop the attack and execute pre-approved mitigation scenarios, including breach response and change control. Containment strategies range from blocking ports/IPs on a firewall to physically disconnecting infected machines. After containment, adversaries are removed from the network — using anti-malware tools, wiping or reinstalling drives, resetting accounts, and applying vendor patches. Data is restored from backups, and user accounts are audited for unauthorized additions.

### Post-Incident Activity

Analysts complete alerting and investigation procedures for quality improvement, including tuning, process improvement, and capability enhancement. This phase reviews all activities to identify what worked and what did not. A written report documents all actions taken, serving as a crucial record for potential litigation.

## 事件生命週期（繁體中文）

事件生命週期是一套可重複的流程，用於持續識別、調查及緩解威脅，並不斷提升組織安全態勢。其包含四大功能：

### 分類與分級

分析師依嚴重程度處理及分類警報。疑似惡意的警報將被評估為事件。關鍵環節是制定事件應變計畫，明確定義人員配置、培訓、流程與工具。

### 調查

分析師調查根本原因與影響範圍，以決定最佳應變方式 — 隔離、規避或系統還原。可疑活動在完成分類與調查後正式歸類為事件。

### 偵測與證據蒐集

偵測到事件後，SOC 團隊成員蒐集記憶體映像、紀錄檔、網路連線及執行中程序等證據。

### 遏制、根除與復原

分析師阻止攻擊並執行預先核可的緩解方案，包括入侵應變與變更控制。遏制策略範圍涵蓋防火牆封鎖連接埠/IP 至實體拔除受感染機器網路線。遏制完成後，透過防惡意軟體工具、清除或重新安裝硬碟、重設帳號及套用廠商修補程式，將攻擊者從網路中移除。資料從備份還原，並稽核使用者帳號以防未經授權新增。

### 事件後活動

分析師完成警報與調查程序以進行品質改善，包含調校、流程優化及能力提升。此階段檢討所有活動，識別有效及無效的做法。最終完成書面報告，記錄所有應變措施，作為潛在訴訟的重要依據。

---

## Incident Response Lifecycle

Incident response is the process of detecting and analyzing incidents, limiting their effects, and restoring normal operations. The lifecycle consists of four phases:

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/809bddb967435f480778d8376d47bb2dfe603d993efe019ca36ef39c92fcc1c5/course/en/assets/652422acab1cd47bac614191/extraLarge.png)

1. **Preparation** — Establish and maintain an incident response capability.
2. **Detection and Analysis** — Identify and assess the severity of security incidents.
3. **Containment, Eradication, and Recovery** — Stop the attack, remove threats, and restore systems to normal.
4. **Post-Incident Activity** — Conduct lessons learned and improve future response.

## 事件應變生命週期（繁體中文）

事件應變是偵測與分析事件、限制其影響範圍，並使系統恢復正常運作的流程。生命週期包含四個階段：

1. **準備（Preparation）** — 建立並維護事件應變能力。
2. **偵測與分析（Detection and Analysis）** — 識別安全事件並評估其嚴重程度。
3. **遏制、根除與復原（Containment, Eradication, and Recovery）** — 阻止攻擊、移除威脅並恢復系統正常運作。
4. **事件後活動（Post-Incident Activity）** — 進行經驗教訓總結並改善未來應變流程。
