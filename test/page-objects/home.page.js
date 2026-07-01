import { Page } from './page.js'
import { getBackendAuthorizationToken } from '~/test/utils/backend-auth-helper.js'
import { mintLockToken } from '~/test/utils/lock-token.js'

class HomePage extends Page {
  async open() {
    return super.open('/farm-payments/')
  }

  async clearApplicationState() {
    return super.open('/farm-payments/clear-application-state')
  }

  async clearApplicationStateWithApi(crn, sbi) {
    // If RUN_ENV is not set or not 'local', use the environment backend URL
    // Otherwise use the ephemeral test backend URL
    const grantCode = 'farm-payments'
    // Delete the known versions used by local and deployed environments so
    // stale state cannot survive when the configured version differs.
    const grantVersions = ['1', '1.0.0', '1.1.0']
    const backendUrl =
      process.env.RUN_ENV !== 'local'
        ? browser.options.baseBackendUrl
        : `https://ephemeral-protected.api.${process.env.ENVIRONMENT}.cdp-int.defra.cloud/grants-ui-backend`
    console.log('backendUrl: ', backendUrl)

    for (const grantVersion of grantVersions) {
      // If RUN_ENV is not set or not 'local', use the headers without x-api-key
      // Otherwise use the headers with x-api-key
      const headers =
        process.env.RUN_ENV !== 'local'
          ? {
              Authorization: `Bearer ${getBackendAuthorizationToken()}`,
              'x-application-lock-owner': mintLockToken(
                crn,
                sbi,
                grantCode,
                grantVersion
              )
            }
          : {
              'x-api-key': process.env.GRANTS_UI_BACKEND_API_KEY,
              Authorization: `Bearer ${getBackendAuthorizationToken()}`,
              'x-application-lock-owner': mintLockToken(
                crn,
                sbi,
                grantCode,
                grantVersion
              )
            }

      const response = await fetch(
        `${backendUrl}/state?sbi=${sbi}&grantCode=${grantCode}&grantVersion=${grantVersion}`,
        {
          method: 'DELETE',
          headers
        }
      )
      await expect(response.status === 200 || response.status === 404).toBe(
        true
      )
    }
  }
}

export default new HomePage()
