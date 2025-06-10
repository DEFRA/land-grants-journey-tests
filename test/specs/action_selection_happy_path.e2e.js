import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import knockoutQuestionsPage from 'page-objects/knockout.questions.page.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import FundingDetailsPage from 'page-objects/funding.details.page.js'
import AgreementNamePage from 'page-objects/agreement.name.page.js'
import AddMoreActionsPage from 'page-objects/add.more.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import * as assert from 'node:assert'

describe('Happy Path scenario for CMOR1 action selection and funding details verification', () => {
  describe('Given farmer is eligible for funding', () => {
    describe('When farmer goes through the land grants application', () => {
      const parcel = 'SD6743-8083'
      const agreementName = 'Test Agreement'
      const action = 'CMOR1'
      const area = 45341.11
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
          `Select Land Actions | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer has option to check the select the action for the land parcel', async () => {
        await ActionsPage.selectRequiredAction(action, area)
        await LandParcelsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(
          `Check selected land actions | ${SERVICE_NAME}`
        )
      })

      it('Then the farmer is shown the funding summary for the selected action on the land parcel', async () => {
        await AddMoreActionsPage.selectRadioButtonByValue('false')
        await AddMoreActionsPage.clickButton('Continue')
        await expect(browser).toHaveTitle(`Funding details | ${SERVICE_NAME}`)

        assert.equal(
          await FundingDetailsPage.getFundingDetailsValue('Parcel'),
          parcel,
          `Expected parcel ${parcel} is not present`
        )
        assert.equal(
          await FundingDetailsPage.getFundingDetailsValue('Actions'),
          `${action}: ${area} sqm.`,
          `Expected action ${action} is not present`
        )
        assert.equal(
          await FundingDetailsPage.getFundingDetailsValue('Agreement name'),
          agreementName,
          `Expected parcel ${agreementName} is not present`
        )
        assert.equal(
          await FundingDetailsPage.getFundingDetailsValue(
            'Total application value'
          ),
          totalApplicationValue,
          `Expected area ${totalApplicationValue} is not present`
        )
      })
    })
  })
})
