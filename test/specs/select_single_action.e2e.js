import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ConfirmYourLandDetailsPage from '~/test/page-objects/confirm.your.land.details.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import CheckYourAnswersPage from 'page-objects/check.your.answers.page.js'
import AddMoreActionsPage from 'page-objects/add.more.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ConfirmYouWillBeEligiblePage from '../page-objects/confirm.you.will.be.eligible.page'
import ApplicationHelper from '~/test/utils/applicationHelper.js'

describe('Single action selection and funding details verification', () => {
  describe('Given farmer is eligible for funding', () => {
    describe('When farmer goes through the land grants application', () => {
      const parcel = 'SD6743-8083'
      const action = 'CMOR1'
      const area = '4.53411078 ha'
      const applicationValue = '£48.06'
      // const totalApplicationValue = '£320.06'

      // Submit the incomplete previous application to clear the save and return application
      it('Submit incomplete previous application', async () => {
        await ApplicationHelper.submitPreviousInCompleteApplication(
          parcel,
          action
        )
      })

      it('Then the farmer is shown the landing page', async () => {
        await HomePage.open()
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

        browser.waitUntil(
          async () => {
            return (
              (await browser.getTitle()) ===
              `Confirm your land details are up to date | ${SERVICE_NAME}`
            )
          },
          {
            timeout: 10000,
            timeoutMsg: 'Expected title to be different after 10s'
          }
        )

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

      it('Then the farmer has option to select the action for the land parcel', async () => {
        await LandParcelsPage.selectRadioButtonByValue(parcel)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select actions for land parcel | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer says No to add another action to the land parcel', async () => {
        await ActionsPage.selectRequiredAction(action, area)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `You have selected 1 action to 1 parcel | ${SERVICE_NAME}`
        )
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 1)
        ).toContain(parcel)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 2)
        ).toContain(action)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 3)
        ).toContain(area)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 4)
        ).toContain(applicationValue)
      })

      it('Then the farmer is shown the summary for the selected action on the land parcel', async () => {
        await AddMoreActionsPage.selectRadioButtonByValue('false')
        await AddMoreActionsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Check your answers before sending your application | ${SERVICE_NAME}`
        )

        // await expect(
        //   await CheckYourAnswersPage.getValueFor(
        //     'Indicative annual payment (excluding management payment)'
        //   )
        // ).toContain(totalApplicationValue)

        // await expect(
        //   await CheckYourAnswersPage.getValueForParcelBasedActions(parcel)
        // ).toContain(`CMOR1: Assess moorland and produce a written record`)
        // await expect(
        //   await CheckYourAnswersPage.getValueForParcelBasedActions(parcel)
        // ).toContain(`Applied area: ${area}`)
      })

      it('Then the farmer is shown the submit your application page', async () => {
        const continueButton = await CheckYourAnswersPage.continueButton()
        continueButton.click()
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
