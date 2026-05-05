// {
//   "ci": {
//     "collect": {
//       "url": [
//         "http://localhost:3000",
//         "http://localhost:3000/tools/fcm",
//         "http://localhost:3000/tools/vma"
//       ],
//       "startServerCommand": "npm run start",
//       "startServerReadyPattern": "Ready|ready|started server|Local:",
//       "numberOfRuns": 1,
//       "settings": {
//         "preset": "desktop"
//       }
//     },
//     "assert": {
//       "assertions": {
//         "categories:performance": ["error", { "minScore": 0.9 }],
//         "categories:accessibility": ["error", { "minScore": 0.9 }],
//         "categories:best-practices": ["error", { "minScore": 0.9 }],
//         "categories:seo": ["error", { "minScore": 0.9 }]
//       }
//     },
//     "upload": {
//       "target": "temporary-public-storage",
//       "githubStatusContextSuffix": "desktop"
//     }
//   }
// }
// config/lighthouse/lighthouserc.desktop.js
import { assertions, routes } from './lighthouse.setting.mjs';

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

export default config;
