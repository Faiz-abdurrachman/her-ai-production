// @ts-check
const fs = require('fs');
const path = require('path');
const vm = require('vm');
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

  test('GAS registers participant discussion schema, protected routes, and handlers', () => {
    const gas = fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8');
    expect(gas).toMatch(/participantDiscussions:\s*'participant_discussions'/);
    expect(gas).toMatch(/saveParticipantDiscussion:\s*\(\)\s*=>\s*saveParticipantDiscussion\(payload\)/);
    expect(gas).toMatch(/getParticipantDiscussions:\s*\(\)\s*=>\s*getParticipantDiscussions\(payload\)/);
    expect(gas).toMatch(/function\s+saveParticipantDiscussion\s*\(/);
    expect(gas).toMatch(/function\s+getParticipantDiscussions\s*\(/);
  });

  test('every future module source with a module identity has progress wiring and seed metadata', () => {
    const gas = fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8');
    const moduleFiles = fs.readdirSync(path.join(ROOT, 'js/frontend/fellow-dashboard'))
      .filter(name => /^ai-.+\.js$/.test(name));
    const identities = [];
    const sourceByIdentity = new Map();

    for (const fileName of moduleFiles) {
      const source = fs.readFileSync(path.join(ROOT, 'js/frontend/fellow-dashboard', fileName), 'utf8');
      const moduleId = source.match(/MODULE_ID\s*=\s*['"]([^'"]+)/)?.[1];
      if (!moduleId) continue;
      identities.push(moduleId);
      sourceByIdentity.set(moduleId, `${sourceByIdentity.get(moduleId) || ''}\n${source}`);
    }
    for (const [moduleId, source] of sourceByIdentity) {
      expect(source, `${moduleId} has no numeric chapter progress contract`)
        .toMatch(/saveChapterProgress\s*\(\s*MODULE_ID,\s*(?:chapter|chapterId|chapterNumber|number)\b/);
    }

    identities.push('math-for-ai');
    const mathSource = fs.readFileSync(path.join(ROOT, 'js/frontend/fellow-dashboard/ai-math-for-ai.js'), 'utf8');
    expect(mathSource).toMatch(/saveChapterProgress\s*\(\s*mathForAiCourse\.id,\s*String\(index \+ 1\),\s*'completed'/);
    expect(mathSource).toMatch(/if \(!result \|\| result\.status !== 'success'\)/);
    for (const moduleId of new Set(identities)) {
      expect(gas, `GAS seed missing future tracking metadata for ${moduleId}`).toContain(`module_id: '${moduleId}'`);
    }
    expect(gas).toMatch(/participantDashboardModules\]: \[[^\]]*phase_id[^\]]*tracking_enabled[^\]]*dashboard_visible/);
  });

  test('GAS dashboard counts only unique numeric chapters in progress and summary', () => {
    const gas = fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8');
    const context = vm.createContext({ console, Date, JSON, Math, Number, String, Array, Object, RegExp, isNaN });
    vm.runInContext(gas, context, { filename: 'gas/Code.gs' });

    const moduleRows = ACTIVE_DASHBOARD_MODULES.map((module, index) => ({
      module_id: module.moduleId,
      title: module.title,
      subtitle: module.title,
      href: `#${module.routes.overview}`,
      total_chapters: module.chapterTotal,
      quiz_total: module.quizTotal,
      is_active: true,
      sort_order: index + 1
    }));
    const nik = '0000000000000000';
    const progressRows = [
      { nik, module_id: 'python-untuk-ai', chapter_id: '1', status: 'completed' },
      { nik, module_id: 'python-untuk-ai', chapter_id: 1, status: 'completed' },
      { nik, module_id: 'python-untuk-ai', chapter_id: '2', status: 'completed' },
      { nik, module_id: 'python-untuk-ai', chapter_id: '999', status: 'completed' },
      { nik, module_id: 'python-untuk-ai', chapter_id: 'practice', status: 'completed' },
      { nik, module_id: 'python-untuk-ai', chapter_id: 'quiz', status: 'completed', score: 15 },
      { nik, module_id: 'reasoning', chapter_id: '1', status: 'completed' }
    ];
    context.__qaGetRows = sheetName => {
      if (sheetName === 'participant_dashboard_modules') return moduleRows;
      if (sheetName === 'participant_progress') return progressRows;
      return [];
    };
    vm.runInContext('getRows = __qaGetRows;', context);
    const result = vm.runInContext(`getParticipantDashboardData({ nik: '${nik}' })`, context);
    const python = result.data.modules.find(module => module.module_id === 'python-untuk-ai');
    const reasoning = result.data.modules.find(module => module.module_id === 'reasoning');

    expect(python.progress).toBe(25);
    expect(python.quiz_score).toBe(75);
    expect(reasoning.progress).toBe(17);
    expect(result.data.learningSummary.total).toBe(6);
    expect(result.data.learningSummary.in_progress).toBe(2);
    expect(result.data.learningSummary.not_started).toBe(4);
  });

  test('GAS automatically includes a newly released module in cards, summary, and journey', () => {
    const gas = fs.readFileSync(path.join(ROOT, 'gas/Code.gs'), 'utf8');
    const context = vm.createContext({ console, Date, JSON, Math, Number, String, Array, Object, RegExp, isNaN });
    vm.runInContext(gas, context, { filename: 'gas/Code.gs' });

    const moduleRows = [
      { module_id: 'python-untuk-ai', title: 'Python', total_chapters: 4, phase_id: 'foundation', tracking_enabled: true, dashboard_visible: true, is_active: true, sort_order: 1 },
      { module_id: 'deep-learning', title: 'Deep Learning', total_chapters: 2, phase_id: 'foundation', tracking_enabled: true, dashboard_visible: true, is_active: true, sort_order: 2 },
      { module_id: 'reinforcement-learning', title: 'RL', total_chapters: 2, phase_id: 'foundation', tracking_enabled: false, dashboard_visible: true, is_active: true, sort_order: 3 },
      { module_id: 'computer-vision', title: 'Computer Vision', total_chapters: 4, phase_id: 'specialization', tracking_enabled: true, dashboard_visible: false, is_active: true, sort_order: 4 }
    ];
    const journeyRows = [
      { phase_id: 'foundation', title: 'Foundation Phase', source_type: 'modules', is_active: true, sort_order: 1 },
      { phase_id: 'specialization', title: 'Specialization', source_type: 'modules', is_active: true, sort_order: 2 },
      { phase_id: 'project', title: 'Project Building', source_type: 'locked', locked_label: 'Belum Dibuka', is_active: true, sort_order: 3 }
    ];
    const nik = '0000000000000000';
    const progressRows = [
      { nik, module_id: 'ai-fundamentals', chapter_id: '1', status: 'completed' },
      { nik, module_id: 'python-untuk-ai', chapter_id: '1', status: 'completed' },
      { nik, module_id: 'deep-learning', chapter_id: '1', status: 'completed' },
      { nik, module_id: 'deep-learning', chapter_id: '2', status: 'completed' },
      { nik, module_id: 'computer-vision', chapter_id: '1', status: 'completed' },
      { nik, module_id: 'computer-vision', chapter_id: '2', status: 'completed' }
    ];
    context.__qaGetRows = sheetName => {
      if (sheetName === 'participant_dashboard_modules') return moduleRows;
      if (sheetName === 'participant_dashboard_journey') return journeyRows;
      if (sheetName === 'participant_progress') return progressRows;
      return [];
    };
    vm.runInContext('getRows = __qaGetRows;', context);
    const result = vm.runInContext(`getParticipantDashboardData({ nik: '${nik}' })`, context);

    expect(result.data.modules.map(module => module.module_id)).toEqual(['python-untuk-ai', 'deep-learning']);
    expect(result.data.trackingModules.map(module => module.module_id)).toEqual([
      'ai-fundamentals', 'python-untuk-ai', 'deep-learning', 'computer-vision'
    ]);
    expect(result.data.learningSummary).toEqual({
      total: 3,
      completed: 1,
      in_progress: 2,
      not_started: 0,
      progress: 48
    });
    expect(result.data.journey.find(item => item.phase_id === 'foundation')).toEqual(expect.objectContaining({
      progress: 48,
      status: 'in_progress',
      module_count: 3
    }));
    expect(result.data.journey.find(item => item.phase_id === 'specialization')).toEqual(expect.objectContaining({
      progress: 50,
      status: 'in_progress',
      module_count: 1
    }));
    expect(result.data.journey.find(item => item.phase_id === 'project')).toEqual(expect.objectContaining({
      progress: null,
      status: 'locked',
      status_label: 'Belum Dibuka'
    }));
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

test.describe('Future module release readiness', () => {
  test('Math for AI lesson waits for backend and emits its numeric chapter identity', async ({ page }) => {
    const { calls } = await installMockParticipant(page);
    await page.goto(appUrl('/participant-ai-lab-math-intro'));
    const doneButton = page.locator('[data-mark-lesson="intro"]');
    await expect(doneButton).toBeVisible({ timeout: 15000 });
    await doneButton.click();

    await expect.poll(() => calls.some(call =>
      call.action === 'saveParticipantProgress'
      && call.module_id === 'math-for-ai'
      && String(call.chapter_id) === '1'
      && call.status === 'completed'
    )).toBe(true);
    await expect(doneButton).toBeDisabled();
    await expect(doneButton).toContainText('Lesson Selesai');
  });
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

test.describe('Persistence acknowledgement and read-back', () => {
  test('quiz remains retryable when backend rejects the progress write', async ({ page }) => {
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

  for (const module of ACTIVE_DASHBOARD_MODULES) {
    test(`${module.title} discussion persists to backend and reads back after reload`, async ({ page }) => {
      const { calls, discussionData } = await installMockParticipant(page);

      await page.goto(appUrl(module.routes.discussion));
      const form = page.locator('form').filter({ has: page.locator('textarea') }).first();
      await expect(form).toBeVisible({ timeout: 15000 });
      const discussionText = `QA discussion read-back ${module.key}`;
      await form.locator('textarea').fill(discussionText);
      await form.locator('button[type="submit"], button:has-text("Posting Diskusi")').first().click();

      await expect.poll(() => calls.some(call =>
        call.action === 'saveParticipantDiscussion'
        && call.module_id === module.moduleId
        && call.text === discussionText
      )).toBe(true);
      expect(discussionData).toEqual(expect.arrayContaining([
        expect.objectContaining({ module_id: module.moduleId, text: discussionText })
      ]));

      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await expect(page.locator('[data-discussion-id]').filter({ hasText: discussionText })).toBeVisible({ timeout: 15000 });
    });
  }
});

test.describe('Runtime and module identity', () => {
  for (const moduleKey of ['evaluation', 'evolution']) {
    test(`${moduleKey} loads without PYTHON_GUIDES runtime errors`, async ({ page }) => {
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
      const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === moduleKey);
      await installMockParticipant(page);
      await page.goto(appUrl(module.routes.quiz));
      await expectLearningPage(page, module);
      const headings = await page.locator('h1, h2, h3').allTextContents();
      expect(headings.join(' | ')).not.toMatch(/Kuis Python/i);
    });
  }

  test('AI Modern preserves source integrity after enhancement', async ({ page }) => {
    const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === 'modern');
    await installMockParticipant(page);
    await page.goto(appUrl(module.routes.overview));
    const source = page.locator('#modern-chapter-container');
    await expect(source).toBeVisible({ timeout: 15000 });
    await expect(source).toHaveAttribute('data-source-integrity', 'passed', { timeout: 15000 });
  });
});

test.describe('AI Fundamentals summary', () => {
  test('five Pengantar AI topics persist numeric chapters and read back 100%', async ({ page }) => {
    const { calls, progressData } = await installMockParticipant(page);
    const lessonRoutes = [
      '/participant-ai-intro',
      '/participant-ai-history',
      '/participant-ai-types',
      '/participant-ai-ml-dl',
      '/participant-ai-summary'
    ];

    for (const [index, route] of lessonRoutes.entries()) {
      await page.goto(appUrl(route));
      await expect.poll(() => calls.some(call =>
        call.action === 'saveParticipantProgress'
        && call.module_id === 'ai-fundamentals'
        && String(call.chapter_id) === String(index + 1)
      )).toBe(true);
      await expect(page.locator('[data-lesson-progress-caption]')).toContainText(`${index + 1} dari 5 topik selesai`);
    }

    expect(progressData.filter(row => row.module_id === 'ai-fundamentals' && /^\d+$/.test(String(row.chapter_id)))).toHaveLength(5);
    await expect(page.locator('[data-lesson-progress-text]')).toHaveText('100%');
    await expect(page.locator('.lesson-list-card li.completed')).toHaveCount(5);
    await expect(page.locator('.lesson-list-card li.active')).toHaveCount(1);
    await expect(page.locator('.lesson-list-card li.completed:not(.active) .fa-circle-check')).toHaveCount(4);
  });

  test('summary reflects non-zero backend progress instead of static 0/0/6', async ({ page }) => {
    const dashboardData = defaultDashboardData();
    await installMockParticipant(page, { dashboardData });

    await page.goto(appUrl('/participant-ai-fundamentals'));
    const summary = page.locator('.course-summary-card');
    await expect(summary).toBeVisible();
    await expect(summary).toHaveAttribute('data-learning-summary-state', 'ready');
    await expect(summary.locator('[data-learning-summary-progress]')).toHaveText('13%');
    await expect(summary.locator('[data-learning-summary-completed]')).toHaveText('0');
    await expect(summary.locator('[data-learning-summary-in-progress]')).toHaveText('2');
    await expect(summary.locator('[data-learning-summary-not-started]')).toHaveText('4');
  });
});
