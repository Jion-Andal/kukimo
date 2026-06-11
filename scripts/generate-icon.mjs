import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const svgPath = path.join(ROOT, 'assets', 'icon.svg');
const outPath = path.join(ROOT, 'assets', 'icon.png');

const svg = fs.readFileSync(svgPath, 'utf8');
const html = `<!DOCTYPE html><html><body style="margin:0;background:#FDF6E8">${svg}</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.setContent(html);
await page.locator('svg').screenshot({ path: outPath });
await browser.close();
console.log(`Wrote ${outPath}`);
