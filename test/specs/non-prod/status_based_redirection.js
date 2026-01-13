import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import ConfirmYourLandDetailsPage from 'page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ConfirmYouWillBeEligiblePage from 'page-objects/confirm.you.will.be.eligible.page'
import ConfirmationPage from 'page-objects/confirmation.page.js'
import Gas from '~/test/utils/gas.js'

describe('Redirection of browser based on application status in GAS @ci', () => {
  describe('Given the farmer has submitted an application', () => {
    const crn = '1103623923'
    const parcel = 'SD7858-1059'
    const action = 'CMOR1'

    describe('When the application is being processed by case working', () => {
      it('Then the user should be redirected to their confirmation details', async () => {
        await HomePage.open()
        await LoginPage.login(crn)
        await ConfirmYourDetailsPage.clickButton('Continue')
        await ConfirmYouWillBeEligiblePage.clickButton('Continue')
        await ConfirmYourLandDetailsPage.clickButton('Continue')
        await SelectLandParcelsPage.selectRequiredLandParcel(parcel)
        await SelectLandParcelsPage.clickButton('Continue')
        await ActionsPage.selectRequiredAction(action)
        await SelectLandParcelsPage.clickButton('Continue')
        await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
          'false'
        )
        await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')
        const submitButton = await SubmitYourApplicationPage.submitButton()
        await submitButton.click()
        const referenceNumber = await ConfirmationPage.getReferenceNumber()

        await Gas.setStatusQueryResponse(
          referenceNumber,
          'APPLICATION_RECEIVED'
        )
        await HomePage.open()
        await expect(browser).toHaveUrl(
          expect.stringContaining('/confirmation')
        )

        await browser.url('/farm-payments/clear-application-state')
        await browser.deleteAllCookies()
      })
    })

    describe('When an agreement has been offered', () => {
      it('Then the user should be redirected to their agreement', async () => {
        await HomePage.open()
        await LoginPage.login(crn)
        await ConfirmYourDetailsPage.clickButton('Continue')
        await ConfirmYouWillBeEligiblePage.clickButton('Continue')
        await ConfirmYourLandDetailsPage.clickButton('Continue')
        await SelectLandParcelsPage.selectRequiredLandParcel(parcel)
        await SelectLandParcelsPage.clickButton('Continue')
        await ActionsPage.selectRequiredAction(action)
        await SelectLandParcelsPage.clickButton('Continue')
        await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
          'false'
        )
        await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')
        const submitButton = await SubmitYourApplicationPage.submitButton()
        await submitButton.click()
        const referenceNumber = await ConfirmationPage.getReferenceNumber()

        await Gas.setStatusQueryResponse(referenceNumber, 'AGREEMENT_OFFERED')
        await HomePage.open()
        await expect(browser).toHaveUrl(expect.stringContaining('/agreement'))

        await browser.url('/farm-payments/clear-application-state')
        await browser.deleteAllCookies()
      })
    })
  })
})
