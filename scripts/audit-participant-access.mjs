import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }
    if (character === '"') {
      quoted = true;
    } else if (character === ',') {
      row.push(field);
      field = '';
    } else if (character === '\n') {
      row.push(field.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ''));
    rows.push(row);
  }
  return rows;
}

const inputFlagIndex = process.argv.indexOf('--input');
const inputArgument = inputFlagIndex >= 0 ? process.argv[inputFlagIndex + 1] : process.argv[2];
if (!inputArgument) {
  console.error('Usage: node scripts/audit-participant-access.mjs --input <ParticipantAccounts.csv>');
  process.exit(2);
}

const inputPath = path.resolve(inputArgument);
const sourcePath = new URL('../gas/Code.gs', import.meta.url);
const gasSource = fs.readFileSync(sourcePath, 'utf8');
const context = vm.createContext({
  Array,
  Boolean,
  Date,
  Error,
  JSON,
  Math,
  Number,
  Object,
  RegExp,
  String
});
vm.runInContext(gasSource, context, { filename: 'gas/Code.gs' });

const rows = parseCsv(fs.readFileSync(inputPath, 'utf8').replace(/^\uFEFF/, ''));
const headers = rows.shift() || [];
const emailIndex = headers.indexOf('email');
const accessStatusIndex = headers.indexOf('access_status');
if (emailIndex < 0 || accessStatusIndex < 0) {
  console.error('CSV wajib memiliki kolom email dan access_status.');
  process.exit(2);
}

const accounts = rows
  .filter(row => row.some(value => String(value || '').trim() !== ''))
  .map(row => ({
    email: row[emailIndex],
    access_status: row[accessStatusIndex]
  }));
const reconciliation = context.buildParticipantPortalAccessReconciliation(accounts);

console.log(JSON.stringify(reconciliation.summary, null, 2));
if (!reconciliation.summary.ready_to_apply) process.exitCode = 1;
