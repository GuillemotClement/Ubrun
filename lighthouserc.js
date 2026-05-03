module.exports = {
  ci: {
    startServerCommande: "npm run start",
    startServerReadyPattern: "ready",
    url: ["http://localhost:3000"],
    numberOfRuns: 1,
  },
  upload: {
    target: "temporary-public-storage",
  },
};
