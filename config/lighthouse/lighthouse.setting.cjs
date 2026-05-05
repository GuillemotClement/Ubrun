// définis les routes à tester
const routes = [
  'http://localhost:3000',
  'http://localhost:3000/tools/fcm',
  'http://localhost:3000/tools/vma',
];

// définis les seuils minimal de validation
const assertions = {
  'categories:performance': ['error', { minScore: 0.9 }],
  'categories:accessibility': ['error', { minScore: 0.9 }],
  'categories:best-practices': ['error', { minScore: 0.9 }],
  'categories:seo': ['error', { minScore: 0.9 }],
};

module.exports = {
  routes,
  assertions,
};
