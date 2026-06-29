import { expect } from '@wdio/globals'
import { getBackendAuthorizationToken } from '~/test/utils/backend-auth-helper.js'
import { mintLockToken } from '~/test/utils/lock-token.js'

const GRANT_CODE = 'farm-payments'

const backendUrl = () =>
  process.env.RUN_ENV !== 'local'
    ? browser.options.baseBackendUrl
    : `https://ephemeral-protected.api.${process.env.ENVIRONMENT}.cdp-int.defra.cloud/grants-ui-backend`

class Backend {
  async deleteState(crn, sbi) {
    console.log('backendUrl: ', backendUrl())

    const headers =
      process.env.RUN_ENV !== 'local'
        ? {
            Authorization: `Bearer ${getBackendAuthorizationToken()}`,
            'x-application-lock-owner': mintLockToken(crn, sbi, GRANT_CODE)
          }
        : {
            'x-api-key': process.env.GRANTS_UI_BACKEND_API_KEY,
            Authorization: `Bearer ${getBackendAuthorizationToken()}`,
            'x-application-lock-owner': mintLockToken(crn, sbi, GRANT_CODE)
          }

    const response = await fetch(
      `${backendUrl()}/state?sbi=${sbi}&grantCode=${GRANT_CODE}`,
      {
        method: 'DELETE',
        headers
      }
    )
    await expect(response.status === 200 || response.status === 404).toBe(true)
  }
}

export default new Backend()
