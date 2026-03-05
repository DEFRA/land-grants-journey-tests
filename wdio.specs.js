const prodSpecs = ['./test/specs/prod/**/*.js']
const nonProdSpecs = ['./test/specs/non-prod/**/*.js']

export function getSpecsForEnv(env = process.env.ENVIRONMENT) {
  const normalized = (env || '').toLowerCase()
  return normalized === 'prod' ? prodSpecs : nonProdSpecs
}

/** Envs where @dev (including @ci @dev) is always excluded. */
const STRICT_EXCLUDE_DEV_ENVS = ['test', 'ext-test', 'perf-test', 'prod']

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
  if (normalized === 'dev') {
    return options.andGrep ? { grep: options.andGrep } : {}
  }

  const strictExclude =
    STRICT_EXCLUDE_DEV_ENVS.includes(normalized)

  if (options.andGrep) {
    if (strictExclude) {
      // Exclude all @dev
      return {
        grep: new RegExp(
          `^(?=.*${escapeRegex(options.andGrep)})(?!.*@dev).*$`
        )
      }
    }
    // Exclude @dev unless the test also has @ci (e.g. staging)
    return {
      grep: new RegExp(
        `^(?=.*${escapeRegex(options.andGrep)})(?=(?:.*@ci|(?!.*@dev))).*$`
      )
    }
  }

  if (strictExclude) {
    return { grep: '@dev', invert: true }
  }
  return {
    grep: new RegExp(`^(?=(?:.*@ci|(?!.*@dev))).*$`)
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Specs for compatibility runs (single smoke test against all browsers). */
const compatibilitySpecs = ['./test/specs/non-prod/select_single_action.e2e.js']

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
