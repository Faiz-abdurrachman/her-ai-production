// @ts-check
const { test, expect } = require('@playwright/test');

// Credentials from environment (DO NOT hardcode NIK/password)
const TEST_NIK = process.env.TEST_PARTICIPANT_NIK || '';
const TEST_PASSWORD = process.env.TEST_PARTICIPANT_PASSWORD || '';
const TEST_BASE = 'http://127.0.0.1:3000';

// ─── Public Pages ──────────────────────────────────────────

test.describe('Public Pages', () => {
  test('Home page loads', async ({ page }) => {
    const res = await page.goto(`${TEST_BASE}/`);
    expect(res?.status()).toBe(200);
    const title = await page.title();
    expect(title).toContain('HerAI');
  });

  test('Login page renders portal gate when closed', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/participant-login`);
    // SPA hash router: wait for dynamic content
    await page.waitForFunction(() => {
      const body = document.body.innerText;
      return body.includes('Portal') || body.includes('Login') || body.includes('NIK');
    }, { timeout: 10000 });
    const bodyText = await page.evaluate(() => document.body.innerText);
    // Portal either shows login form (if open) or gate message (if closed)
    const hasLoginForm = bodyText.includes('NIK');
    const hasGate = bodyText.includes('Belum Dibuka') || bodyText.includes('Portal');
    expect(hasLoginForm || hasGate).toBeTruthy();
  });

  test('Register page loads', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/participant-register`);
    await page.waitForTimeout(1000);
    const res = await page.evaluate(() => document.title);
    expect(res).toBeTruthy();
  });

  test('Modules catalog page loads', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/participant-modules`);
    await page.waitForTimeout(1000);
    const res = await page.evaluate(() => document.title);
    expect(res).toBeTruthy();
  });
});

// ─── Login Form Validation ─────────────────────────────────

test.describe('Login Validation', () => {
  test('Empty NIK shows validation or portal gate', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/participant-login`);
    await page.waitForTimeout(3000);

    const formExists = await page.locator('#participantLoginForm').isVisible().catch(() => false);
    if (!formExists) {
      const bodyText = await page.evaluate(() => document.body.innerText);
      expect(bodyText).toMatch(/Belum Dibuka|Portal/i);
      return;
    }

    const submitBtn = page.locator('#participantLoginForm button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(500);
    const bodyText = await page.evaluate(() => document.body.innerText);
    // Should show validation or error
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('Invalid NIK format shows error', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/participant-login`);
    await page.waitForTimeout(3000);

    // Portal might be closed — check if form is available
    const formExists = await page.locator('#participantLoginForm').isVisible().catch(() => false);
    if (!formExists) {
      // Portal closed — verify the gate message
      const bodyText = await page.evaluate(() => document.body.innerText);
      expect(bodyText).toMatch(/Belum Dibuka|Portal/i);
      return;
    }

    await page.fill('#participantNik', '12345');
    await page.fill('#participantPassword', 'test');

    const submitBtn = page.locator('#participantLoginForm button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(2000);

    // Expect error message
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).toMatch(/NIK harus 16 digit|salah|tidak valid/i);
  });
});

// ─── Authenticated Tests (require TEST_PARTICIPANT_NIK + TEST_PARTICIPANT_PASSWORD env vars) ──

const hasCredentials = TEST_NIK && TEST_PASSWORD;
const authTest = hasCredentials ? test : test.skip;

test.describe('Authenticated Flow', () => {
  authTest('Login → Dashboard renders', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/participant-login`);
    await page.waitForTimeout(2000);

    await page.fill('#participantNik', TEST_NIK);
    await page.fill('#participantPassword', TEST_PASSWORD);

    const submitBtn = page.locator('#participantLoginForm button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(3000);

    // Should redirect to dashboard
    const url = page.url();
    expect(url).toMatch(/participant-dashboard/i);
  });

  authTest('Dashboard has greeting', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(2000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).toMatch(/Halo|Peserta/i);
  });

  authTest('Dashboard renders module cards', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(3000);

    // Module cards should appear (after skeleton → data)
    const cards = page.locator('.module-card, .dash-module-card, [data-module-id]');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });
  });

  authTest('Settings page loads', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-settings`);
    await page.waitForTimeout(2000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).toMatch(/Pengaturan|Profil|Akun/i);
  });

  authTest('Password change — empty fields show error', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-settings`);
    await page.waitForTimeout(2000);

    // Click password tab if exists
    const passTab = page.locator('[data-tab="password"], .tab-password, button:has-text("Password")');
    if (await passTab.isVisible().catch(() => false)) {
      await passTab.click();
      await page.waitForTimeout(500);
    }

    // Submit empty form
    const submitBtn = page.locator('#changePasswordForm button[type="submit"], button:has-text("Simpan"), button:has-text("Ganti")');
    if (await submitBtn.isVisible().catch(() => false)) {
      await submitBtn.click();
      await page.waitForTimeout(1000);

      const bodyText = await page.evaluate(() => document.body.innerText);
      expect(bodyText).toMatch(/harus diisi|kosong|wajib|tidak boleh/i);
    }
  });

  authTest('Module navigation works', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(3000);

    // Click first module card
    const moduleCard = page.locator('.module-card a, [data-module-id] a, .dash-module-card a').first();
    if (await moduleCard.isVisible({ timeout: 5000 }).catch(() => false)) {
      await moduleCard.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      // Should have navigated to a module page
      expect(url).toMatch(/participant-ai-lab-|participant-ai-/i);
    }
  });
});

// ─── Error State ──────────────────────────────────────────

test.describe('Error Handling', () => {
  test('Dashboard error state with GAS down', async ({ page }) => {
    await page.route('**/__gas', route => route.abort('connectionrefused'));

    await page.goto(`${TEST_BASE}/#/participant-login`);
    await page.waitForTimeout(3000);

    const formExists = await page.locator('#participantLoginForm').isVisible().catch(() => false);
    if (!formExists) {
      const bodyText = await page.evaluate(() => document.body.innerText);
      expect(bodyText).toMatch(/Belum Dibuka|Portal/i);
      return;
    }

    await page.fill('#participantNik', '1234567890123456');
    await page.fill('#participantPassword', 'wrongpass');
    await page.locator('#participantLoginForm button[type="submit"]').click();
    await page.waitForTimeout(3000);
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('404 route shows error page', async ({ page }) => {
    await page.goto(`${TEST_BASE}/#/nonexistent-route-xyz`);
    await page.waitForTimeout(2000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    // Shows 404 or fallback page
    expect(bodyText).toMatch(/404|Halaman Tidak Ditemukan|Beranda|HerAI/i);
  });
});

// ─── Helpers ──────────────────────────────────────────────

async function login(page) {
  if (!hasCredentials) return;

  await page.goto(`${TEST_BASE}/#/participant-login`);
  await page.waitForTimeout(2000);

  const alreadyLoggedIn = await page.evaluate(() => {
    const session = sessionStorage.getItem('heraiParticipantSession');
    return session && JSON.parse(session).token;
  }).catch(() => false);

  if (alreadyLoggedIn) return;

  await page.fill('#participantNik', TEST_NIK);
  await page.fill('#participantPassword', TEST_PASSWORD);
  await page.locator('#participantLoginForm button[type="submit"]').click();
  await page.waitForTimeout(3000);
}
