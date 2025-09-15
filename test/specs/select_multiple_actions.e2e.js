import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from '~/test/page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ConfirmYouWillBeEligiblePage from '../page-objects/confirm.you.will.be.eligible.page'
import LoginPage from 'page-objects/login.page.js'

describe('Multiple actions selection and funding details verification', () => {
  describe('Given farmer is eligible for funding', () => {
    describe('When farmer goes through the land grants application', () => {
      const crn = '1102760349'
      const parcelOne = 'SD6351-2185'
      const actionOne = 'CMOR1'

      const parcelTwo = 'SD6352-8774'
      const actionTwo = 'UPL2'

      it('Then the farmer is shown the landing page', async () => {
        await HomePage.open()
        await LoginPage.login(crn)
        await expect(browser).toHaveTitle(`Start page | ${SERVICE_NAME}`)
      })

      it('Then the farmer is shown confirm your details page', async () => {
        await HomePage.clickButton('Start now')
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
        await SelectLandParcelsPage.selectRequiredLandParcel(parcelOne)
        await SelectLandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select actions for land parcel | ${SERVICE_NAME}`
        )
        await ActionsPage.selectRequiredAction(actionOne)
        await SelectLandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Review the actions you have selected | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer says Yes and adds another action to the land parcel', async () => {
        await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
          'true'
        )
        await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select land parcel for actions | ${SERVICE_NAME}`
        )
        await SelectLandParcelsPage.selectRequiredLandParcel(parcelTwo)
        await SelectLandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select actions for land parcel | ${SERVICE_NAME}`
        )
        await ActionsPage.selectRequiredAction(actionTwo)
        await SelectLandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Review the actions you have selected | ${SERVICE_NAME}`
        )

        await expect(
          await ReviewTheActionsYouHaveSelectedPage.getLandParcelData(1)
        ).toContain(parcelOne.replace('-', ' '))
        await expect(
          (await ReviewTheActionsYouHaveSelectedPage.getAddedActionsData(1))
            .action
        ).toContain(
          `Assess moorland and produce a written record: ${actionOne}`
        )
        await expect(
          await ReviewTheActionsYouHaveSelectedPage.getLandParcelData(2)
        ).toContain(parcelTwo.replace('-', ' '))
        await expect(
          (await ReviewTheActionsYouHaveSelectedPage.getAddedActionsData(2))
            .action
        ).toContain(`Low livestock grazing on moorland: ${actionTwo}`)
      })

      it('Then the farmer is shown the submit your application page', async () => {
        await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
          'false'
        )
        await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Submit your application | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the confirmation page', async () => {
        const submitButton = await SubmitYourApplicationPage.continueButton()
        submitButton.click()
        await expect(browser).toHaveTitle(`Confirmation | ${SERVICE_NAME}`)
      })
    })
  })
})
