const { chromium } = require('playwright');
const NIK = process.env.HERAI_QA_NIK;
const PASS = process.env.HERAI_QA_PASSWORD;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://her-ai.data-sorcerers.com/#/profile');
  await page.fill('#profileNik', NIK);
  await page.fill('#profilePassword', PASS);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);
  
  await page.evaluate(() => window.location.hash = '/participant-ai-evaluation-practice');
  await page.waitForTimeout(5000);
  
  const saveBtn = await page.$('[data-practice-save]');
  console.log("Save button exists:", !!saveBtn);
  
  if (!saveBtn) {
    console.log(await page.evaluate(() => document.body.innerHTML.substring(0, 1000)));
  }
  
  await browser.close();
})();
