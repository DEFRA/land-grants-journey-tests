import fs from 'node:fs'

export const config = {
  hostname: 'selenium-chrome',
  port: 4444,
  runner: 'local',
  specs: ['./test/specs/non-prod/**/*.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--ignore-certificate-errors']
      }
    }
  ],
  execArgv: ['--loader', 'esm-module-alias/loader'],
  logLevel: 'warn',
  bail: 1,
  baseUrl: process.env.BASE_URL,
  waitforTimeout: 10000,
  waitforInterval: 200,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    [
      // spec reporter provides rolling output to the logger so you can see it in-progress
      'spec',
      {
        addConsoleLogs: true,
        realtimeReporting: true,
        color: false
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    grep: '@ci'
  },
  onComplete: async function (exitCode, config, capabilities, results) {
    // !Do Not Remove! Required to cause test suite to fail and return non-zero.
    if (results?.failed && results.failed > 0) {
      fs.writeFileSync('FAILED', JSON.stringify(results))
    }
  }
}
