import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from 'page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ConfirmYouWillBeEligiblePage from 'page-objects/confirm.you.will.be.eligible.page'

afterEach(async () => {
  // Clear all cookies after each test
  await browser.deleteAllCookies()
})

describe('CMOR1 action - land parcel has no intersection with the moorland data layer @cdp @ci', () => {
  describe('Given farmer is eligible for funding', () => {
    it('When farmer selects land parcel that has no intersection with the moorland data layer', async () => {
      const parcel = 'SD6843-7039'
      const action = 'UPL1'

      await performActionSelection(parcel, action)
      it('Then the appropriate error message is show for intersection with the moorland layer', async () => {})
      const errorMessage = 'This parcel is not majority on the moorland'
      await expect(await ActionsPage.getErrorMessage()).toContain(errorMessage)
    })
  })
})

async function performActionSelection(parcel, action) {
  await HomePage.open()
  await LoginPage.login('1102838829')
  await HomePage.clearApplicationState()
  await ConfirmYourDetailsPage.clickButton('Continue')
  await ConfirmYouWillBeEligiblePage.clickButton('Continue')
  await ConfirmYourLandDetailsPage.clickButton('Continue')
  await SelectLandParcelsPage.selectRequiredLandParcel(parcel)
  await SelectLandParcelsPage.clickButton('Continue')
  await ActionsPage.selectRequiredAction(action)
  await SelectLandParcelsPage.clickButton('Continue')
}
