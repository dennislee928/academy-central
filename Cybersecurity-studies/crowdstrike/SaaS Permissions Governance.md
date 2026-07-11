  

#### 🔑 **Key Point**  

SaaS apps often grant far more privileges than users actually need, creating opportunities for abuse or accidental data exposure. This module teaches you how to use Falcon Shield to implement the **Principle of Least Privilege (PoLP)**, detect permission drift, and enforce trimming policies to maintain access discipline

## 

**Understanding the Permissions Inventory**

**Every SaaS application has a unique permissions model and uses a different terminology**. The Falcon Shield Permissions inventory normalizes the different models into a plain view, enriching one level to reflect its true meaning from the layer below.

The inventory

Full details

Same users

Each row in the Permissions Inventory represents a **role, profile, permission set**, or **security group** reported by a SaaS Integration.

- Similarly to the Apps Inventory, permissions are displayed separately for each integration (no merging of items with identical names)
Clicking each row opens a side bar with full permission details, including a list of users to which the permissions are applied. The user list is linked to the Users Inventory- click the user to view the full profile.

- The complementary filtering option in the Users Inventory is **Privileged Roles**. For example, the M365 security group **Compliance Management (Exchange)** reports 2 users
To find the same users in the **Users inventory**, select the following filters:

- **Privileged Roles > M365** (integration name) **> Compliance Management** (Exchange)
    
    - The same two users will be presented
- ## 

**Permissions side bar**

![](https://university.crowdstrike.com/files/c/r/crowdstrike_docebosaas_com/scorm/9a76ff4d91da9d575a36d43209fe853c61f88317069ed50def81943e9a1c4bfc/scormcontent/assets/permissions%20side%20bar.jpg)

Clicking any row in the inventory opens the permission side bar, which includes full item details and additional insights:

Each item includes item **ID, Created On, Last Modified**, and **Created By** data. In addition, based on the item type, the side bar includes the following tabs:

## 

Roles

Information about Roles includes **role, role group, exchange role group, eligible role, and default role.**

- **Users**: list of users granted the role
    
- **Permissions**: detailed list of permissions granted to the role
    

Roles and role groups define the permissions and access levels assigned to users within a system. Each role includes a list of users who are granted the role, along with a detailed breakdown of the permissions associated with it.

**Role groups,** such as Exchange Role Groups, aggregate multiple roles to simplify management and ensure consistent access control across users.

**Eligible roles** consist of users that are eligible for elevated permissions via **PIM**: **Privileged Identity Management.** PIM provides time-based and approval-based role activation to mitigate the risks of excessive, unnecessary, or misused access permissions on resources that you care about. 

## 

Profile

- **Users**
    
- **Permissions**
    
- **Object Permissions:** application-specific object-level permissions (where available) in CRUD format
    

Profiles provide a structured way to manage user permissions and access within an application. They include a list of users assigned to the profile and the permissions granted to them.

Additionally, profiles may specify object-level permissions in CRUD format, allowing for fine-grained control over application-specific objects.

## 

Permission sets

- **Users**
    
- **Permissions**
    
- **Field-level Security:** application-specific field-level permissions
    

Permission sets are used to assign additional permissions to users beyond their default profile. These sets include a list of users, the permissions granted, and application-specific field-level security settings.

Field-level security ensures that users can only access or modify specific fields within an application, enhancing data protection and compliance.

## 

Permission set groups

- **Users**
    
- **Permissions**
    
- **Object Permissions**
    
- **Field-level Security**
    

Permission set groups combine multiple permission sets to streamline the assignment of permissions to users. These groups include a list of users, the permissions granted, and object-level permissions for application-specific objects.

They also encompass field-level security settings, ensuring comprehensive and efficient management of user access and data security.

## 

**Filters and grouping**

The Permissions Inventory provides a comprehensive overview of available filters and grouping options to help you manage and analyze permissions effectively. Review the key features and functionalities of the Permissions Inventory filters and grouping below.

- 1
- 2

1 of 2

1

## 

Filters

The Permissions Inventory includes various filter options to refine your data. These filters include:

- **Integration**
    
- **Permissions**
    
- **Created at**
    
- **Last Modified**
    
- **Object Permission:** Salesforce-specific permissions
    
- **Object Type:** Salesforce specific
    
- **Origin**
    
- **Sub Type:** filter based on the role type description
    
- **Type:** filter based on the role type
    
- **User**
    
- **Users Count:** number of users assigned to a role, useful for monitoring role assignments.
    

The options available for each filter depend on the SaaS integrations you create.

## 

Grouping

The Permissions Inventory allows you to group results based on specific criteria. The available grouping options include:

- **Type**
    
- **Sub Type**
    
- **Origin**
  

#### 🔑 **Key Concept**  

The Permissions Inventory is a powerful tool for managing and analyzing permissions. By utilizing the available filters and grouping options, you can efficiently organize and monitor your data to ensure optimal security and functionality.  



**Review permissions and access rights using the Principle of Least Privilege (PoLP) in two different scenarios.**

## 

**Scenario 1: SAG Salesforce**

When using Salesforce, organizations need to carefully monitor and control privileged access to prevent unauthorized access to sensitive data and critical system configurations. Without proper governance, over-privileged users could pose significant security risks through access to sensitive data, system configurations, and administrative functions.

## 

**Understanding the risks of unmanaged permissions**

Unmanaged permissions in Salesforce can lead to significant security risks. This guide will help you understand the key areas to monitor and manage to ensure your system remains secure and efficient.

- ## Step 1
    
    ### Review high-risk roles
    
    Examine roles with a high number of associated users. Determine if all assigned users genuinely require access to the permissions included in the role.
    
- ## Step 2
    
    ### Identify elevated privileges
    
    Analyze custom profiles with elevated privileges. Verify if all permissions assigned to these profiles are necessary.
    
- ## Step 3
    
    ### Validate profile configurations
    
    Ensure custom profiles are configured according to company policy. This helps maintain compliance and reduce risks.
    
- ## Step 4
    
    ### Create Security Checks
    
    Use the **Permissions Inventory** to establish custom security checks. Suggested checks include monitoring new admin role assignments, changes to system permissions, custom profile creation, and permission set modifications.
    

**Creating custom security checks can assist you in actively monitoring changes to permissions and profiles, allowing you to discover suspicious assignments as they occur. Continue with the lesson to explore creating custom Security Checks.**

## 

**Solution Value**

For organizations using Workday as a central system for HR management, establishing proper IT general controls through SOD is essential for:

1. Click to flip
    
    **Preventing occupational fraud**
    
2. Click to flip
    
    **Mitigating asset misappropriation**
    
3. Click to flip
    
    **Preventing financial misstatements**
    
4. Click to flip
    
    **Meeting compliance requirements**
    
5. Click to flip
    
    **Audit failures**
    
6. Click to flip
    
    **Data privacy concerns**
1. Click to flip
    
    Without SOD, one person could control multiple financial processes, increasing opportunities for undetected fraudulent activities.
    
2. Click to flip
    
    When one person initiates and approves transactions, the risk of funds or assets being diverted increases significantly.
    
3. Click to flip
    
    Absence of SOD allows manipulation of financial reporting and recordkeeping, potentially concealing fraudulent activities.
    
4. Click to flip
    
    Inadequate SOD creates control weaknesses flagged by auditors, possibly leading to qualified audit opinions.
    
5. Click to flip
    
    Control weaknesses from inadequate SOD are flagged by auditors, potentially resulting in qualified audit opinions.
    
6. Click to flip
    
    Overprivileged access to employee information and payroll data increases the risk of privacy violations.