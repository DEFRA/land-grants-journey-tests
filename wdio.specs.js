const prodSpecs = ['./test/specs/prod/**/*.js']
const nonProdSpecs = ['./test/specs/non-prod/**/*.js']

export function getSpecsForEnv(env = process.env.ENVIRONMENT) {
  const normalized = (env || '').toLowerCase()
  return normalized === 'prod' ? prodSpecs : nonProdSpecs
}

/**
 * Mocha grep options so @dev-tagged suites run only when ENVIRONMENT=dev
 * When not dev: exclude @dev
 * For configs that also filter by another tag (e.g. @cdp), pass { andGrep: '@cdp' }
 * to run suites matching andGrep but excluding @dev when not dev.
 *
 * @param {{ andGrep?: string }} [options] - andGrep: when not dev, use regex that matches andGrep but not @dev
 * @returns {object} Options to spread into mochaOpts (grep, invert, or combined regex)
 */
export function getMochaGrepOptsForEnv(
  options = {},
  env = process.env.ENVIRONMENT
) {
  const normalized = (env || '').toLowerCase()
  if (normalized === 'dev') {
    return options.andGrep ? { grep: options.andGrep } : {}
  }
  if (options.andGrep) {
    // Match andGrep (e.g. @cdp) but exclude @dev
    return {
      grep: new RegExp(`^(?=.*${escapeRegex(options.andGrep)})(?!.*@dev).*$`)
    }
  }
  return { grep: '@dev', invert: true }
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
