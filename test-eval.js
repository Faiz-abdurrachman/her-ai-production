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
  
  await page.evaluate(() => {
    const editBtn = document.querySelector('[data-practice-edit]');
    if (editBtn) editBtn.click();
  });
  await page.waitForTimeout(1000);
  
  await page.evaluate(() => {
    // Fill all textareas by just dispatching input
    document.querySelectorAll('textarea').forEach(ta => {
        ta.value = 'Test answer for ' + Date.now();
        ta.dispatchEvent(new Event('input', { bubbles: true }));
    });
    document.querySelector('[data-practice-save]').click();
  });
  
  console.log("Clicked save, waiting for status to change...");
  
  for(let i=0; i<30; i++) {
    await page.waitForTimeout(1000);
    const text = await page.textContent('#aiEvaluationPracticeStatus');
    console.log(`[${i}s] Status: ${text}`);
    if (text.includes("berhasil dikirim")) break;
    if (text.includes("belum masuk server")) break;
  }
  
  await browser.close();
})();
