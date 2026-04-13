/** Single Edge capability used for normal runs when RUN_COMPATIBILITY_TESTS is false. */
export const defaultCapabilities = [
  {
    browserName: 'Edge',
    'wdio-ics:options': {
      logName: 'win-edge'
    },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  }
]

/** All browser combinations for compatibility runs when RUN_COMPATIBILITY_TESTS is true. */
export const compatibilityTestCapabilities = [
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'win-chrome' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'win-chrome-latest-3' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest-3',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Edge',
    'wdio-ics:options': { logName: 'win-edge' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Edge',
    'wdio-ics:options': { logName: 'win-edge-latest-3' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest-3',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Firefox',
    'wdio-ics:options': { logName: 'win-firefox' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Firefox',
    'wdio-ics:options': { logName: 'win-firefox-latest-3' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest-3',
      os: 'Windows',
      osVersion: '11'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'osx-chrome' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'osx-chrome-latest-3' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest-3',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Safari',
    'wdio-ics:options': { logName: 'osx-safari' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Safari',
    'wdio-ics:options': { logName: 'osx-safari-latest-3' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest-3',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Firefox',
    'wdio-ics:options': { logName: 'osx-firefox' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Firefox',
    'wdio-ics:options': { logName: 'osx-firefox-latest-3' },
    'bstack:options': {
      idleTimeout: 300,
      resolution: '1920x1080',
      browserVersion: 'latest-3',
      os: 'OS X',
      osVersion: 'Sequoia'
    }
  },
  {
    browserName: 'Safari',
    'wdio-ics:options': { logName: 'ios-safari' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'iPhone 14',
      osVersion: '16',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Safari',
    'wdio-ics:options': { logName: 'ios-safari-older' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'iPhone 13',
      osVersion: '15',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'ios-chrome' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'iPhone 15',
      osVersion: '16',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'ios-chrome-older' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'iPhone 13',
      osVersion: '15',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'android-chrome' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'Samsung Galaxy S23',
      osVersion: '13.0',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Chrome',
    'wdio-ics:options': { logName: 'android-chrome-older' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'Samsung Galaxy S22',
      osVersion: '12.0',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Samsung',
    'wdio-ics:options': { logName: 'android-samsung-internet' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'Samsung Galaxy S23',
      osVersion: '13.0',
      realMobile: true,
      browserVersion: 'latest'
    }
  },
  {
    browserName: 'Samsung',
    'wdio-ics:options': { logName: 'android-samsung-internet-older' },
    'bstack:options': {
      idleTimeout: 300,
      deviceName: 'Samsung Galaxy S22',
      osVersion: '12.0',
      realMobile: true,
      browserVersion: 'latest'
    }
  }
]

/**
 * Returns capabilities based on RUN_COMPATIBILITY_TESTS.
 * - true: all browser combinations (compatibility run)
 * - false: single Edge browser (normal run)
 */
export function getCapabilitiesForRun() {
  const runCompatibility =
    (process.env.RUN_COMPATIBILITY_TESTS || '').toLowerCase() === 'true'
  return runCompatibility ? compatibilityTestCapabilities : defaultCapabilities
}

export const browserStackCapabilities = defaultCapabilities
