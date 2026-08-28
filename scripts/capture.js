import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const outDir = '/root/forest-blog/docs/images';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Home page
  console.log('Navigating to home page...');
  await page.goto('https://note.0000996.xyz/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'preview-home.png'), fullPage: false });
  console.log('Saved preview-home.png');

  // 2. Theme switcher modal
  console.log('Opening theme switcher...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent.includes('配色'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'preview-theme-switcher.png'), fullPage: false });
  console.log('Saved preview-theme-switcher.png');

  // 3. Article page
  console.log('Navigating to article...');
  await page.goto('https://note.0000996.xyz/p/hello-forest-blog', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'preview-article.png'), fullPage: false });
  console.log('Saved preview-article.png');

  // 4. Mobile view
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await mobilePage.goto('https://note.0000996.xyz/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));
  await mobilePage.screenshot({ path: path.join(outDir, 'preview-mobile.png'), fullPage: false });
  console.log('Saved preview-mobile.png');

  await browser.close();
  console.log('All screenshots completed successfully!');
}

run().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
