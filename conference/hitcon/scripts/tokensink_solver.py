#!/usr/bin/env python3
"""Track 5 — Token Sink "Trap Zone" oracle solver (skeleton).

Run on the trap-client shell (needs a running lab; requires pwntools + pyte).
See token-sink.md for the full reverse-engineering notes.

Protocol (confirmed from disasm of ./trap):
  - PRNG xorshift32: x ^= x<<13; x ^= x>>17; x ^= x<<5; then w = (x * 0xD1A6F3B9) & 0xffffffff
  - Displayed glyph = "TRAP"[(w >> 30) & 3]      # top 2 bits only (NOT the answer)
  - Input parser accepts only 0x41 ('A') and 0xc7 (frame lead). Non-'A' answers are sent
    0xc7-framed. The answer is f(w) over the lower bits of the SAME w.
  - Round-1's c7-framed payload encodes the per-game seed x (7-bit packed).
  - 20 rounds, 5 lives. Win => getenv("TRAP_FLAG") + writes /var/lib/trap/cleared.

Strategy: recover seed from round 1 -> sync PRNG -> oracle-derive f(w) -> autoplay.
"""
MASK = 0xffffffff
MULT = 0xD1A6F3B9

def xorshift32(x):
    x ^= (x << 13) & MASK
    x ^= (x >> 17)
    x ^= (x << 5) & MASK
    return x & MASK

def word(x):
    """Given current state x (already advanced for this round), return output w."""
    return (x * MULT) & MASK

def glyph(w):
    return "TRAP"[(w >> 30) & 3]

def recover_seed(round1_payload_bytes, observed_glyphs):
    """Try LE/BE base-128 reassembly of the c7-stripped payload; validate against the
    observed glyph sequence by running the PRNG forward. Returns seed x or None."""
    stripped = [b & 0x7f for b in round1_payload_bytes]
    cands = []
    for order in (stripped, stripped[::-1]):
        v = 0
        for b in order:
            v = ((v << 7) | b) & MASK
        cands.append(v)
    for seed in cands:
        x = seed
        ok = True
        for g in observed_glyphs:
            x = xorshift32(x)
            if glyph(word(x)) != g:
                ok = False
                break
        if ok:
            return seed
    return None

def derive_f(oracle):
    """oracle(candidate_bytes)->bool tells if a submitted answer cleared the round.
    Brute-force plaintext 0x00..0xFF and 0xc7-framed 0x00..0xFF at a known-w round,
    then correlate the winning byte with w to solve f. Fill in with live oracle data.
    Returns a function f(w)->bytes to send."""
    raise NotImplementedError("derive against a live round with known w (see token-sink.md)")

def main():
    # Pseudocode — wire up to a pty around ./trap:
    #   from pwn import process; p = process(["./trap"], env={..., "TRAP_FLAG": FLAG})
    #   1. read frames; split high-bit control bytes vs screen text (pyte for the TUI)
    #   2. capture round-1 c7 payload + the 20 observed glyphs -> recover_seed(...)
    #   3. f = derive_f(oracle)   # oracle brute-forces one round, correlates with w
    #   4. for each round: x = xorshift32(x); w = word(x); p.send(f(w))  # 0xc7-framed
    #   5. on "CLEARED": print flag from stream / read /var/lib/trap/cleared
    print(__doc__)

if __name__ == "__main__":
    main()
