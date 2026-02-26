import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from 'page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ConfirmYouWillBeEligiblePage from 'page-objects/confirm.you.will.be.eligible.page'
import LoginPage from 'page-objects/login.page.js'
import YouMustHaveConsentPage from 'page-objects/you.must.have.consent.page.js'

describe('Actions that require HEFER Consent @cdp @dev', () => {
  describe('Given farmer is eligible for funding', () => {
    describe('When farmer goes through the land grants application', () => {
      const crn = '1106298365'
      const sbi = '106480734'
      const parcel = 'NT8109-6898'
      const action = 'UPL1'

      it('Then the farmer is shown the landing page', async () => {
        await HomePage.open()
        await LoginPage.login(crn)
      })

      it('Then the farmer is shown confirm your details page', async () => {
        await HomePage.clearApplicationStateWithApi(crn, sbi)
        await expect(browser).toHaveTitle(
          `Confirm your details | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the confirm eligibility page', async () => {
        await ConfirmYourDetailsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Confirm you will be eligible | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the confirm your land details are up to date page', async () => {
        await ConfirmYouWillBeEligiblePage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Confirm your land details are up to date | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the list of land parcels page', async () => {
        await ConfirmYourLandDetailsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select land parcel for actions | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer adds an action to the land parcel', async () => {
        await SelectLandParcelsPage.selectRequiredLandParcel(parcel)
        await SelectLandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select actions for land parcel ${parcel.replace('-', ' ')} | ${SERVICE_NAME}`
        )
        await expect(await ActionsPage.getHeferMessage()).toContain(
          'You must get a HEFER (opens in new tab) to do this action on this land parcel.'
        )
        await ActionsPage.selectRequiredAction(action)
        await SelectLandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Review the actions you have selected | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer says No to add another action to the land parcel, is shown HEFER consent page', async () => {
        await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
          'false'
        )
        await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `You must have consent | ${SERVICE_NAME}`
        )
        await YouMustHaveConsentPage.validateHeferConsentContent()
        await YouMustHaveConsentPage.clickButton('Continue')
      })

      it('Then the farmer is shown the submit your application page', async () => {
        await expect(browser).toHaveTitle(
          `Submit your application | ${SERVICE_NAME}`
        )
        const submitButton = await SubmitYourApplicationPage.submitButton()
        await submitButton.click()
      })

      it('Then the farmer is shown the confirmation page', async () => {
        await expect(browser).toHaveTitle(`Confirmation | ${SERVICE_NAME}`)
      })
    })
  })
})
