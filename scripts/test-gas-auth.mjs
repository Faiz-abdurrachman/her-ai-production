import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../gas/Code.gs', import.meta.url), 'utf8');
const properties = new Map();
const cache = new Map();

const signedBytes = buffer => [...buffer].map(value => value > 127 ? value - 256 : value);
const unsignedBytes = values => Buffer.from(values.map(value => value < 0 ? value + 256 : value));

const context = vm.createContext({
  console,
  Date,
  JSON,
  Math,
  Object,
  Array,
  String,
  Number,
  Boolean,
  Error,
  RegExp,
  Logger: { log() {} },
  Utilities: {
    Charset: { UTF_8: 'UTF-8' },
    DigestAlgorithm: { SHA_256: 'sha256' },
    getUuid: () => crypto.randomUUID(),
    computeDigest: (_algorithm, value) => signedBytes(crypto.createHash('sha256').update(String(value)).digest()),
    computeHmacSha256Signature: (value, secret) => signedBytes(crypto.createHmac('sha256', String(secret)).update(String(value)).digest()),
    base64EncodeWebSafe: value => Buffer.from(String(value), 'utf8').toString('base64url'),
    base64DecodeWebSafe: value => signedBytes(Buffer.from(String(value), 'base64url')),
    newBlob: values => ({ getDataAsString: () => unsignedBytes(values).toString('utf8') })
  },
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: key => properties.get(key) || null,
      setProperty: (key, value) => properties.set(key, String(value))
    })
  },
  CacheService: {
    getScriptCache: () => ({
      get: key => cache.get(key) || null,
      put: (key, value) => cache.set(key, String(value)),
      remove: key => cache.delete(key)
    })
  },
  LockService: {
    getScriptLock: () => ({
      waitLock() {},
      releaseLock() {}
    })
  },
  ContentService: {
    MimeType: { JSON: 'application/json' },
    createTextOutput: value => ({
      value,
      setMimeType() { return this; }
    })
  }
});

vm.runInContext(source, context, { filename: 'gas/Code.gs' });

const nik = '3276010101010001';
const password = 'HerAI-Test!9';
const legacySalt = '1234567890abcdef1234567890abcdef';
const legacyPepper = '120NQtFqErJiIfITlPfVo8wV6G0_79qFKMTaptxNF-RA';
const legacyDigest = crypto
  .createHash('sha256')
  .update(`${legacySalt}:${password}:${legacyPepper}`)
  .digest('hex');
const generatedOnlyNik = '3276010101010002';
const generatedOnlyPassword = 'GeneratedOnly!8';
const outsideTargetNik = '3276010101010003';
const outsideTargetPassword = 'OutsideTarget!7';
const targetEmails = vm.runInContext('TARGET_PARTICIPANT_PORTAL_EMAILS.slice()', context);
const mismatchedDigest = crypto
  .createHash('sha256')
  .update(`${legacySalt}:DifferentPassword!8:${legacyPepper}`)
  .digest('hex');

const participants = [{
  rowId: 'row-1',
  nik,
  nama_lengkap: 'Peserta Test',
  email: targetEmails[0],
  status_seleksi: 'lolos',
  participant_stage: 'accepted_stage_1',
  participant_password: `pw$1$${legacySalt}$${legacyDigest}`
}, {
  rowId: 'row-2',
  nik: generatedOnlyNik,
  nama_lengkap: 'Peserta Generated Password',
  email: targetEmails[1],
  status_seleksi: 'lolos',
  participant_stage: 'accepted_stage_1',
  participant_password: `pw$1$${legacySalt}$${mismatchedDigest}`
}, {
  rowId: 'row-3',
  nik: outsideTargetNik,
  nama_lengkap: 'Peserta Di Luar Target',
  email: 'outside-target@example.test',
  status_seleksi: 'lolos',
  participant_stage: 'accepted_stage_1',
  participant_password: ''
}];
const accounts = [{
  account_id: 'pa-test',
  nik,
  username: nik,
  generated_password: password,
  password_hash: '',
  password_status: 'generated',
  access_status: '',
  participant_rowId: 'row-1',
  nama_lengkap: 'Peserta Test',
  email: targetEmails[0]
}, {
  account_id: 'pa-generated',
  nik: generatedOnlyNik,
  username: generatedOnlyNik,
  generated_password: generatedOnlyPassword,
  password_hash: '',
  password_status: 'generated',
  access_status: '',
  participant_rowId: 'row-2',
  nama_lengkap: 'Peserta Generated Password',
  email: targetEmails[1]
}, {
  account_id: 'pa-outside-target',
  nik: outsideTargetNik,
  username: outsideTargetNik,
  generated_password: outsideTargetPassword,
  password_hash: '',
  password_status: 'generated',
  access_status: 'active',
  participant_rowId: 'row-3',
  nama_lengkap: 'Peserta Di Luar Target',
  email: 'outside-target@example.test'
}];
const admins = [{
  id_admin: 'super-admin',
  password: 'admin123',
  nama_admin: 'Super Admin',
  peran_admin: 'superadmin',
  permissions: 'all',
  status: 'active'
}];

context.getRows = sheetName => {
  if (sheetName === 'peserta_tahap_1') return participants.map(row => ({ ...row }));
  if (sheetName === 'ParticipantAccounts') return accounts.map(row => ({ ...row }));
  if (sheetName === 'dashboard_admin') return admins.map(row => ({ ...row }));
  return [];
};
context.updateByKey = (sheetName, key, value, updates) => {
  const rows = sheetName === 'peserta_tahap_1'
    ? participants
    : (sheetName === 'ParticipantAccounts' ? accounts : admins);
  const row = rows.find(item => String(item[key]) === String(value));
  if (!row) return { status: 'error', message: `${key} tidak ditemukan` };
  Object.assign(row, updates);
  return { status: 'success' };
};
context.addRowObject = () => ({ status: 'success' });

const login = context.participantLogin({ nik, password, user_agent: 'test' });
assert.equal(login.status, 'success');
assert.ok(login.token);
assert.equal(login.profile.participant_password, undefined);
assert.ok(accounts[0].password_hash.startsWith('pw$1$'));
assert.equal(accounts[0].access_status, 'active');
assert.equal(accounts[0].generated_password, password);
assert.ok(context.verifyPasswordValueCurrent(participants[0].participant_password, password));

const participantClaims = context.verifyAuthToken(login.token);
assert.equal(participantClaims.type, 'participant');
assert.equal(participantClaims.scope, 'participant');
assert.equal(participantClaims.sub, nik);

const wrongPasswordLogin = context.participantLogin({ nik, password: 'DefinitelyWrong!8' });
assert.equal(wrongPasswordLogin.status, 'error');
assert.match(wrongPasswordLogin.message, /tidak valid/);

const generatedPasswordLogin = context.participantLogin({
  nik: generatedOnlyNik,
  password: generatedOnlyPassword
});
assert.equal(generatedPasswordLogin.status, 'success');
assert.equal(generatedPasswordLogin.profile.nama_lengkap, 'Peserta Generated Password');
assert.ok(context.verifyPasswordValueCurrent(participants[1].participant_password, generatedOnlyPassword));
assert.equal(accounts[1].generated_password, generatedOnlyPassword);

const outsideTargetLogin = context.participantLogin({
  nik: outsideTargetNik,
  password: outsideTargetPassword
});
assert.equal(outsideTargetLogin.status, 'error');
assert.match(outsideTargetLogin.message, /tidak aktif/);
assert.equal(participants[2].participant_password, '');

const outsideTargetLegacyToken = context.issueAuthToken('participant', outsideTargetNik, {
  scope: 'participant',
  rowId: 'row-3'
}, 12 * 60 * 60).token;
assert.throws(
  () => context.authorizeGasAction('getParticipantProgress', {
    participantToken: outsideTargetLegacyToken,
    nik: outsideTargetNik
  }),
  /akses sudah tidak aktif/
);

const retestToken = context.issueAuthToken('participant', outsideTargetNik, {
  scope: 'retest',
  accessId: 'retest-access-1'
}, 4 * 60 * 60).token;
assert.doesNotThrow(() => context.authorizeGasAction('startReTestSession', {
  participantToken: retestToken,
  nik: outsideTargetNik
}));
assert.throws(
  () => context.authorizeGasAction('uploadParticipantPhoto', {
    participantToken: retestToken,
    nik: outsideTargetNik
  }),
  /Sesi peserta tidak valid/
);

const reconciliationAccounts = targetEmails.map((email, index) => ({
  email,
  access_status: index < 8 ? 'active' : ''
}));
for (let index = 0; index < 87; index += 1) {
  reconciliationAccounts.push({
    email: `outside-${index}@example.test`,
    access_status: index < 6 ? 'active' : ''
  });
}
const reconciliation = context.buildParticipantPortalAccessReconciliation(reconciliationAccounts);
assert.equal(reconciliation.summary.total_accounts, 187);
assert.equal(reconciliation.summary.target_unique, 100);
assert.equal(reconciliation.summary.matched_target_accounts, 100);
assert.equal(reconciliation.summary.matched_target_emails, 100);
assert.equal(reconciliation.summary.outside_target_accounts, 87);
assert.equal(reconciliation.summary.expected_active, 100);
assert.equal(reconciliation.summary.expected_inactive, 87);
assert.equal(reconciliation.summary.to_activate, 92);
assert.equal(reconciliation.summary.to_deactivate, 87);
assert.equal(reconciliation.summary.unchanged, 8);
assert.equal(reconciliation.summary.missing_targets, 0);
assert.equal(reconciliation.summary.duplicate_account_email_keys, 0);
assert.equal(reconciliation.summary.ready_to_apply, true);

const invalidReconciliation = context.buildParticipantPortalAccessReconciliation([
  { email: targetEmails[0], access_status: 'active' },
  { email: targetEmails[0], access_status: 'active' }
]);
assert.equal(invalidReconciliation.summary.duplicate_account_email_keys, 1);
assert.equal(invalidReconciliation.summary.ready_to_apply, false);

const participantPayload = { participantToken: login.token, nik };
context.authorizeGasAction('updateParticipantProfile', participantPayload);
assert.equal(participantPayload.__auth.sub, nik);
assert.doesNotThrow(() => context.authorizeGasAction('getData', {}));

const adminLogin = context.login({
  id_admin: 'super-admin',
  password: 'admin123',
  perangkat: 'test',
  lokasi: 'test'
});
assert.equal(adminLogin.status, 'success');
assert.equal(adminLogin.admin.id_admin, 'super-admin');
assert.equal(adminLogin.token, undefined);

const publicResult = context.getPublicParticipantResult({
  nik,
  email: targetEmails[0]
});
assert.equal(publicResult.status, 'success');
assert.equal(publicResult.participant.nama_lengkap, 'Peserta Test');
assert.equal(publicResult.participant.participant_password, undefined);

accounts[0].access_status = 'inactive';
const inactiveLogin = context.participantLogin({ nik, password });
assert.equal(inactiveLogin.status, 'error');
assert.match(inactiveLogin.message, /tidak aktif/);
assert.throws(
  () => context.authorizeGasAction('getParticipantProgress', {
    participantToken: login.token,
    nik
  }),
  /akses sudah tidak aktif/
);

const reconciliationHeaders = ['email', 'access_status', 'updated_at', 'generated_password'];
const reconciliationValues = [reconciliationHeaders].concat(reconciliationAccounts.map((account, index) => [
  account.email,
  account.access_status,
  '',
  `credential-${index}`
]));
const reconciliationSheet = { name: 'ParticipantAccounts' };
const writeColumnIndexes = [];
let forceInvalidCompactionReadback = false;
context.ensureParticipantBackendSchema = () => ({ status: 'success' });
context.SpreadsheetApp = {
  flush() {},
  openById: () => ({ name: 'HerAI Test Spreadsheet' })
};
context.getParticipantPortalAccessSnapshot = () => {
  const snapshotAccounts = reconciliationValues.slice(1).map((row, index) => ({
    email: row[0],
    access_status: row[1],
    __source_index: index
  }));
  if (forceInvalidCompactionReadback && reconciliationValues.length === 101) {
    snapshotAccounts.pop();
    forceInvalidCompactionReadback = false;
  }
  return {
    sheet: reconciliationSheet,
    values: reconciliationValues,
    header_index: { email: 0, access_status: 1, updated_at: 2, generated_password: 3 },
    accounts: snapshotAccounts
  };
};
context.setColumnValues = (sheet, columnIndex, values) => {
  assert.equal(sheet, reconciliationSheet);
  writeColumnIndexes.push(columnIndex);
  values.forEach((value, index) => {
    reconciliationValues[index + 1][columnIndex] = value[0];
  });
};

const applyReconciliation = context.reconcileParticipantPortalAccess();
assert.equal(applyReconciliation.status, 'success');
assert.equal(applyReconciliation.changed, 179);
assert.deepEqual([...new Set(writeColumnIndexes)].sort(), [1, 2]);
assert.equal(reconciliationValues.slice(1, 101).every(row => row[1] === 'active'), true);
assert.equal(reconciliationValues.slice(101).every(row => row[1] === 'inactive'), true);
assert.equal(reconciliationValues.slice(1).every((row, index) => row[3] === `credential-${index}`), true);

const secondApplyReconciliation = context.reconcileParticipantPortalAccess();
assert.equal(secondApplyReconciliation.status, 'success');
assert.equal(secondApplyReconciliation.changed, 0);

let backupCount = 0;
let lastBackupName = '';
let backupHidden = false;
const backupSheet = {
  setName(name) {
    lastBackupName = name;
    return this;
  },
  setFrozenRows() { return this; },
  hideSheet() {
    backupHidden = true;
    return this;
  }
};
Object.assign(reconciliationSheet, {
  copyTo() {
    backupCount += 1;
    return backupSheet;
  },
  getDataRange() {
    return {
      clearContent() {
        reconciliationValues.length = 0;
      }
    };
  },
  getRange() {
    return {
      setValues(values) {
        reconciliationValues.length = 0;
        values.forEach(row => reconciliationValues.push(row.slice()));
      }
    };
  },
  setFrozenRows() { return this; }
});

const beforeRollbackCredentials = reconciliationValues.slice(1).map(row => row[3]);
forceInvalidCompactionReadback = true;
assert.throws(
  () => context.compactParticipantAccountsToTargetCohort(),
  /Read-back compaction tidak menghasilkan tepat 100 account target/
);
assert.equal(reconciliationValues.length, 188);
assert.deepEqual(reconciliationValues.slice(1).map(row => row[3]), beforeRollbackCredentials);

const compaction = context.compactParticipantAccountsToTargetCohort();
assert.equal(compaction.status, 'success');
assert.equal(compaction.already_compacted, false);
assert.equal(compaction.before, 187);
assert.equal(compaction.after, 100);
assert.equal(compaction.removed, 87);
assert.equal(compaction.credentials_changed, 0);
assert.match(compaction.backup_sheet, /^ParticipantAccounts_Backup_/);
assert.equal(lastBackupName, compaction.backup_sheet);
assert.equal(backupHidden, true);
assert.equal(reconciliationValues.length, 101);
assert.equal(reconciliationValues.slice(1).every(row => row[1] === 'active'), true);
assert.deepEqual(
  reconciliationValues.slice(1).map(row => row[3]),
  beforeRollbackCredentials.slice(0, 100)
);

const secondCompaction = context.compactParticipantAccountsToTargetCohort();
assert.equal(secondCompaction.status, 'success');
assert.equal(secondCompaction.already_compacted, true);
assert.equal(secondCompaction.removed, 0);
assert.equal(backupCount, 2);

console.log('Participant login regression checks passed; admin login remains unchanged');
