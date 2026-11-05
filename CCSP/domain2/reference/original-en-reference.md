# CCSP Domain 2 原文英文參考講義 / Original English Reference Material

## **2.1 Describe cloud data concepts**  

### **Defining cloud computing**

#### The CIA triad

One of the fundamental models you need to understand is [the CIA triad](https://destcert.com/resources/five-pillars-information-security/), which stands for **confidentiality, integrity** and **availability.**

|   |   |
|---|---|
|**Confidentiality  <br>**|Keeping our data confidential basically means **keeping it a secret from everyone except for those who we want to access it**.|
|**Integrity**|If data maintains its integrity, it means that **it hasn’t become corrupted, tampered with, or altered in an unauthorized manner**.|
|**Availability**|Available data is **readily accessible to authorized parties when they need it**.|

The CIA triad is a fairly renowned model, but confidentiality, integrity and availability aren’t the only properties that we may want for our data. Two other important properties are authenticity and non-repudiation.  

|   |   |
|---|---|
|**Authenticity  <br>**|**Authenticity basically means that a person or system is who it says it is, and not some imposto**r. When data is authentic, it means that we have verified that it was actually created, sent, or otherwise processed by the entity who claims responsibility for the action.|
|**Non-repudiation  <br>**|**Non-repudiation essentially means that someone can’t perform an action, then plausibly claim that it wasn’t actually them who did it.**|

**繁體中文重點：**

- CIA 三要素：Confidentiality（僅授權者可讀）、Integrity（未遭未授權竄改或毀損）、Availability（授權者需要時可取得）。
- 另外兩個常見性質：Authenticity（來源與身分為真）、Non-repudiation（事後無法合理否認曾執行某動作）。

#### Data roles

There are a number of different data security roles that you need to be familiar with.  

|   |   |
|---|---|
|**Data owner/ data controller  <br>**|**The individual within an organization who is accountable** for protecting its data, holds the legal rights and defines policies. In the cloud model, the data owner will typically work at the cloud customer organization.|
|**Data processor  <br>**|**An entity or individual responsible for processing data**. It’s typically the cloud provider, and they process the data on behalf of the data owner.|
|**Data custodian**|**Data custodians have a technical responsibility over data**. This means that they are responsible for administering aspects like data security, availability, capacity, continuity, backup and restore, etc.|
|**Data steward**|**Data stewards are responsible for the governance, quality and compliance of data**. Their role involves ensuring that data is in the right form, has suitable metadata, and can be used appropriately for business purposes.|
|**Data subject**|**he individual to whom personal data relates.**|

**繁體中文重點：**

| 角色 | 記憶重點 |
|---|---|
| Data owner／controller | 組織內負最終責任者，訂定政策；雲端情境通常在 customer 端 |
| Data processor | 代表 owner 處理資料者，通常是 cloud provider |
| Data custodian | 負責技術面維運：安全、可用性、容量、備份與還原 |
| Data steward | 負責治理、品質與合規，確保資料適合業務使用 |
| Data subject | 個資所描述的當事人 |

### **Cloud data life cycle phases**

The CCSP exam covers the Cloud Security Alliance’s data security life cycle, which was [originally developed](https://securosis.com/blog/data-security-lifecycle-2.0/) by Rich Mogull. This model is tailored toward cloud security. There are **six phases in the data life cycle**.  

|   |   |
|---|---|
|**Create  <br>**|The creation phase involves **generating new digital content**. When we view the data security lifecycle as an ongoing process, it’s probably best to refer to this as the create and update phase, because **whenever existing data is updated or modified it also occurs during the create phase**.|
|**Store  <br>**|The storing phase is **when data is committed to a storage repository**. In practice, this tends to occur almost simultaneously alongside creation.|
|**Use**|The use phase is **when data is processed, viewed or used in an activity**.|
|**Share**|The share phase occurs **when data is exchanged between customers, users and owners**.|
|**Archive**|The archive phase is **when data is placed in long-term storage**.|
|**Destroy**|The destroy phase is **when data is destroyed**, ideally physically. If this is not possible, the purging techniques discussed in [section 2.7](https://destcert.com/resources/domain-2-cloud-data-security/#tve-jump-1931adaf8a5) may also be acceptable.|

**繁體中文重點：** CSA 資料安全生命週期（源自 Rich Mogull）共六階段：

| 階段 | 重點 |
|---|---|
| Create | 產生新內容；既有資料被修改也算此階段 |
| Store | 寫入儲存庫，實務上幾乎與 Create 同時發生 |
| Use | 資料被處理、檢視或使用 |
| Share | 在 customer、user、owner 之間交換 |
| Archive | 移入長期儲存 |
| Destroy | 銷毀，最好是實體銷毀；無法實體銷毀時可考慮 purge（見 2.7） |

### **Data dispersion**

Data dispersion involves **splitting data into fragments and a technique known as cryptographic bit-splitting. It can be used in the cloud to improve resiliency and security**. Data dispersion distributes fragments of files across multiple drives. Some schemes allow files to be reconstructed even if a portion of the fragments are lost or unavailable. They do this by following a process that’s similar to striping in redundant array of independent disks (RAID).

When data is dispersed across multiple drives, an attacker must be able to access each of these locations if they want to reconstruct it. One of the downsides is that it adds complexity and can make compliance more complicated, especially if data is stored across data centers in multiple jurisdictions.

**繁體中文重點：** Data dispersion 以 cryptographic bit-splitting 將資料切片並分散到多個磁碟，兼顧 resiliency 與安全；部分方案類似 RAID striping，缺少部分切片仍可重建。攻擊者須取得多個位置才能還原，代價是架構更複雜，跨司法管轄區存放時合規也更困難。

### **Data flows**

If organizations want to meet their compliance obligations and minimize their risk of data breaches, they need to know both where their data is and where it travels. Under the cloud computing paradigm, data movements can be incredibly complex and difficult to comprehend. Data travels in so many different directions and organizations have reduced visibility when their data is in the hands of a cloud provider.

**Data flow diagrams are one of the most important techniques for understanding the movement of data in, out and through organizations**. When you take the time to draw out where and how data is moving around, it gives you a greater understanding of your architecture, helps you identify risks, enables you to figure out where security controls need to be implemented, and helps you to demonstrate compliance.

![Image of data flows diagram - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/data-flow-diagram.webp "data-flow-diagram")

**繁體中文重點：** 雲端資料流複雜且可視性下降，而合規與降低外洩風險都要先掌握資料的位置與流向。Data flow diagram 是主要工具，可協助理解架構、找出風險、決定控制措施的部署點，並作為合規佐證。

---

## **2.2 Design and implement cloud data storage architectures**  

We will discuss Storage types and Threats to storage types in [Domain 3.1 Storage](https://destcert.com/resources/domain-3-cloud-platform-and-infrastructure-security/#t-1671568501513).

**繁體中文重點：** 本節不展開，儲存類型與其威脅放在 Domain 3.1。

---

## **2.3 Design and apply data security technologies and strategies**  

### **Encryption and key management  
**

We will discuss encryption and key management in [Domain 4.6](https://destcert.com/resources/domain-4-cloud-application-security/#t-1725895334957).

**繁體中文重點：** 本節不展開，加密與金鑰管理放在 Domain 4.6。

### **Hashing  
**

We cover hashing in [Domain 4.6](https://destcert.com/resources/domain-4-cloud-application-security/#t-1725895334957) as well.

**繁體中文重點：** 本節不展開，hashing 同樣放在 Domain 4.6。

### **Data obfuscation  
**

The terms data obfuscation and data masking are often used interchangeably. [ISO/IEC 27002:2022](https://www.iso.org/standard/75652.html) defines data masking as:

_Data masking is a **set of techniques to conceal, substitute or obfuscate sensitive data items**. Data masking can be **static** (when data items are masked in the original database), **dynamic** (using automation and rules to secure data in real-time) or o**n-the-fly** (with data masked in an application’s memory)._

**Data masking is a preventative security control that is used to keep sensitive data confidential**. The ISO/IEC document does not include a separate definition for data obfuscation, but you should note that it does use the term obfuscate in its data masking definition. In the table we have included what ISO/IEC 27002:2022 lists as “…additional techniques for data masking”.

|**Technique**|**Definition**|
|---|---|
|**Encryption**|Encryption involves s**crambling data with a specific algorithm and a key, so that only those with the appropriate key can decrypt and access the data**. As long as only authorized users have the key, the data remains confidential.|
|**Nulling or deleting characters**|If the sensitive data is **deleted or replaced with nulls, no one can access it**.|
|**Varying numbers and dates**|Value variance can involve using an algorithm that will **change the values according to specific instructions**. As a simple example, it could add 5 to each field. While this changes the original data, you do need to be careful how you implement it and in which situations, because it may be possible for the original data to be recovered.|
|**Substitution**|**Substitution involves switching out sensitive information for other data**. This is often done with fake, yet realistic information, which makes it an excellent option for test data.|
|**Replacing values with their hash**|When sensitive data is run through a secure hash function, it outputs a unique identifier known as a hash. **In certain situations, you may be able to use this identifier instead of the original sensitive data**.|

While the term data masking is often used to describe an array of techniques for concealing, substituting or obfuscating data, some may use the term more specifically. In these cases, it generally **refers to a process of hiding sensitive data with meaningless characters, such as asterisks, as shown in the image**.

![Image of data masking - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/data-masking.webp "data-masking")

**繁體中文重點：**

- Data masking 與 data obfuscation 常被混用；ISO/IEC 27002:2022 只定義 data masking：隱藏、替換或混淆敏感項目的一組技術，屬 preventative control。
- 三種形式：static（直接在原資料庫遮蔽）、dynamic（以自動化與規則即時保護）、on-the-fly（在應用程式記憶體中遮蔽）。
- 狹義的 masking 常指以星號等無意義字元遮住敏感內容。

| 技術 | 記憶重點 |
|---|---|
| Encryption | 以演算法與金鑰加密，只有持金鑰者可解 |
| Nulling／deleting | 直接刪除或改為 null |
| Varying numbers and dates | 依規則改變數值；實作不當可能被還原 |
| Substitution | 換成擬真的假資料，適合測試環境 |
| Hash replacement | 以 hash 值取代原值作為識別 |

#### Anonymization

Anonymization is the **process of removing identifiers from data**. It’s also called de-identification, and when it is done appropriately, anonymization makes it possible to use data while limiting the privacy impact on individuals. However, anonymizing data can be a challenging process because not only do you have to consider direct identifiers, but indirect identifiers as well. Here’s the difference between the two.

|   |   |
|---|---|
|**Direct identifier**|Direct identifiers are **things that can directly identify individuals**, such as their names, addresses, birth dates, social security numbers, phone numbers, etc.|
|**Indirect identifier**|Indirect identifiers are basically **any characteristic that doesn’t identify an individual by itself but could lead to the individual’s identification if an attacker had enough of them**.|

**Anonymizing data is important for certain types of information, particularly financial data, personally identifiable information (PII) and protected health information (PHI)**. The latter is regulated under HIPAA legislation in the United States. If you are using PHI for research or testing and it hasn’t been anonymized properly, you may find yourself with a costly HIPAA violation on your hands.

**繁體中文重點：** Anonymization（de-identification）是移除資料中的識別資訊，以降低使用資料時的隱私衝擊。困難在於除了 direct identifier（姓名、地址、社會安全號碼等）之外，還要處理 indirect identifier（單獨無法識別，累積足夠後可能指認個人）。對財務資料、PII 與 PHI 尤其重要；美國 PHI 受 HIPAA 規範，未妥善匿名化就用於研究或測試可能構成違規。

### **Tokenization  
**

When it comes to extremely sensitive information like credit card details, we want to use and store it in as few places as possible to limit the number of opportunities that attackers have to access it. We may also be restricted by regulations that prevent us from using sensitive information in certain ways.

One option we have for minimizing risks is to **use a token in place of the sensitive data. We refer to this as tokenization. Tokens are basically just strings of characters—often produced using cryptographic techniques—that act as substitutes or identifiers**. The only way to access the original data from the token is through the tightly controlled tokenization system.

Let’s give you a more specific demonstration of how tokenization works:

_Let’s say that you are looking for a customer relationship management (CRM) application to manage all of your customers. You have some sort of recurring payment system with your customers, and you need to maintain their credit card information on file to charge them each month. You found a great CRM application that provides all of the necessary functionality, with one major exception: It’s not compliant with PCI DSS, which means that you can’t store credit card information in it. Instead of giving up hope and looking for another app, you can use tokenization to circumvent this problem._

_The whole idea of tokenization is that if you have some sensitive data to store, you can store that sensitive data in a separate location, like a secure, on-premises server that’s compliant with PCI DSS. With the credit card information stored in the compliant server, you could just store a matching identifier in the database for the non-compliant CRM. This allows you to essentially store the sensitive data somewhere else, and then just have a reference to it in the CRM application._

_In the image, we have a trusted application on the left, which is PCI-DSS compliant. It could be running on a secure server in your on-premises data center. When you ask the customer to provide their credit card information, it would be sent to this trusted application. You wouldn’t want to then send this credit card information to the SaaS application database, because this would violate the PCI DSS. Instead, you could have the trusted application send the sensitive credit card data to the **token server**. The token server is a server in your internal environment that is PCS-DSS compliant. The token server then stores the sensitive data in its secure database. This is indicated by the yellow file, which represents the sensitive credit card data. The blue file represents the token, a randomly generated identifier that acts as a reference to the credit card data—the identifier itself is not sensitive data._

_Once this random identifier—the token—has been generated, it's going to get passed back to the token server. The token server then sends the identifier to the SaaS application, and the SaaS application stores the non-sensitive identifier in its database. This helps us get around the PCI-DSS compliance issue, because we aren't storing credit card information in the non-compliant CRM application. We’re only storing the token, which is a reference to the sensitive data, not the sensitive data itself._

_When you want to bill the customer each month, the SaaS application could just look up that customer, calculate how much they need to be billed, and send a request to the trusted application. The request would say, "I want to bill this token $17." The trusted application then goes to the token server, which uses the token to look up the credit card number in the token database, before sending it to the trusted application. Once the trusted application has the credit card number, the payment can be processed._

![Image of the the tokenization process - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/the-tokenization-process.webp "the-tokenization-process")

**繁體中文重點：**

- 概念：以 token（常由密碼學技術產生的字串）取代敏感資料，減少敏感資料的存放與使用位置；只有透過受嚴格控管的 tokenization 系統才能對應回原值。
- 典型情境：SaaS CRM 不符合 PCI DSS，不能存信用卡號，但業務需要定期扣款。

```text
Customer card data → Trusted app（PCI DSS 合規）→ Token server（存真值）
Token server → 回傳 token → SaaS CRM 只存 token
扣款：CRM 以 token 發出請求 → Trusted app → Token server 查回卡號 → 完成交易
```

- 重點：不合規系統只持有 token，token 本身不是敏感資料。

### **Data loss prevention (DLP)  
**

**Organizations need to have control of their sensitive data to prevent both accidental leaks and data theft**. One important practice involves implementing data loss prevention (DLP) tools. **DLP tools provide more ways to monitor your data, give you another layer of security controls, help you enforce your policies, and assist with demonstrating your due diligence for compliance purposes**. DLP tools have three important features.

![Image of data loss prevention DLP functionality - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/Data-loss-prevention-DLP-functionality.webp "Data-loss-prevention-DLP-functionality")

|   |   |
|---|---|
|**Discovery**|DLP tools **search through the organization for important data and classify it.**|
|**Monitoring**|These tools can **monitor data flows from various points of your organization’s infrastructure**. They can notify you of potential data breaches.|
|**Enforcement**|DLP tools can **enforce your organization’s security policy** by either sending alerts or blocking potentially dangerous actions.|

**Looking for some CCSP exam prep guidance and mentoring?**

---

Learn about our personal CCSP mentoring

[**1-on-1 Personal CCSP Mentoring**](https://destcert.com/1-on-1-cissp-mentoring/)

![Image of Lou Hablas mentor - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/Lou-ad-profile.png "Lou-ad-profile")

**繁體中文重點：** DLP 用於防止敏感資料意外外洩與遭竊，並提供額外監控、控制層、政策執行與 due diligence 佐證。三項功能：Discovery（搜尋並分類）、Monitoring（監看資料流）、Enforcement（告警或阻擋）。本節末尾的 mentoring 內容為原站推廣，不屬考試內容。

#### Discovery

You can’t keep your data safe if you don’t know what you have or where it is. That’s why it’s critical to **identify and classify all of your important data in the discovery phase**. DLP tools have three main ways of discovering data.

|   |   |
|---|---|
|**Label-based discovery  <br>**|**When data is labeled appropriately, it’s relatively easy for DLP tools to search through it and identify sensitive data**. Note that one of the best practices is to include labels in metadata, but labels and metadata are not the same thing.|
|**Metadata-based discovery  <br>**|DLP tools can **perform discovery by searching through metadata for relevant information**. Metadata is data about the data, much of which is often created automatically. It could include general information like the date and format, or more specific information, such as labels that describe the data’s class.|
|**Content-based discovery**|Another discovery technique is to **search through the data content itself**. This option is slow and flawed, but DLP tools can often uncover sensitive information like Social Security numbers and phone numbers by searching through your organization’s data for patterns.|

**繁體中文重點：** DLP 的三種探索方式：

| 方式 | 重點 |
|---|---|
| Label-based | 資料已妥善標記時最容易；label 常放在 metadata，但兩者不同 |
| Metadata-based | 搜尋 metadata（常自動產生，如日期、格式、分類 label） |
| Content-based | 搜尋內容本身的 pattern（如電話、身分證號），較慢且不完美 |

#### Monitoring

![Image of data loss prevention (DLP) architecture - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/Data-loss-prevention-DLP-architecture.webp "Data-loss-prevention-DLP-architecture")

**Data loss prevention tools also allow you to monitor your organization’s data to gain insight into how it is being used**. Below are the main types of monitoring.

|   |   |
|---|---|
|**Network-based monitoring  <br>**|This type of monitoring can capture data that is **traveling through the network** and is generally installed close to the perimeter. Monitoring network traffic is also referred to as monitoring _in-motion_.|
|**Storage-based monitoring  <br>**|Storage-based monitoring occurs in places **where data is stored, such as storage servers**. Monitoring data in storage is also called monitoring _at-rest_.|
|**Client-based monitoring**|Client-based monitoring is **deployed on endpoints such as employee laptops and phones**. It’s also referred to as monitoring _in-use_.|

**繁體中文重點：** 依部署位置對應資料狀態：

| 類型 | 位置 | 資料狀態 |
|---|---|---|
| Network-based | 網路邊界附近 | in-motion |
| Storage-based | 儲存伺服器 | at-rest |
| Client-based | 筆電、手機等 endpoint | in-use |

#### Enforcement

The third major capability of DLP tools is enforcement. **Your organization can use a rules-based approach to enforce its security policy, either through alerts or blocking**. As an example, if an employee accidentally tries to email sensitive information without encryption, they may either be sent an alert or have their action blocked.

**Alerts can help to inform users of potential policy violations**, but these run the risk of being ignored, which can result in data breaches. **Blocking can prevent the data from being compromised**, but false positives can hinder employees from getting their work done. The right approach needs to be carefully considered to balance these tradeoffs.

**繁體中文重點：** 以規則執行安全政策，手段是 alert 或 block。Alert 可提醒使用者，但可能被忽略而導致外洩；block 能阻止外洩，但 false positive 會妨礙工作，需要權衡。

### **Keys, secrets and certificate management**

We discuss keys, secrets and certificates management [in Domain 4.6](https://destcert.com/resources/domain-4-cloud-application-security/#t-1725895334957).

**繁體中文重點：** 本節不展開，金鑰、secrets 與憑證管理放在 Domain 4.6。

---

## **2.4 Implement data discovery**  

There are several different meanings for the term data discovery. One meaning is concerned with finding and creating an inventory of an organization’s important data, like we discussed in [section 2.3 Discovery](https://destcert.com/resources/domain-2-cloud-data-security/#tve-jump-191a35e2746). Another is electronic discovery, also known as eDiscovery, which is a legal process of collecting digital records that may be relevant to a case. We cover eDiscovery [in Domain 6.1](https://destcert.com/resources/ccsp-domain-6-legal-risk-and-compliance/#t-1671568501513).

There’s also **knowledge discovery in databases (KDD)**, which some sources refer to as **data discovery**. In essence, the field of study “…is concerned with the development of methods and techniques for making sense of data…”. I**t aims to take the large volumes of low-level data that we typically struggle to make sense of and produce something more digestible and coherent like graphs, other visuals, statistics and reports**. When the process is applied on large amounts of company data, it can give us valuable insights from which we can then make business decisions and predictions.

Below are some important terms that you should be aware of:

|   |   |
|---|---|
|**Knowledge discovery in databases (KDD)  <br>**|A process that allows us to **extract useful insights from large volumes of low-level data**. Some sources may refer to this as data discovery, or just discovery.|
|**Data mining  <br>**|A step of the KDD process that involves **looking for patterns within data**.|
|**Business intelligence**|A set of strategies, technologies and capabilities that allow businesses to **collect data, analyze it, and gain new insights**. These insights can help organizations improve their decision-making.|
|**Data warehouse**|A system for **storing business intelligence data and facilitating its use**. They are central repositories that store and integrate data from a range of sources. Organizations can then perform data mining and other types of analysis on the data stored in their warehouse. The data stored in a data warehouse is generally structured, allowing for quick and easy analysis.|
|**Data lake**|A data lake is also a repository for an organization’s data. However, they are **used to store data as is, including structured, semi-structured and unstructured data**. Data in data lakes can be processed with techniques like machine learning. Organizations will often first store their raw data in a data lake, then analyze and process it, before moving some of this processed data into their data warehouses, where it can be used for business intelligence and other activities.|

**繁體中文重點：** Data discovery 依脈絡有不同意思：盤點重要資料（見 2.3）、法律程序的 eDiscovery（見 6.1），以及 knowledge discovery in databases（KDD）。

| 名詞 | 記憶重點 |
|---|---|
| KDD | 從大量低階資料萃取可用洞察 |
| Data mining | KDD 中尋找 pattern 的步驟 |
| Business intelligence | 蒐集、分析資料以輔助決策的策略與技術 |
| Data warehouse | 集中存放整合後的資料，通常為結構化，利於快速分析 |
| Data lake | 以原始形式存放結構化、半結構化與非結構化資料；常先入 lake，處理後再進 warehouse |

### **Structured data  
**

Structured data is **data that has been organized according to a consistent structure**. Data is placed into structures so that it can be analyzed and used more efficiently. Keeping this data in a consistent format with unique identifiers makes it much easier to work with than if it was all thrown into a text file haphazardly.

![Image of structed vs. unstructured data - Destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/structured-vs-unstructured-data.webp "structured-vs-unstructured-data")

By its nature, **it’s generally much easier to perform data mining and related tasks on structured data than on data that lacks structure**. It also makes the discovery phase of data loss prevention much more straightforward. If all of your organization’s sensitive information like PHI and PII is already structured carefully in databases, it’s a lot easier for you to find and secure it.

**繁體中文重點：** 依一致結構組織的資料，配合唯一識別值，較易進行 data mining，也讓 DLP 的 discovery 更直接；PHI、PII 若已結構化存放，也更容易定位與保護。

### **Unstructured data  
**

Unstructured data is data that **hasn’t been organized into a consistent structure. It's generally harder to identify, analyze and use unstructured data**, but there are still a variety of techniques for doing so. One example is pattern analysis, where you automatically search for patterns within the unstructured data, such as phone numbers or common syntax.

When performing the discovery phase of data loss prevention, **you need to pay special attention to your unstructured data, because it’s much more difficult to process it, and it’s a lot easier for sensitive information to fall through the cracks**.

**繁體中文重點：** 沒有一致結構的資料，較難識別與分析，可用 pattern analysis 等方法處理。DLP discovery 要特別留意這類資料，敏感資訊最容易在此漏網。

### **Semi-structured data  
**

**Semi-structured data involves some structure**, but not in the form of a consistent database. Instead, it **uses tags or other labels**. This allows the data to be stored in an unstructured way, while still making it easy to parse specific attributes of the data. Common examples of semi-structured data are XML and JSON.

**繁體中文重點：** 不具一致的資料庫結構，但以 tag 或 label 提供部分結構，便於解析特定屬性；常見例子為 XML、JSON。

### **Data location  
**

The location of your data is critical for all phases of DLP. You must be able to discover, monitor and enforce your security policy on all of your company’s sensitive data. This is particularly challenging in the cloud landscape, because many cloud services—especially SaaS and PaaS—won’t give you the control you need to do so. In these cases, you will need to ensure that your contract specifies that the cloud provider will have the right security controls in place to keep your data adequately protected and meet your compliance obligations.

**繁體中文重點：** 資料位置影響 DLP 所有階段。SaaS、PaaS 往往無法提供足夠控制權，此時要透過合約要求 provider 落實適當控制並滿足合規義務。

---

## **2.5 Plan and implement data classification**  

### **Data classification policies  
**

**Classification** involves establishing classes for different types of data. **Categorization** is the process of sorting data into these classes. **Data classification policies** are an organization’s way of stipulating the classes, and how classified data should be controlled.

When a classification system is in place, **it gives an organization a simple, quick and uniform way to decide on and implement various security controls for different types of data**. Once data is assigned to a class, it is marked or labeled (we discuss labeling in further detail below) accordingly, which notifies humans and automated systems about how the data must be protected.

How you classify data will depend on the individual circumstances of your organization. If it collects and processes specific types of regulated data like protected health information (PHI), or credit card details, then your organization will need to class this data accordingly and make sure that the security controls meet the HIPAA or PCI DSS requirements, respectively.

**繁體中文重點：** Classification 是建立類別，categorization 是把資料歸入類別，classification policy 則規定類別與控管方式。分類後可快速一致地決定控制措施，並透過標記讓人員與系統知道如何保護。分類依組織情況而定，例如處理 PHI 或信用卡資料就須對應 HIPAA 或 PCI DSS。

### **Data mapping  
**

Data mapping is a process of matching and integrating data from different sources. Different departments and organizations will use data in different forms to meet their needs. When data is shared between these entities, it may need to be restructured and standardized in order to make it useful.

**繁體中文重點：** 比對並整合不同來源的資料。各部門與組織使用的資料形式不同，共享時常需重新結構化與標準化。

### **Data labeling  
**

When data is classified, information about its class should be included in a label that is somehow attached to it. The label needs to clearly communicate the data’s class so that people and systems know how it must be handled.

- Security label - Labels are **machine readable** and link security attributes to data.
- Security marking - Markings are **human readable** and are often placed on storage media like hard drives and flash drives.

Labels should indicate the information’s class and other important information without divulging the sensitive information itself. Information that can be included in labels includes:

|   |   |
|---|---|
|**Class**|The **classification level of the data**. This will be dictated by the type of data and its sensitivity.|
|**Date**|This may include the **creation and any modification dates**. If data needs to be retained for a certain period of time, the **retention date** can also be included, as can **scheduled dates** of destruction.|
|**Owner of the data**|This is generally done by **including the owner’s role or office rather than their legal name**.|
|**Source of the data**|**Where the data came from.**|
|**Jurisdiction and regulatory requirements**|Which region’s regulatory body the data may be subject to, and **which regulatory requirements it must meet**.|
|**Access**|**Who is authorized to access the data** and under which circumstances.|
|**Security controls**|The label may include information **about how the data must be handled and protected**.|

**繁體中文重點：**

- Security label 為機器可讀，連結安全屬性與資料；security marking 為人可讀，常貼在硬碟、隨身碟等媒體上。
- Label 要傳達類別與處理方式，但不可洩漏敏感內容本身。
- 可包含的資訊：class、date（建立、修改、保留、排定銷毀）、owner（通常寫角色或部門而非本名）、source、jurisdiction 與法規要求、access、security controls。

#### Metadata

The classic explanation of metadata is that it’s data about data. **Metadata is a collection of characteristics about a given piece of data**, and it can include a wide range of things. These depend on the context, but examples include:

- The time and date that data was created or modified.
- The field length.
- The format of the data.
- Who created the data.
- Data labels.
- Context specific traits such as the location at which a photo was taken, as well as the type of camera.
- Many other characteristics.

**繁體中文重點：** Metadata 是描述資料的資料，依脈絡可含建立或修改時間、欄位長度、格式、建立者、label，以及照片拍攝地點與相機型號等特定屬性。

---

## **2.6 Design and implement information rights management (IRM)  
**

**Information rights management (IRM)** tools protect an organization’s valuable data. They include mechanisms that can prevent unauthorized viewing, modifying, copying, printing, forwarding or deleting files and other information. A good example are the user, group, or file-level IRM protections that can be implemented to protect sensitive documents in Microsoft 365. IRM aims to keep an organization’s sensitive information confidential.

IRM contrasts with **digital rights management (DRM)**, which involves using similar technology to protect an organization’s copyrighted material, such as movies or software. It is generally used to prevent people from accessing copyrighted works without paying for a license.

**繁體中文重點：** IRM 防止未授權檢視、修改、複製、列印、轉寄或刪除，目標是保護組織的敏感資訊，例如 Microsoft 365 的文件保護；DRM 技術相近，但用於保護電影、軟體等著作，防止未付費存取。

#### Types of intellectual property

In addition to sensitive data like personally identifiable information (PII) and protected health information (PHI), your organization may also have to protect its **intellectual property (IP)**.

**The Common Types of IP**

|**Type of IP**|**What is it?**|**Term of protection**|
|---|---|---|
|**Trade secrets**|An organization’s trade secrets are varying **types of IP that are economically valuable because they aren’t widely known outside the organization**. An organization does not have to disclose them to any regulatory body. However, if others discover the trade secret for themselves, there are no protections that stop them from using it.|**Potentially infinite**. They generally last until the trade secret is publicly exposed.|
|**Patents**|Filing a patent can **prevent others from also building, selling or using an invention for a set number of years**. Patents must be applied for and publicly disclosed, but they give the patentee the right to sue others who infringe on the patent.|**A set period of time.**|
|**Copyright**|**Copyright grants the owner the right to copy a creative work**. It’s a protection granted to original expressions of ideas, and is a pillar of industries like film, music, books and software.|**A set period of time.**|
|**Trademarks**|**A design, logo or other expression (such as a unique combination of colors, symbols, fonts, etc.) that distinguishes a brand, service or product from others**. Trademarks can be established through use, or by applying to a registry, although the details are jurisdiction-dependent.|**Potentially infinite.**|

**繁體中文重點：**

| 類型 | 記憶重點 | 保護期間 |
|---|---|---|
| Trade secrets | 因不為外界所知而具經濟價值，無須向主管機關揭露；他人自行發現則無法阻止使用 | 可能無限期，至公開為止 |
| Patents | 須申請並公開，在一定年限內阻止他人製造、販售或使用發明 | 固定期間 |
| Copyright | 保護創意作品的表達，賦予重製權 | 固定期間 |
| Trademarks | 區別品牌、服務或產品的設計、標誌等；可因使用或註冊而成立，細節依管轄地而異 | 可能無限期 |

### **Objectives  
**

Although DRM is important for business-to-consumer companies, our main concern is enterprise-grade IRM, which involves **implementing techniques that facilitate the authorized sharing of company data, while attempting to limit unauthorized access**.

IRM tools aren’t necessarily bulletproof, and there may be ways around them. A restricted PDF may allow users to read it while preventing them from directly copying it, however, there is no physical limitation that could prevent a user from taking a photo of the document and obtaining a copy that way.

The CCSP exam outline includes three information rights management objectives:

|   |   |
|---|---|
|**Data rights**|An authorized user’s data rights are t**he permitted actions that they can take in relation to a given asset**. Common rights can include things like **creating, viewing, modifying, copying, printing, forwarding and deleting**.|
|**Provisioning**|Provisioning involves **determining and maintaining which rights a given user should have**. It should follow the principle of least privilege and only permit access to information and assets that the user requires in order to effectively complete their tasks.|
|**Access models**|**You need to consider the model through which sensitive data and files will be accessed**. One example involves encrypting files and then only sharing the keys with authorized users. Another option is to use web applications that can administer more granular access.|

**繁體中文重點：** Enterprise IRM 的目的是允許授權分享，同時限制未授權存取；工具並非萬無一失，例如受限 PDF 仍可被拍照。CCSP outline 的三項目標：

| 目標 | 記憶重點 |
|---|---|
| Data rights | 使用者對資產可執行的動作（建立、檢視、修改、複製、列印、轉寄、刪除） |
| Provisioning | 決定並維護使用者的權利，遵循 least privilege |
| Access models | 敏感資料的存取方式，例如加密後只發金鑰給授權者，或透過可細緻控管的 web 應用 |

### **Appropriate tools  
**

**IRM tools give organizations a way to allow authorized access to sensitive information, while putting barriers in place that restrict unauthorized access and use**. They are important tools for helping to enforce an organization’s security policies.

Microsoft’s SharePoint is a cloud platform offering IRM capabilities that many of us are familiar with. Once the _Rights Management_ has been set up, you can assign usage restrictions that allow you to restrict file access to authorized individuals. You can impose additional restrictions, such as making a file read-only, preventing users from printing, or disabling them from copying files.

There are a number of different techniques for IRM enforcement. Online reference checks might require users to enter a key in order to access the resource. One option for controlling access to files on endpoints is for users to install a local IRM agent on their computers and devices. This gives the user a way to authenticate themselves to the local agent, which can check to determine whether a user is currently authorized to access a resource.

**繁體中文重點：** IRM 工具協助執行安全政策。SharePoint 的 Rights Management 可限制授權對象，並設定唯讀、禁止列印或複製。常見執行方式有 online reference check（輸入金鑰才能存取）與 endpoint 上的 local IRM agent（驗證身分後判斷是否授權）。

#### Certificates

Certificates play an important role in our identity infrastructure. **They provide a way to verify the identities of organizations and users**. We discuss how they work in more detail in [Domain 4.6](https://destcert.com/resources/domain-4-cloud-application-security/#t-1725895334957). In short, they involve a trusted central body that validates the identities of each entity and issues them certificates. If someone trusts the central body and its processes, and a user’s certificate is legitimate, then that person can infer that the user is actually who they say they are. IRMs generally use certificates as a means of identifying and authenticating users and other entities.

**繁體中文重點：** 憑證由受信任的中央機構驗證身分後核發，讓依賴方得以確認組織或使用者身分；IRM 通常以憑證進行識別與驗證。細節見 Domain 4.6。

---

## **2.7 Plan and implement data retention, deletion and archiving policies**  

When data falls out of active use, your organization must decide what it will do with the data: Will it destroy it or keep it around?

There are two major reasons to retain data for long periods of time. One is that **there are legal obligations in place, such as requirements to keep certain financial or health records for a set period**. Another reason is because the **data may still be valuable to the organization**. Organizations need security policies for data retention, deletion and archiving. These need to take compliance obligations into account, and also balance the value that data holds for an organization against the costs of keeping it and securing it.

**繁體中文重點：** 資料不再活躍使用時，須決定銷毀或保留。長期保留的兩大理由是法律義務（如財務、醫療紀錄）與資料仍有價值。相關政策要納入合規義務，並權衡資料價值與保存、保護成本。

### **Data retention policies  
**

**Your organization’s data retention policy is concerned with the data that it must keep to meet its regulatory obligations**. Common examples of data that you may need to retain for a set period of time include health and financial information. The specific types of data and the length of time will vary according to jurisdiction. Your organization may also be required to destroy certain types of data it retains within a specific timeframe. It needs to have both the policy and mechanisms in place to ensure that this is accomplished on time, using an appropriate method (we discuss the options in the Data deletion procedures and mechanisms section below).

Your organization’s policy and systems will also need to **make allowances for legal hold (see the Legal hold section below), which may take precedence over your normal regulatory obligations**. If the normal retention period expires while data is still on legal hold, you need to have procedures in place to preserve the data. The policy will need to be reviewed, enforced, and updated over time. Some of the most important considerations of a data retention policy include:

- Regulatory requirements
- Security requirements
- Retrieval access requirements
- Legal hold

**繁體中文重點：** Retention policy 處理為符合法規而必須保留的資料，類型與年限依管轄地而異；部分資料也可能須在期限內銷毀，因此政策與機制都要到位。Legal hold 可能優先於一般法規義務，保留期屆滿時仍須保存。主要考量：法規要求、安全要求、取回存取要求、legal hold。

#### Data retention challenges

It's possible to store data you are legally required to retain on your organization’s own servers, but cloud storage options can have a number of benefits. **They can often be easier and cheaper than buying, setting up, maintaining and securing all of the hardware in-house**. Cloud services are off-premises solutions, which are useful for your backups as [part of your business continuity](https://destcert.com/resources/business-continuity-management-mindmap-ccsp-domain-3/) and disaster recovery strategy.

**You also still need to consider data security even when data is archived**, and your organization’s **data retention system also needs auditing mechanisms in place**. Your company will also need backups of the data it is required to retain.

**繁體中文重點：** 雲端儲存通常比自建更省事省錢，異地特性也有利於 BC/DR。歸檔後的資料仍要保護，保留系統需要稽核機制，應保留的資料也要有備份。

### **Data deletion procedures and mechanisms  
**

The exam outline refers to data deletion, most likely in the casual sense of the word. But we’re going to have to nitpick, because deletion is a specific process of removing files from a file system. In a technical sense, deleting a file just involves removing the reference to it—the data is still right where it was.

We’re going to deviate a little from the exam outline and cover media sanitization here. The exam outline covered this in [Domain 1.3](https://destcert.com/resources/domain-1-cloud-concepts-architecture-and-design/#t-1671570543516), but we decided to save it for later so that we could cover some of the fundamentals first. Our bible for media sanitization is [NIST Special Publication 800-88: Guidelines for Media Sanitization](https://csrc.nist.gov/pubs/sp/800/88/r1/final). To give a simple definition, media sanitization involves **three different categories of making data difficult to retrieve or reconstruct. Clearing, purging and destroying data are methods that vary in just how difficult they make it to recover data**.

When sanitizing data, your organization should either **clear, purge or destroy it**. The specific category you choose will depend on the sensitivity of the data and a number of other factors.

**Categories of Data Sanitization**

|**Category**|**NIST Special Publication 800-88 definition**|**Plain English**|
|---|---|---|
|**Clear**|Clear applies logical techniques to sanitize data in all user-addressable storage **locations for protection against simple non-invasive data recovery techniques**.|In other words, clearing **gets rid of the data, but in ways that may allow attackers to recover it.** Examples can include reformatting, overwriting and erasure.|
|**Purge**|Purge applies physical or logical techniques that **render Target Data recovery infeasible using state of the art laboratory techniques**.|Purging techniques are sanitization methods that **do not allow the data to be recovered using current techniques and technology**. Some more advanced forms of clearing can be considered purging techniques. Some forms of purging may also be considered methods of destruction. Examples of purging can include overwriting, erasure, cryptographic erase, and degaussing.|
|**Destroy**|Destroy renders Target Data recovery infeasible using state of the art laboratory techniques **and results in the subsequent inability to use the media for storage of data**.|Data destruction involves d**estroying the storage device so that it cannot be reused**. When a storage device has been appropriately destroyed, the data is also considered purged. Examples of destruction techniques can include incinerating, pulverizing, disintegrating, shredding and degaussing.|

**Sanitization Methods from Best to Worst**

![Image of sanitization methods from best to worst - destination Certification](https://151060567.v2.pressablecdn.com/wp-content/uploads/2024/08/sanitization-methods-from-best-to-worst.webp "sanitization-methods-from-best-to-worst")

**繁體中文重點：** 技術上「刪除」只是移除檔案參照，資料仍在原處。本節依 NIST SP 800-88 介紹 media sanitization，選擇依資料敏感度等因素決定：

| 類別 | 核心差異 | 例子 |
|---|---|---|
| Clear | 邏輯技術，防簡單的非侵入式復原；可能仍可被復原 | reformatting、overwriting、erasure |
| Purge | 即使以現代實驗室技術也無法復原 | overwriting、erasure、cryptographic erase、degaussing |
| Destroy | 同樣無法復原，且媒體無法再使用 | incinerating、pulverizing、disintegrating、shredding、degaussing |

#### Clear

Techniques that can fall into the clear category include:

- **Deletion** – In many systems, deleting a file simply removes the link to it, with the actual data remaining exactly where it was.
- **Overwriting** – This involves writing over the old data with new data. Even though new data is in place of the old data, there are techniques that may be able to recover the old data in certain situations.
- **Erasure** – This is a method of overwriting that involves replacing the existing data on a storage device with zeros or ones. It’s also often called wiping.
- **Reformatting** – Reformatting is the process of putting an empty file system on a new storage device.

**繁體中文重點：** Deletion（只移除連結）、overwriting（以新資料覆寫，舊資料在特定情況可能復原）、erasure／wiping（以 0 或 1 覆寫）、reformatting（建立新的空檔案系統）。

#### Purge

Techniques for purging can include overwriting, erasure and cryptographic erasure, which is also known as cryptoshredding. We discuss cryptographic erasure in more detail later in this section.

You may have noticed that we also mentioned overwriting and erasure as clear techniques. This is because there are many different strategies for overwriting and erasure. Some of these will fall under the clear category because they only provide “…protection against simple non-invasive data recovery techniques”. Others will be considered purging techniques because they _“…render Target Data recovery infeasible using state of the art laboratory techniques”_. Essentially, **the distinction between clearing and purging comes down to how difficult it is to recover data**.

Another type of sanitization that can also be considered purging is **degaussing**. It involves altering the magnetic field of a magnetic storage device such as a hard disk drive or a floppy disk. Degaussing can randomize the data, making the original data unrecoverable.

**繁體中文重點：** 包含 overwriting、erasure、cryptographic erasure 與 degaussing（改變磁性媒體的磁場使資料隨機化）。Overwriting 與 erasure 同時出現在 clear 與 purge，因為策略強度不同；兩者的分界在於資料復原的困難度。

#### Destroy

**When you destroy data, you essentially break the storage device so that it cannot be reused**. Methods of destruction include:

- **Disintegrate, pulverize, melt and incinerate**
- **Shred**

**繁體中文重點：** 破壞儲存裝置使其無法再用，方法包括 disintegrate、pulverize、melt、incinerate 與 shred。

#### Cryptographic erasure (cryptoshredding)

**Cryptographic erasure, also known as cryptoshredding, is a specific method of purging data**. However, we have given it its own dedicated section because it is particularly important in the cloud. This is because it’s generally not possible to implement destruction techniques on data stored by a cloud provider, which often makes cryptoshredding your organization’s best option. To put it in simple terms, **cryptoshredding essentially involves encrypting data and securely purging the key**. If neither you nor anyone else has the key, then no one can access the data unless they break the algorithm.

**繁體中文重點：** Cryptoshredding 屬於 purge 的一種：加密資料後安全清除金鑰，除非破解演算法，否則無法存取。雲端通常無法對 provider 的媒體實施實體銷毀，因此它往往是最佳選項。

#### Policies and procedures for media sanitization

Once your data is no longer in active use, it must be either **archived, disposed of, or sanitized**. We will discuss archiving in the following section. Unsanitized data should only be disposed of if its exposure would not negatively impact the organization or others.

Your organization may destroy or sanitize data because the legal retention periods have expired. It may also be legally mandated to destroy or sanitize data after a certain time limit, or because of a customer request. Another reason is that it may not consider the data to have a large enough future value to justify the storage and security costs. Whenever your organization destroys or sanitizes data, it must be done securely and in a way that meets any applicable regulatory requirements.

**繁體中文重點：** 資料停用後應 archive、dispose 或 sanitize；未經 sanitize 就棄置，僅限外洩不會造成負面影響的資料。銷毀或 sanitize 的原因可能是保留期屆滿、法律要求、客戶要求，或資料價值不足以支撐成本；過程須安全且符合法規。

### **Data archiving procedures and mechanisms  
**

As previously mentioned, **data archiving is a process for the long-term storage of data that’s not in active use**. Basically, you still have the data kicking around somewhere, but it’s a little more difficult to get than your data that is in active use. The reason we archive data that’s not in active use is because it’s much cheaper to store it this way. While the storage is cheap, there are additional costs to retrieve it, so you need to keep these in mind whenever you plan to archive data.

We mostly archive data that’s not in active use because:

- **It may have long-term value**.
- There are **legal obligations** that require us to keep it for a set period of time.
- It’s a **cheap way to store backups**.

Archiving is the fifth phase of the data life cycle, but we need to have policy and procedures ready before we even collect and store the data. Your organization’s archiving policy needs to account for the various regulations it must meet, the sensitivity of various classes of data, and the appropriate security controls that must be put into place. It also needs procedures for when and how data must be destroyed or sanitized.

**繁體中文重點：** Archiving 是將非活躍資料長期存放，儲存便宜但取回較慢且可能另計費。理由包括長期價值、法律義務與低成本備份。Archive 雖是生命週期第五階段，但政策與程序應在蒐集資料之前就備妥，涵蓋法規、敏感度、控制措施，以及銷毀或 sanitize 的時機與方式。

### **Legal hold  
**

Your organization may find itself involved in a legal case at some stage. When this happens, **the surrounding investigation may involve electronic discovery, which is also known as e-discovery**. We dive into e-discovery in more depth in [Domain 6.1](https://destcert.com/resources/ccsp-domain-6-legal-risk-and-compliance/#t-1671568501513), however, we will cover it briefly here as it relates to data retention, destruction and archiving.

The simple explanation is that **your organization may be compelled to find, collect and provide data related to the legal case. It may also be prevented from sanitizing certain data. Data relevant to the case is subject to what’s known as _legal hold_, and it’s your organization’s responsibility to have the mechanisms in place to be able to preserve and provide the appropriate data**. This will generally mean that your organization needs to have these capabilities in place prior to ever being involved in a case.

**繁體中文重點：** 涉訟時組織可能須透過 e-discovery 找出、蒐集並提交資料，相關資料也可能被禁止 sanitize，即 legal hold。組織有責任保存並提供這些資料，因此相關能力要在涉訟之前就建立。

---

## **2.8 Design and implement auditability, traceability and accountability of data events**  

Auditing is one important yet underappreciated aspect of securing our data and meeting our compliance obligations. If we take logs of who accesses our sensitive data, when they do it, and what they do with it, then we have an audit trail. If there is a data breach or another security incident, then we may be able to trace back through the logs and determine the responsible party. We can then take action to hold them accountable. In addition to acting as a security control, auditing data can help your organization meet its compliance requirements.

On top of logging the access and use of your organization’s data, your organization will also want to record and analyze a range of other information. This can include logging traffic, events and other details from a range of different sources. Your organization will need a policy for how it logs and audits access to its data. The policy should determine the scope, the frequency of reviews, procedures, relevant regulation, as well as having procedures for monitoring and enforcement.

**繁體中文重點：** 記錄誰在何時存取敏感資料、做了什麼，就形成 audit trail，事件發生時可回溯並究責，也有助於合規。日誌與稽核政策應界定範圍、審查頻率、程序、適用法規，以及監控與執行方式。

### **Definition of event sources and requirement of event attributes  
**

**Logs are just records of events, while events are simply activities recognized by a system. Events may be triggered by users, external systems, or the system itself**. When it comes to security, we want to keep logs of relevant activities, such as which users are accessing sensitive data, and which users are performing suspicious actions. Here are important event attributes:

|   |   |
|---|---|
|**Identity**|This is often a **user ID or a username if it represents a human use**r. In the case of a system or service’s identity, it could be some other type of ID number.|
|**IP address**|Another important event attribute is the I**nternet Protocol (IP) address of the user, system or service**.|
|**Geolocation**|Geolocation is another useful event attribute to log. The best way of geolocating someone is **through the exact latitude and longitude of their GPS data. If GPS data is unavailable, IP addresses can be used as an indicator of where someone is located**. However, VPNs can prevent you from knowing someone’s true IP, which is why GPS is the preferred method.|

On top of these attributes, each event should be logged with an event ID and other pertinent information, which will vary according to the type of event.

**繁體中文重點：** Log 是事件紀錄，event 是系統辨識到的活動，可由使用者、外部系統或系統本身觸發。重要屬性：Identity（user ID 或服務 ID）、IP address、Geolocation（GPS 優先；無 GPS 時可用 IP 推估，但 VPN 會隱藏真實 IP），另應有 event ID 與該事件類型的相關資訊。

### **Logging, storage and analysis of data events  
**

Not only does your organization need to record event logs, but it also needs to have capabilities for storing and analyzing the data. Your organization will have seemingly countless streams of data from its users, apps, infrastructure and other systems. The sheer volume makes it incredibly hard to stay on top of.

Some unauthorized activities may not be immediately obvious, and **your organization needs tools to help it analyze data and flag potential threats**. Security information and event management (SIEM) systems are some of the most important tools because they can store log data, analyze it, and send alerts regarding potential threats. SIEMs are critical for monitoring and incident response, and we discuss them in more detail in [Domain 5.6](https://destcert.com/resources/domain-5-cloud-security-operations/#t-1725895334957).

**繁體中文重點：** 除了記錄，也要能儲存與分析。資料量龐大，部分未授權活動不易察覺，SIEM 可儲存日誌、分析並發出威脅告警，對監控與 incident response 至關重要。細節見 Domain 5.6。

#### Auditing and logging challenges in the cloud

The cloud environment offers some challenges when it comes to recording and analyzing logs. Due to the limited access that a cloud customer has under the cloud model, they will be restricted in terms of what information they can collect. This is most prominent in SaaS, where customers have very little control. It’s less of an issue at the other end of the spectrum, IaaS, where customers have greater responsibilities and access.

Another challenge comes when using multiple cloud providers for various aspects of your business. Your SIEM will need to correlate and analyze these separate logs together, in order to get a cohesive picture of your company’s overall security posture.

**繁體中文重點：** Customer 能蒐集的資訊受服務模式限制：SaaS 最受限，IaaS 較少受限。使用多家 provider 時，SIEM 還要關聯分析不同來源的日誌，才能掌握整體安全狀態。

### **Chain of custody and non-repudiation  
**

One important role of logging is to provide a trail of evidence for investigations. If your organization falls victim to an incident that merits either criminal or civil legal action, then your organization’s logging and auditing procedures will need to hold up in court. One important element of this is the concept of **repudiation**. A system with in-built non-repudiation will have mechanisms that **prevent someone from performing an action and then being able to plausibly claim afterward that they were not responsible**. Non-repudiation is often accomplished by implementing digital signatures that are signed with an actor’s private key.

Another method is through **chain of custody**. In a legal case, **chain of custody gives us a way to prove that our evidence is legitimate**. It’s essentially **a set of documentation that records the chronological order of how evidence has been collected, preserved, analyzed and provided to the courts so that the evidence maintains its integrity**.

**繁體中文重點：** 日誌可作為調查證據，因此須經得起法庭檢驗。Non-repudiation 讓行為者事後無法合理否認，常以 private key 數位簽章實現。Chain of custody 依時間順序記錄證據如何被蒐集、保存、分析與提交法院，以維持證據完整性。

---

## **CCSP Domain 2 key takeaways**

**Note:** Some of the concepts introduced in this domain are discussed in greater detail in subsequent domains. For these topics, we've provided references to their corresponding domains within the relevant sections above. As these topics are explored more thoroughly elsewhere, they are not included in the Key Takeaways for this domain.

**繁體中文重點：** 以下是各小節摘要；在其他 domain 詳述的主題不列入。

### **2.1 Describe cloud data concepts  
**

**The CIA triad**

- Confidentiality means keeping data a secret from everyone except for those who we want to access it.
- Integrity means that data hasn’t become corrupted, tampered with, or altered in an unauthorized manner.
- Availability means that data is readily accessible to authorized parties when they need it.

**Cloud data life cycle phases**

- The six phases of the data life cycle:

- Create
- Store
- Use
- Share
- Archive
- Destroy

**Data dispersion**

- Data dispersion splits data into fragments using cryptographic bit-splitting.
- It can improve security and resiliency.

**Data flows**

- Understand how data flows through an organization.
- Data flow diagrams map out your organization’s architecture and how data flows through it.

**繁體中文重點：** CIA 三要素；生命週期六階段 Create → Store → Use → Share → Archive → Destroy；data dispersion 以 bit-splitting 提升安全與韌性；data flow diagram 用來掌握架構與資料流向。

### **2.2 Design and implement cloud data storage architectures  
**

**Storage types**

- We discuss this topic in [section 3.1](https://destcert.com/resources/domain-3-cloud-platform-and-infrastructure-security/#t-1671568501513)

**繁體中文重點：** 儲存類型見 Domain 3.1。

### **2.3 Design and apply data security technologies and strategies  
**

**Encryption and key management**

- Please refer to [section 2.3](https://destcert.com/resources/domain-2-cloud-data-security/#tve-jump-1931ae7aa7f) above for the corresponding domain where this topic is discussed in greater detail.

**Hashing**

- Please refer to [section 2.3](https://destcert.com/resources/domain-2-cloud-data-security/#tve-jump-1931ae898ff) above for the corresponding domain where this topic is discussed in greater detail.

**Data obfuscation**

- Masking – a set of techniques to conceal or substitute sensitive data.
- Anonymization – A process of removing identifying information from data sets.

**Tokenization**

- Tokenization involves using a token in the place of sensitive data.
- It can help to limit the opportunities for data exposure

**Data loss prevention (DLP)**

- Discovery
- Monitoring
- Enforcement

**Keys, secrets and certificate management**

- Please refer to [section 2.3](https://destcert.com/resources/domain-2-cloud-data-security/#tve-jump-1931ae97d2e) above for the corresponding domain where this topic is discussed in greater detail.

**繁體中文重點：** Masking 隱藏或替換敏感資料；anonymization 移除識別資訊；tokenization 以 token 取代敏感資料以減少暴露；DLP 三功能為 discovery、monitoring、enforcement。加密、hashing 與金鑰管理見其他小節。

### **2.4 Implement data discovery  
**

- Data discovery can have several different meanings, depending on the context
- Organizations collect vast streams of data for data mining and business intelligence. These large quantities of data have impacts on DLP, because there is much more information to discover, monitor and enforce.

**Structured data**

- Structured data is data that has been organized with a consistent structure, such as a database of user records.

**Unstructured data**

- Unstructured data doesn’t have a consistent structure.
- Examples include emails, videos and pictures.

**Semi-structured data**

- Semi-structured data uses tags or labels to give it some structure.

**Data location**

- The location of data can impact security and compliance.

**繁體中文重點：** Data discovery 依脈絡有多種意思；大量資料也擴大 DLP 的探索、監控與執行範圍。區分結構化、非結構化（email、影片、圖片）與半結構化（tag、label）；資料位置影響安全與合規。

### **2.5 Plan and implement data classification  
**

**Data classification policies**

- Classification is the process of establishing classes for different types of data, while categorization is the process of sorting data into these classes.
- Data classification policies vary according to context. Important considerations include:

- The value and sensitivity of data.
- The type of data.
- Regulatory obligations.
- Ownership
- Who is authorized to use it.

**Data mapping**

- Data mapping is used to match fields in different databases.

**Data labeling**

- Labels are machine readable and link security attributes to data.
- Markings are human readable and are often placed on storage media like hard drives and flash drives.
- Metadata is data about data.

**繁體中文重點：** Classification 建立類別，categorization 歸類；政策考量包括價值與敏感度、資料類型、法規義務、所有權與授權使用者。Data mapping 比對不同資料庫的欄位。Label 機器可讀，marking 人可讀，metadata 是描述資料的資料。

### **2.6 Design and implement information rights management (IRM)  
**

- IRM tools protect an organization’s data by providing mechanisms that prevent unauthorized viewing, modifying, copying, printing, forwarding or deleting.
- DRM tools protect an organization’s data by preventing people from accessing copyrighted works unless they pay for licensing.

**Types of intellectual property**

- Trade secrets – Types of IP that are economically valuable because they aren’t widely known outside the organization.
- Patents – Patents prevent others from also building, selling or using an invention for a set number of years.
- Copyright – Copyright grants the owner the right to copy a creative work.
- Trademarks – Trademarks are designs, logos or other expressions that distinguish a brand, service or product from others.

**Objectives**

- Data rights – The permitted actions that an authorized user can take in relation to a given asset.
- Provisioning – Involves determining and maintaining which rights a given user should have
- Access models – The way that sensitive data is accessed.

**Appropriate tools**

- IRM systems often use online reference checks or local IRM agents to determine whether a user is authorized to access a resource.

**Certificates**

- Certificates give IRMs a trusted way to verify the identities of organizations and users.
- Certificates can be granted and revoked as necessary.

**繁體中文重點：** IRM 防止未授權操作，DRM 防止未付費存取著作。智慧財產分為 trade secret、patent、copyright、trademark。三項目標為 data rights、provisioning、access models；常用 online reference check 或 local IRM agent，並以憑證驗證身分（憑證可依需要核發與撤銷）。

### **2.7 Plan and implement data retention, deletion and archiving policies  
**

**Data retention policies**

- Data retention policies set out how organizations must retain certain types of data in order to meet their regulatory obligations.
- Data retention policies vary according to context, but they can include things like the type of data, the length of time it must be kept, and how it must be destroyed when it is no longer needed.

**Data retention challenges**

- Data that you retain still needs to be appropriately secured.
- Regularly tested backups are essential.
- Your data retention system needs to be audited.
- If data is stored for a long period of time, you need to consider how you will continue to both secure and access it, even as technologies change.

**Data deletion procedures and mechanisms**

- Media sanitization is the process of securely disposing of data when it reaches the end of its lifecycle
- Media sanitization includes:

- Clearing
- Purging
- Destroying

- We often use cryptoshredding in the cloud, because we do not have access to the physical media

**Data archiving procedures and mechanisms**

- We archive data when it’s no longer in active use but we still wish to retain it.
- Data is often archived in slow yet low-cost storage services.
- The main reasons we archive data are when there are legal requirements to retain it, or if we expect the data to have value in the future.

**Legal hold**

- When an organization becomes involved in a legal case, data relevant to the case may be subject to legal hold.
- Your organization is responsible for having mechanisms in place to preserve and provide data that is subject to legal hold.

**繁體中文重點：** Retention policy 依法規規定保留類型、年限與銷毀方式；保留資料仍需保護、定期測試備份並接受稽核，也要考慮技術演進後能否繼續存取。Media sanitization 分 clear、purge、destroy；雲端因無法接觸實體媒體，常用 cryptoshredding。Archive 多用低價慢速儲存；涉訟資料可能受 legal hold 約束，組織須有保存與提供的機制。

### **2.8 Design and implement auditability, traceability and accountability of data events  
**

**Definition of event sources and requirement of event attributes**

- Event attributes include:

- Identity – Who an entity is.
- IP address – Can help you narrow down someone’s location and possibly their identity.
- Geolocation – Can indicate where someone is.

**Logging, storage and analysis of data events**

- The large volume of data that most organizations have can make it difficult to log, store and analyze events.
- SIEM systems can help you analyze large volumes of data.

**Chain of custody and non-repudiation**

- Repudiation is essentially the ability to deny that you were responsible for an action.
- The property of non-repudiation means that someone cannot plausibly deny their responsibility for an action that they conducted.
- Chain of custody is essentially a set of documentation that records the chronological order of how evidence has been collected, preserved, analyzed and provided to the courts so that the evidence maintains its integrity.

**繁體中文重點：** 事件屬性包括 identity、IP address、geolocation；SIEM 協助分析大量資料。Repudiation 是否認責任的能力，non-repudiation 使其無法合理否認；chain of custody 依時序記錄證據處理過程以維持完整性。

---

## **Preparing for CCSP Domain 2 exam**

Understanding the concepts of Cloud Data Security is just the beginning of your CCSP journey. To truly excel in Domain 2, you need a well-rounded approach that combines theoretical knowledge with practical application. This section will guide you through what to expect on the exam and provide valuable resources to enhance your preparation.

Let's equip you with the tools and strategies to confidently tackle the CCSP Domain 2 challenges.

**繁體中文重點：** 除了理解概念，準備時也要結合實務應用。以下兩節分別整理高機率考點與學習資源。

### **CCSP Domain 2 exam expectations: What you need to know  
**

**Important reminder**: Below are some of the topics that are highly likely to appear in the CCSP exam. However, it's crucial to understand that the CCSP exam can draw from any part of Domain 2. This overview just serves as a strategic guide to help you prioritize your study efforts.

Below are some of the topics that are highly likely to appear in the CCSP exam. However, it's crucial to understand that the CCSP exam can draw from any part of Domain 2. This overview just serves as a strategic guide to help you prioritize your study efforts.

**2.1 Describe cloud data concepts**

- What is confidentiality, integrity and availability?
- What is authenticity and non-repudiation?
- The various roles and responsibilities involved in protecting an organization’s data.
- The six phases of the data life cycle.
- The security controls for the create phase.
- The security controls for the storage phase.
- The security controls for the use phase.
- The security controls for the share phase.
- The security controls for the archive phase.
- The security controls for the destroy phase.

**2.2 Design and implement cloud data storage architectures**

- We discuss these topics in the other domains.

**2.3 Design and apply data security technologies and strategies**

- The difference between static and dynamic masking.
- The different types of data masking.
- The difference between direct and indirect identifiers.
- The importance of anonymization and the complications of anonymizing data.
- What is pseudonymization?
- How does tokenization work and why do we use it?
- The three data loss prevention features and what each entails.
- Hybrid cloud vs. multi-cloud.
- The three methods of discovery.
- The various points from which an organization can monitor its data

**2.4 Implement data discovery**

- The differences between structured, unstructured and semi-structured data.
- How data location and legal jurisdiction can impact data discovery.

**2.5 Plan and implement data classification**

- Why organizations need to classify their sensitive data, and the considerations for their data classification policies.
- Why data labeling is important for DLP.
- The characteristics of metadata.

**2.6 Design and implement information rights management (IRM)**

- The difference between IRM and DRM.
- The difference between trade secrets, patents, copyright and trademarks.
- The controls that IRM can enforce.
- The three information rights management (IRM) objectives.
- The important traits of IRM systems.
- The purpose of certificates in IRM systems.

**2.7 Plan and implement data retention, deletion and archiving policies**

- Important considerations of a data retention policy.
- The different categories of media sanitization.
- What cryptographic erasure (cryptoshredding) is and why it may be necessary in the cloud.
- Policy considerations for data destruction.
- Policy considerations for archiving data.
- The need for frequently tested backups.
- What is legal hold and what are the requirements?

**繁體中文重點：** 以下是高機率主題，但考試可能涵蓋 Domain 2 任何部分，僅供安排優先序：

- **2.1：** CIA、authenticity、non-repudiation；資料角色與責任；生命週期六階段及各階段控制。
- **2.3：** static vs dynamic masking 與 masking 類型；direct vs indirect identifier；anonymization、pseudonymization、tokenization；DLP 三功能、三種 discovery、各監控點；hybrid vs multi-cloud。
- **2.4：** 結構化、非結構化與半結構化資料；位置與管轄權的影響。
- **2.5：** 分類的理由與政策考量；labeling 對 DLP 的重要性；metadata 特徵。
- **2.6：** IRM vs DRM；四類智慧財產；IRM 可執行的控制、三項目標與憑證用途。
- **2.7：** retention policy 考量；sanitization 類別；cryptoshredding；銷毀與歸檔政策；定期測試備份；legal hold。
- **2.2：** 相關主題在其他 domain 討論。

---

### **Resource recommendations  
**

Conquering CCSP Domain 2 requires more than just memorization—it demands a strategic approach to learning. The right study tools can make all the difference in this journey.

To help you out, we've handpicked resources that transform complex cloud security concepts into practical knowledge, ensuring you're well-equipped for both the exam and real-world challenges. Here are our top recommendations:

- [Destination Certification CCSP MasterClass](https://destcert.com/ccsp/): Our adaptive learning system focuses on your weak areas in Cloud Data Security, ensuring efficient study. With personalized mentoring and weekly live Q&A sessions with CCSP experts, you'll get clarity on complex Domain 2 concepts. The visual MindMaps are particularly useful for connecting intricate cloud security ideas, while the customized study schedule helps you balance your preparation with your daily life.
- [Destination CCSP: The Comprehensive Guide](https://destcert.com/ccsp/guidebook/): his guide excels in breaking down the complexities of Cloud Data Security. It offers clear, actionable insights into data lifecycle management, encryption strategies, and compliance requirements. The innovative diagrams and real-world examples make abstract concepts tangible, helping you apply your knowledge to practical scenarios you'll encounter in Domain 2 of the exam and in your career.
- [Destination Certification CCSP App](https://destcert.com/destcert-app/): Our 2-in-1 app is perfect for mastering Domain 2 on the go. Its flashcards help you quickly review key Cloud Data Security terms, while the practice questions test your understanding of critical concepts. By tracking your progress per domain, you can easily identify and focus on areas of Cloud Data Security where you need improvement, making your study time more effective and targeted.

**繁體中文重點：** 本節為原站（Destination Certification）對自家課程、書籍與 app 的推薦，屬推廣內容，不含考試知識。

---

## 繁體中文版 / Traditional Chinese Version

本文件保留 Destination Certification 的 CCSP Domain 2 英文原文，以上各節的「繁體中文重點」為自行整理的概念筆記，不是逐句翻譯。

- **資料概念（2.1）：** CIA、資料角色、生命週期六階段、data dispersion、data flow。
- **安全技術（2.3）：** masking、anonymization、tokenization、DLP。
- **Data discovery（2.4）：** KDD、structured／unstructured／semi-structured、資料位置。
- **分類（2.5）：** classification policy、data mapping、label 與 marking、metadata。
- **IRM（2.6）：** IRM vs DRM、智慧財產類型、三項目標、工具與憑證。
- **保留與銷毀（2.7）：** retention、media sanitization（clear／purge／destroy）、cryptoshredding、archiving、legal hold。
- **稽核（2.8）：** event 屬性、SIEM、雲端日誌限制、non-repudiation、chain of custody。

2.2 的儲存架構與 2.3 的加密、hashing、金鑰管理不在本文展開，原文分別指向 Domain 3.1 與 Domain 4.6。
