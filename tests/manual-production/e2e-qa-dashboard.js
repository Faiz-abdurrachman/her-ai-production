const { chromium } = require('playwright');

const BASE = 'https://her-ai.data-sorcerers.com';
const NIK = process.env.HERAI_QA_NIK;
const PASSWORD = process.env.HERAI_QA_PASSWORD;

if (!NIK || !PASSWORD) {
  console.error('ERROR: Set HERAI_QA_NIK and HERAI_QA_PASSWORD env vars');
  process.exit(1);
}

function ts() { return new Date().toISOString().substring(11,23); }

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    locale: 'id-ID',
    timezoneId: 'Asia/Jakarta'
  });
  const page = await context.newPage();
  const failures = [];
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('[PAGE] ' + err.message));

  let failedRequests = [];
  page.on('response', resp => { if (resp.status() >= 400) failedRequests.push('HTTP ' + resp.status() + ' ' + resp.url().substring(0,100)); });
  page.on('requestfailed', req => failedRequests.push('FAIL ' + req.url().substring(0,100)));

  try {
    // ========== 1. LOGIN AT /#/profile ==========
    console.log('[' + ts() + '] 1. Login at /#/profile...');
    await page.goto(BASE + '/#/profile', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(4000);
    
    await page.fill('#profileNik', NIK);
    await page.fill('#profilePassword', PASSWORD);
    console.log('[' + ts() + ']    Credentials filled');

    const submitBtn = await page.$('button[type="submit"]') || await page.$('#participantLoginForm button') || await page.$('form button');
    if (submitBtn) {
      await submitBtn.click();
      console.log('[' + ts() + ']    Login submitted, waiting...');
    } else {
      failures.push('LOGIN_BUTTON_NOT_FOUND');
    }

    await page.waitForTimeout(10000);
    const hasSession = await page.evaluate(function() { return !!sessionStorage.getItem('heraiParticipantSession'); });
    console.log('[' + ts() + ']    Session: ' + (hasSession ? 'EXISTS' : 'NONE'));
    if (!hasSession) failures.push('NO_SESSION');

    console.log('[' + ts() + '] 2. Dashboard...');
    await page.goto(`${BASE}/#/participant-dashboard`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/tmp/e2e-dashboard.png' });
    const dashBody = await page.textContent('body').catch(() => '');
    console.log(`[${ts()}]    Body: "${dashBody.substring(0,200).replace(/\n/g,' ')}"`);

    // ========== 3. FIX #119 — "Aisyah Putri" in discussions ==========
    console.log(`[${ts()}] 3. Fix #119: checking "Aisyah Putri"...`);
    for (const mod of ['ai-python', 'ai-reasoning', 'ai-modern', 'ai-evaluation', 'ai-evolution']) {
      try {
        await page.goto(`${BASE}/#/participant-${mod}-discussion`, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(2000);
        const text = await page.textContent('body').catch(() => '');
        const hasAisyah = text.includes('Aisyah Putri');
        console.log(`[${ts()}]    ${mod}: ${hasAisyah ? '❌ AISYAH PUTRI' : '✅ CLEAN'}`);
        if (hasAisyah) failures.push(`AISYAH_${mod}`);
      } catch (e) {
        console.log(`[${ts()}]    ${mod}: NAV ERR`);
      }
    }

    // ========== 4. MODULE CATALOG ==========
    console.log(`[${ts()}] 4. Module catalog...`);
    await page.goto(`${BASE}/#/participant-modules`, { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(2500);
    const cards = await page.$$('.course-card, .module-card, [data-module-id]');
    console.log(`[${ts()}]    Cards: ${cards.length}`);
    if (cards.length === 0) failures.push('NO_MODULE_CARDS');
    await page.screenshot({ path: '/tmp/e2e-modules.png', fullPage: true });

    // ========== 5. FOUNDATION OVERVIEWS ==========
    console.log(`[${ts()}] 5. Foundation overviews...`);
    const routes = {
      'ai-fundamentals': '/participant-ai-intro',
      'ai-python': '/participant-ai-lab-python-untuk-ai',
      'ai-reasoning': '/participant-ai-lab-reasoning',
      'ai-modern': '/participant-ai-lab-konsep-ai-modern',
      'ai-evaluation': '/participant-ai-lab-evaluation',
      'ai-evolution': '/participant-ai-lab-evolution'
    };
    for (const [mod, route] of Object.entries(routes)) {
      try {
        await page.goto(`${BASE}/#${route}`, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(1500);
        const hasErr = await page.$('.error-state, .fellow-locked-state, .fellow-restricted-state');
        const hasCnt = await page.$('.material-content, .lesson-content, .module-content, article, h1, h2');
        console.log(`[${ts()}]    ${mod}: ${hasCnt ? '✅' : '⚠️'}${hasErr ? ' LOCKED' : ' ok'}`);
        if (!hasCnt && !hasErr) failures.push(`NO_CONTENT_${mod}`);
      } catch (e) {
        console.log(`[${ts()}]    ${mod}: ❌ FAIL`);
        failures.push(`NAV_${mod}`);
      }
    }

    // ========== FINAL ==========
    console.log(`[${ts()}] Errors: console=${errors.length}, network=${failedRequests.length}`);
    errors.slice(0,3).forEach(e => console.log(`    ${e.substring(0,120)}`));
    failedRequests.slice(0,3).forEach(r => console.log(`    ${r}`));
    await page.screenshot({ path: '/tmp/e2e-final.png' });

    console.log(`\n========== REPORT ==========`);
    console.log(`Fix #119: ${failures.filter(f=>f.startsWith('AISYAH')).length===0 ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Login: ${failures.filter(f=>f.includes('LOGIN')).length===0 ? '⚠️ CHECK MANUAL' : '❌ FAIL'}`);
    console.log(`Foundation: ${failures.filter(f=>f.includes('NAV_')||f.includes('NO_CONTENT')).length===0 ? '✅' : '⚠️ ISSUES'}`);
    console.log(`Total failures: ${failures.length}`);
    if (failures.length > 0) console.log('  ' + failures.join(', '));
    process.exitCode = failures.length > 0 ? 1 : 0;

  } catch (err) {
    console.error(`[${ts()}] FATAL: ${err.message}`);
    await page.screenshot({ path: '/tmp/e2e-error.png' });
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
