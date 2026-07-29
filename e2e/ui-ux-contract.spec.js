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
    await expect(donut).toHaveAttribute('aria-label', /\d+ persen progress/i);
    await expect(summary).toContainText('Tuntas');
    await expect(summary).toContainText('Dalam Proses');
    await expect(summary).toContainText('Belum Dimulai');
    await expect(summary.locator('li')).toHaveCount(3);
  });

  test('primary practice controls meet the 44px touch-target minimum on mobile', async ({ page }) => {
    test.fail(true, 'Known issue #83: tombol praktik utama masih di bawah minimum touch target 44px.');
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
