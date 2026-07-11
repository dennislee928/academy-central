
1. [
    
    Data Inventory
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/index.html#/lessons/roj96pPgvioI-rsjpnrf_mT_2Z9LjaUJ)
    
2. [
    
    Assess the risk exposure of sensitive data
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/index.html#/lessons/SDS0wMEeD1kqNbpAAvzOFzLzrgqicuks)
    
3. [
    
    Knowledge Check
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/index.html#/lessons/kQZ_ypWMm93XSXmrvzIHMUEbpyX8Eoyf)
    
4. [
    
    Module Summary
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/index.html#/lessons/WdDIKqBEnw71lBse8u3CulwQpxSWl-_V)
  
  
**The rise of SaaS and GenAI has amplified the risks of unintentional data exposure.**

#### 🔑 **Key Concept**  

This module guides you through detecting publicly shared documents, preventing unauthorized data transfers to AI tools, and enforcing policies that limit sensitive data movement.

1. Click to flip
    
    **Detect sensitive data**
    
2. Click to flip
    
    **Prevent data exposure**
    
3. Click to flip
    
    **Monitor sharing patterns**
    
4. Click to flip
    
    **Track external collaboration**
    
5. Click to flip
    
    **Remove public access**
    
6. Click to flip
    
    **Clean up sharing**
    
7. Click to flip
    
    **Support collaboration**
    
8. Click to flip
    
    **Scale SaaS adoption**

1. Click to flip
    
    Security teams can instantly detect and remediate exposed sensitive data to prevent unauthorized access and data breaches.
    
2. Click to flip
    
    Prevent unauthorized data exposure by proactively managing and securing sensitive information shared externally.
    
3. Click to flip
    
    Operational control allows monitoring of sharing patterns across departments to identify and address potential risks.
    
4. Click to flip
    
    Track external collaboration by domain to ensure secure interactions and prevent unauthorized data sharing.
    
5. Click to flip
    
    Remove unnecessary public access to sensitive data to prevent unauthorized exposure and maintain security.
    
6. Click to flip
    
    Clean up outdated external sharing to reduce risks associated with unnecessary or forgotten data access.
    
7. Click to flip
    
    Enable secure external collaboration to support business partnerships while maintaining data protection and compliance.
    
8. Click to flip
    
    Scale SaaS adoption without increasing risk by managing external sharing securely and efficiently.
## 

**Understanding the Data Inventory**

The Data Inventory only collects data from SaaS Integrations which support this feature. To see if the integration supports Data Inventory, look for the following symbol in the integration page:

![](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/assets/supported.jpg)

![](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/assets/inventory.png)

Each row in the Data Inventory represents an item which has been **externally** or **publicly shared**. _If the item has not been shared externally or publicly, it will not show up on the list._
Most SaaS applications allow setting default sharing permissions to disable external sharing or limit access to users only. If these settings are activated, they usually override the file-specific sharing setting, preventing it from being shared with unauthorized parties. In this case, data for the integration will not show up in the Data Inventory because the inventory only lists public and/or externally shared data.

**To confirm your file sharing policy status,** look for the corresponding security check in the Security Checks page. For example, this is the control for Onedrive (set through the SharePoint+OneDrive integration).

![](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9f40bf82edf10a486bf68219e893020d791b226167ad4cf71dd7aad589af508f/scormcontent/assets/side.png)

Clicking each row opens a side bar with full item details, including a link to the item itself (for quick viewing and evaluation).

## 

**Public or External? What does it mean?**

Open the sections below by clicking on the + symbol to learn more.

## 

Public

A public file is a file which anyone with the sharing link can access. While this is the most convenient method of sharing information, it has the highest risk, as some URLs can be guessed or shared by mistake with the wrong individual.

## 

External

An externally shared file is a file that has been shared with domains which have not been approved by the organization. The sharing of corporate IP with external entities could result in sensitive company information being exposed.

## 

What is an external domain?

A domain which has been classified as “Unverified” in Falcon Shield.

To view a list of unverified domains, go to **Settings> Domains** and look up the domain in question (only available for owner users).

Available Columns

Data Side Bar

Filters

Grouping

The Data Inventory includes several columns to organize and manage information effectively:

- **Name**
    
- **Type:** Calendar, File, Document, PDF, Repository
    
- **Integration**
    
- **Owner**
    
- **Created On**
    
- **Access Level**
    
- **Last Accessed**
    
- **Last Modified**
    
- **Password Protected**
    
- **Owner Department**
    
- **Expiration Date**
Clicking any row in the inventory opens the data side bar, which provides additional insights about the shared file. The side bar includes the following tabs:

- **User Enabled:** The user who shared the resource
    
- **Resource ID**
    
- **Link**: This could include more than one link, such as one internal and one externally shared link
    
- **Password Protected**
    
- **Last Accessed**
    
- **Created Date**
    
- **Last Modified**
    
- **Times Viewed**: Tracks how many times the item has been viewed, helping to gauge exposure in case of unauthorized sharing
    

Additionally, it lists users with whom the resource has been shared. The list is grouped by domain for easier viewing.

The Data Inventory includes various filter options to refine your search and manage data effectively:

- **Integration**
    
- **Last Accessed**
    
- **Owner**
    
- **Access Level**
    
- **Last Modified**
    
- **Owner Department**
    
- **Owner Enabled**
    
- **Password Protected**
    
- **Type**
    
- **Unmanaged Domain**
    

The options available for each filter depend on the SaaS integrations you create.

The Data Inventory supports grouping results based on specific criteria:

- **Owner**
    
- **Owner Department**
    

Grouping is a powerful tool for reviewing large quantities of data. It helps detect users or departments with higher numbers of mismanaged files. This level of visibility aids in managing resources and highlights potential training gaps in data security and corporate file management standards.

## 

**Mitigating risk**

Organizations frequently share files and resources externally through SaaS applications for legitimate business purposes. However, without proper visibility and control, this **sharing creates significant security risks** including **data leakage, unauthorized access**, and **regulatory compliance violations**. Many organizations lack visibility into what data is being shared externally, with whom it's being shared, and whether those shares are still necessary—creating blind spots that attackers can exploit.

Learn below how Falcon Shield’s Data Inventory can assist in mitigating this risk by clicking on the + icons below.

## 

Who are your users?

Understanding who your users are is critical to assessing risk exposure. Employees often share corporate files with external collaborators, which can lead to unintended data exposure. Departments like Marketing, Sales, and R&D frequently engage in extensive external collaboration, increasing the likelihood of sensitive data being shared.

Former employees may leave shared files accessible externally, posing a significant risk. Additionally, external partners, vendors, and customers who have been granted access to internal resources can inadvertently misuse or mishandle sensitive data.

## 

What access and permissions do they have?

Users often have access to create public sharing links that anyone can use, which can bypass proper security controls. They may also have permissions to share resources with specific external domains, allowing for targeted collaboration. However, these permissions can be misused if not carefully monitored.

Another common capability is the ability to share content without expiration dates or access limitations. This lack of restrictions can lead to sensitive data being accessible indefinitely, increasing the risk of unauthorized access.

## 

How are they using these capabilities?

Many users create public sharing links for quick collaboration, often without implementing proper security measures. While sharing resources with external partners may serve legitimate business purposes, outdated sharing practices can exceed current business requirements and introduce unnecessary risks.

Unintentional exposure of sensitive data is a frequent issue, often caused by misconfigured sharing settings. These practices highlight the importance of regularly reviewing and updating sharing policies to align with organizational security standards.

Mistakenly believing setting a file’s sharing settings to **Available via link** keeps the file limited within their organization.

In the following sections, we will learn about several use cases in which users expose data to outsiders, and how to use Falcon Shield to detect them and prevent them.

## 

**Abandoned Files**

Open the sections below by clicking on the + icon to learn more about the risk of abandoned files.

## 

What are abandoned files?

Abandoned files are documents or data left accessible after their original owners' accounts have been disabled. These files often lack proper oversight, making them difficult to track and manage effectively.

Without an active owner, these files can remain in circulation, posing a significant security risk due to potential unauthorized sharing or misuse.

## 

Why do abandoned files pose a risk?

Abandoned files are a security concern because they may contain sensitive information that remains accessible without proper controls. The absence of ownership increases the likelihood of these files being shared inappropriately or falling into the wrong hands.

Additionally, the lack of accountability makes it challenging to ensure these files are updated, archived, or deleted as needed, further exacerbating the risk.

## 

How can organizations address this issue?

Organizations can mitigate the risks associated with abandoned files by implementing policies to regularly audit and manage file ownership. Ensuring that files are reassigned or securely deleted when an account is disabled is a critical step.

Using automated tools to track file activity and enforce access controls can also help reduce the likelihood of sensitive data being exposed through abandoned files.

Understanding and mitigating the risks associated with abandoned or ownerless files is crucial for maintaining data security. This process will guide you through identifying and addressing such risks using Falcon Shield. Click or tab through the steps below to learn more.

- 1
- 2
- 3
- 4
- 5

1 of 7

## 

Risk: Abandoned or ownerless files are left accessible after their owners’ accounts have been disabled.

Abandoned files are hard to track and manage, posing a security risk due to potential continuous sharing and lack of ownership on the information included in them.


## 

**Grouping**

Seeing a lot of results? No problem! Use the Inventory’s **Grouping** tool. Using the grouping tool can assist in finding problematic departments, who can then be required to repeat data security training, asked to review their files, and even revoked file sharing capabilities. You can group results by:

## 

Owner

Identifying specific users who frequently share files without a password or expiration date is crucial for maintaining data security. These users may unknowingly expose sensitive information to unauthorized access. By monitoring these behaviors, organizations can implement targeted interventions to improve file-sharing practices.

Encouraging responsible file-sharing habits among users helps mitigate risks and ensures compliance with data protection policies.

## 

Owner Department

Discovering departments within your organization with unhealthy file-sharing habits is essential for reducing risk exposure. These departments may have patterns of sharing files insecurely, which can lead to data breaches or compliance issues. Addressing these habits at the departmental level fosters a culture of accountability and security.

Providing training and resources to these departments can help them adopt safer file-sharing practices and align with organizational standards.

## 

**Key points**

Review the key points below by clicking on the + icon to open each panel.

## 

Visibility into externally shared content

Falcon Shield's Data Inventory provides a comprehensive view of content shared externally across multiple SaaS platforms. This feature ensures that both public links and specific external sharing instances are identified, offering a clear understanding of data exposure.

By tracking these sharing activities, organizations can better manage and secure their sensitive information, reducing the risk of unauthorized access.

## 

Tracking metadata for enhanced oversight

Important metadata such as file ownership and modification dates are meticulously tracked within the Data Inventory. This information helps organizations maintain control over their data by providing detailed insights into file activity.

With this level of oversight, users can quickly identify potential risks and take appropriate actions to safeguard their sensitive information.

## 

Data population and syncing process

The data population process may take time depending on the size of the environment. Initial population can span several days to weeks, as the system fetches files and folders across all users to ensure complete visibility.

Continuous syncing guarantees that the inventory remains up-to-date, providing comprehensive coverage of all shared content within the organization.

With these capabilities, your organization is better equipped to maintain data privacy, regulatory compliance, and SaaS usage accountability.

You should now be able to:

- •
    
    Assess the severity of data exposure incidents to understand potential impacts.
    
- •
    
    Evaluate the effectiveness of current policies in mitigating SaaS data risks.
    
- •
    
    Formulate actionable responses to address and reduce SaaS data vulnerabilities.