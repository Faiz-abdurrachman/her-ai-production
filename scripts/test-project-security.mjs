import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';

const repositoryRoot = resolve(import.meta.dirname, '..');
const gasSource = readFileSync(resolve(repositoryRoot, 'gas/Code.gs'), 'utf8');
const participantSource = readFileSync(resolve(repositoryRoot, 'js/frontend/projects.js'), 'utf8');
const adminSource = readFileSync(resolve(repositoryRoot, 'js/dashboard/admin-modules.js'), 'utf8');
const settingsPageSource = readFileSync(resolve(repositoryRoot, 'pages/dashboard/global-settings.html'), 'utf8');

const context = {
    console,
    Utilities: { getUuid: () => 'local-test-uuid' }
};
vm.createContext(context);
vm.runInContext(
    `${gasSource}\n;globalThis.__projectApi = {
        getFinalProjectSubmissionPolicy,
        requireFinalProjectSubmissionOpen,
        authorizeGasAction,
        canonicalFinalProjectTeamId,
        resolveAuthenticatedFinalProjectTeam,
        assertFinalProjectTargetOwnership,
        resolveFinalProjectSubmissionTimestamp,
        getPublicFinalProjects,
        getParticipantFinalProjects,
        submitFinalProject,
        deleteFinalProject,
        saveSettingsObject
    };`,
    context,
    { filename: 'gas/Code.gs' }
);

const api = context.__projectApi;
const futureDeadline = '2099-08-24T00:05:00+07:00';
const pastDeadline = '2020-08-24T00:05:00+07:00';
let settings = {
    finalProjectSubmissionOpen: true,
    finalProjectSubmissionDeadline: futureDeadline
};
let projects = [];
let accounts = {
    '0001': { account_id: 'account-a', nik: '0001', team_name: 'TEAM 01' },
    '0002': { account_id: 'account-b', nik: '0002', team_name: 'TEAM 02' },
    '0003': { account_id: 'account-no-team', nik: '0003', team_name: '' }
};
let writeCalls = 0;
let deleteCalls = 0;

context.getSettingsObject = () => ({ ...settings });
context.findParticipantAccount = nik => accounts[String(nik)] || null;
context.getRows = sheetName => sheetName === 'FinalProjects' ? projects.map(project => ({ ...project })) : [];
context.upsertByKey = (_sheetName, key, value, project) => {
    writeCalls += 1;
    const index = projects.findIndex(row => String(row[key] || '') === String(value));
    if (index >= 0) projects[index] = { ...project };
    else projects.push({ ...project });
    return { status: 'success' };
};
context.deleteByKey = (_sheetName, key, value) => {
    deleteCalls += 1;
    const index = projects.findIndex(row => String(row[key] || '') === String(value));
    if (index < 0) return { status: 'error', message: 'not found' };
    projects.splice(index, 1);
    return { status: 'success' };
};

context.requireAdminToken = () => { throw new Error('admin token required'); };
assert.throws(() => api.authorizeGasAction('getFinalProjects', {}), /admin token required/);
assert.doesNotThrow(() => api.authorizeGasAction('getPublicFinalProjects', {}));
context.requireParticipantToken = () => ({ type: 'participant', scope: 'participant', sub: '0001' });
const participantReadPayload = {};
assert.doesNotThrow(() => api.authorizeGasAction('getParticipantFinalProjects', participantReadPayload));
assert.equal(participantReadPayload.nik, '0001');

assert.equal(api.canonicalFinalProjectTeamId('TEAM 01'), 'team_01');
assert.equal(api.getFinalProjectSubmissionPolicy(Date.parse('2099-08-23T00:00:00+07:00')).open, true);
assert.equal(api.getFinalProjectSubmissionPolicy(Date.parse('2099-08-25T00:00:00+07:00')).reason, 'deadline_passed');
settings.finalProjectSubmissionOpen = false;
assert.equal(api.getFinalProjectSubmissionPolicy(Date.parse('2099-08-23T00:00:00+07:00')).reason, 'manually_closed');
settings.finalProjectSubmissionOpen = true;

const teamAPayload = {
    __auth: { sub: '0001', scope: 'participant' },
    nik: '0001',
    project_id: 'team_01',
    team_id: 'team_01',
    team_name: 'CLIENT-SPOOFED-NAME',
    title: 'Project Team A',
    track: 'HealthTech',
    tagline: 'Tagline',
    cover_url: 'https://example.test/cover.jpg',
    tech_stack: 'JavaScript',
    problem: 'Problem',
    solution: 'Solution',
    deck_url: 'https://example.test/deck.pdf',
    repo_url: 'https://example.test/repo',
    demo_url: 'https://example.test/demo',
    score: '999',
    notes: 'client must not control this',
    status: 'published'
};
teamAPayload.submitted_at = new Date().toISOString();

projects = [{
    project_id: 'team_01',
    team_id: 'team_01',
    team_name: 'TEAM 01',
    title: 'Old title',
    project_title: 'Old title',
    cover_url: 'https://example.test/old-cover.jpg',
    deck_url: 'https://example.test/old-deck.pdf',
    repo_url: 'https://example.test/old-repo',
    demo_url: 'https://example.test/old-demo',
    status: 'submitted',
    score: '88',
    notes: 'admin note',
    mentor: 'Assigned mentor',
    members: 'Member list',
    institution: 'Institution'
}];

const submitResult = api.submitFinalProject(teamAPayload);
assert.equal(submitResult.status, 'success');
assert.equal(projects[0].project_id, 'team_01');
assert.equal(projects[0].team_name, 'TEAM 01');
assert.equal(projects[0].score, '88');
assert.equal(projects[0].notes, 'admin note');
assert.equal(projects[0].mentor, 'Assigned mentor');
assert.equal(projects[0].status, 'submitted');
assert.equal(projects[0].submitted_at, teamAPayload.submitted_at);
assert.equal(submitResult.project.score, undefined);
assert.equal(submitResult.project.notes, undefined);
assert.equal(writeCalls, 1);

const serverTimestamp = api.resolveFinalProjectSubmissionTimestamp('2000-01-01T00:00:00.000Z', Date.parse('2026-08-26T00:00:00.000Z'));
assert.equal(serverTimestamp, '2026-08-26T00:00:00.000Z');

assert.throws(() => api.submitFinalProject({
    ...teamAPayload,
    project_id: 'team_02',
    team_id: 'team_02'
}), /tidak sesuai dengan tim/);
assert.equal(writeCalls, 1);

assert.throws(() => api.submitFinalProject({
    ...teamAPayload,
    __auth: { sub: '0003', scope: 'participant' },
    nik: '0003'
}), /Tim peserta belum terdaftar/);
assert.equal(writeCalls, 1);

const participantRead = api.getParticipantFinalProjects(teamAPayload);
assert.equal(participantRead.status, 'success');
assert.equal(participantRead.project.is_own_project, true);
assert.equal(participantRead.project.score, undefined);
assert.equal(participantRead.project.notes, undefined);

const publicRead = api.getPublicFinalProjects();
assert.equal(publicRead.status, 'success');
assert.equal(publicRead.data[0].score, undefined);
assert.equal(publicRead.data[0].notes, undefined);

assert.throws(() => api.deleteFinalProject({
    __auth: { sub: '0001', scope: 'participant' },
    project_id: 'team_02',
    team_id: 'team_02'
}), /tidak sesuai dengan tim/);
assert.equal(deleteCalls, 0);

const deleteResult = api.deleteFinalProject({
    __auth: { sub: '0001', scope: 'participant' },
    project_id: 'team_01',
    team_id: 'team_01'
});
assert.equal(deleteResult.status, 'success');
assert.equal(deleteResult.deleted, true);
assert.equal(projects.length, 0);
assert.equal(deleteCalls, 1);

const alreadyAbsent = api.deleteFinalProject({
    __auth: { sub: '0001', scope: 'participant' },
    project_id: 'team_01',
    team_id: 'team_01'
});
assert.equal(alreadyAbsent.already_absent, true);
assert.equal(deleteCalls, 1);

projects = [{ project_id: 'team_01', team_id: 'team_01', team_name: 'TEAM 01' }];
context.deleteByKey = () => ({ status: 'error', message: 'simulated database failure' });
assert.throws(() => api.deleteFinalProject({
    __auth: { sub: '0001', scope: 'participant' },
    project_id: 'team_01',
    team_id: 'team_01'
}), /simulated database failure/);
assert.equal(projects.length, 1);

settings.finalProjectSubmissionDeadline = pastDeadline;
assert.throws(() => api.submitFinalProject(teamAPayload), /Batas waktu/);
assert.throws(() => api.deleteFinalProject({
    __auth: { sub: '0001', scope: 'participant' },
    project_id: 'team_01',
    team_id: 'team_01'
}), /Batas waktu/);

let settingsUpdatedBy = '';
context.upsertByKey = (sheetName, key, value, row) => {
    assert.equal(sheetName, 'Settings');
    assert.equal(key, 'key');
    settings[value] = JSON.parse(row.value);
    settingsUpdatedBy = row.updated_by;
    return { status: 'success' };
};
const settingsResult = api.saveSettingsObject({
    finalProjectSubmissionOpen: false,
    finalProjectSubmissionDeadline: futureDeadline
}, { sub: 'superadmin-test' });
assert.equal(settingsResult.status, 'success');
assert.equal(settingsResult.settings.finalProjectSubmissionOpen, false);
assert.equal(settingsUpdatedBy, 'superadmin-test');

assert.match(gasSource, /'getPublicFinalProjects'[\s\S]*'getFinalProjectSubmissionPolicy'/);
assert.doesNotMatch(
    gasSource.match(/const publicActions = \[[\s\S]*?\];/)?.[0] || '',
    /'getFinalProjects'/
);
assert.match(gasSource, /'getParticipantFinalProjects'/);
assert.doesNotMatch(participantSource, /action:\s*'getFinalProjects'/);
assert.doesNotMatch(participantSource, /Continue with local removal/);
assert.ok(participantSource.indexOf("result?.status !== 'success'") < participantSource.indexOf('cachedProjects = cachedProjects.filter'));
assert.match(adminSource, /finalProjectSubmissionDeadline/);
assert.match(adminSource, /Backend tidak mengonfirmasi penyimpanan settings/);
assert.match(settingsPageSource, /id="toggleFinalProjectSubmission"/);
assert.match(settingsPageSource, /id="finalProjectSubmissionDeadline"/);

console.log('Project security contract valid: authoritative team ownership, server deadline, sanitized reads, and delete acknowledgment all pass.');
