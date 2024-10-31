const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 10_000,
    defaultCommandTimeout: 10_000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
    retries: 0,
  },
});
