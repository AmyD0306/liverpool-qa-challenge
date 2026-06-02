const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    screenshotOnRunFailure: true,
    video: false,

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