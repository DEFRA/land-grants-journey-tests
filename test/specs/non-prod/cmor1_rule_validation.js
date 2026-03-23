import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import { performActionSelection } from '~/test/utils/journey-helpers.js'

afterEach(async () => {
  // Clear all cookies after each test
  await browser.deleteAllCookies()
})

const crn = '1102838829'
const sbi = '106284736'

describe('CMOR1 action - land parcel has no intersection with the moorland data layer @cdp @ci', () => {
  describe('Given farmer is eligible for funding', () => {
    it('When farmer selects land parcel that has no intersection with the moorland data layer', async () => {
      const parcel = 'SD6843-7039'
      const action = 'UPL1'

      before(async () => {
        await HomePage.clearApplicationStateWithApi(crn, sbi)
      })

      await performActionSelection({ crn, sbi, parcel, action })
      it('Then the appropriate error message is show for intersection with the moorland layer', async () => {})
      const errorMessage = 'This parcel is not majority on the moorland'
      await expect(await ActionsPage.getErrorMessage()).toContain(errorMessage)
    })
  })
})
