import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import knockoutQuestionsPage from 'page-objects/knockout.questions.page.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import CheckYourAnswersPage from 'page-objects/check.your.answers.page.js'
import AgreementNamePage from 'page-objects/agreement.name.page.js'
import AddMoreActionsPage from 'page-objects/add.more.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'

describe('Single action selection and funding details verification', () => {
  describe('Given farmer is eligible for funding', () => {
    describe('When farmer goes through the land grants application', () => {
      const parcel = 'SD6743-8083'
      const agreementName = 'Test Agreement'
      const action = 'CMOR1'
      const area = 4.53411065
      const totalApplicationValue = '£100.98'
      it('Then the farmer is shown the landing page', async () => {
        await HomePage.open()
        await expect(browser).toHaveTitle(`Start page | ${SERVICE_NAME}`)
      })

      it('Then the farmer is shown the eligibility questions', async () => {
        await HomePage.clickButton('Start now')

        await expect(browser).toHaveTitle(
          `Do your digital maps show the correct land details? | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is asked to enter agreement name', async () => {
        await knockoutQuestionsPage.selectRadioButtonByValue('true')
        await knockoutQuestionsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Enter your agreement name | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the land parcels for this application', async () => {
        await AgreementNamePage.enterAgreementName(agreementName)
        await AgreementNamePage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Select Land Parcel | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer has option to select the action for the land parcel', async () => {
        await LandParcelsPage.selectRadioButtonByValue(parcel)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Choose which actions to do | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer says No to add another action to the land parcel', async () => {
        await ActionsPage.selectRequiredAction(action, area)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `You have selected 1 action to 1 parcel | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the summary for the selected action on the land parcel', async () => {
        await AddMoreActionsPage.selectRadioButtonByValue('false')
        await AddMoreActionsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Check your answers before sending your application | ${SERVICE_NAME}`
        )

        await expect(
          await CheckYourAnswersPage.getValueFor('Agreement name')
        ).toContain(agreementName)
        await expect(
          await CheckYourAnswersPage.getValueFor(
            'Indicative annual payment (excluding management payment)'
          )
        ).toContain(totalApplicationValue)
        await expect(
          await CheckYourAnswersPage.getValueForParcelBasedActions(parcel)
        ).toContain(`CMOR1: Assess moorland and produce a written record`)
        await expect(
          await CheckYourAnswersPage.getValueForParcelBasedActions(parcel)
        ).toContain(`Applied area: ${area} ha`)
      })
    })
  })
})
