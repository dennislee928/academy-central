# GSP1154 Playwright UI Automation Package

This is a **best-effort assistive UI robot** for GSP1154 Agent Studio. It is intentionally not a blind full-autopilot, because Google Cloud Console is a dynamic SPA and GSP1154 checkpoints depend on Agent Studio UI state, not only raw GCP resources.

The robot does these reliably:

- opens the correct Agent Studio URL for the active Qwiklabs project;
- deletes old wrong Cloud Run apps named `genai-app-untitledprompt-*`;
- copies each required system instruction / prompt into your clipboard;
- walks you through Task 1–5 in the exact checkpoint order;
- pauses at fragile UI interactions such as model selection, Save, Deploy, Compare, Cloud Storage image import, and Media Studio generation.

## Run location

Run this on your **local desktop** or an environment with a visible browser. Cloud Shell usually cannot show a headed Chromium window reliably.

## Setup

```bash
unzip GSP1154_Agent_Studio_Automation_Package.zip
cd GSP1154_Agent_Studio_Automation/playwright
export PROJECT_ID=qwiklabs-gcp-03-ac548275841e
export REGION=us-central1
export ZONE=us-central1-a
./run.sh
```

When the browser opens, sign in with the lab Qwiklabs account if needed.

## Expected Task 1 behavior

The deployed Cloud Run app must not be `Untitled prompt`. It must be created from the prompt named:

```text
保險風險摘要 - 原型
```

If the app name starts with `genai-app-untitledprompt-*`, delete it and redeploy from the correct prompt. The robot attempts to delete it automatically through `gcloud run services delete`.

## Manual fallback

All prompt text is in:

```text
playwright/prompts/
```

Use those files if the UI changed or selectors fail.

## Why this is assistive instead of pure full-auto

GSP1154 requires Console UI actions: Agent Studio prompt creation, prompt comparison, Cloud Storage image import, Media Studio image generation, and Studio-managed Cloud Run deployment. These are not stable `gcloud` resources only. Fully automatic UI clicking can break if Google changes labels, language, model list, dialog timing, or DOM structure.
