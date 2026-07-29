// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const {
  ACTIVE_DASHBOARD_MODULES,
  AI_FUNDAMENTALS_MODULES,
  AI_INTRO
} = require('./fixtures/active-modules');
const {
  TEST_BASE,
  defaultDashboardData,
  installMockParticipant
} = require('./helpers/mock-participant');

const ROOT = path.resolve(__dirname, '..');

function appUrl(route) {
  return `${TEST_BASE}/#${route}`;
}

async function expectLearningPage(page, module) {
  await expect(page.locator('body')).toContainText(module.titlePattern, { timeout: 15000 });
  await expect(page.locator('body')).not.toContainText('Under Development');
  await expect(page.locator('body')).not.toContainText('Akses Peserta Dibatasi');
}

test.describe('Active module manifest — static contracts', () => {
  test('AI Fundamentals contains exactly 6 learning modules and 5 dashboard cards', () => {
    expect(AI_FUNDAMENTALS_MODULES).toHaveLength(6);
    expect(ACTIVE_DASHBOARD_MODULES).toHaveLength(5);
    expect(AI_FUNDAMENTALS_MODULES[0]).toBe(AI_INTRO);
    expect(new Set(AI_FUNDAMENTALS_MODULES.map(item => item.moduleId)).size).toBe(6);
  });

  test('all active routes are registered and do not point to Under Development', () => {
    const router = fs.readFileSync(path.join(ROOT, 'js/router.js'), 'utf8');

    for (const module of AI_FUNDAMENTALS_MODULES) {
      for (const route of Object.values(module.routes)) {
        const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const mapping = router.match(new RegExp(`"${escapedRoute}"\\s*:\\s*"([^"]+)"`));
        expect(mapping, `route mapping missing: ${route}`).not.toBeNull();
        expect(mapping[1], `active route points to UD: ${route}`).not.toContain('under-development');
      }
    }
  });

  for (const module of ACTIVE_DASHBOARD_MODULES) {
    test(`${module.title} metadata matches GAS chapter/quiz totals`, () => {
      const knownMismatch = ['reasoning', 'evaluation', 'evolution'].includes(module.key);
      test.fail(knownMismatch, `Known metadata mismatch: ${module.title}`);

      const gas = fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8');
      const escapedId = module.moduleId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const row = gas.match(new RegExp(`module_id:\\s*'${escapedId}'[^\\n]+`));
      expect(row, `GAS seed missing ${module.moduleId}`).not.toBeNull();

      const chapterTotal = Number(row[0].match(/total_chapters:\s*(\d+)/)?.[1]);
      const quizTotal = Number(row[0].match(/quiz_total:\s*(\d+)/)?.[1]);
      expect(chapterTotal).toBe(module.chapterTotal);
      expect(quizTotal).toBe(module.quizTotal);
    });
  }

  test('E2E source contains no participant credentials', () => {
    const files = fs.readdirSync(path.join(ROOT, 'e2e'), { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile() && /\.(js|ts)$/.test(entry.name));
    const credentialPattern = /TEST_PARTICIPANT_(?:NIK|PASSWORD)\s*=\s*["'][^"']+["']/i;

    for (const entry of files) {
      const fullPath = path.join(entry.parentPath || entry.path, entry.name);
      const source = fs.readFileSync(fullPath, 'utf8');
      expect(source, `credential-like literal in ${fullPath}`).not.toMatch(credentialPattern);
    }
  });
});

test.describe('Active dashboard modules — mocked UI smoke', () => {
  test.beforeEach(async ({ page }) => {
    await installMockParticipant(page);
  });

  for (const module of ACTIVE_DASHBOARD_MODULES) {
    test(`${module.title} overview renders its own content`, async ({ page }) => {
      await page.goto(appUrl(module.routes.overview));
      await expectLearningPage(page, module);
      await expect(page.locator(module.overviewSelector).first()).toBeVisible({ timeout: 15000 });

      const scripts = page.locator(`script[src*="/${module.loader}.js"]`);
      await expect(scripts).toHaveCount(1);
    });

    test(`${module.title} practice renders editable fields`, async ({ page }) => {
      await page.goto(appUrl(module.routes.practice));
      await expectLearningPage(page, module);

      const form = page.locator(module.selectors.practiceForm);
      await expect(form).toBeVisible({ timeout: 15000 });
      await expect(form.locator('textarea, input[type="text"]').first()).toBeVisible();
      await expect(form.locator('[data-practice-save], button:has-text("Simpan")').first()).toBeVisible();
    });

    test(`${module.title} quiz renders real interactive questions`, async ({ page }) => {
      test.fail(!module.quizReady, module.knownIssue || 'Quiz content is not ready.');

      await page.goto(appUrl(module.routes.quiz));
      await expectLearningPage(page, module);

      const form = page.locator(module.selectors.quizForm);
      const list = page.locator(module.selectors.quizList);
      await expect(form).toBeVisible({ timeout: 15000 });
      await expect(list).not.toContainText('Kuis belum tersedia');
      await expect(form.locator('input[type="radio"], [data-quiz-option]').first()).toBeVisible();
      await expect(form.locator('.quiz-submit-btn, button[type="submit"]').first()).toBeVisible();
    });

    test(`${module.title} discussion route stays inside the active module`, async ({ page }) => {
      await page.goto(appUrl(module.routes.discussion));
      await expectLearningPage(page, module);
      await expect(page.locator('body')).toContainText(/Diskusi/i);
    });
  }
});

test.describe('Progress requests — mocked write verification', () => {
  for (const module of ACTIVE_DASHBOARD_MODULES) {
    test(`${module.title} practice save emits the correct GAS identity`, async ({ page }) => {
      test.fail(!module.practiceWiringReady, module.practiceKnownIssue || 'Practice wiring is not ready.');
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      const { calls } = await installMockParticipant(page);
      await page.goto(appUrl(module.routes.practice));

      const form = page.locator(module.selectors.practiceForm);
      await expect(form).toBeVisible({ timeout: 15000 });
      const field = form.locator('textarea, input[type="text"]').first();
      await field.fill(`QA practice ${module.key}`);
      await form.locator('[data-practice-save], button:has-text("Simpan")').first().click();

      await page.waitForTimeout(500);
      expect(calls, `captured GAS calls for ${module.title}; page errors: ${pageErrors.join(' | ') || 'none'}`).toEqual(expect.arrayContaining([
        expect.objectContaining({
          action: 'saveParticipantProgress',
          module_id: module.moduleId,
          chapter_id: 'practice',
          status: 'completed'
        })
      ]));
    });

    test(`${module.title} overview emits a numeric chapter identity`, async ({ page }) => {
      test.fail(!module.chapterWiringReady, module.chapterKnownIssue || 'Chapter wiring is not ready.');
      const { calls } = await installMockParticipant(page);
      await page.goto(appUrl(module.routes.overview));
      await expectLearningPage(page, module);

      await expect.poll(() => calls.find(call =>
        call.action === 'saveParticipantProgress'
        && call.module_id === module.moduleId
        && /^\d+$/.test(String(call.chapter_id))
      )).toBeTruthy();
    });
  }
});

test.describe('AI Fundamentals summary — known dynamic-data gap', () => {
  test('summary reflects non-zero backend progress instead of static 0/0/6', async ({ page }) => {
    test.fail(true, 'Known issue #78: Ringkasan Belajar masih hardcoded di overview HTML.');
    const dashboardData = defaultDashboardData();
    await installMockParticipant(page, { dashboardData });

    await page.goto(appUrl('/participant-ai-fundamentals'));
    const summary = page.locator('.course-summary-card');
    await expect(summary).toBeVisible();
    await expect(summary.locator('.progress-donut strong')).not.toHaveText('0%');
    await expect(summary).not.toContainText('Dalam Proses0 Modul');
  });
});
