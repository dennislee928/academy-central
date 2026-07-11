1. [
    
    Devices Inventory
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/ef504a54f8e54bf2d4bd28ea591701153990c40b68772e02b48e9bd6a518c623/scormcontent/index.html#/lessons/qpkt5nRdKHMb4M-1yFEiwm1jZ7YHYuot)
    
2. [
    
    Manage permissions and access
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/ef504a54f8e54bf2d4bd28ea591701153990c40b68772e02b48e9bd6a518c623/scormcontent/index.html#/lessons/TVDU-9EilY5WrCwv6uDxu_rNZdpPkj5Q)
    
3. [
    
    Knowledge check
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/ef504a54f8e54bf2d4bd28ea591701153990c40b68772e02b48e9bd6a518c623/scormcontent/index.html#/lessons/nrQ8z58dya7m_ZE4HTYclPR9Dg10H1Hx)
    
4. [
    
    Module summary
    
    ](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/ef504a54f8e54bf2d4bd28ea591701153990c40b68772e02b48e9bd6a518c623/scormcontent/index.html#/lessons/b6dyyzftbhP-EhejgQFmX-q49MJxReWD)
This module explores how Falcon Shield evaluates device hygiene and management status, correlates it with user privileges, and enforces access policies based on endpoint trust.

## 

**Let's review**

The **Devices Inventory** delivers a comprehensive view by **connecting the critical dots between devices**, **users**, and **SaaS access**. This unified view transforms fragmented device data into **actionable security intelligence**, enabling organizations to identify and address risks before they become breaches. Read each tab below to review concepts from the video.

Immediate Security Impact

Operational Excellence

Risk-Based Approach

Strategic Value

Security teams can **instantly identify high-risk scenarios** that were previously undetectable:

• **Privileged users** accessing sensitive data from compromised devices

• **Devices with poor security hygiene** accessing critical applications

• **Unauthorized devices** with elevated access rights

• **Non-compliant devices** with sensitive data access

What once required complex correlation across multiple systems now takes seconds.

Security teams can:

• Instantly **map device-to-user relationships**

• **Monitor device security posture** in real-time

• Enforce device **compliance policies**

• **Respond rapidly** to security incidents

The solution enables **intelligent**, **context-aware security decisions** by:

• **Prioritizing device risks** based on user privileges

• **Enforcing stricter controls** for devices accessing sensitive data

• **Identifying security gaps** in critical user devices

• Maintaining **continuous device security monitoring**

Beyond immediate security benefits, the **Device Inventory enables organizations to:**

• Support **secure hybrid work** environments

• **Scale device management** efficiently

• **Strengthen compliance posture**

• **Enable business growth** while maintaining security

The Devices Inventory **transforms** device security from a blind spot into a **strategic asset** for protecting your SaaS environment.

The Devices Inventory **revolutionizes security** by providing **a unified view of devices,** **users**, and **SaaS access**. It empowers organizations to _transform fragmented data into actionable intelligence,_ enabling rapid identification of risks and seamless enforcement of compliance. Protect your SaaS environment with a solution that turns device security into a strategic advantage.

## 

**Understanding the Devices Inventory**

Each row in the Devices Inventory represents **a device reported by one or more SaaS Integrations**. Devices include **mobile devices, laptops** and **desktops** (both workstations and servers).

### 

**Identifying and merging devices**

Devices are identified and merged based on the associated user (user email address reported for the device), the device ID/serial number, device type, and the device name. If one of these details is identical, the devices will be merged into one row in the devices inventory.


## 


For example, if a mobile device is reported being associated to the same user email by several SaaS apps, the Falcon Shield SaaS Devices Inventory will automatically detect and merge it into a single row. However, if the same device is reported for two different emails, it will be detected as two separate devices and shown as 2 separate rows in the inventory. This is to avoid devices getting lost in the data when being migrated between users.

**Devices Inventory**

For each row, the Inventory includes data gathered from across the system. The data is organized into columns to allow easy viewing, including associated user, platform, operating system, and more.



**Available columns**

- **Name**
    
- **User**
    
- **Platform**
    
- **OS**
    
- **OS Version**
    
- **Managed**
    
- **Compliant**
    
- **Ownership**
    
- **Last Seen**
    
- **Integrations**
    
- **Device Checks**
    
- **Vulnerabilities**
With the exception of **Name** and **User,** columns can be added, removed, and arranged to match your preferences.

## 

**Filters and grouping**

The Devices Inventory includes the following filter and group options:

## 

Filtering

- **Integrations**
    
- **Privileged Roles:** Filter for devices based on the role of the user associated with them.
    
- **Vulnerabilities**
    
- **Agent Version**
    
- **Applications**
    
- **Compliant**
    
- **Device Checks**
    
- **Device CVEs**
    
- **Encrypted:** Encryption status as reported by different apps. A device can be encrypted using one technology, but missing important compensating encryption provided by a different app.
    
- **IP Address**
    
- **Last Seen:** Some SaaS integrations report last seen dates for devices. Data availability depends on availability in SaaS.
    
- **Mac Address**
    
- **Managed:** Is the device managed by the organization
    
- **OS**
    
- **OS Version**
    
- **Ownership**: Is the device owned by the organization
    
- **Platform**
    
- **Score:** Filter for score values as reported by different apps. Score availability depends on the SaaS selected
    
- **Serial Number**: Look up devices based on specific serial numbers. Can be set to “Contains” or “Equal to”.
    
- **User Associated:** Include or exclude unassociated devices from results
    
- **User Number**
    


## 

Grouping

The Devices Inventory supports grouping results based on the following criteria:

- **Platform**
    
- **OS**
    
- **OS Version**
    



The options available for each filter are based on the SaaS integrations you create.

## 

**Privileged Role filtering- Why is it important?**

- 1
    
    Most devices in organizations are linked to a specific user. The device is the user’s gateway into the company and its assets: trusting the user with a device meaning trusting them with information.
    
- 2
    
    The device owner is a SaaS user, and by associating it to a device. You get full visibility and control over the privileges and access that can be made in your SaaS environment through the device.
    
- 3
    
    Using the full context In the Devices Inventory can enable powerful queries, such as cross-referencing between a device with a low hygiene score and a device that is owned by a privileged (admin) user in your SaaS applications.
    
- 4
    
    The user data available here is also linked to the user inventory- remember that you can always click on the user to review its full profile, and to use the user inventory tools to look into similar-risk users!
    

**Remember:** _Adding multiple filters can lead to an "Or" or an "And" condition between them_. Multiple filters selection within a filter will return entities that match any of the selected criteria (OR). Multiple filters selection **Between** different filters will return entities who apply for all the selected filters (AND).

## 

**Devices Inventory templates**

Devices Inventory templates can assist you with the first steps in seeing and managing the vulnerabilities and risks that stem from SaaS apps, your users and their associated devices, for cleaner end-point hygiene.





Open each section below to learn more about the Devices Inventory templates.

## 

Privileged users with non-compliant devices

Organizations face significant risks when **privileged users access SaaS applications from devices with critical vulnerabilities**. These devices, combined with elevated access rights, create a **dangerous attack surface** that could lead to severe security breaches. Ensuring compliance and securing these endpoints is critical to reducing organizational risk.

Implementing strict access controls and regular device compliance checks can help mitigate these risks. Organizations must prioritize securing privileged accounts to prevent exploitation by threat actors.

## 

Stale devices

Stale devices, which **appear to be functioning normally,** often pose hidden security risks. These devices may be compromised in ways that do not trigger obvious alerts or performance issues, creating a false sense of security. Attackers design malware to operate stealthily on such systems, conducting malicious activities in the background.

Organizations should **regularly monitor and assess all devices**, even those that seem stable, to detect and address potential threats. Proactive measures can help uncover hidden vulnerabilities and ensure a robust security posture.

## 

Devices with critical vulnerabilities

Devices with critical vulnerabilities represent significant security risks to organizations. These **high-severity flaws can be exploited by threat actors** **to gain unauthorized access, elevate privileges,** or **execute malicious code**. When left unpatched, these vulnerabilities create entry points for attackers to establish persistence and move laterally within networks.

Organizations must prioritize patch management and vulnerability remediation to address these risks. Regular updates and security assessments are essential to protect sensitive data and maintain compliance with security standards.

## 

Unencrypted devices

Unencrypted devices **lack fundamental data protection mechanisms**, leaving sensitive corporate information vulnerable to unauthorized access. In the event of device loss or theft, all stored data becomes readily accessible, potentially compromising credentials and corporate resources. This absence of encryption also violates many compliance requirements and security frameworks.

To mitigate these risks, organizations should enforce encryption policies for all devices, particularly mobile devices and laptops. Encryption ensures that data remains secure, even if physical security cannot be guaranteed.


  

#### 🔑 **Key Concept**  

Using Falcon Shield, you can enforce device-based access controls, monitor high-risk endpoints, and integrate device context into broader security decisions across your SaaS environment.  

should now be able to:

- •
    
    Analyze device-user relationships to identify potential risks and security conditions.
    
- •
    
    Leverage the Falcon SaaS Devices inventory to gain insights into the device security landscape.
    
- •
    
    **Evaluate and manage device risks associated with SaaS usage effectively.**