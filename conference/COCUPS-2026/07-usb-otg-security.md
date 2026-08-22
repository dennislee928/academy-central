# USB MITM: 用 Raspberry Pi 打造 USB Proxy 攔截與竄改封包

**Source recording:** 新錄音 33
**Speaker:** **Aristo Chen** (per schedule) — hardware security researcher
**COSCUP session:** 「USB MITM: Build…」, Room TR213, Day 1
**Topic tags:** USB security, libusb, USB descriptors, USB OTG, Raw Gadget, configfs/functionfs, USB proxy, packet injection/modification

---

## One-line summary

How to build a **USB man-in-the-middle proxy** on a Raspberry Pi that sits between a real USB
device and a host, parses the USB packets in userspace, and **dynamically modifies** them live —
demonstrated by swapping mouse buttons, inverting cursor movement, and filtering sensor jitter.

## Background building blocks

### libusb + USB descriptors

- **libusb** is a userspace library for talking to attached USB devices — you read the device's descriptors, then do transfers.
- **USB descriptors** are like a device's "ID card." They form a hierarchy: **Device → Configuration → Interface → Endpoint**, each carrying different info — vendor/product ID, number of interfaces, class (mass storage, audio, HID…), and transfer characteristics.
- **Why it matters:** to impersonate a device, the proxy must first know exactly what the attached device *is* — that's what makes the proxying possible.

### USB transfer types

Four types:

1. **Control** — every USB device has this. At setup, the host issues **control requests** ("who are you, what type are you?" — HID? storage?). Always on **endpoint 0**.
2. **Interrupt** — HID-style devices (mouse, keyboard).
3. **Bulk** — storage, etc.
4. **Isochronous** — webcams / video-related devices.

### USB OTG (On-The-Go)

- Normal USB: when a host computer connects to a USB device, roles don't change.
- **USB OTG**: allows **host ↔ device role switching**. On the demo board (a Raspberry Pi-class SBC), the connected port can, via kernel mechanisms, make the host believe it's a USB device — e.g. presenting as serial, storage, etc.

## Kernel gadget controllers compared

Several kernel modules pair with USB OTG to present a gadget:

| Controller | What it does | Limitation |
|---|---|---|
| **Legacy `g_*` gadgets** (`g_serial`, `g_mass_storage`) | Widely known; act as a serial port, storage, etc. | Behavior is **fixed in the kernel module** — little customization |
| **Legacy gadget (packet-control era)** | Allows some simple packet control | Logic baked into the kernel module; userspace control limited |
| **Raw Gadget** | **All** packet control can go through **userspace** | The author advises **against production use** (deemed not fully mature) |
| **configfs / functionfs** | Similar functionality to the above | Also carries limits; can't fully control all packets from userspace |

### Raw Gadget specifics

- Merged into Linux in **5.7**, so kernels **≥ 5.7** can use it directly (ensure the relevant `CONFIG` is enabled or it won't compile in).
- Its role in this project: after talking to the real device via **libusb**, the proxy uses **Raw Gadget** to talk to the USB host.

## The USB proxy architecture

Putting it together yields a **proxy machine** running on the Raspberry Pi:

```
[ real USB device ] --libusb--> [ Raspberry Pi proxy program ] --Raw Gadget--> [ host computer ]
```

### Runtime flow

1. **Setup:** use libusb to pull **all descriptors** from the real device, convert them to a readable format.
2. When running, the **USB host** issues a stream of control requests asking "who are you?" — the proxy replays the converted descriptors so the host believes the Pi *is* the real device.
3. After that, the host begins the normal packet-transfer sequence. The proxy sets up handlers:
   - **Endpoint 0 handler** for control requests (control supports both input and output, but always **initiated by the host**).
   - For every other endpoint, **two queues**: for an **input endpoint** (reading from the device), read into one queue and forward via another to the host; for **output**, the read side is on the host end and the run side on the device end.

### Live demo (baseline)

The demo device is a small SBC on the desk with a **wireless mouse receiver** plugged in. Load
the kernel module, run the program (adjusting the vendor/product ID). Even though the mouse's
receiver isn't physically on the laptop, the cursor is still controllable — data flows through
the Pi, then to the computer.

## Packet modification — three levels

The offensive core: once you can **see** the packets, you can **change** them. Injection happens
at the read stage, before the data is passed on. Three escalating levels:

1. **Pattern replacement** — swap one byte pattern for another.
   - **Demo:** swap the mouse's **left and right buttons** — pressing left registers as right, and vice versa.
2. **Arithmetic** — add/subtract/multiply/divide on the data.
   - **Demo:** invert the mouse coordinates — moving left goes right, up goes down. Doubling values would make the cursor move faster; a negation reverses direction entirely.
3. **Scripted / conditional logic** — write a script to make decisions and act only under specific conditions.
   - **Demo:** aging USB devices develop **cursor jitter** — the pointer drifts even when the mouse is still. You can set a **movement threshold**: below a certain magnitude, treat it as no movement, filtering out the noise and extending the usable life of a flaky device.

> Note on the demo: mid-talk the speaker clarifies the USB proxy program runs **on the SBC**,
> not the laptop — the laptop is the victim "host."

## Security framing

Presented as **security research** (the talk sits in a security-themed track). The same proxy
that filters sensor noise for a good purpose can, with pattern/arithmetic/scripted modification,
silently alter what a keyboard or mouse reports to a host — the MITM point being that USB is
trusted implicitly, and a proxy in the middle breaks that trust.

## Referenced tools & concepts

| Item | What it is | Link |
|---|---|---|
| **libusb** | Userspace USB access library | https://libusb.info/ |
| **Raw Gadget** | Kernel interface for full userspace USB gadget control (≥ 5.7) | https://docs.kernel.org/usb/raw-gadget.html |
| **Linux USB gadget API (configfs/functionfs)** | Framework for building USB device functions | https://docs.kernel.org/usb/gadget_configfs.html |
| **USB descriptors** | Device/Config/Interface/Endpoint identity data | https://www.beyondlogic.org/usbnutshell/usb5.shtml |

> A general-purpose open-source reference implementing exactly this pattern is **USBProxy**
> (and the newer **Raw-Gadget-based `usb-proxy`** by xairy). Worth checking the speaker's slides
> for whether they published their own fork.

## Note on transcript quality

Mixed Mandarin/English, ASR-transcribed. Key resolutions: "R gage/R" = **Raw Gadget**,
"config fs / function fs" = **configfs/functionfs**, "PX machine" = **proxy machine**,
"數媒/數美/數害" (all garbled) = the **SBC / Raspberry Pi-class board**, "Crol/crol" = **control
(transfer)**, "mpoint0/point0" = **endpoint 0**, "Nogop" = **interrupt (transfer)**,
"pack/packing" = **packet**. Verify the board model and any published repo against the slides.
