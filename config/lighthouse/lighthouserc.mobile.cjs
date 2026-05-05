// import { assertions, routes } from './lighthouse.setting.cjs';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { assertions, routes } = require('./lighthouse.setting.cjs');

const config = {
  ci: {
    collect: {
      url: routes,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready|ready|started server|Local:',
      numberOfRuns: 1,
    },
    assert: {
      assertions,
    },
    upload: {
      target: 'temporary-public-storage',
      githubStatusContextSuffix: 'mobile',
    },
  },
};

// export default config;
module.exports = config;
