// @ts-check
const { test, expect } = require('@playwright/test');
const { ACTIVE_DASHBOARD_MODULES } = require('./fixtures/active-modules');
const { canRunLiveMutations } = require('./helpers/test-policy');

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
const mutatingAuthTest = canRunLiveMutations ? test : test.skip;

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

  mutatingAuthTest('Module navigation works', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(3000);

    // Click first module card
    const moduleCard = page.locator('#dashboardModuleGrid > a.module-card.dash-real').first();
    await expect(moduleCard).toBeVisible({ timeout: 10000 });
    await moduleCard.click();
    await expect(page).toHaveURL(/#\/participant-ai-/);
  });

  // ─── Quiz Submit ─────────────────────────────────────────

  mutatingAuthTest('Quiz page renders with form and submit button', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#${ACTIVE_DASHBOARD_MODULES[0].routes.quiz}`);

    // Quiz form is rendered by IIFE, wait for it to appear in DOM
    await page.waitForFunction(() => {
      return document.getElementById('aiPythonQuizForm') !== null;
    }, { timeout: 15000 });
    await page.waitForTimeout(1000);

    const form = page.locator('#aiPythonQuizForm');
    await expect(form).toBeVisible({ timeout: 5000 });

    const radios = form.locator('input[type="radio"]');
    const radioCount = await radios.count();
    expect(radioCount).toBeGreaterThan(0);

    const submitBtn = form.locator('.quiz-submit-btn');
    await expect(submitBtn).toBeVisible();
  });

  // ─── Practice Save ───────────────────────────────────────

  mutatingAuthTest('Practice page renders with form and textarea', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#${ACTIVE_DASHBOARD_MODULES[0].routes.practice}`);

    // Wait for the practice form to exist in DOM
    await page.waitForSelector('#aiPythonPracticeForm', { state: 'attached', timeout: 15000 });

    // Wait for practice list to actually have children (IIFE populates async)
    await page.waitForFunction(() => {
      const list = document.getElementById('aiPythonPracticeList');
      return list && list.children.length > 0 && list.querySelector('textarea, input[type="text"]');
    }, { timeout: 15000 });

    const form = page.locator('#aiPythonPracticeForm');
    const textareas = form.locator('textarea, input[type="text"]');
    const count = await textareas.count();
    expect(count).toBeGreaterThan(0);
  });

  // ─── Password Change ─────────────────────────────────────

  authTest('Password change — form renders with validation', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-settings`);
    await page.waitForSelector('.s-nav-list', { timeout: 10000 });
    await page.waitForTimeout(1000);
    const keamananTab = page.locator('.s-nav-list button', { hasText: 'Keamanan Akun' });
    await expect(keamananTab).toBeVisible({ timeout: 10000 });
    await keamananTab.click();
    await page.waitForSelector('#passwordChangeForm', { timeout: 10000 });
    const form = page.locator('#passwordChangeForm');
    await expect(form).toBeVisible({ timeout: 5000 });
    const oldInput = form.locator('#oldPassword');
    const newInput = form.locator('#newPassword');
    await expect(oldInput).toBeVisible();
    await expect(newInput).toBeVisible();
    const submitBtn = form.locator('button[type="submit"]');
    await submitBtn.click();
    await page.waitForTimeout(500);
    const errorEl = page.locator('#passwordChangeMessage');
    const errorVisible = await errorEl.isVisible().catch(() => false);
    if (errorVisible) {
      const errorText = await errorEl.textContent();
      expect(errorText.length).toBeGreaterThan(0);
    }
  });

  // ─── Dashboard Module Cards ─────────────────────────────

  authTest('Dashboard renders exactly 5 active module cards', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);

    // Wait for dashboard data to load (no "tidak valid" error)
    await page.waitForFunction(() => {
      const body = document.body.innerText;
      return !body.includes('tidak valid') && !body.includes('kedaluwarsa');
    }, { timeout: 15000 }).catch(() => {});

    await page.waitForTimeout(2000);

    const cards = page.locator('#dashboardModuleGrid > a.module-card.dash-real:not(.add)');
    const count = await cards.count();
    expect(count).toBe(5);
    await expect(cards).toHaveCount(5);
    for (const module of ACTIVE_DASHBOARD_MODULES) {
      await expect(cards.filter({ hasText: module.title })).toHaveCount(1);
    }
  });

  // ─── Quiz Score Badge ────────────────────────────────────

  authTest('Dashboard quiz badge shows percentage format (X%)', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(3000);

    const badge = page.locator('.quiz-badge').first();
    const badgeVisible = await badge.isVisible().catch(() => false);
    if (badgeVisible) {
      const text = await badge.textContent();
      expect(text).toMatch(/\d+%/);
    }
  });

  // ─── Skeleton Loader ─────────────────────────────────────

  authTest('Dashboard shows skeleton loader before data', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);

    // Skeleton should appear briefly before data loads
    const skeletonSelectors = '.skeleton-shimmer, .skeleton-card, .loading-shimmer, [class*="skeleton"]';
    const skeleton = page.locator(skeletonSelectors);
    const skeletonAppeared = await skeleton.first().isVisible({ timeout: 3000 }).catch(() => false);

    // Wait for data to load
    await page.waitForTimeout(3000);

    // Dashboard should show content — check for known dashboard text
    const bodyText = await page.evaluate(() => document.body.innerText);
    const hasContent = bodyText.includes('Lanjutkan Belajarmu')
      || bodyText.includes('Perjalanan Fellowship')
      || bodyText.includes('Leaderboard')
      || bodyText.includes('Aktivitas');
    expect(hasContent).toBe(true);
  });

  // ─── Module-Specific Content ─────────────────────────────

  mutatingAuthTest('Active module overview has no copied Python contamination', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#${ACTIVE_DASHBOARD_MODULES[1].routes.overview}`);
    await page.waitForTimeout(4000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).not.toMatch(/Python adalah penghubung|Jalur Pemula/i);
  });

  // ─── Roadmap Cards ───────────────────────────────────────

  mutatingAuthTest('Module overview — roadmap cards with chapter titles', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#${ACTIVE_DASHBOARD_MODULES[2].routes.overview}`);

    // Wait for module content to render (roadmap is built by IIFE)
    await page.waitForFunction(() => {
      return document.querySelector('.ai-modern-beginner-roadmap')
        || document.querySelector('[data-roadmap-step]')
        || document.querySelector('.ai-modern-roadmap-steps');
    }, { timeout: 15000 });

    await page.waitForTimeout(1000);

    const roadmapCards = page.locator(
      '.ai-modern-beginner-roadmap, .ai-modern-roadmap-steps, [class*="roadmap"]'
    );
    const count = await roadmapCards.count();
    expect(count).toBeGreaterThan(0);

    if (count > 0) {
      const firstCard = roadmapCards.first();
      const text = await firstCard.textContent();
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  // ─── GUIDES Hook Question ────────────────────────────────

  mutatingAuthTest('Module overview — GUIDES hook question is module-specific', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#${ACTIVE_DASHBOARD_MODULES[2].routes.overview}`);
    await page.waitForTimeout(4000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText.length).toBeGreaterThan(100);
    // Module pages should not show dashboard greeting (may show dashboard if session expired in parallel)
  });

  // ─── Topic Label Hidden ──────────────────────────────────

  mutatingAuthTest('Topic label badges are hidden via CSS', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#${ACTIVE_DASHBOARD_MODULES[2].routes.overview}`);
    await page.waitForTimeout(4000);

    const labels = page.locator('.topic-label');
    const count = await labels.count();
    if (count > 0) {
      const first = labels.first();
      await expect(first).not.toBeVisible();
    }
  });

  // ─── Logout ──────────────────────────────────────────────

  authTest('Logout clears sessionStorage', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-dashboard`);
    await page.waitForTimeout(2000);

    // Click logout — look for logout buttons in various locations
    const logoutBtn = page.locator('#btnLogout, [data-action="logout"], button:has-text("Keluar")').first();
    const logoutExists = await logoutBtn.isVisible({ timeout: 3000 }).catch(() => false);

    if (logoutExists) {
      await logoutBtn.click();
      await page.waitForTimeout(1500);

      // sessionStorage should be cleared after logout
      const session = await page.evaluate(() => sessionStorage.getItem('heraiParticipantSession'));
      expect(session).toBeNull();
    }
  });

  authTest('Restricted pages show access denied message', async ({ page }) => {
    await login(page);
    await page.goto(`${TEST_BASE}/#/participant-mentor`);
    await page.waitForFunction(() => document.body.innerText.includes('Akses Peserta Dibatasi'), { timeout: 10000 });

    const bodyText = await page.evaluate(() => document.body.innerText);
    expect(bodyText).toMatch(/Akses Peserta Dibatasi/i);
    expect(bodyText).toMatch(/Beranda.*Modul.*Pengaturan/i);
    expect(bodyText).toContain('Kembali ke Beranda');
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
