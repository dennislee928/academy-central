# Comprehensive Software Tools Index / 軟體工具綜合索引

This document provides a comprehensive, categorized summary of all software tools and technologies documented in this repository. 
本文件提供此儲存庫中記錄的所有軟體工具與技術的綜合分類摘要。

---

## 1. Agent Protocols & Integrations / 代理協定與整合
*   **Model Context Protocol (MCP)**: Open protocol for connecting AI apps to external tools. / 連接 AI 應用與外部工具的開放協定。
*   **Agent Skills**: Modular capability packages for agentic tasks. / 模組化能力套件，協助代理完成特定任務。
*   **Desktop Extensions (DXT / MCPB)**: One-click distribution format for local MCP servers. / 專為桌面用戶設計的本機 MCP 伺服器一鍵發佈格式。
*   **OpenAPI Tool Calling**: Allows agents to call standard HTTP/REST APIs via schemas. / 允許代理透過 Schema 呼叫標準 HTTP/REST API。

## 2. AI Agents & Coding Assistants / AI 代理與程式開發助手
*   **Devin**: Autonomous AI software engineer capable of handling complete development tasks. / 能夠處理完整開發任務的自主 AI 軟體工程師。
*   **Claude Code**: Agentic CLI coding assistant by Anthropic for deep codebase integration. / Anthropic 推出的代理命令列程式開發助手，深度整合程式碼庫。
*   **Claude Desktop**: Native desktop app for Claude with local MCP server capabilities. / Claude 的原生桌面應用，具備整合本機 MCP 伺服器能力。
*   **Codex Desktop**: Desktop command center for managing multiple AI coding agents. / 管理多個 AI 開發代理的桌面指揮中心。
*   **Hermes Agent**: Open-source autonomous AI agent and personal automation runtime. / 開源自主 AI 代理與個人自動化執行環境。

## 3. AI Evaluation & Observability / AI 評估與可觀測性
*   **Weights & Biases Weave**: LLM observability, evaluation, and prompt iteration tracking. / LLM 可觀測性、評估與 Prompt 迭代追蹤工具。
*   **OpenTelemetry for LLM Apps**: Distributed tracing and observability standard extended for GenAI telemetry. / 針對生成式 AI 擴展的分散式追蹤與可觀測性標準。
*   **Braintrust**: AI evaluation, experiment tracking, and dataset management platform. / AI 評估、實驗追蹤與資料集管理平台。
*   **Arize Phoenix**: Open-source AI observability, LLM tracing, and prompt engineering tool. / 開源 AI 可觀測性、LLM 追蹤與 Prompt 工程工具。
*   **LangSmith**: Trace, debug, and monitor LangChain and other AI agent deployments. / 用於追蹤、除錯與監控 LangChain 及其他 AI 代理部署的平台。

## 4. Local AI & Model Serving / 本機 AI 與模型服務
*   **LM Studio**: Desktop app and local server for discovering and chatting with local AI models. / 用於探索並與本機 AI 模型對話的桌面應用與本機伺服器。
*   **llama.cpp**: Portable C++ inference engine for running quantized local models on consumer hardware. / 可移植的 C++ 推論引擎，能在消費級硬體上執行量化模型。
*   **SGLang**: High-performance model serving framework with structured generation. / 具備結構化生成能力的高效能模型服務框架。
*   **vLLM**: High-throughput LLM serving engine optimized with PagedAttention. / 透過 PagedAttention 最佳化的高吞吐量 LLM 服務引擎。
*   **Ollama**: Local AI runtime and model manager with a CLI and REST API. / 提供命令列與 REST API 的本機 AI 執行環境與模型管理器。

## 5. Vector Databases & Retrieval / 向量資料庫與檢索
*   **Chroma**: Open-source AI search and vector database favored for RAG prototypes. / 適合 RAG 原型開發的開源 AI 搜尋與向量資料庫。
*   **LanceDB**: Multimodal lakehouse and vector database based on the Lance format. / 基於 Lance 格式的多模態資料湖倉與向量資料庫。
*   **Milvus**: Cloud-native, highly scalable vector database for similarity search and AI agents. / 適合相似度搜尋與 AI 代理的雲原生高擴充性向量資料庫。
*   **Weaviate**: AI-native vector database supporting semantic search and hybrid retrieval. / 支援語意搜尋與混合檢索的 AI 原生向量資料庫。
*   **Qdrant**: Vector database and retrieval engine optimized for memory efficiency and Rust ecosystem. / 針對記憶體效率與 Rust 生態最佳化的向量資料庫與檢索引擎。

## 6. Data Lakehouse & Query Engines / 資料湖倉與查詢引擎
*   **Apache Iceberg**: Open lakehouse table format for reliable analytics on object storage. / 為物件儲存上的可靠分析設計的開放資料湖倉表格格式。
*   **Apache DataFusion**: Extensible query engine written in Rust for fast analytical execution. / 以 Rust 編寫的可擴展、快速分析查詢引擎。
*   **Apache Arrow**: In-memory columnar format and analytics toolkit for fast data interchange. / 記憶體內欄式格式與分析工具包，用於高速資料交換。
*   **Trino**: Distributed SQL query engine for federated joins across data lakes and databases. / 分散式 SQL 查詢引擎，用於跨資料湖與資料庫的聯邦查詢。
*   **DuckDB**: Embedded analytical database optimized for local SQL queries over files and dataframes. / 針對本機檔案與 dataframe 最佳化的嵌入式分析 SQL 資料庫。

## 7. Apache Projects / Apache 專案
*   **Apache Polaris**: Centralized Iceberg REST catalog for unified metadata governance across engines. / 用於跨引擎統一中繼資料治理的集中式 Iceberg REST 目錄。
*   **Apache Teaclave**: Open-source confidential computing framework and SDK for Trusted Execution Environments. / 用於可信執行環境的開源機密運算框架與 SDK。
*   **Apache Gluten**: Acceleration layer offloading Spark SQL execution to native columnar engines. / 將 Spark SQL 執行下推至原生欄式引擎的加速層。
*   **Apache Gravitino**: Federated metadata lake and catalog for governance across various data assets. / 用於跨資料資產治理的聯邦式中繼資料湖與目錄。
*   *(Note: **DragonflyDB Dragonfly** is documented here as a high-throughput Redis-compatible in-memory store, though it is not an Apache Foundation project. / 註：DragonflyDB 在此記錄為相容 Redis 的高吞吐量快取儲存，但它並非 Apache 基金會專案。)*

## 8. Cloud-Native & Security / 雲原生與安全
*   **Cilium Tetragon**: eBPF-based cloud-native security, observability, and runtime enforcement tool. / 基於 eBPF 的雲原生安全、可觀測性與執行期防護工具。
*   **PQC Libraries**: Post-Quantum Cryptography implementations (like liboqs) to resist future quantum attacks. / 後量子密碼學實作（如 liboqs），用以抵抗未來的量子運算攻擊。
*   **WASI 0.3**: WebAssembly System Interface preview adding native async support to the Component Model. / WebAssembly 系統介面預覽版，為 Component Model 加入原生非同步支援。
*   **KawaiiGPT (Defensive Awareness)**: Briefing on the risks of unapproved "shadow AI" tools bypassing enterprise security. / 防禦性簡報，提醒未核准的影子 AI 助手繞過企業安全防護的風險。

## 9. AI & Agentic Stack / AI 與代理技術棧
*   **Mojo**: High-performance systems programming language by Modular bridging Python syntax with hardware-level optimization. / Modular 推出的高效能系統語言，結合 Python 語法與硬體級最佳化。
*   **NVIDIA Blackwell Ultra**: Next-generation AI accelerator hardware for massive LLM training and reasoning inference. / 用於超大型 LLM 訓練與推論的下一代 AI 加速器硬體。
*   **LangGraph & CrewAI**: Frameworks for building multi-agent workflows, stateful loops, and role-based AI orchestration. / 用於建立多代理工作流、狀態循環與角色型 AI 編排的框架。

## 10. Redis / Redis 生態
*   **Redis Basics**: Core concepts, data structures (strings, hashes, sorted sets, JSON), and typical caching workflows. / 核心概念、資料結構（字串、雜湊、有序集合、JSON）與典型快取流程。
*   **Redis for JavaScript Developers**: Guidance for integrating Redis with Node.js/Express, focusing on data modeling and async/await usage. / 針對 Node.js/Express 整合的指南，著重於資料建模與非同步 API 的使用。
*   **Redis Software Success Program**: Operational and architectural readiness guide for deploying Redis safely in production. / 用於在生產環境安全部署 Redis 的營運與架構就緒指南。

## 11. Commerce & Payments / 商務與支付
*   **Google Universal Commerce Protocol (UCP)**: Open standard for agentic commerce, enabling direct checkout flows inside AI surfaces like Gemini. / 代理式商務的開放標準，支援在 Gemini 等 AI 介面內直接完成結帳。

## 12. Federated Learning / 聯邦學習
*   **Flower (flwr)**: Open-source framework for building federated AI systems, compatible with any ML framework. / 用於建立聯邦 AI 系統的開源框架，相容於各種機器學習框架。
*   **NVIDIA FLARE**: SDK for privacy-preserving multi-party collaborative AI training and evaluation. / 用於保護隱私的多方協作 AI 訓練與評估的 SDK。

## 13. Quantum Computing Frameworks / 量子運算框架
*   **NVIDIA CUDA-Q**: Hybrid quantum-classical programming platform for accelerated quantum supercomputing. / 用於加速量子超級運算的混合量子-經典程式設計平台。
*   **Qiskit**: IBM's open-source SDK for building, optimizing, and executing quantum circuits. / IBM 推出的開源 SDK，用於建立、最佳化與執行量子電路。

## 14. WebAssembly Runtimes / WebAssembly 執行環境
*   **Wasmtime**: Fast and secure standalone runtime for WebAssembly and WASI. / 快速且安全的 WebAssembly 與 WASI 獨立執行環境。
*   **Fermyon Spin**: Framework for building and deploying event-driven WebAssembly microservices. / 用於開發並部署事件驅動型 WebAssembly 微服務的框架。

## 15. Zero-Knowledge Proofs / 零知識證明
*   **Noir**: Rust-like domain-specific language for writing zero-knowledge programs and circuits. / 類 Rust 的領域特定語言，用於編寫零知識程式與電路。
*   **RISC Zero**: General-purpose zero-knowledge virtual machine (zkVM) for verifiable computation. / 用於可驗證運算的一般用途零知識虛擬機 (zkVM)。

## 16. Regional Cloud & PaaS Providers / 區域雲端與 PaaS 服務商
*   **Zeabur**: Developer-friendly PaaS from Taiwan for quick Go and Next.js deployments. / 源自台灣的開發者友善 PaaS，適合快速部署 Go 與 Next.js 專案。
*   **Northflank**: Advanced PaaS for containers, microservices, and databases with high operational depth. / 進階 PaaS，支援容器、微服務與資料庫，具備深度營運能力。
*   **Scaleway**: European cloud provider offering VPS, Serverless, and Kubernetes services. / 提供 VPS、Serverless 與 Kubernetes 服務的歐洲雲端供應商。
*   **Exoscale**: Swiss-based sovereign cloud focused on privacy, Kubernetes, and managed data services. / 總部位於瑞士的主權雲，專注於隱私、Kubernetes 與代管資料服務。
*   **Regional Providers (APAC/CIS/MENA)**: Specialized providers like VNG Cloud (Vietnam), Selectel (Russia), and ArvanCloud (Middle East) for regional infrastructure needs. / 針對區域基礎設施需求，提供如 VNG Cloud（越南）、Selectel（俄羅斯）與 ArvanCloud（中東）等專業服務商。