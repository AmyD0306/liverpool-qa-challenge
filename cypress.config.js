const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 40000,
    pageLoadTimeout: 60000,
    screenshotOnRunFailure: true,
    video: false,

    blockHosts: [
      '*.quantummetric.com',
      '*.adnxs.com',
      '*.curalate.com',
      '*.google-analytics.com',
      '*.googletagmanager.com',
      '*.facebook.net',
      '*.doubleclick.net',
      '*.bambuser.com',
      '*.medallia.com',
    ],

    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },

        table(data) {
          console.table(data)
          return null
        },
      })

      return config
    },
  },
})