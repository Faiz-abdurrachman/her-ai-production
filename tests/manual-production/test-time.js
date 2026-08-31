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
  await page.waitForFunction(() => !!sessionStorage.getItem('heraiParticipantSession'), { timeout: 30000 });
  
  const token = await page.evaluate(() => JSON.parse(sessionStorage.getItem('heraiParticipantSession')).token);
  
  const start = Date.now();
  const res = await page.evaluate(async (token) => {
    const res = await fetch('/__gas', {
      method: 'POST',
      body: JSON.stringify({ action: 'getParticipantDashboardData', nik: '9999000000000001', participantToken: token })
    });
    return res.status;
  }, token);
  
  console.log("Fetch took", Date.now() - start, "ms. Status:", res);
  await browser.close();
})();
