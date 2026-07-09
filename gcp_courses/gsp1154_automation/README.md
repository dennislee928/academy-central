# GSP1154 Agent Studio Automation Bundle

This bundle contains two approaches:

## 1. Semi-auto high-success Cloud Shell helper

Path:

```text
semiauto/gsp1154_semiauto_high_success.sh
```

Use inside Cloud Shell:

```bash
chmod +x semiauto/gsp1154_semiauto_high_success.sh
export REGION=us-central1
export ZONE=us-central1-a
semiauto/gsp1154_semiauto_high_success.sh
```

What it does:

- detects the active `qwiklabs-gcp-*` project;
- reads `constraints/gcp.resourceLocations` allowedValues;
- selects `us-central1` / `us-central1-a` when allowed;
- sets `gcloud config set compute/region` and `compute/zone`;
- opportunistically enables relevant APIs;
- deletes old wrong Cloud Run apps named `genai-app-untitledprompt-*`;
- generates `~/gsp1154-agent-studio-pack` with all prompts and UI steps.

## 2. Playwright assistive UI robot

Path:

```text
playwright/
```

Run on a local desktop or any environment with visible Chromium:

```bash
cd playwright
export PROJECT_ID=qwiklabs-gcp-03-ac548275841e
export REGION=us-central1
export ZONE=us-central1-a
./run.sh
```

It opens Agent Studio, copies exact prompts to clipboard, and pauses at fragile UI steps. It is more automated than the semi-auto helper but still intentionally keeps human confirmation for Agent Studio save/deploy/compare/import/media actions.

## Critical GSP1154 checker issue

If Task 1 stays at 10/20, check the deployed Cloud Run app name/title. The wrong state is usually:

```text
genai-app-untitledprompt-*
Untitled prompt
```

The correct prompt title is:

```text
保險風險摘要 - 原型
```

Delete the wrong Cloud Run app and redeploy from the correctly named prompt.
