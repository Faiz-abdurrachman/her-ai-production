/**
 * HerAI Fellowship 2026 - Google Apps Script Backend
 *
 * Cara pakai:
 * 1. Buat Google Spreadsheet kosong.
 * 2. Extensions -> Apps Script.
 * 3. Paste file ini ke Code.gs.
 * 4. Set SPREADSHEET_ID dengan ID spreadsheet.
 * 5. Jalankan setupDatabase() sekali dari editor Apps Script.
 * 6. Deploy -> Web app -> Execute as Me -> Anyone with link.
 */

const SPREADSHEET_ID = '1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w';
const HERAI_BACKEND_VERSION = '2026.3.9-exercise-completeness';
const PASSWORD_HASH_PREFIX = 'pw$1$';
const PARTICIPANT_ACCOUNT_TYPE = 'participant';
const QA_PARTICIPANT_ACCOUNT_TYPE = 'qa';
const QA_PARTICIPANT_PROPERTY_KEYS = {
  nik: 'HERAI_QA_NIK',
  name: 'HERAI_QA_NAME',
  email: 'HERAI_QA_EMAIL',
  password: 'HERAI_QA_PASSWORD',
  resetConfirmation: 'HERAI_QA_RESET_CONFIRMATION'
};
const QA_PARTICIPANT_RESET_CONFIRMATION = 'RESET_QA_ONLY';
const PRELAUNCH_LEARNING_RESET_PROPERTY_KEY = 'HERAI_PRELAUNCH_LEARNING_RESET_CONFIRMATION';
const PRELAUNCH_LEARNING_RESET_CONFIRMATION = 'RESET_ALL_LEARNING_BEFORE_LAUNCH';
const AUTH_TOKEN_TTL_SECONDS = {
  admin: 8 * 60 * 60,
  participant: 12 * 60 * 60,
  retest: 4 * 60 * 60
};
const ACTIVE_FOUNDATION_MODULE_IDS = [
  'ai-fundamentals',
  'python-untuk-ai',
  'reasoning',
  'konsep-ai-modern',
  'evaluation',
  'evolution'
];
// Expected non-empty answer count per module for submitted exercises.
// Draft boleh parsial, tetapi submit wajib seluruh jawaban terisi.
const EXPECTED_EXERCISE_ANSWER_COUNTS = {
  'ai-fundamentals': 4,
  'python-untuk-ai': 12,
  'reasoning': 17,
  'konsep-ai-modern': 13,
  'evaluation': 5,
  'evolution': 7
};
const LEGACY_PASSWORD_PEPPERS = [
  '120NQtFqErJiIfITlPfVo8wV6G0_79qFKMTaptxNF-RA',
  '1n4ZVYq90RyAz-XUOA7cR9yZTrrvZsPZQuNZK1il_0-w'
];
let HERAI_REQUEST_SPREADSHEET = null;
// Cohort resmi peserta yang lolos tahap 2 dan berhak mengakses participant portal.
// ParticipantAccounts direkonsiliasi terhadap daftar ini memakai normalized email.
const TARGET_PARTICIPANT_PORTAL_EMAILS = [
  'sulyastrianggai@gmail.com',
  'rlputeri228@gmail.com',
  'sitisyahlahseptiyani@gmail.com',
  'anisahlathifah1453@gmail.com',
  'loveinaevelyn@gmail.com',
  'salmaninda28@gmail.com',
  'anazzdeapita@gmail.com',
  'anugerahfeliany@gmail.com',
  'sustrisimamora0413@gmail.com',
  'astriainun93@gmail.com',
  'shelawdya44@gmail.com',
  'celinapinonkuan26@gmail.com',
  'dianlekatompessy12@gmail.com',
  'ademegalia23@gmail.com',
  'auliapadzila@gmail.com',
  'nafeesahasnaputribimantari@gmail.com',
  'zanetacc36b@gmail.com',
  'kemilausenjasenandung@gmail.com',
  'virarahman04@gmail.com',
  'fajardindawati@gmail.com',
  'asyifaarianti279@gmail.com',
  'angelitaroselya123@gmail.com',
  'saharasaputri79@gmail.com',
  'larasqatrunnada@gmail.com',
  '22090124.berliani@student.poltekharber.ac.id',
  'fildzahizzati28@gmail.com',
  'nuraidah.pknstan@gmail.com',
  'salsadarlena70@gmail.com',
  'fatiyalabibah17@gmail.com',
  'hiy.karenina@gmail.com',
  'badariandini.fitria@gmail.com',
  'andrya.listy@gmail.com',
  'ayuhalimatus08@gmail.com',
  'dhestayy@gmail.com',
  'dwianggaraarsellya@gmail.com',
  'a3cryspy17@gmail.com',
  '1mustikaaulia@gmail.com',
  'salamasandihaqq@gmail.com',
  'widiawatywine@gmail.com',
  'silvanyafrizli@gmail.com',
  'naooo.riaaa@gmail.com',
  'salwanurul2612@gmail.com',
  'firdiyanti.education@gmail.com',
  'faustineftinegann@gmail.com',
  'auliapw85@gmail.com',
  'chayrunnisyasalsabilapj@gmail.com',
  'salsabila.mahdi@gmail.com',
  'octaviana.og@gmail.com',
  'annisa.einfadh@gmail.com',
  'ellsasania66@gmail.com',
  'aksaradenawa11@gmail.com',
  'gitagirsang27@gmail.com',
  'shfaa.salsabila@gmail.com',
  'rianadth1101@gmail.com',
  'salmaakhoirunn@gmail.com',
  'kellypatricias2004@gmail.com',
  'nura28523@gmail.com',
  'devilam1807@gmail.com',
  'ciciramadhani398@gmail.com',
  'syhdrs83@gmail.com',
  'nanasep2409@gmail.com',
  'laurathea397@gmail.com',
  'gereycie@gmail.com',
  'pradnyaanc@gmail.com',
  'angelhutajulu2@gmail.com',
  'ryhnkhlilahptri@gmail.com',
  'nazwaakeyla07@gmail.com',
  'shafiranurrr2005@gmail.com',
  'jennyagustinar@gmail.com',
  'ansyari.atikah@gmail.com',
  'nailakesmas@gmail.com',
  'salwa.adhani12@gmail.com',
  'muthmainnahzxc@gmail.com',
  'farahkirana08@gmail.com',
  'amarodesignid@gmail.com',
  'lestianaanggun7@gmail.com',
  'gheacitramel@gmail.com',
  'nazlahaulia84@gmail.com',
  'nerismaeka26@gmail.com',
  'ameliaamanatulislam22@gmail.com',
  'khairunnisa01040623@gmail.com',
  'vovifathonah@gmail.com',
  '250202082@student.ar-raniry.ac.id',
  'zaharachairani78@gmail.com',
  'vannya.a.gun@gmail.com',
  'pratamaputrinaylha@gmail.com',
  'annisaariyanti1@gmail.com',
  'tirtamahayogi@gmail.com',
  'tebiaryo@gmail.com',
  'khairanifajriyah1@gmail.com',
  'ike.marlina111@gmail.com',
  'elfilia.angelina@gmail.com',
  'sekarayuri@gmail.com',
  'destyarosa@gmail.com',
  'essyananike@gmail.com',
  'hilmkmlh@gmail.com',
  'krinazzhra@gmail.com',
  'mayaworkishere@gmail.com',
  'lismatulroqmah@gmail.com',
  'ariellacahyani@gmail.com'
];
const EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT = 100;
const EXPECTED_PARTICIPANT_ACCOUNT_TOTAL_BEFORE_COMPACTION = 187;

const SHEETS = {
  participants: 'peserta_tahap_1',
  admins: 'dashboard_admin',
  audit: 'AuditTrail',
  settings: 'Settings',
  stages: 'Stages',
  bootcamp: 'BootcampSessions',
  attendance: 'Attendance',
  competencyQuestions: 'CompetencyQuestions',
  competencySessions: 'CompetencySessions',
  retestAccess: 'ReTestAccess',
  retestSessions: 'ReTestSessions',
  aiResults: 'ai-screening-result',
  projects: 'FinalProjects',
  certificates: 'Certificates',
  assets: 'Assets',
  participantDashboardModules: 'participant_dashboard_modules',
  participantDashboardDiscussionTrails: 'participant_dashboard_discussion_trails',
  participantDashboardTracks: 'participant_dashboard_tracks',
  participantDashboardJourney: 'participant_dashboard_journey',
  participantDashboardEvents: 'participant_dashboard_events',
  participantDashboardLeaderboard: 'participant_dashboard_leaderboard',
  participantAccounts: 'ParticipantAccounts',
  participantActivity: 'ParticipantActivity',
  participantProgress: 'participant_progress',
  participantDiscussions: 'participant_discussions',
  participantExerciseSubmissions: 'participant_exercise_submissions'
};

const SCHEMA = {
  [SHEETS.participants]: [
    'rowId', 'created_at', 'nama_lengkap', 'nik', 'tempat_lahir', 'tanggal_lahir',
    'whatsapp', 'email', 'alamat', 'jalur', 'status_kerja', 'univ', 'program_studi',
    'instansi', 'posisi', 'pengalaman_kerja', 'kejuaraan', 'organisasi', 'cv_link',
    'essay_1', 'essay_2', 'essay_3', 'essay_4', 'essay_5',
    'status_seleksi', 'participant_stage', 'assigned_reviewer',
    'status_tahap_2', 'competency_status', 'competency_decided_at',
    'status_final', 'final_status',
    'skor_logika', 'skor_motivasi', 'skor_teknis', 'skor_latar', 'skor_akhir',
    'is_scanned', 'ai_summary', 'ai_motivation', 'ai_skills', 'ai_score',
    'bootcamp_status', 'attendance_rate', 'final_project_status', 'certificate_status',
    'participant_password', 'profile_updated_at', 'photo_url', 'account_type'
  ],
  [SHEETS.admins]: ['id_admin', 'password', 'peran_admin', 'nama_admin', 'permissions', 'status', 'created_at'],
  [SHEETS.audit]: ['timestamp', 'adminId', 'tindakan', 'perangkat', 'lokasi'],
  [SHEETS.settings]: ['key', 'value', 'updated_at', 'updated_by'],
  [SHEETS.stages]: ['stage_id', 'stage_name', 'status', 'target_date', 'owner', 'notes'],
  [SHEETS.bootcamp]: ['session_id', 'title', 'session_date', 'mentor', 'meeting_url', 'material_url', 'assignment_url', 'status'],
  [SHEETS.attendance]: ['session_id', 'participant_rowId', 'nama_lengkap', 'attendance_status', 'score', 'notes', 'updated_at'],
  [SHEETS.competencyQuestions]: ['id', 'section', 'type', 'difficulty', 'question', 'options', 'answer', 'points', 'status'],
  [SHEETS.competencySessions]: ['session_id', 'nik', 'nama_lengkap', 'status', 'camera_status', 'mic_status', 'answered_count', 'total_questions', 'score', 'weighted_score', 'section_scores', 'answers', 'focus_flags', 'page_visible', 'active_section', 'section_remaining', 'completed_sections', 'camera_snapshot', 'history_events', 'started_at', 'updated_at', 'submitted_at'],
  [SHEETS.retestAccess]: ['access_id', 'nik', 'nama_lengkap', 'access_code', 'status', 'notes', 'created_at', 'updated_at', 'used_at'],
  [SHEETS.retestSessions]: ['session_id', 'nik', 'nama_lengkap', 'status', 'camera_status', 'mic_status', 'answered_count', 'total_questions', 'score', 'weighted_score', 'section_scores', 'answers', 'focus_flags', 'page_visible', 'active_section', 'section_remaining', 'completed_sections', 'camera_snapshot', 'history_events', 'started_at', 'updated_at', 'submitted_at'],
  [SHEETS.aiResults]: ['rowId', 'nik', 'nama_lengkap', 'ai_summary', 'ai_skills', 'ai_motivation', 'analyzed_at', 'ai_score'],
  [SHEETS.projects]: ['project_id', 'team_id', 'team_name', 'title', 'members', 'institution', 'track', 'project_title', 'mentor', 'deck_url', 'repo_url', 'demo_url', 'overview', 'details', 'score', 'status', 'notes', 'submitted_at'],
  [SHEETS.certificates]: ['certificate_no', 'participant_rowId', 'nama_lengkap', 'final_score', 'status', 'issued_at', 'certificate_url'],
  [SHEETS.assets]: ['asset_id', 'title', 'type', 'url', 'visible_to', 'status', 'notes'],
  [SHEETS.participantDashboardModules]: ['module_id', 'title', 'subtitle', 'progress', 'icon', 'tone', 'href', 'total_chapters', 'is_active', 'sort_order', 'quiz_total', 'phase_id', 'tracking_enabled', 'dashboard_visible'],
  [SHEETS.participantDashboardDiscussionTrails]: ['actor', 'action', 'topic', 'time_label', 'tone', 'is_active', 'created_at'],
  [SHEETS.participantDashboardTracks]: ['title', 'subtitle', 'icon', 'is_active', 'sort_order'],
  [SHEETS.participantDashboardJourney]: ['phase_id', 'title', 'subtitle', 'progress', 'icon', 'accent', 'source_type', 'locked_label', 'is_active', 'sort_order'],
  [SHEETS.participantDashboardEvents]: ['day', 'month', 'title', 'time', 'url', 'is_active', 'sort_order'],
  [SHEETS.participantDashboardLeaderboard]: ['rank', 'nik', 'name', 'points', 'is_active'],
  [SHEETS.participantAccounts]: ['account_id', 'nik', 'username', 'generated_password', 'password_hash', 'password_status', 'access_status', 'nama_lengkap', 'email', 'whatsapp', 'participant_rowId', 'participant_stage', 'status_seleksi', 'created_at', 'updated_at', 'created_by', 'last_login_at', 'password_changed_at', 'account_type'],
  [SHEETS.participantActivity]: ['activity_id', 'timestamp', 'nik', 'nama_lengkap', 'activity_type', 'page', 'module_id', 'lesson_id', 'activity', 'score', 'total', 'payload_json', 'user_agent', 'session_id'],
  [SHEETS.participantProgress]: ['progress_id', 'participant_rowId', 'nik', 'module_id', 'chapter_id', 'status', 'score', 'started_at', 'completed_at', 'updated_at'],
  [SHEETS.participantDiscussions]: ['discussion_id', 'participant_rowId', 'nik', 'module_id', 'prompt', 'text', 'replies_json', 'created_at', 'updated_at'],
  [SHEETS.participantExerciseSubmissions]: [
    'submission_id', 'submission_key', 'participant_rowId', 'nik', 'nama_lengkap',
    'module_id', 'exercise_id', 'answers_json', 'answer_count', 'status',
    'submitted_at', 'updated_at', 'reviewer_id', 'score', 'feedback', 'reviewed_at'
  ]
};

function doPost(e) {
  try {
    HERAI_REQUEST_SPREADSHEET = null;
    const payload = JSON.parse(e.postData.contents || '{}');
    const action = payload.action || 'register';
    authorizeGasAction(action, payload);
    const routes = {
      register: () => registerParticipant(payload),
      participantLogin: () => participantLogin(payload),
      changeParticipantPassword: () => changeParticipantPassword(payload),
      saveParticipantProgress: () => saveParticipantProgress(payload),
      getParticipantProgress: () => getParticipantProgress(payload),
      saveParticipantDiscussion: () => saveParticipantDiscussion(payload),
      getParticipantDiscussions: () => getParticipantDiscussions(payload),
      saveParticipantExerciseDraft: () => saveParticipantExerciseDraft(payload),
      submitParticipantExercise: () => submitParticipantExercise(payload),
      getParticipantExerciseSubmissions: () => getParticipantExerciseSubmissions(payload),
      getExerciseSubmissions: () => getExerciseSubmissions(payload),
      reviewExerciseSubmission: () => reviewExerciseSubmission(payload),
      updateParticipantProfile: () => updateParticipantProfile(payload),
      uploadParticipantPhoto: () => uploadParticipantPhoto(payload),
      removeParticipantPhoto: () => removeParticipantPhoto(payload),
      provisionParticipantAccounts: () => provisionParticipantAccounts(payload),
      getParticipantAccounts: () => ({ status: 'success', accounts: getRows(SHEETS.participantAccounts) }),
      recordParticipantActivity: () => recordParticipantActivity(payload),
      getData: () => getParticipants(),
      getPublicParticipantResult: () => getPublicParticipantResult(payload),
      updateStatus: () => updateParticipantStatus(payload),
      updateScore: () => updateScore(payload),
      runAiAnalysis: () => runAiAnalysis(payload),
      login: () => login(payload),
      logActivity: () => logActivity(payload),
      getAuditData: () => getAuditData(),
      getAdmins: () => ({ status: 'success', admins: getRows(SHEETS.admins) }),
      addAdmin: () => addRowObject(SHEETS.admins, normalizeAdmin(payload)),
      updateAdmin: () => updateByKey(SHEETS.admins, 'id_admin', payload.id_admin || payload.adminId, normalizeAdmin(payload)),
      deleteAdmin: () => deleteByKey(SHEETS.admins, 'id_admin', payload.id_admin || payload.adminId),
      getSettings: () => ({ status: 'success', settings: getSettingsObject() }),
      saveSettings: () => saveSettingsObject(payload.settings || {}),
      getStages: () => ({ status: 'success', data: getRows(SHEETS.stages) }),
      saveStage: () => upsertByKey(SHEETS.stages, 'stage_id', payload.stage_id, payload),
      getBootcampSessions: () => ({ status: 'success', data: getRows(SHEETS.bootcamp) }),
      saveBootcampSession: () => upsertByKey(SHEETS.bootcamp, 'session_id', payload.session_id, payload),
      getCompetencyQuestions: () => getCompetencyQuestions(),
      startCompetencySession: () => startCompetencySession(payload),
      heartbeatCompetencySession: () => heartbeatCompetencySession(payload),
      saveCompetencyAnswer: () => heartbeatCompetencySession(payload),
      submitCompetencyTest: () => submitCompetencyTest(payload),
      getCompetencySessions: () => ({ status: 'success', sessions: getRows(SHEETS.competencySessions) }),
      updateCompetencyDecision: () => updateCompetencyDecision(payload),
      getReTestAccess: () => getReTestAccess(),
      generateReTestAccess: () => generateReTestAccess(payload),
      deleteReTestAccess: () => deleteByKey(SHEETS.retestAccess, 'access_id', payload.access_id),
      retestLogin: () => retestLogin(payload),
      startReTestSession: () => startCompetencySession(payload, SHEETS.retestSessions),
      heartbeatReTestSession: () => heartbeatCompetencySession(payload, SHEETS.retestSessions),
      saveReTestAnswer: () => heartbeatCompetencySession(payload, SHEETS.retestSessions),
      submitReTest: () => submitCompetencyTest(payload, SHEETS.retestSessions, { updateParticipant: false }),
      getReTestSessions: () => ({ status: 'success', sessions: getRows(SHEETS.retestSessions) }),
      getFinalProjects: () => {
        const projects = getRows(SHEETS.projects);
        return { status: 'success', data: projects, projects };
      },
      submitFinalProject: () => submitFinalProject(payload),
      saveFinalProject: () => upsertByKey(SHEETS.projects, 'team_id', payload.team_id, payload),
      getCertificates: () => ({ status: 'success', data: getRows(SHEETS.certificates) }),
      generateCertificates: () => generateCertificates(),
      getAssets: () => ({ status: 'success', data: getRows(SHEETS.assets) }),
      saveAsset: () => upsertByKey(SHEETS.assets, 'asset_id', payload.asset_id, payload),
      getParticipantDashboardData: () => getParticipantDashboardData(payload)
    };
    const handler = routes[action];
    if (!handler) throw new Error('Unknown action: ' + action);
    return json(handler());
  } catch (error) {
    return json({ status: 'error', message: error.message });
  }
}

function doGet() {
  HERAI_REQUEST_SPREADSHEET = null;
  return json({ status: 'success', service: 'HerAI GAS Backend', version: HERAI_BACKEND_VERSION });
}

function authorizeGasAction(action, payload) {
  const participantActions = [
    'updateParticipantProfile',
    'uploadParticipantPhoto',
    'removeParticipantPhoto',
    'changeParticipantPassword',
    'saveParticipantProgress',
    'getParticipantProgress',
    'saveParticipantDiscussion',
    'getParticipantDiscussions',
    'saveParticipantExerciseDraft',
    'submitParticipantExercise',
    'getParticipantExerciseSubmissions',
    'recordParticipantActivity',
    'getParticipantDashboardData',
    'startCompetencySession',
    'heartbeatCompetencySession',
    'saveCompetencyAnswer',
    'submitCompetencyTest',
    'startReTestSession',
    'heartbeatReTestSession',
    'saveReTestAnswer',
    'submitReTest'
  ];
  if (participantActions.indexOf(action) >= 0) {
    const claims = requireParticipantToken(payload);
    const retestActions = ['startReTestSession', 'heartbeatReTestSession', 'saveReTestAnswer', 'submitReTest'];
    const normalActions = ['updateParticipantProfile', 'uploadParticipantPhoto', 'removeParticipantPhoto', 'changeParticipantPassword', 'saveParticipantProgress', 'getParticipantProgress', 'saveParticipantDiscussion', 'getParticipantDiscussions', 'saveParticipantExerciseDraft', 'submitParticipantExercise', 'getParticipantExerciseSubmissions', 'recordParticipantActivity', 'getParticipantDashboardData', 'startCompetencySession', 'heartbeatCompetencySession', 'saveCompetencyAnswer', 'submitCompetencyTest'];
    if (retestActions.indexOf(action) >= 0 && claims.scope !== 'retest') {
      throw new Error('Sesi Re-Test tidak valid. Silakan login ulang.');
    }
    if (normalActions.indexOf(action) >= 0 && claims.scope !== 'participant') {
      throw new Error('Sesi peserta tidak valid. Silakan login ulang.');
    }
    const requestedNik = String(payload.nik || '').replace(/\D/g, '');
    if (requestedNik && requestedNik !== String(claims.sub || '')) {
      throw new Error('Sesi tidak cocok dengan NIK yang diminta.');
    }
    payload.nik = String(claims.sub || '');
    payload.__auth = claims;
    return;
  }
  if (['getExerciseSubmissions', 'reviewExerciseSubmission'].indexOf(action) >= 0) {
    payload.__adminAuth = requireAdminToken(payload);
  }
}

function requireParticipantToken(payload) {
  const claims = verifyAuthToken(payload.participantToken || payload.authToken || '');
  if (!claims || claims.type !== 'participant') {
    throw new Error('Sesi peserta tidak valid atau sudah kedaluwarsa.');
  }
  if (claims.scope === 'participant') {
    const account = findParticipantAccount(claims.sub);
    if (!account || !account.account_id
      || !isParticipantPortalAccountAllowed(account)
      || !isParticipantAccountActive(account)) {
      throw new Error('Sesi peserta tidak valid atau akses sudah tidak aktif.');
    }
  }
  return claims;
}

function requireAdminToken(payload) {
  const claims = verifyAuthToken(payload.adminToken || payload.authToken || '');
  if (!claims || claims.type !== 'admin' || claims.scope !== 'admin') {
    throw new Error('Sesi admin tidak valid atau sudah kedaluwarsa. Silakan login ulang.');
  }
  const admin = getRows(SHEETS.admins).find(function(row) {
    return String(row.id_admin || row.adminId || '') === String(claims.sub || '');
  });
  const status = String(admin && admin.status || 'active').toLowerCase();
  if (!admin || ['inactive', 'disabled'].indexOf(status) >= 0) {
    throw new Error('Sesi admin tidak valid atau akses sudah tidak aktif.');
  }
  return Object.assign({}, claims, { admin: admin });
}

function issueAuthToken(type, subject, details, ttlSeconds) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const claims = Object.assign({
    type: type,
    sub: String(subject || ''),
    iat: nowSeconds,
    exp: nowSeconds + Number(ttlSeconds || AUTH_TOKEN_TTL_SECONDS[type] || 3600),
    nonce: Utilities.getUuid()
  }, details || {});
  const encoded = Utilities.base64EncodeWebSafe(JSON.stringify(claims), Utilities.Charset.UTF_8).replace(/=+$/g, '');
  const signature = bytesToHex(Utilities.computeHmacSha256Signature(encoded, getAuthTokenSecret()));
  return {
    token: encoded + '.' + signature,
    expires_at: new Date(claims.exp * 1000).toISOString()
  };
}

function verifyAuthToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 2) return null;
  const expected = bytesToHex(Utilities.computeHmacSha256Signature(parts[0], getAuthTokenSecret()));
  if (!safeStringEquals(expected, parts[1])) return null;
  try {
    const claims = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(parts[0])).getDataAsString());
    if (!claims.sub || Number(claims.exp || 0) <= Math.floor(Date.now() / 1000)) return null;
    return claims;
  } catch (error) {
    return null;
  }
}

function getAuthTokenSecret() {
  const properties = PropertiesService.getScriptProperties();
  let secret = properties.getProperty('AUTH_TOKEN_SECRET');
  if (secret) return secret;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    secret = properties.getProperty('AUTH_TOKEN_SECRET');
    if (!secret) {
      secret = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
      properties.setProperty('AUTH_TOKEN_SECRET', secret);
    }
    return secret;
  } finally {
    lock.releaseLock();
  }
}

var FOUNDATION_TRACKING_MODULE_IDS = [
  'ai-fundamentals',
  'python-untuk-ai',
  'reasoning',
  'konsep-ai-modern',
  'evaluation',
  'evolution'
];

var DEFAULT_RELEASED_TRACKING_MODULE_IDS = FOUNDATION_TRACKING_MODULE_IDS.slice();
var DEFAULT_DASHBOARD_MODULE_IDS = ['python-untuk-ai', 'reasoning', 'konsep-ai-modern', 'evaluation', 'evolution'];

function moduleFlag(value, fallback) {
  if (value === undefined || value === null || String(value).trim() === '') return Boolean(fallback);
  return isTruthy(value);
}

function getModulePhaseId(row) {
  var configured = String(row.phase_id || '').trim().toLowerCase();
  if (configured) return configured;
  return FOUNDATION_TRACKING_MODULE_IDS.indexOf(String(row.module_id || '')) >= 0 ? 'foundation' : 'specialization';
}

function isModuleTrackingEnabled(row) {
  var moduleId = String(row.module_id || '');
  return moduleFlag(row.tracking_enabled, DEFAULT_RELEASED_TRACKING_MODULE_IDS.indexOf(moduleId) >= 0);
}

function isModuleDashboardVisible(row) {
  var moduleId = String(row.module_id || '');
  return moduleFlag(row.dashboard_visible, DEFAULT_DASHBOARD_MODULE_IDS.indexOf(moduleId) >= 0);
}

function defaultIntroTrackingModule() {
  return {
    module_id: 'ai-fundamentals',
    title: 'Pengantar AI',
    subtitle: 'Fondasi cara kerja, risiko, dan penggunaan AI',
    progress: 0,
    icon: 'fas fa-book-open',
    tone: 'pink',
    href: '#/participant-ai-intro',
    total_chapters: 5,
    quiz_total: 10,
    phase_id: 'foundation',
    tracking_enabled: 'true',
    dashboard_visible: 'false',
    is_active: 'true',
    sort_order: 0
  };
}

function summarizeTrackedModules(moduleStates) {
  var progressValues = (moduleStates || []).map(function(module) {
    return Math.max(0, Math.min(100, Number(module.progress || 0)));
  });
  var completed = progressValues.filter(function(progress) { return progress >= 100; }).length;
  var inProgress = progressValues.filter(function(progress) { return progress > 0 && progress < 100; }).length;
  return {
    total: progressValues.length,
    completed: completed,
    in_progress: inProgress,
    not_started: progressValues.length - completed - inProgress,
    progress: progressValues.length
      ? Math.round(progressValues.reduce(function(total, progress) { return total + progress; }, 0) / progressValues.length)
      : 0
  };
}

function journeyPhaseId(row) {
  var configured = String(row.phase_id || '').trim().toLowerCase();
  if (configured) return configured;
  var title = String(row.title || '').toLowerCase();
  if (title.indexOf('foundation') >= 0) return 'foundation';
  if (title.indexOf('specialization') >= 0) return 'specialization';
  if (title.indexOf('project') >= 0) return 'project';
  if (title.indexOf('graduation') >= 0) return 'graduation';
  return title.replace(/[^a-z0-9]+/g, '-') || 'phase';
}

function computeParticipantJourney(journeyRows, moduleStates) {
  return (journeyRows || []).map(function(row) {
    var phaseId = journeyPhaseId(row);
    var inferredSource = phaseId === 'foundation' || phaseId === 'specialization' ? 'modules' : 'locked';
    var sourceType = String(row.source_type || inferredSource).trim().toLowerCase();
    var phaseModules = (moduleStates || []).filter(function(module) {
      return module.phase_id === phaseId;
    });
    var available = sourceType === 'modules' && phaseModules.length > 0;
    var summary = summarizeTrackedModules(phaseModules);
    var status = 'locked';
    if (available) {
      status = summary.progress >= 100 ? 'completed' : (summary.progress > 0 ? 'in_progress' : 'not_started');
    }
    return {
      phase_id: phaseId,
      title: row.title || '',
      subtitle: row.subtitle || '',
      progress: available ? summary.progress : null,
      status: status,
      status_label: available ? summary.progress + '%' : (row.locked_label || 'Belum Dibuka'),
      module_count: phaseModules.length,
      icon: row.icon || 'fas fa-book-open',
      accent: row.accent || '#f63392'
    };
  });
}

function getParticipantDashboardData(payload) {
  const requesterNik = String(payload.nik || '').replace(/\D/g, '');
  const activeRows = sheetName => getRows(sheetName)
    .filter(row => row.is_active === '' || isTruthy(row.is_active))
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));

  var allModuleRows = getRows(SHEETS.participantDashboardModules).slice();
  if (!allModuleRows.some(function(row) { return String(row.module_id || '') === 'ai-fundamentals'; })) {
    allModuleRows.push(defaultIntroTrackingModule());
  }
  const moduleRows = allModuleRows
    .filter(function(row) {
      return moduleFlag(row.is_active, true) && isModuleTrackingEnabled(row);
    })
    .sort(function(a, b) { return Number(a.sort_order || 0) - Number(b.sort_order || 0); });

  const allProgressRows = getRows(SHEETS.participantProgress);
  const progressRows = requesterNik ? allProgressRows.filter(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === requesterNik;
  }) : [];

  var completedByModule = {};
  progressRows.forEach(function(row) {
    var key = String(row.module_id || '');
    var chapterId = String(row.chapter_id || '');
    if (row.status === 'completed' && /^\d+$/.test(chapterId)) {
      if (!completedByModule[key]) completedByModule[key] = {};
      completedByModule[key][chapterId] = true;
    }
  });

  // Quiz scores — take the highest score per module (chapter_id === 'quiz')
  var quizScoreByModule = {};
  progressRows.forEach(function(row) {
    if (row.chapter_id === 'quiz' && row.score !== undefined && row.score !== null && row.score !== '') {
      var key = String(row.module_id || '');
      var score = Number(row.score);
      if (!isNaN(score)) {
        quizScoreByModule[key] = Math.max(quizScoreByModule[key] || 0, score);
      }
    }
  });

  const trackingModules = moduleRows.map(function(row) {
    var totalChapters = Number(row.total_chapters || 0);
    var computedProgress = row.progress !== undefined ? Number(row.progress) : 0;
    if (totalChapters > 0) {
      var completed = Object.keys(completedByModule[row.module_id] || {}).filter(function(chapterId) {
        var chapterNumber = Number(chapterId);
        return chapterNumber >= 1 && chapterNumber <= totalChapters;
      }).length;
      computedProgress = Math.min(100, Math.round((completed / totalChapters) * 100));
    }
    var quizScore = quizScoreByModule[row.module_id];
    var quizTotal = Number(row.quiz_total || 20);
    var normalizedScore = null;
    if (quizScore !== undefined && quizTotal > 0) {
      normalizedScore = Math.round((quizScore / quizTotal) * 100);
    }
    return {
      module_id: row.module_id || '',
      title: row.title || '',
      subtitle: row.subtitle || '',
      progress: computedProgress,
      quiz_score: normalizedScore,
      icon: row.icon || 'fas fa-book-open',
      tone: row.tone || 'pink',
      href: row.href || '#/participant-modules',
      total_chapters: totalChapters,
      quiz_total: quizTotal,
      phase_id: getModulePhaseId(row),
      dashboard_visible: isModuleDashboardVisible(row)
    };
  });
  const modules = trackingModules.filter(function(module) { return module.dashboard_visible; });
  const learningSummary = summarizeTrackedModules(trackingModules.filter(function(module) {
    return module.phase_id === 'foundation';
  }));

  const discussionTrails = activeRows(SHEETS.participantDashboardDiscussionTrails).map(row => ({
    actor: row.actor || 'Panitia',
    action: row.action || 'memperbarui diskusi',
    topic: row.topic || 'Diskusi',
    time: row.time_label || formatRelativeTime(row.created_at),
    tone: row.tone || ''
  }));

  const tracks = activeRows(SHEETS.participantDashboardTracks).map(row => ({
    title: row.title || '',
    subtitle: row.subtitle || '',
    icon: row.icon || 'fas fa-layer-group'
  }));

  const journey = computeParticipantJourney(activeRows(SHEETS.participantDashboardJourney), trackingModules);

  const events = activeRows(SHEETS.participantDashboardEvents).map(row => ({
    day: row.day || '',
    month: row.month || '',
    title: row.title || '',
    time: row.time || '',
    url: row.url || '#/participant-events'
  }));

  // Live-computed leaderboard from participant progress
  const targetEmailSet = getTargetParticipantPortalEmailSet();
  const activeAccounts = getRows(SHEETS.participantAccounts).filter(function(account) {
    return account && account.account_id
      && isParticipantPortalAccountAllowed(account, targetEmailSet)
      && isParticipantAccountActive(account);
  });
  const leaderboard = computeLiveLeaderboard(requesterNik, {
    activeAccounts: activeAccounts,
    progressRows: allProgressRows
  });

  return {
    status: 'success',
    data: { modules, trackingModules, learningSummary, discussionTrails, tracks, journey, events, leaderboard }
  };
}

/**
 * Compute live leaderboard from participant_progress data.
 * Formula: points = sum(quiz_scores) + (chapters_completed × 15) + (practices_completed × 5)
 * Falls back to seed data if no progress exists yet.
 */
function computeLiveLeaderboard(requesterNik, context) {
  var source = context || {};
  var activeAccounts = Array.isArray(source.activeAccounts)
    ? source.activeAccounts
    : getActiveParticipantPortalAccounts();
  var activeNikSet = activeAccounts.reduce(function(result, account) {
    const nik = String(account.nik || account.username || '').replace(/\D/g, '');
    if (nik) result[nik] = true;
    return result;
  }, {});
  var sourceProgressRows = Array.isArray(source.progressRows)
    ? source.progressRows
    : getRows(SHEETS.participantProgress);
  var progressRows = sourceProgressRows.filter(function(row) {
    const nik = String(row.nik || '').replace(/\D/g, '');
    return Boolean(nik && activeNikSet[nik]);
  });
  
  if (!progressRows || progressRows.length === 0) {
    return getSeedLeaderboard(requesterNik, activeAccounts);
  }
  
  // Aggregate by NIK: { chapters, totalQuizScore, practices }
  const agg = {};
  progressRows.forEach(function(row) {
    const nik = String(row.nik || '').replace(/\D/g, '');
    if (!nik) return;
    
    if (!agg[nik]) {
      agg[nik] = { chapters: 0, totalQuizScore: 0, practices: 0 };
    }
    
    const chId = String(row.chapter_id || '');
    if (chId === 'quiz') {
      agg[nik].totalQuizScore += parseInt(row.score) || 0;
    } else if (chId === 'practice') {
      agg[nik].practices += 1;
    } else if (!isNaN(parseInt(chId))) {
      agg[nik].chapters += 1;
    }
  });
  
  // Compute points + build ranking array
  const rankings = Object.keys(agg).map(function(nik) {
    const a = agg[nik];
    return {
      nik: nik,
      points: a.totalQuizScore + (a.chapters * 15) + (a.practices * 5),
      chapters: a.chapters,
      quizScore: a.totalQuizScore,
      practices: a.practices
    };
  });
  
  // Sort by points descending
  rankings.sort(function(a, b) { return b.points - a.points; });
  
  // Take top 10
  const top10 = rankings.slice(0, 10);
  
  // Look up names from participant_accounts
  const nameMap = {};
  activeAccounts.forEach(function(acc) {
    const nik = String(acc.nik || '').replace(/\D/g, '');
    if (nik) nameMap[nik] = acc.nama_lengkap || 'Peserta HerAI';
  });
  
  // Build final leaderboard with masking
  return top10.map(function(entry, index) {
    const current = Boolean(requesterNik && entry.nik === requesterNik);
    return {
      rank: index + 1,
      nik: current ? entry.nik : '',
      name: current ? (nameMap[entry.nik] || 'Peserta HerAI') : '*********',
      points: entry.points,
      current: current
    };
  });
}

/**
 * Fallback: seed leaderboard when no progress data exists.
 */
function getSeedLeaderboard(requesterNik, activeAccounts) {
  var rows = getRows(SHEETS.participantDashboardLeaderboard);
  var activeNikSet = (Array.isArray(activeAccounts) ? activeAccounts : getActiveParticipantPortalAccounts())
    .reduce(function(result, account) {
      const nik = String(account.nik || account.username || '').replace(/\D/g, '');
      if (nik) result[nik] = true;
      return result;
    }, {});
  if (rows && rows.length > 0) {
    return rows.filter(function(row) {
      const nik = String(row.nik || '').replace(/\D/g, '');
      return !nik || activeNikSet[nik];
    }).map(function(row) {
      const nik = String(row.nik || '').replace(/\D/g, '');
      const current = Boolean(requesterNik && nik === requesterNik);
      return {
        rank: Number(row.rank || 0),
        nik: current ? nik : '',
        name: current ? (row.name || 'Peserta HerAI') : '*********',
        points: Number(row.points || 0),
        current: current
      };
    });
  }
  return [];
}

function formatRelativeTime(value) {
  if (!value) return 'Baru saja';
  try {
    const date = value instanceof Date ? value : new Date(value);
    const diffMs = new Date().getTime() - date.getTime();
    const minutes = Math.max(1, Math.floor(diffMs / 60000));
    if (minutes < 60) return minutes + ' menit yang lalu';
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' jam yang lalu';
    return Math.floor(hours / 24) + ' hari yang lalu';
  } catch (error) {
    return String(value);
  }
}

function setupDatabase() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Object.keys(SCHEMA).forEach(name => {
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    ensureSchemaHeaders(sheet, SCHEMA[name]);
    sheet.setFrozenRows(1);
  });
  seedDefaults();
}

function setupParticipantBackend() {
  ensureParticipantBackendSchema();
  return logAndReturnParticipantProvisionResult(provisionParticipantAccounts({
    adminId: 'setupParticipantBackend',
    forceReset: false,
    limit: 40
  }));
}

function ensureParticipantBackendSchema() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  [
    SHEETS.participants,
    SHEETS.participantAccounts,
    SHEETS.participantActivity,
    SHEETS.participantProgress,
    SHEETS.participantDiscussions,
    SHEETS.participantExerciseSubmissions
  ].forEach(function(name) {
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    ensureSchemaHeaders(sheet, SCHEMA[name]);
    sheet.setFrozenRows(1);
  });
  SpreadsheetApp.flush();
  return { status: 'success', message: 'Participant backend schema ready.' };
}

/**
 * Jalankan sekali dari Apps Script editor setelah deploy versi auth terbaru.
 * Fungsi ini TIDAK membuat atau mengganti password. Password existing di
 * ParticipantAccounts hanya di-hash ulang ke pepper stabil dan disinkronkan
 * ke baris peserta yang sudah ditautkan.
 */
function migrateExistingParticipantAccountCredentials() {
  ensureParticipantBackendSchema();
  getPasswordPepper();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const accountSheet = getSheet(SHEETS.participantAccounts);
    const participantSheet = getSheet(SHEETS.participants);
    const accountValues = accountSheet.getDataRange().getValues();
    const participantValues = participantSheet.getDataRange().getValues();
    if (accountValues.length <= 1) {
      return { status: 'success', migrated: 0, activated: 0, deactivated: 0, skipped: 0, total: 0 };
    }

    const accountHeaders = accountValues[0];
    const participantHeaders = participantValues[0];
    const accountIndex = indexHeaders(accountHeaders);
    const participantIndex = indexHeaders(participantHeaders);
    const participantByRowId = {};
    const participantByNik = {};
    participantValues.slice(1).forEach(function(row, index) {
      const sheetRowIndex = index + 1;
      const rowId = String(row[participantIndex.rowId] || '');
      const nik = String(row[participantIndex.nik] || '').replace(/\D/g, '');
      if (rowId) participantByRowId[rowId] = sheetRowIndex;
      if (nik && participantByNik[nik] === undefined) participantByNik[nik] = sheetRowIndex;
    });

    const passwordHashColumn = accountValues.slice(1).map(function(row) {
      return [row[accountIndex.password_hash] || ''];
    });
    const accessStatusColumn = accountValues.slice(1).map(function(row) {
      return [row[accountIndex.access_status] || ''];
    });
    const accountUpdatedColumn = accountValues.slice(1).map(function(row) {
      return [row[accountIndex.updated_at] || ''];
    });
    const participantPasswordColumn = participantValues.slice(1).map(function(row) {
      return [row[participantIndex.participant_password] || ''];
    });
    const participantUpdatedColumn = participantValues.slice(1).map(function(row) {
      return [row[participantIndex.profile_updated_at] || ''];
    });

    let migrated = 0;
    let activated = 0;
    let deactivated = 0;
    let skipped = 0;
    const now = new Date().toISOString();
    accountValues.slice(1).forEach(function(row, index) {
      const nik = String(row[accountIndex.nik] || row[accountIndex.username] || '').replace(/\D/g, '');
      const linkedRowId = String(row[accountIndex.participant_rowId] || '');
      const participantRowIndex = participantByRowId[linkedRowId] !== undefined
        ? participantByRowId[linkedRowId]
        : participantByNik[nik];
      if (participantRowIndex === undefined) {
        skipped += 1;
        return;
      }
      const currentAccessStatus = String(row[accountIndex.access_status] || '').trim().toLowerCase();
      const accountType = accountIndex.account_type === undefined
        ? PARTICIPANT_ACCOUNT_TYPE
        : row[accountIndex.account_type];
      const expectedAccessStatus = isQaParticipantAccount({ account_type: accountType })
        ? (currentAccessStatus || 'active')
        : (isTargetParticipantForPortal({ email: row[accountIndex.email] }) ? 'active' : 'inactive');
      if (String(row[accountIndex.access_status] || '').trim().toLowerCase() !== expectedAccessStatus) {
        accessStatusColumn[index][0] = expectedAccessStatus;
        if (expectedAccessStatus === 'active') activated += 1;
        else deactivated += 1;
      }
      const password = String(row[accountIndex.generated_password] || '');
      if (password) {
        const stableHash = hashPasswordValue(password);
        passwordHashColumn[index][0] = stableHash;
        participantPasswordColumn[participantRowIndex - 1][0] = stableHash;
        participantUpdatedColumn[participantRowIndex - 1][0] = now;
        migrated += 1;
      }
      accountUpdatedColumn[index][0] = now;
    });

    setColumnValues(accountSheet, accountIndex.password_hash, passwordHashColumn);
    setColumnValues(accountSheet, accountIndex.access_status, accessStatusColumn);
    setColumnValues(accountSheet, accountIndex.updated_at, accountUpdatedColumn);
    if (participantValues.length > 1) {
      setColumnValues(participantSheet, participantIndex.participant_password, participantPasswordColumn);
      setColumnValues(participantSheet, participantIndex.profile_updated_at, participantUpdatedColumn);
    }
    SpreadsheetApp.flush();
    const result = {
      status: 'success',
      migrated: migrated,
      activated: activated,
      deactivated: deactivated,
      skipped: skipped,
      total: accountValues.length - 1
    };
    Logger.log(JSON.stringify(result));
    return result;
  } finally {
    lock.releaseLock();
  }
}

function indexHeaders(headers) {
  return headers.reduce(function(index, header, position) {
    index[String(header || '')] = position;
    return index;
  }, {});
}

function setColumnValues(sheet, zeroBasedColumnIndex, values) {
  if (zeroBasedColumnIndex === undefined || zeroBasedColumnIndex < 0 || !values.length) return;
  sheet.getRange(2, zeroBasedColumnIndex + 1, values.length, 1).setValues(values);
}

function generateParticipantAccountsBatch1() {
  ensureParticipantBackendSchema();
  return logAndReturnParticipantProvisionResult(provisionParticipantAccounts({ adminId: 'generateParticipantAccountsBatch1', forceReset: false, offset: 0, limit: 40 }));
}

function generateParticipantAccountsBatch2() {
  ensureParticipantBackendSchema();
  return logAndReturnParticipantProvisionResult(provisionParticipantAccounts({ adminId: 'generateParticipantAccountsBatch2', forceReset: false, offset: 40, limit: 40 }));
}

function generateParticipantAccountsBatch3() {
  ensureParticipantBackendSchema();
  return logAndReturnParticipantProvisionResult(provisionParticipantAccounts({ adminId: 'generateParticipantAccountsBatch3', forceReset: false, offset: 80, limit: 40 }));
}

function generateSelectedParticipantAccountsBatch1() {
  return generateParticipantAccountsBatch1();
}

function generateSelectedParticipantAccountsBatch2() {
  return generateParticipantAccountsBatch2();
}

function generateSelectedParticipantAccountsBatch3() {
  return generateParticipantAccountsBatch3();
}

function logAndReturnParticipantProvisionResult(result) {
  Logger.log(JSON.stringify(result, null, 2));
  return result;
}

function setupReTestDatabase() {
  return withSpreadsheetRetry(function() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const accessSheet = ensureReTestSheet(ss, SHEETS.retestAccess);
    ensureReTestSheet(ss, SHEETS.retestSessions);
    ensureReTestDemoAccessInSheet(accessSheet);
    SpreadsheetApp.flush();
    return { status: 'success', message: 'Database Re-Test siap digunakan.' };
  });
}

function ensureReTestSheet(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  ensureSchemaHeaders(sheet, SCHEMA[sheetName]);
  sheet.setFrozenRows(1);
  return sheet;
}

function ensureReTestDemoAccessInSheet(sheet) {
  const headers = getHeaders(sheet);
  const accessIdIndex = headers.indexOf('access_id');
  const values = sheet.getLastRow() > 1 ? sheet.getDataRange().getValues() : [];
  const accessId = 'rt_demo_3276010101010001';
  const exists = values.slice(1).some(row => String(row[accessIdIndex]) === accessId);
  if (exists) return;
  const now = new Date().toISOString();
  const demo = {
    access_id: accessId,
    nik: '3276010101010001',
    nama_lengkap: 'Alya Putri Demo',
    access_code: 'RT-DEMO-2026',
    status: 'active',
    notes: 'Akun testing Re-Test',
    created_at: now,
    updated_at: now,
    used_at: ''
  };
  sheet.appendRow(headers.map(header => demo[header] !== undefined ? demo[header] : ''));
}

function withSpreadsheetRetry(callback) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      return callback();
    } catch (error) {
      lastError = error;
      if (attempt < 4) Utilities.sleep(attempt * 1500);
    }
  }
  throw lastError;
}

function seedDefaults() {
  upsertByKey(SHEETS.admins, 'id_admin', 'super-admin', {
    id_admin: 'super-admin',
    password: hashPasswordValue('admin123'),
    nama_admin: 'Super Admin',
    peran_admin: 'superadmin',
    permissions: 'all',
    status: 'active',
    created_at: new Date().toISOString()
  });
  ['draft', 'registration_open', 'registration_closed', 'selection_1', 'ai_prescreening', 'review_scoring', 'announcement_stage_1', 'competency_test', 'announcement_stage_2', 'bootcamp_active', 'final_project', 'announcement_final', 'graduation', 'alumni'].forEach(stage => {
    upsertByKey(SHEETS.stages, 'stage_id', stage, { stage_id: stage, stage_name: stage, status: 'planned' });
  });
  seedCompetencyQuestions();
  ensureReTestDemoAccess();
  seedAllDashboardData();
}

// ── Participant Dashboard Seed Functions ─────────────────
// Run once from Apps Script editor to populate dashboard sheets.
// These are idempotent — re-running only updates matching module_id/keys.

function seedAllDashboardData() {
  seedDashboardModules();
  seedDashboardJourney();
  seedDashboardEvents();
  seedDashboardTracks();
  seedDashboardDiscussions();
  seedDashboardLeaderboard();
}

function seedDashboardModules() {
  var modules = [
    // Foundation Core AI (8 modules)
    { module_id: 'deep-learning', title: 'Deep Learning', subtitle: 'Neural networks, backpropagation, PyTorch', progress: 0, icon: 'fas fa-brain', tone: 'pink', href: '#/participant-ai-lab-deep-learning', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 1 },
    { module_id: 'reinforcement-learning', title: 'Reinforcement Learning', subtitle: 'Agent, environment, reward, policy optimization', progress: 0, icon: 'fas fa-robot', tone: 'purple', href: '#/participant-ai-lab-reinforcement-learning', total_chapters: 13, quiz_total: 20, is_active: 'true', sort_order: 2 },
    { module_id: 'python-untuk-ai', title: 'Python untuk AI', subtitle: 'NumPy, Pandas, data pipeline, workflow AI', progress: 0, icon: 'fab fa-python', tone: 'blue', href: '#/participant-ai-python', total_chapters: 8, quiz_total: 20, is_active: 'true', sort_order: 3 },
    { module_id: 'reasoning', title: 'Reasoning AI', subtitle: 'Logika, inferensi, dan penalaran mesin', progress: 0, icon: 'fas fa-brain', tone: 'pink', href: '#/participant-ai-reasoning', total_chapters: 6, quiz_total: 26, is_active: 'true', sort_order: 4 },
    { module_id: 'konsep-ai-modern', title: 'Konsep AI Modern', subtitle: 'Foundation models, transfer learning, RLHF', progress: 0, icon: 'fas fa-microchip', tone: 'purple', href: '#/participant-ai-modern', total_chapters: 4, quiz_total: 20, is_active: 'true', sort_order: 5 },
    { module_id: 'evolution', title: 'Evolution of AI', subtitle: 'Sejarah, milestone, dan arah perkembangan AI', progress: 0, icon: 'fas fa-timeline', tone: 'orange', href: '#/participant-ai-evolution', total_chapters: 7, quiz_total: 20, is_active: 'true', sort_order: 6 },
    { module_id: 'evaluation', title: 'Evaluation AI', subtitle: 'Metrik, benchmark, dan validasi model', progress: 0, icon: 'fas fa-chart-simple', tone: 'green', href: '#/participant-ai-evaluation', total_chapters: 6, quiz_total: 20, is_active: 'true', sort_order: 7 },
    { module_id: 'machine-learning', title: 'Machine Learning', subtitle: 'Supervised, unsupervised, evaluation pipeline', progress: 0, icon: 'fas fa-diagram-project', tone: 'orange', href: '#/participant-ai-lab-machine-learning', total_chapters: 8, quiz_total: 20, is_active: 'true', sort_order: 8 },

    // Data Engineering Domains (8 modules)
    { module_id: 'computer-vision', title: 'Computer Vision', subtitle: 'Image processing, CNN, object detection', progress: 0, icon: 'fas fa-eye', tone: 'blue', href: '#/participant-ai-lab-cv', total_chapters: 11, quiz_total: 20, is_active: 'true', sort_order: 9 },
    { module_id: 'infrastructure', title: 'Infrastructure for AI', subtitle: 'Cloud, GPU, MLOps, scalable serving', progress: 0, icon: 'fas fa-server', tone: 'purple', href: '#/participant-ai-lab-infrastructure', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 10 },
    { module_id: 'data-engineering', title: 'Data Engineering', subtitle: 'ETL, pipeline, data warehouse, quality', progress: 0, icon: 'fas fa-database', tone: 'orange', href: '#/participant-ai-lab-data-engineering', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 11 },
    { module_id: 'data-science', title: 'Data Science', subtitle: 'EDA, hypothesis testing, experiment design', progress: 0, icon: 'fas fa-chart-pie', tone: 'green', href: '#/participant-ai-lab-data-science', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 12 },
    { module_id: 'bioinformatics', title: 'Bioinformatics & AI', subtitle: 'Genomics, protein analysis, drug discovery', progress: 0, icon: 'fas fa-dna', tone: 'pink', href: '#/participant-ai-lab-bioinformatics', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 13 },
    { module_id: 'deployment', title: 'AI Deployment', subtitle: 'Docker, API, CI/CD, model serving', progress: 0, icon: 'fas fa-rocket', tone: 'purple', href: '#/participant-ai-lab-deployment', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 14 },
    { module_id: 'front-end', title: 'Front-end Development', subtitle: 'AI UX, React, interactive visualization', progress: 0, icon: 'fas fa-laptop-code', tone: 'blue', href: '#/participant-ai-lab-front-end', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 15 },
    { module_id: 'back-end', title: 'Back-end Development', subtitle: 'API design, database, authentication', progress: 0, icon: 'fas fa-code', tone: 'orange', href: '#/participant-ai-lab-back-end', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 16 },

    // Generative & Multimodal AI (4 modules)
    { module_id: 'large-language-model', title: 'Large Language Model', subtitle: 'Transformer, GPT, BERT, fine-tuning', progress: 0, icon: 'fas fa-language', tone: 'purple', href: '#/participant-ai-lab-large-language-model', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 17 },
    { module_id: 'agentic-ai', title: 'Agentic AI', subtitle: 'Tool use, planning, multi-agent systems', progress: 0, icon: 'fas fa-robot', tone: 'pink', href: '#/participant-ai-lab-agentic-ai', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 18 },
    { module_id: 'vlm', title: 'Vision Language Model', subtitle: 'CLIP, multimodal understanding, generation', progress: 0, icon: 'fas fa-eye', tone: 'blue', href: '#/participant-ai-lab-vlm', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 19 },
    { module_id: 'multimodal-llm', title: 'Multimodal LLM', subtitle: 'Cross-modal learning, audio-visual-text', progress: 0, icon: 'fas fa-layer-group', tone: 'purple', href: '#/participant-ai-lab-multimodal-llm', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 20 },

    // Business & Industry Applications (7 modules)
    { module_id: 'healthcare', title: 'AI for Healthcare', subtitle: 'Medical imaging, diagnosis, clinical NLP', progress: 0, icon: 'fas fa-heart-pulse', tone: 'pink', href: '#/participant-ai-lab-healthcare', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 21 },
    { module_id: 'geospatial', title: 'AI for Geospatial', subtitle: 'Remote sensing, spatial analysis, GIS', progress: 0, icon: 'fas fa-globe-asia', tone: 'green', href: '#/participant-ai-lab-geospatial', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 22 },
    { module_id: 'manufacturing', title: 'AI for Manufacturing', subtitle: 'Predictive maintenance, quality control', progress: 0, icon: 'fas fa-industry', tone: 'orange', href: '#/participant-ai-lab-manufacturing', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 23 },
    { module_id: 'culture', title: 'AI for Culture', subtitle: 'Digital humanities, heritage preservation', progress: 0, icon: 'fas fa-landmark', tone: 'purple', href: '#/participant-ai-lab-culture', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 24 },
    { module_id: 'business-insight', title: 'Business Insight', subtitle: 'Data-driven decision, KPI, strategy', progress: 0, icon: 'fas fa-chart-line', tone: 'blue', href: '#/participant-ai-lab-business-insight', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 25 },
    { module_id: 'people-business-mgt', title: 'People & Business Mgmt', subtitle: 'AI product management, stakeholder alignment', progress: 0, icon: 'fas fa-users-gear', tone: 'pink', href: '#/participant-ai-lab-people-business-mgt', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 26 },
    { module_id: 'ui-ux', title: 'UI/UX Design Thinking', subtitle: 'Human-centered AI, prototyping, usability', progress: 0, icon: 'fas fa-palette', tone: 'purple', href: '#/participant-ai-lab-ui-ux', total_chapters: 15, quiz_total: 20, is_active: 'true', sort_order: 27 },
    { module_id: 'math-for-ai', title: 'Math for AI', subtitle: 'Vektor, matriks, statistik, dan kalkulus untuk AI', progress: 0, icon: 'fas fa-calculator', tone: 'pink', href: '#/participant-ai-lab-math-for-ai', total_chapters: 7, quiz_total: 100, is_active: 'true', sort_order: 28 }
  ];

  // Release controls are deliberately separate from route availability. A module
  // only contributes to participant progress after tracking_enabled is turned on.
  modules.unshift(defaultIntroTrackingModule());
  modules = modules.map(function(module) {
    var moduleId = String(module.module_id || '');
    var released = DEFAULT_RELEASED_TRACKING_MODULE_IDS.indexOf(moduleId) >= 0;
    var dashboardVisible = DEFAULT_DASHBOARD_MODULE_IDS.indexOf(moduleId) >= 0;
    return Object.assign({}, module, {
      phase_id: FOUNDATION_TRACKING_MODULE_IDS.indexOf(moduleId) >= 0 ? 'foundation' : 'specialization',
      is_active: released ? 'true' : 'false',
      tracking_enabled: released ? 'true' : 'false',
      dashboard_visible: dashboardVisible ? 'true' : 'false'
    });
  });

  var sheet = getSheet(SHEETS.participantDashboardModules);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantDashboardModules]);
  modules.forEach(function(m) {
    upsertByKey(SHEETS.participantDashboardModules, 'module_id', m.module_id, m);
  });
}

function seedDashboardJourney() {
  var phases = [
    { phase_id: 'foundation', title: 'Foundation Phase', subtitle: 'Pemahaman dasar AI & Python', progress: 0, icon: 'fas fa-book-open', accent: '#f63392', source_type: 'modules', locked_label: 'Belum Dibuka', is_active: 'true', sort_order: 1 },
    { phase_id: 'specialization', title: 'Specialization', subtitle: 'Pilih dan dalami track AI pilihan', progress: 0, icon: 'fas fa-code', accent: '#8b5cf6', source_type: 'modules', locked_label: 'Belum Dibuka', is_active: 'true', sort_order: 2 },
    { phase_id: 'project', title: 'Project Building', subtitle: 'Bangun proyek portofolio nyata', progress: 0, icon: 'fas fa-briefcase', accent: '#f8b84e', source_type: 'locked', locked_label: 'Belum Dibuka', is_active: 'true', sort_order: 3 },
    { phase_id: 'graduation', title: 'Graduation', subtitle: 'Persiapan karier dan sertifikasi', progress: 0, icon: 'fas fa-graduation-cap', accent: '#45c598', source_type: 'locked', locked_label: 'Belum Dibuka', is_active: 'true', sort_order: 4 }
  ];

  var sheet = getSheet(SHEETS.participantDashboardJourney);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantDashboardJourney]);
  phases.forEach(function(p) {
    upsertByKey(SHEETS.participantDashboardJourney, 'title', p.title, p);
  });
}

function seedDashboardEvents() {
  var now = new Date();
  var events = [
    { day: String(now.getDate() + 3), month: monthAbbr(now), title: 'Live Session: Build RAG Chatbot', time: '10.00 - 12.00 WIB', url: '#/participant-events', quiz_total: 20, is_active: 'true', sort_order: 1 },
    { day: String(now.getDate() + 7), month: monthAbbr(now), title: 'Mentor Clinic: Career in AI', time: '19.00 - 20.30 WIB', url: '#/participant-events', quiz_total: 20, is_active: 'true', sort_order: 2 },
    { day: String(now.getDate() + 10), month: monthAbbr(now), title: 'Workshop: Data Visualization', time: '13.00 - 15.00 WIB', url: '#/participant-events', quiz_total: 20, is_active: 'true', sort_order: 3 },
    { day: String(now.getDate() + 14), month: monthAbbr(nextMonth(now)), title: 'Guest Lecture: Ethics in AI', time: '14.00 - 16.00 WIB', url: '#/participant-events', quiz_total: 20, is_active: 'true', sort_order: 4 },
    { day: String(now.getDate() + 18), month: monthAbbr(nextMonth(now)), title: 'Hackathon Kick-off', time: '09.00 - 17.00 WIB', url: '#/participant-events', quiz_total: 20, is_active: 'true', sort_order: 5 }
  ];

  var sheet = getSheet(SHEETS.participantDashboardEvents);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantDashboardEvents]);
  events.forEach(function(e) {
    upsertByKey(SHEETS.participantDashboardEvents, 'title', e.title, e);
  });
}

function seedDashboardTracks() {
  var tracks = [
    { title: 'Computer Vision', subtitle: 'Image processing, object detection, CNN, GAN', icon: 'fas fa-eye', quiz_total: 20, is_active: 'true', sort_order: 1 },
    { title: 'Speech & Audio', subtitle: 'ASR, TTS, Whisper, audio classification', icon: 'fas fa-microphone-lines', quiz_total: 20, is_active: 'true', sort_order: 2 },
    { title: 'NLP & LLM', subtitle: 'Transformer, RAG, fine-tuning, agents', icon: 'fas fa-message', quiz_total: 20, is_active: 'true', sort_order: 3 },
    { title: 'MLOps & Infrastructure', subtitle: 'Cloud deployment, CI/CD, model monitoring', icon: 'fas fa-house-laptop', quiz_total: 20, is_active: 'true', sort_order: 4 },
    { title: 'Multimodal AI', subtitle: 'VLM, cross-modal learning, generation', icon: 'fas fa-layer-group', quiz_total: 20, is_active: 'true', sort_order: 5 },
    { title: 'Bioinformatics', subtitle: 'Genomics, protein folding, drug discovery', icon: 'fas fa-dna', quiz_total: 20, is_active: 'true', sort_order: 6 }
  ];

  var sheet = getSheet(SHEETS.participantDashboardTracks);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantDashboardTracks]);
  tracks.forEach(function(t) {
    upsertByKey(SHEETS.participantDashboardTracks, 'title', t.title, t);
  });
}

function seedDashboardDiscussions() {
  var discussions = [
    { actor: 'Mentor Rani', action: 'membalas diskusi', topic: 'Pengantar AI', time_label: '2 jam yang lalu', tone: '', is_active: 'true', created_at: new Date().toISOString() },
    { actor: 'Peserta HerAI', action: 'menulis pertanyaan', topic: 'Reasoning & Logic', time_label: '3 jam yang lalu', tone: 'blue', is_active: 'true', created_at: new Date().toISOString() },
    { actor: 'Panitia', action: 'menandai referensi baru', topic: 'Evaluation Metrics', time_label: '5 jam yang lalu', tone: 'green', is_active: 'true', created_at: new Date().toISOString() },
    { actor: 'Mentor Budi', action: 'memulai topik', topic: 'Project Proposal', time_label: '1 hari yang lalu', tone: 'purple', is_active: 'true', created_at: new Date().toISOString() }
  ];

  var sheet = getSheet(SHEETS.participantDashboardDiscussionTrails);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantDashboardDiscussionTrails]);
  discussions.forEach(function(d) {
    upsertByKey(SHEETS.participantDashboardDiscussionTrails, 'topic', d.topic, d);
  });
}

function seedDashboardLeaderboard() {
  var accounts = getActiveParticipantPortalAccounts();
  var leaderboard = [];

  if (accounts.length > 0) {
    accounts.slice(0, 10).forEach(function(acc, index) {
      leaderboard.push({
        rank: index + 1,
        nik: String(acc.nik || ''),
        name: acc.nama_lengkap || 'Peserta HerAI',
        points: Math.max(100, 2500 - index * 180 - Math.floor(Math.random() * 100)),
        is_active: 'true'
      });
    });
  } else {
    for (var i = 1; i <= 10; i++) {
      leaderboard.push({ rank: i, nik: '', name: 'Peserta HerAI ' + i, points: 2500 - i * 200, is_active: 'true' });
    }
  }

  var sheet = getSheet(SHEETS.participantDashboardLeaderboard);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantDashboardLeaderboard]);
  leaderboard.forEach(function(l) {
    upsertByKey(SHEETS.participantDashboardLeaderboard, 'rank', String(l.rank), l);
  });
}

function monthAbbr(date) {
  return ['JAN','FEB','MAR','APR','MEI','JUN','JUL','AGU','SEP','OKT','NOV','DES'][date.getMonth()];
}

function nextMonth(date) {
  var d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

function seedCompetencyQuestions() {
  const existing = getRows(SHEETS.competencyQuestions);
  if (existing.length >= 100) return;
  const sheet = getSheet(SHEETS.competencyQuestions);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.competencyQuestions]);
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clearContent();
  buildCompetencyQuestionBank().forEach(question => addRowObject(SHEETS.competencyQuestions, {
    id: question.id,
    section: question.section,
    type: question.section,
    difficulty: question.difficulty,
    question: question.question,
    options: question.options.join('|'),
    answer: question.answer,
    points: 1,
    status: 'active'
  }));
}

function buildCompetencyQuestionBank() {
  const math = [
    ['m1', 'math', 'easy', '12 + 18 = ...', ['20', '28', '30', '32'], '30'],
    ['m2', 'math', 'easy', '45 - 17 = ...', ['18', '26', '28', '32'], '28'],
    ['m3', 'math', 'easy', '7 x 8 = ...', ['48', '54', '56', '64'], '56'],
    ['m4', 'math', 'easy', '72 / 9 = ...', ['6', '7', '8', '9'], '8'],
    ['m5', 'math', 'easy', '25% dari 80 adalah...', ['15', '20', '25', '30'], '20'],
    ['m6', 'math', 'medium', 'Jika 3x + 5 = 20, maka x = ...', ['3', '5', '7', '9'], '5'],
    ['m7', 'math', 'medium', 'Rata-rata dari 6, 8, 10, 12 adalah...', ['8', '9', '10', '11'], '9'],
    ['m8', 'math', 'medium', 'Sebuah barang Rp200.000 diskon 15%. Harga akhirnya...', ['Rp160.000', 'Rp170.000', 'Rp175.000', 'Rp185.000'], 'Rp170.000'],
    ['m9', 'math', 'medium', 'Perbandingan 2:3 total 50. Bagian pertama adalah...', ['15', '20', '25', '30'], '20'],
    ['m10', 'math', 'medium', 'Jika 5 pekerja selesai 12 hari, 10 pekerja selesai dalam...', ['4 hari', '5 hari', '6 hari', '8 hari'], '6 hari'],
    ['m11', 'math', 'advanced', 'Jika f(x)=e^(2x) sin(x), nilai f\'(0) adalah...', ['0', '1', '2', '3'], '1'],
    ['m12', 'math', 'advanced', 'Untuk g(x)=ln(x^2+1), nilai g\'(1) adalah...', ['1/2', '1', '2', '4'], '1'],
    ['m13', 'math', 'advanced', 'Nilai integral dari 0 sampai 1 untuk 6x(1-x) dx adalah...', ['1/2', '1', '3/2', '2'], '1'],
    ['m14', 'math', 'advanced', 'Limit sin(3x)/x saat x mendekati 0 adalah...', ['0', '1', '3', 'Tidak ada'], '3'],
    ['m15', 'math', 'advanced', 'Jika A=[[3,1],[0,2]], hasil kali eigenvalue A adalah...', ['2', '3', '5', '6'], '6']
  ];
  const logic = Array.from({ length: 50 }, (_, index) => {
    const id = 'l' + (index + 1);
    const variants = [
      ['Semua proposal yang lolos review memiliki data valid. Sebagian proposal HerAI lolos review. Kesimpulan paling kuat adalah...', ['Semua proposal HerAI valid', 'Sebagian proposal HerAI memiliki data valid', 'Tidak ada proposal HerAI valid', 'Semua data valid lolos review'], 'Sebagian proposal HerAI memiliki data valid'],
      ['Kecukupan data: x dan y bilangan bulat positif. Apakah x > y? (1) x+y=11 (2) x-y=3', ['Pernyataan 1 saja cukup', 'Pernyataan 2 saja cukup', 'Keduanya bersama cukup', 'Keduanya tidak cukup'], 'Pernyataan 2 saja cukup'],
      ['Pola analitis: 4, 9, 19, 39, 79, ... berikutnya adalah...', ['119', '139', '159', '179'], '159'],
      ['Program A meningkatkan skor rata-rata 20% pada kelompok kecil yang sukarela ikut. Kesimpulan "semua peserta wajib ikut A" paling lemah karena...', ['Mengasumsikan efek sama untuk semua peserta', 'Menggunakan angka persentase', 'Membahas program', 'Tidak menyebut lokasi'], 'Mengasumsikan efek sama untuk semua peserta'],
      ['Jika hanya kandidat dengan skor AI tinggi atau reviewer tinggi yang lolos. Rina lolos tetapi skor AI rendah. Maka...', ['Reviewer Rina tinggi', 'AI Rina tinggi', 'Rina tidak lolos', 'Tidak ada kesimpulan'], 'Reviewer Rina tinggi']
    ];
    const selected = variants[index % variants.length];
    return [id, 'logic', 'standard', selected[0], selected[1], selected[2]];
  });
  const psychology = Array.from({ length: 50 }, (_, index) => {
    const id = 'p' + (index + 1);
    const variants = [
      ['Saat tim berbeda pendapat, respons terbaik adalah...', ['Memaksakan pendapat sendiri', 'Mendengar alasan tiap pihak lalu mencari titik temu', 'Diam agar konflik selesai', 'Menyalahkan anggota paling pasif'], 'Mendengar alasan tiap pihak lalu mencari titik temu'],
      ['Ketika mendapat feedback keras, sikap paling adaptif adalah...', ['Menolak feedback', 'Mencatat poin valid dan membuat rencana perbaikan', 'Menghindari pemberi feedback', 'Membalas dengan kritik'], 'Mencatat poin valid dan membuat rencana perbaikan'],
      ['Jika deadline mendekat dan tugas belum selesai, prioritas utama adalah...', ['Panik', 'Memecah tugas, komunikasikan risiko, dan selesaikan bagian kritis', 'Menunggu instruksi', 'Mengabaikan kualitas sepenuhnya'], 'Memecah tugas, komunikasikan risiko, dan selesaikan bagian kritis'],
      ['Dalam belajar teknologi baru, perilaku paling sehat adalah...', ['Menyerah saat error pertama', 'Mencoba, mencari referensi, dan meminta bantuan saat buntu', 'Menyalin tanpa memahami', 'Menyalahkan tools'], 'Mencoba, mencari referensi, dan meminta bantuan saat buntu']
    ];
    const selected = variants[index % variants.length];
    return [id, 'psychology', 'situational', selected[0], selected[1], selected[2]];
  });
  return math.concat(logic, psychology).map(item => ({
    id: item[0],
    section: item[1],
    difficulty: item[2],
    question: item[3],
    options: item[4],
    answer: item[5]
  }));
}

function registerParticipant(payload) {
  const nik = String(payload.nik || '').replace(/\D/g, '');
  if (!nik || nik.length !== 16) return { status: 'error', message: 'NIK harus 16 digit.' };
  if (findParticipantByNik(nik)) return { status: 'error', message: 'NIK sudah terdaftar.' };
  const rowId = Date.now();
  addRowObject(SHEETS.participants, {
    rowId,
    created_at: new Date().toISOString(),
    nama_lengkap: payload.nama_lengkap,
    nik: nik,
    tempat_lahir: payload.tempat_lahir,
    tanggal_lahir: payload.tanggal_lahir,
    whatsapp: payload.whatsapp,
    email: payload.email,
    alamat: payload.alamat,
    jalur: payload.jalur_pendaftaran,
    status_kerja: payload.status,
    univ: payload.universitas,
    program_studi: payload.program_studi,
    instansi: payload.nama_instansi,
    posisi: payload.posisi,
    pengalaman_kerja: payload.pengalaman_kerja,
    kejuaraan: payload.kejuaraan,
    organisasi: payload.pengalaman_organisasi,
    cv_link: payload.link_cv,
    essay_1: payload.essay_1,
    essay_2: payload.essay_2,
    essay_3: payload.essay_3,
    essay_4: payload.essay_4,
    essay_5: payload.essay_5,
    status_seleksi: 'pending',
    participant_stage: 'registered',
    status_tahap_2: 'pending',
    competency_status: 'pending',
    status_final: 'pending',
    final_status: 'pending',
    is_scanned: false,
    certificate_status: 'pending',
    account_type: PARTICIPANT_ACCOUNT_TYPE
  });
  return { status: 'success', rowId };
}

function getParticipants() {
  const participants = mergeAiScreeningResults(getRows(SHEETS.participants)).map(stripSensitiveParticipant);
  return { status: 'success', data: participants };
}

function getPublicParticipantResult(payload) {
  const nik = String(payload.nik || '').replace(/\D/g, '');
  const email = normalizeEmail(payload.email);
  if (nik.length !== 16 || !email) {
    return { status: 'error', message: 'NIK dan email wajib diisi dengan benar.' };
  }
  enforceAttemptLimit('announcement:' + nik, 12, 10 * 60);
  const participant = getRows(SHEETS.participants).find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === nik && normalizeEmail(row.email) === email;
  });
  if (!participant) {
    return { status: 'error', message: 'Data tidak ditemukan. Pastikan NIK dan email sesuai.' };
  }
  clearAttemptLimit('announcement:' + nik);
  return {
    status: 'success',
    participant: {
      rowId: participant.rowId,
      nama_lengkap: participant.nama_lengkap || '',
      nik: nik,
      email: participant.email || '',
      status_seleksi: participant.status_seleksi || 'pending',
      participant_stage: participant.participant_stage || 'registered',
      status_tahap_2: participant.status_tahap_2 || participant.competency_status || 'pending',
      competency_status: participant.competency_status || participant.status_tahap_2 || 'pending',
      status_final: participant.status_final || participant.final_status || 'pending',
      final_status: participant.final_status || participant.status_final || 'pending'
    }
  };
}

function participantLogin(payload) {
  const nik = String(payload.nik || '').replace(/\D/g, '');
  if (nik.length !== 16) return { status: 'error', message: 'NIK atau password tidak valid.' };
  enforceAttemptLimit('participant-login:' + nik, 8, 10 * 60);
  const account = findParticipantAccount(payload.nik);
  if (!account || !account.account_id) {
    return { status: 'error', message: 'NIK atau password tidak valid.' };
  }
  if (!isParticipantPortalAccountAllowed(account)) {
    return { status: 'error', message: 'Akses akun peserta sedang tidak aktif.' };
  }
  if (!isParticipantAccountActive(account)) {
    return { status: 'error', message: 'Akses akun peserta sedang tidak aktif.' };
  }
  const participant = findParticipantForPortalLogin(payload.nik, account);
  if (!participant) return { status: 'error', message: 'NIK atau password tidak valid.' };
  const password = String(payload.password || '');
  const accountHashMatches = verifyPasswordValue(account.password_hash, password);
  const participantPasswordMatches = verifyPasswordValue(participant.participant_password, password);
  const accountPasswordMatches = !!(
    account.generated_password
    && ['changed', 'revoked'].indexOf(String(account.password_status || '').toLowerCase()) === -1
    && safeStringEquals(account.generated_password, password)
  );
  if (!accountHashMatches && !participantPasswordMatches && !accountPasswordMatches) {
    return { status: 'error', message: 'NIK atau password tidak valid.' };
  }
  synchronizeParticipantCredentials(participant, account, password);
  clearAttemptLimit('participant-login:' + nik);
  const auth = issueAuthToken('participant', nik, {
    scope: 'participant',
    rowId: String(account.participant_rowId || participant.rowId || ''),
    account_type: normalizeParticipantAccountType(account.account_type)
  }, AUTH_TOKEN_TTL_SECONDS.participant);
  recordParticipantActivity({
    nik: participant.nik,
    nama_lengkap: participant.nama_lengkap,
    activity_type: 'login',
    page: 'participant-login',
    activity: 'Peserta login ke dashboard',
    user_agent: payload.user_agent || payload.userAgent || ''
  });
  return {
    status: 'success',
    profile: stripSensitiveParticipant(participant),
    token: auth.token,
    expires_at: auth.expires_at
  };
}

function provisionParticipantAccounts(payload) {
  const forceReset = payload.forceReset === true || payload.force === true;
  const createdBy = payload.adminId || payload.created_by || 'system';
  const limit = Math.max(1, Number(payload.limit || 40));
  const offset = Math.max(0, Number(payload.offset || 0));
  const targetEmailSet = getTargetParticipantPortalEmailSet();
  const existingAccounts = getRows(SHEETS.participantAccounts);
  const accountByNik = {};
  existingAccounts.forEach(function(account) {
    const key = String(account.nik || account.username || '').replace(/\D/g, '');
    if (key) accountByNik[key] = account;
  });
  const eligibleRows = getRows(SHEETS.participants).filter(function(participant) {
    return isTargetParticipantForPortal(participant, targetEmailSet);
  });
  const eligibleByNik = {};
  const duplicateCandidates = [];
  eligibleRows.forEach(function(participant) {
    const nik = String(participant.nik || '').replace(/\D/g, '');
    if (!nik) {
      eligibleByNik['row:' + String(participant.rowId || Utilities.getUuid())] = participant;
      return;
    }
    const existing = accountByNik[nik] || {};
    const current = eligibleByNik[nik];
    if (!current || String(existing.participant_rowId || '') === String(participant.rowId || '')) {
      if (current) duplicateCandidates.push(current);
      eligibleByNik[nik] = participant;
    } else {
      duplicateCandidates.push(participant);
    }
  });
  const eligible = Object.keys(eligibleByNik).map(function(key) { return eligibleByNik[key]; });
  const participants = eligible.slice(offset, offset + limit);
  const matchedEmails = {};
  eligible.forEach(function(participant) {
    const email = normalizeEmail(participant.email);
    if (email) matchedEmails[email] = true;
  });
  const missingTargets = TARGET_PARTICIPANT_PORTAL_EMAILS.filter(function(email) {
    return !matchedEmails[normalizeEmail(email)];
  });
  const accounts = [];
  const skipped = duplicateCandidates.map(function(participant) {
    return {
      rowId: participant.rowId,
      nama_lengkap: participant.nama_lengkap || '',
      reason: 'NIK duplikat; akun existing/record utama dipertahankan'
    };
  });
  participants.forEach(function(participant) {
    const nik = String(participant.nik || '').replace(/\D/g, '');
    if (!nik || nik.length < 8) {
      skipped.push({ rowId: participant.rowId, nama_lengkap: participant.nama_lengkap || '', reason: 'NIK kosong/tidak valid' });
      return;
    }

    const existing = accountByNik[nik] || {};
    const hasExistingCredential = !!(existing.generated_password || existing.password_hash);
    const shouldGenerate = forceReset || !hasExistingCredential;
    const password = shouldGenerate ? generateParticipantPassword(12) : String(existing.generated_password || '');
    const now = new Date().toISOString();

    if (password && (shouldGenerate || !verifyPasswordValueCurrent(participant.participant_password, password))) {
      updateByKey(SHEETS.participants, 'rowId', participant.rowId, {
        participant_password: hashPasswordValue(password),
        participant_stage: normalizeParticipantStage(participant.participant_stage),
        profile_updated_at: now
      });
    }

    const account = {
      account_id: existing.account_id || ('pa_' + Utilities.getUuid()),
      nik: nik,
      username: nik,
      generated_password: password,
      password_hash: password && (shouldGenerate || !verifyPasswordValueCurrent(existing.password_hash, password))
        ? hashPasswordValue(password)
        : (existing.password_hash || ''),
      password_status: shouldGenerate ? 'generated' : (existing.password_status || 'existing'),
      access_status: existing.access_status || 'active',
      nama_lengkap: participant.nama_lengkap || '',
      email: participant.email || '',
      whatsapp: participant.whatsapp || '',
      participant_rowId: participant.rowId,
      participant_stage: participant.participant_stage || '',
      status_seleksi: participant.status_seleksi || '',
      created_at: existing.created_at || now,
      updated_at: now,
      created_by: createdBy,
      last_login_at: existing.last_login_at || '',
      password_changed_at: shouldGenerate ? now : (existing.password_changed_at || ''),
      account_type: normalizeParticipantAccountType(existing.account_type)
    };
    upsertByKey(SHEETS.participantAccounts, 'nik', nik, account);
    accounts.push(account);
  });

  return {
    status: 'success',
    generated: accounts.filter(account => account.password_status === 'generated').length,
    total: accounts.length,
    eligible_total: eligible.length,
    target_total: TARGET_PARTICIPANT_PORTAL_EMAILS.length,
    matched_total: eligible.length,
    missing_targets: missingTargets,
    offset: offset,
    limit: limit,
    has_more: offset + limit < eligible.length,
    next_offset: offset + limit,
    skipped: skipped,
    accounts: accounts
  };
}

function provisionParticipantAccountsForApi(payload) {
  const result = provisionParticipantAccounts(payload);
  return Object.assign({}, result, {
    accounts: (result.accounts || []).map(stripParticipantAccountSensitive)
  });
}

function getParticipantAccountsForApi() {
  return {
    status: 'success',
    accounts: getRows(SHEETS.participantAccounts).map(stripParticipantAccountSensitive)
  };
}

function stripParticipantAccountSensitive(account) {
  const clone = Object.assign({}, account || {});
  delete clone.generated_password;
  delete clone.password_hash;
  return clone;
}

function findParticipantAccount(nik) {
  const cleanNik = String(nik || '').replace(/\D/g, '');
  return getRows(SHEETS.participantAccounts).find(function(account) {
    return String(account.nik || account.username || '').replace(/\D/g, '') === cleanNik;
  }) || {};
}

function findParticipantForPortalLogin(nik, account) {
  const participants = getRows(SHEETS.participants);
  const participantRowId = String(account && account.participant_rowId || '');
  if (participantRowId) {
    const linkedParticipant = participants.find(function(participant) {
      return String(participant.rowId || '') === participantRowId;
    });
    if (linkedParticipant) return linkedParticipant;
  }
  const cleanNik = String(nik || '').replace(/\D/g, '');
  return participants.find(function(participant) {
    return String(participant.nik || '').replace(/\D/g, '') === cleanNik;
  }) || null;
}

function synchronizeParticipantCredentials(participant, account, password) {
  const now = new Date().toISOString();
  const stableHash = hashPasswordValue(password);
  const participantRowId = String(account && account.participant_rowId || participant.rowId || '');
  if (!verifyPasswordValueCurrent(participant.participant_password, password)) {
    const result = participantRowId
      ? updateByKey(SHEETS.participants, 'rowId', participantRowId, {
        participant_password: stableHash,
        profile_updated_at: now
      })
      : updateByKey(SHEETS.participants, 'nik', participant.nik, {
        participant_password: stableHash,
        profile_updated_at: now
      });
    if (result.status !== 'success') {
      throw new Error('Password akun valid, tetapi sinkronisasi profil peserta gagal.');
    }
  }
  updateByKey(SHEETS.participantAccounts, 'nik', String(account.nik || account.username || ''), {
    password_hash: verifyPasswordValueCurrent(account.password_hash, password) ? account.password_hash : stableHash,
    access_status: account.access_status || 'active',
    last_login_at: now,
    updated_at: now
  });
}

function isParticipantAccountActive(account) {
  const status = String(account && account.access_status || 'active').trim().toLowerCase();
  return status === '' || status === 'active' || status === 'enabled';
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeParticipantAccountType(value) {
  return String(value || '').trim().toLowerCase() === QA_PARTICIPANT_ACCOUNT_TYPE
    ? QA_PARTICIPANT_ACCOUNT_TYPE
    : PARTICIPANT_ACCOUNT_TYPE;
}

function isQaParticipantAccount(account) {
  return normalizeParticipantAccountType(account && account.account_type) === QA_PARTICIPANT_ACCOUNT_TYPE;
}

function isParticipantPortalAccountAllowed(account, targetEmailSet) {
  return isQaParticipantAccount(account) || isTargetParticipantForPortal(account, targetEmailSet);
}

function getActiveParticipantPortalAccounts() {
  return getRows(SHEETS.participantAccounts).filter(function(account) {
    return account && account.account_id
      && isParticipantPortalAccountAllowed(account)
      && isParticipantAccountActive(account);
  });
}

function getActiveParticipantPortalNikSet() {
  return getActiveParticipantPortalAccounts().reduce(function(result, account) {
    const nik = String(account.nik || account.username || '').replace(/\D/g, '');
    if (nik) result[nik] = true;
    return result;
  }, {});
}

/**
 * Preview internal untuk workflow email/credential. Fungsi ini sengaja tidak
 * didaftarkan di doPost; jalankan hanya dari Apps Script editor.
 */
function getActiveParticipantCommunicationRecipients() {
  const seenEmails = {};
  const recipients = getActiveParticipantPortalAccounts().map(function(account) {
    const email = normalizeEmail(account.email);
    if (!email || seenEmails[email]) return null;
    seenEmails[email] = true;
    return {
      account_id: String(account.account_id || ''),
      nik: String(account.nik || account.username || '').replace(/\D/g, ''),
      nama_lengkap: String(account.nama_lengkap || ''),
      email: email,
      account_type: normalizeParticipantAccountType(account.account_type),
      access_status: 'active'
    };
  }).filter(Boolean);
  return {
    status: 'success',
    total: recipients.length,
    qa_total: recipients.filter(function(row) { return row.account_type === QA_PARTICIPANT_ACCOUNT_TYPE; }).length,
    recipients: recipients
  };
}

function getTargetParticipantPortalEmailSet() {
  const emailSet = {};
  TARGET_PARTICIPANT_PORTAL_EMAILS.forEach(function(email) {
    const clean = normalizeEmail(email);
    if (clean) emailSet[clean] = true;
  });
  return emailSet;
}

function buildParticipantPortalAccessReconciliation(accounts) {
  const targetEmails = TARGET_PARTICIPANT_PORTAL_EMAILS.map(normalizeEmail).filter(Boolean);
  const targetEmailSet = getTargetParticipantPortalEmailSet();
  const uniqueTargetTotal = Object.keys(targetEmailSet).length;
  const seenAccountEmails = {};
  const matchedTargetEmails = {};
  const decisions = [];
  let blankEmailRows = 0;
  let duplicateAccountEmailKeys = 0;
  let targetAccountRows = 0;
  let outsideTargetRows = 0;
  let qaAccountRows = 0;
  let activeQaRows = 0;
  let disabledQaRows = 0;
  let toActivate = 0;
  let toDeactivate = 0;
  let unchanged = 0;

  (accounts || []).forEach(function(account, index) {
    const email = normalizeEmail(account && account.email);
    const currentStatus = String(account && account.access_status || '').trim().toLowerCase();
    if (!email) {
      blankEmailRows += 1;
    } else {
      seenAccountEmails[email] = (seenAccountEmails[email] || 0) + 1;
      if (seenAccountEmails[email] === 2) duplicateAccountEmailKeys += 1;
    }
    const isQa = isQaParticipantAccount(account);
    const isTarget = !isQa && !!(email && targetEmailSet[email]);
    if (isQa) {
      qaAccountRows += 1;
      if (isParticipantAccountActive(account)) activeQaRows += 1;
      else disabledQaRows += 1;
    } else if (isTarget) {
      matchedTargetEmails[email] = true;
      targetAccountRows += 1;
    } else {
      outsideTargetRows += 1;
    }
    const expectedStatus = isQa ? (currentStatus || 'active') : (isTarget ? 'active' : 'inactive');
    if (currentStatus === expectedStatus) unchanged += 1;
    else if (isQa || isTarget) toActivate += 1;
    else toDeactivate += 1;
    decisions.push({
      source_index: account && account.__source_index !== undefined ? account.__source_index : index,
      expected_status: expectedStatus,
      account_type: isQa ? QA_PARTICIPANT_ACCOUNT_TYPE : PARTICIPANT_ACCOUNT_TYPE
    });
  });

  const matchedTargetTotal = Object.keys(matchedTargetEmails).length;
  const duplicateTargetRows = targetEmails.length - uniqueTargetTotal;
  const missingTargetTotal = uniqueTargetTotal - matchedTargetTotal;
  const readyToApply = targetEmails.length === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
    && uniqueTargetTotal === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
    && duplicateTargetRows === 0
    && matchedTargetTotal === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
    && targetAccountRows === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
    && missingTargetTotal === 0
    && blankEmailRows === 0
    && duplicateAccountEmailKeys === 0;

  return {
    summary: {
      total_accounts: decisions.length,
      target_rows: targetEmails.length,
      target_unique: uniqueTargetTotal,
      matched_target_accounts: targetAccountRows,
      matched_target_emails: matchedTargetTotal,
      outside_target_accounts: outsideTargetRows,
      qa_accounts: qaAccountRows,
      active_qa_accounts: activeQaRows,
      disabled_qa_accounts: disabledQaRows,
      expected_active: targetAccountRows + activeQaRows,
      expected_inactive: outsideTargetRows + disabledQaRows,
      expected_total_after_compaction: EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + qaAccountRows,
      to_activate: toActivate,
      to_deactivate: toDeactivate,
      unchanged: unchanged,
      missing_targets: missingTargetTotal,
      blank_email_rows: blankEmailRows,
      duplicate_target_rows: duplicateTargetRows,
      duplicate_account_email_keys: duplicateAccountEmailKeys,
      ready_to_apply: readyToApply
    },
    decisions: decisions
  };
}

function getParticipantPortalAccessSnapshot() {
  const sheet = getSheet(SHEETS.participantAccounts);
  ensureSchemaHeaders(sheet, SCHEMA[SHEETS.participantAccounts]);
  const values = sheet.getDataRange().getValues();
  const headers = values[0] || [];
  const headerIndex = indexHeaders(headers);
  ['nik', 'email', 'access_status', 'updated_at', 'account_type'].forEach(function(header) {
    if (headerIndex[header] === undefined) {
      throw new Error('Kolom wajib ParticipantAccounts tidak tersedia: ' + header);
    }
  });
  const accounts = [];
  values.slice(1).forEach(function(row, index) {
    const hasData = row.some(function(value) { return String(value || '').trim() !== ''; });
    if (!hasData) return;
    accounts.push({
      nik: row[headerIndex.nik],
      email: row[headerIndex.email],
      access_status: row[headerIndex.access_status],
      account_type: row[headerIndex.account_type],
      __source_index: index
    });
  });
  return {
    sheet: sheet,
    values: values,
    header_index: headerIndex,
    accounts: accounts
  };
}

function auditParticipantPortalAccess() {
  const snapshot = getParticipantPortalAccessSnapshot();
  const plan = buildParticipantPortalAccessReconciliation(snapshot.accounts);
  Logger.log(JSON.stringify(plan.summary));
  return Object.assign({ status: 'success' }, plan.summary);
}

/**
 * Rekonsiliasi idempotent untuk cohort portal peserta tahap 2.
 * Hanya kolom access_status dan updated_at yang berubah; row, credential,
 * progress, dan histori tidak dihapus atau dibuat ulang.
 * Jalankan auditParticipantPortalAccess() dan review ready_to_apply lebih dulu.
 */
function reconcileParticipantPortalAccess() {
  ensureParticipantBackendSchema();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const snapshot = getParticipantPortalAccessSnapshot();
    const plan = buildParticipantPortalAccessReconciliation(snapshot.accounts);
    if (!plan.summary.ready_to_apply) {
      const rejected = Object.assign({
        status: 'error',
        message: 'Rekonsiliasi dibatalkan karena preflight cohort tidak valid.'
      }, plan.summary);
      Logger.log(JSON.stringify(rejected));
      return rejected;
    }

    const accessStatusColumn = snapshot.values.slice(1).map(function(row) {
      return [row[snapshot.header_index.access_status] || ''];
    });
    const updatedAtColumn = snapshot.values.slice(1).map(function(row) {
      return [row[snapshot.header_index.updated_at] || ''];
    });
    const now = new Date().toISOString();
    let changed = 0;
    plan.decisions.forEach(function(decision) {
      const index = decision.source_index;
      const currentStatus = String(accessStatusColumn[index][0] || '').trim().toLowerCase();
      if (currentStatus === decision.expected_status) return;
      accessStatusColumn[index][0] = decision.expected_status;
      updatedAtColumn[index][0] = now;
      changed += 1;
    });

    setColumnValues(snapshot.sheet, snapshot.header_index.access_status, accessStatusColumn);
    setColumnValues(snapshot.sheet, snapshot.header_index.updated_at, updatedAtColumn);
    SpreadsheetApp.flush();
    const result = Object.assign({
      status: 'success',
      changed: changed
    }, plan.summary);
    Logger.log(JSON.stringify(result));
    return result;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Memadatkan ParticipantAccounts dari cohort lama 187 row menjadi tepat 100
 * peserta target tahap 2, ditambah account QA yang sudah ada. Fungsi membuat
 * backup sheet otomatis dan menjaga seluruh nilai row target/QA, termasuk
 * credential existing. Tidak ada password yang dibuat, dirotasi, atau dihapus.
 */
function compactParticipantAccountsToTargetCohort() {
  ensureParticipantBackendSchema();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const snapshot = getParticipantPortalAccessSnapshot();
    const plan = buildParticipantPortalAccessReconciliation(snapshot.accounts);
    const summary = plan.summary;
    if (!summary.ready_to_apply) {
      const rejected = Object.assign({
        status: 'error',
        message: 'Compaction dibatalkan karena preflight cohort tidak valid.'
      }, summary);
      Logger.log(JSON.stringify(rejected));
      return rejected;
    }
    const expectedCompactedTotal = EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + summary.qa_accounts;
    if (summary.total_accounts === expectedCompactedTotal
      && summary.matched_target_accounts === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
      && summary.outside_target_accounts === 0) {
      const alreadyCompacted = Object.assign({
        status: 'success',
        already_compacted: true,
        removed: 0
      }, summary);
      Logger.log(JSON.stringify(alreadyCompacted));
      return alreadyCompacted;
    }
    if (summary.total_accounts !== EXPECTED_PARTICIPANT_ACCOUNT_TOTAL_BEFORE_COMPACTION + summary.qa_accounts
      || summary.matched_target_accounts !== EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
      || summary.outside_target_accounts !== (
        EXPECTED_PARTICIPANT_ACCOUNT_TOTAL_BEFORE_COMPACTION - EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
      )) {
      const unexpectedTotal = Object.assign({
        status: 'error',
        message: 'Compaction dibatalkan: expected 187 account cohort lama ditambah QA, 100 target, dan 87 non-target.'
      }, summary);
      Logger.log(JSON.stringify(unexpectedTotal));
      return unexpectedTotal;
    }

    const targetEmailSet = getTargetParticipantPortalEmailSet();
    const now = new Date().toISOString();
    const compactedRows = [];
    snapshot.values.slice(1).forEach(function(row) {
      const hasData = row.some(function(value) { return String(value || '').trim() !== ''; });
      if (!hasData) return;
      const email = normalizeEmail(row[snapshot.header_index.email]);
      const accountType = row[snapshot.header_index.account_type];
      const isQa = isQaParticipantAccount({ account_type: accountType });
      if (!targetEmailSet[email] && !isQa) return;
      const preservedRow = row.slice();
      if (!isQa) preservedRow[snapshot.header_index.access_status] = 'active';
      else if (!String(preservedRow[snapshot.header_index.access_status] || '').trim()) {
        preservedRow[snapshot.header_index.access_status] = 'active';
      }
      preservedRow[snapshot.header_index.updated_at] = now;
      compactedRows.push(preservedRow);
    });
    if (compactedRows.length !== expectedCompactedTotal) {
      throw new Error('Compaction dibatalkan: jumlah row target dan QA hasil filter tidak sesuai preflight.');
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const backupName = 'ParticipantAccounts_Backup_' + new Date().toISOString()
      .replace(/\D/g, '')
      .slice(0, 14)
      + '_' + Utilities.getUuid().slice(0, 8);
    const backupSheet = snapshot.sheet.copyTo(spreadsheet).setName(backupName);
    backupSheet.setFrozenRows(1);
    if (typeof backupSheet.hideSheet === 'function') backupSheet.hideSheet();

    const originalValues = snapshot.values.map(function(row) { return row.slice(); });
    const compactedValues = [snapshot.values[0].slice()].concat(compactedRows);
    try {
      snapshot.sheet.getDataRange().clearContent();
      snapshot.sheet.getRange(1, 1, compactedValues.length, compactedValues[0].length)
        .setValues(compactedValues);
      snapshot.sheet.setFrozenRows(1);
      SpreadsheetApp.flush();

      const verification = buildParticipantPortalAccessReconciliation(
        getParticipantPortalAccessSnapshot().accounts
      ).summary;
      if (!verification.ready_to_apply
        || verification.total_accounts !== expectedCompactedTotal
        || verification.matched_target_accounts !== EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
        || verification.qa_accounts !== summary.qa_accounts
        || verification.outside_target_accounts !== 0) {
        throw new Error('Read-back compaction tidak menghasilkan tepat 100 account target ditambah QA.');
      }
    } catch (error) {
      snapshot.sheet.getDataRange().clearContent();
      snapshot.sheet.getRange(1, 1, originalValues.length, originalValues[0].length)
        .setValues(originalValues);
      SpreadsheetApp.flush();
      throw error;
    }

    const result = {
      status: 'success',
      already_compacted: false,
      before: summary.total_accounts,
      after: expectedCompactedTotal,
      removed: summary.outside_target_accounts,
      qa_accounts: summary.qa_accounts,
      backup_sheet: backupName,
      credentials_changed: 0
    };
    Logger.log(JSON.stringify(result));
    return result;
  } finally {
    lock.releaseLock();
  }
}

function isTargetParticipantForPortal(participant, targetEmailSet) {
  const emailSet = targetEmailSet || getTargetParticipantPortalEmailSet();
  const email = normalizeEmail(participant && participant.email);
  return !!(email && emailSet[email]);
}

function isParticipantEligibleForPortal(participant) {
  return isParticipantPortalAccountAllowed(participant);
}

function maskParticipantNik(nik) {
  const cleanNik = String(nik || '').replace(/\D/g, '');
  if (cleanNik.length < 8) return '****';
  return cleanNik.slice(0, 4) + '********' + cleanNik.slice(-4);
}

function buildQaParticipantSetupCohortCheck(accounts) {
  const summary = buildParticipantPortalAccessReconciliation(accounts).summary;
  const expectedTotal = EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + summary.qa_accounts;
  const ready = summary.ready_to_apply
    && summary.matched_target_accounts === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
    && summary.outside_target_accounts === 0
    && summary.qa_accounts <= 1
    && summary.total_accounts === expectedTotal;
  return {
    ready: ready,
    expected_total: expectedTotal,
    summary: summary
  };
}

function readQaParticipantConfig() {
  const properties = PropertiesService.getScriptProperties();
  const config = {
    nik: String(properties.getProperty(QA_PARTICIPANT_PROPERTY_KEYS.nik) || '').replace(/\D/g, ''),
    name: String(properties.getProperty(QA_PARTICIPANT_PROPERTY_KEYS.name) || '').trim(),
    email: normalizeEmail(properties.getProperty(QA_PARTICIPANT_PROPERTY_KEYS.email)),
    password: String(properties.getProperty(QA_PARTICIPANT_PROPERTY_KEYS.password) || '')
  };
  if (config.nik.length !== 16) {
    throw new Error('HERAI_QA_NIK wajib berisi tepat 16 digit synthetic QA NIK.');
  }
  if (!config.name) throw new Error('HERAI_QA_NAME wajib diisi.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email)) {
    throw new Error('HERAI_QA_EMAIL wajib berupa email yang valid.');
  }
  if (isTargetParticipantForPortal({ email: config.email })) {
    throw new Error('HERAI_QA_EMAIL tidak boleh memakai email cohort resmi 100 peserta.');
  }
  if (config.password && config.password.length < 12) {
    throw new Error('HERAI_QA_PASSWORD minimal 12 karakter.');
  }
  return config;
}

function assertQaParticipantAccount(account, operation) {
  if (!account || !account.account_id || !isQaParticipantAccount(account)) {
    throw new Error((operation || 'Operasi QA') + ' ditolak: account bukan account_type=qa.');
  }
  return account;
}

function findConfiguredQaParticipantAccount(config) {
  const qaConfig = config || readQaParticipantConfig();
  const cleanNik = String(qaConfig.nik || '').replace(/\D/g, '');
  const account = getRows(SHEETS.participantAccounts).find(function(row) {
    return String(row.nik || row.username || '').replace(/\D/g, '') === cleanNik;
  });
  return assertQaParticipantAccount(account, 'Pencarian account QA');
}

/**
 * Preflight tanpa perubahan data peserta. Jalankan dari editor sebelum
 * setupQaParticipantAccount(). Schema header yang belum ada dapat ditambahkan.
 */
function previewQaParticipantAccount() {
  let result;
  try {
    ensureParticipantBackendSchema();
    const config = readQaParticipantConfig();
    const accounts = getRows(SHEETS.participantAccounts);
    const participants = getRows(SHEETS.participants);
    const cohortCheck = buildQaParticipantSetupCohortCheck(accounts);
    const accountByNik = accounts.find(function(row) {
      return String(row.nik || row.username || '').replace(/\D/g, '') === config.nik;
    });
    const accountByEmail = accounts.find(function(row) {
      return normalizeEmail(row.email) === config.email;
    });
    const participantByNik = participants.find(function(row) {
      return String(row.nik || '').replace(/\D/g, '') === config.nik;
    });
    const participantByEmail = participants.find(function(row) {
      return normalizeEmail(row.email) === config.email;
    });
    const otherQaAccounts = accounts.filter(function(row) {
      return isQaParticipantAccount(row)
        && String(row.nik || row.username || '').replace(/\D/g, '') !== config.nik;
    });
    const otherQaParticipants = participants.filter(function(row) {
      return normalizeParticipantAccountType(row.account_type) === QA_PARTICIPANT_ACCOUNT_TYPE
        && String(row.nik || '').replace(/\D/g, '') !== config.nik;
    });
    const accountCollision = [accountByNik, accountByEmail].filter(Boolean).some(function(row) {
      return !isQaParticipantAccount(row);
    }) || otherQaAccounts.length > 0;
    const participantCollision = [participantByNik, participantByEmail].filter(Boolean).some(function(row) {
      return normalizeParticipantAccountType(row.account_type) !== QA_PARTICIPANT_ACCOUNT_TYPE;
    }) || otherQaParticipants.length > 0;
    const existingQa = accountByNik && isQaParticipantAccount(accountByNik) ? accountByNik : null;
    const hasCollision = accountCollision || participantCollision;
    result = {
      status: hasCollision || !cohortCheck.ready ? 'error' : 'success',
      ready_to_setup: !hasCollision && cohortCheck.ready
        && Boolean(config.password || (existingQa && existingQa.password_hash)),
      masked_nik: maskParticipantNik(config.nik),
      email: config.email,
      name: config.name,
      password_property_present: Boolean(config.password),
      existing_qa_account: Boolean(existingQa),
      existing_access_status: existingQa ? String(existingQa.access_status || 'active') : '',
      qa_account_total: accounts.filter(isQaParticipantAccount).length,
      account_collision: accountCollision,
      participant_collision: participantCollision,
      cohort_ready: cohortCheck.ready,
      cohort_total: cohortCheck.summary.total_accounts,
      cohort_outside_target: cohortCheck.summary.outside_target_accounts,
      target_participant_count: EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT,
      expected_total_after_setup: EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + 1
    };
  } catch (error) {
    result = { status: 'error', ready_to_setup: false, message: error.message };
  }
  Logger.log(JSON.stringify(result));
  return result;
}

/**
 * Membuat satu first-class QA participant dari Script Properties. Fungsi ini
 * tidak didaftarkan di doPost dan hanya boleh dijalankan langsung dari editor.
 */
function setupQaParticipantAccount() {
  ensureParticipantBackendSchema();
  getPasswordPepper();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const config = readQaParticipantConfig();
    const accounts = getRows(SHEETS.participantAccounts);
    const participants = getRows(SHEETS.participants);
    const cohortCheck = buildQaParticipantSetupCohortCheck(accounts);
    if (!cohortCheck.ready) {
      throw new Error(
        'Setup QA ditolak: ParticipantAccounts harus tepat 100 account resmi ditambah maksimal satu QA, tanpa account di luar cohort.'
      );
    }
    const otherQaAccounts = accounts.filter(function(row) {
      return isQaParticipantAccount(row)
        && String(row.nik || row.username || '').replace(/\D/g, '') !== config.nik;
    });
    if (otherQaAccounts.length) {
      throw new Error('Setup QA ditolak: sudah ada account QA lain. Hanya satu QA participant yang diizinkan.');
    }
    const otherQaParticipants = participants.filter(function(row) {
      return normalizeParticipantAccountType(row.account_type) === QA_PARTICIPANT_ACCOUNT_TYPE
        && String(row.nik || '').replace(/\D/g, '') !== config.nik;
    });
    if (otherQaParticipants.length) {
      throw new Error('Setup QA ditolak: sudah ada record participant QA lain.');
    }
    const sameNikAccounts = accounts.filter(function(row) {
      return String(row.nik || row.username || '').replace(/\D/g, '') === config.nik;
    });
    const sameEmailAccounts = accounts.filter(function(row) {
      return normalizeEmail(row.email) === config.email;
    });
    const accountCollisions = sameNikAccounts.concat(sameEmailAccounts).filter(function(row, index, rows) {
      return rows.indexOf(row) === index && !isQaParticipantAccount(row);
    });
    if (accountCollisions.length) {
      throw new Error('Setup QA ditolak: NIK/email sudah dipakai account peserta non-QA.');
    }

    const sameNikParticipants = participants.filter(function(row) {
      return String(row.nik || '').replace(/\D/g, '') === config.nik;
    });
    const sameEmailParticipants = participants.filter(function(row) {
      return normalizeEmail(row.email) === config.email;
    });
    const participantCollisions = sameNikParticipants.concat(sameEmailParticipants).filter(function(row, index, rows) {
      return rows.indexOf(row) === index
        && normalizeParticipantAccountType(row.account_type) !== QA_PARTICIPANT_ACCOUNT_TYPE;
    });
    if (participantCollisions.length) {
      throw new Error('Setup QA ditolak: NIK/email sudah dipakai record peserta non-QA.');
    }

    const existingAccount = sameNikAccounts.find(isQaParticipantAccount)
      || sameEmailAccounts.find(isQaParticipantAccount)
      || null;
    const existingParticipant = sameNikParticipants.find(function(row) {
      return normalizeParticipantAccountType(row.account_type) === QA_PARTICIPANT_ACCOUNT_TYPE;
    }) || sameEmailParticipants.find(function(row) {
      return normalizeParticipantAccountType(row.account_type) === QA_PARTICIPANT_ACCOUNT_TYPE;
    }) || null;
    const existingHash = String(existingAccount && existingAccount.password_hash
      || existingParticipant && existingParticipant.participant_password
      || '');
    if (!config.password && !existingHash) {
      throw new Error('HERAI_QA_PASSWORD wajib diisi untuk setup account QA pertama kali.');
    }

    const now = new Date().toISOString();
    const participantRowId = String(existingParticipant && existingParticipant.rowId
      || existingAccount && existingAccount.participant_rowId
      || ('qa_' + Utilities.getUuid()));
    const passwordHash = config.password ? hashPasswordValue(config.password) : existingHash;
    const participantRecord = Object.assign({}, existingParticipant || {}, {
      rowId: participantRowId,
      created_at: existingParticipant && existingParticipant.created_at || now,
      nama_lengkap: config.name,
      nik: config.nik,
      email: config.email,
      status_seleksi: 'lolos',
      participant_stage: 'fellowship',
      status_tahap_2: 'lolos',
      competency_status: 'passed',
      status_final: 'lolos',
      final_status: 'lolos',
      participant_password: passwordHash,
      profile_updated_at: now,
      account_type: QA_PARTICIPANT_ACCOUNT_TYPE
    });
    upsertByKey(SHEETS.participants, 'rowId', participantRowId, participantRecord);

    const accountId = String(existingAccount && existingAccount.account_id || ('pa_qa_' + Utilities.getUuid()));
    const accountRecord = Object.assign({}, existingAccount || {}, {
      account_id: accountId,
      nik: config.nik,
      username: config.nik,
      generated_password: config.password
        ? config.password
        : String(existingAccount && existingAccount.generated_password || ''),
      password_hash: passwordHash,
      password_status: 'qa_managed',
      access_status: existingAccount && existingAccount.access_status || 'active',
      nama_lengkap: config.name,
      email: config.email,
      participant_rowId: participantRowId,
      participant_stage: 'fellowship',
      status_seleksi: 'lolos',
      created_at: existingAccount && existingAccount.created_at || now,
      updated_at: now,
      created_by: existingAccount && existingAccount.created_by || 'setupQaParticipantAccount',
      last_login_at: existingAccount && existingAccount.last_login_at || '',
      password_changed_at: config.password ? now : (existingAccount && existingAccount.password_changed_at || ''),
      account_type: QA_PARTICIPANT_ACCOUNT_TYPE
    });
    upsertByKey(SHEETS.participantAccounts, 'account_id', accountId, accountRecord);
    SpreadsheetApp.flush();

    const readBack = findConfiguredQaParticipantAccount(config);
    if (String(readBack.participant_rowId || '') !== participantRowId
      || !readBack.password_hash
      || !isQaParticipantAccount(readBack)) {
      throw new Error('Read-back setup QA tidak sesuai; password property dipertahankan untuk retry.');
    }
    if (config.password && !verifyPasswordValueCurrent(readBack.password_hash, config.password)) {
      throw new Error('Read-back password hash QA gagal; password property dipertahankan untuk retry.');
    }
    if (config.password && String(readBack.generated_password || '') !== config.password) {
      throw new Error('Read-back generated_password QA gagal; password property dipertahankan untuk retry.');
    }

    if (config.password) {
      PropertiesService.getScriptProperties().deleteProperty(QA_PARTICIPANT_PROPERTY_KEYS.password);
    }
    const recipients = getActiveParticipantCommunicationRecipients();
    const result = {
      status: 'success',
      account_id: accountId,
      participant_rowId: participantRowId,
      masked_nik: maskParticipantNik(config.nik),
      email: config.email,
      account_type: QA_PARTICIPANT_ACCOUNT_TYPE,
      access_status: String(readBack.access_status || 'active'),
      active_recipient_total: recipients.total,
      active_qa_recipient_total: recipients.qa_total,
      generated_password_stored: Boolean(readBack.generated_password),
      password_property_cleared: !PropertiesService.getScriptProperties()
        .getProperty(QA_PARTICIPANT_PROPERTY_KEYS.password)
    };
    Logger.log(JSON.stringify(result));
    return result;
  } finally {
    lock.releaseLock();
  }
}

function setQaParticipantAccessStatus(nextStatus) {
  const normalizedStatus = String(nextStatus || '').trim().toLowerCase();
  if (['active', 'disabled'].indexOf(normalizedStatus) === -1) {
    throw new Error('Status QA hanya boleh active atau disabled.');
  }
  ensureParticipantBackendSchema();
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const config = readQaParticipantConfig();
    const account = findConfiguredQaParticipantAccount(config);
    const now = new Date().toISOString();
    const updated = updateByKey(SHEETS.participantAccounts, 'account_id', account.account_id, {
      access_status: normalizedStatus,
      updated_at: now,
      account_type: QA_PARTICIPANT_ACCOUNT_TYPE
    });
    if (updated.status !== 'success') throw new Error('Gagal memperbarui access_status QA.');
    if (account.participant_rowId) {
      updateByKey(SHEETS.participants, 'rowId', account.participant_rowId, {
        account_type: QA_PARTICIPANT_ACCOUNT_TYPE,
        profile_updated_at: now
      });
    }
    SpreadsheetApp.flush();
    const readBack = findConfiguredQaParticipantAccount(config);
    if (String(readBack.access_status || '').trim().toLowerCase() !== normalizedStatus) {
      throw new Error('Read-back access_status QA tidak sesuai.');
    }
    const result = {
      status: 'success',
      account_id: account.account_id,
      masked_nik: maskParticipantNik(config.nik),
      access_status: normalizedStatus,
      login_allowed: normalizedStatus === 'active',
      leaderboard_allowed: normalizedStatus === 'active',
      email_recipient_allowed: normalizedStatus === 'active'
    };
    Logger.log(JSON.stringify(result));
    return result;
  } finally {
    lock.releaseLock();
  }
}

function enableQaParticipantAccount() {
  return setQaParticipantAccessStatus('active');
}

function disableQaParticipantAccount() {
  return setQaParticipantAccessStatus('disabled');
}

function getQaParticipantResetDescriptors(account) {
  const nik = String(account.nik || account.username || '').replace(/\D/g, '');
  const participantRowId = String(account.participant_rowId || '');
  const byNik = function(row) { return String(row.nik || '').replace(/\D/g, '') === nik; };
  const byParticipant = function(row) {
    return (participantRowId && String(row.participant_rowId || '') === participantRowId) || byNik(row);
  };
  return [
    { sheet_name: SHEETS.participantProgress, matches: byParticipant },
    { sheet_name: SHEETS.participantActivity, matches: byNik },
    { sheet_name: SHEETS.participantDiscussions, matches: byParticipant },
    { sheet_name: SHEETS.participantExerciseSubmissions, matches: byParticipant },
    { sheet_name: SHEETS.competencySessions, matches: byNik },
    { sheet_name: SHEETS.retestSessions, matches: byNik },
    { sheet_name: SHEETS.retestAccess, matches: byNik },
    { sheet_name: SHEETS.attendance, matches: byParticipant },
    { sheet_name: SHEETS.certificates, matches: byParticipant },
    { sheet_name: SHEETS.participantDashboardLeaderboard, matches: byNik }
  ];
}

function collectQaParticipantResetRows(account) {
  const entries = [];
  const counts = {};
  getQaParticipantResetDescriptors(account).forEach(function(descriptor) {
    const sheet = getSheet(descriptor.sheet_name);
    ensureSchemaHeaders(sheet, SCHEMA[descriptor.sheet_name] || []);
    const values = sheet.getDataRange().getValues();
    const headers = values[0] || [];
    let count = 0;
    values.slice(1).forEach(function(row, index) {
      if (!row.some(function(value) { return String(value || '').trim() !== ''; })) return;
      const object = {};
      headers.forEach(function(header, column) { object[header] = row[column]; });
      if (!descriptor.matches(object)) return;
      entries.push({
        sheet_name: descriptor.sheet_name,
        row_number: index + 2,
        payload: object
      });
      count += 1;
    });
    counts[descriptor.sheet_name] = count;
  });
  return { entries: entries, counts: counts };
}

function previewQaParticipantReset() {
  let result;
  try {
    ensureParticipantBackendSchema();
    const account = findConfiguredQaParticipantAccount();
    const collected = collectQaParticipantResetRows(account);
    const confirmation = PropertiesService.getScriptProperties()
      .getProperty(QA_PARTICIPANT_PROPERTY_KEYS.resetConfirmation);
    result = {
      status: 'success',
      account_id: account.account_id,
      masked_nik: maskParticipantNik(account.nik),
      account_type: QA_PARTICIPANT_ACCOUNT_TYPE,
      access_status: String(account.access_status || 'active'),
      total_rows_to_delete: collected.entries.length,
      rows_by_sheet: collected.counts,
      reset_armed: confirmation === QA_PARTICIPANT_RESET_CONFIRMATION,
      credentials_changed: 0
    };
  } catch (error) {
    result = { status: 'error', message: error.message };
  }
  Logger.log(JSON.stringify(result));
  return result;
}

function createQaResetBackup(account, entries) {
  if (!entries.length) return '';
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const backupName = ('QAResetBackup_' + new Date().toISOString().replace(/\D/g, '').slice(0, 14)
    + '_' + Utilities.getUuid().slice(0, 8)).slice(0, 99);
  const backupSheet = spreadsheet.insertSheet(backupName);
  const headers = [
    'backup_timestamp', 'source_sheet', 'source_row_number', 'account_id',
    'participant_rowId', 'nik_masked', 'chunk_index', 'chunk_total', 'payload_json_chunk'
  ];
  const timestamp = new Date().toISOString();
  const backupRows = [];
  entries.forEach(function(entry) {
    const payload = JSON.stringify(entry.payload || {});
    const chunks = payload.match(/[\s\S]{1,40000}/g) || ['{}'];
    chunks.forEach(function(chunk, index) {
      backupRows.push([
        timestamp,
        entry.sheet_name,
        entry.row_number,
        account.account_id,
        account.participant_rowId,
        maskParticipantNik(account.nik),
        index + 1,
        chunks.length,
        chunk
      ]);
    });
  });
  backupSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  backupSheet.getRange(2, 1, backupRows.length, headers.length).setValues(backupRows);
  backupSheet.setFrozenRows(1);
  if (typeof backupSheet.hideSheet === 'function') backupSheet.hideSheet();
  SpreadsheetApp.flush();
  return backupName;
}

function deleteQaResetRows(entries) {
  const rowsBySheet = {};
  entries.forEach(function(entry) {
    if (!rowsBySheet[entry.sheet_name]) rowsBySheet[entry.sheet_name] = [];
    rowsBySheet[entry.sheet_name].push(entry.row_number);
  });
  Object.keys(rowsBySheet).forEach(function(sheetName) {
    const sheet = getSheet(sheetName);
    rowsBySheet[sheetName].sort(function(a, b) { return b - a; }).forEach(function(rowNumber) {
      sheet.deleteRow(rowNumber);
    });
  });
}

/**
 * Reset destructive yang hanya berlaku untuk account_type=qa. Sebelum run,
 * set HERAI_QA_RESET_CONFIRMATION=RESET_QA_ONLY di Script Properties. Property
 * konfirmasi dihapus saat run dimulai agar setiap reset harus di-arm ulang.
 */
function resetQaParticipantData() {
  ensureParticipantBackendSchema();
  const properties = PropertiesService.getScriptProperties();
  const confirmation = properties.getProperty(QA_PARTICIPANT_PROPERTY_KEYS.resetConfirmation);
  if (confirmation !== QA_PARTICIPANT_RESET_CONFIRMATION) {
    throw new Error('Reset QA belum di-arm. Set HERAI_QA_RESET_CONFIRMATION=RESET_QA_ONLY lalu preview ulang.');
  }
  properties.deleteProperty(QA_PARTICIPANT_PROPERTY_KEYS.resetConfirmation);

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  let account = null;
  let previousStatus = '';
  let backupName = '';
  try {
    account = findConfiguredQaParticipantAccount();
    assertQaParticipantAccount(account, 'Reset QA');
    previousStatus = String(account.access_status || 'active').trim().toLowerCase() || 'active';
    updateByKey(SHEETS.participantAccounts, 'account_id', account.account_id, {
      access_status: 'disabled',
      updated_at: new Date().toISOString()
    });
    SpreadsheetApp.flush();

    const collected = collectQaParticipantResetRows(account);
    backupName = createQaResetBackup(account, collected.entries);
    deleteQaResetRows(collected.entries);
    updateByKey(SHEETS.participantAccounts, 'account_id', account.account_id, {
      access_status: previousStatus,
      last_login_at: '',
      updated_at: new Date().toISOString(),
      account_type: QA_PARTICIPANT_ACCOUNT_TYPE
    });
    clearAttemptLimit('participant-login:' + String(account.nik || '').replace(/\D/g, ''));
    SpreadsheetApp.flush();

    const verification = collectQaParticipantResetRows(account);
    if (verification.entries.length !== 0) {
      throw new Error('Read-back reset QA masih menemukan row terkait. Backup: ' + backupName);
    }
    const result = {
      status: 'success',
      account_id: account.account_id,
      masked_nik: maskParticipantNik(account.nik),
      deleted_rows: collected.entries.length,
      deleted_by_sheet: collected.counts,
      backup_sheet: backupName,
      access_status_restored: previousStatus,
      credentials_changed: 0,
      local_storage_reset_required: true
    };
    Logger.log(JSON.stringify(result));
    return result;
  } catch (error) {
    if (account && account.account_id && previousStatus) {
      updateByKey(SHEETS.participantAccounts, 'account_id', account.account_id, {
        access_status: previousStatus,
        updated_at: new Date().toISOString()
      });
      SpreadsheetApp.flush();
    }
    throw new Error(error.message + (backupName ? ' Backup tersedia: ' + backupName : ''));
  } finally {
    lock.releaseLock();
  }
}

function getPrelaunchLearningResetSheetNames() {
  return [
    SHEETS.participantProgress,
    SHEETS.participantActivity,
    SHEETS.participantDiscussions,
    SHEETS.participantExerciseSubmissions,
    SHEETS.participantDashboardLeaderboard,
    SHEETS.participantDashboardDiscussionTrails
  ];
}

function getPrelaunchResetRowsReadOnly(sheetName, spreadsheet) {
  const sourceSpreadsheet = spreadsheet || SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = sourceSpreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error('Preflight gagal: sheet tidak ditemukan: ' + sheetName);
  const values = sheet.getDataRange().getValues();
  if (!values.length || !values[0].length) {
    throw new Error('Preflight gagal: header sheet tidak tersedia: ' + sheetName);
  }
  const headers = values[0];
  const missingHeaders = (SCHEMA[sheetName] || []).filter(function(header) {
    return headers.indexOf(header) < 0;
  });
  if (missingHeaders.length) {
    throw new Error('Preflight gagal: header wajib tidak tersedia di ' + sheetName + ': ' + missingHeaders.join(', '));
  }
  return values.slice(1).filter(function(row) {
    return row.some(function(cell) { return cell !== ''; });
  }).map(function(row) {
    const object = {};
    headers.forEach(function(header, index) { object[header] = row[index]; });
    return object;
  });
}

function collectPrelaunchLearningResetState() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const rowsBySheet = {};
  let totalRows = 0;
  getPrelaunchLearningResetSheetNames().forEach(function(sheetName) {
    const rowCount = getPrelaunchResetRowsReadOnly(sheetName, spreadsheet).length;
    rowsBySheet[sheetName] = rowCount;
    totalRows += rowCount;
  });

  const accounts = getPrelaunchResetRowsReadOnly(SHEETS.participantAccounts, spreadsheet);
  const cohort = buildParticipantPortalAccessReconciliation(accounts).summary;
  const officialAccounts = accounts.filter(function(account) {
    return !isQaParticipantAccount(account) && isTargetParticipantForPortal(account);
  });
  const qaAccounts = accounts.filter(isQaParticipantAccount);
  const expectedAccountTotal = EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + qaAccounts.length;
  const changedPasswordAccounts = officialAccounts.filter(function(account) {
    return String(account.password_status || '').trim().toLowerCase() === 'changed';
  }).length;
  const previouslyLoggedInAccounts = officialAccounts.filter(function(account) {
    return Boolean(String(account.last_login_at || '').trim());
  }).length;
  const ready = cohort.ready_to_apply
    && cohort.matched_target_accounts === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT
    && cohort.outside_target_accounts === 0
    && cohort.qa_accounts === 1
    && cohort.total_accounts === expectedAccountTotal;

  return {
    rows_by_sheet: rowsBySheet,
    total_rows_to_delete: totalRows,
    cohort: cohort,
    official_accounts: officialAccounts.length,
    qa_accounts: qaAccounts.length,
    expected_account_total: expectedAccountTotal,
    previously_logged_in_official_accounts: previouslyLoggedInAccounts,
    changed_password_official_accounts: changedPasswordAccounts,
    ready_to_reset: ready
  };
}

/**
 * Preflight read-only untuk membersihkan seluruh state belajar sebelum portal
 * dibuka. Tidak mengubah account, credential, profil, atau data seleksi.
 */
function previewPrelaunchLearningReset() {
  const state = collectPrelaunchLearningResetState();
  const armed = PropertiesService.getScriptProperties()
    .getProperty(PRELAUNCH_LEARNING_RESET_PROPERTY_KEY) === PRELAUNCH_LEARNING_RESET_CONFIRMATION;
  const result = {
    status: 'success',
    ready_to_reset: state.ready_to_reset,
    reset_armed: armed,
    total_rows_to_delete: state.total_rows_to_delete,
    rows_by_sheet: state.rows_by_sheet,
    official_accounts: state.official_accounts,
    qa_accounts: state.qa_accounts,
    account_total: state.cohort.total_accounts,
    previously_logged_in_official_accounts: state.previously_logged_in_official_accounts,
    changed_password_official_accounts: state.changed_password_official_accounts,
    credentials_changed: 0,
    cohort: state.cohort
  };
  Logger.log(JSON.stringify(result));
  return result;
}

function createPrelaunchLearningResetBackups(sheetNames) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  const suffix = Utilities.getUuid().slice(0, 8);
  const backups = {};
  sheetNames.forEach(function(sheetName, index) {
    const source = getSheet(sheetName);
    ensureSchemaHeaders(source, SCHEMA[sheetName] || []);
    const backupName = ('PrelaunchReset_' + timestamp + '_' + (index + 1) + '_' + suffix).slice(0, 99);
    const backup = source.copyTo(spreadsheet).setName(backupName);
    backup.setFrozenRows(source.getFrozenRows());
    if (typeof backup.hideSheet === 'function') backup.hideSheet();
    backups[sheetName] = backupName;
  });
  SpreadsheetApp.flush();
  return backups;
}

function clearPrelaunchLearningSheets(sheetNames) {
  sheetNames.forEach(function(sheetName) {
    const sheet = getSheet(sheetName);
    ensureSchemaHeaders(sheet, SCHEMA[sheetName] || []);
    const lastRow = sheet.getLastRow();
    const lastColumn = sheet.getLastColumn();
    if (lastRow > 1 && lastColumn > 0) {
      sheet.getRange(2, 1, lastRow - 1, lastColumn).clearContent();
    }
  });
  SpreadsheetApp.flush();
}

function restorePrelaunchLearningResetBackups(backups, sheetNames) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const targetSheetNames = sheetNames || Object.keys(backups || {});
  targetSheetNames.forEach(function(sheetName) {
    const source = spreadsheet.getSheetByName(backups[sheetName]);
    const target = getSheet(sheetName);
    if (!source) throw new Error('Backup tidak ditemukan untuk rollback: ' + sheetName);
    target.clearContents();
    const values = source.getDataRange().getValues();
    if (values.length && values[0].length) {
      target.getRange(1, 1, values.length, values[0].length).setValues(values);
    }
    target.setFrozenRows(source.getFrozenRows());
  });
  SpreadsheetApp.flush();
}

function capturePrelaunchParticipantAccessSnapshot() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEETS.participantAccounts);
  if (!sheet) throw new Error('ParticipantAccounts tidak ditemukan.');
  const values = sheet.getDataRange().getValues();
  const headers = values[0] || [];
  const accessStatusIndex = headers.indexOf('access_status');
  if (accessStatusIndex < 0) throw new Error('Kolom access_status ParticipantAccounts tidak ditemukan.');
  const originalStatusValues = values.slice(1).map(function(row) {
    return [row[accessStatusIndex]];
  });
  const targetRowOffsets = [];
  values.slice(1).forEach(function(row, offset) {
    if (!row.some(function(cell) { return cell !== ''; })) return;
    const account = {};
    headers.forEach(function(header, index) { account[header] = row[index]; });
    if (isParticipantPortalAccountAllowed(account)) targetRowOffsets.push(offset);
  });
  if (targetRowOffsets.length !== EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + 1) {
    throw new Error('Suspend akses dibatalkan: target account bukan tepat 100 peserta + 1 QA.');
  }
  return {
    row_count: originalStatusValues.length,
    access_status_column: accessStatusIndex + 1,
    original_status_values: originalStatusValues,
    target_row_offsets: targetRowOffsets
  };
}

function suspendPrelaunchParticipantAccess(snapshot) {
  const sheet = getSheet(SHEETS.participantAccounts);
  const statusValues = snapshot.original_status_values.map(function(row) { return [row[0]]; });
  snapshot.target_row_offsets.forEach(function(offset) {
    statusValues[offset][0] = 'disabled';
  });
  sheet.getRange(2, snapshot.access_status_column, snapshot.row_count, 1).setValues(statusValues);
  SpreadsheetApp.flush();
}

function verifyPrelaunchParticipantAccessSuspended() {
  return getPrelaunchParticipantAccessSuspendState().stable;
}

function getPrelaunchParticipantAccessSuspendState() {
  const accounts = getPrelaunchResetRowsReadOnly(SHEETS.participantAccounts);
  const portalAccounts = accounts.filter(isParticipantPortalAccountAllowed);
  const activeAccounts = portalAccounts.filter(isParticipantAccountActive);
  const statusCounts = {};
  portalAccounts.forEach(function(account) {
    const status = String(account.access_status || '').trim().toLowerCase() || '(blank)';
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });
  return {
    stable: portalAccounts.length === EXPECTED_TARGET_PARTICIPANT_PORTAL_COUNT + 1
      && activeAccounts.length === 0,
    portal_accounts: portalAccounts.length,
    active_accounts: activeAccounts.length,
    inactive_accounts: portalAccounts.length - activeAccounts.length,
    status_counts: statusCounts
  };
}

function rotatePrelaunchAuthTokenSecret() {
  const nextSecret = Utilities.getUuid().replace(/-/g, '')
    + Utilities.getUuid().replace(/-/g, '');
  PropertiesService.getScriptProperties().setProperty('AUTH_TOKEN_SECRET', nextSecret);
  return true;
}

function suspendPrelaunchParticipantAccessUntilStable(snapshot) {
  const maxAttempts = 2;
  let lastState = getPrelaunchParticipantAccessSuspendState();
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    suspendPrelaunchParticipantAccess(snapshot);
    Utilities.sleep(5000);
    lastState = getPrelaunchParticipantAccessSuspendState();
    if (!lastState.stable) continue;
    Utilities.sleep(3000);
    lastState = getPrelaunchParticipantAccessSuspendState();
    if (lastState.stable) {
      return { stable: true, attempts: attempt, state: lastState };
    }
  }
  return { stable: false, attempts: maxAttempts, state: lastState };
}

function restorePrelaunchParticipantAccess(snapshot) {
  const sheet = getSheet(SHEETS.participantAccounts);
  sheet.getRange(2, snapshot.access_status_column, snapshot.row_count, 1)
    .setValues(snapshot.original_status_values);
  SpreadsheetApp.flush();
  const restored = sheet.getRange(2, snapshot.access_status_column, snapshot.row_count, 1).getValues();
  const matches = restored.every(function(row, index) {
    return String(row[0] || '') === String(snapshot.original_status_values[index][0] || '');
  });
  if (!matches) throw new Error('Status akses ParticipantAccounts gagal dipulihkan secara utuh.');
}

/**
 * Reset destruktif pra-rilis. Jalankan hanya setelah preview menunjukkan
 * ready_to_reset=true. Arm sekali pakai melalui Script Property:
 * HERAI_PRELAUNCH_LEARNING_RESET_CONFIRMATION=RESET_ALL_LEARNING_BEFORE_LAUNCH
 *
 * Seluruh sheet target dibackup dan disembunyikan sebelum data row dihapus.
 * ParticipantAccounts, peserta_tahap_1, credential, profil, serta data seleksi
 * tidak disentuh.
 */
function resetAllLearningDataBeforeLaunch() {
  ensureParticipantBackendSchema();
  const properties = PropertiesService.getScriptProperties();
  const confirmation = properties.getProperty(PRELAUNCH_LEARNING_RESET_PROPERTY_KEY);
  if (confirmation !== PRELAUNCH_LEARNING_RESET_CONFIRMATION) {
    throw new Error(
      'Reset belum di-arm. Set HERAI_PRELAUNCH_LEARNING_RESET_CONFIRMATION='
      + PRELAUNCH_LEARNING_RESET_CONFIRMATION + ' lalu jalankan preview ulang.'
    );
  }
  properties.deleteProperty(PRELAUNCH_LEARNING_RESET_PROPERTY_KEY);

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  const learningSheetNames = getPrelaunchLearningResetSheetNames();
  let backups = {};
  let accessSnapshot = null;
  let accessSuspended = false;
  let suspension = null;
  let authTokensInvalidated = false;
  let mutationStarted = false;
  let rollbackCompleted = false;
  try {
    const before = collectPrelaunchLearningResetState();
    if (!before.ready_to_reset) {
      throw new Error('Reset dibatalkan: cohort harus tepat 100 peserta resmi + 1 QA tanpa account di luar target.');
    }

    accessSnapshot = capturePrelaunchParticipantAccessSnapshot();
    backups = createPrelaunchLearningResetBackups(
      learningSheetNames.concat([SHEETS.participantAccounts])
    );
    suspendPrelaunchParticipantAccess(accessSnapshot);
    accessSuspended = true;
    authTokensInvalidated = rotatePrelaunchAuthTokenSecret();
    // Tunggu request lama selesai. Exercise submission dapat menunggu ScriptLock
    // hingga 30 detik setelah tokennya diverifikasi, jadi lock reset harus tetap
    // dipegang melewati batas tersebut sebelum sheet dibersihkan.
    Utilities.sleep(30000);
    suspension = suspendPrelaunchParticipantAccessUntilStable(accessSnapshot);
    mutationStarted = true;
    clearPrelaunchLearningSheets(learningSheetNames);

    const after = collectPrelaunchLearningResetState();
    const remainingRows = Object.keys(after.rows_by_sheet).reduce(function(total, sheetName) {
      return total + Number(after.rows_by_sheet[sheetName] || 0);
    }, 0);
    const readBack = {
      remaining_rows: remainingRows,
      rows_by_sheet: after.rows_by_sheet,
      ready_to_reset: after.ready_to_reset,
      account_total: after.cohort.total_accounts,
      official_accounts: after.official_accounts,
      qa_accounts: after.qa_accounts,
      suspension: suspension
    };
    if (remainingRows !== 0 || !after.ready_to_reset
      || after.cohort.total_accounts !== before.cohort.total_accounts
      || after.official_accounts !== before.official_accounts
      || after.qa_accounts !== before.qa_accounts) {
      restorePrelaunchLearningResetBackups(backups, learningSheetNames);
      rollbackCompleted = true;
      throw new Error(
        'Read-back reset tidak valid; data belajar telah dipulihkan dari backup. Diagnosis: '
        + JSON.stringify(readBack)
      );
    }

    restorePrelaunchParticipantAccess(accessSnapshot);
    accessSuspended = false;

    const result = {
      status: 'success',
      deleted_rows: before.total_rows_to_delete,
      deleted_by_sheet: before.rows_by_sheet,
      backup_sheets: backups,
      official_accounts_preserved: after.official_accounts,
      qa_accounts_preserved: after.qa_accounts,
      account_total_preserved: after.cohort.total_accounts,
      access_statuses_restored: true,
      access_suspend_stable: Boolean(suspension && suspension.stable),
      access_suspend_diagnostic: suspension && suspension.state || {},
      auth_tokens_invalidated: authTokensInvalidated,
      admin_relogin_required: authTokensInvalidated,
      participant_relogin_required: authTokensInvalidated,
      credentials_changed: 0,
      local_storage_reset_required: true
    };
    Logger.log(JSON.stringify(result));
    return result;
  } catch (error) {
    let rollbackMessage = '';
    if (mutationStarted && !rollbackCompleted && Object.keys(backups).length) {
      try {
        restorePrelaunchLearningResetBackups(backups, learningSheetNames);
        rollbackCompleted = true;
        rollbackMessage = ' Data belajar telah dipulihkan otomatis dari backup.';
      } catch (rollbackError) {
        rollbackMessage = ' Rollback otomatis gagal: ' + rollbackError.message + '.';
      }
    }
    let accessRestoreMessage = '';
    if (accessSuspended && accessSnapshot) {
      try {
        restorePrelaunchParticipantAccess(accessSnapshot);
        accessSuspended = false;
        accessRestoreMessage = ' Status akses telah dipulihkan.';
      } catch (accessError) {
        accessRestoreMessage = ' Pemulihan status akses gagal: ' + accessError.message + '.';
      }
    }
    const tokenMessage = authTokensInvalidated
      ? ' Token sesi lama sudah diinvalidasi; login ulang diperlukan.'
      : '';
    throw new Error(error.message + rollbackMessage + accessRestoreMessage + tokenMessage + (Object.keys(backups).length
      ? ' Backup tersedia: ' + JSON.stringify(backups)
      : ''));
  } finally {
    lock.releaseLock();
  }
}

function generateParticipantPassword(length) {
  const size = Math.max(12, Number(length || 12));
  const groups = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnopqrstuvwxyz', '23456789', '!#$%?_'];
  const all = groups.join('');
  const seed = Utilities.getUuid() + Utilities.getUuid() + new Date().getTime();
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, seed).map(function(value) {
    return value < 0 ? value + 256 : value;
  });
  let password = 'H';
  groups.forEach(function(group, index) {
    password += group.charAt(bytes[index] % group.length);
  });
  let cursor = groups.length;
  while (password.length < size) {
    password += all.charAt(bytes[cursor % bytes.length] % all.length);
    cursor += 1;
  }
  return password.slice(0, size);
}

function recordParticipantActivity(payload) {
  const nik = String(payload.nik || '').replace(/\D/g, '');
  const participant = nik ? findParticipantByNik(nik) : null;
  const details = payload.details || payload.payload || {};
  addRowObject(SHEETS.participantActivity, {
    activity_id: payload.activity_id || ('act_' + Utilities.getUuid()),
    timestamp: payload.timestamp || new Date().toISOString(),
    nik: nik,
    nama_lengkap: payload.nama_lengkap || (participant && participant.nama_lengkap) || '',
    activity_type: payload.activity_type || payload.type || 'activity',
    page: payload.page || '',
    module_id: payload.module_id || payload.moduleId || '',
    lesson_id: payload.lesson_id || payload.lessonId || '',
    activity: payload.activity || '',
    score: payload.score !== undefined ? payload.score : '',
    total: payload.total !== undefined ? payload.total : '',
    payload_json: JSON.stringify(details),
    user_agent: payload.user_agent || payload.userAgent || '',
    session_id: payload.session_id || payload.sessionId || ''
  });
  return { status: 'success' };
}

function setParticipantPassword(payload) {
  if (!payload.nik || !payload.password) return { status: 'error', message: 'NIK dan password wajib diisi.' };
  if (String(payload.password).length < 6) return { status: 'error', message: 'Password minimal 6 karakter.' };
  const participant = findParticipantByNik(payload.nik);
  if (!participant) return { status: 'error', message: 'NIK belum terdaftar.' };
  if (participant.participant_password) return { status: 'error', message: 'Password sudah dibuat. Silakan login.' };
  updateByKey(SHEETS.participants, 'nik', participant.nik, {
    participant_password: hashPasswordValue(payload.password),
    participant_stage: normalizeParticipantStage(participant.participant_stage),
    profile_updated_at: new Date().toISOString()
  });
  const updated = findParticipantByNik(payload.nik);
  return { status: 'success', profile: stripSensitiveParticipant(updated) };
}

function changeParticipantPassword(payload) {
  var claims = payload.__auth || requireParticipantToken(payload);
  if (!payload.oldPassword || !payload.newPassword) {
    return { status: 'error', message: 'Password lama dan baru wajib diisi.' };
  }
  if (String(payload.newPassword).length < 6) {
    return { status: 'error', message: 'Password baru minimal 6 karakter.' };
  }
  if (payload.oldPassword === payload.newPassword) {
    return { status: 'error', message: 'Password baru tidak boleh sama dengan password lama.' };
  }

  var participants = getRows(SHEETS.participants);
  var participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };

  var account = findParticipantAccount(participant.nik);
  var storedHash = (account && account.password_hash) || participant.participant_password || '';
  if (!verifyPasswordValue(storedHash, payload.oldPassword)) {
    return { status: 'error', message: 'Password lama tidak sesuai.' };
  }

  var newHash = hashPasswordValue(payload.newPassword);
  var now = new Date().toISOString();

  if (account && account.account_id) {
    updateByKey(SHEETS.participantAccounts, 'account_id', account.account_id, {
      password_hash: newHash,
      password_status: 'changed',
      updated_at: now
    });
  }
  updateByKey(SHEETS.participants, 'rowId', participant.rowId, {
    participant_password: newHash,
    profile_updated_at: now
  });

  recordParticipantActivity({
    nik: participant.nik,
    nama_lengkap: participant.nama_lengkap,
    activity_type: 'password_change',
    activity: 'Mengganti password mandiri'
  });

  return { status: 'success', message: 'Password berhasil diganti.' };
}

function saveParticipantProgress(payload) {
  var claims = payload.__auth || requireParticipantToken(payload);
  if (!payload.module_id || !payload.chapter_id) {
    return { status: 'error', message: 'module_id dan chapter_id wajib diisi.' };
  }

  var participants = getRows(SHEETS.participants);
  var participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };

  var now = new Date().toISOString();
  var moduleId = String(payload.module_id);
  var chapterId = String(payload.chapter_id);
  var status = payload.status || 'completed';
  var score = payload.score !== undefined ? Number(payload.score) : null;
  var participantRowId = String(participant.rowId || '');

  var progressRows = getRows(SHEETS.participantProgress);
  var existing = progressRows.find(function(row) {
    return String(row.participant_rowId || '') === participantRowId
      && String(row.module_id || '') === moduleId
      && String(row.chapter_id || '') === chapterId;
  });

  if (existing && existing.progress_id) {
    var updateFields = { status: status, updated_at: now };
    if (score !== null) updateFields.score = score;
    if (status === 'completed' && !existing.completed_at) {
      updateFields.completed_at = now;
    }
    if (!existing.started_at) {
      updateFields.started_at = now;
    }
    updateByKey(SHEETS.participantProgress, 'progress_id', existing.progress_id, updateFields);
  } else {
    addRowObject(SHEETS.participantProgress, {
      progress_id: 'prg_' + Utilities.getUuid(),
      participant_rowId: participantRowId,
      nik: String(participant.nik || '').replace(/\D/g, ''),
      module_id: moduleId,
      chapter_id: chapterId,
      status: status,
      score: score,
      started_at: now,
      completed_at: status === 'completed' ? now : '',
      updated_at: now
    });
  }

  recordParticipantActivity({
    nik: participant.nik,
    nama_lengkap: participant.nama_lengkap,
    activity_type: 'progress_update',
    module_id: moduleId,
    lesson_id: chapterId,
    activity: 'Progress: ' + status + ' - ' + moduleId + '/' + chapterId,
    score: score
  });

  return { status: 'success' };
}

function getParticipantProgress(payload) {
  var claims = payload.__auth || requireParticipantToken(payload);
  var participants = getRows(SHEETS.participants);
  var participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };

  var participantRowId = String(participant.rowId || '');
  var allProgress = getRows(SHEETS.participantProgress).filter(function(row) {
    return String(row.participant_rowId || '') === participantRowId;
  });

  if (payload.module_id) {
    allProgress = allProgress.filter(function(row) {
      return String(row.module_id || '') === String(payload.module_id);
    });
  }

  return {
    status: 'success',
    data: allProgress.map(function(row) {
      return {
        progress_id: row.progress_id,
        module_id: row.module_id,
        chapter_id: row.chapter_id,
        status: row.status,
        score: row.score !== undefined ? Number(row.score) : null,
        started_at: row.started_at,
        completed_at: row.completed_at,
        updated_at: row.updated_at
      };
    })
  };
}

function saveParticipantDiscussion(payload) {
  var claims = payload.__auth || requireParticipantToken(payload);
  var moduleId = String(payload.module_id || '').trim().slice(0, 100);
  var text = String(payload.text || '').trim().slice(0, 5000);
  if (!moduleId || !text) {
    return { status: 'error', message: 'module_id dan isi diskusi wajib diisi.' };
  }

  var participants = getRows(SHEETS.participants);
  var participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };

  var participantRowId = String(participant.rowId || '');
  var discussionId = String(payload.discussion_id || '').trim() || ('dsc_' + Utilities.getUuid());
  var existing = getRows(SHEETS.participantDiscussions).find(function(row) {
    return String(row.discussion_id || '') === discussionId;
  });
  if (existing && String(existing.participant_rowId || '') !== participantRowId) {
    return { status: 'error', message: 'Diskusi tidak dapat diubah oleh peserta ini.' };
  }

  var replies = Array.isArray(payload.replies) ? payload.replies.slice(0, 50).map(function(reply) {
    return {
      text: String(reply && reply.text || '').trim().slice(0, 2000),
      createdAt: String(reply && reply.createdAt || new Date().toISOString())
    };
  }).filter(function(reply) { return Boolean(reply.text); }) : [];
  var now = new Date().toISOString();
  var discussion = {
    discussion_id: discussionId,
    participant_rowId: participantRowId,
    nik: String(participant.nik || '').replace(/\D/g, ''),
    module_id: moduleId,
    prompt: String(payload.prompt || 'Diskusi').trim().slice(0, 300),
    text: text,
    replies_json: JSON.stringify(replies),
    created_at: existing && existing.created_at ? existing.created_at : String(payload.created_at || now),
    updated_at: now
  };

  if (existing) {
    updateByKey(SHEETS.participantDiscussions, 'discussion_id', discussionId, discussion);
  } else {
    addRowObject(SHEETS.participantDiscussions, discussion);
  }

  recordParticipantActivity({
    nik: participant.nik,
    nama_lengkap: participant.nama_lengkap,
    activity_type: existing ? 'discussion_reply' : 'discussion_post',
    module_id: moduleId,
    lesson_id: discussionId,
    activity: existing ? 'Memperbarui diskusi module' : 'Membuat diskusi module'
  });

  return {
    status: 'success',
    discussion: {
      id: discussionId,
      module_id: moduleId,
      prompt: discussion.prompt,
      text: discussion.text,
      replies: replies,
      createdAt: discussion.created_at,
      updatedAt: discussion.updated_at
    }
  };
}

function getParticipantDiscussions(payload) {
  var claims = payload.__auth || requireParticipantToken(payload);
  var participants = getRows(SHEETS.participants);
  var participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };

  var participantRowId = String(participant.rowId || '');
  var moduleId = String(payload.module_id || '').trim();
  var rows = getRows(SHEETS.participantDiscussions).filter(function(row) {
    return String(row.participant_rowId || '') === participantRowId
      && (!moduleId || String(row.module_id || '') === moduleId);
  });

  return {
    status: 'success',
    data: rows.map(function(row) {
      var replies = [];
      try { replies = JSON.parse(row.replies_json || '[]'); } catch (error) { replies = []; }
      return {
        id: row.discussion_id,
        module_id: row.module_id,
        prompt: row.prompt,
        text: row.text,
        replies: Array.isArray(replies) ? replies : [],
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    }).sort(function(a, b) {
      return String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || ''));
    })
  };
}

function normalizeParticipantExerciseInput(payload) {
  var moduleId = String(payload.module_id || payload.moduleId || '').trim();
  var exerciseId = String(payload.exercise_id || payload.exerciseId || 'practice').trim();
  if (ACTIVE_FOUNDATION_MODULE_IDS.indexOf(moduleId) < 0) {
    throw new Error('Module latihan tidak aktif atau tidak dikenali.');
  }
  if (!/^[a-z0-9][a-z0-9_-]{0,79}$/i.test(exerciseId)) {
    throw new Error('exercise_id tidak valid.');
  }
  var source = payload.answers;
  if (!source || typeof source !== 'object' || Array.isArray(source)) {
    throw new Error('Jawaban latihan wajib dikirim dalam format object.');
  }
  var answers = {};
  Object.keys(source).slice(0, 100).forEach(function(key) {
    var cleanKey = String(key || '').trim().slice(0, 120);
    if (!cleanKey) return;
    answers[cleanKey] = String(source[key] == null ? '' : source[key]).trim().slice(0, 10000);
  });
  var answerCount = Object.keys(answers).filter(function(key) { return Boolean(answers[key]); }).length;
  if (!answerCount) throw new Error('Isi minimal satu jawaban sebelum menyimpan.');
  var answersJson = JSON.stringify(answers);
  if (answersJson.length > 45000) {
    throw new Error('Jawaban latihan terlalu panjang. Ringkas jawaban lalu coba lagi.');
  }
  return {
    moduleId: moduleId,
    exerciseId: exerciseId,
    answers: answers,
    answersJson: answersJson,
    answerCount: answerCount
  };
}

function findAuthenticatedParticipant(claims) {
  var participants = getRows(SHEETS.participants);
  return participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
}

function participantExerciseForClient(row) {
  var answers = {};
  try { answers = JSON.parse(row.answers_json || '{}'); } catch (error) { answers = {}; }
  return {
    submission_id: row.submission_id,
    module_id: row.module_id,
    exercise_id: row.exercise_id,
    answers: answers && typeof answers === 'object' && !Array.isArray(answers) ? answers : {},
    answer_count: Number(row.answer_count || 0),
    status: row.status || 'draft',
    submitted_at: row.submitted_at || '',
    updated_at: row.updated_at || '',
    score: row.score === '' || row.score == null ? null : Number(row.score),
    feedback: row.feedback || '',
    reviewed_at: row.reviewed_at || ''
  };
}

function saveParticipantExerciseSubmission(payload, requestedStatus) {
  var claims = payload.__auth || requireParticipantToken(payload);
  var participant = findAuthenticatedParticipant(claims);
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };
  var input = normalizeParticipantExerciseInput(payload);
  var participantRowId = String(participant.rowId || claims.rowId || '');
  var nik = String(participant.nik || claims.sub || '').replace(/\D/g, '');
  var submissionKey = [participantRowId || nik, input.moduleId, input.exerciseId].join('|');
  var now = new Date().toISOString();
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  var savedRow;
  try {
    var existing = getRows(SHEETS.participantExerciseSubmissions).find(function(row) {
      return String(row.submission_key || '') === submissionKey;
    });
    var existingStatus = String(existing && existing.status || '').toLowerCase();
    if (existingStatus === 'reviewed') {
      throw new Error('Latihan sudah direview dan tidak dapat diubah. Hubungi mentor jika perlu revisi.');
    }
    if (requestedStatus === 'draft' && existingStatus === 'submitted') {
      throw new Error('Latihan sudah dikirim. Gunakan Kirim Latihan untuk memperbarui submission.');
    }
    // Completeness check: submit wajib seluruh jawaban terisi sesuai module.
    if (requestedStatus === 'submitted') {
      var expectedCount = EXPECTED_EXERCISE_ANSWER_COUNTS[input.moduleId] || 0;
      if (input.answerCount < expectedCount) {
        throw new Error('Jawaban latihan belum lengkap. Isi seluruh ' + expectedCount + ' jawaban sebelum mengirim. Baru ' + input.answerCount + ' yang terisi.');
      }
    }
    savedRow = {
      submission_id: existing && existing.submission_id || ('sub_' + Utilities.getUuid()),
      submission_key: submissionKey,
      participant_rowId: participantRowId,
      nik: nik,
      nama_lengkap: participant.nama_lengkap || '',
      module_id: input.moduleId,
      exercise_id: input.exerciseId,
      answers_json: input.answersJson,
      answer_count: input.answerCount,
      status: requestedStatus,
      submitted_at: requestedStatus === 'submitted' ? now : (existing && existing.submitted_at || ''),
      updated_at: now,
      reviewer_id: existing && existing.reviewer_id || '',
      score: existing && existing.score !== undefined ? existing.score : '',
      feedback: existing && existing.feedback || '',
      reviewed_at: existing && existing.reviewed_at || ''
    };
    if (existing && existing.submission_id) {
      updateByKey(SHEETS.participantExerciseSubmissions, 'submission_id', existing.submission_id, savedRow);
    } else {
      addRowObject(SHEETS.participantExerciseSubmissions, savedRow);
    }
  } finally {
    lock.releaseLock();
  }

  if (requestedStatus === 'submitted') {
    saveParticipantProgress(Object.assign({}, payload, {
      __auth: claims,
      module_id: input.moduleId,
      chapter_id: 'practice',
      status: 'completed',
      score: undefined
    }));
  }
  recordParticipantActivity({
    nik: nik,
    nama_lengkap: participant.nama_lengkap,
    activity_type: requestedStatus === 'submitted' ? 'exercise_submitted' : 'exercise_draft_saved',
    module_id: input.moduleId,
    lesson_id: input.exerciseId,
    activity: requestedStatus === 'submitted' ? 'Mengirim latihan untuk review' : 'Menyimpan draft latihan',
    payload: { submission_id: savedRow.submission_id, answer_count: input.answerCount }
  });
  return { status: 'success', submission: participantExerciseForClient(savedRow) };
}

function saveParticipantExerciseDraft(payload) {
  return saveParticipantExerciseSubmission(payload, 'draft');
}

function submitParticipantExercise(payload) {
  return saveParticipantExerciseSubmission(payload, 'submitted');
}

function getParticipantExerciseSubmissions(payload) {
  var claims = payload.__auth || requireParticipantToken(payload);
  var participant = findAuthenticatedParticipant(claims);
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.', data: [] };
  var participantRowId = String(participant.rowId || claims.rowId || '');
  var moduleId = String(payload.module_id || payload.moduleId || '').trim();
  var exerciseId = String(payload.exercise_id || payload.exerciseId || '').trim();
  var rows = getRows(SHEETS.participantExerciseSubmissions).filter(function(row) {
    return String(row.participant_rowId || '') === participantRowId
      && (!moduleId || String(row.module_id || '') === moduleId)
      && (!exerciseId || String(row.exercise_id || '') === exerciseId);
  });
  return {
    status: 'success',
    data: rows.map(participantExerciseForClient).sort(function(a, b) {
      return String(b.updated_at || '').localeCompare(String(a.updated_at || ''));
    })
  };
}

function getExerciseSubmissions(payload) {
  var moduleId = String(payload.module_id || payload.moduleId || '').trim();
  var status = String(payload.submission_status || payload.status_filter || '').trim().toLowerCase();
  var query = String(payload.query || '').trim().toLowerCase().slice(0, 120);
  var rows = getRows(SHEETS.participantExerciseSubmissions).filter(function(row) {
    if (moduleId && String(row.module_id || '') !== moduleId) return false;
    if (status && String(row.status || '').toLowerCase() !== status) return false;
    if (!query) return true;
    return [row.nama_lengkap, row.nik, row.module_id].some(function(value) {
      return String(value || '').toLowerCase().indexOf(query) >= 0;
    });
  }).sort(function(a, b) {
    return String(b.submitted_at || b.updated_at || '').localeCompare(String(a.submitted_at || a.updated_at || ''));
  }).slice(0, 500);
  return {
    status: 'success',
    data: rows.map(function(row) {
      return Object.assign(participantExerciseForClient(row), {
        nik: String(row.nik || '').replace(/\D/g, ''),
        nama_lengkap: row.nama_lengkap || '',
        reviewer_id: row.reviewer_id || ''
      });
    })
  };
}

function reviewExerciseSubmission(payload) {
  var claims = payload.__adminAuth || requireAdminToken(payload);
  var submissionId = String(payload.submission_id || '').trim();
  var rawScore = payload.score;
  var score = Number(rawScore);
  var feedback = String(payload.feedback || '').trim().slice(0, 5000);
  if (!submissionId) return { status: 'error', message: 'submission_id wajib diisi.' };
  if (rawScore === '' || rawScore == null || !isFinite(score) || score < 0 || score > 100) {
    return { status: 'error', message: 'Nilai harus berupa angka 0 sampai 100.' };
  }
  var existing = getRows(SHEETS.participantExerciseSubmissions).find(function(row) {
    return String(row.submission_id || '') === submissionId;
  });
  if (!existing) return { status: 'error', message: 'Submission latihan tidak ditemukan.' };
  if (String(existing.status || '').toLowerCase() === 'draft') {
    return { status: 'error', message: 'Draft belum dapat direview sebelum dikirim peserta.' };
  }
  var now = new Date().toISOString();
  var reviewerId = String(claims.sub || '');
  updateByKey(SHEETS.participantExerciseSubmissions, 'submission_id', submissionId, {
    status: 'reviewed',
    reviewer_id: reviewerId,
    score: score,
    feedback: feedback,
    reviewed_at: now,
    updated_at: now
  });
  logActivity({
    adminId: reviewerId,
    tindakan: 'Review latihan ' + existing.module_id + ' milik ' + (existing.nama_lengkap || existing.nik || 'peserta') + ' dengan nilai ' + score,
    perangkat: payload.perangkat || payload.device || 'Dashboard Admin',
    lokasi: payload.lokasi || 'Learning Content'
  });
  var updated = Object.assign({}, existing, {
    status: 'reviewed', reviewer_id: reviewerId, score: score,
    feedback: feedback, reviewed_at: now, updated_at: now
  });
  return { status: 'success', submission: Object.assign(participantExerciseForClient(updated), {
    nik: String(updated.nik || '').replace(/\D/g, ''),
    nama_lengkap: updated.nama_lengkap || '',
    reviewer_id: reviewerId
  }) };
}

function updateParticipantProfile(payload) {
  const claims = payload.__auth || requireParticipantToken(payload);
  const participants = getRows(SHEETS.participants);
  const participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'NIK belum terdaftar.' };
  const allowed = {};
  ['nama_lengkap', 'email', 'whatsapp', 'alamat', 'cv_link'].forEach(function(field) {
    if (Object.prototype.hasOwnProperty.call(payload, field)) allowed[field] = payload[field];
  });
  allowed.profile_updated_at = new Date().toISOString();
  const updateResult = updateByKey(SHEETS.participants, 'rowId', participant.rowId, allowed);
  if (!updateResult || updateResult.status !== 'success') {
    return updateResult || { status: 'error', message: 'Profil peserta gagal diperbarui.' };
  }
  const updated = getRows(SHEETS.participants).find(function(row) {
    return String(row.rowId || '') === String(participant.rowId || '');
  });
  return { status: 'success', profile: stripSensitiveParticipant(updated) };
}

function uploadParticipantPhoto(payload) {
  const claims = payload.__auth || requireParticipantToken(payload);
  const participants = getRows(SHEETS.participants);
  const participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'NIK belum terdaftar.' };

  const base64Data = String(payload.photo_base64 || '');
  if (!base64Data) return { status: 'error', message: 'Data foto kosong.' };

  // Validate it's a data URL
  if (!base64Data.match(/^data:image\//)) {
    return { status: 'error', message: 'Format foto tidak valid.' };
  }

  // Simpan base64 data URL langsung ke sheet (200x200 JPEG ≈ 15KB, muat dalam cell)
  updateByKey(SHEETS.participants, 'rowId', participant.rowId, { photo_url: base64Data });
  return { status: 'success', photo_url: base64Data };
}

function removeParticipantPhoto(payload) {
  const claims = payload.__auth || requireParticipantToken(payload);
  const participants = getRows(SHEETS.participants);
  const participant = participants.find(function(row) {
    return claims.rowId && String(row.rowId || '') === String(claims.rowId);
  }) || participants.find(function(row) {
    return String(row.nik || '').replace(/\D/g, '') === String(claims.sub || '');
  });
  if (!participant) return { status: 'error', message: 'NIK belum terdaftar.' };

  updateByKey(SHEETS.participants, 'rowId', participant.rowId, { photo_url: '' });
  return { status: 'success', photo_url: '' };
}

function stripSensitiveParticipant(participant) {
  const clone = { ...participant };
  delete clone.participant_password;
  return clone;
}

function hashPasswordValue(password) {
  const value = String(password || '');
  if (!value) return '';
  if (isPasswordHash(value)) return value;
  const salt = Utilities.getUuid().replace(/-/g, '');
  const pepper = getPasswordPepper();
  const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + ':' + value + ':' + pepper);
  return PASSWORD_HASH_PREFIX + salt + '$' + bytesToHex(digest);
}

function verifyPasswordValue(stored, password) {
  const current = String(stored || '');
  const value = String(password || '');
  if (!current || !value) return false;
  if (!isPasswordHash(current)) return current === value;
  const parts = current.split('$');
  if (parts.length !== 4 || parts[0] !== 'pw' || parts[1] !== '1') return false;
  const salt = parts[2];
  const expected = parts[3];
  const peppers = [getPasswordPepper()].concat(LEGACY_PASSWORD_PEPPERS).filter(function(pepper, index, values) {
    return pepper && values.indexOf(pepper) === index;
  });
  return peppers.some(function(pepper) {
    const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + ':' + value + ':' + pepper);
    return safeStringEquals(expected, bytesToHex(digest));
  });
}

function verifyPasswordValueCurrent(stored, password) {
  const current = String(stored || '');
  const value = String(password || '');
  if (!current || !value || !isPasswordHash(current)) return false;
  const parts = current.split('$');
  if (parts.length !== 4 || parts[0] !== 'pw' || parts[1] !== '1') return false;
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    parts[2] + ':' + value + ':' + getPasswordPepper()
  );
  return safeStringEquals(parts[3], bytesToHex(digest));
}

function getPasswordPepper() {
  const properties = PropertiesService.getScriptProperties();
  let pepper = properties.getProperty('PASSWORD_PEPPER');
  if (pepper) return pepper;
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    pepper = properties.getProperty('PASSWORD_PEPPER');
    if (!pepper) {
      pepper = Utilities.getUuid().replace(/-/g, '') + Utilities.getUuid().replace(/-/g, '');
      properties.setProperty('PASSWORD_PEPPER', pepper);
    }
    return pepper;
  } finally {
    lock.releaseLock();
  }
}

function isPasswordHash(value) {
  return String(value || '').indexOf(PASSWORD_HASH_PREFIX) === 0;
}

function migrateParticipantPasswordIfNeeded(participant, password) {
  if (!participant || verifyPasswordValueCurrent(participant.participant_password, password)) return;
  updateByKey(SHEETS.participants, 'nik', participant.nik, {
    participant_password: hashPasswordValue(password),
    profile_updated_at: new Date().toISOString()
  });
}

function migrateAdminPasswordIfNeeded(admin, password) {
  if (!admin || isPasswordHash(admin.password)) return;
  updateByKey(SHEETS.admins, 'id_admin', admin.id_admin || admin.adminId, {
    password: hashPasswordValue(password)
  });
}

function bytesToHex(bytes) {
  return bytes.map(function(byte) {
    const value = (byte < 0 ? byte + 256 : byte).toString(16);
    return value.length === 1 ? '0' + value : value;
  }).join('');
}

function safeStringEquals(a, b) {
  const left = String(a || '');
  const right = String(b || '');
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return diff === 0;
}

function enforceAttemptLimit(key, maxAttempts, ttlSeconds) {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'attempt:' + String(key || '').slice(0, 180);
  const attempts = Number(cache.get(cacheKey) || 0);
  if (attempts >= Number(maxAttempts || 8)) {
    throw new Error('Terlalu banyak percobaan. Silakan tunggu beberapa menit.');
  }
  cache.put(cacheKey, String(attempts + 1), Number(ttlSeconds || 600));
}

function clearAttemptLimit(key) {
  CacheService.getScriptCache().remove('attempt:' + String(key || '').slice(0, 180));
}

function findParticipantByNik(nik) {
  const cleanNik = String(nik || '').replace(/\D/g, '');
  return getRows(SHEETS.participants).find(p => String(p.nik || '').replace(/\D/g, '') === cleanNik);
}

function normalizeParticipantStage(stage) {
  if (!stage || stage === 'profile_created') return 'registered';
  return stage;
}

function updateParticipantStatus(payload) {
  const status = payload.status || payload.newStatus;
  return updateByKey(SHEETS.participants, 'rowId', payload.rowId, {
    status_seleksi: status,
    participant_stage: status === 'lolos' ? 'accepted_stage_1' : 'rejected_stage_1'
  });
}

function updateScore(payload) {
  return updateByKey(SHEETS.participants, 'rowId', payload.rowId, {
    skor_logika: payload.skor_logika,
    skor_motivasi: payload.skor_motivasi,
    skor_teknis: payload.skor_teknis,
    skor_latar: payload.skor_latar,
    skor_akhir: payload.skor_akhir,
    participant_stage: 'reviewed'
  });
}

function getCompetencyQuestions() {
  let questions = getRows(SHEETS.competencyQuestions).filter(q => String(q.status || 'active') === 'active');
  if (questions.length === 0) {
    seedCompetencyQuestions();
    questions = getRows(SHEETS.competencyQuestions).filter(q => String(q.status || 'active') === 'active');
  }
  return {
    status: 'success',
    questions: questions.map(q => ({
      id: q.id,
      section: q.section || q.type,
      type: q.type || q.section,
      difficulty: q.difficulty || 'standard',
      question: q.question,
      options: String(q.options || '').split('|').filter(Boolean),
      points: Number(q.points || 1)
    }))
  };
}

function getReTestAccess() {
  ensureReTestDemoAccess();
  return { status: 'success', access: getRows(SHEETS.retestAccess) };
}

function ensureReTestDemoAccess() {
  const accessId = 'rt_demo_3276010101010001';
  const existing = getRows(SHEETS.retestAccess).find(row => String(row.access_id) === accessId);
  if (existing) return existing;
  const now = new Date().toISOString();
  const demo = {
    access_id: accessId,
    nik: '3276010101010001',
    nama_lengkap: 'Alya Putri Demo',
    access_code: 'RT-DEMO-2026',
    status: 'active',
    notes: 'Akun testing Re-Test',
    created_at: now,
    updated_at: now,
    used_at: ''
  };
  addRowObject(SHEETS.retestAccess, demo);
  return demo;
}

function generateReTestAccess(payload) {
  const nik = String(payload.nik || '').replace(/\D/g, '');
  if (nik.length !== 16) return { status: 'error', message: 'NIK harus 16 digit.' };
  const participant = findParticipantByNik(nik);
  const now = new Date().toISOString();
  const previous = getRows(SHEETS.retestAccess).find(row => String(row.nik) === nik);
  const access = {
    access_id: previous && previous.access_id ? previous.access_id : 'rt_' + nik,
    nik,
    nama_lengkap: payload.nama_lengkap || (participant && participant.nama_lengkap) || 'Peserta Re-Test',
    access_code: generateReTestCode(),
    status: 'active',
    notes: payload.notes || '',
    created_at: previous && previous.created_at ? previous.created_at : now,
    updated_at: now,
    used_at: previous && previous.used_at ? previous.used_at : ''
  };
  upsertByKey(SHEETS.retestAccess, 'access_id', access.access_id, access);
  return { status: 'success', access };
}

function generateReTestCode() {
  return 'RT-' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
}

function retestLogin(payload) {
  ensureReTestDemoAccess();
  const nik = String(payload.nik || '').replace(/\D/g, '');
  const accessCode = String(payload.access_code || payload.code || '').trim().toUpperCase();
  if (nik.length !== 16) return { status: 'error', message: 'NIK harus 16 digit.' };
  if (!accessCode) return { status: 'error', message: 'Kode unik wajib diisi.' };
  enforceAttemptLimit('retest-login:' + nik, 8, 10 * 60);
  const access = getRows(SHEETS.retestAccess).find(row =>
    String(row.nik || '').replace(/\D/g, '') === nik &&
    String(row.access_code || '').trim().toUpperCase() === accessCode &&
    String(row.status || 'active').toLowerCase() === 'active'
  );
  if (!access) return { status: 'error', message: 'NIK atau kode unik Re-Test tidak valid.' };
  updateByKey(SHEETS.retestAccess, 'access_id', access.access_id, { used_at: new Date().toISOString() });
  clearAttemptLimit('retest-login:' + nik);
  const auth = issueAuthToken('participant', nik, {
    scope: 'retest',
    accessId: String(access.access_id || '')
  }, AUTH_TOKEN_TTL_SECONDS.retest);
  return {
    status: 'success',
    token: auth.token,
    expires_at: auth.expires_at,
    profile: {
      nik,
      nama_lengkap: access.nama_lengkap || 'Peserta Re-Test',
      retest_access_id: access.access_id
    }
  };
}

function startCompetencySession(payload, sessionSheet) {
  sessionSheet = sessionSheet || SHEETS.competencySessions;
  const prefix = sessionSheet === SHEETS.retestSessions ? 'rt' : 'ct';
  const sessionId = payload.session_id || [prefix, payload.nik, Date.now()].join('_');
  assertCompetencySessionOwner(sessionSheet, sessionId, payload.nik);
  const now = new Date().toISOString();
  const session = {
    session_id: sessionId,
    nik: payload.nik,
    nama_lengkap: payload.nama_lengkap,
    status: payload.status || 'started',
    camera_status: payload.camera_status || 'unknown',
    mic_status: payload.mic_status || 'unknown',
    answered_count: Number(payload.answered_count || 0),
    total_questions: Number(payload.total_questions || 0),
    score: '',
    weighted_score: '',
    section_scores: '{}',
    answers: '{}',
    focus_flags: Number(payload.focus_flags || 0),
    page_visible: true,
    active_section: payload.active_section || '',
    section_remaining: JSON.stringify(payload.section_remaining || {}),
    completed_sections: JSON.stringify(payload.completed_sections || []),
    camera_snapshot: payload.camera_snapshot || '',
    history_events: JSON.stringify([{ at: now, event: payload.status || 'started', section: payload.active_section || '', answered_count: Number(payload.answered_count || 0), focus_flags: Number(payload.focus_flags || 0) }]),
    started_at: now,
    updated_at: now,
    submitted_at: ''
  };
  upsertByKey(sessionSheet, 'session_id', sessionId, session);
  return { status: 'success', session };
}

function heartbeatCompetencySession(payload, sessionSheet) {
  sessionSheet = sessionSheet || SHEETS.competencySessions;
  if (!payload.session_id) return { status: 'error', message: 'session_id wajib diisi.' };
  assertCompetencySessionOwner(sessionSheet, payload.session_id, payload.nik);
  const updates = {
    status: payload.status || 'started',
    camera_status: payload.camera_status || 'unknown',
    mic_status: payload.mic_status || 'unknown',
    answered_count: Number(payload.answered_count || 0),
    total_questions: Number(payload.total_questions || 0),
    answers: JSON.stringify(payload.answers || {}),
    focus_flags: Number(payload.focus_flags || 0),
    page_visible: payload.page_visible === false ? false : true,
    active_section: payload.active_section || '',
    section_remaining: JSON.stringify(payload.section_remaining || {}),
    completed_sections: JSON.stringify(payload.completed_sections || []),
    camera_snapshot: payload.camera_snapshot || '',
    history_events: JSON.stringify(appendSessionHistory(payload.session_id, {
      at: new Date().toISOString(),
      event: payload.status || 'started',
      section: payload.active_section || '',
      answered_count: Number(payload.answered_count || 0),
      focus_flags: Number(payload.focus_flags || 0)
    }, sessionSheet)),
    updated_at: new Date().toISOString()
  };
  upsertByKey(sessionSheet, 'session_id', payload.session_id, { session_id: payload.session_id, nik: payload.nik, ...updates });
  return { status: 'success', session: { session_id: payload.session_id, ...updates } };
}

function submitCompetencyTest(payload, sessionSheet, options) {
  sessionSheet = sessionSheet || SHEETS.competencySessions;
  options = options || {};
  if (!payload.session_id) return { status: 'error', message: 'session_id wajib diisi.' };
  assertCompetencySessionOwner(sessionSheet, payload.session_id, payload.nik);
  const now = new Date().toISOString();
  const scoreResult = calculateCompetencyScores(payload);
  const updates = {
    status: 'submitted',
    answered_count: Number(payload.total_questions || 0),
    total_questions: Number(payload.total_questions || 0),
    score: scoreResult.rawScore,
    weighted_score: scoreResult.weightedScore,
    section_scores: JSON.stringify(scoreResult.sectionScores || {}),
    answers: JSON.stringify(payload.answers || {}),
    focus_flags: Number(payload.focus_flags || 0),
    active_section: payload.active_section || '',
    section_remaining: JSON.stringify(payload.section_remaining || {}),
    completed_sections: JSON.stringify(payload.completed_sections || []),
    camera_snapshot: payload.camera_snapshot || '',
    history_events: JSON.stringify(appendSessionHistory(payload.session_id, {
      at: now,
      event: 'submitted',
      section: payload.active_section || '',
      answered_count: Number(payload.total_questions || 0),
      focus_flags: Number(payload.focus_flags || 0)
    }, sessionSheet)),
    updated_at: now,
    submitted_at: now
  };
  upsertByKey(sessionSheet, 'session_id', payload.session_id, { session_id: payload.session_id, nik: payload.nik, ...updates });
  const participant = options.updateParticipant === false ? null : findParticipantByNik(payload.nik);
  if (participant) {
    updateByKey(SHEETS.participants, 'nik', participant.nik, {
      participant_stage: 'competency_submitted'
    });
  }
  return { status: 'success', session: { session_id: payload.session_id, ...updates } };
}

function assertCompetencySessionOwner(sessionSheet, sessionId, nik) {
  const existing = getRows(sessionSheet).find(function(row) {
    return String(row.session_id || '') === String(sessionId || '');
  });
  if (!existing) return;
  const existingNik = String(existing.nik || '').replace(/\D/g, '');
  const requesterNik = String(nik || '').replace(/\D/g, '');
  if (!requesterNik || existingNik !== requesterNik) {
    throw new Error('Sesi tes tidak cocok dengan peserta yang sedang login.');
  }
}

function calculateCompetencyScores(payload) {
  const answers = payload.answers || {};
  const variant = getCompetencyVariant(payload.nik || '');
  const questions = getRows(SHEETS.competencyQuestions).filter(q => String(q.status || 'active') === 'active');
  const byId = {};
  questions.forEach(q => {
    byId[String(q.id)] = q;
    byId[String(q.id) + '_v' + variant] = q;
  });

  const sectionScores = {};
  let rawScore = 0;
  let weightedScore = 0;

  Object.keys(answers).forEach(answerId => {
    const q = byId[String(answerId)];
    if (!q) return;
    const section = q.section || q.type || 'logic';
    const expected = applyCompetencyVariantText(q.answer, variant);
    const submitted = String(answers[answerId] || '');
    const correct = submitted !== '' && submitted === expected;
    const base = submitted === '' ? 0 : correct ? 1 : -0.3;
    const weight = getCompetencyQuestionWeight(q);
    rawScore += base;
    weightedScore += base * weight;
    sectionScores[section] = (sectionScores[section] || 0) + base * weight;
  });

  Object.keys(sectionScores).forEach(section => {
    sectionScores[section] = Number(sectionScores[section].toFixed(2));
  });

  return {
    rawScore: Number(rawScore.toFixed(2)),
    weightedScore: Number(weightedScore.toFixed(2)),
    sectionScores
  };
}

function getCompetencyQuestionWeight(q) {
  const section = String(q.section || q.type || '');
  const difficulty = String(q.difficulty || 'standard');
  if (section === 'math' && difficulty === 'advanced') return 1.35;
  if (section === 'math' && difficulty === 'medium') return 1.1;
  if (section === 'psychology') return 0.9;
  return 1;
}

function getCompetencyVariant(nik) {
  const digits = String(nik || '').replace(/\D/g, '').split('');
  const sum = digits.reduce(function(total, value) { return total + Number(value || 0); }, 0);
  return (sum % 3) + 1;
}

function applyCompetencyVariantText(value, variant) {
  if (variant === 1) return String(value || '');
  const swaps = variant === 2
    ? [['HerAI', 'program fellowship'], ['Rina', 'Nadia'], ['Program A', 'Program B'], ['proposal', 'proyek']]
    : [['HerAI', 'kohort AI'], ['Rina', 'Salsabila'], ['Program A', 'Program C'], ['proposal', 'portofolio']];
  return swaps.reduce(function(text, pair) {
    return text.split(pair[0]).join(pair[1]);
  }, String(value || ''));
}

function appendSessionHistory(sessionId, event, sessionSheet) {
  sessionSheet = sessionSheet || SHEETS.competencySessions;
  const session = getRows(sessionSheet).find(row => String(row.session_id) === String(sessionId));
  let history = [];
  try {
    history = JSON.parse(session && session.history_events ? session.history_events : '[]');
  } catch (error) {
    history = [];
  }
  history.push(event);
  return history.slice(-80);
}

function updateCompetencyDecision(payload) {
  const nik = String(payload.nik || '').replace(/\D/g, '');
  const decision = String(payload.decision || payload.status || '').toLowerCase();
  if (!nik) return { status: 'error', message: 'NIK wajib diisi.' };
  if (['lolos', 'gugur', 'pending'].indexOf(decision) === -1) return { status: 'error', message: 'Decision tidak valid.' };
  const participant = findParticipantByNik(nik);
  if (!participant) return { status: 'error', message: 'Peserta tidak ditemukan.' };
  const stage = decision === 'lolos' ? 'accepted_stage_2' : decision === 'gugur' ? 'rejected_stage_2' : 'competency_submitted';
  updateByKey(SHEETS.participants, 'nik', participant.nik, {
    status_tahap_2: decision,
    competency_status: decision,
    participant_stage: stage,
    competency_decided_at: new Date().toISOString()
  });
  return { status: 'success', participant: stripSensitiveParticipant(findParticipantByNik(nik)) };
}

function submitFinalProject(payload) {
  const projectId = payload.project_id || `fp_${Date.now()}`;
  const project = {
    project_id: projectId,
    team_id: payload.team_id || projectId,
    team_name: payload.teamName || payload.team_name || '',
    title: payload.title || payload.project_title || '',
    members: payload.members || '',
    institution: payload.institution || '',
    track: payload.track || '',
    project_title: payload.title || payload.project_title || '',
    mentor: payload.mentor || '',
    deck_url: payload.deckUrl || payload.deck_url || '',
    repo_url: payload.repoUrl || payload.repo_url || '',
    demo_url: payload.demoUrl || payload.demo_url || '',
    overview: payload.overview || '',
    details: payload.details || '',
    score: payload.score || '',
    status: payload.status || 'submitted',
    notes: payload.notes || '',
    submitted_at: payload.submittedAt || new Date().toISOString()
  };
  upsertByKey(SHEETS.projects, 'project_id', projectId, project);
  return { status: 'success', project, projects: getRows(SHEETS.projects) };
}

function runAiAnalysis(payload) {
  const p = payload.participant || {};
  if (!p || !p.rowId) throw new Error('Data peserta tidak ditemukan');
  const analysis = callGroqAiAnalysis(p);
  saveAiScreeningResult(p, analysis);
  updateByKey(SHEETS.participants, 'rowId', p.rowId, {
    is_scanned: true,
    ai_summary: JSON.stringify(analysis.essay_analysis),
    ai_motivation: analysis.motivation,
    ai_skills: analysis.skills.join(', '),
    ai_score: analysis.score
  });
  return { status: 'success', data: analysis };
}

function callGroqAiAnalysis(p) {
  const apiKey = getGroqApiKey();
  if (!apiKey) return buildFallbackAiAnalysis(p);

  const promptText = [
    'Anda adalah AI Recruiter ahli. Analisis 5 esai dari pendaftar tech fellowship berikut:',
    '',
    'Nama: ' + (p.nama_lengkap || '-'),
    'Latar Belakang: ' + (p.univ || p.instansi || p.status_kerja || '-'),
    '',
    'Esai 1: ' + (p.essay_1 || p.essay1 || '-'),
    'Esai 2: ' + (p.essay_2 || p.essay2 || '-'),
    'Esai 3: ' + (p.essay_3 || p.essay3 || '-'),
    'Esai 4: ' + (p.essay_4 || p.essay4 || '-'),
    'Esai 5: ' + (p.essay_5 || p.essay5 || '-'),
    '',
    'Berikan analisis dalam format JSON ketat dengan struktur:',
    '{"essay_analysis":{"q1_about":"","q2_reason":"","q3_impact":"","q4_expectations":"","q5_outstanding":""},"motivation":"","skills":[""],"score":0}',
    'PENTING: score angka bulat 0-100, objektif, ketat, dan jangan selalu menjawab 85.'
  ].join('\n');

  const groqPayload = {
    model: 'llama-3.1-8b-instant',
    messages: [
      { role: 'system', content: 'Hanya respon dengan format JSON murni.' },
      { role: 'user', content: promptText }
    ],
    temperature: 0.4,
    response_format: { type: 'json_object' }
  };

  const response = UrlFetchApp.fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'post',
    headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
    payload: JSON.stringify(groqPayload),
    muteHttpExceptions: true
  });
  const jsonResponse = JSON.parse(response.getContentText());
  if (jsonResponse.error) throw new Error('Groq API Error: ' + jsonResponse.error.message);
  const insight = JSON.parse(jsonResponse.choices[0].message.content);
  return normalizeAiInsight(insight, p);
}

function buildFallbackAiAnalysis(p) {
  return {
    essay_analysis: {
      q1_about: summarize(p.essay_1 || p.essay1),
      q2_reason: summarize(p.essay_2 || p.essay2),
      q3_impact: summarize(p.essay_3 || p.essay3),
      q4_expectations: summarize(p.essay_4 || p.essay4),
      q5_outstanding: summarize(p.essay_5 || p.essay5)
    },
    motivation: summarize([p.essay_2 || p.essay2, p.essay_3 || p.essay3, p.essay_4 || p.essay4].join(' ')),
    skills: extractSkills([p.essay_1 || p.essay1, p.essay_2 || p.essay2, p.essay_3 || p.essay3, p.essay_4 || p.essay4, p.essay_5 || p.essay5].join(' ')),
    score: Math.min(95, Math.max(55, Math.round(((p.essay_1 || p.essay1 || '').length + (p.essay_2 || p.essay2 || '').length) / 45)))
  };
}

function normalizeAiInsight(insight, participant) {
  const fallback = buildFallbackAiAnalysis(participant);
  const score = Number(insight.score);
  return {
    essay_analysis: insight.essay_analysis || fallback.essay_analysis,
    motivation: insight.motivation || fallback.motivation,
    skills: Array.isArray(insight.skills) ? insight.skills : fallback.skills,
    score: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : fallback.score
  };
}

function getGroqApiKey() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('data');
  if (!sheet) return '';
  return String(sheet.getRange('B1').getValue() || '').trim();
}

function saveAiScreeningResult(p, analysis) {
  const result = {
    rowId: p.rowId,
    nik: p.nik || '',
    nama_lengkap: p.nama_lengkap || '',
    ai_summary: JSON.stringify(analysis.essay_analysis || {}),
    ai_skills: Array.isArray(analysis.skills) ? analysis.skills.join(', ') : String(analysis.skills || ''),
    ai_motivation: analysis.motivation || '',
    analyzed_at: new Date().toISOString(),
    ai_score: analysis.score || 0
  };
  upsertByKey(SHEETS.aiResults, 'rowId', p.rowId, result);
}

function login(payload) {
  const admins = getRows(SHEETS.admins);
  const loginId = String(payload.id_admin || payload.adminId || '');
  const admin = admins.find(a => {
    const rowId = String(a.id_admin || a.adminId || '');
    const status = String(a.status || 'active').toLowerCase();
    return rowId === loginId && verifyPasswordValue(a.password, payload.password) && status !== 'inactive' && status !== 'disabled';
  });
  if (!admin) return { status: 'error', message: 'ID admin atau password salah.' };
  migrateAdminPasswordIfNeeded(admin, payload.password);
  logActivity({
    adminId: loginId,
    tindakan: 'Melakukan Login Ke Dashboard',
    perangkat: payload.perangkat || payload.device || 'Unknown Device',
    lokasi: payload.lokasi || 'Unknown Location'
  });
  const auth = issueAuthToken('admin', loginId, {
    scope: 'admin',
    role: admin.peran_admin || admin.role || 'reviewer'
  }, AUTH_TOKEN_TTL_SECONDS.admin);
  return {
    status: 'success',
    admin: normalizeAdminForClient(admin),
    token: auth.token,
    expires_at: auth.expires_at
  };
}

function logActivity(payload) {
  addRowObject(SHEETS.audit, {
    timestamp: new Date().toISOString(),
    adminId: payload.adminId,
    tindakan: payload.tindakan,
    perangkat: payload.perangkat,
    lokasi: payload.lokasi
  });
  return { status: 'success' };
}

function getAuditData() {
  const logs = getRows(SHEETS.audit);
  const seen = {};
  const sessions = [];
  for (let i = logs.length - 1; i >= 0; i--) {
    const log = logs[i];
    const adminId = log.adminId || log.id_admin || 'unknown-admin';
    if (seen[adminId]) continue;
    seen[adminId] = true;
    sessions.push({
      nama_admin: String(adminId).split('-')[0] || 'Admin',
      id_admin: adminId,
      adminId: adminId,
      tindakan: log.tindakan || '-',
      time_stamp: log.timestamp || log.time_stamp || '',
      perangkat: log.perangkat || 'Unknown Device',
      lokasi_ip: log.lokasi || log.lokasi_ip || 'Unknown Location'
    });
    if (sessions.length >= 6) break;
  }
  return { status: 'success', data: logs, logs, sessions };
}

// Compatibility wrapper untuk Apps Script project lama.
// Jika dropdown Run masih menunjuk ke recordAuditTrail, function ini tetap aman dijalankan.
function recordAuditTrail(idAdmin, tindakan, perangkat, lokasi) {
  return logActivity({
    adminId: idAdmin || 'system',
    tindakan: tindakan || 'Manual audit check',
    perangkat: perangkat || 'Apps Script',
    lokasi: lokasi || 'Apps Script Editor'
  });
}

function generateCertificates() {
  const participants = getRows(SHEETS.participants).filter(p => String(p.participant_stage) === 'graduated' || Number(p.skor_akhir) >= 75);
  participants.forEach((p, i) => {
    upsertByKey(SHEETS.certificates, 'participant_rowId', p.rowId, {
      certificate_no: `HERAI-2026-${String(i + 1).padStart(4, '0')}`,
      participant_rowId: p.rowId,
      nama_lengkap: p.nama_lengkap,
      final_score: p.skor_akhir,
      status: 'eligible',
      issued_at: ''
    });
  });
  return { status: 'success', generated: participants.length };
}

function getSettingsObject() {
  const rows = getRows(SHEETS.settings);
  return rows.reduce((acc, row) => {
    try {
      acc[row.key] = JSON.parse(row.value);
    } catch {
      acc[row.key] = row.value;
    }
    return acc;
  }, {});
}

function saveSettingsObject(settings) {
  Object.keys(settings).forEach(key => {
    upsertByKey(SHEETS.settings, 'key', key, {
      key,
      value: JSON.stringify(settings[key]),
      updated_at: new Date().toISOString(),
      updated_by: 'dashboard'
    });
  });
  return { status: 'success', settings };
}

function getRows(sheetName) {
  const sheet = getSheet(sheetName);
  ensureSchemaHeaders(sheet, SCHEMA[sheetName] || []);
  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];
  const headers = values[0];
  return values.slice(1).filter(row => row.some(cell => cell !== '')).map((row, index) => {
    const obj = {};
    headers.forEach((header, index) => obj[header] = row[index]);
    return sheetName === SHEETS.participants ? normalizeParticipantRow(obj, index + 2) : obj;
  });
}

function addRowObject(sheetName, obj) {
  const sheet = getSheet(sheetName);
  ensureSchemaHeaders(sheet, SCHEMA[sheetName] || Object.keys(obj));
  const headers = getHeaders(sheet);
  sheet.appendRow(headers.map(header => getObjectValueForHeader(sheetName, header, obj)));
  return { status: 'success' };
}

function updateByKey(sheetName, key, value, updates) {
  const sheet = getSheet(sheetName);
  ensureSchemaHeaders(sheet, SCHEMA[sheetName] || Object.keys(updates));
  const headers = getHeaders(sheet);
  const keyIndex = headers.indexOf(key);
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    const cellValue = keyIndex >= 0 ? values[i][keyIndex] : '';
    const rowNumberFallback = sheetName === SHEETS.participants && key === 'rowId' && String(i + 1) === String(value);
    if (String(cellValue) === String(value) || rowNumberFallback) {
      const newRow = values[i].slice();
      Object.keys(updates).forEach(updateKey => {
        const col = headers.indexOf(updateKey);
        if (col >= 0) newRow[col] = getObjectValueForHeader(sheetName, updateKey, updates);
      });
      sheet.getRange(i + 1, 1, 1, newRow.length).setValues([newRow]);
      return { status: 'success' };
    }
  }
  return { status: 'error', message: `${key} tidak ditemukan` };
}

function upsertByKey(sheetName, key, value, obj) {
  const updated = updateByKey(sheetName, key, value, obj);
  if (updated.status === 'success') return updated;
  return addRowObject(sheetName, obj);
}

function deleteByKey(sheetName, key, value) {
  const sheet = getSheet(sheetName);
  const headers = getHeaders(sheet);
  const keyIndex = headers.indexOf(key);
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][keyIndex]) === String(value)) {
      sheet.deleteRow(i + 1);
      return { status: 'success' };
    }
  }
  return { status: 'error', message: `${key} tidak ditemukan` };
}

function normalizeAdmin(payload) {
  const admin = {
    id_admin: payload.id_admin || payload.adminId,
    peran_admin: payload.peran_admin || payload.role || 'reviewer',
    nama_admin: payload.nama_admin || payload.name || payload.nama || '',
    permissions: Array.isArray(payload.permissions) ? payload.permissions.join(',') : (payload.permissions || ''),
    status: payload.status || 'active',
    created_at: payload.created_at || new Date().toISOString()
  };
  if (payload.password) admin.password = hashPasswordValue(payload.password);
  return admin;
}

function normalizeAdminForClient(admin) {
  return {
    id_admin: admin.id_admin || admin.adminId || '',
    adminId: admin.id_admin || admin.adminId || '',
    nama_admin: admin.nama_admin || admin.name || '',
    name: admin.nama_admin || admin.name || '',
    peran_admin: admin.peran_admin || admin.role || 'reviewer',
    role: admin.peran_admin || admin.role || 'reviewer',
    permissions: admin.permissions || '',
    status: admin.status || 'active',
    created_at: admin.created_at || ''
  };
}

function getRequestSpreadsheet() {
  if (!HERAI_REQUEST_SPREADSHEET) {
    HERAI_REQUEST_SPREADSHEET = SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return HERAI_REQUEST_SPREADSHEET;
}

function getSheet(name) {
  const ss = getRequestSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function getHeaders(sheet) {
  if (sheet.getLastColumn() === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function ensureSchemaHeaders(sheet, schemaHeaders) {
  if (!schemaHeaders || schemaHeaders.length === 0) return;
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, schemaHeaders.length).setValues([schemaHeaders]);
    return;
  }
  const headers = getHeaders(sheet).filter(Boolean);
  if (headers.length === 0) {
    sheet.getRange(1, 1, 1, schemaHeaders.length).setValues([schemaHeaders]);
    return;
  }
  const missing = schemaHeaders.filter(header => headers.indexOf(header) < 0);
  if (missing.length > 0) {
    sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
  }
}

function normalizeParticipantRow(obj, rowNumber) {
  const normalized = Object.assign({}, obj);
  normalized.rowId = normalized.rowId || rowNumber;
  normalized.jalur = normalized.jalur || normalized.jalur_pendaftaran || '';
  normalized.status_kerja = normalized.status_kerja || normalized.status || '';
  normalized.univ = normalized.univ || normalized.universitas || '';
  normalized.instansi = normalized.instansi || normalized.nama_instansi || '';
  normalized.organisasi = normalized.organisasi || normalized.pengalaman_organisasi || '';
  normalized.cv_link = normalized.cv_link || normalized.link_cv || '';
  normalized.status_seleksi = normalized.status_seleksi || 'pending';
  normalized.status_tahap_2 = normalized.status_tahap_2 || 'pending';
  normalized.competency_status = normalized.competency_status || normalized.status_tahap_2 || 'pending';
  normalized.final_status = normalized.final_status || normalized.status_final || 'pending';
  normalized.account_type = normalizeParticipantAccountType(normalized.account_type);
  normalized.participant_stage = normalized.participant_stage || (
    String(normalized.status_seleksi).toLowerCase() === 'lolos' ? 'accepted_stage_1' :
    String(normalized.status_seleksi).toLowerCase() === 'gugur' ? 'rejected_stage_1' :
    'registered'
  );
  normalized.is_scanned = isTruthy(normalized.is_scanned) || !!(normalized.ai_score || normalized.ai_summary || normalized.ai_motivation || normalized.ai_skills);
  return normalized;
}

function mergeAiScreeningResults(participants) {
  const aiRows = getRows(SHEETS.aiResults);
  if (!aiRows.length) return participants;
  const byRowId = {};
  const byNik = {};
  aiRows.forEach(row => {
    if (row.rowId) byRowId[String(row.rowId)] = row;
    if (row.nik) byNik[String(row.nik).replace(/\D/g, '')] = row;
  });
  return participants.map(participant => {
    const ai = byRowId[String(participant.rowId)] || byNik[String(participant.nik || '').replace(/\D/g, '')];
    if (!ai) return participant;
    return Object.assign({}, participant, {
      is_scanned: true,
      ai_summary: participant.ai_summary || ai.ai_summary || '',
      ai_skills: participant.ai_skills || ai.ai_skills || '',
      ai_motivation: participant.ai_motivation || ai.ai_motivation || '',
      ai_score: participant.ai_score || ai.ai_score || 0,
      ai_data: {
        ai_summary: participant.ai_summary || ai.ai_summary || '',
        ai_skills: participant.ai_skills || ai.ai_skills || '',
        ai_motivation: participant.ai_motivation || ai.ai_motivation || '',
        ai_score: participant.ai_score || ai.ai_score || 0
      }
    });
  });
}

function getObjectValueForHeader(sheetName, header, obj) {
  if (obj[header] !== undefined) return protectSpreadsheetCell(obj[header]);
  if (sheetName !== SHEETS.participants) return '';
  const aliases = {
    jalur_pendaftaran: 'jalur',
    status: 'status_kerja',
    universitas: 'univ',
    nama_instansi: 'instansi',
    pengalaman_organisasi: 'organisasi',
    link_cv: 'cv_link'
  };
  const canonical = aliases[header];
  return canonical && obj[canonical] !== undefined ? protectSpreadsheetCell(obj[canonical]) : '';
}

function protectSpreadsheetCell(value) {
  if (typeof value !== 'string') return value;
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function isTruthy(value) {
  const raw = String(value || '').toLowerCase();
  return value === true || ['true', 'yes', '1', 'scanned', 'done'].indexOf(raw) >= 0;
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function summarize(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  return clean ? clean.slice(0, 180) + (clean.length > 180 ? '...' : '') : 'Tidak ada jawaban.';
}

function extractSkills(text) {
  const source = String(text || '').toLowerCase();
  const candidates = ['python', 'data analysis', 'machine learning', 'ai', 'excel', 'sql', 'public speaking', 'leadership', 'design', 'research'];
  const found = candidates.filter(skill => source.includes(skill));
  return found.length ? found : ['AI Enthusiasm', 'Learning Agility'];
}

function testSendCredentialEmail() {
  var testNik = '9999000000000001';
  var accounts = getRows(SHEETS.participantAccounts);
  var target = null;
  for (var i = 0; i < accounts.length; i++) {
    if (String(accounts[i].nik || '').replace(/\D/g, '') === testNik) {
      target = accounts[i];
      break;
    }
  }
  if (!target) { Logger.log('GAK KETEMU'); return; }
  if (!target.email) { Logger.log('EMAIL KOSONG'); return; }
  var email = String(target.email).trim();
  var nama = String(target.nama_lengkap || 'Peserta');
  var nik = String(target.nik || '').replace(/\D/g, '');
  var password = String(target.generated_password || '');
  var subject = 'Selamat Datang di HerAI Fellowship — Akses Portal Peserta Anda';
  var body = [
    'Yth. ' + nama + ',',
    '',
    'Selamat datang di HerAI Fellowship! Kami sangat senang menyambut Anda sebagai bagian dari program ini.',
    '',
    'Untuk mendukung perjalanan belajar Anda, kami telah menyiapkan portal peserta yang berisi materi pembelajaran, latihan, kuis, dan berbagai fitur pendukung lainnya. Berikut adalah detail akses Anda:',
    '',
    '══════════════════════════════════════',
    '  LINK PORTAL  : https://her-ai.data-sorcerers.com/#/profile',
    '  NIK          : ' + nik,
    '  PASSWORD     : ' + password,
    '══════════════════════════════════════',
    '',
    'LANGKAH AWAL YANG PERLU ANDA LAKUKAN:',
    '',
    '1. Buka link portal di atas melalui browser (disarankan Chrome).',
    '2. Masukkan NIK dan password yang tertera.',
    '3. Setelah berhasil masuk, segera ganti password Anda melalui menu Pengaturan di dalam portal.',
    '',
    '── PANDUAN MENGGANTI PASSWORD ──',
    '',
    'Keamanan akun adalah hal yang utama. Ikuti langkah berikut untuk mengganti password Anda:',
    '',
    '1. Setelah login, buka menu "Pengaturan" atau "Settings" di portal peserta.',
    '2. Pilih opsi "Ganti Password" atau "Ubah Password".',
    '3. Masukkan password saat ini (yang Anda terima melalui email ini).',
    '4. Buat password baru dengan kriteria berikut:',
    '   • Minimal 8 karakter',
    '   • Mengandung huruf kapital (A-Z)',
    '   • Mengandung huruf kecil (a-z)',
    '   • Mengandung angka (0-9)',
    '   • Disarankan juga menambahkan simbol (contoh: @, #, !)',
    '   • Hindari penggunaan tanggal lahir, nama, atau informasi pribadi',
    '5. Ketik ulang password baru pada kolom konfirmasi.',
    '6. Klik "Simpan" dan password Anda akan diperbarui.',
    '',
    'Setelah berhasil mengganti password, gunakan password baru tersebut untuk login berikutnya.',
    '',
    'Apabila Anda mengalami kendala dalam mengakses portal atau mengganti password, jangan ragu untuk menghubungi kami. Kami siap membantu Anda.',
    '',
    'Selamat belajar dan semoga sukses dalam perjalanan HerAI Fellowship Anda!',
    '',
    'Salam hangat,',
    'Tim HerAI Fellowship'
  ].join('\n');
  MailApp.sendEmail({
    to: email,
    subject: subject,
    name: 'Data Sorcerers',
    body: body
  });
  Logger.log('TERKIRIM ke: ' + email);
}



function broadcastCredentials() {
  var accounts = getRows(SHEETS.participantAccounts);
  var sent = 0;
  var failed = 0;
  for (var i = 0; i < accounts.length; i++) {
    var a = accounts[i];
    var nik = String(a.nik || '').replace(/\D/g, '');
    var email = String(a.email || '').trim();
    var status = String(a.access_status || 'active').toLowerCase();
    var type = String(a.account_type || '');
    if (nik.length >= 16 && email.indexOf('@') >= 0 && status === 'active' && type !== 'qa') {
      try {
        var nama = String(a.nama_lengkap || 'Peserta');
        var password = String(a.generated_password || '');
        var subject = 'Selamat Datang di HerAI Fellowship — Akses Portal Peserta Anda';
        var body = [
          'Yth. ' + nama + ',',
          '',
          'Selamat datang di HerAI Fellowship! Kami sangat senang menyambut Anda sebagai bagian dari program ini.',
          '',
          'Untuk mendukung perjalanan belajar Anda, kami telah menyiapkan portal peserta yang berisi materi pembelajaran, latihan, kuis, dan berbagai fitur pendukung lainnya. Berikut adalah detail akses Anda:',
          '',
          '══════════════════════════════════════',
          '  LINK PORTAL  : https://her-ai.data-sorcerers.com/#/profile',
          '  NIK          : ' + nik,
          '  PASSWORD     : ' + password,
          '══════════════════════════════════════',
          '',
          'LANGKAH AWAL YANG PERLU ANDA LAKUKAN:',
          '',
          '1. Buka link portal di atas melalui browser (disarankan Chrome).',
          '2. Masukkan NIK dan password yang tertera.',
          '3. Setelah berhasil masuk, segera ganti password Anda melalui menu Pengaturan di dalam portal.',
          '',
          '── PANDUAN MENGGANTI PASSWORD ──',
          '',
          'Keamanan akun adalah hal yang utama. Ikuti langkah berikut untuk mengganti password Anda:',
          '',
          '1. Setelah login, buka menu "Pengaturan" atau "Settings" di portal peserta.',
          '2. Pilih opsi "Ganti Password" atau "Ubah Password".',
          '3. Masukkan password saat ini (yang Anda terima melalui email ini).',
          '4. Buat password baru dengan kriteria berikut:',
          '   • Minimal 8 karakter',
          '   • Mengandung huruf kapital (A-Z)',
          '   • Mengandung huruf kecil (a-z)',
          '   • Mengandung angka (0-9)',
          '   • Disarankan juga menambahkan simbol (contoh: @, #, !)',
          '   • Hindari penggunaan tanggal lahir, nama, atau informasi pribadi',
          '5. Ketik ulang password baru pada kolom konfirmasi.',
          '6. Klik "Simpan" dan password Anda akan diperbarui.',
          '',
          'Setelah berhasil mengganti password, gunakan password baru tersebut untuk login berikutnya.',
          '',
          'Apabila Anda mengalami kendala dalam mengakses portal atau mengganti password, jangan ragu untuk menghubungi kami. Kami siap membantu Anda.',
          '',
          'Selamat belajar dan semoga sukses dalam perjalanan HerAI Fellowship Anda!',
          '',
          'Salam hangat,',
          'Tim HerAI Fellowship'
        ].join('\n');
        MailApp.sendEmail({
          to: email,
          subject: subject,
          name: 'Data Sorcerers',
          body: body
        });
        sent++;
        Logger.log((sent + failed) + '/' + accounts.length + ' ' + email + ' OK');
      } catch (e) {
        failed++;
        Logger.log('FAIL ' + email + ': ' + e.message);
      }
      Utilities.sleep(500);
    }
  }
  Logger.log('SELESAI — Terkirim: ' + sent + ' | Gagal: ' + failed);
}


function debugGeneratedPassword() {
  var accounts = getRows(SHEETS.participantAccounts);
  var errorCount = 0;
  var sample = [];
  for (var i = 0; i < accounts.length; i++) {
    var val = String(accounts[i].generated_password || '');
    if (val.indexOf('#') === 0 || val === 'ERROR' || val.indexOf('ERROR') >= 0) {
      errorCount++;
      if (sample.length < 10) {
        sample.push(String(accounts[i].nik || '').replace(/\D/g, '') + ' => ' + val.slice(0, 40));
      }
    }
  }
  Logger.log('Sel dengan nilai ERROR/#: ' + errorCount);
  Logger.log('Contoh NIK: ' + JSON.stringify(sample));
  Logger.log('Total akun: ' + accounts.length);
}

function fixCorruptedPassword() {
  var fixList = [
    '3275055902070004',
    '3578176908040001',
    '1502066606000001',
    '3275036010070012'
    // tambahin NIK lain yang kena #ERROR! di sini
  ];
  var newPassword = 'HerAI2026!';  // password baru sementara (ganti bebas)
  if (String(newPassword).length < 8) { Logger.log('MINIMAL 8 KARAKTER'); return; }
  var accounts = getRows(SHEETS.participantAccounts);
  var fixed = 0;
  var newHash = hashPasswordValue(newPassword);
  for (var i = 0; i < accounts.length; i++) {
    var a = accounts[i];
    var nik = String(a.nik || '').replace(/\D/g, '');
    var isInList = false;
    for (var j = 0; j < fixList.length; j++) {
      if (nik === fixList[j]) { isInList = true; break; }
    }
    if (!isInList) continue;
    updateByKey(SHEETS.participantAccounts, 'account_id', a.account_id, {
      password_hash: newHash,
      password_status: 'generated',
      generated_password: newPassword,   // ← timpa yang #ERROR! jadi string beneran
      updated_at: new Date().toISOString()
    });
    // Sinkron ke sheet peserta juga
    try {
      var participants = getRows(SHEETS.participants);
      for (var k = 0; k < participants.length; k++) {
        if (String(participants[k].nik || '').replace(/\D/g, '') === nik && participants[k].rowId) {
          updateByKey(SHEETS.participants, 'rowId', participants[k].rowId, {
            participant_password: newHash,
            profile_updated_at: new Date().toISOString()
          });
          break;
        }
      }
    } catch (e) {
      Logger.log('Sheet peserta skip: ' + e.message);
    }
    fixed++;
    Logger.log('FIXED: ' + nik);
  }
  Logger.log('SELESAI — Diperbaiki: ' + fixed + ' dari ' + fixList.length);
}


function broadcastRetryFailedEmails() {
  var failedEmails = [
    'farahkirana08@gmail.com',
    'hilmkmlh@gmail.com',
    'shafiranurrr2005@gmail.com',
    'ameliaamanatulislam22@gmail.com',
    'jennyagustinar@gmail.com',
    'ansyari.atikah@gmail.com',
    'nailakesmas@gmail.com',
    'salwa.adhani12@gmail.com',
    'krinazzhra@gmail.com',
    'muthmainnahzxc@gmail.com',
    'tirtamahayogi@gmail.com'
  ];
  var accounts = getRows(SHEETS.participantAccounts);
  var sent = 0;
  var failed = 0;
  for (var i = 0; i < accounts.length; i++) {
    var a = accounts[i];
    var email = String(a.email || '').trim().toLowerCase();
    var nik = String(a.nik || '').replace(/\D/g, '');
    var type = String(a.account_type || '');
    // Cek apakah email ini ada di daftar yang gagal
    var isTarget = false;
    for (var j = 0; j < failedEmails.length; j++) {
      if (email === failedEmails[j].toLowerCase()) { isTarget = true; break; }
    }
    if (!isTarget) continue;
    if (nik.length < 16 || type === 'qa') { failed++; continue; }
    try {
      var nama = String(a.nama_lengkap || 'Peserta');
      var password = String(a.generated_password || '');
      var subject = 'Selamat Datang di HerAI Fellowship — Akses Portal Peserta Anda';
      var body = [
        'Yth. ' + nama + ',',
        '',
        'Selamat datang di HerAI Fellowship! Kami sangat senang menyambut Anda sebagai bagian dari program ini.',
        '',
        'Untuk mendukung perjalanan belajar Anda, kami telah menyiapkan portal peserta yang berisi materi pembelajaran, latihan, kuis, dan berbagai fitur pendukung lainnya. Berikut adalah detail akses Anda:',
        '',
        '══════════════════════════════════════',
        '  LINK PORTAL  : https://her-ai.data-sorcerers.com/#/profile',
        '  NIK          : ' + nik,
        '  PASSWORD     : ' + password,
        '══════════════════════════════════════',
        '',
        'LANGKAH AWAL YANG PERLU ANDA LAKUKAN:',
        '',
        '1. Buka link portal di atas melalui browser (disarankan Chrome).',
        '2. Masukkan NIK dan password yang tertera.',
        '3. Setelah berhasil masuk, segera ganti password Anda melalui menu Pengaturan di dalam portal.',
        '',
        '── PANDUAN MENGGANTI PASSWORD ──',
        '',
        'Keamanan akun adalah hal yang utama. Ikuti langkah berikut untuk mengganti password Anda:',
        '',
        '1. Setelah login, buka menu "Pengaturan" atau "Settings" di portal peserta.',
        '2. Pilih opsi "Ganti Password" atau "Ubah Password".',
        '3. Masukkan password saat ini (yang Anda terima melalui email ini).',
        '4. Buat password baru dengan kriteria berikut:',
        '   • Minimal 8 karakter',
        '   • Mengandung huruf kapital (A-Z)',
        '   • Mengandung huruf kecil (a-z)',
        '   • Mengandung angka (0-9)',
        '   • Disarankan juga menambahkan simbol (contoh: @, #, !)',
        '   • Hindari penggunaan tanggal lahir, nama, atau informasi pribadi',
        '5. Ketik ulang password baru pada kolom konfirmasi.',
        '6. Klik "Simpan" dan password Anda akan diperbarui.',
        '',
        'Setelah berhasil mengganti password, gunakan password baru tersebut untuk login berikutnya.',
        '',
        'Apabila Anda mengalami kendala dalam mengakses portal atau mengganti password, jangan ragu untuk menghubungi kami. Kami siap membantu Anda.',
        '',
        'Selamat belajar dan semoga sukses dalam perjalanan HerAI Fellowship Anda!',
        '',
        'Salam hangat,',
        'Tim HerAI Fellowship'
      ].join('\n');
      MailApp.sendEmail({
        to: email,
        subject: subject,
        name: 'Data Sorcerers',
        body: body
      });
      sent++;
      Logger.log((sent + failed) + '/11 ' + email + ' OK');
    } catch (e) {
      failed++;
      Logger.log('FAIL ' + email + ': ' + e.message);
    }
    Utilities.sleep(500);
  }
  Logger.log('SELESAI — Terkirim: ' + sent + ' | Gagal: ' + failed);
}