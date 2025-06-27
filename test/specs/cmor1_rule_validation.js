import { expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import knockoutQuestionsPage from 'page-objects/knockout.questions.page.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import AgreementNamePage from 'page-objects/agreement.name.page.js'

afterEach(async () => {
  // Clear all cookies after each test
  await browser.deleteCookies()
})

describe('CMOR1 action - area applied for is not the total available area in the land parcel', () => {
  describe('Given farmer is eligible for funding', () => {
    it('When farmer selects land parcel but area applied for is not the total available area of land parcel', async () => {
      const parcel = 'SD6743-6292'
      const agreementName = 'Test Agreement'
      const action = 'CMOR1'
      const area = 10

      await performActionSelection(agreementName, parcel, action, area)
      it('Then the appropriate error message is show for area applied', async () => {})
      const errorMessage =
        'Area applied for (10 ha) does not match parcel area (7.57129024 ha)'
      await expect(await ActionsPage.getErrorMessage()).toContain(errorMessage)
    })
  })
})

describe('CMOR1 action - land parcel has no intersection with the moorland data layer', () => {
  describe('Given farmer is eligible for funding', () => {
    it('When farmer selects land parcel that has no intersection with the moorland data layer', async () => {
      const parcel = 'SD6843-7039'
      const agreementName = 'Test Agreement'
      const action = 'CMOR1'
      const area = 1.33076574

      await performActionSelection(agreementName, parcel, action, area)
      it('Then the appropriate error message is show for intersection with the moorland layer', async () => {})
      const errorMessage =
        'The parcel has a 0% intersection with the moorland layer, the minimum is 50% with a tolerance of 1%'
      await expect(await ActionsPage.getErrorMessage()).toContain(errorMessage)
    })
  })
})

async function performActionSelection(agreementName, parcel, action, area) {
  await HomePage.open()
  await HomePage.clickButton('Start now')
  await knockoutQuestionsPage.selectRadioButtonByValue('true')
  await knockoutQuestionsPage.clickButton('Continue')
  await AgreementNamePage.enterAgreementName(agreementName)
  await AgreementNamePage.clickButton('Continue')
  await LandParcelsPage.selectRadioButtonByValue(parcel)
  await LandParcelsPage.clickButton('Continue')
  await ActionsPage.selectRequiredAction(action, area)
  await LandParcelsPage.clickButton('Continue')
}
