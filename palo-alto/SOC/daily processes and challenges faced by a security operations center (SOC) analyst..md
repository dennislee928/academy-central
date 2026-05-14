



## The Challenges

Today, SOC analysts must pivot from security console to security console to gather investigative clues for incidents. This slows down analysts as they attempt to investigate and respond to attacks.

### Too Many Tools

To block every possible attack vector, many large organizations have deployed countless tools, all disconnected from each other. Many enterprises today have over 30 point products. The following are the limitations of the current tools.

#### Prioritization  
  

Current tools do not allow teams to easily prioritize alerts for review.

#### Full Context  
  

Current tools do not provide all the context required for investigations.

#### Sophisticated Filtering  
  

Each company has to create its own rules to filter out low-priority alerts.

### Too Many Alerts

These 30 or more tools that organizations have provisioned cause the next big challenge: too many alerts. These alerts often overwhelm security teams.

  

According to a survey of security professionals, organizations can only investigate less than 7 percent of the alerts they receive.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/5efb912b426f4c44fe206c8d/large.png)

### Siloed Tools

When tools are siloed, network and desktop operators are forced to dedicate time to install, manage, and maintain extra appliances, servers, and agents.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/652413daab1cd47bac62f733/original.png)

## Typical Alert Investigation Steps

Investigating an alert is time-consuming, requiring specialized skills to investigate each alert and get a full picture of each attack. 

The following describes the three key steps of a typical alert investigation for a SOC analyst.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/6520ad76ab1cd47bac191f19/large.png)

### Organization Forwards High-Level Alerts.

An organization might forward high-level security alerts from its separate security tools, network traffic analysis, or network intrusion detection system (IDS) to its security information and event management (SIEM).

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/6520ade9ab1cd47bac20d423/large.png)

### SOC Analyst Pivots to Analysis Tool.

A SOC analyst looking at the SIEM must pivot to the network traffic analysis tool to view network details, such as why the alert was generated and what other network activity was observed from the attack source.

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/6520adfdab1cd47bac255a39/large.png)

### SOC Analyst Reviews Logs and Investigates Malicious Activity.

The analyst must try to figure out which user is associated with the attack by reviewing Active Directory (AD) logs. Then, the analyst must swivel to their endpoint detection and response (EDR), or endpoint detection and response console, to review which processes are running on the endpoint and see if any are malicious.

## Defined Processes

A typical SOC analyst needs to follow their organization's well-defined processes to function properly and effectively in their daily shifts.

Well-defined processes prepare analysts to resolve security alarms. The tasks of alarm analysis and data analysis can be split, with different levels of analysts investigating each. The following diagram depicts the daily SOC processes for analysts. 

![](https://cdn5.dcbstatic.com/files/p/a/paloaltonetworks_docebosaas_com/1778770800/8RK_HUwBtKjYmPcqTTf17A/scorm/b38e7764e64632771e0dc9c953bf3c0bf89043cb7173f78d825d307490b24b44/course/en/assets/65240fd0ab1cd47bac4ced68/original.png)