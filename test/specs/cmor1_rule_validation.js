import { expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from '~/test/page-objects/confirm.your.land.details.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import ConfirmYouWillBeEligiblePage from '../page-objects/confirm.you.will.be.eligible.page'

afterEach(async () => {
  // Clear all cookies after each test
  await browser.deleteCookies()
})

describe('CMOR1 action - land parcel has no intersection with the moorland data layer', () => {
  describe('Given farmer is eligible for funding', () => {
    it('When farmer selects land parcel that has no intersection with the moorland data layer', async () => {
      const parcel = 'SD6843-7039'
      const action = 'UPL1'

      await performActionSelection(parcel, action)
      it('Then the appropriate error message is show for intersection with the moorland layer', async () => {})
      const errorMessage =
        'The parcel has a 0% intersection with the moorland layer, the minimum is 50% with a tolerance of 1%'
      await expect(await ActionsPage.getErrorMessage()).toContain(errorMessage)
    })
  })
})

async function performActionSelection(parcel, action) {
  await HomePage.open()
  await HomePage.clickButton('Start now')
  await ConfirmYourDetailsPage.clickButton('Continue')
  await ConfirmYouWillBeEligiblePage.clickButton('Continue')
  await ConfirmYourLandDetailsPage.clickButton('Continue')
  await LandParcelsPage.selectRadioButtonByValue(parcel)
  await LandParcelsPage.clickButton('Continue')
  await ActionsPage.selectRequiredAction(action)
  await LandParcelsPage.clickButton('Continue')
}
