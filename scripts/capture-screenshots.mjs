/**
 * Capture Kukimo feature screenshots at phone resolution (1080×1920).
 * Usage: npm run screenshots
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'screenshots');
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const VIEWPORT = { width: 1080, height: 1920 };

function todayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

const FORTUNE_STATS = {
  romance: 14,
  wealth: 9,
  health: 18,
  work: 11,
  family: 7,
  friends: 12,
  life: 24,
};

function baseStorage() {
  return {
    'kukimo-cracked-count': '155',
    'kukimo-cookie-skin': 'angel',
    'kukimo-equipped-pet': 'cat',
    'kukimo-fortune-stats': JSON.stringify(FORTUNE_STATS),
  };
}

function freshCookieStorage() {
  return { ...baseStorage() };
}

function dailyFortuneStorage() {
  return {
    ...baseStorage(),
    'kukimo-daily-cookie': JSON.stringify({
      date: todayKey(),
      category: 'life',
      message: 'A pleasant surprise awaits you around the corner.',
    }),
  };
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          if (res.statusCode && res.statusCode < 500) resolve(undefined);
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on('error', reject);
      });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw new Error(`Server not ready: ${url}`);
}

function startPreview() {
  return spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(PORT)], {
    cwd: ROOT,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

async function capture(page, filename) {
  const filePath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`  ✓ ${filename}`);
}

async function loadWithStorage(page, storage) {
  await page.addInitScript((entries) => {
    localStorage.clear();
    for (const [key, value] of Object.entries(entries)) {
      localStorage.setItem(key, value);
    }
  }, storage);
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Building app…');
  await new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], { cwd: ROOT, shell: true, stdio: 'inherit' });
    build.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`build failed (${code})`))));
  });

  console.log('Starting preview server…');
  const server = startPreview();
  try {
    await waitForServer(BASE_URL);

    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
      colorScheme: 'light',
    });
    const page = await context.newPage();

    console.log(`Capturing ${VIEWPORT.width}×${VIEWPORT.height} screenshots…`);

    await loadWithStorage(page, freshCookieStorage());
    await capture(page, '01-tap-to-crack.png');

    await loadWithStorage(page, dailyFortuneStorage());
    await capture(page, '02-daily-fortune.png');

    await page.getByRole('button', { name: 'Open upgrades' }).click();
    await page.waitForSelector('.collection-panel', { state: 'visible' });
    await page.waitForTimeout(400);
    await capture(page, '03-cookie-designs.png');

    await page.locator('#upgrades-tab-pets').click();
    await page.waitForTimeout(400);
    await capture(page, '04-pet-companions.png');
    await page.getByRole('button', { name: 'Close' }).click();
    await page.waitForSelector('.collection-panel', { state: 'hidden' });
    await page.waitForTimeout(300);

    await page.getByRole('button', { name: 'Open fortune stats' }).click();
    await page.waitForSelector('.fortune-stats', { state: 'visible' });
    await page.waitForTimeout(400);
    await capture(page, '05-fortune-stats.png');

    await browser.close();
    console.log(`\nDone — ${OUT_DIR}`);
  } finally {
    server.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
