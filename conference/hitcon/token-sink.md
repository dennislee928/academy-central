# Track 5 — AI: The Token Sink (800 pts) 🟠 reversed, lab terminated

> "Summon your agents to complete the task."

Track id: `Track01M09VA9B6GHDGK6PC8K1HT2M0`. Single sub-task: **"Trap Zone"**.
This is an **adversarial trap for AI agents** — a deliberately obfuscated real-time
oracle game (`./trap` on a Linux "trap-client", reached via SSH/VNC endpoints). Win
condition is verified by a judge checking game state; there is no flag text field.

> Status: the binary was **fully reverse-engineered**, but the lab instance
> **auto-terminated (14:36) and "cannot be started again"** before a working
> authenticated shell was obtained. Needs the operator to re-provision to execute.

## Binary

x86-64 static-PIE, stripped, static-glibc ELF. **Obfuscator-LLVM control-flow
flattening across every game function** (opaque predicates + a compare-ladder
dispatch) — this is the "token sink": linear reading is intentionally expensive. TUI
byte stream: **bytes ≥ 0x80 are control/protocol; < 0x80 are screen text/artwork.**
20 rounds, 5 lives, real-time (rounds auto-advance; wrong OR late = miss).

## Algorithm (confirmed from disassembly)

- **PRNG = xorshift32** (fn `0x1cad0`): `x ^= x<<13; x ^= x>>17; x ^= x<<5;` then output
  `w = x * 0xD1A6F3B9` (imul at `0x1cc8d`). New state stored each call. **Seeded from
  `/dev/urandom`** (`0x21829`) → per-game secret, no fixed seed.
- **Displayed glyph** each round = `"TRAP"[(w >> 30) & 3]` (`0x1cd51`; alphabet `"TRAP"`
  @ rodata `0x9c250`). **The glyph is only the top 2 bits of `w`.**
- **KEY insight — the answer is NOT the glyph.** The input parser (`0xac60`, classifier
  `0xb250`) accepts only two byte values: **`0x41` (`'A'`)** and **`0xc7`** (the high-bit
  frame lead, `0x80|'G'`; emitted by `0x113c0`). Bare `'T'/'R'/'P'` are never accepted —
  non-`A` answers must travel through the **`0xc7`-framed control channel**, and the
  answer is a *finer function `f(w)`* of the same 32-bit word (its lower 30 bits).
- **Round-1's variable `c7…` payload encodes the per-game seed** (32-bit `x`, ~7-bit
  packed → 2–7 bytes after stripping `0x80`).

## Win / payoff

Clearing 20 rounds draws "C L E A R E D" (`0x9a033`), prints `TRAP cleared\nelapsed_ms=<n>`
(`0x9c480`), emits `getenv("TRAP_FLAG")` (`0x9a045`) to the client, and writes
`getenv("TRAP_CLEARED_PATH")` (default `/var/lib/trap/cleared`). Loss banner = "OUT.".
Judge checks the cleared file and/or the returned flag.

## Solver plan (oracle-based)

1. Spawn `./trap` under a pty (Python + pwntools/pyte on the trap-client shell). Keep the
   high-bit bytes.
2. **Recover the seed** `x` from round-1's `c7`-framed payload: strip `0x80` per byte, try
   LE/BE base-128 (varint) reassembly; validate by predicting the glyph
   `"TRAP"[(w>>30)&3]` for all 20 observed rounds via the PRNG.
3. **Derive `f(w)`** by oracle brute-force: at a round with known `w`, try candidate
   answers (plaintext `0x00–0xFF` **and** `0xc7 <byte>`); the winning byte is the one that
   leaves the MISS count unchanged next round. Correlate winners with `w` to solve `f`
   (likely a bit-slice like `(w>>N)&mask` or a byte of the multiply output).
4. Play: per round compute `w`, send `f(w)` (`0xc7`-framed, or `'A'` plaintext), clear all
   20 within 5 lives. Capture `TRAP_FLAG` / confirm `/var/lib/trap/cleared`.

Fallback (no pty): a **scale-invariant glyph classifier** identifies `T/R/A/P` from the
`#` bitmap (holes-count: 0 holes = T; else bottom-right leg + top-left stem = R, apex
(top-left empty) = A, no bottom-right leg = P) — but recall the answer ≠ glyph, so the
pty/oracle path is required for the framed answer byte.

Key addresses: round loop `0x1e220`; PRNG/glyph `0x1cad0` (called `0x1e2db`); glyph
formula `0x1cd51`; parser `0xac60` / classifier `0xb250`; frame emit `0x113c0`; ROUND
emit `0x13aa7`; MISS `0x14051`; lives=5 `0x13db6`; win/flag `0x20d70`/`0x21c62`/`0x21d1f`.

See [`scripts/tokensink_solver.py`](./scripts/tokensink_solver.py).
</content>
