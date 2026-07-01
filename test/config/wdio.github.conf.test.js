import assert from 'node:assert/strict'
import test from 'node:test'

test('GitHub config includes UPL8 tagged CI suites by default', async () => {
  const originalEnv = {
    ENABLE_UPL_8_AND_10_20260303: process.env.ENABLE_UPL_8_AND_10_20260303,
    ENABLE_LAND_GRANT_HEFER_20260219:
      process.env.ENABLE_LAND_GRANT_HEFER_20260219,
    ENABLE_LAND_GRANT_SSSI_20260122: process.env.ENABLE_LAND_GRANT_SSSI_20260122
  }

  delete process.env.ENABLE_UPL_8_AND_10_20260303
  delete process.env.ENABLE_LAND_GRANT_HEFER_20260219
  delete process.env.ENABLE_LAND_GRANT_SSSI_20260122

  try {
    const { config } = await import('../../wdio.github.conf.js')
    const upl8SuiteTitle =
      'Single action selection and funding details verification @cdp @ci Given farmer applies only for UPL8 @upl8'

    assert.equal(config.mochaOpts.grep.test(upl8SuiteTitle), true)
  } finally {
    restoreEnv(originalEnv)
  }
})

function restoreEnv(originalEnv) {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key]
      continue
    }
    process.env[key] = value
  }
}
