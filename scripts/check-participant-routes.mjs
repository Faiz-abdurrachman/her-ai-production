import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const ROUTER = resolve(ROOT, 'js/router.js');

function fail(msg) { console.error(`\n  ${msg}`); process.exit(1); }

const src = readFileSync(ROUTER, 'utf8');

// Extract participantDashboardPages array
const fellowPagesMatch = src.match(/const participantDashboardPages = \[([\s\S]*?)\];/);
if (!fellowPagesMatch) fail('ERROR: Could not extract participantDashboardPages array from router.js');

const fellowPages = fellowPagesMatch[1]
  .split('\n')
  .map(l => l.trim())
  .filter(l => l.startsWith('"/participant'))
  .map(l => l.replace(/["',]/g, '').trim());

if (fellowPages.length === 0) fail('ERROR: No fellow routes found in array');

// Extract route -> file mappings
const routeMatches = src.matchAll(/"(\/participant(?:-[^"]+)?)":\s*"([^"]+)"/g);
const routeFiles = {};
for (const m of routeMatches) {
  routeFiles[m[1]] = m[2];
}

let total = 0, passed = 0, failed = 0;
const errors = [];

for (const route of fellowPages) {
  total++;
  const file = routeFiles[route];
  let status = '✅';
  let note = '';

  if (!file) {
    status = '❌';
    note = 'ROUTE NOT IN routes object';
  } else {
    const fullPath = resolve(ROOT, file.startsWith('/') ? file.slice(1) : file);
    if (!existsSync(fullPath)) {
      status = '❌';
      note = `FILE MISSING: ${file}`;
    } else {
      const content = readFileSync(fullPath, 'utf8');
      const staleRefs = content.match(/#\/fellow-/g);
      if (staleRefs) {
        status = '⚠️';
        note = `${staleRefs.length} stale #/participant-* ref(s) found`;
      }
    }
  }

  if (status === '✅') passed++;
  else { failed++; errors.push(`${route} — ${note}`); }

  console.log(`  ${status} ${route.padEnd(42)} ${file || '(no file mapped)'}${note ? `  [${note}]` : ''}`);
}

console.log(`\n  ─────────────────────────────────────────────`);
console.log(`  Total: ${total}  |  ✅ ${passed} passed  |  ${failed > 0 ? '❌' : '✅'} ${failed} failed\n`);

if (failed > 0) {
  console.log('  Errors:');
  errors.forEach(e => console.log(`    - ${e}`));
  process.exit(1);
} else {
  console.log('  All fellow routes verified successfully.\n');
}
