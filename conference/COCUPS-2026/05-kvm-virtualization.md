# How a VM Works: CPU, Memory & Interrupt Virtualization with KVM and Virtio

**Source recording:** 新錄音 29
**Speaker:** **Yung-Tse Cheng** (per schedule) — associated with Prof. Jin (Ching-Chun) Hong's RISC-V group
**COSCUP session:** 「How a VM Draws…」 (KVM / virtualization), Room TR213, Day 1
**Topic tags:** Hardware-assisted virtualization, VM entry/exit, hypercalls, two-stage memory translation, TLB, ARM GIC, KVM, Virtio, Virtio-GPU

---

## One-line summary

A layered walkthrough of how a virtual machine actually runs — **CPU** (direct execution + VM
entry/exit), **memory** (two-stage address translation), **interrupts** (GIC injection), and
**I/O** (Virtio paravirtualization) — grounded in ARM64 KVM kernel code and the team's own
RISC-V emulator.

## CPU virtualization

### From binary translation to direct execution

- Historically, VMware used **dynamic binary translation**: replace a sensitive instruction with a "hyper block" so the hypervisor performs the operation safely — used before Intel/AMD shipped hardware virtualization.
- Today, same-architecture VMs use **direct execution with hardware-assisted virtualization**: most guest instructions run **directly on the physical CPU**. Normal instructions run directly; sensitive operations/events transfer control to the hypervisor. Performance can be near-native.
- OSes expose these features through their own infra: **Linux → KVM**, **macOS → Hypervisor.framework**.

### VM entry / VM exit / hypercalls

If guest code runs directly on the CPU, how does the hypervisor regain control?

- **VM entry** — transfers execution from hypervisor to a guest vCPU. The hypervisor prepares the guest environment first; the processor then executes guest instructions directly.
- **VM exit** — the reverse: from guest back to hypervisor, caused by an interrupt, a trap, a register access, or another event needing hypervisor intervention.
- **Hypercall** — the guest explicitly requests a service from the hypervisor.

**ARM64 example:** when the guest reads a trapped system register, the processor transfers control
to the hypervisor at **EL2** (exception level 2). The hypervisor supplies a **virtual value**
instead of exposing the physical register, then executes `eret` to return to the guest. In the
kernel's ARM64 KVM implementation: before entering, KVM restores the guest CPU context, then
`eret` transitions into the guest; on a trapped event, control goes to an **EL2 exception
handler** that records the exit reason, branches to the exit path, saves guest CPU state, and
returns to the host.

## Memory virtualization

### Review: virtual memory on a normal OS

- Each process gets private, isolated memory via **virtual memory**: virtual memory is divided into **pages**, physical memory into equally-sized **frames**, mapped by **page tables**.
- Translation is done by the **MMU**. On a virtual address, the MMU checks the **TLB** (translation lookaside buffer) for a cached translation; on a miss, the **table-walk unit** reads the page table from memory, then caches the result in the TLB.
- **Why the TLB matters:** page tables live in memory, so translation adds memory accesses — a 4-level page table can need **up to 4 extra memory accesses**. The TLB (fast SRAM) caches recent translations to avoid this.

### Two-stage translation in a VM

A VM adds a **second stage** of address translation:

- **Stage 1** (guest OS): guest virtual address → **intermediate physical address (IPA)**.
- **Stage 2** (hypervisor): IPA → real physical address.

The guest manages its own stage-1 page tables; the hypervisor uses **stage-2 page tables** to
control the guest's access to physical memory.

## Interrupt virtualization

- A physical device raises an interrupt → delivered to the hypervisor → hypervisor identifies the target VM and **injects a virtual interrupt** into its vCPU → the guest handles it like a normal hardware interrupt.
- Modern interrupt controllers provide hardware virtualization support to cut hypervisor intervention. On ARM this is the **GIC** (Generic Interrupt Controller).

## KVM

- **KVM = Kernel-based Virtual Machine**, a Linux kernel subsystem providing hardware-assisted virtualization — it turns Linux into a hypervisor.
- Each **VM is a Linux process**; each **vCPU is a thread**. QEMU creates and controls VMs through the **`/dev/kvm`** interface.
- KVM executes guest code directly on the physical CPU and manages memory virtualization; **QEMU** provides the virtual machine model and virtual devices.

## I/O virtualization with Virtio

- **Virtio** is a standard **paravirtualized** I/O interface between guest drivers and virtual devices. Guest driver and virtual device exchange requests through shared-memory queues called **virtqueues**.
- **Why paravirtualize?** A fully emulated device needs many trapped register accesses and VM exits. A virtualization-aware interface like Virtio makes data exchange efficient by reducing repeated trap-into/return-from the hypervisor.
- **Virtqueue flow:** guest writes request descriptors → adds them to the **available ring** → notifies the device → device reads and processes → adds a completion entry to the **used ring** → notifies the guest.

### Virtio-GPU

- Defines command groups for graphics virtualization:
  - **2D commands** — non-accelerated rendering (resource creation, data transfers, display updates).
  - **3D commands** — hardware-accelerated rendering using the physical GPU.
  - **Cursor** commands — cursor update/movement.
- The guest driver talks to a virtual GPU via the Virtio interface.
- **Demo:** GPU virtualization running on **SEMU** (the team's RISC-V system emulator) — left side non-accelerated 2D-only, right side with 3D acceleration.

## The team's open-source projects

The speaker points to two RISC-V emulator projects, both **led and maintained by Professor
Jin (Ching-Chun) Hong**, and prior talks at **Open Source Summit North America 2026**:

| Project | What it is | Link |
|---|---|---|
| **RV32EMU** | RISC-V (RV32) instruction-set emulator | https://github.com/sysprog21/rv32emu |
| **SEMU** | RISC-V system emulator (runs Linux; used for the Virtio-GPU demo) | https://github.com/sysprog21/semu |

## Referenced concepts

| Item | What it is | Link |
|---|---|---|
| **KVM** | Linux kernel hypervisor subsystem | https://docs.kernel.org/virt/kvm/ |
| **Virtio** | Paravirtualized I/O standard | https://docs.oasis-open.org/virtio/virtio/v1.2/virtio-v1.2.html |
| **ARM GIC** | Generic Interrupt Controller | https://developer.arm.com/documentation/ihi0069/ |
| **QEMU** | Machine emulator + virtualizer paired with KVM | https://www.qemu.org/ |

## Note on transcript quality

This recording is in **English** and transcribes well. ASR artifacts: "SAMU" = **SEMU**,
"RV32 MU" = **RV32EMU**, "Vert.io/Vertio/bio" = **Virtio**, "Professor Jin Hong" = **Prof.
Ching-Chun (Jim) Hong** (sysprog21). Verify project names against the OSSNA 2026 slides.
