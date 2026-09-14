const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  const url = 'http://localhost:5174/';
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  const sections = [
    { name: 'marquee', y: 950 },
    { name: 'about', y: 1900 },
    { name: 'services', y: 3100 },
    { name: 'projects', y: 4300 },
    { name: 'contact', y: 9000 },
  ];

  for (const s of sections) {
    await page.evaluate((y) => window.scrollTo(0, y), s.y);
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.resolve(__dirname, `section-${s.name}.png`),
      fullPage: false,
    });
    console.log(`Captured: section-${s.name}.png`);
  }

  await browser.close();
  console.log('DONE');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});