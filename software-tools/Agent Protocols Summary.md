# Summary: Agent Protocols & Integrations / 代理協定與整合摘要

This document provides a summary of the protocols and integration methods for AI agents, covering Agent Skills, Model Context Protocol (MCP), Desktop Extensions (MCPB/DXT), and OpenAPI Tool Calling.

本文件提供 AI 代理 (AI agents) 的協定與整合方法摘要，涵蓋 Agent Skills、Model Context Protocol (MCP)、Desktop Extensions (MCPB/DXT) 以及 OpenAPI Tool Calling。

---

## English Summary

### 1. Model Context Protocol (MCP)
*   **Purpose:** An open protocol to connect AI applications (hosts) to external data and tools (servers).
*   **Key Features:** Reusable integrations across different AI clients, cleaner architecture with explicit server boundaries, and support for resources, prompts, and tools.
*   **Architecture:** Host (IDE/Chat app) -> Client -> Server (JSON-RPC 2.0).
*   **Best For:** Teams building reusable agent integrations across multiple platforms and tools.

### 2. Agent Skills
*   **Purpose:** Modular capability packages that teach an agent how to perform specialized, repeatable tasks.
*   **Key Features:** Progressive disclosure (loads info only when needed), reusable expertise, and deterministic scripts (Python/JS).
*   **Structure:** A directory with a `SKILL.md` file, metadata, instructions, and supporting resources.
*   **Best For:** Repeatable workflows that need more structure than a prompt but less overhead than a full server.

### 3. Desktop Extensions (DXT / MCPB)
*   **Purpose:** A distribution format for local MCP servers, designed for one-click installation by desktop users.
*   **Key Features:** Simplifies installation (no manual JSON editing), better discovery with manifests, and local-first integration for files/apps.
*   **Format:** A zip archive (`.mcpb`) containing the server code and a `manifest.json`.
*   **Best For:** Developers distributing local MCP integrations to non-developer users.

### 4. OpenAPI Tool Calling
*   **Purpose:** Allows agents to call standard HTTP/REST APIs based on OpenAPI descriptions.
*   **Key Features:** Reuses existing web APIs, supports natural language to API mapping, and includes governance hooks (e.g., confirmation for "consequential" actions).
*   **Implementation:** Often used in GPT Actions (ChatGPT) by providing an OpenAPI YAML/JSON schema.
*   **Best For:** Existing REST APIs that need to be accessible via natural language.

---

## 繁體中文摘要

### 1. Model Context Protocol (MCP)
*   **目的：** 一個開放協定，用於將 AI 應用程式（Host）連接到外部資料與工具（Server）。
*   **核心特性：** 可在不同 AI 客戶端間重用的整合、具有明確伺服器邊界的乾淨架構，並支援 Resources、Prompts 與 Tools。
*   **架構：** Host (IDE/聊天應用) -> Client -> Server (使用 JSON-RPC 2.0)。
*   **最適用於：** 建立跨多平台與工具的可重用 Agent 整合團隊。

### 2. Agent Skills
*   **目的：** 模組化能力套件，用來教導 Agent 如何執行特定且可重複的專業任務。
*   **核心特性：** 漸進式揭露（Progressive disclosure，僅在需要時載入資訊）、可重用的專業知識以及確定性的指令碼（Scripts）。
*   **結構：** 包含 `SKILL.md` 檔案、元數據、操作指引及支援資源的資料夾。
*   **最適用於：** 需要比 Prompt 更多結構，但比完整伺服器更輕量的工作流。

### 3. Desktop Extensions (DXT / MCPB)
*   **目的：** 本機 MCP 伺服器的發佈格式，專為桌面端使用者的一鍵安裝而設計。
*   **核心特性：** 簡化安裝流程（不需手動編輯 JSON）、透過 Manifest 提升發現性，以及本地優先的檔案/應用整合。
*   **格式：** 包含伺服器程式碼與 `manifest.json` 的壓縮檔（`.mcpb`）。
*   **最適用於：** 需要將本機 MCP 整合分發給非開發者的開發人員。

### 4. OpenAPI Tool Calling
*   **目的：** 允許 Agent 根據 OpenAPI 描述呼叫標準的 HTTP/REST API。
*   **核心特性：** 重用既有的 Web API、支援自然語言到 API 的映射，並包含治理鉤子（例如對「具後果性」操作的確認機制）。
*   **實作：** 常見於 GPT Actions (ChatGPT)，透過提供 OpenAPI YAML/JSON schema 來達成。
*   **最適用於：** 需要透過自然語言存取的既有 REST API。

---

## Comparison / 比較表

| Method / 方法 | Complexity / 複雜度 | Distribution / 發佈 | Data Locality / 資料位置 |
| --- | --- | --- | --- |
| **MCP** | Medium / 中 | Flexible / 彈性 | Local or Remote / 本機或遠端 |
| **Agent Skills** | Low / 低 | Simple Directory / 資料夾 | Local / 本機 |
| **MCPB (DXT)** | Medium / 中 | Bundle (.mcpb) / 套件 | Local / 本機 |
| **OpenAPI** | Medium / 中 | HTTP API / Web 服務 | Remote (usually) / 遠端 (通常) |
