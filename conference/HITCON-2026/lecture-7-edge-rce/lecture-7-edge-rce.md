# Lecture 7: Microsoft Edge Sandbox Escape — merged into Lecture 9

# 第七講：Microsoft Edge 沙箱逃逸 — 已併入第九講

---

> **This page has moved / 本頁已合併**
>
> **English —** Lectures 7 and 9 were two independent write-ups of the *same*
> HITCON 2026 talk by Orange Tsai (蔡政達) of DEVCORE, taken from different
> recordings of the session. They have been merged into the fuller write-up so
> there is a single, complete reference instead of two partial ones.
>
> **繁體中文 —** 第七講與第九講原本是同一場 HITCON 2026 演講（DEVCORE
> Orange Tsai 蔡政達）的兩份獨立筆記，分別整理自該場次的不同錄音。為避免內容
> 重複與分散，兩者已合併為一份完整的參考資料。

## → Read the merged write-up / 請閱讀合併後的完整版本

**[Lecture 9: Microsoft Edge Zero-Click Sandbox Escape Chain / 第九講](../lecture-9-browser-jailbreak/lecture-9-browser-jailbreak.md)**

---

## What moved there / 本頁內容的去向

Everything that was on this page is preserved in Lecture 9, verified item by item:

| Content from this page | Where it lives now |
| :--- | :--- |
| AI vulnerability hunting vs. exploitation — why logic bugs | Lecture 9, §3.1 |
| Universal XSS (UXSS) via profile switching | Lecture 9, §3.2–3.3 |
| The SOP and popup-blocker bypass chain | Lecture 9, §3.3 |
| UXSS → RCE via Reading Mode and the privileged WebUI | Lecture 9, §3.4 |
| Defeating the UTF-8 encoding constraint | Lecture 9, §3.5 |
| Conclusion and extension directions | Lecture 9, §4 and §5 |
| Bilingual transcript | Lecture 9, §6 |

Lecture 9 additionally identifies the specific Edge surfaces involved, carries
mermaid diagrams of the process model and the chain, and ends with a Resources
section of verified primary sources including the MSRC advisories.

---

## Important corrections / 重要校訂

> **English —** Two things in these notes did not survive verification, and
> Lecture 9 carries the corrected version. First, the title recorded here —
> *"One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE"* — **does
> not exist**. The real talk is 「↖乂古法挖洞乂↘ ~~ 純邏輯 Microsoft Edge
> 零點擊沙箱逃逸鏈 ~~」: a **zero-click (零點擊)** pure-logic **sandbox escape
> chain**, not a one-click RCE. Second, this research was **not** presented at
> Black Hat USA 2026; it was demonstrated at **Pwn2Own Berlin 2026** (13–14 May),
> where four chained logic bugs earned $175,000 and Master of Pwn — the first
> Chromium full-chain success at Pwn2Own in ten years.
>
> **繁體中文 —** 本頁有兩項內容未通過查證，第九講已提供校訂版本。其一，此處記載的
> 標題《One Click to Rule Them All: Handcrafted Microsoft Edge Browser RCE》
> **並不存在**；實際講題為「↖乂古法挖洞乂↘ ~~ 純邏輯 Microsoft Edge
> 零點擊沙箱逃逸鏈 ~~」，是**零點擊**的純邏輯**沙箱逃逸鏈**，而非一次點擊的 RCE。
> 其二，本研究**並非**發表於 Black Hat USA 2026，而是在 **Pwn2Own Berlin 2026**
> （5 月 13–14 日）實證，以四個串聯的邏輯漏洞奪得 175,000 美元獎金與 Master of
> Pwn，是十年來 Pwn2Own 首次成功的 Chromium 完整漏洞鏈。

---
