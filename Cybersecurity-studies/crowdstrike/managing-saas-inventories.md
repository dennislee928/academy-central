Organizations are unknowingly harboring dangerous security gaps through inactive third-party applications. These forgotten apps silently threaten your environment by:

## 

Creating unmonitored backdoors

**Unmonitored backdoors** can **provide attackers with unrestricted access to systems**, bypassing security measures. These vulnerabilities often arise from **poor oversight** or **outdated software configurations**. Addressing these risks requires regular system audits and proactive monitoring.

Implementing robust access controls and closing unnecessary ports can significantly reduce the likelihood of backdoor exploitation.

## 

Exposing sensitive data

**Outdated permissions can inadvertently expose sensitive data to unauthorized users.** This issue often stems from a **lack of regular permission reviews and updates**. Sensitive information, if exposed, can lead to severe security breaches and compliance violations.

To mitigate this risk, organizations should enforce strict data access policies and conduct periodic audits of app permissions.

## 

Violating compliance mandates

Failure to adhere to compliance mandates can result in legal penalties and reputational damage. Many violations occur due to outdated processes or insufficient documentation. Staying compliant requires a thorough understanding of regulatory requirements and consistent adherence to best practices.

Regular training and updates on compliance standards can help organizations avoid costly mistakes.

## 

Enabling lateral movement

Obsolete integrations can serve as pathways for attackers to move laterally within a network. These outdated connections often lack modern security features, making them prime targets for exploitation. Lateral movement allows attackers to escalate privileges and access critical systems.

Replacing obsolete integrations with secure alternatives and monitoring network activity can help prevent such threats.

Without immediate visibility and action, these dormant applications continue to expand your attack surface, putting your organization at increasing risk. Each day these unused applications remain connected, they provide potential entry points for cyber threats and data breaches.

## 

**The Applications Inventory**

The **Applications Inventory** provides **visibility into 3rd party apps which have been granted access to your SaaS tenants**. These potentially be additional “doorways” into your data and security settings.


The Apps inventory. 

The Applications Inventory **offers a centralized view of all applications**, **tracking last logins, managing consents, identifying stale applications,** and providing **deep visibility** for proactive management.

The Applications Inventory provides **transparency** of SaaS-to-SaaS connections, Sign-On applications, AI Agents, API Keys and data flows. In addition, it offers the ability to **revoke access** for specific integrations, meaning control of your SaaS security is stronger than ever. Let's look into the inventory features to learn more.

## 

OAuth App

An OAuth app is an application that uses the OAuth (Open Authorization) protocol to allow secure access to resources **without the need to share user credentials.**

OAuth apps can pose security risks if not properly vetted, as malicious apps could request excessive permissions or abuse granted access.

App details

Details

Microsoft and Google Integrations

**The following fields are reported for OAuth apps:**

- **Permission Type:** application/delegated
    
- **Client ID**
    
- **Last Activity**
    
- **Created On**
    
- **Sign In Audience:** Specifies what accounts are supported for the application
    
- **Reply URLs:** Configured endpoints where authentication responses can be sent and received, crucial for ensuring that tokens return to secure locations after authentication.
In addition, by clicking an OAuth app, you can view the following details in the App side bar:

- **Scopes** (including the details of what those scopes mean. This is useful to easily review what the scope actually gives access to)
    
- List of **Consenting Users** (if the consenting user is an admin, “Admin” will be listed)
    
- App usage metrics
**Important**: For M365 and GWS Integrations, Falcon Shield offers the option to revoke OAuth consent for discovered OAuth Apps.

- To have access to this action, you must have an active M365/GWS integrations in your account. These integrations include a “Remediation API” tab, which when enabled, allows you the option to revoke access via Falcon Shield.
    
    - This action is executed from the app sidebar in the context of an Oauth App discovered by the integration
        
    - **This can only be done by Owner and Admin users.**
        
    - The action is executed for a specific user by selecting the user and executing the action, OR by clicking the “Revoke” button with all the users in the sidebar selected automatically. The consent provided by the user will then be revoked.
        
    - The bulk action is limited to 50 users simultaneously.
        
    - Rate limit: 1 action every 5 minutes.
- ## 

**AI Agents**

AI Agents are applications that leverage artificial intelligence capabilities, including large language models (LLMs), to perform tasks, generate content, or analyze data. These may include:

- 1
    
    Generative AI tools such as ChatGPT, Claude, or Gemini
    
- 2
    
    AI-powered productivity applications
    
- 3
    
    Custom AI solutions built on platforms like OpenAI
    
- 4
    
    AI features embedded within existing SaaS applications
    

Unlike traditional applications that adhere to fixed instructions, **AI agents** utilize technologies such as machine learning and natural language processing to learn from interactions, adapt their behavior based on new data, and operate with varying levels of independence. This evolution transforms applications from passive tools into proactive digital partners—ranging from simple task-specific tools to advanced virtual assistants—capable of understanding context, anticipating needs, and solving complex problems through continuous self-improvement.

**AI Agents often have access to sensitive organizational data and can present unique security challenges that differ from traditional applications.**



Detect and inventory AI Agents (such as Salesforce Agentforce and ChatGPT Enterprise) and gain visibility into AI-driven applications integrated in your SaaS environment.

As organizations increasingly adopt AI tools across their SaaS ecosystem, maintaining visibility and control over these applications becomes critical.

#### 🔑 **Key Concept**  

Falcon Shield's AI Agents monitoring capabilities within the Application Inventory, allow you to **identify, track**, and **secure** AI-powered applications across your environment.

## 

**API Token**

While many think of tokens as similar to house keys, API Tokens are a type of app. API tokens are applications that **use unique authentication tokens to access APIs** and **perform authorized actions**. API Tokens pose risk to organizations as they are easy to share and difficult to track, meaning a key could accidentally be shared with unauthorized users.



The following fields are reported for API Token apps:

- **Token type**
    
- **Created On**
    
- **Expiration Date**
    

In addition, by clicking an API Token app, you can view the scopes App side bar.

## 

**Extensions**

Extension apps are software components that extend or modify the functionality of existing applications, browsers, or platforms. Extensions can create severe security risks: they often require access to network and browser settings, can have code execution capabilities, and have been related to major data leaks in the past years.

## 

Fields for Extension apps

The following fields are reported for Extension apps:

- **Type**
    
- **Client ID**
    
- **Browser**
    
- **Marketplace Listing**
    


## 

App side bar

In addition, by clicking an Extension app, you can view the following details in the App side bar:

- **Scopes**
    
- **Devices-** which devices have this extension installed.
**Chrome Extensions**

**Important: For Chrome Extensions, Falcon Shield offers the option to block discovered extensions.**

To have access to this action, you must have an active **Chrome Extension** integration in your account. The integration includes a **Remediation API** tab, which when enabled, allows you the option to block extensions via Falcon Shield.

This can only be done by Owner and Admin users.

The **Revoke Extension** action is executed in the context of a specific browser extension discovered by a managed Chrome browser and executed from the extension sidebar.

- Executing this step will block the extension at your root OU (add extension ID to a policy set for the root OU). All other OUs inherit the policy from the root unless explicitly configured otherwise.
    
- The extension might still be visible on your extension list, but will no longer have access to your environment.
    
- Rate limit: 1 action every 5 minutes.
## 

**Scenario 1: Identifying high-risk OAuth applications**

Organizations face significant risks from OAuth applications that may have been granted excessive permissions to their SaaS environments. Without proper visibility and control over OAuth app permissions, particularly those with administrative consents, organizations are vulnerable to data breaches, unauthorized access, and potential compliance violations through over-privileged third-party applications. Open the panels below to review some of the risks of uncontrolled OAuth applications.

## 

Unauthorized access

- Delegated permissions to sensitive data
    
- Administrative access rights
    
- API access to core services
    

## 

How this access is being used

- Data access and modification capabilities
    
- Difficulty to discover unmonitored OAuth applications