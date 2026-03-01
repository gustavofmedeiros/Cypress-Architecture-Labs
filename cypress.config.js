const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  env: {
    uiBaseUrl: 'https://demoqa.com',
    apiBaseUrl: 'https://bookstore.toolsqa.com'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
