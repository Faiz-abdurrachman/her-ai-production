const TEST_BASE = 'http://127.0.0.1:3000';

const MOCK_SETTINGS = Object.freeze({
  participantPortalOpen: true,
  registrationOpen: true,
  maintenanceMode: false
});

const MOCK_SESSION = Object.freeze({
  nik: '0000000000000000',
  token: 'qa-mock-token',
  name: 'QA Participant',
  profile: Object.freeze({
    nama_lengkap: 'QA Participant',
    photo_url: ''
  })
});

function defaultDashboardData() {
  return {
    modules: [
      { title: 'Python untuk AI', subtitle: 'Workflow AI', progress: 25, quiz_score: 80, icon: 'fab fa-python', tone: 'blue', href: '#/participant-ai-python' },
      { title: 'Reasoning AI', subtitle: 'Penalaran mesin', progress: 50, quiz_score: 75, icon: 'fas fa-brain', tone: 'pink', href: '#/participant-ai-reasoning' },
      { title: 'Konsep AI Modern', subtitle: 'Sistem AI modern', progress: 0, quiz_score: null, icon: 'fas fa-microchip', tone: 'purple', href: '#/participant-ai-modern' },
      { title: 'Evaluation AI', subtitle: 'Evaluasi sistem AI', progress: 0, quiz_score: null, icon: 'fas fa-chart-simple', tone: 'green', href: '#/participant-ai-evaluation' },
      { title: 'Evolution of AI', subtitle: 'Perjalanan AI', progress: 0, quiz_score: null, icon: 'fas fa-timeline', tone: 'orange', href: '#/participant-ai-evolution' }
    ],
    discussionTrails: [],
    tracks: [],
    journey: [],
    events: [],
    leaderboard: []
  };
}

/**
 * Install a deterministic participant session and intercept all participant API
 * calls. This lets UI tests exercise the real router and module scripts without
 * writing progress, scores, activity, or profile data to the live GAS deployment.
 *
 * @param {import('@playwright/test').Page} page
 * @param {{dashboardData?: object, progressData?: object[], saveProgressResponse?: object}} [options]
 */
async function installMockParticipant(page, options = {}) {
  const calls = [];
  const dashboardData = options.dashboardData || defaultDashboardData();
  const progressData = options.progressData || [];
  const saveProgressResponse = options.saveProgressResponse || { status: 'success' };

  await page.addInitScript(({ settings, session }) => {
    try {
      localStorage.setItem('heraiGlobalSettings', JSON.stringify(settings));
      sessionStorage.setItem('heraiParticipantSession', JSON.stringify(session));
    } catch (_error) {
      // about:blank has no storage origin; the script runs again on app pages.
    }
  }, { settings: MOCK_SETTINGS, session: MOCK_SESSION });

  await page.route('**/api/participant-portal/settings', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'success', settings: MOCK_SETTINGS })
    });
  });

  await page.route('**/__gas', async route => {
    let payload = {};
    try {
      payload = route.request().postDataJSON() || {};
    } catch (_error) {
      payload = {};
    }
    calls.push(payload);

    let response = { status: 'success' };
    if (payload.action === 'getParticipantDashboardData') {
      response = { status: 'success', data: dashboardData };
    } else if (payload.action === 'getParticipantProgress') {
      response = { status: 'success', data: progressData };
    } else if (payload.action === 'saveParticipantProgress') {
      response = saveProgressResponse;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response)
    });
  });

  return { calls, dashboardData, progressData };
}

module.exports = {
  MOCK_SESSION,
  MOCK_SETTINGS,
  TEST_BASE,
  defaultDashboardData,
  installMockParticipant
};
