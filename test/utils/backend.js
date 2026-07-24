import { browser, expect } from '@wdio/globals'
import { getBackendAuthorizationToken } from './backend-auth-helper.js'
import { resolveBackendUrl } from './backend-url.js'

function backendUrl() {
  return resolveBackendUrl({ baseBackendUrl: browser.options.baseBackendUrl })
}

function backendHeaders(headers = {}) {
  const authHeaders = {
    Authorization: `Bearer ${getBackendAuthorizationToken()}`,
    ...headers
  }

  if (
    process.env.RUN_ENV === 'local' &&
    process.env.GRANTS_UI_BACKEND_API_KEY
  ) {
    return {
      'x-api-key': process.env.GRANTS_UI_BACKEND_API_KEY,
      ...authHeaders
    }
  }

  return authHeaders
}

const GRANT_CODE = 'farm-payments'

class Backend {
  /**
   * Clears all test data (state, submissions, locks) for a given SBI
   * via the backend's /admin/test-data endpoint. Only permitted in
   * non-production environments.
   */
  async clearTestData(sbi) {
    console.log('Backend Endpoint URL: ' + backendUrl())
    const response = await fetch(
      `${backendUrl()}/admin/test-data?sbi=${sbi}&grantCode=${GRANT_CODE}`,
      {
        method: 'DELETE',
        headers: backendHeaders()
      }
    )

    await expect(response.status).toBe(200)
  }
}

export default new Backend()
