const prodSpecs = ['./test/specs/prod/**/*.js']
const nonProdSpecs = ['./test/specs/non-prod/**/*.js']

export function getSpecsForEnv(env = process.env.ENVIRONMENT) {
  const normalized = (env || '').toLowerCase()
  return normalized === 'prod' ? prodSpecs : nonProdSpecs
}
