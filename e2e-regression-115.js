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

  try {
    console.log('[' + ts() + '] Step 1: Login');
    await page.goto(BASE + '/#/profile', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#profileNik', { timeout: 15000 });
    await page.fill('#profileNik', NIK);
    await page.fill('#profilePassword', PASS);
    const btn = await page.$('button[type="submit"]') || await page.$('form button');
    if (btn) await btn.click();
    
    // Wait for the session to be established in sessionStorage
    await page.waitForFunction(() => !!sessionStorage.getItem('heraiParticipantSession'), { timeout: 30000 });
    await page.waitForTimeout(2000); // Give time for login redirect
    console.log(`[${ts()}]   Login successful.`);

    const pracRoutes = ['ai-intro', 'ai-python', 'ai-reasoning', 'ai-modern', 'ai-evaluation', 'ai-evolution'];
    
    for (const pr of pracRoutes) {
      console.log(`\n[${ts()}] Testing module: ${pr}`);
      const pPath = '/participant-' + pr + '-practice';
      
      await page.evaluate((path) => { window.location.hash = path; }, pPath);
      await page.waitForTimeout(3000);

      // We need to find the save button
      const saveBtn = await page.waitForSelector('[data-practice-save]', { timeout: 10000, state: 'attached' }).catch(() => null);
      if (!saveBtn) {
        console.log(`[${ts()}]   No save button found for ${pr}. SKIP.`);
        const text = await page.textContent('body').catch(() => 'no body text');
        console.log(`[${ts()}]   Body text: ${text.substring(0, 300)}...`);
        await page.screenshot({ path: `/tmp/e2e-fail-${pr}.png` });
        continue;
      }

      // Click Edit if needed
      const editBtn = await page.$('[data-practice-edit]');
      if (editBtn) {
        // Only click if the first textarea is disabled
        const isDis = await page.evaluate(() => {
           const ta = document.querySelector('textarea');
           return ta ? ta.disabled : false;
        });
        if (isDis) {
           console.log(`[${ts()}]   Form is locked, clicking edit...`);
           await editBtn.click();
           await page.waitForTimeout(500);
        }
      }

      const idMap = {
        'ai-python': '#aiPythonPracticeStatus',
        'ai-reasoning': '#aiReasoningPracticeStatus',
        'ai-modern': '#aiModernPracticeStatus',
        'ai-evaluation': '#aiEvaluationPracticeStatus',
        'ai-evolution': '#aiEvolutionPracticeStatus'
      };

      // Step 2.1: Submit incomplete (ditolak)
      console.log(`[${ts()}]   Test submit incomplete...`);
      // 1. Force unlock the form
      await page.evaluate(() => {
        document.querySelectorAll('textarea').forEach(ta => {
          ta.disabled = false;
          ta.value = '';
        });
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => el.disabled = false);
        const form = document.querySelector('form');
        if (form) form.classList.remove('is-saved', 'is-locked');
      });
      await page.waitForTimeout(500);

      // fill only the first one
      const numTextareas = await page.evaluate(() => document.querySelectorAll('textarea').length);
      if (numTextareas > 0) {
        await page.evaluate((tsStr) => {
           const ta = document.querySelectorAll('textarea')[0];
           if(ta) {
             ta.value = 'This is a test answer ' + tsStr;
             ta.dispatchEvent(new Event('input', { bubbles: true }));
           }
        }, Date.now());
      }
      
      await saveBtn.click();
      await page.waitForTimeout(1000);
      
      // Check status text for warning
      let statusText = '';
      if (pr === 'ai-intro') {
         statusText = await page.textContent('#aiIntroPracticeStatus').catch(()=>'');
      } else {
         statusText = await page.textContent(idMap[pr]).catch(()=>'');
      }
      
      const isRejected = statusText.toLowerCase().includes('isi seluruh') || statusText.toLowerCase().includes('masih kosong');
      console.log(`[${ts()}]   Status after incomplete submit: ${statusText}`);
      if (!isRejected) {
        console.log(`[${ts()}]   FAIL: Incomplete submit was not rejected properly.`);
        failures.push(`${pr}-incomplete`);
      } else {
        console.log(`[${ts()}]   PASS: Incomplete submit rejected.`);
      }

      if (pr === 'ai-modern') {
         // ai-modern renders one textarea at a time, we must click through all tabs
         const numTabs = (await page.$$('[data-practice-jump]')).length;
         for (let i = 0; i < numTabs; i++) {
           const tabs = await page.$$('[data-practice-jump]');
           if (tabs[i]) {
             await tabs[i].click();
             await page.waitForTimeout(100);
             await page.evaluate((tsStr) => {
               document.querySelectorAll('textarea').forEach(ta => {
                 ta.value = 'Lengkap - ' + tsStr;
                 ta.dispatchEvent(new Event('input', { bubbles: true }));
               });
             }, Date.now());
           }
         }
      } else {
         await page.evaluate((tsStr) => {
           document.querySelectorAll('textarea').forEach(ta => {
             ta.value = 'Lengkap - ' + tsStr;
             ta.dispatchEvent(new Event('input', { bubbles: true }));
           });
           document.querySelectorAll('input[type="radio"]').forEach(r => r.click());
         }, Date.now());
      }
      
      await saveBtn.click();
      
      // wait for save to complete dynamically (spinner to go away)
      let statusText2 = '';
      if (pr === 'ai-intro') {
         statusText2 = await page.textContent('#aiIntroPracticeStatus').catch(()=>'');
      } else {
         statusText2 = await page.textContent(idMap[pr]).catch(()=>'');
      }
      
      try {
        await page.waitForFunction(
          (sel) => {
            const el = document.querySelector(sel);
            return el && (el.textContent.toLowerCase().includes('berhasil') || el.textContent.toLowerCase().includes('tersimpan') || el.textContent.toLowerCase().includes('aman'));
          },
          idMap[pr] || '#aiIntroPracticeStatus',
          { timeout: 35000 }
        );
      } catch(e) {
        console.log(`[${ts()}]   Timeout waiting for success status.`);
      }
      
      statusText2 = await page.textContent(idMap[pr] || '#aiIntroPracticeStatus').catch(()=>'');
      
      const isAccepted = statusText2.toLowerCase().includes('berhasil') || statusText2.toLowerCase().includes('tersimpan') || statusText2.toLowerCase().includes('aman');
      console.log(`[${ts()}]   Status after complete submit: ${statusText2}`);
      if (!isAccepted) {
        console.log(`[${ts()}]   FAIL: Complete submit was not accepted properly.`);
        failures.push(`${pr}-complete`);
      } else {
        console.log(`[${ts()}]   PASS: Complete submit accepted.`);
      }
    }

    console.log('\n=== REPORT ===');
    console.log('Failures: ' + failures.length + (failures.length > 0 ? ' (' + failures.join(', ') + ')' : ''));
    process.exitCode = failures.length > 0 ? 1 : 0;
  } catch (err) {
    console.error('FATAL: ' + err.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
