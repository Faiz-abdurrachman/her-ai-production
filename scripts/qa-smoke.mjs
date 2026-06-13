#!/usr/bin/env node

import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const reportsDir = path.join(root, 'reports');

const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, '-');
const reportPath = path.join(reportsDir, `qa-report-${stamp}.md`);
const latestPath = path.join(reportsDir, 'qa-report-latest.md');
const jsonPath = path.join(reportsDir, 'qa-report-latest.json');

const config = {
  frontendUrl: process.env.QA_FRONTEND_URL || 'http://127.0.0.1:3000',
  messagingUrl: process.env.QA_MESSAGING_URL || 'http://127.0.0.1:8091',
  signalingUrl: process.env.QA_SIGNALING_URL || 'http://127.0.0.1:8080',
  gasUrl: process.env.GAS_WEB_APP_URL || '',
  timeoutMs: Number(process.env.QA_TIMEOUT_MS || 4500),
};

const results = [];

function addResult(area, check, status, detail = '', meta = {}) {
  results.push({ area, check, status, detail, ...meta });
}

function rel(filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

async function listFiles(dir, predicate) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(full, predicate));
    } else if (!predicate || predicate(full)) {
      files.push(full);
    }
  }
  return files;
}

function execFilePromise(command, args, options = {}) {
  return new Promise((resolve) => {
    execFile(command, args, { cwd: root, timeout: config.timeoutMs * 3, ...options }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        code: error?.code ?? 0,
        signal: error?.signal || '',
        stdout: String(stdout || '').trim(),
        stderr: String(stderr || '').trim(),
      });
    });
  });
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    const text = await response.text();
    return { ok: response.ok, status: response.status, text };
  } catch (error) {
    return { ok: false, status: 0, text: error.message };
  } finally {
    clearTimeout(timer);
  }
}

async function checkRequiredFiles() {
  const required = [
    'index.html',
    'server.js',
    'render.yaml',
    'gas/Code.gs',
    'js/router.js',
    'components/navbar.html',
    'components/sidebar.html',
    'components/footer.html',
    'messaging/main.go',
    'signaling/main.go',
    'docs/DEVELOPER_HANDOVER_AND_ROADMAP.md',
    'docs/DEVELOPER_HANDOVER_AND_ROADMAP.pdf',
    'docs/HerAI_Developer_Prompt_Templates.pdf',
  ];

  for (const file of required) {
    addResult(
      'Required Files',
      file,
      existsSync(path.join(root, file)) ? 'PASS' : 'FAIL',
      existsSync(path.join(root, file)) ? 'Found' : 'Missing'
    );
  }
}

async function checkSpaRoutes() {
  const routerPath = path.join(root, 'js/router.js');
  const source = await readFile(routerPath, 'utf8');
  const routeBlock = source.match(/routes:\s*\{([\s\S]*?)\},\s*routeAliases:/);
  if (!routeBlock) {
    addResult('SPA Routes', 'Parse routes object', 'FAIL', 'routes object not found in js/router.js');
    return;
  }

  const routes = [];
  const regex = /"([^"]+)":\s*"([^"]+\.html)"/g;
  let match;
  while ((match = regex.exec(routeBlock[1])) !== null) {
    routes.push({ route: match[1], file: match[2] });
  }

  addResult('SPA Routes', 'Route count', routes.length >= 20 ? 'PASS' : 'WARN', `${routes.length} routes detected`);

  const missing = [];
  for (const route of routes) {
    const target = path.join(root, route.file.replace(/^\//, ''));
    if (!existsSync(target)) missing.push(`${route.route} -> ${route.file}`);
  }

  addResult(
    'SPA Routes',
    'Every route points to existing HTML',
    missing.length === 0 ? 'PASS' : 'FAIL',
    missing.length === 0 ? 'All route files exist' : missing.join('; ')
  );
}

async function checkJavaScriptSyntax() {
  const jsFiles = await listFiles(path.join(root, 'js'), file => file.endsWith('.js'));
  jsFiles.push(path.join(root, 'server.js'));
  for (const file of jsFiles) {
    const result = await execFilePromise(process.execPath, ['--check', file]);
    addResult(
      'JavaScript Syntax',
      rel(file),
      result.ok ? 'PASS' : 'FAIL',
      result.ok ? 'Syntax OK' : (result.stderr || result.stdout || `node --check failed with code ${result.code}`)
    );
  }
}

async function checkGoServices() {
  const services = ['messaging', 'signaling'];
  const goEnv = {
    ...process.env,
    GOCACHE: process.env.GOCACHE || '/private/tmp/herai-go-build-cache',
  };
  for (const service of services) {
    const serviceDir = path.join(root, service);
    if (!existsSync(path.join(serviceDir, 'go.mod'))) {
      addResult('Go Services', service, 'WARN', 'go.mod not found');
      continue;
    }
    const result = await execFilePromise('go', ['test', './...'], { cwd: serviceDir, timeout: config.timeoutMs * 8, env: goEnv });
    addResult(
      'Go Services',
      `${service}: go test ./...`,
      result.ok ? 'PASS' : 'FAIL',
      result.ok ? (result.stdout || 'Go tests passed') : (result.stderr || result.stdout)
    );
  }
}

async function checkGasActions() {
  const source = await readFile(path.join(root, 'gas/Code.gs'), 'utf8');
  const sheets = [...source.matchAll(/^\s*([a-zA-Z0-9_]+):\s*'([^']+)'/gm)].map(m => m[2]);
  const actions = [...source.matchAll(/^\s*([a-zA-Z0-9_]+):\s*\(\)\s*=>/gm)].map(m => m[1]);
  const duplicateActions = actions.filter((item, index) => actions.indexOf(item) !== index);
  const requiredActions = [
    'register',
    'participantLogin',
    'getData',
    'runAiAnalysis',
    'getCompetencyQuestions',
    'submitCompetencyTest',
    'generateReTestAccess',
    'retestLogin',
    'submitFinalProject',
    'saveAsset',
  ];
  const missingRequired = requiredActions.filter(action => !actions.includes(action));

  addResult('GAS', 'Sheet registry count', sheets.length >= 10 ? 'PASS' : 'WARN', `${sheets.length} sheets detected`);
  addResult('GAS', 'Action route count', actions.length >= 30 ? 'PASS' : 'WARN', `${actions.length} actions detected`);
  addResult('GAS', 'Duplicate actions', duplicateActions.length === 0 ? 'PASS' : 'FAIL', duplicateActions.length ? duplicateActions.join(', ') : 'None');
  addResult('GAS', 'Critical actions available', missingRequired.length === 0 ? 'PASS' : 'FAIL', missingRequired.length ? missingRequired.join(', ') : 'All critical actions found');
}

async function checkDocs() {
  const docs = [
    'docs/DEVELOPER_HANDOVER_AND_ROADMAP.md',
    'docs/DEVELOPER_HANDOVER_AND_ROADMAP.pdf',
    'docs/HerAI_Developer_Prompt_Templates.pdf',
  ];
  for (const doc of docs) {
    const full = path.join(root, doc);
    if (!existsSync(full)) {
      addResult('Documentation', doc, 'FAIL', 'Missing');
      continue;
    }
    const info = await stat(full);
    addResult('Documentation', doc, info.size > 1024 ? 'PASS' : 'WARN', `${Math.round(info.size / 1024)} KB`);
  }
}

async function checkEndpoint(url, area, check, expectedText = '') {
  const result = await fetchWithTimeout(url);
  if (!result.ok) {
    addResult(area, check, 'WARN', `Not reachable or not OK: ${result.status} ${result.text.slice(0, 160)}`);
    return;
  }
  const hasExpected = expectedText ? result.text.includes(expectedText) : true;
  addResult(area, check, hasExpected ? 'PASS' : 'WARN', hasExpected ? `HTTP ${result.status}` : `HTTP ${result.status}, expected text not found`);
}

async function checkRuntimeEndpoints() {
  await checkEndpoint(`${config.frontendUrl}/index.html`, 'Runtime Endpoint', `Frontend ${config.frontendUrl}`, '<div id="app-content">');
  await checkEndpoint(`${config.messagingUrl}/healthz`, 'Runtime Endpoint', `Messaging ${config.messagingUrl}/healthz`, 'herai-messaging');
  await checkEndpoint(`${config.messagingUrl}/api/config`, 'Runtime Endpoint', `Messaging ${config.messagingUrl}/api/config`, 'allowed_roles');
  await checkEndpoint(`${config.signalingUrl}/healthz`, 'Runtime Endpoint', `Signaling ${config.signalingUrl}/healthz`, 'herai-signaling');
  await checkEndpoint(`${config.signalingUrl}/meeting-config`, 'Runtime Endpoint', `Signaling ${config.signalingUrl}/meeting-config`, 'transport');
  if (config.gasUrl) {
    await checkEndpoint(config.gasUrl, 'Runtime Endpoint', 'GAS Web App', 'HerAI GAS Backend');
  } else {
    addResult('Runtime Endpoint', 'GAS Web App', 'WARN', 'GAS_WEB_APP_URL not provided in environment; skipped live GAS check');
  }
}

function summarize() {
  const counts = { PASS: 0, WARN: 0, FAIL: 0 };
  for (const result of results) counts[result.status] = (counts[result.status] || 0) + 1;
  return counts;
}

function statusIcon(status) {
  return status === 'PASS' ? 'PASS' : status === 'WARN' ? 'WARN' : 'FAIL';
}

function escapeMd(text) {
  return String(text || '').replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

async function writeReports() {
  const counts = summarize();
  const failed = results.filter(r => r.status === 'FAIL');
  const warned = results.filter(r => r.status === 'WARN');
  const lines = [];

  lines.push('# HerAI QA Smoke Report');
  lines.push('');
  lines.push(`Generated: ${now.toISOString()}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- PASS: ${counts.PASS}`);
  lines.push(`- WARN: ${counts.WARN}`);
  lines.push(`- FAIL: ${counts.FAIL}`);
  lines.push(`- Frontend URL: ${config.frontendUrl}`);
  lines.push(`- Messaging URL: ${config.messagingUrl}`);
  lines.push(`- Signaling URL: ${config.signalingUrl}`);
  lines.push(`- GAS live check: ${config.gasUrl ? 'enabled' : 'skipped'}`);
  lines.push('');

  lines.push('## Release Gate');
  lines.push('');
  if (failed.length === 0) {
    lines.push('Status: PASS WITH WARNINGS ALLOWED');
    lines.push('');
    lines.push('Tidak ada FAIL pada automation. WARN perlu ditinjau, terutama endpoint yang tidak sedang berjalan saat QA dijalankan.');
  } else {
    lines.push('Status: BLOCKED');
    lines.push('');
    lines.push('Masih ada FAIL yang harus diperbaiki sebelum dianggap aman untuk deploy.');
  }
  lines.push('');

  if (failed.length) {
    lines.push('## Failed Checks');
    lines.push('');
    for (const item of failed) {
      lines.push(`- ${item.area} / ${item.check}: ${item.detail}`);
    }
    lines.push('');
  }

  if (warned.length) {
    lines.push('## Warnings');
    lines.push('');
    for (const item of warned) {
      lines.push(`- ${item.area} / ${item.check}: ${item.detail}`);
    }
    lines.push('');
  }

  lines.push('## Detailed Results');
  lines.push('');
  lines.push('| Area | Check | Status | Detail |');
  lines.push('|---|---|---|---|');
  for (const item of results) {
    lines.push(`| ${escapeMd(item.area)} | ${escapeMd(item.check)} | ${statusIcon(item.status)} | ${escapeMd(item.detail)} |`);
  }
  lines.push('');

  lines.push('## How To Re-run');
  lines.push('');
  lines.push('```bash');
  lines.push('node scripts/qa-smoke.mjs');
  lines.push('');
  lines.push('# Optional live endpoint override');
  lines.push('QA_FRONTEND_URL=http://127.0.0.1:3000 \\');
  lines.push('QA_MESSAGING_URL=http://127.0.0.1:8091 \\');
  lines.push('QA_SIGNALING_URL=http://127.0.0.1:8080 \\');
  lines.push('GAS_WEB_APP_URL=https://script.google.com/macros/s/.../exec \\');
  lines.push('node scripts/qa-smoke.mjs');
  lines.push('```');
  lines.push('');

  await mkdir(reportsDir, { recursive: true });
  const markdown = lines.join('\n');
  await writeFile(reportPath, markdown);
  await writeFile(latestPath, markdown);
  await writeFile(jsonPath, JSON.stringify({ generated_at: now.toISOString(), summary: counts, config, results }, null, 2));

  console.log(`QA report written: ${rel(reportPath)}`);
  console.log(`Latest report: ${rel(latestPath)}`);
  console.log(`JSON report: ${rel(jsonPath)}`);
  console.log(`Summary: PASS=${counts.PASS} WARN=${counts.WARN} FAIL=${counts.FAIL}`);
  process.exitCode = counts.FAIL > 0 ? 1 : 0;
}

async function main() {
  await checkRequiredFiles();
  await checkSpaRoutes();
  await checkJavaScriptSyntax();
  await checkGoServices();
  await checkGasActions();
  await checkDocs();
  await checkRuntimeEndpoints();
  await writeReports();
}

main().catch(async error => {
  addResult('QA Runner', 'Unhandled error', 'FAIL', error.stack || error.message);
  await writeReports();
});
