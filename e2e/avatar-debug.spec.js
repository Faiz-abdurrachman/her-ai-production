const { test } = require('@playwright/test');

const TEST_NIK = process.env.TEST_PARTICIPANT_NIK || '8204086711010003';
const TEST_PASSWORD = process.env.TEST_PARTICIPANT_PASSWORD || 'brenda123';
const TEST_BASE = 'http://127.0.0.1:3000';

test('Debug v4: check session + run initSettingsPage manually', async ({ page }) => {
  // Login
  await page.goto(`${TEST_BASE}/#/participant-login`);
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    localStorage.setItem('heraiGlobalSettings', JSON.stringify({
      participantPortalOpen: true, registrationOpen: true, maintenanceMode: false
    }));
  });
  await page.reload();
  await page.waitForTimeout(2000);
  await page.fill('#profileNik', TEST_NIK);
  await page.fill('#profilePassword', TEST_PASSWORD);
  await page.locator('#participantLoginForm button[type="submit"]').click();
  await page.waitForTimeout(5000);

  // Check session
  const sessionInfo = await page.evaluate(() => {
    const raw = sessionStorage.getItem('heraiParticipantSession');
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      hasSession: !!parsed,
      hasNik: !!(parsed && parsed.nik),
      hasProfile: !!(parsed && parsed.profile),
      token: parsed?.token?.substring(0, 20) || 'none'
    };
  });
  console.log('  Session:', JSON.stringify(sessionInfo));

  // Now navigate to settings
  await page.goto(`${TEST_BASE}/#/participant-settings`);
  await page.waitForSelector('.large-avatar', { timeout: 10000 });
  await page.waitForTimeout(2000);

  // Check if initSettingsPage ran
  const state = await page.evaluate(() => {
    const form = document.getElementById('settingsProfileForm');
    return {
      formExists: !!form,
      formReady: form?.dataset?.settingsReady || 'not set',
      hasFileInput: !!document.querySelector('#__avatarFileInput'),
      settingsName: document.getElementById('settingsName')?.value || 'not found',
      pageText: document.body.innerText.substring(0, 300)
    };
  });
  console.log('  State:', JSON.stringify(state, null, 2));
});
