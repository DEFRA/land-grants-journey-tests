import { browser, expect } from '@wdio/globals'
import { getBackendAuthorizationToken } from './backend-auth-helper.js'
import { mintLockToken } from './lock-token.js'

const LOCKED = Symbol('locked')

// The resolved grant version is a grant-level property, so cache it per grant
// code to avoid re-probing the backend on every state/lock operation.
const grantVersionCache = new Map()

function backendUrl() {
  if (browser.options.baseBackendUrl) {
    return browser.options.baseBackendUrl
  }

  if (process.env.BASE_BACKEND_URL) {
    return process.env.BASE_BACKEND_URL
  }

  if (process.env.RUN_ENV === 'local' && process.env.ENVIRONMENT) {
    return `https://ephemeral-protected.api.${process.env.ENVIRONMENT}.cdp-int.defra.cloud/grants-ui-backend`
  }

  return process.env.ENVIRONMENT
    ? `https://grants-ui-backend.${process.env.ENVIRONMENT}.cdp-int.defra.cloud`
    : 'http://localhost:3001'
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

function stateUrl(sbi, grantCode, grantVersion) {
  const params = new URLSearchParams({ sbi, grantCode })

  if (grantVersion) {
    params.set('grantVersion', grantVersion)
  }

  return `${backendUrl()}/state?${params.toString()}`
}

class Backend {
  /**
   * Probes POST /state/with-definition and derives the grant version resolved
   * by the backend, mirroring the grants-ui app's own resolution.
   *
   * @returns {Promise<string | undefined | typeof LOCKED>} the version,
   *   undefined when the grant has no backend definition, or LOCKED on 423
   */
  async probeGrantVersion(crn, sbi, grantCode) {
    const response = await fetch(`${backendUrl()}/state/with-definition`, {
      method: 'POST',
      headers: backendHeaders({
        'Content-Type': 'application/json',
        'x-application-lock-owner': mintLockToken(crn, sbi, grantCode)
      }),
      body: JSON.stringify({ sbi, grantCode, includeDefinition: true })
    })

    if (response.status === 404) {
      return undefined
    }

    if (response.status === 423) {
      return LOCKED
    }

    await expect(response.status).toBe(200)

    const body = await response.json()
    if (body?.upgraded && body.toVersion) {
      return body.toVersion
    }

    if (body?.state?.grantVersion) {
      return body.state.grantVersion
    }

    const definition = body?.definition
    return definition
      ? `${definition.major}.${definition.minor}.${definition.patch}`
      : undefined
  }

  /**
   * Resolves the grant version the backend persists state and locks under.
   * Backend-sourced grants are served at their released version; legacy grants
   * with no backend definition resolve to undefined and use the backend default.
   *
   * @returns {Promise<string | undefined>} the resolved version, or undefined
   */
  async resolveGrantVersion(crn, sbi, grantCode) {
    if (grantVersionCache.has(grantCode)) {
      return grantVersionCache.get(grantCode)
    }

    let version = await this.probeGrantVersion(crn, sbi, grantCode)
    if (version === LOCKED) {
      const unlockedSbi = String(
        Math.floor(900000000 + Math.random() * 99999999)
      )
      version = await this.probeGrantVersion(crn, unlockedSbi, grantCode)
    }

    if (version === LOCKED) {
      version = undefined
    }

    grantVersionCache.set(grantCode, version)
    return version
  }

  async deleteLock(crn, sbi, grantCode) {
    const grantVersion =
      (await this.resolveGrantVersion(crn, sbi, grantCode)) ?? 1
    const params = new URLSearchParams({
      ownerId: crn,
      sbi,
      grantCode,
      grantVersion: String(grantVersion)
    })
    const response = await fetch(
      `${backendUrl()}/admin/application-lock?${params.toString()}`,
      {
        method: 'DELETE',
        headers: backendHeaders()
      }
    )

    await expect(response.status === 200 || response.status === 404).toBe(true)
  }

  async deleteState(crn, sbi, grantCode) {
    const grantVersion = await this.resolveGrantVersion(crn, sbi, grantCode)
    const response = await fetch(stateUrl(sbi, grantCode, grantVersion), {
      method: 'DELETE',
      headers: backendHeaders({
        'x-application-lock-owner': mintLockToken(
          crn,
          sbi,
          grantCode,
          grantVersion
        )
      })
    })

    await expect(response.status === 200 || response.status === 404).toBe(true)
  }
}

export default new Backend()
