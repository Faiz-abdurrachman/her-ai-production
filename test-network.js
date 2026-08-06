const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('response', resp => {
    if (resp.url().includes('__gas')) {
      console.log('GAS RES:', resp.status(), resp.url());
      resp.text().then(text => console.log('BODY:', text.substring(0, 200)));
    }
  });
  await page.goto('https://her-ai.data-sorcerers.com/#/profile');
  await page.fill('#profileNik', process.env.HERAI_QA_NIK);
  await page.fill('#profilePassword', process.env.HERAI_QA_PASSWORD);
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
    document.querySelectorAll('textarea').forEach(ta => ta.value = 'Test answer');
    document.querySelector('[data-practice-save]').click();
  });
  await page.waitForTimeout(15000);
  await browser.close();
})();
