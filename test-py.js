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
  
  await page.evaluate(() => window.location.hash = '/participant-ai-python-practice');
  await page.waitForTimeout(5000);
  
  const status = await page.textContent('#aiPythonPracticeStatus').catch(()=>'Not found');
  console.log("Initial Status:", status);
  
  await page.evaluate(() => {
    const editBtn = document.querySelector('[data-practice-edit]');
    if (editBtn) editBtn.click();
  });
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    const saveBtn = document.querySelector('[data-practice-save]');
    if (saveBtn) saveBtn.click();
  });
  
  console.log("Clicked save, waiting for status to change...");
  for(let i=0; i<5; i++) {
    await page.waitForTimeout(1000);
    const text = await page.textContent('#aiPythonPracticeStatus');
    console.log(`[${i}s] Status: ${text}`);
  }
  
  await browser.close();
})();
