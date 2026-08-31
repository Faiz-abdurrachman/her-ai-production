const { chromium } = require('playwright');
const NIK = process.env.HERAI_QA_NIK;
const PASS = process.env.HERAI_QA_PASSWORD;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  
  await page.goto('https://her-ai.data-sorcerers.com/#/profile');
  await page.fill('#profileNik', NIK);
  await page.fill('#profilePassword', PASS);
  await page.click('button[type="submit"]');
  await page.waitForFunction(() => !!sessionStorage.getItem('heraiParticipantSession'), { timeout: 30000 });
  
  await page.evaluate(() => window.location.hash = '/participant-ai-python-practice');
  await page.waitForTimeout(5000);
  
  const saveBtn = await page.locator('[data-practice-save]').first();
  console.log("Found save button");
  
  console.log("Clicking save (incomplete)...");
  await saveBtn.click();
  await page.waitForTimeout(1000);
  console.log("Status after 1s:", await page.textContent('#aiPythonPracticeStatus'));
  
  console.log("Clicking save (complete)...");
  await saveBtn.click();
  for(let i=0; i<20; i++) {
    await page.waitForTimeout(1000);
    console.log(`[${i}s] Status:`, await page.textContent('#aiPythonPracticeStatus'));
  }
  
  await browser.close();
})();
