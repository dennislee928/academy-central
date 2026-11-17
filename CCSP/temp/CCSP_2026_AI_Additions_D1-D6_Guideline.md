# CCSP 2026｜AI Security Additions — D1–D6 Guideline

> 更新日期：2026-11-10  
> 適用：2026-08-01 起生效的 CCSP Exam Outline  
> 目的：只讀到 **CCSP 所需的 AI security 深度**，避免把準備方向變成 ML engineer / AI researcher certification。

---

# 0. 先講結論

新版 CCSP 明確把 AI Security 放進六個 domain。

官方 outline 最直接的新增/明列包括：

```text
D1 1.6
→ Artificial Intelligence / Machine Learning

D2 2.9
→ Protection of AI/ML data

D4 4.1
→ OWASP Top 10 for Large Language Model Applications

D5 5.6
→ Intelligent monitoring including AI
```

ISC2 官方頁另外明確說：

> AI security is integrated across all six domains.

所以：

> **不能完全不讀 AI。**

但：

> **AI 不是第七個 domain，也沒有獨立 exam weight。**

---

# 1. CCSP AI 的正確讀法

CCSP 不太可能考你：

```text
Transformer equation
Backpropagation derivation
CUDA kernel optimization
Gradient descent math
Model architecture implementation
```

CCSP 更可能問：

```text
Who is responsible?
What data is at risk?
Which control is BEST?
What is the trust boundary?
What is the privacy/legal issue?
What is the operational response?
What should be isolated?
What should be monitored?
```

所以要把 AI 放回：

> Cloud Security

而不是：

> ML engineering

---

# 2. 六域優先度

| Domain | AI 考試重要度 | 你要讀的深度 |
|---|---:|---|
| D1 Cloud Concepts/Architecture | **P0** | AIaaS、shared responsibility、AI threat detection、validation、ethics |
| D2 Cloud Data Security | **P0** | dataset/model privacy、poisoning、classification、model artifacts |
| D3 Platform/Infrastructure | P1 | isolation、GPU/compute、segmentation、HSM、availability |
| D4 Application Security | **P0** | OWASP LLM Top 10、prompt injection、agency、RAG、output validation |
| D5 Security Operations | **P0/P1** | AI SIEM/SOAR、model drift、monitoring、IR、human validation |
| D6 Legal/Risk/Compliance | P1 | explainability、privacy、vendor risk、jurisdiction、AI regulation |

---

# D1 — Cloud Concepts, Architecture and Design

官方新增：

> **1.6 Comprehend Artificial Intelligence (AI)/Machine Learning (ML)**

範圍包含：

- Cloud threat detection and analysis
- Data source validation and verification
- SOAR
- Ethical concerns
- Regulatory requirements

---

# 3. D1：AIaaS Shared Responsibility

把 AI-as-a-Service 想成新的 cloud service：

```text
CSP
├─ model hosting infrastructure
├─ physical hardware
├─ managed AI platform
├─ base service availability
└─ some platform security controls

Customer
├─ prompts
├─ input data
├─ RAG data
├─ IAM
├─ tool permissions
├─ model/application configuration
├─ output handling
└─ legal use of data
```

最重要：

> **Managed AI does NOT transfer accountability away from customer.**

---

# 4. AI Service Model 類比

### Hosted AI API

Customer 通常不管理：

- GPU
- model serving infra
- inference runtime

但仍管理：

- what data enters model
- who can invoke model
- what model output can trigger
- API keys
- downstream permissions

### Self-hosted model

Customer 責任更大：

- container/runtime
- model artifact
- patching
- GPU node
- network segmentation
- model server security

---

# 5. AI Threat Detection

AI/ML 可用於：

```text
anomaly detection
behavior analytics
log correlation
fraud detection
malware classification
threat hunting
prioritization
```

但：

> **AI detection output ≠ ground truth**

需要：

- confidence / validation
- human review
- baseline
- false-positive tuning
- monitoring

考場：

> AI improves scale and correlation, but human validation/governance remains necessary.

---

# 6. Data Source Validation

安全角度：

```text
Untrusted data
↓
training / fine-tuning / RAG
↓
AI behavior changes
```

要問：

- Where did data come from?
- Is provenance known?
- Has integrity been verified?
- Is data authorized for use?
- Does it contain PII?
- Can attacker poison it?

---

# 7. AI + SOAR

合理用途：

```text
AI
→ enrich alert
→ correlate events
→ suggest response
→ automate low-risk action
```

高風險行動：

```text
delete
disable account
block critical workload
revoke keys
quarantine production
```

應該有：

> policy guardrail / approval / deterministic control

尤其 AI 不能因 hallucination 就直接 destructive action。

---

# 8. Ethical Concerns

CCSP 層級要知道：

- bias
- discrimination
- transparency
- explainability
- accountability
- misuse
- excessive automation
- data consent

考場關鍵：

> **Technical accuracy alone does not satisfy governance.**

---

# D2 — Cloud Data Security

官方新增：

> **2.9 Comprehend data protection of AI and ML data**

包含：

- Dataset privacy
- Model privacy
- Dataset security
- Model security
- Validation
- Verification

---

# 9. AI Data Lifecycle

把 AI asset 分成：

```text
Raw data
↓
Training dataset
↓
Fine-tuning dataset
↓
Embeddings
↓
Model weights
↓
RAG index/vector DB
↓
Prompts
↓
Outputs
↓
Logs
```

每個都可能有：

- confidentiality
- integrity
- availability
- privacy
- retention
- ownership

---

# 10. Dataset Security

主要風險：

```text
Data poisoning
Unauthorized modification
Sensitive data inclusion
Bad provenance
Label manipulation
Cross-tenant leakage
```

主要 controls：

- integrity validation
- provenance
- access control
- versioning
- signed datasets/artifacts
- change review
- data classification
- DLP

---

# 11. Data Poisoning

Attacker 修改：

```text
training data
fine-tuning data
RAG data
embedding source
```

目的：

> 改變 model behavior。

例如：

```text
poisoned training examples
↓
model learns attacker-chosen behavior
```

不要混：

> Prompt injection = inference-time input problem

vs

> Data poisoning = dataset/model pipeline integrity problem

---

# 12. Model Security

Model artifact 也要當成資產：

```text
model weights
config
tokenizer
adapter
LoRA
system prompt
model package
```

風險：

- theft
- tampering
- unauthorized replacement
- malicious model artifact
- supply-chain compromise

controls：

- artifact signing
- hash/integrity check
- trusted registry
- least privilege
- version control
- provenance

---

# 13. Model Privacy

可能涉及：

- training data memorization
- extraction
- inversion
- membership inference
- sensitive prompt leakage

考場要知道：

> Model 本身可能洩漏 training data / sensitive information，不只是 database 才有 privacy risk。

---

# 14. Embeddings / Vector DB

RAG 架構：

```text
Private documents
↓
Embedding
↓
Vector DB
↓
Retrieval
↓
LLM
```

風險：

- unauthorized retrieval
- cross-user/cross-tenant leakage
- poisoned vector data
- weak access filtering
- sensitive embeddings
- stale/incorrect data

核心：

> Vector DB 仍需 IAM / authorization；不能因為資料變成 embedding 就假設安全。

---

# 15. Differential Privacy

概念：

> 降低從統計/model output 反推單一個體資料的可能性。

CCSP 深度：

> Privacy-enhancing technique。

不用算 epsilon 數學。

---

# 16. Homomorphic Encryption

概念：

> 可以在 encrypted data 上做某些 computation，而不必先完全解密。

CCSP：

> privacy-preserving computation concept。

不用讀演算法。

---

# D3 — Cloud Platform & Infrastructure Security

官方 AI 說明把 D3 放在：

- hardened infrastructure
- virtualization/containerization
- micro-segmentation
- AI training clusters
- HSM
- DDoS/WAF
- availability/resilience

---

# 17. AI Infrastructure Threat Model

AI workload 仍然是 cloud workload：

```text
GPU node
container
Kubernetes
storage
network
IAM
management plane
```

所以原本的 cloud controls 仍然有效。

---

# 18. Isolation

尤其注意：

```text
Tenant A model
Tenant B model
Training cluster
Inference cluster
RAG database
Management plane
```

應做：

- network segmentation
- workload isolation
- namespace/project isolation
- least privilege
- separate service accounts
- management-plane protection

---

# 19. GPU / Accelerator Security

CCSP 不需要 GPU architecture。

要知道：

- GPU 是 compute resource
- expensive/scarce capacity
- resource exhaustion can impact availability/cost
- multi-tenant isolation matters
- training/inference workloads need access boundaries

---

# 20. HSM / Key Protection

AI environment 仍會有：

```text
data encryption keys
model signing keys
API secrets
TLS certs
service identities
```

HSM 適合：

> protect high-value cryptographic key material.

不要誤解：

> HSM protects the model logic itself.

它主要保護：

> keys / cryptographic operations.

---

# 21. Micro-Segmentation

例：

```text
Internet
↓
API Gateway
↓
Inference Service
↓
Vector DB
↓
Sensitive Data Store
```

不要允許：

```text
LLM agent
→ unrestricted lateral movement
```

要做：

- explicit network policy
- limited egress
- service identity
- east-west controls

---

# D4 — Cloud Application Security

官方明確列：

> **OWASP Top 10 for Large Language Model Applications**

這是最直接的 AI application-security 考點。

---

# 22. OWASP LLM Top 10 2026

截至 2026 最新版本：

1. **Prompt Injection**
2. **Sensitive Information Disclosure**
3. **Excessive Agency**
4. **Supply Chain**
5. **Data and Model Poisoning**
6. **Unbounded Consumption**
7. **Misinformation**
8. **Hidden Context Exposure**
9. **Vector and Embedding Weaknesses**
10. **Improper Output Handling**

對 CCSP：

> 不需要逐條背大量 exploit details，但最好能從 scenario 認出 category。

---

# 23. Prompt Injection

### Direct

User 直接輸入：

```text
Ignore previous instructions...
```

### Indirect

LLM 讀到：

- website
- email
- PDF
- issue
- RAG document
- MCP/tool output

裡面的惡意 instruction。

核心：

> **Untrusted content becomes instruction-like input.**

---

# 24. Prompt Injection 最重要 mitigation mindset

不要相信：

> 只要 prompt 寫得更好就能完全解決。

應該：

```text
Least privilege
Deterministic policy checks
Human approval for sensitive actions
Output validation
Tool allowlist
Egress restriction
Separate trusted/untrusted data
```

關鍵：

> **Assume model can eventually be fooled; limit blast radius.**

---

# 25. Sensitive Information Disclosure

可能洩漏：

- PII
- credentials
- private documents
- system context
- secrets
- proprietary data

mitigation：

- minimize data exposure
- DLP
- output filtering
- access control
- data classification
- tenant isolation

---

# 26. Excessive Agency

Agent 有：

```text
too much functionality
too much permission
too much autonomy
```

例如：

```text
LLM agent
→ shell
→ production DB
→ email
→ cloud admin API
```

只要 prompt injection 成功：

> blast radius 極大。

核心：

> **Least privilege + human approval + scoped tools**

---

# 27. Supply Chain

AI supply chain 不只 npm/pip：

- ML libraries
- pretrained models
- model registries
- datasets
- MCP servers/tools
- plugins
- vector data sources

controls：

- pin version
- signed artifact
- provenance
- trusted registry
- SCA
- vendor assessment

---

# 28. Data and Model Poisoning

可能攻擊：

```text
training set
fine-tuning
RAG corpus
memory
model artifact
```

目標：

> manipulate future model behavior.

---

# 29. Unbounded Consumption

AI 特別容易：

```text
token usage ↑
GPU usage ↑
API calls ↑
tool loops ↑
cost ↑
availability ↓
```

相當於：

> Resource exhaustion + economic denial of service.

controls：

- quota
- rate limit
- budget
- token limit
- timeout
- tool-call cap

---

# 30. Misinformation

LLM 可能：

> 產生流暢但錯誤的內容。

Security impact：

- wrong configuration
- wrong incident decision
- unsafe code
- incorrect compliance interpretation

control：

> verification + authoritative data + human review.

---

# 31. Hidden Context Exposure

舊版叫：

> System Prompt Leakage

2026 擴大成：

> Hidden Context Exposure

包含：

- hidden prompt
- internal context
- tool metadata
- private/internal instructions

核心：

> 不要把 secret 放進「只是 hidden」的 context 並假設永遠不會洩漏。

---

# 32. Vector and Embedding Weaknesses

常見：

- cross-tenant retrieval
- poisoned embeddings
- unauthorized RAG access
- bad metadata filter
- stale documents

考場：

> RAG authorization must happen outside model trust alone.

---

# 33. Improper Output Handling

錯誤：

```text
LLM output
↓
直接執行
```

例如：

```text
SQL
Shell command
HTML
JavaScript
API arguments
```

都沒 validation。

原則：

> **Treat model output as untrusted input.**

---

# 34. AI SDLC

應加入：

```text
Threat modeling
Abuse cases
Prompt-injection testing
Adversarial testing
Supply-chain review
Model/data validation
Rate limiting
Tool permission review
Output validation
Monitoring
```

仍然是：

> Secure SDLC / Shift Left。

---

# D5 — Cloud Security Operations

官方：

> Intelligent monitoring of security controls，包含 AI。

官方 AI 說明也提：

- AI/ML threat hunting
- multi-cloud event correlation
- SIEM/SOAR
- model drift
- continuous monitoring

---

# 35. AI in SOC

AI 可幫：

```text
Alert correlation
Anomaly detection
Threat hunting
Log summarization
Incident enrichment
Prioritization
Response suggestion
```

但不能把：

> AI conclusion = verified incident

---

# 36. False Positive / False Negative

AI detection：

```text
False Positive
→ benign classified malicious

False Negative
→ malicious classified benign
```

不能只調低 FP 而不管 FN。

應：

- baseline
- validate
- measure
- tune
- monitor drift

---

# 37. AI + SIEM

AI 可：

```text
many logs
↓
correlation
↓
candidate incident
```

但證據鏈仍要：

- raw logs
- timestamps
- identity
- immutable records
- auditability

AI summary：

> 不是 forensic evidence 的替代品。

---

# 38. AI + SOAR

適合自動：

- enrich IP
- gather context
- tag event
- low-risk ticket creation

高風險：

- delete data
- revoke production credentials
- isolate critical server
- block entire region

應有：

> deterministic control / approval。

---

# 39. Model Drift

Model Drift：

> model behavior/performance 隨時間偏離原本 baseline。

原因可能：

- input distribution changes
- environment changes
- data changes
- attacker manipulation

安全角度：

> unexpected drift should trigger investigation.

不要把所有 drift 都當 attack。

---

# 40. AI Incident Response

要保留：

```text
Prompt/input
Model/version
System prompt/config
Retrieved context
Tool calls
Output
User identity
Service identity
Model endpoint
Timestamps
```

否則很難 reconstruct incident。

---

# D6 — Legal, Risk and Compliance

官方 AI 說明強調：

- automated processing
- explainability
- GDPR / EU AI Act
- cross-border data processing
- vendor risk
- ethical guidelines
- eDiscovery / forensics

---

# 41. AI Privacy

AI input 仍可能是 PII：

```text
Prompt
RAG document
training data
chat history
telemetry
```

不能因為送進 AI：

> privacy obligation 消失。

---

# 42. Controller vs Processor

例：

```text
Company sends customer PII to managed AI API
```

通常仍要問：

```text
Who determines purpose/means?
→ Controller

Who processes on behalf?
→ Processor
```

AI service 不改變這個核心 privacy model。

---

# 43. Explainability

概念：

> 能理解/說明 AI decision 的依據或 decision process 到足以滿足 business/legal requirements。

不要過度解讀：

> Explainability ≠ 必須公開所有 model weights。

---

# 44. Automated Decision Risk

若 AI 用於：

- hiring
- credit
- insurance
- healthcare
- access control

則：

> bias / fairness / transparency / appeal / regulatory issue

風險更高。

---

# 45. Vendor Risk

AI vendor assessment：

- data retention
- training on customer data?
- subprocessor
- region/jurisdiction
- breach notification
- model/data ownership
- right to audit
- security certification
- incident handling
- export/deletion

考場：

> Outsourcing AI ≠ outsourcing accountability.

---

# 46. Cross-Border / Sovereignty

AI architecture 可能：

```text
User in EU
↓
API region A
↓
model service region B
↓
logging region C
```

所以要問：

- Where is data processed?
- Where is data stored?
- Who are subprocessors?
- Which jurisdiction applies?
- Can data be deleted/exported?

---

# 47. AI eDiscovery / Forensics

AI record 可能包含：

- prompt
- output
- model version
- tool calls
- RAG context
- logs
- agent action

要維持：

> chain of custody / retention / auditability。

---

# 48. NIST AI RMF

CCSP 不一定要背全部細項，但要認得：

> **NIST AI Risk Management Framework**

核心 functions：

```text
Govern
Map
Measure
Manage
```

它是：

> AI risk governance framework。

---

# 49. NIST GenAI Profile

NIST AI 600-1：

> Generative AI Profile

用途：

> 把 AI RMF 套用到 GenAI specific risks。

考場 recognition：

```text
AI RMF
→ general AI risk

GenAI Profile
→ generative AI-specific risk guidance
```

---

# 50. CSA AI Controls Matrix

截至 2026，OWASP 2026 framework mappings也包含：

> CSA AI Controls Matrix (AICM)

CCSP 可能透過 CSA context 出現。

不用背 control IDs。

要知道：

> cloud/AI controls framework。

---

# 51. D1–D6 Scenario Mapping

## Scenario A
AI SOC tool flags unusual behavior.

Domain：
> **D1 / D5**

核心：
> AI threat detection + validation + monitoring。

## Scenario B
Attacker poisons training data.

Domain：
> **D2 / D4**

核心：
> dataset integrity / poisoning。

## Scenario C
AI agent can call cloud admin API with full permissions.

Domain：
> **D1 / D3 / D4**

核心：
> Excessive Agency / IAM / least privilege。

## Scenario D
RAG returns another tenant's private document.

Domain：
> **D2 / D4**

核心：
> data authorization / vector DB weakness。

## Scenario E
AI-generated command executes directly on server.

Domain：
> **D4**

核心：
> Improper Output Handling。

## Scenario F
Model behavior changes after months in production.

Domain：
> **D5**

核心：
> Model Drift / continuous monitoring。

## Scenario G
Managed AI provider retains prompts in another jurisdiction.

Domain：
> **D6**

核心：
> privacy / data sovereignty / vendor contract。

---

# 52. AI Security Control Hierarchy

最值得記：

```text
Governance
↓
Data classification
↓
IAM / least privilege
↓
Isolation
↓
Input validation
↓
Tool control
↓
Output validation
↓
Monitoring
↓
IR / audit
```

AI 並沒有讓傳統 controls 失效。

反而：

> **AI 讓 least privilege、data governance、monitoring 更重要。**

---

# 53. CCSP 常見 Trap

## Trap 1
> AI 自動化越多越安全。

錯。Automation 可能放大錯誤與 blast radius。

## Trap 2
> AI output 是 security evidence。

錯。AI output 需要 validation。

## Trap 3
> Prompt injection 可以靠 system prompt 完全阻止。

錯。應 assume model may be fooled + constrain permissions.

## Trap 4
> RAG data 是 internal，所以可信。

錯。Internal data 也可能被 poisoning / low-privilege contributor 修改。

## Trap 5
> Managed AI provider 負責所有 privacy。

錯。Shared responsibility 仍在。

## Trap 6
> Embeddings 不算 sensitive data。

錯。可能仍能暴露 sensitive semantic relationships / retrievable data。

---

# 54. AI Study Priority for CCSP

## P0

```text
Prompt Injection
Sensitive Information Disclosure
Excessive Agency
Data/Model Poisoning
Improper Output Handling
Unbounded Consumption

AIaaS shared responsibility
Dataset/model privacy
AI SIEM/SOAR validation
```

## P1

```text
Vector/Embedding Weaknesses
Hidden Context Exposure
Supply Chain
Model Drift
Explainability
AI vendor risk
NIST AI RMF
```

## P2

```text
Homomorphic encryption details
Differential privacy math
Model architecture details
GPU internals
Training algorithm mathematics
```

---

# 55. 每個 Domain 最少要會的 3 句

## D1

1. AI-as-a-Service 仍是 shared responsibility。
2. AI threat detection 需要 validation；AI output ≠ ground truth。
3. AI automation 要受 governance / ethical / regulatory controls。

## D2

1. Dataset、model weights、embeddings 都是 security assets。
2. Poisoning 是 integrity 問題。
3. Model/RAG 不能繞過 classification、IAM、privacy。

## D3

1. AI workloads 仍需要 isolation、segmentation、IAM。
2. GPU/AI cluster 是 high-value compute resource。
3. HSM 保護 cryptographic keys，不是「保護 AI 智慧本身」。

## D4

1. Prompt injection 是 input-side risk。
2. Excessive agency 放大 prompt injection 的後果。
3. Model output 要當 untrusted input 驗證。

## D5

1. AI SIEM/SOAR 可以協助，不應無限制自動執行高風險動作。
2. Model drift 要監控。
3. IR 必須保留 prompt/model/tool/context logs。

## D6

1. AI 不會讓 controller/accountability 消失。
2. Cross-border processing / retention / vendor contract 要確認。
3. Explainability、privacy、regulation、vendor risk 都可能是考點。

---

# 56. 一頁總圖

```text
                    AI CLOUD SECURITY
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
      DATA              MODEL              AGENT
        │                  │                  │
 classification       weights/config     tools/permissions
 privacy              integrity          autonomy
 provenance           signing            blast radius
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    APPLICATION
                           │
         prompt injection / output handling
                           │
                    INFRASTRUCTURE
                           │
          isolation / network / IAM / HSM
                           │
                     OPERATIONS
                           │
            SIEM / SOAR / drift / IR
                           │
                   LEGAL / RISK
                           │
       privacy / vendor / jurisdiction / audit
```

---

# 57. 最後判斷

新版 CCSP AI 題的本質，不會是：

> 「你會不會訓練 Transformer？」

而會是：

> **你能不能把既有 cloud-security principles 正確套到 AI workload、AI data、LLM app、agent、SOC automation 與 compliance。**

所以讀法應該是：

```text
AI
+
Shared Responsibility
+
Data Security
+
Least Privilege
+
Secure SDLC
+
Monitoring
+
Risk / Legal
```

而不是另開一套完全不同的安全世界。

---

# Sources / Current References

- ISC2 CCSP Certification Exam Outline, effective August 1, 2026.
- ISC2 official section: “How is AI Security Incorporated into the CCSP Domains?”
- OWASP GenAI LLM Top 10 2026, released August 2026.
- OWASP Top 10 for Agentic Applications 2026.
- NIST AI Risk Management Framework (AI RMF).
- NIST AI 600-1, Generative AI Profile.
- CSA AI Controls Matrix (AICM).

> Version note: The CCSP outline says “Top 10 for Large Language Model Applications” without pinning a specific OWASP edition. As of November 2026, the latest OWASP GenAI LLM Top 10 is the 2026 edition.
