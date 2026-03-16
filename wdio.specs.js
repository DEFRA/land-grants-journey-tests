const prodSpecs = ['./test/specs/prod/**/*.js']
const nonProdSpecs = ['./test/specs/non-prod/**/*.js']

export function getSpecsForEnv(env = process.env.ENVIRONMENT) {
  const normalized = (env || '').toLowerCase()
  return normalized === 'prod' ? prodSpecs : nonProdSpecs
}

/** Envs where @dev (including @ci @dev) is always excluded. */
const STRICT_EXCLUDE_DEV_ENVS = ['test', 'ext-test', 'perf-test', 'prod']

/** Tag to feature flag - exclude @tag tests when the flag is not 'true'. */
const TAG_TO_FLAG = {
  '@hefer': 'ENABLE_LAND_GRANT_HEFER_20260219',
  '@sssi': 'ENABLE_LAND_GRANT_SSSI_20260122',
  '@upl8': 'ENABLE_UPL_8_AND_10_20260303'
}

/**
 * Set all TAG_TO_FLAG env vars to 'true' if not already set.
 * Call from wdio.ci.conf.js so CI runs all feature-flagged tests by default.
 */
export function ensureAllFeatureFlagsOn() {
  for (const flag of Object.values(TAG_TO_FLAG)) {
    if (!process.env[flag]) {
      process.env[flag] = 'true'
    }
  }
}

function getFeatureFlagExcludeLookaheads() {
  const parts = []
  for (const [tag, flag] of Object.entries(TAG_TO_FLAG)) {
    const enabled =
      (process.env[flag] || '').toString().toLowerCase() === 'true'
    if (!enabled) {
      parts.push(`(?!.*${escapeRegex(tag)})`)
    }
  }
  return parts.join('')
}

/**
 * Mocha grep options for @dev-tagged suites:
 * - dev: run all
 * - test/ext-test/perf-test/prod: exclude all @dev (including @ci @dev)
 * - other: exclude @dev unless the test also has @ci
 *
 * @param {{ andGrep?: string }} [options] - andGrep: e.g. '@cdp'
 * @returns {object} Options to spread into mochaOpts
 */
export function getMochaGrepOptsForEnv(
  options = {},
  env = process.env.ENVIRONMENT
) {
  const normalized = (env || '').toLowerCase()
  const featureFlagLookaheads = getFeatureFlagExcludeLookaheads()
  if (normalized === 'dev') {
    if (!featureFlagLookaheads) {
      return options.andGrep ? { grep: options.andGrep } : {}
    }
    const base = options.andGrep
      ? `^(?=.*${escapeRegex(options.andGrep)})`
      : '^'
    return { grep: new RegExp(`${base}${featureFlagLookaheads}.*$`) }
  }

  const strictExclude = STRICT_EXCLUDE_DEV_ENVS.includes(normalized)

  if (options.andGrep) {
    const andGrep = escapeRegex(options.andGrep)
    if (strictExclude) {
      return {
        grep: new RegExp(
          `^(?=.*${andGrep})(?!.*@dev)${featureFlagLookaheads}.*$`
        )
      }
    }
    return {
      grep: new RegExp(
        `^(?=.*${andGrep})(?=(?:.*@ci|(?!.*@dev)))${featureFlagLookaheads}.*$`
      )
    }
  }

  if (strictExclude) {
    return {
      grep: new RegExp(`^(?!.*@dev)${featureFlagLookaheads}.*$`)
    }
  }
  return {
    grep: new RegExp(`^(?=(?:.*@ci|(?!.*@dev)))${featureFlagLookaheads}.*$`)
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Specs for compatibility runs (single smoke test against all browsers). */
const compatibilitySpecs = ['./test/specs/non-prod/select_single_action.e2e.js']

/**
 * Mocha grep for CI: @ci with feature-flag exclusions.
 */
export function getMochaGrepOptsForCI() {
  const lookaheads = getFeatureFlagExcludeLookaheads()
  return {
    grep: new RegExp(`^(?=.*@ci)${lookaheads}.*$`)
  }
}

/**
 * Returns specs for BrowserStack runs.
 * - When RUN_COMPATIBILITY_TESTS=true: only select_single_action.e2e.js
 * - Otherwise: normal env-based specs (getSpecsForEnv)
 */
export function getSpecsForBrowserStack() {
  const runCompatibility =
    (process.env.RUN_COMPATIBILITY_TESTS || '').toLowerCase() === 'true'
  return runCompatibility ? compatibilitySpecs : getSpecsForEnv()
}
