const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Set auth state so we don't need to bypass router (restoring router is better anyway)
  await page.goto('http://localhost:3000/');
  await page.evaluate(() => {
    sessionStorage.setItem("heraiParticipantSession", JSON.stringify({ nik: "123456", token: "abc", expiresAt: new Date(Date.now() + 86400000).toISOString() }));
  });
  
  await page.goto('http://localhost:3000/#/participant-ai-reasoning');
  // Wait for the lesson topic banner to appear
  try {
      await page.waitForSelector('.lesson-topic-banner', { timeout: 10000 });
  } catch(e) {
      console.log('Timeout waiting for .lesson-topic-banner');
  }
  await page.screenshot({ path: 'reasoning_screenshot.png' });
  console.log('Screenshot saved to reasoning_screenshot.png');
  await browser.close();
})();
