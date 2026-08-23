import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { execSync } from 'node:child_process';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const configPath = path.join(root, 'gsp1154.config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const projectId = process.env.PROJECT_ID || detectProjectId() || config.projectId;
const region = process.env.REGION || config.region || 'us-central1';
const model = process.env.MODEL || config.model || 'gemini-3.5-flash';
const promptDir = path.join(root, 'prompts');
const rl = readline.createInterface({ input, output });

function detectProjectId() {
  try {
    const value = execSync("gcloud config get-value project 2>/dev/null", { encoding: 'utf8' }).trim();
    if (value && value !== '(unset)' && value !== 'qwiklabs-resources') return value;
  } catch {}
  try {
    return execSync("gcloud projects list --filter='projectId:qwiklabs-gcp-*' --format='value(projectId)' 2>/dev/null | head -n 1", { encoding: 'utf8' }).trim();
  } catch { return ''; }
}

function promptFile(name) {
  return fs.readFileSync(path.join(promptDir, name), 'utf8');
}

async function waitEnter(message) {
  console.log('\n' + '='.repeat(78));
  console.log(message);
  console.log('='.repeat(78));
  await rl.question('Press ENTER after completing/confirming this step... ');
}

async function safeClickText(page, texts, timeout = 3500) {
  for (const t of texts) {
    try {
      const loc = page.getByText(t, { exact: false }).first();
      await loc.waitFor({ state: 'visible', timeout });
      await loc.click({ timeout });
      return true;
    } catch {}
    try {
      const loc = page.getByRole('button', { name: new RegExp(t, 'i') }).first();
      await loc.waitFor({ state: 'visible', timeout });
      await loc.click({ timeout });
      return true;
    } catch {}
  }
  return false;
}

async function setClipboard(page, text) {
  try {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://console.cloud.google.com' });
    await page.evaluate(async (value) => navigator.clipboard.writeText(value), text);
    return true;
  } catch (e) {
    console.warn('Clipboard write failed; text will be printed below.');
    console.log('\n--- COPY START ---\n' + text + '\n--- COPY END ---\n');
    return false;
  }
}

async function pasteIntoFocused(page, text) {
  try {
    await page.keyboard.insertText(text);
    return true;
  } catch {
    await setClipboard(page, text);
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+V' : 'Control+V');
    return true;
  }
}

async function openAgentStudio(page) {
  const url = config.agentStudioUrlTemplate.replace('{PROJECT_ID}', projectId);
  console.log('Opening:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: config.timeouts.pageLoadMs });
  await page.waitForTimeout(3000);
  if (await page.getByText(/Sign in|登入|選擇帳戶|Choose an account/i).first().isVisible().catch(() => false)) {
    await waitEnter('Login is required in the opened browser. Use the Qwiklabs lab account, then return here.');
  }
  await page.waitForLoadState('domcontentloaded', { timeout: config.timeouts.pageLoadMs }).catch(() => {});
}

function cleanupBadCloudRunApps() {
  console.log('\nCleaning genai-app-untitledprompt-* services in us-central1...');
  try {
    const list = execSync("gcloud run services list --region=us-central1 --format='value(metadata.name)' 2>/dev/null | grep '^genai-app-untitledprompt' || true", { encoding: 'utf8' }).trim().split(/\n/).filter(Boolean);
    for (const svc of list) {
      console.log('Deleting old wrong service:', svc);
      execSync(`gcloud run services delete ${svc} --region=us-central1 --quiet`, { stdio: 'inherit' });
    }
    if (!list.length) console.log('No old untitledprompt service found.');
  } catch (e) {
    console.warn('Cloud Run cleanup failed. Continue in UI if needed.');
  }
}

async function task1(page) {
  console.log('\nTASK 1: prompt app deployment');
  await openAgentStudio(page);

  // Best-effort new chat.
  await safeClickText(page, ['New chat', '新增', 'New', '+ New', '+ 新增']);
  await page.waitForTimeout(1500);
  await safeClickText(page, ['Chat', '對話']);
  await page.waitForTimeout(2000);

  await setClipboard(page, '保險風險摘要 - 原型');
  await waitEnter('Task 1A: Rename the prompt to exactly: 保險風險摘要 - 原型. The name is now copied to clipboard.');

  await setClipboard(page, promptFile('task1_system.txt'));
  await waitEnter('Task 1B: Paste system instruction into System instructions. It is copied to clipboard.');

  await setClipboard(page, promptFile('task1_prompt.txt'));
  await waitEnter('Task 1C: Paste the main prompt, select gemini-3.5-flash, submit, and wait for output. Main prompt is copied.');

  await waitEnter(`Task 1D: Save prompt. Region must be ${region}. Wait until save completes.`);
  await waitEnter('Task 1E: Deploy > Cloud Run > Deploy as application. If app already exists, Update app. Wait until Status=Ready.');
  await waitEnter('Task 1F: Open app. Confirm app title shows 保險風險摘要 - 原型, NOT Untitled prompt.');

  await setClipboard(page, promptFile('task1_app_test.txt'));
  await waitEnter('Task 1G: In the deployed app, paste the test message and submit. Then click the lab checkpoint.');
}

async function task2(page) {
  console.log('\nTASK 2: prompt engineering');
  await openAgentStudio(page);
  await waitEnter('Task 2A: New chat. Rename prompt to 擷取保險理賠資料.');
  await setClipboard(page, promptFile('task2_system.txt'));
  await waitEnter('Task 2B: Paste zero-shot system instruction.');
  await setClipboard(page, promptFile('task2_zero_shot.txt'));
  await waitEnter('Task 2C: Paste zero-shot prompt. Set model gemini-3.5-flash, Temperature=0.1, Output tokens=1024, then Submit.');
  await waitEnter('Task 2D: New chat. Add an Example block.');
  await setClipboard(page, promptFile('task2_fewshot_example_input.txt'));
  await waitEnter('Task 2E: Paste Example input.');
  await setClipboard(page, promptFile('task2_fewshot_example_output.txt'));
  await waitEnter('Task 2F: Paste Example output and save/add the example.');
  await setClipboard(page, promptFile('task2_system.txt'));
  await waitEnter('Task 2G: Re-paste system instruction because adding examples may clear it.');
  await setClipboard(page, promptFile('task2_fewshot_new_input.txt'));
  await waitEnter('Task 2H: Paste new Eleanor Vance input into {Input}.');
  await setClipboard(page, promptFile('task2_fewshot_instruction.txt'));
  await waitEnter('Task 2I: Paste extraction instruction and Submit.');
  await waitEnter('Task 2J: New chat. Rename to 保險故事.');
  await setClipboard(page, promptFile('task2_story_prompt.txt'));
  await waitEnter('Task 2K: Paste story prompt. Run Temperature 1.5, then 0.1. Test token limit 500, then reset. Test Top-P 0.8, then 1.0. Then click checkpoint.');
}

async function task3(page) {
  console.log('\nTASK 3: compare prompts');
  await openAgentStudio(page);
  await waitEnter('Task 3A: New chat. Rename to 辨識保險風險因素.');
  await setClipboard(page, promptFile('task3_system_base.txt'));
  await waitEnter('Task 3B: Paste base system instruction.');
  await setClipboard(page, promptFile('task3_risk_prompt.txt'));
  await waitEnter('Task 3C: Paste risk prompt. Model gemini-3.5-flash, Temperature=0.2. Submit and Save.');
  await waitEnter('Task 3D: Open three-dot menu near prompt name and select Compare.');
  await setClipboard(page, promptFile('task3_system_improved.txt'));
  await waitEnter('Task 3E: In right pane, replace system instruction with improved instruction. Submit same risk prompt from bottom.');
  await setClipboard(page, promptFile('task3_risk_prompt.txt'));
  await waitEnter('Task 3F: Paste and submit risk prompt in compare bottom input.');
  await waitEnter('Task 3G: Right pane: restore base system instruction, set Temperature=2.0, submit again.');
  await setClipboard(page, promptFile('task3_complex_compare.txt'));
  await waitEnter('Task 3H: Compare models. Left: Gemini 3.5 Flash, temp 0.2, thinking lowest. Right: Gemini 2.5 Pro, temp 0.2. Submit complex prompt. Then checkpoint.');
}

async function task4(page) {
  console.log('\nTASK 4: multimodal image analysis');
  await openAgentStudio(page);
  await waitEnter('Task 4A: New chat. Rename to 時刻表圖片分析.');
  await waitEnter('Task 4B: Click + in prompt box > Import from Cloud Storage > select timetable.png from the provided bucket.');
  await setClipboard(page, promptFile('task4_image_prompt.txt'));
  await waitEnter('Task 4C: Paste image analysis prompt and Submit.');
  await setClipboard(page, promptFile('task4_calc_question.txt'));
  await waitEnter('Task 4D: Paste calculation question and Submit.');
  await waitEnter('Task 4E: Set Temperature=0.8 and resubmit the same question. Then set Temperature back to 0.2. Click checkpoint.');
}

async function task5(page) {
  console.log('\nTASK 5: Media Studio image generation');
  await openAgentStudio(page);
  await waitEnter('Task 5A: Use left nav or New chat dropdown: Generate media > Image.');
  await setClipboard(page, promptFile('task5_imagen_prompt.txt'));
  await waitEnter('Task 5B: Paste Imagen prompt. Choose Imagen 4/latest, aspect ratio 1:1, results=4, Submit.');
  await waitEnter('Task 5C: Open one generated image detail and confirm AI actions / SynthID are visible. Click checkpoint.');
}

async function main() {
  if (!projectId || projectId === 'AUTO') throw new Error('PROJECT_ID not found. Export PROJECT_ID=qwiklabs-gcp-...');
  console.log(`Project: ${projectId}`);
  console.log(`Region:  ${region}`);
  cleanupBadCloudRunApps();

  const browser = await chromium.launchPersistentContext(path.join(root, '.pw-user-data'), {
    headless: false,
    viewport: { width: 1440, height: 980 },
    args: ['--disable-blink-features=AutomationControlled']
  });
  const page = browser.pages()[0] || await browser.newPage();
  page.setDefaultTimeout(8000);

  console.log('\nMode: assistive UI robot. It copies exact prompts to clipboard and pauses at fragile UI actions.');
  console.log('Use the opened browser. Do not use another browser tab for this automation run.');

  await task1(page);
  await task2(page);
  await task3(page);
  await task4(page);
  await task5(page);

  await waitEnter('All scripted checkpoints completed. Review lab score. Press ENTER to close browser.');
  await browser.close();
  rl.close();
}

main().catch(async (e) => {
  console.error(e);
  console.error('\nIf the UI changed, continue manually using prompts/ and README.md.');
  try { await rl.question('Press ENTER to exit...'); } catch {}
  process.exit(1);
});
