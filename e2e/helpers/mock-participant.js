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
    learningSummary: {
      total: 6,
      completed: 0,
      in_progress: 2,
      not_started: 4,
      progress: 13
    },
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
 * @param {{dashboardData?: object, progressData?: object[], discussionData?: object[], saveProgressResponse?: object}} [options]
 */
async function installMockParticipant(page, options = {}) {
  const calls = [];
  const dashboardData = options.dashboardData || defaultDashboardData();
  const progressData = options.progressData || [];
  const discussionData = Array.isArray(options.discussionData) ? options.discussionData.slice() : [];
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
    } else if (payload.action === 'saveParticipantDiscussion') {
      const discussion = {
        id: payload.discussion_id || `mock-discussion-${discussionData.length + 1}`,
        module_id: payload.module_id,
        prompt: payload.prompt || 'Diskusi',
        text: payload.text || '',
        replies: Array.isArray(payload.replies) ? payload.replies : [],
        createdAt: payload.created_at || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const index = discussionData.findIndex(item => item.id === discussion.id);
      if (index >= 0) discussionData[index] = discussion;
      else discussionData.unshift(discussion);
      response = { status: 'success', discussion };
    } else if (payload.action === 'getParticipantDiscussions') {
      response = {
        status: 'success',
        data: discussionData.filter(item => !payload.module_id || item.module_id === payload.module_id)
      };
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response)
    });
  });

  return { calls, dashboardData, progressData, discussionData };
}

module.exports = {
  MOCK_SESSION,
  MOCK_SETTINGS,
  TEST_BASE,
  defaultDashboardData,
  installMockParticipant
};
