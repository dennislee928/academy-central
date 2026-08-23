# Lecture 6: CA Bypass Model & Nested App Authentication (NAA) — merged into Lecture 8

# 第六講：Conditional Access (CA) 繞過模型與巢狀應用程式認證 (NAA) — 已併入第八講

---

> **This page has moved / 本頁已合併**
>
> **English —** Lectures 6 and 8 were two independent write-ups of the *same*
> HITCON 2026 talk on Microsoft Entra ID Conditional Access bypass via Nested App
> Authentication, taken from different recordings of the session. They have been
> merged into the fuller write-up so there is a single, complete reference instead
> of two partial ones.
>
> **繁體中文 —** 第六講與第八講原本是同一場 HITCON 2026 演講的兩份獨立筆記，
> 分別整理自該場次的不同錄音。為避免內容重複與分散，兩者已合併為一份完整的參考資料。

## → Read the merged write-up / 請閱讀合併後的完整版本

**[Lecture 8: CA Bypass Model & Nested App Authentication (NAA) / 第八講](../lecture-8-nested-app-auth/lecture-8-nested-app-auth.md)**

---

## What moved there / 本頁內容的去向

Everything that was on this page is preserved in Lecture 8, verified item by item:

| Content from this page | Where it lives now |
| :--- | :--- |
| The CA evaluation model (user + device signals) | Lecture 8, §3.1 |
| NAA token-acquisition loop and its five parameters | Lecture 8, §3.1 |
| Exclude-logic bypass — 112 Resource × Scope combinations | Lecture 8, §3.2 |
| Include-logic bypass — 221 combinations across M365 services | Lecture 8, §3.2 |
| The five high-severity Microsoft Graph scopes | Lecture 8, §3.2 |
| All seven NAA broker applications with their App IDs | Lecture 8, §3.2 |
| Conclusion and defensive/threat-hunting directions | Lecture 8, §4 and §5 |
| Moderator transcript note (新錄音 45.mp3) | Lecture 8, §6 |

Lecture 8 additionally covers the Intune compliance-device enrolment bypass via
Azure Managed Identities and the path-traversal identity-hijack ("Fortune Cookie"),
carries mermaid diagrams of the bypass paths, and ends with a Resources section of
verified primary sources.

---

## Important corrections / 重要校訂

> **English —** Two claims carried in these notes did not survive verification, and
> Lecture 8 documents both in place. First, the speaker attribution **"DeCraft"
> could not be confirmed**: no research team by that name appears in public record
> for this subject, so the talk is not attributed to any named individual. Second,
> where these notes report **seven** broker applications, the corresponding public
> research documents **three**. Treat the figures on this page as *as-heard from a
> live talk*, and prefer Lecture 8's annotated version.
>
> **繁體中文 —** 本頁有兩項內容未能通過查證，第八講已就地標註說明。其一，講者
> 「DeCraft」**無法確認**：公開資料中查無此名稱的研究團隊，因此不將本演講歸屬於
> 任何具名個人。其二，本頁記載的 **7** 款代理程式，在對應的公開研究中僅記錄
> **3** 款。請將本頁數據視為*現場聽記*，並以第八講的校訂版本為準。

---
