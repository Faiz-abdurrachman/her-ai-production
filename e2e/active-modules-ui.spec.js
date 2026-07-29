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
      const knownMismatch = module.key === 'reasoning';
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
      const questionSelector = module.key === 'modern' ? '[data-quiz-jump]' : '[data-quiz-index]';
      await expect(form.locator(questionSelector)).toHaveCount(module.quizTotal);
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

    test(`${module.title} quiz submit emits score with the correct GAS identity`, async ({ page }) => {
      test.fail(module.key === 'modern', 'Known issue #81: MODULE_ID tidak tersedia di IIFE quiz AI Modern.');
      const { calls } = await installMockParticipant(page);
      await page.goto(appUrl(module.routes.quiz));

      const form = page.locator(module.selectors.quizForm);
      await expect(form).toBeVisible({ timeout: 15000 });
      const radios = form.locator('input[type="radio"]');
      if (await radios.count()) {
        await radios.evaluateAll(inputs => {
          const answered = new Set();
          inputs.forEach(input => {
            if (!answered.has(input.name)) {
              input.checked = true;
              input.dispatchEvent(new Event('change', { bubbles: true }));
              answered.add(input.name);
            }
          });
        });
      } else {
        for (let index = 0; index < module.quizTotal; index += 1) {
          await form.locator('[data-quiz-option]').first().click();
          if (index < module.quizTotal - 1) {
            await form.locator('[data-quiz-next]').click();
          }
        }
      }

      await form.locator('.quiz-submit-btn, button[type="submit"]').first().click();
      await expect.poll(() => calls.find(call =>
        call.action === 'saveParticipantProgress'
        && call.module_id === module.moduleId
        && call.chapter_id === 'quiz'
      )).toBeTruthy();

      const captured = calls.find(call =>
        call.action === 'saveParticipantProgress'
        && call.module_id === module.moduleId
        && call.chapter_id === 'quiz'
      );
      expect(captured.score).toEqual(expect.any(Number));
      expect(captured.score).toBeGreaterThanOrEqual(0);
      expect(captured.score).toBeLessThanOrEqual(module.quizTotal);
    });
  }
});

test.describe('Persistence acknowledgement — known gaps', () => {
  test('quiz remains retryable when backend rejects the progress write', async ({ page }) => {
    test.fail(true, 'Known issue #85: quiz locks local state without checking the backend response.');
    const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === 'python');
    const { calls } = await installMockParticipant(page, {
      saveProgressResponse: { status: 'error', message: 'QA rejected write' }
    });

    await page.goto(appUrl(module.routes.quiz));
    const form = page.locator(module.selectors.quizForm);
    await expect(form).toBeVisible({ timeout: 15000 });
    await form.locator('input[type="radio"]').evaluateAll(inputs => {
      const answered = new Set();
      inputs.forEach(input => {
        if (!answered.has(input.name)) {
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          answered.add(input.name);
        }
      });
    });
    await form.locator('.quiz-submit-btn, button[type="submit"]').first().click();

    await expect.poll(() => calls.some(call =>
      call.action === 'saveParticipantProgress'
      && call.module_id === module.moduleId
      && call.chapter_id === 'quiz'
    )).toBe(true);
    await expect.poll(() => page.evaluate(() => localStorage.getItem('heraiAiPythonQuizDone'))).not.toBe('true');
    await expect(form.locator('.quiz-submit-btn, button[type="submit"]').first()).not.toContainText('Sudah Dikirim');
  });

  test('discussion submit emits a backend persistence request', async ({ page }) => {
    test.fail(true, 'Known issue #91: discussion posts are stored in localStorage only.');
    const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === 'python');
    const { calls } = await installMockParticipant(page);

    await page.goto(appUrl(module.routes.discussion));
    const form = page.locator('form').filter({ has: page.locator('textarea') }).first();
    await expect(form).toBeVisible({ timeout: 15000 });
    const callCountBeforeSubmit = calls.length;
    await form.locator('textarea').fill('QA deterministic discussion persistence check');
    await form.locator('button[type="submit"], button:has-text("Posting Diskusi")').first().click();

    await expect.poll(() => calls.length).toBeGreaterThan(callCountBeforeSubmit);
  });
});

test.describe('Runtime and module identity — known gaps', () => {
  for (const moduleKey of ['evaluation', 'evolution']) {
    test(`${moduleKey} loads without PYTHON_GUIDES runtime errors`, async ({ page }) => {
      test.fail(true, 'Known issue #89: copied cleanup code references PYTHON_GUIDES outside its scope.');
      const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === moduleKey);
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await installMockParticipant(page);
      await page.goto(appUrl(module.routes.overview));
      await expectLearningPage(page, module);
      await page.waitForTimeout(300);
      expect(pageErrors.filter(message => /PYTHON_GUIDES is not defined/i.test(message))).toEqual([]);
    });

    test(`${moduleKey} quiz headings use their own module name`, async ({ page }) => {
      test.fail(true, 'Known issue #90: Evaluation/Evolution still expose copied Python labels.');
      const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === moduleKey);
      await installMockParticipant(page);
      await page.goto(appUrl(module.routes.quiz));
      await expectLearningPage(page, module);
      const headings = await page.locator('h1, h2, h3').allTextContents();
      expect(headings.join(' | ')).not.toMatch(/Kuis Python/i);
    });
  }

  test('AI Modern preserves source integrity after enhancement', async ({ page }) => {
    test.fail(true, 'Known issue #88: rendered source text differs from the source integrity baseline.');
    const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === 'modern');
    await installMockParticipant(page);
    await page.goto(appUrl(module.routes.overview));
    const source = page.locator('#modern-chapter-container');
    await expect(source).toBeVisible({ timeout: 15000 });
    await expect(source).toHaveAttribute('data-source-integrity', 'passed', { timeout: 15000 });
  });
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
