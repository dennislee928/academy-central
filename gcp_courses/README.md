# GCP Qwiklabs Course Notes / GCP 實驗室筆記索引

> **Platform:** Google Skills / Qwiklabs  
> **Format:** Bilingual (English + 繁體中文), professional lab notes

---

## Available Labs / 可用講義

| Lab ID | File | Service | Level |
|--------|------|---------|-------|
| GSP001 | [GSP001-compute-engine-create-vm.md](./GSP001-compute-engine-create-vm.md) | Compute Engine | Introductory |
| GSP067 | [GSP067-app-engine-qwik-start-python.md](./GSP067-app-engine-qwik-start-python.md) | App Engine (Python/Flask) | Introductory |
| GSP080 | [GSP080-cloud-run-functions-qwik-start.md](./GSP080-cloud-run-functions-qwik-start.md) | Cloud Run functions (Gen2) | Introductory |
| GSP100 | [GSP100-kubernetes-engine-qwik-start.md](./GSP100-kubernetes-engine-qwik-start.md) | Google Kubernetes Engine | Introductory |

---

## Naming Convention / 檔名規範

All files follow **`GSPXXX-kebab-case-english.md`**:

- `GSP` prefix + lab number
- Lowercase English description with hyphens
- `.md` extension (lowercase)

---

## Document Structure / 文件結構

Each lab note includes:

1. **Metadata blockquote** — Lab ID, platform, service, level
2. **Bilingual section headers** — `English Title / 中文標題`
3. **Dual-language summaries** — Key concepts in both languages
4. **Step-by-step instructions** — With copy-pasteable commands
5. **Troubleshooting** — Common Qwiklabs issues
6. **Quick reference** — Command cheat sheet

---

## Common Qwiklabs Tips / 通用提示

| Issue | Solution / 解法 |
|-------|----------------|
| `constraints/gcp.resourceLocations` | Query org policy, use exact allowed region |
| `Regional Access Boundary` warning | Ignore if resource created successfully |
| Temporary credentials | Do not store lab passwords in notes |
