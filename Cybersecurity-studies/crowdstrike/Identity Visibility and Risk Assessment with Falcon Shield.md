#### 🔑 **Key Concept**  

Falcon Shield's powerful **identity visibility** and **risk assessment capabilities** enable you to understand who has access to what, identify risky permissions, and prioritize your security efforts effectively

In this module, we'll explore how **Falcon Shield's User Inventory** provides comprehensive visibility into identities across your SaaS ecosystem and helps you assess identity-related risks. We will also briefly look into the correlation between devices and users.

## 

User Inventory

The User Inventory is the cornerstone of Falcon Shield's identity visibility capabilities. It provides a consolidated view of all user identities across your connected SaaS applications, enabling you to:

## 

See all applications a user has access to

Gain a comprehensive view of all the applications a user can access within your organization. This visibility helps ensure that users have appropriate access levels and reduces the risk of unauthorized access.

By identifying these applications, you can streamline user management and enhance security protocols.

_In this example, the user has integrations with Snowflake, Slack, Asana, Data Dog, etc. Click on the image to see all the integrations._

![User inventory with integrations highlighted.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/applications.png)

## 

Identify which users have privileged roles

Quickly determine which users hold privileged roles within your system. Privileged roles often come with elevated permissions, making it crucial to monitor and manage them effectively.

Regularly reviewing these roles helps mitigate security risks and ensures compliance with organizational policies.

_In this example, the user has 24 privileged roles, some of them being Admin and Super Admin level. Determine if this level of access is needed for each of the integrations._

![Users inventory with the privileged roles tab open and highlighted](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/priveleged%20roles.png)

## 

Detect users with security check failures

Identify users who have failed critical security checks, such as multi-factor authentication or password compliance. These failures can indicate potential vulnerabilities in your system.

Addressing these issues promptly helps maintain a secure environment and protects sensitive data from unauthorized access.

_In this example, you see a list of failed, high-impact security checks, along with the integration, security domain, and number of affected users ._

![Security checks dashboard](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/secuirtuy.png)

## 

Find external users with access to your applications

Discover external users who have been granted access to your organization's applications. External access can pose unique security challenges if not properly managed.

Regularly auditing these users ensures that only authorized individuals retain access, reducing potential risks.

_The example below shows how to filter the Users Inventory for external users by selecting Domain Type > Not available and Unverified._

![Filter the Users Inventory for external users.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/external%20users.png)

## 

Discover inactive or dormant accounts

Locate accounts that have been inactive or dormant for an extended period. These accounts can become security liabilities if left unchecked.

By identifying and addressing these accounts, you can reduce the attack surface and improve overall system hygiene.

_The example below shows the User accounts labeled as dormant._

![The Users inventory with several accounts tagged as dormant.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/dormant.png)
The **User Inventory aggregates data from all connected applications,** creating a unified identity profile for each user. This consolidation is based primarily on email address matching, though Falcon Shield also uses other attributes to correlate identities when email addresses differ



## 

**Key User Inventory attributes**

Before we get started, let's review some elements of the **User Inventory**.

**Note:** If you have already completed _SAAS 152: Managing SaaS Application Inventories with Falcon Shield_, you can review this section or skip to the next.

1. Click to flip
    
    **Email**
    
2. Click to flip
    
    **Name**
    
3. Click to flip
    
    **Department**
    
4. Click to flip
    
    **Company**
    
5. Click to flip
    
    **Domain**
    
6. Click to flip
    
    **Enabled/Disabled Status**
    
7. Click to flip
    
    **Last Seen**
    
8. Click to flip
    
    **Creation Time**
    
9. Click to flip
    
    **Failed Security Checks**
    
10. Click to flip
    
    **Privileged Roles**
    
11. Click to flip
    
    **Reported By**

1. The primary identifier for the user, typically used to uniquely distinguish accounts within a system.
    
2. Click to flip
    
    The user's full name as recorded in the system, often used for identification and personalization.
    
3. Click to flip
    
    The user's department, if available, indicating their organizational unit within the company.
    
4. Click to flip
    
    The user's company affiliation, representing the organization they are associated with.
    
5. Click to flip
    
    The email domain of the user, often used to identify the organization or service provider.
    
6. Click to flip
    
    Indicates whether the user account is currently active or inactive in the system.
    
7. Click to flip
    
    The most recent time the user was active within the system or application.
    
8. Click to flip
    
    The timestamp indicating when the user account was initially created in the system.
    
9. Click to flip
    
    The number of security check failures associated with the user, highlighting potential risks.
    
10. Click to flip
    
    A list of special roles assigned to the user, granting elevated permissions or access.
    
11. Click to flip
    
    The applications or systems that have reported this user, providing additional context
## 

**Risk factors**

Falcon Shield takes a comprehensive approach to identity protection that addresses **the full spectrum of identity security challenges.** The platform aggregates these various risk factors to create a comprehensive risk assessment for each user, helping organizations identify and respond to potential security threats.

The threat detection capabilities are enhanced by cross-application visibility, allowing for more accurate identification of truly risky behavior versus false positives. Open each section below to learn more about the risk factors:

## 

Privileged access

**Users with administrative or other privileged roles often have elevated access to critical systems and data.** This makes them a prime target for malicious actors seeking to exploit their permissions. Regularly reviewing and limiting privileged access can help mitigate potential risks.

Implementing strict access controls and monitoring activities of privileged users is essential to maintaining security.

![Users inventory with the filters open and privileged roles selected.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/privleged%20roles%20filter.png)

## 

Security check failures

**Users affected by failed security checks may indicate potential vulnerabilities or misconfigurations.** These failures can expose your organization to unauthorized access or data breaches. Identifying and addressing these issues promptly is critical.

Ensure that security checks are robust and consistently applied to all users to minimize risks.

![Security checks page with the templated filters displayed.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/secuirty%20checks.png)

## 

External status

**Users from outside your organization's managed domains can pose unique security challenges.** These external users may not adhere to your internal security policies, increasing the risk of unauthorized access.

Establishing clear guidelines and monitoring external user activities can help safeguard your organization's resources.

![The filter in the users inventory is set to Domain type + not available and unverified](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/xCoMLj/external%20users.png)

## 

Authentication methods

**Users without proper authentication controls, such as multi-factor authentication (MFA), are more susceptible to account compromise.** Weak or outdated authentication methods can be exploited by attackers to gain unauthorized access.

Implementing strong authentication protocols is a fundamental step in securing user accounts and protecting sensitive data.

![The threat center filters open and set to Type = Authentication settings and Authentication settings enforcement.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/authentication.png)

## 

Device security

**Users accessing applications from unmanaged or non-compliant devices can introduce significant security risks.** These devices may lack necessary updates or security configurations, making them vulnerable to attacks.

Enforcing device compliance policies and restricting access from insecure devices can help protect your organization's systems.

![Devices inventory Apply filters > integrations. Then it shows the available templates for integrations including privileged users with non-compliant devices, stale devices, devices with critical vulnerabilities, and non-encrypted devices.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/devices.png)

## 

Unusual activity

**Users exhibiting suspicious behaviors, such as accessing systems at odd hours or attempting unauthorized actions, may indicate potential security threats.** Monitoring and analyzing these activities can help detect and prevent malicious actions.

Proactively addressing unusual activity is crucial to maintaining a secure environment and mitigating risks.

![The side panel open in the threat center for unfamiliar features.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/unuaual.png)

## 

**Monitor privileged access**

Privileged users represent a particularly high risk, as their elevated permissions could cause significant damage if compromised. Falcon Shield provides comprehensive visibility into privileged access across your SaaS ecosystem:

Cross-Application Privilege Mapping

Identity Protection Risk

Privilege Change Monitoring

Privilege Usage Analysis

Gain a **comprehensive view of all privileged roles** a user holds across various applications. This insight helps identify potential risks associated with excessive or unnecessary privileges.

By mapping privileges across applications, organizations can better understand the scope of user access and take steps to mitigate security vulnerabilities.

Detect users who possess privileges across multiple applications, which could indicate a **higher level of risk**. Aggregated privileges can create opportunities for misuse or unauthorized access.

Identifying these users allows for targeted reviews and the implementation of stricter access controls to reduce potential threats.

Track when users are granted or removed from privileged roles to maintain a secure and up-to-date access control system. Monitoring these changes ensures that privileges are only assigned when necessary.

Regularly reviewing privilege changes helps prevent unauthorized access and ensures compliance with security policies.

Analyze how often privileged capabilities are actually used by users. This data provides valuable insights into whether certain privileges are necessary or if they can be revoked.

Understanding privilege usage patterns helps optimize access management and reduces the risk of privilege misuse

- ## Step 1
    
    ### Identify privileged users
    
    Use the **User Inventory** filter for **Privileged Roles** to view all users with privileged access.
    
    ![User inventory filtered to admin roles for Active Directory.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/filter%20privel.png)
    
- ## Step 2
    
    ### Customize monitoring
    
    Create custom presets to monitor specific types of privileged users, such as all Salesforce admins.
    
    ![Users inventory filtered to all Salesforce admins.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/salesforce.jpg)
    
- ## Step 3
    
    ### Set up monitoring
    
    Create a custom security check using the save button to monitor when new users are granted privileged roles.
    
    ![The side panel from creating a custom security check highlighting the save button.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/6da9dcadeb9e0e426bc68d0e13ae963c2e97b84376929fa039f4a60aeb2a021e/scormcontent/assets/create%20cehc.png)
    
- ## Step 4
    
    ### Review access regularly
    
    Conduct regular reviews of privileged access to ensure it aligns with business requirements.
## 

**Common use cases**

Below are some common use cases for using Security checks in Falcon Shield to monitor identity.

## 

Partially deprovisioned users

Partially deprovisioned users are **individuals who have been disabled in your identity provider (IdP) but still maintain active accounts in certain applications**. This can pose a security risk as these accounts may still have access to sensitive data or systems. Regularly identifying and addressing these accounts ensures that access is properly revoked.

**Solution:** Implement automated checks and deprovision workflows to help mitigate this issue and maintain compliance with security policies.

## 

Critical SaaS admins with security issues

Critical SaaS admins are **responsible for managing essential applications**, but security issues among these admins can lead to significant vulnerabilities. Identifying admins with security check failures is crucial to safeguarding your organization's data and systems. These failures may include weak passwords, lack of multi-factor authentication, or outdated permissions.

**Solution:** Conduct regular audits and enforce strict security protocols for admin accounts to help minimize risks and ensure the integrity of critical applications.

## 

External users with privileged roles

External collaborators with administrative access **can introduce potential security threats if their roles are not carefully managed.** These users may have been granted elevated permissions to perform specific tasks, but improper oversight can lead to misuse or unauthorized access.

**Solution:** Regularly review and adjust the permissions of external users, ensuring that access is limited to what is strictly necessary for their roles.

## 

Users with multiple compliance violations

Users who violate multiple compliance requirements **can create significant risks for your organization**. These violations may include accessing restricted data, failing to adhere to security protocols, or bypassing established workflows. Identifying such users is essential to maintaining compliance and avoiding potential penalties.

**Solution:** Implement monitoring tools and provide regular training on compliance standards to help reduce these violations and promote a culture of accountability.

## 

Users not managed by IdP

Users who exist in SaaS applications but are not managed by your central identity provider (IdP) **can create gaps in your security framework**. These unmanaged accounts may bypass centralized controls, making it difficult to enforce consistent security policies or track activity.

**Solution:** To mitigate this risk, organizations should integrate all user accounts into the IdP and conduct regular audits to identify and address any unmanaged users.

## 

**Use cases**

Device inventory helps you identify and remediate risks from misconfigurations and privilege issues. When integrated with endpoint protection, it provides comprehensive visibility into users and devices accessing your SaaS applications. Flip the cards below to review 3 common use cases:

1. Click to flip
    
    Find administrators using devices that have critical security issues, posing significant risks to organizational security.
    
2. Click to flip
    
    Identify administrators using devices that fail to meet established compliance requirements, potentially jeopardizing security protocols.
    
3. Click to flip
    
    Detect administrators using personal or unmanaged devices, which may lack proper security controls and monitoring.
1. Click to flip
    
    **Critical vulnerabilities**
    
2. Click to flip
    
    **Non-compliant devices**
    
3. Click to flip
    
    **Unmanaged devices**