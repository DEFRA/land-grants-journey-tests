import allure from 'allure-commandline'
import { browserStackCapabilities } from './wdio.browserstack.capabilities.js'

export const config = {
  user: process.env.BROWSERSTACK_USER,
  key: process.env.BROWSERSTACK_KEY,
  // local
  // baseUrl: 'https://localhost:3000/'
  // dev
  baseUrl: 'https://grants-ui.dev.cdp-int.defra.cloud/',
  runner: 'local',
  specs: ['./test/specs/*.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: browserStackCapabilities,
  services: [
    [
      'browserstack',
      {
        testObservability: true,
        testObservabilityOptions: {
          user: process.env.BROWSERSTACK_USER,
          key: process.env.BROWSERSTACK_KEY,
          projectName: 'land-grants-journey-tests',
          buildName: 'land-grants-journey-tests-local'
        },
        acceptInsecureCerts: true,
        forceLocal: true,
        browserstackLocal: true
      }
    ]
  ],
  logLevel: 'info',
  bail: 1,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results'
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 600000,
    retries: 2
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    await browser.takeScreenshot()

    if (error) {
      browser.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}'
      )
    }
  },
  onComplete: function (exitCode, config, capabilities, results) {
    const reportError = new Error('Could not generate Allure report')
    const generation = allure(['generate', 'allure-results', '--clean'])

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 60000)

      generation.on('exit', function (exitCode) {
        clearTimeout(generationTimeout)

        if (exitCode !== 0) {
          return reject(reportError)
        }

        allure(['open'])
        resolve()
      })
    })
  }
}
