# 分層剖析 Linux 核心：Fundamentals and Architectures of Linux Kernel Tracing

**Source recordings:** 新錄音 25 & 26
**Speaker:** **Hoyeon Lee** (per schedule) — technical/academic presentation
**COSCUP session:** 「Linux Kernel Tracing」 / 分層剖析 Linux 核心, Room TR213, Day 1
**Topic tags:** Ftrace, Kprobes, Tracepoints, Perf events, dynamic vs. static instrumentation, sampling

---

## One-line summary

A guided tour of the four main kernel observation mechanisms — **Kprobes, Ftrace, Tracepoints,
and Perf events** — organized around one axis (dynamic vs. static instrumentation) and one
tradeoff (event-driven precision vs. counter-driven sampling overhead).

## The organizing idea

Every mechanism answers "how do I observe what the kernel is doing?" but at different costs.
The talk builds up from the most flexible/expensive to the cheapest, then pivots from
**event-driven** tracing (pay per event) to **sampling** (pay per sample).

---

## Ftrace — dynamic instrumentation via call-site patching

The mechanism most of the talk dwells on:

- Ftrace uses instrumentation sites the **compiler already built into the kernel**, so the kernel can patch them at runtime.
- On **x86-64**, with `CONFIG_FUNCTION_TRACER=y`, the compiler inserts a **5-byte NOP** at each function entry. It does nothing by default.
- **Why 5 bytes?** That's exactly the size of an x86-64 **relative `call`** instruction (`call rel32`). At runtime, enabling Ftrace patches the 5-byte NOP into a `call` to a **trampoline**.
- **Before vs. after** (the two-column slide): without Ftrace, a function starts directly with `push %rbp`; with Ftrace enabled, the top shows the 5-byte NOP (shown as a `nop`/`nopl` form) that later becomes `call <ftrace_trampoline>`.
- Enabling: set `set_ftrace_filter` to the target function (e.g. `__do_sys_getuid`), select the **function tracer**, turn tracing on. The speaker dumped live memory with GDB to confirm the patched `call 0x...` and the `ftrace_trampoline` label.
- The **trampoline** is simple: it walks the registered Ftrace ops, calls each callback, then returns to the original function. The **function tracer** callback records the current function ID + parent ID and prints to the kernel trace buffer — this is the observation hook.
- After the callback, the trampoline restores state and the original function resumes at `push %rbp`.

### Counting with Ftrace

Filter to `__do_sys_getuid`, enable the function tracer — every `getuid` call appears in the
trace buffer, so you can count invocations (the demo showed ~36 calls via `wc`).

Other consumers of the same hook: **function graph tracer**, and **BPF** programs attached via
`fentry`/`fexit`.

## Kprobes — dynamic, but heavier

- Touches instructions directly, so it can attach **almost anywhere inside a function**, not just entry.
- The cost: it takes the **trap/exception path** (the full step), which is heavier.

### Kprobes vs. Ftrace tradeoff

| | Kprobes | Ftrace |
|---|---|---|
| Attach point | Almost anywhere in a function | Mostly function entry (+ return path) |
| Mechanism | Traps the CPU (exception) | Redirects via a trampoline `call` |
| Cost | Heavier | Lighter |
| Flexibility | Higher | Lower (compiler-inserted sites) |

Both are **dynamic instrumentation** with different flexibility/cost tradeoffs. But both still
intercept execution at runtime — there's a per-event cost. What if the observation point were
*already in the code*?

## Tracepoints — static instrumentation

- **Statically defined, low-overhead** observation points, already compiled into the kernel and maintained by kernel maintainers. At runtime you just **enable** them.

### Why `printk` doesn't scale for tracing (the motivation)

1. **String formatting cost** — must parse format strings and convert values (e.g. int → string).
2. **Global shared log buffer** — many kernel paths compete for the same logging path.
3. **Unstructured output** — different call sites print similar data in different formats (UID as "UID" vs "user identifier" vs a number), making filtering/analysis hard.

### How tracepoints solve it

- Fixed **event schemas** instead of string formatting → lower overhead.
- **Dedicated per-CPU ring buffers** instead of the global log buffer.
- **Structured event data** → easy to filter, process, aggregate.
- **Location:** built into execution paths. In the x86-64 syscall path, the actual handler (`do_syscall_x64`, the green box) runs at the bottom, and the **tracepoint fires in the orange box *before* the handler runs**.
- **What it records:** the syscall tracepoint's `TP_STRUCT__entry` has an `id` field (syscall number) and an `args` array (up to 6 syscall arguments) — a fixed schema. `TP_fast_assign` fills those fields from the current register state, writing structured data to the per-CPU ring buffer.
- Enable via the trace-events interface: `sys_enter_getuid` → every `getuid` produces a structured trace event (demo showed ~29 calls).

## The overhead benchmark

All three (Kprobes, Ftrace, Tracepoints) are event-driven — they pay a cost **every event**:

| Mode | Throughput (events/sec) | Overhead |
|---|---|---|
| Baseline (no tracing) | ~15 million | — |
| Tracepoint | ~11 million | ~4M |
| Ftrace | ~11 million | ~4M |
| Kprobes | ~9 million | ~6M |

The lesson: event-driven tracing costs per event. Sometimes you don't need every event — just
**enough** to understand behavior. That's sampling.

## Perf events — counter-driven sampling

- Instead of observing every event, observe **periodically**, usually on **counter overflow**. An event increments a counter; when it hits the sampling period, take one sample and reset. (Sampling every N: 7, 14, 21…)
- Exposed in Linux via **perf events**. A perf event attribute defines three things:
  1. **What to count** — hardware events (cycles, instructions, cache misses), software events (context switches, page faults, CPU clock), or tracepoint/Kprobe-backed events. Example: `PERF_COUNT_HW_CPU_CYCLES`, type `PERF_TYPE_HARDWARE`.
  2. **When to sample** — by counter overflow or clock; example period 100,000 (≈ one sample per 100k CPU cycles).
  3. **What to observe** — a sample can include instruction pointer, user/kernel, stack trace, PID, CPU, registers, or **call chains**. Example: `PERF_SAMPLE_IP | PERF_SAMPLE_CALLCHAIN`.

### From "count" to "where is time spent"

- Rather than counting `getuid`, ask *where the CPU spends time*. Use `perf record -e cycles -c 100000 -g` (the `-g` captures IP + call chain) instead of hand-writing C.
- Analyzing collected samples: one process dominated at **~81%** (an `rsync`-related workload), and the recorded call chains reveal which execution path was hot.
- Text/graphical reports pinpoint the hot path — the largest bar is the hottest path on the system.

## Wrap-up

The talk covered the full taxonomy of kernel event sources: **exception-based Kprobes**,
**code-patching Ftrace** (dynamic), **statically defined Tracepoints** (static), and
**Perf events** (event-driven *and* counter-driven sampling) — the best-known tracing sources
in the kernel.

### Q&A

An audience member raised **performance tuning on low-end / constrained systems** — the
recording cuts off mid-question, so no answer is captured.

## Referenced tools & concepts

| Item | What it is | Link |
|---|---|---|
| **Ftrace** | Kernel function tracer (call-site patching) | https://docs.kernel.org/trace/ftrace.html |
| **Kprobes** | Dynamic kernel instrumentation via traps | https://docs.kernel.org/trace/kprobes.html |
| **Tracepoints** | Static, structured kernel instrumentation | https://docs.kernel.org/trace/tracepoints.html |
| **perf** | Linux profiling with hardware/software counters | https://perfwiki.github.io/main/ |
| **BPF fentry/fexit** | Attaching BPF programs to function entry/exit | https://docs.kernel.org/bpf/ |

## Note on transcript quality

This recording is in **English** and transcribes cleanly, so the reconstruction above is
high-confidence. Minor ASR artifacts: "knob/node" = **NOP**, "cisco/sys" = **syscall**,
"act trampoline" = **ftrace trampoline**, "cold chain" = **call chain**, "R sync" = **rsync**,
"part/Perf" = **perf**.
