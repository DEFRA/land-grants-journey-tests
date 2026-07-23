import { expect } from '@wdio/globals'

import ActionsPage from 'page-objects/select.actions.page.js'
import { performActionSelection } from '~/test/utils/journey-helpers.js'
import { signOutAndClearCookies } from '~/test/utils/session.js'
import Backend from '~/test/utils/backend.js'

const crn = '1102838829'
const sbi = '106284736'

beforeEach(async () => {
  await signOutAndClearCookies()
  await Backend.clearTestData(sbi)
})

afterEach(async () => {
  try {
    await Backend.clearTestData(sbi)
  } finally {
    await signOutAndClearCookies()
  }
})

describe('CMOR1 action - land parcel has no intersection with the moorland data layer @cdp @ci', () => {
  describe('Given farmer is eligible for funding', () => {
    it('When farmer selects land parcel that has no intersection with the moorland data layer', async () => {
      const parcel = 'SD6843-7039'
      const action = 'UPL1'

      await performActionSelection({ crn, sbi, parcel, action })
      const errorMessage = 'This parcel is not majority on the moorland'
      await expect(await ActionsPage.getErrorMessage()).toContain(errorMessage)
    })
  })
})
