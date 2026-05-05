import { assertions, routes } from './lighthouse.setting.mjs';

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

export default config;
