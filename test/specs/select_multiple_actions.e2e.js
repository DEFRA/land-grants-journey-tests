import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from '~/test/page-objects/confirm.your.land.details.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import CheckYourAnswersPage from 'page-objects/check.your.answers.page.js'
import AddMoreActionsPage from 'page-objects/add.more.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ApplicationHelper from '~/test/utils/applicationHelper.js'
import ConfirmYouWillBeEligiblePage from '../page-objects/confirm.you.will.be.eligible.page'

describe('Multiple actions selection and funding details verification', () => {
  describe('Given farmer is eligible for funding', () => {
    describe('When farmer goes through the land grants application', () => {
      const parcelOne = 'SD6844-7067'
      const actionOne = 'CMOR1'
      const areaOne = '3.10231835 ha'
      const actionOneValue = '£32.88'
      const parcelTwo = 'SD6743-6292'
      const actionTwo = 'UPL2'
      const areaTwo = '7.57129024 ha'
      const actionTwoValue = '£401.27'
      // const totalApplicationValue = '£706.16'

      // Submit the incomplete previous application to clear the save and return application
      it('Submit incomplete previous application', async () => {
        await ApplicationHelper.submitPreviousInCompleteApplication(
          parcelOne,
          actionOne
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

      it('Then the farmer adds an action to the land parcel', async () => {
        await LandParcelsPage.selectRadioButtonByValue(parcelOne)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select actions for land parcel | ${SERVICE_NAME}`
        )
        await ActionsPage.selectRequiredAction(actionOne, areaOne)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `You have selected 1 action to 1 parcel | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer says Yes and adds another action to the land parcel', async () => {
        await AddMoreActionsPage.selectRadioButtonByValue('true')
        await AddMoreActionsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select land parcel for actions | ${SERVICE_NAME}`
        )
        await LandParcelsPage.selectRadioButtonByValue(parcelTwo)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select actions for land parcel | ${SERVICE_NAME}`
        )
        await ActionsPage.selectRequiredAction(actionTwo, areaTwo)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `You have selected 2 actions to 2 parcels | ${SERVICE_NAME}`
        )

        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 1)
        ).toContain(parcelOne)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 2)
        ).toContain(actionOne)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 3)
        ).toContain(areaOne)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(1, 4)
        ).toContain(actionOneValue)

        await expect(
          await AddMoreActionsPage.getAddedActionsData(2, 1)
        ).toContain(parcelTwo)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(2, 2)
        ).toContain(actionTwo)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(2, 3)
        ).toContain(areaTwo)
        await expect(
          await AddMoreActionsPage.getAddedActionsData(2, 4)
        ).toContain(actionTwoValue)
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
        //   await CheckYourAnswersPage.getValueForParcelBasedActions(parcelOne)
        // ).toContain(actionOne)
        // await expect(
        //   await CheckYourAnswersPage.getValueForParcelBasedActions(parcelOne)
        // ).toContain(`Applied area: ${areaOne}`)
        // await expect(
        //   await CheckYourAnswersPage.getValueForParcelBasedActions(parcelTwo)
        // ).toContain(actionTwo)
        // await expect(
        //   await CheckYourAnswersPage.getValueForParcelBasedActions(parcelTwo)
        // ).toContain(`Applied area: ${areaTwo}`)
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
