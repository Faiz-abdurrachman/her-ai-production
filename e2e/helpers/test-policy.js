const hasCredentials = Boolean(
  process.env.TEST_PARTICIPANT_NIK && process.env.TEST_PARTICIPANT_PASSWORD
);

const allowMutations = process.env.TEST_ALLOW_MUTATIONS === 'true';
const allowPasswordMutations = process.env.TEST_ALLOW_PASSWORD_MUTATIONS === 'true';
const canRunLiveMutations = hasCredentials && allowMutations;

module.exports = {
  allowMutations,
  allowPasswordMutations,
  hasCredentials,
  canRunLiveMutations,
  canRunPasswordMutations: canRunLiveMutations && allowPasswordMutations
};
