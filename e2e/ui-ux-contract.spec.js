// @ts-check
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { ACTIVE_DASHBOARD_MODULES } = require('./fixtures/active-modules');
const { TEST_BASE, installMockParticipant } = require('./helpers/mock-participant');

function appUrl(route) {
  return `${TEST_BASE}/#${route}`;
}

test.describe('UI/UX quality gate — deterministic mock', () => {
  test.beforeEach(async ({ page }) => {
    await installMockParticipant(page);
  });

  test('dashboard exposes exactly five active module links with accessible names', async ({ page }) => {
    await page.goto(appUrl('/participant-dashboard'));
    const cards = page.locator('#dashboardModuleGrid > a.module-card.dash-real:not(.add)');
    await expect(cards).toHaveCount(5, { timeout: 15000 });

    for (const module of ACTIVE_DASHBOARD_MODULES) {
      const card = cards.filter({ hasText: module.title });
      await expect(card).toHaveCount(1);
      await expect(card).toHaveAttribute('href', `#${module.routes.overview}`);
      expect((await card.getAttribute('aria-label')) || (await card.textContent())?.trim()).toBeTruthy();
    }
  });

  test('journey distinguishes live progress from phases that are still locked', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(appUrl('/participant-dashboard'));
    const journey = page.locator('#dashboardJourneyList');
    await expect(journey).toBeVisible({ timeout: 15000 });
    await expect(journey.locator('article')).toHaveCount(4);
    await expect(journey.locator('article').first()).toContainText('13%');
    await expect(journey.locator('.journey-state-locked')).toHaveCount(3);
    await expect(journey.locator('.journey-state-locked .fa-lock')).toHaveCount(3);
    await expect(journey.locator('.journey-state-locked')).toContainText(['Belum Dibuka', 'Belum Dibuka', 'Belum Dibuka']);
    await expect(journey).not.toContainText('0%');

    const width = await journey.evaluate(element => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth
    }));
    expect(width.scrollWidth).toBeLessThanOrEqual(width.clientWidth + 1);
  });

  for (const viewport of [
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'desktop-1280', width: 1280, height: 800 }
  ]) {
    test(`${viewport.name} has no horizontal overflow on the learning overview`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(appUrl('/participant-ai-fundamentals'));
      await expect(page.locator('.course-summary-card')).toBeVisible({ timeout: 15000 });

      const sizes = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth
      }));
      expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth + 1);
    });
  }

  test('learning summary does not rely on donut color alone', async ({ page }) => {
    await page.goto(appUrl('/participant-ai-fundamentals'));
    const summary = page.locator('.course-summary-card');
    const donut = summary.locator('.progress-donut');
    await expect(donut).toHaveAttribute('aria-label', /\d+ persen progres/i);
    await expect(summary).toContainText('Tuntas');
    await expect(summary).toContainText('Dalam Proses');
    await expect(summary).toContainText('Belum Dimulai');
    await expect(summary.locator('li')).toHaveCount(3);
  });

  test('Pengantar AI marks exactly one current material in the sidebar', async ({ page }) => {
    const lessonRoutes = [
      '/participant-ai-intro',
      '/participant-ai-history',
      '/participant-ai-types',
      '/participant-ai-ml-dl',
      '/participant-ai-summary'
    ];

    for (const route of lessonRoutes) {
      await page.goto(appUrl(route));
      const list = page.locator('.lesson-list-card ol');
      await expect(list).toBeVisible({ timeout: 15000 });

      const activeItems = list.locator('li.active');
      await expect(activeItems).toHaveCount(1);
      await expect(activeItems.locator('a')).toHaveAttribute('href', `#${route}`);
      await expect(activeItems.locator('a')).toHaveAttribute('aria-current', 'page');
      await expect(activeItems.locator('i')).toHaveClass(/fa-circle-play/);
    }
  });

  for (const viewport of [
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'desktop-1280', width: 1280, height: 800 }
  ]) {
    test(`${viewport.name} keeps Evaluation/Evolution quiz numbers horizontal and wrapping`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const moduleKey of ['evaluation', 'evolution']) {
        const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === moduleKey);
        await page.goto(appUrl(module.routes.quiz));

        const navigator = page.locator(`#${moduleKey === 'evaluation' ? 'aiEvaluation' : 'aiEvolution'}QuizNavigator`);
        await expect(navigator).toBeVisible({ timeout: 15000 });
        const buttons = navigator.locator('[data-quiz-step]');
        await expect(buttons).toHaveCount(20);

        const layout = await navigator.evaluate(element => {
          const buttonBoxes = [...element.querySelectorAll('[data-quiz-step]')].map(button => {
            const rect = button.getBoundingClientRect();
            return { width: rect.width, height: rect.height, top: Math.round(rect.top) };
          });
          return {
            display: getComputedStyle(element).display,
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            buttonBoxes
          };
        });

        expect(layout.display).toBe('flex');
        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
        expect(layout.buttonBoxes[0].top).toBe(layout.buttonBoxes[1].top);
        expect(new Set(layout.buttonBoxes.map(box => box.top)).size).toBeLessThan(20);
        for (const box of layout.buttonBoxes) {
          expect.soft(box.width).toBe(44);
          expect.soft(box.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  }

  test('mobile-375 keeps Reasoning quiz numbers horizontal and wrapping', async ({ page }) => {
    const module = ACTIVE_DASHBOARD_MODULES.find(item => item.key === 'reasoning');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(appUrl(module.routes.quiz));

    const navigator = page.locator('#aiReasoningQuizNavigator');
    await expect(navigator).toBeVisible({ timeout: 15000 });
    const layout = await navigator.evaluate(element => {
      const style = getComputedStyle(element);
      const buttonBoxes = [...element.querySelectorAll('button')].map(button => {
        const rect = button.getBoundingClientRect();
        return { width: rect.width, height: rect.height, top: Math.round(rect.top) };
      });
      return {
        display: style.display,
        direction: style.flexDirection,
        wrap: style.flexWrap,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        buttonBoxes
      };
    });

    expect(layout.buttonBoxes).toHaveLength(26);
    expect(layout.display).toBe('flex');
    expect(layout.direction).toBe('row');
    expect(layout.wrap).toBe('wrap');
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth + 1);
    expect(layout.buttonBoxes[0].top).toBe(layout.buttonBoxes[1].top);
    expect(new Set(layout.buttonBoxes.map(box => box.top)).size).toBeLessThan(26);
  });

  test('primary practice controls meet the 44px touch-target minimum on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(appUrl('/participant-ai-modern-practice'));
    const controls = page.locator('#aiModernPracticeForm [data-practice-save], #aiModernPracticeApp [data-practice-next]');
    await expect(controls.first()).toBeVisible({ timeout: 15000 });

    const boxes = await controls.evaluateAll(elements => elements
      .filter(element => !element.hidden && getComputedStyle(element).display !== 'none')
      .map(element => {
        const rect = element.getBoundingClientRect();
        return { label: element.textContent?.trim() || element.getAttribute('aria-label'), width: rect.width, height: rect.height };
      }));

    expect(boxes.length).toBeGreaterThan(0);
    for (const box of boxes) {
      expect.soft(box.width, `${box.label} width`).toBeGreaterThanOrEqual(44);
      expect.soft(box.height, `${box.label} height`).toBeGreaterThanOrEqual(44);
    }
  });

  test('keyboard focus is visible on the first dashboard module card', async ({ page }) => {
    await page.goto(appUrl('/participant-dashboard'));
    const firstCard = page.locator('#dashboardModuleGrid > a.module-card.dash-real:not(.add)').first();
    await expect(firstCard).toBeVisible({ timeout: 15000 });
    await firstCard.focus();
    await expect(firstCard).toBeFocused();

    const focusStyle = await firstCard.evaluate(element => {
      const style = getComputedStyle(element);
      return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, boxShadow: style.boxShadow };
    });
    const hasOutline = focusStyle.outlineStyle !== 'none' && focusStyle.outlineWidth !== '0px';
    const hasFocusShadow = focusStyle.boxShadow !== 'none';
    expect(hasOutline || hasFocusShadow).toBe(true);
  });

  test('module styles include a reduced-motion fallback', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../css/frontend/fellow-dashboard/modules.css'), 'utf8');
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
    expect(css).toMatch(/animation(?:-duration)?:\s*(?:none|0\.0?1ms)/);
  });
});
