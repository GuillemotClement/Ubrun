const { assertions, routes } = require('./lighthouse.setting.cjs');

const config = {
  ci: {
    collect: {
      url: routes,
      startServerCommand: 'npm run start',
      startServerReadyPattern: 'Ready|ready|started server|Local:',
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions,
    },
    upload: {
      target: 'temporary-public-storage',
      githubStatusContextSuffix: 'desktop',
    },
  },
};

// export default config;
module.exports = config;
