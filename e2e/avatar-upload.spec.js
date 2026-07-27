const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const TEST_NIK = process.env.TEST_PARTICIPANT_NIK || '8204086711010003';
const TEST_PASSWORD = process.env.TEST_PARTICIPANT_PASSWORD || 'brenda123';
const TEST_BASE = 'http://127.0.0.1:3000';

async function login(page) {
  await page.goto(`${TEST_BASE}/#/participant-login`);
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    localStorage.setItem('heraiGlobalSettings', JSON.stringify({
      participantPortalOpen: true, registrationOpen: true, maintenanceMode: false
    }));
  });
  await page.reload();
  await page.waitForTimeout(2000);

  await page.waitForSelector('#profileNik', { timeout: 10000 });
  await page.fill('#profileNik', TEST_NIK);
  await page.fill('#profilePassword', TEST_PASSWORD);
  await page.locator('#participantLoginForm button[type="submit"]').click();

  // Wait for session to be saved (GAS call may be slow)
  await page.waitForFunction(() => {
    const s = sessionStorage.getItem('heraiParticipantSession');
    return s && JSON.parse(s).token;
  }, { timeout: 20000 });
}

async function goToSettings(page) {
  await page.goto(`${TEST_BASE}/#/participant-settings`);
  await page.waitForSelector('.large-avatar', { timeout: 10000 });
  // Wait for initSettingsPage to run and create file input
  await page.waitForSelector('#__avatarFileInput', { state: 'attached', timeout: 15000 });
}

test.describe('Avatar Upload E2E', () => {

  test('1 — Settings page: avatar UI renders + file input created', async ({ page }) => {
    await login(page);
    await goToSettings(page);

    const avatar = page.locator('.large-avatar');
    expect(await avatar.count()).toBe(1);
    const src = await avatar.getAttribute('src');
    expect(src).toContain('ui-avatars.com');
    console.log('  ✓ Avatar from ui-avatars.com');

    expect(await page.locator('.btn-upload').isEnabled()).toBe(true);
    console.log('  ✓ Upload button enabled');

    expect(await page.locator('#__avatarFileInput').count()).toBe(1);
    console.log('  ✓ File input created');
  });

  test('2 — Upload photo: resize + upload via GAS → avatar updates', async ({ page }) => {
    await login(page);
    await goToSettings(page);

    const initialSrc = await page.locator('.large-avatar').getAttribute('src');

    const logoPath = path.join(__dirname, '..', 'assets', 'branding', 'logo-her-ai-transparent.png');
    if (!fs.existsSync(logoPath)) { console.log('  ⚠ Test image missing'); return; }

    // Set file on hidden input
    await page.locator('#__avatarFileInput').setInputFiles(logoPath);
    console.log('  ✓ File set');

    // Wait for upload to complete (button text returns to normal)
    await page.waitForFunction(() => {
      const btn = document.querySelector('.btn-upload');
      return btn && !btn.disabled && btn.innerHTML.includes('Unggah');
    }, { timeout: 25000 });

    const newSrc = await page.locator('.large-avatar').getAttribute('src');
    expect(newSrc).not.toBe(initialSrc);
    expect(newSrc).toContain('data:image');
    console.log('  ✓ Avatar is data URL, length:', newSrc.length);

    // Remove button visible
    const display = await page.locator('.btn-remove').evaluate(e => e.style.display);
    expect(display).not.toBe('none');
    console.log('  ✓ Remove button visible');

    // Check topbar avatar
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForSelector('.fellow-dashboard', { timeout: 10000 });
    await page.waitForTimeout(500);
    const bg = await page.locator('.fellow-user-button .avatar-img').evaluate(e => getComputedStyle(e).backgroundImage);
    console.log('  Topbar bg-image:', bg.substring(0, 60));
  });

  test('3 — Navigate away/back: avatar persists', async ({ page }) => {
    await login(page);
    await goToSettings(page);

    const srcBefore = await page.locator('.large-avatar').getAttribute('src');
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForSelector('.fellow-dashboard', { timeout: 5000 });
    await goToSettings(page);

    const srcAfter = await page.locator('.large-avatar').getAttribute('src');
    expect(srcAfter).toBe(srcBefore);
    console.log('  ✓ Avatar persists after navigation');
  });

  test('4 — Remove photo: reverts to ui-avatars', async ({ page }) => {
    await login(page);
    await goToSettings(page);

    const srcBefore = await page.locator('.large-avatar').getAttribute('src');
    if (srcBefore.includes('ui-avatars.com')) {
      console.log('  ⚠ No photo set, skipping');
      return;
    }

    page.once('dialog', async d => { await d.accept(); });
    await page.locator('.btn-remove').click();
    await page.waitForTimeout(3000);

    const srcAfter = await page.locator('.large-avatar').getAttribute('src');
    expect(srcAfter).toContain('ui-avatars.com');
    console.log('  ✓ Reverted to ui-avatars');

    expect(await page.locator('.btn-remove').evaluate(e => e.style.display)).toBe('none');
    console.log('  ✓ Remove button hidden');
  });

  test('5 — Re-entry: no duplicates, upload still works', async ({ page }) => {
    await login(page);
    await goToSettings(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForSelector('.fellow-dashboard', { timeout: 5000 });
    await goToSettings(page);

    expect(await page.locator('#__avatarFileInput').count()).toBe(1);
    console.log('  ✓ Single file input');

    const logoPath = path.join(__dirname, '..', 'assets', 'branding', 'logo-her-ai-transparent.png');
    if (fs.existsSync(logoPath)) {
      await page.locator('#__avatarFileInput').setInputFiles(logoPath);
      await page.waitForFunction(() => {
        const btn = document.querySelector('.btn-upload');
        return btn && !btn.disabled && btn.innerHTML.includes('Unggah');
      }, { timeout: 25000 });
      const src = await page.locator('.large-avatar').getAttribute('src');
      expect(src).toContain('data:image');
      console.log('  ✓ Upload works after re-entry');
    }
  });

});
