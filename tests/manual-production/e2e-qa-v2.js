const { chromium } = require('playwright');
const BASE = 'https://her-ai.data-sorcerers.com';
const NIK = process.env.HERAI_QA_NIK;
const PASS = process.env.HERAI_QA_PASSWORD;
if (!NIK || !PASS) { console.error('Missing env vars'); process.exit(1); }
const ts = function() { return new Date().toISOString().substring(11,23); };

(async function() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const failures = [];
  const consoleErrors = [];
  page.on('console', function(msg) { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', function(err) { consoleErrors.push('[PAGE] ' + err.message); });

  try {
    console.log('[' + ts() + '] Step 1: Login at /#/profile');
    await page.goto(BASE + '/#/profile', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(4000);
    await page.fill('#profileNik', NIK);
    await page.fill('#profilePassword', PASS);
    var btn = await page.$('button[type="submit"]') || await page.$('form button');
    if (btn) { await btn.click(); console.log('[' + ts() + ']   Login submitted'); }
    else failures.push('NO_LOGIN_BTN');
    await page.waitForTimeout(10000);

    var hasSession = await page.evaluate(function() { return !!sessionStorage.getItem('heraiParticipantSession'); });
    console.log('[' + ts() + ']   Session: ' + (hasSession ? 'OK' : 'NONE'));
    if (!hasSession) failures.push('NO_SESSION');

    console.log('[' + ts() + '] Step 2: Dashboard');
    await page.goto(BASE + '/#/participant-dashboard', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(3000);
    var dashText = await page.textContent('body').catch(function() { return ''; });
    console.log('[' + ts() + ']   Body: ' + dashText.substring(0,200).replace(/\n/g, ' '));
    await page.screenshot({ path: '/tmp/e2e-dashboard.png' });

    console.log('[' + ts() + '] Step 3: Module catalog');
    await page.goto(BASE + '/#/participant-modules', { waitUntil: 'networkidle', timeout: 10000 });
    await page.waitForTimeout(3000);
    var cardCount = await page.evaluate(function() { return document.querySelectorAll('.course-card, .module-card, [data-module-id]').length; });
    console.log('[' + ts() + ']   Cards: ' + cardCount);
    await page.screenshot({ path: '/tmp/e2e-modules.png' });

    console.log('[' + ts() + '] Step 4: Fix #119 - discussion names');
    var mods = ['ai-python', 'ai-reasoning', 'ai-modern', 'ai-evaluation', 'ai-evolution'];
    for (var i = 0; i < mods.length; i++) {
      await page.goto(BASE + '/#/participant-' + mods[i] + '-discussion', { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(2000);
      var text = await page.textContent('body').catch(function() { return ''; });
      var bad = text.indexOf('Aisyah Putri') !== -1;
      console.log('[' + ts() + ']   ' + mods[i] + ': ' + (bad ? 'FAIL' : 'CLEAN'));
      if (bad) failures.push('AISYAH_' + mods[i]);
    }

    console.log('[' + ts() + '] Step 5: Foundation overviews');
    var routes = {
      'ai-intro': '/participant-ai-intro',
      'ai-python': '/participant-ai-lab-python-untuk-ai',
      'ai-reasoning': '/participant-ai-lab-reasoning',
      'ai-modern': '/participant-ai-lab-konsep-ai-modern',
      'ai-evaluation': '/participant-ai-lab-evaluation',
      'ai-evolution': '/participant-ai-lab-evolution'
    };
    var keys = Object.keys(routes);
    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];
      await page.goto(BASE + '/#' + routes[k], { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1500);
      var hasErr = await page.$('.error-state, .fellow-locked-state, .fellow-restricted-state');
      var hasCnt = await page.$('.material-content, .lesson-content, article, h1, h2');
      console.log('[' + ts() + ']   ' + k + ': ' + (hasCnt ? 'OK' : 'NO_CONTENT') + (hasErr ? ' LOCKED' : ''));
    }

    console.log('[' + ts() + '] Step 6: Quiz pages accessibility');
    var quizRoutes = ['ai-intro', 'ai-python', 'ai-reasoning', 'ai-modern', 'ai-evaluation', 'ai-evolution'];
    for (var q = 0; q < quizRoutes.length; q++) {
      var qr = quizRoutes[q];
      var qPath = qr === 'ai-intro' ? '/participant-ai-intro-quiz' : '/participant-ai-lab-' + (qr === 'ai-python' ? 'python-untuk-ai' : qr === 'ai-modern' ? 'konsep-ai-modern' : qr) + '-quiz';
      await page.goto(BASE + '/#' + qPath, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1500);
      var qText = await page.textContent('body').catch(function() { return ''; });
      var hasQuiz = qText.indexOf('Soal') !== -1 || qText.indexOf('Pertanyaan') !== -1 || qText.indexOf('Kuis') !== -1;
      console.log('[' + ts() + ']   ' + qr + ' quiz: ' + (hasQuiz ? 'RENDERED' : 'NO_QUIZ'));
    }

    console.log('[' + ts() + '] Step 7: Practice pages accessibility');
    var pracRoutes = ['ai-intro', 'ai-python', 'ai-reasoning', 'ai-modern', 'ai-evaluation', 'ai-evolution'];
    for (var p = 0; p < pracRoutes.length; p++) {
      var pr = pracRoutes[p];
      var pPath = pr === 'ai-intro' ? '/participant-ai-intro-practice' : '/participant-ai-lab-' + (pr === 'ai-python' ? 'python-untuk-ai' : pr === 'ai-modern' ? 'konsep-ai-modern' : pr) + '-practice';
      await page.goto(BASE + '/#' + pPath, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1500);
      var pText = await page.textContent('body').catch(function() { return ''; });
      var hasPrac = pText.indexOf('Latihan') !== -1 || pText.indexOf('Jawaban') !== -1 || pText.indexOf('Essay') !== -1;
      console.log('[' + ts() + ']   ' + pr + ' practice: ' + (hasPrac ? 'RENDERED' : 'NO_PRACTICE'));
    }

    await page.screenshot({ path: '/tmp/e2e-final.png' });
    console.log('\n=== REPORT ===');
    console.log('Fix #119: ' + (failures.filter(function(f) { return f.indexOf('AISYAH') === 0; }).length === 0 ? 'PASS' : 'FAIL'));
    console.log('Session: ' + (hasSession ? 'OK' : 'FAIL'));
    console.log('Console errors: ' + consoleErrors.length);
    consoleErrors.slice(0, 3).forEach(function(e) { console.log('  ' + e.substring(0, 120)); });
    console.log('Failures: ' + failures.length + ' ' + failures.join(', '));
    process.exitCode = failures.length > 0 ? 1 : 0;
  } catch (err) {
    console.error('FATAL: ' + err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
