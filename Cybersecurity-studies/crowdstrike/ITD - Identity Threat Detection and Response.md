1. [
    
    Understanding identity-based attacks
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/index.html#/lessons/_venB3LrAkmS0NhfoHYkYx8B66mxMOva)
    
2. [
    
    Threat Center
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/index.html#/lessons/7FgFhRKZ_PEr7eoVQNFzEYSsoGnKE6jF)
    
3. [
    
    Events Monitor
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/index.html#/lessons/iYc4pENSD6TTMGG_8JZrlXKRL7Gjxk1p)
    
4. [
    
    Configuring alerts
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/index.html#/lessons/QWU6luMbhlswoJ19ZHXLf27ISzgA7yHA)
    
5. [
    
    Knowledge Check
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/index.html#/lessons/zLZkZdJ7HTA_09uHiriIgag-WrC9Gc2i)
    
6. [
    
    Module Summary
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/index.html#/lessons/3nwxsEin8vL7Be18JQWwKW-1fytO7uEl)
**  
Identity-based attacks have become one of the most common and effective methods for threat actors to gain unauthorized access to organizational resources.**

Identity-based attacks target the human element of security, exploiting vulnerabilities in authentication processes, access controls, and user behavior.

## Identity-based attack techniques

## Credential theft

## Brute force attacks

## Password spraying

## Session hijacking

## OAuth abuse

## Privilege escalation

## Account takeover

## Attacker-in-the-middle (AiTM)

Credential theft involves stealing user credentials through methods such as phishing, malware, or other malicious techniques. Attackers use these credentials to gain unauthorized access to systems or accounts. This type of threat is often the first step in a broader cyberattack. Protecting against credential theft requires strong password policies, multi-factor authentication, and user education on recognizing phishing attempts.

Brute force attacks involve attempting to guess passwords through automated trial and error. Attackers use software to systematically test a large number of potential passwords until the correct one is found. This method can be time-consuming but effective against weak passwords. To mitigate brute force attacks, organizations should enforce strong password requirements and implement account lockout policies after multiple failed login attempts.

Password spraying is a technique where attackers test a small set of common passwords against many accounts. Unlike brute force attacks, this method avoids triggering account lockouts by spreading attempts across multiple accounts. Defending against password spraying involves using unique, complex passwords for each account and monitoring for unusual login patterns.

Session hijacking occurs when an attacker takes over an authenticated user session. This can happen if session tokens are intercepted or

stolen, allowing the attacker to impersonate the user. Preventing session hijacking requires secure session management practices, such as using HTTPS, implementing session timeouts, and protecting session tokens from exposure.

OAuth abuse involves exploiting OAuth grants to maintain persistent access to a user’s account or resources. Attackers may misuse OAuth tokens to bypass traditional authentication mechanisms. To prevent OAuth abuse, organizations should regularly review and revoke unnecessary OAuth permissions and educate users about the risks of granting access to untrusted applications.

Privilege escalation refers to gaining higher levels of access than initially authorized. Attackers exploit vulnerabilities or misconfigurations to elevate their privileges within a system. Mitigating privilege escalation involves regularly auditing user permissions, patching vulnerabilities, and implementing the principle of least privilege.

Account takeover occurs when an attacker completely compromises a user account. This can lead to unauthorized access to sensitive data, financial loss, or further exploitation of the compromised account. Preventing account takeovers requires strong authentication measures, regular monitoring for suspicious activity, and prompt response to security incidents.

An attacker-in-the-middle (AiTM) attack involves intercepting authentication flows to steal credentials and session tokens. This type of attack is often carried out using phishing websites or compromised networks. To defend against AiTM attacks, organizations should use encrypted communication channels, implement multi-factor authentication, and educate users on identifying phishing attempts.

These attacks are particularly dangerous because they allow threat actors to operate with legitimate credentials, making detection through traditional means challenging.**Tip:** Identity threats often **manifest as subtle anomalies rather than obvious attacks.** Look for unusual patterns in user behavior, such as logins from new locations or at unusual times, rather than just focusing on failed login attempts.

**  
Discover identity-related security threats using the Falcon Shield Threat Center.**

## 

**Detect threats**

Falcon Shield’s combination of **Threat Center and SSPM** features offers comprehensive and precise monitoring for SaaS environments, detecting true threats without overwhelming teams with excessive alerts or false positives. In this lesson, we will review Falcon Shield's ITDR capabilities.

## 

What is ITDR?

**Identity Threat Detection & Response (ITDR)** detects and responds to identity-related security threats. These Indicators Of Compromise (IOCs) provide forensic signs of potential breaches, including malware, data breaches, unusual behavior, and other suspicious events.

## 

Identity Threat Detection & Response (ITDR)

Falcon Shield's sophisticated ITDR capabilities detect identity-based threats through:

## 

Behavioral analysis

Behavioral analysis helps identify unusual login patterns or suspicious activities. By monitoring user behavior, it becomes easier to detect anomalies that may indicate potential security threats. This proactive approach enhances the ability to respond to risks effectively.

**Why implement behavior analysis?** Such analysis is crucial for maintaining the integrity of user accounts and preventing unauthorized access. It provides valuable insights into potential vulnerabilities within the system.

## 

Impossible travel detection

Impossible travel detection flags login attempts from physically impossible location changes. This feature identifies instances where a user appears to log in from two distant locations within an unfeasible timeframe. Such activity often signals compromised credentials.

**Why leverage impossible travel detection:** By leveraging this detection method, organizations can quickly respond to potential threats and secure user accounts against unauthorized access.

## 

Brute force and password spray detection

Brute force and password spray detection identifies authentication attacks targeting user accounts. These methods involve repeated attempts to guess passwords or use common credentials across multiple accounts.

**Why should you implement this?** Implementing detection mechanisms for these attacks helps safeguard sensitive information and ensures the security of user data.

## 

Attacker-in-the-middle (AiTM) detection

Attacker-in-the-Middle (AiTM) detection identifies sophisticated phishing campaigns designed to intercept user credentials. These attacks often involve tricking users into providing sensitive information on fraudulent platforms.

**Why should you use this detection?** By detecting AiTM activities, organizations can mitigate the risks posed by these advanced threats and protect their users from credential theft.

#### 🔑 **Key Concept**  

When integrated with Falcon Identity Protection, these capabilities extend to provide comprehensive protection across on-premises directories, cloud identity providers, and SaaS applications.

## 

**Detecting identity threats**

So, how do you utilize Falcon Shield to detect identity threats? Falcon Shield provides comprehensive ITDR capabilities through several key components. Review these components in the tabs below:

Threat Center

Events Monitor

Behavioral Analytics

Cross-Application Correlation

Integration with Falcon Identity Protection

The **Threat Center** serves as a **dedicated hub for identity-based threats and indicators of compromise (IOCs) detected across your SaaS ecosystem.**

This centralized resource helps you stay informed and proactive in addressing potential risks.

The **Events Monitor** is a powerful tool for **investigating user activities across SaaS applications.**

It enables you to identify suspicious behaviors and investigate potential incidents effectively.

**Behavioral analytics** leverages advanced analytics to **identify unusual user behaviors that may indicate compromise.** Find this information by clicking on one of the Events listed in the side panel.

Examples include impossible travel scenarios or unusual access patterns, providing critical insights for threat detection.

**Cross-application correlation** allows for the **identification of threats that span your SaaS ecosystem.**

By correlating activities across multiple applications, it provides a comprehensive view of potential risks.

When deployed alongside Falcon Identity Protection, enhanced detection capabilities are unlocked.

These capabilities span on-premises directories, cloud identity providers, and SaaS applications, offering robust security coverage.

**These capabilities work together to provide comprehensive visibility into identity-based threats, enabling security teams to detect and respond to potential compromises quickly and effectively.**

## 

Threat categorization

Threats are categorized by **type, severity**, and **affected applications**. This categorization _helps you quickly understand the nature and impact of each threat_. By organizing threats in this way, security you can prioritize your responses effectively.

Understanding the categorization also aids in identifying the most critical threats that require immediate attention, ensuring a focused and efficient approach to threat management.

![The Threat center with the type, severity, and affected application columns higlighted](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/assets/categorization.png)

## 

Threat details

Each threat includes detailed information such as **affected users, detection time, and specific indicators that triggered the detection.** This level of detail provides a comprehensive understanding of the threat's scope and impact.

By analyzing these details, you can better assess the threat's urgency and take informed actions to mitigate potential risks.

![Threat center with Suspicious Aura guests panel open and highlighted.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/assets/details.png)

## 

Threat type

Threats that are **mapped to the MITRE ATT&CK framework offer valuable context about the tactics and techniques being used**. This mapping helps you understand the methods attackers employ.

Leveraging this framework allows you to anticipate potential next steps of an attacker and strengthen their defenses accordingly.

![The MITRE ATT&CK information panel open for unfamiliar features threat](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/assets/mitre.png)

## 

Recommended actions

Guidance is provided on **how to respond to each type of threat,** enabling you to take appropriate action. These recommendations are tailored to address the specific characteristics of each threat.

By following these actions, you can effectively neutralize threats and minimize their impact on the organization.

![Automated scanning tools event side panel with the remediation steps highlighted.](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/assets/remediation.png)

## 

Historical analysis

Historical analysis allows you to **view threat trends over time**, helping to identify patterns and persistent threats. This insight is crucial for understanding the evolution of threats and preparing for future incidents.

By studying historical data, security you can refine your strategies and improve your overall threat detection and response capabilities.

### 

**Use the Threat Center effectively**

The Falcon Shield Threat Center provides easy access to supported threats and related information. Explore a high-level overview of how to use the Threat Center in your workflows.

🧩  

### **Review**  

Regularly review the Threat Center to identify new threats.  

📑  

### **Prioritize**  

Prioritize threats based on severity and affected users.  

🕵️  

### **Investigate**  

Investigate high-priority threats using the provided details.  

🔍  

### **Review recommendations**  

Follow the recommended actions to respond to threats.  

📈  

### **Track**  

Track threat trends over time to identify patterns.

# 

Events Monitor

![](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/assets/RoHLv0/header%20for%20threat%20and%20events.png)

**The Events Monitor helps you visualize, explore, and refine insights from actions and actors in your organization's SaaS environment.**

## 

**View user activities**

The **Events Monitor** provides detailed visibility into user activities across your SaaS applications, enabling you to investigate suspicious behaviors and potential security incidents. Review the key features of the Events Monitor in each tab below.

Unified Activity Log

Advanced Filtering

Contextual Information

Timeline Analysis

Anomaly Highlighting

**A consolidated view of user activities** across all connected applications, normalized into a consistent format.

This feature ensures that all activity data is presented in a unified manner, making it easier to analyze and interpret.

Powerful filtering capabilities that allow you to **focus on specific users, applications, activity types, or time periods.**

These filters help you quickly narrow down the data to find exactly what you need, saving time and improving efficiency.

Rich context for each activity, including **user details, location information, device data, and more.**

This detailed information provides deeper insights into user behavior and helps in identifying potential issues or anomalies.

The ability to **view activities in chronological order**, helping you understand the sequence of events during an incident.

This feature is particularly useful for reconstructing events and identifying the root cause of incidents.

**Automatic highlighting of unusual activities,** such as logins from new locations or devices.

By identifying anomalies, this feature helps you quickly detect and respond to potential security threats.

This approach is built on Falcon Shield's API-based integration model, which connects directly to your SaaS applications to collect identity data, analyze security configurations, and monitor user activities.# 

Configuring alerts

![](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/5af0d8fcd4a88be01eccaccb387bfa1d2c1fec6a81720925906740fad03e16f1/scormcontent/assets/RoHLv0/header%20for%20threat%20and%20events.png)

**Falcon Shield helps identify common identity attack patterns by continuously monitoring user authentication and access behaviors across integrated SaaS applications.**

## 

**Common identity attack patterns**

Understanding common identity attack patterns helps you recognize potential threats in your environment. Falcon Shield is designed to detect these patterns across your SaaS ecosystem. 

1. Click to flip
    
    **Account Takeover**
    
2. Click to flip
    
    **Privilege Escalation**
    
3. Click to flip
    
    **Persistent Access**
    
4. Click to flip
    
    **Data Exfiltration**
    
5. Click to flip
    
    **Anomaly Highlighting**
1. Click to flip
    
    An attacker gains unauthorized control of a legitimate user account, often through stolen credentials or social engineering.
    
2. Click to flip
    
    An attacker expands their access by exploiting weaknesses to gain higher-level permissions within the SaaS environment.
    
3. Click to flip
    
    An attacker maintains long-term unauthorized access by creating backdoors, tokens, or hidden identities to survive credential resets or remediation.
    
4. Click to flip
    
    An attacker extracts sensitive data from the SaaS environment to an external location without authorization.
    
5. Click to flip
    
    The detection or identification of abnormal identity or access behavior that indicates potential malicious activity or compromise.
Account takeover patterns

Privilege Escalation Patterns

Persistent Access Patterns

Data Exfiltration Patterns

Anomaly Highlighting

**Scenario:**

An attacker sends a convincing phishing email to a Salesforce administrator, tricking them into entering their credentials on a fake login page. The attacker then logs into Salesforce with those credentials, bypassing MFA by using a stolen session cookie from the victim’s browser.

**Result:**

The attacker can now impersonate the admin, access customer records, and modify user permissions.

**Behaviors to monitor:**

- Multiple failed login attempts followed by a successful login
    
- Successful login from an unusual location or device
    
- Password or MFA method changes immediately after login
    
- Unusual activities after login, such as mass downloads or configuration changes
**Scenario:**  
A malicious insider in a Microsoft 365 tenant discovers that a misconfigured role allows users in a "Support" group to create new service accounts. The insider creates a new account and assigns it the “Global Admin” role, giving themselves full control of the tenant.

**Result:**  
The attacker gains elevated privileges far beyond their intended access, allowing widespread data and configuration manipulation.

**Behaviors to monitor:**

- User being added to privileged roles without proper approval
    
- Sudden increase in permission scope
    
- Creation of new administrative accounts
    
- Modification of security settings to reduce controls
**Scenario:**  
After compromising an Okta admin account, an attacker creates a new API token and a hidden service account tied to their external domain. Even after the admin’s credentials are reset, the attacker’s service account remains active and undetected for weeks.

**Result:**  
The attacker retains continuous access to user data and authentication logs despite remediation efforts.

**Behaviors to monitor:**

- Creation of OAuth applications with excessive permissions
    
- Addition of secondary authentication methods
    
- Creation of service accounts with long-lived credentials
    
- Modification of session timeout settings
**Scenario:**  
Using a compromised Google Workspace account, an attacker runs a Google Apps Script to automatically copy sensitive company documents from Drive to an external Gmail account every night.

**Result:**  
Corporate intellectual property is continuously leaked without immediate detection.

**Behaviors to monitor:**

- Mass downloading of documents
    
- Unusual sharing of resources with external domains
    
- Export of user lists or other sensitive data
    
- Access to resources outside normal job functions
**Scenario:**  
Using a compromised Google Workspace account, an attacker runs a Google Apps Script to automatically copy sensitive company documents from Drive to an external Gmail account every night.

**Result:**  
Corporate intellectual property is continuously leaked without immediate detection.

**Behaviors to monitor:**

- Mass downloading of documents
    
- Unusual sharing of resources with external domains
    
- Export of user lists or other sensitive data
    
- Access to resources outside normal job functions
**Scenario:**  
CrowdStrike Falcon Identity detects that a user’s Okta account is logging in from two impossible locations—California and Singapore—within five minutes. The system flags this as an anomalous pattern compared to the user’s normal behavior.

**Result:**  
The alert triggers an automated response that suspends the account and prompts security teams to investigate a potential account takeover.

**Monitor:** Automatic highlighting of unusual activities, such as logins from new locations or devices.

By identifying anomalies, this feature helps you quickly detect and respond to potential security threats.