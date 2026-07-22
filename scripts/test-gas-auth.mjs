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
const mismatchedDigest = crypto
  .createHash('sha256')
  .update(`${legacySalt}:DifferentPassword!8:${legacyPepper}`)
  .digest('hex');

const participants = [{
  rowId: 'row-1',
  nik,
  nama_lengkap: 'Peserta Test',
  email: 'participant@example.test',
  status_seleksi: 'lolos',
  participant_stage: 'accepted_stage_1',
  participant_password: `pw$1$${legacySalt}$${legacyDigest}`
}, {
  rowId: 'row-2',
  nik: generatedOnlyNik,
  nama_lengkap: 'Peserta Generated Password',
  email: 'generated@example.test',
  status_seleksi: 'lolos',
  participant_stage: 'accepted_stage_1',
  participant_password: `pw$1$${legacySalt}$${mismatchedDigest}`
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
  email: 'participant@example.test'
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
  email: 'generated@example.test'
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
  email: 'participant@example.test'
});
assert.equal(publicResult.status, 'success');
assert.equal(publicResult.participant.nama_lengkap, 'Peserta Test');
assert.equal(publicResult.participant.participant_password, undefined);

accounts[0].access_status = 'inactive';
const inactiveLogin = context.participantLogin({ nik, password });
assert.equal(inactiveLogin.status, 'error');
assert.match(inactiveLogin.message, /tidak aktif/);

console.log('Participant login regression checks passed; admin login remains unchanged');
