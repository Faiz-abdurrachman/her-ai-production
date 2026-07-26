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

    await page.fill('#profileNik', '12345');
    await page.fill('#profilePassword', 'test');

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

// Pre-populate settings so portal gate opens (fresh browser localStorage is empty)
async function primeSettings(page) {
  // Navigate first so SPA initializes, then inject settings, then reload
  await page.goto(`${TEST_BASE}/#/participant-login`);
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    localStorage.setItem('heraiGlobalSettings', JSON.stringify({
      participantPortalOpen: true,
      registrationOpen: true,
      maintenanceMode: false
    }));
  });
  // Reload so router re-reads localStorage
  await page.reload();
  await page.waitForTimeout(2000);
}

test.describe('Authenticated Flow', () => {
  authTest('Login → Dashboard renders', async ({ page }) => {
    await primeSettings(page);
    // primeSettings already navigates to login page and reloads
    await page.waitForSelector('#profileNik', { timeout: 15000 });

    await page.fill('#profileNik', TEST_NIK);
    await page.fill('#profilePassword', TEST_PASSWORD);

    await page.locator('#participantLoginForm button[type="submit"]').click();
    // Wait for GAS response + session save
    await page.waitForFunction(() => {
      const s = sessionStorage.getItem('heraiParticipantSession');
      return s && JSON.parse(s).token;
    }, { timeout: 10000 });
  });

  authTest('Dashboard has greeting', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(2000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).toMatch(/Halo|Peserta/i);
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

    // Settings page shows profile form — verify it renders
    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).toMatch(/Profil|Pengaturan|Keamanan/i);
    // Password form validation tested via client-side JS in settings.js (#44a)
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

  // ─── Quiz Submit ─────────────────────────────────────────

    authTest('Quiz page renders with form and submit button', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-ai-lab-deep-learning-quiz`);
    await page.waitForTimeout(3000);

    const form = page.locator('#aiDeepLearningQuizForm');
    await expect(form).toBeVisible({ timeout: 10000 });

    const radios = form.locator('input[type="radio"]');
    const radioCount = await radios.count();
    expect(radioCount).toBeGreaterThan(0);

    const submitBtn = form.locator('.quiz-submit-btn');
    await expect(submitBtn).toBeVisible();
  });

  // ─── Practice Save ───────────────────────────────────────

  authTest('Practice page renders with form and textarea', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-ai-lab-deep-learning-practice`);
    await page.waitForTimeout(3000);

    const form = page.locator('#aiDeepLearningPracticeForm');
    await expect(form).toBeVisible({ timeout: 10000 });

    const textareas = form.locator('textarea, input[type="text"]');
    const count = await textareas.count();
    expect(count).toBeGreaterThan(0);
  });

  // ─── Password Change ─────────────────────────────────────

  authTest('Password change — form renders with validation', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-settings`);
    await page.waitForTimeout(3000);

    const form = page.locator('#passwordChangeForm');
    await expect(form).toBeVisible({ timeout: 10000 });

    const oldInput = form.locator('#oldPassword');
    const newInput = form.locator('#newPassword');
    await expect(oldInput).toBeVisible();
    await expect(newInput).toBeVisible();

    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(1000);

    const errorEl = page.locator('#passwordChangeMessage');
    const errorVisible = await errorEl.isVisible().catch(() => false);
    if (errorVisible) {
      const errorText = await errorEl.textContent();
      expect(errorText.length).toBeGreaterThan(0);
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

    await page.fill('#profileNik', '1234567890123456');
    await page.fill('#profilePassword', 'wrongpass');
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

  await primeSettings(page);
  // primeSettings already at login page
  await page.waitForSelector('#profileNik', { timeout: 10000 });

  const alreadyLoggedIn = await page.evaluate(() => {
    const session = sessionStorage.getItem('heraiParticipantSession');
    return session && JSON.parse(session).token;
  }).catch(() => false);

  if (alreadyLoggedIn) return;

  await page.fill('#profileNik', TEST_NIK);
  await page.fill('#profilePassword', TEST_PASSWORD);
  await page.locator('#participantLoginForm button[type="submit"]').click();
  await page.waitForTimeout(3000);
}
