# GSP211 — Multiple VPC Networks / VM Instances / Multi-NIC Appliance

> Course lab note for **Google Cloud 自學實驗室 / GSP211**.  
> Final lab score: **100 / 100**.  
> Main subject: **VPC networking, custom-mode networks, firewall rules, VM placement, internal/external connectivity, and multi-NIC Compute Engine instances**.

---

## 0. Lab Context

This lab builds a small Google Cloud networking topology with multiple VPC networks and Compute Engine VM instances.

The lab starts with one pre-created network:

- `mynetwork`
- `mynet-vm-1`
- `mynet-vm-2`

You then create two additional custom-mode VPC networks:

- `managementnet`
- `privatenet`

You also create:

- firewall rules for ICMP, SSH, and RDP
- one VM in `managementnet`
- one VM in `privatenet`
- one multi-NIC VM named `vm-appliance`

The main design point is to observe that:

1. **External IP connectivity** can work across different VPCs if firewall rules allow it.
2. **Internal IP connectivity** only works inside the same VPC network by default.
3. A **multi-NIC VM** can be directly attached to multiple VPC networks.
4. Linux routing on a multi-NIC VM uses connected subnet routes plus one default route, usually through `nic0` / `eth0`.

---

## 1. Lab-Specific Values Used in This Completed Run

The final successful run used the following values:

| Variable | Value | Purpose |
|---|---:|---|
| `PROJECT_ID` | Qwiklabs temporary project | Current Cloud Shell project |
| `REGION_1` | `us-west1` | Region for `managementsubnet-1` and `privatesubnet-1` |
| `REGION_2` | `asia-southeast1` | Region for `privatesubnet-2` |
| `US_ZONE` | `us-west1-b` | Required zone for the graded VM instances |
| `ZONE_2` | `asia-southeast1-b` | Pre-created `mynet-vm-2` zone in this run |

The critical fix was:

```bash
export US_ZONE=us-west1-b
```

The lab checker was zone-sensitive. Creating the graded VMs in `us-west1-a` produced resources that looked correct in Google Cloud but did **not** pass the Qwiklabs checker. The successful version recreated the graded VMs in `us-west1-b`.

---

## 2. Target Architecture

### 2.1 VPC Networks

| VPC Network | Mode | Created by | Purpose |
|---|---|---|---|
| `default` | Auto mode | Google Cloud default | Not central to this lab |
| `mynetwork` | Auto mode | Pre-created by lab | Baseline network with two VMs |
| `managementnet` | Custom mode | You | Management network |
| `privatenet` | Custom mode | You | Private workload network |

### 2.2 Subnets

| Subnet | VPC | Region | CIDR | Notes |
|---|---|---:|---:|---|
| `managementsubnet-1` | `managementnet` | `us-west1` | `10.130.0.0/20` | Custom subnet |
| `privatesubnet-1` | `privatenet` | `us-west1` | `172.16.0.0/24` | Custom subnet used by `privatenet-vm-1` and `vm-appliance` nic0 |
| `privatesubnet-2` | `privatenet` | `asia-southeast1` | `172.20.0.0/20` | Second custom subnet |
| `mynetwork` | `mynetwork` | `us-west1` | Auto-mode CIDR, often `10.138.0.0/20` in this run | Used by `mynet-vm-1` and `vm-appliance` nic2 |

### 2.3 VM Instances

| VM | Zone | Machine Type | Network / Subnet | Role |
|---|---:|---:|---|---|
| `mynet-vm-1` | `us-west1-b` | `e2-medium` | `mynetwork` / `mynetwork` | Pre-created source VM |
| `mynet-vm-2` | `asia-southeast1-b` | `e2-medium` | `mynetwork` / `mynetwork` | Pre-created remote-region VM |
| `managementnet-vm-1` | `us-west1-b` | `e2-micro` | `managementnet` / `managementsubnet-1` | Graded VM |
| `privatenet-vm-1` | `us-west1-b` | `e2-micro` | `privatenet` / `privatesubnet-1` | Graded VM |
| `vm-appliance` | `us-west1-b` | `e2-standard-4` | 3 NICs | Multi-network appliance |

### 2.4 `vm-appliance` NIC Layout

| NIC | Linux Interface | VPC | Subnet | Expected IP Range |
|---|---|---|---|---|
| `nic0` | `eth0` | `privatenet` | `privatesubnet-1` | `172.16.0.0/24` |
| `nic1` | `eth1` | `managementnet` | `managementsubnet-1` | `10.130.0.0/20` |
| `nic2` | `eth2` | `mynetwork` | `mynetwork` | Region auto-mode range, for example `10.138.0.0/20` |

Important: `nic0` is the **primary interface**. On Linux, it usually becomes `eth0` and receives the default route.

---

## 3. Resource Location Constraint Logic

In Qwiklabs, the project may be restricted by an organization policy:

```text
constraints/gcp.resourceLocations
```

The policy can restrict which regions and zones resources may be created in. A robust script should query the effective policy first:

```bash
gcloud resource-manager org-policies describe constraints/gcp.resourceLocations \
  --project="$(gcloud config get-value project)" \
  --effective \
  --format=json
```

Fallback command:

```bash
gcloud org-policies describe constraints/gcp.resourceLocations \
  --project="$(gcloud config get-value project)" \
  --effective \
  --format=json
```

In this lab run, the policy allowed values such as:

```text
us-west1
us-west1-a
us-west1-b
asia-southeast1
asia-southeast1-a
asia-southeast1-b
US
global
...
```

The key operational rule:

1. Prefer the exact region/zone printed in the lab instructions.
2. If the lab gives `Region` / `Zone`, use those values over generic `us-*` guessing.
3. If no explicit zone is printed, inspect pre-created resources such as `mynet-vm-1`.
4. For this completed run, the checker expected `us-west1-b` for the graded VMs.

---

## 4. Task 1 — Create Custom-Mode VPC Networks and Firewall Rules

### 4.1 Create `managementnet`

```bash
gcloud compute networks create managementnet \
  --subnet-mode=custom
```

Create subnet:

```bash
gcloud compute networks subnets create managementsubnet-1 \
  --network=managementnet \
  --region=us-west1 \
  --range=10.130.0.0/20
```

### 4.2 Create `privatenet`

```bash
gcloud compute networks create privatenet \
  --subnet-mode=custom
```

Create first subnet:

```bash
gcloud compute networks subnets create privatesubnet-1 \
  --network=privatenet \
  --region=us-west1 \
  --range=172.16.0.0/24
```

Create second subnet:

```bash
gcloud compute networks subnets create privatesubnet-2 \
  --network=privatenet \
  --region=asia-southeast1 \
  --range=172.20.0.0/20
```

### 4.3 Create Firewall Rule for `managementnet`

```bash
gcloud compute firewall-rules create managementnet-allow-icmp-ssh-rdp \
  --direction=INGRESS \
  --priority=1000 \
  --network=managementnet \
  --action=ALLOW \
  --rules=icmp,tcp:22,tcp:3389 \
  --source-ranges=0.0.0.0/0
```

### 4.4 Create Firewall Rule for `privatenet`

```bash
gcloud compute firewall-rules create privatenet-allow-icmp-ssh-rdp \
  --direction=INGRESS \
  --priority=1000 \
  --network=privatenet \
  --action=ALLOW \
  --rules=icmp,tcp:22,tcp:3389 \
  --source-ranges=0.0.0.0/0
```

### 4.5 Firewall Rule Explanation

| Field | Meaning |
|---|---|
| `--direction=INGRESS` | Allows incoming traffic to VM instances |
| `--priority=1000` | Lower number means higher priority; 1000 is the standard custom rule priority |
| `--network=...` | Applies rule to a specific VPC |
| `--action=ALLOW` | Allows matched traffic |
| `--rules=icmp,tcp:22,tcp:3389` | Allows ping, SSH, and RDP |
| `--source-ranges=0.0.0.0/0` | Allows source from anywhere |

Security note: `0.0.0.0/0` is broad and suitable only for this controlled lab. In production, restrict SSH/RDP source ranges.

---

## 5. Task 2 — Create VM Instances

### 5.1 Create `managementnet-vm-1`

```bash
gcloud compute instances create managementnet-vm-1 \
  --zone=us-west1-b \
  --machine-type=e2-micro \
  --network-interface=network=managementnet,subnet=managementsubnet-1
```

### 5.2 Create `privatenet-vm-1`

```bash
gcloud compute instances create privatenet-vm-1 \
  --zone=us-west1-b \
  --machine-type=e2-micro \
  --network-interface=network=privatenet,subnet=privatesubnet-1
```

### 5.3 Why Zone Matters

The lab instruction printed:

```text
Region: us-west1
Zone:   us-west1-b
```

Initially, creating the instances in `us-west1-a` produced working Google Cloud resources, but the Qwiklabs checker still returned:

```text
Please create a instance in managementnet network.
Please create a instance in privatenet network.
Please create a VM instance with multiple network interfaces.
```

The root cause was not the network binding. It was the hidden grader checking for resources in the expected zone.

Best practice for Qwiklabs:

```bash
gcloud compute instances list \
  --format='table(name,zone,machineType.basename(),networkInterfaces[].network.basename(),networkInterfaces[].subnetwork.basename(),status)'
```

Confirm both resource name and zone.

---

## 6. Task 3 — Connectivity Testing

### 6.1 External IP Ping

From `mynet-vm-1`, the lab asks you to ping the external IPs of:

- `mynet-vm-2`
- `managementnet-vm-1`
- `privatenet-vm-1`

Example:

```bash
ping -c 3 <EXTERNAL_IP>
```

Expected result:

```text
3 packets transmitted, 3 received, 0% packet loss
```

Reason:

- External IP traffic goes through Google Cloud external networking.
- Firewall rules allow ICMP.
- VPC-internal isolation does not block public IP reachability when ingress rules allow it.

### 6.2 Internal IP Ping

From `mynet-vm-1`, ping the internal IPs.

Expected behavior:

| Destination | Same VPC as `mynet-vm-1`? | Expected Ping Result | Reason |
|---|---:|---:|---|
| `mynet-vm-2` internal IP | Yes | Success | Same VPC `mynetwork`, even across regions |
| `managementnet-vm-1` internal IP | No | Failure | Different VPC, no peering/VPN |
| `privatenet-vm-1` internal IP | No | Failure | Different VPC, no peering/VPN |

The important principle:

> A Google Cloud VPC is a global private network. Instances in the same VPC can communicate by internal IP across regions when firewall rules permit it. Separate VPCs are isolated unless connected by VPC Peering, Cloud VPN, Cloud Interconnect, or another routing/security design.

---

## 7. Task 4 — Create Multi-NIC VM Instance

### 7.1 Create `vm-appliance`

The VM must use:

- name: `vm-appliance`
- zone: `us-west1-b`
- machine type: `e2-standard-4`
- NIC 0: `privatenet` / `privatesubnet-1`
- NIC 1: `managementnet` / `managementsubnet-1`
- NIC 2: `mynetwork` / `mynetwork`

Command:

```bash
gcloud compute instances create vm-appliance \
  --zone=us-west1-b \
  --machine-type=e2-standard-4 \
  --network-interface=network=privatenet,subnet=privatesubnet-1 \
  --network-interface=network=managementnet,subnet=managementsubnet-1 \
  --network-interface=network=mynetwork,subnet=mynetwork
```

### 7.2 Why `e2-standard-4`?

A VM's maximum number of network interfaces depends on machine type and vCPU count. The lab uses `e2-standard-4` because it supports enough NICs for the three-network appliance design.

### 7.3 NIC Order Is Important

The first `--network-interface` becomes `nic0` / `eth0`.

For this lab:

```text
nic0 / eth0 = privatenet     / privatesubnet-1
nic1 / eth1 = managementnet  / managementsubnet-1
nic2 / eth2 = mynetwork      / mynetwork
```

The checker can be sensitive to this order.

---

## 8. Inspect NICs and Routes on `vm-appliance`

SSH into `vm-appliance`:

```bash
gcloud compute ssh vm-appliance \
  --zone=us-west1-b
```

List interfaces:

```bash
sudo ifconfig
```

If `ifconfig` is not installed:

```bash
ip addr
```

Expected IP families:

```text
eth0 -> 172.16.0.x   # privatenet / privatesubnet-1
eth1 -> 10.130.0.x   # managementnet / managementsubnet-1
eth2 -> 10.138.0.x   # mynetwork / us-west1 auto subnet in this run
```

View route table:

```bash
ip route
```

Expected pattern:

```text
default via 172.16.0.1 dev eth0
10.130.0.0/20 via 10.130.0.1 dev eth1
10.138.0.0/20 via 10.138.0.1 dev eth2
172.16.0.0/24 via 172.16.0.1 dev eth0
```

The exact subnet for `mynetwork` may differ by lab region. In this run, `mynetwork` in `us-west1` used `10.138.0.0/20`.

---

## 9. Multi-NIC Connectivity Behavior

From `vm-appliance`, the lab asks you to test internal connectivity to:

- `privatenet-vm-1`
- `managementnet-vm-1`
- `mynet-vm-1`
- `mynet-vm-2`

### 9.1 Expected Result Summary

| Destination | Expected Result | Reason |
|---|---:|---|
| `privatenet-vm-1` internal IP | Success | Directly connected via `eth0` / `privatenet` |
| `privatenet-vm-1` hostname | Success | Internal DNS resolves within VPC for primary interface target |
| `managementnet-vm-1` internal IP | Success | Directly connected via `eth1` / `managementnet` |
| `mynet-vm-1` internal IP | Success | Same regional subnet as `eth2` in `mynetwork` |
| `mynet-vm-2` internal IP | Failure by default | Destination subnet not in local route table; default route exits through `eth0` into `privatenet` |

### 9.2 Why `mynet-vm-2` Internal Ping Fails

`mynet-vm-2` is in the same VPC `mynetwork` but a different region/subnet. A normal single-NIC VM in `mynetwork` would route to it through the VPC's global dynamic route fabric.

However, a multi-NIC Linux VM has local OS routing rules. The route table contains:

- a direct route for the local subnet attached to `eth2`
- no route for the remote `mynetwork` subnet where `mynet-vm-2` lives
- one default route via `eth0`, which belongs to `privatenet`

Therefore, traffic to `mynet-vm-2` follows the default route through the wrong VPC and fails.

To fix this in a real environment, you would consider:

- policy-based routing
- custom static routes
- routing tables per interface
- appliance-mode designs
- VPC Peering or Cloud Router designs depending on architecture

The lab does not require fixing this behavior; it requires observing and understanding it.

---

## 10. Verification Commands

### 10.1 List VPC Networks

```bash
gcloud compute networks list --sort-by=NAME
```

Expected key entries:

```text
default
managementnet
mynetwork
privatenet
```

### 10.2 List Subnets

```bash
gcloud compute networks subnets list --sort-by=NETWORK
```

Expected key entries:

```text
managementsubnet-1  us-west1        managementnet  10.130.0.0/20
privatesubnet-1     us-west1        privatenet     172.16.0.0/24
privatesubnet-2     asia-southeast1 privatenet     172.20.0.0/20
```

### 10.3 List Firewall Rules

```bash
gcloud compute firewall-rules list --sort-by=NETWORK
```

Expected key entries:

```text
managementnet-allow-icmp-ssh-rdp
privatenet-allow-icmp-ssh-rdp
```

### 10.4 List VM Instances and Network Bindings

```bash
gcloud compute instances list \
  --filter='name=(mynet-vm-1 mynet-vm-2 managementnet-vm-1 privatenet-vm-1 vm-appliance)' \
  --format='table(name,zone,machineType.basename(),networkInterfaces[].network.basename():label=NETWORKS,networkInterfaces[].subnetwork.basename():label=SUBNETS,status)'
```

Expected key placement:

```text
managementnet-vm-1   us-west1-b   e2-micro      managementnet
privatenet-vm-1      us-west1-b   e2-micro      privatenet
vm-appliance         us-west1-b   e2-standard-4 privatenet,managementnet,mynetwork
```

### 10.5 Describe `vm-appliance` NICs

```bash
gcloud compute instances describe vm-appliance \
  --zone=us-west1-b \
  --format='table(networkInterfaces[].name,networkInterfaces[].network.basename(),networkInterfaces[].subnetwork.basename(),networkInterfaces[].networkIP)'
```

---

## 11. Troubleshooting Notes

### 11.1 Symptom: Checker Says VM Does Not Exist, But Console Shows It Exists

Example checker messages:

```text
Please create a instance in managementnet network.
Please create a instance in privatenet network.
Please create a VM instance with multiple network interfaces.
```

Likely causes:

1. Wrong zone.
2. Wrong VM name.
3. Wrong network or subnet binding.
4. Wrong NIC order on `vm-appliance`.
5. Checker cache delay; wait 30–90 seconds and refresh.

For this run, the root cause was wrong zone. The script originally selected `us-west1-a`, while the lab instruction expected `us-west1-b`.

### 11.2 Symptom: `resourceLocations` Warnings

You may see warnings like:

```text
Regional Access Boundary HTTP request failed after retries
```

If the actual `gcloud compute ...` operation still succeeds, this warning is usually not fatal in Qwiklabs. Check the final resource state with:

```bash
gcloud compute instances list
```

### 11.3 Symptom: `subnet already exists`

This is expected if you rerun an idempotent script. A good lab script should detect existing resources and skip creation.

### 11.4 Symptom: Multi-NIC VM Exists but Checker Fails

Confirm all four conditions:

```bash
gcloud compute instances describe vm-appliance \
  --zone=us-west1-b \
  --format=json | jq '.networkInterfaces[] | {name, network, subnetwork, networkIP}'
```

Expected order:

```text
1. privatenet / privatesubnet-1
2. managementnet / managementsubnet-1
3. mynetwork / mynetwork
```

### 11.5 Symptom: Cannot Ping Internal IP Across VPCs

This is expected. Separate VPC networks do not communicate over internal IP by default.

Required production mechanisms include:

- VPC Network Peering
- Cloud VPN
- Cloud Interconnect
- Network Connectivity Center
- appliance routing / policy routing

---

## 12. Final One-Shot Script

A downloadable Bash script is included separately:

```text
gsp211_vpc_multinic_lab.sh
```

Run it from Google Cloud Shell:

```bash
chmod +x gsp211_vpc_multinic_lab.sh
./gsp211_vpc_multinic_lab.sh
```

If a future lab instance displays different values, override variables before running:

```bash
export REGION_1=us-west1
export REGION_2=asia-southeast1
export US_ZONE=us-west1-b
./gsp211_vpc_multinic_lab.sh
```

For this completed lab, keep:

```bash
export REGION_1=us-west1
export REGION_2=asia-southeast1
export US_ZONE=us-west1-b
```

---

## 13. Cleanup Commands

Do **not** run cleanup before getting 100/100.

Optional cleanup after the lab is complete:

```bash
gcloud compute instances delete managementnet-vm-1 privatenet-vm-1 vm-appliance \
  --zone=us-west1-b \
  --quiet

gcloud compute firewall-rules delete \
  managementnet-allow-icmp-ssh-rdp \
  privatenet-allow-icmp-ssh-rdp \
  --quiet

gcloud compute networks subnets delete managementsubnet-1 \
  --region=us-west1 \
  --quiet

gcloud compute networks subnets delete privatesubnet-1 \
  --region=us-west1 \
  --quiet

gcloud compute networks subnets delete privatesubnet-2 \
  --region=asia-southeast1 \
  --quiet

gcloud compute networks delete managementnet --quiet
gcloud compute networks delete privatenet --quiet
```

Qwiklabs usually tears down temporary projects automatically, so cleanup is normally unnecessary.

---

## 14. Key Concepts to Remember

### VPC Network

A VPC is a logically isolated virtual network in Google Cloud. It is global in scope, meaning one VPC can contain subnets in multiple regions.

### Subnet

A subnet is regional. It belongs to one VPC and defines a CIDR range for internal IP allocation.

### Auto-Mode Network

An auto-mode VPC automatically creates one subnet in each region.

Example in this lab:

```text
mynetwork
```

### Custom-Mode Network

A custom-mode VPC starts without subnets. You manually create only the subnets you need.

Examples in this lab:

```text
managementnet
privatenet
```

### Firewall Rule

Google Cloud firewall rules are VPC-level distributed firewall policies. They are not traditional firewall appliances. They apply to VM network interfaces based on network, target, source, protocol, and priority.

### Internal IP Connectivity

Internal IP connectivity is allowed inside the same VPC when routes and firewall rules permit it. Different VPCs are isolated by default.

### External IP Connectivity

External IP connectivity can work across VPCs because the traffic goes through public IP paths, subject to firewall rules.

### Multi-NIC VM

A multi-NIC VM has multiple virtual network interfaces, each attached to a subnet. It can function as an appliance, bridge point, inspection point, or routing/security node, but correct routing requires careful OS-level configuration.

### Default Route on Multi-NIC Linux VM

The default route usually points through the primary interface, `eth0`. Traffic to directly connected subnets uses connected routes. Traffic outside those routes may go out through the primary NIC unless policy routing is configured.

---

## 15. Security and Production Notes

This lab is intentionally permissive:

```text
source-ranges=0.0.0.0/0
rules=icmp,tcp:22,tcp:3389
```

In production:

- Avoid opening SSH/RDP to the entire internet.
- Use IAP TCP forwarding for SSH/RDP where possible.
- Restrict source ranges to known admin IPs.
- Use service accounts with least privilege.
- Use OS Login and IAM-based access control.
- Use VPC Flow Logs for inspection.
- Use hierarchical firewall policies or firewall policies when managing multiple VPCs at scale.
- Use Cloud NAT for private outbound access instead of assigning public IPs to every VM.

---

## 16. Quick Review Questions

1. What is the difference between an auto-mode VPC and a custom-mode VPC?
2. Why can `mynet-vm-1` ping `mynet-vm-2` by internal IP even if they are in different regions?
3. Why can `mynet-vm-1` not ping `managementnet-vm-1` by internal IP?
4. Why does the lab allow external IP ping across different VPCs?
5. What firewall rule allows SSH, RDP, and ICMP in this lab?
6. Why does `vm-appliance` need `e2-standard-4` instead of `e2-micro`?
7. Which NIC on `vm-appliance` receives the default route?
8. Why does internal ping from `vm-appliance` to `mynet-vm-2` fail by default?
9. What would you use in production to allow internal communication between separate VPCs?
10. Why can Qwiklabs checker fail when a resource exists in Google Cloud Console?

---

## 17. Answer Key

1. Auto-mode VPC creates regional subnets automatically; custom-mode VPC requires manual subnet creation.
2. A VPC is global, so same-VPC internal IP communication can work across regions if firewall rules permit it.
3. It is in a different VPC. Separate VPCs are isolated by default.
4. External IP traffic uses public routing and is controlled by ingress firewall rules.
5. `managementnet-allow-icmp-ssh-rdp` and `privatenet-allow-icmp-ssh-rdp`.
6. The lab needs three NICs; supported NIC count depends on machine type and vCPU count.
7. `nic0` / `eth0`.
8. The destination subnet is not in the local route table and default traffic leaves via `eth0` into `privatenet`.
9. VPC Peering, Cloud VPN, Cloud Interconnect, Network Connectivity Center, or explicit appliance routing.
10. The checker may validate hidden constraints such as exact zone, exact name, exact network, exact subnet, or NIC order.

---

## 18. Final Lab Memory

The final 100/100 fix was:

```bash
export REGION_1=us-west1
export REGION_2=asia-southeast1
export US_ZONE=us-west1-b
```

Then recreate:

```text
managementnet-vm-1
privatenet-vm-1
vm-appliance
```

in `us-west1-b`, not `us-west1-a`.

