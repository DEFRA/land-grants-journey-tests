import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import knockoutQuestionsPage from 'page-objects/knockout.questions.page.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import FundingDetailsPage from 'page-objects/funding.details.page.js'
import AgreementNamePage from 'page-objects/agreement.name.page.js'
import * as assert from 'node:assert'

describe('Given farmer is eligible for funding', () => {
  describe('When farmer goes through the land grands application', () => {
    const parcel = 'SX0679-9238'
    const agreementName = 'Test Agreement'
    const action = 'CMOR1'
    const area = 1
    const totalApplicationValue = '£100.98'
    it('Then the farmer is shown the landing page', async () => {
      await HomePage.open()
      await expect(browser).toHaveTitle(
        'Start page | Manage land-based actions'
      )
    })

    it('Then the farmer is shown the eligibility questions', async () => {
      await HomePage.clickButton('Start now')

      await expect(browser).toHaveTitle(
        `Do your digital maps show the correct land details? | Manage land-based actions`
      )
    })

    it('Then the farmer is asked to enter agreement name', async () => {
      await knockoutQuestionsPage.selectRadioButtonByValue('true')
      await knockoutQuestionsPage.clickButton('Continue')
      await expect(browser).toHaveTitle(
        `Enter your agreement name | Manage land-based actions`
      )
    })

    it('Then the farmer is shown the land parcels for this application', async () => {
      await AgreementNamePage.enterAgreementName(agreementName)
      await AgreementNamePage.clickButton('Continue')
      await expect(browser).toHaveTitle(
        `Select Land Parcel | Manage land-based actions`
      )
    })

    it('Then the farmer has option to select the action for the land parcel', async () => {
      await LandParcelsPage.selectRadioButtonByValue(parcel)
      await LandParcelsPage.clickButton('Continue')
      await expect(browser).toHaveTitle(
        `Select Land Actions | Manage land-based actions`
      )
    })

    it('Then the farmer is shown the funding summary for the selected action on the land parcel', async () => {
      await ActionsPage.selectRequiredAction(action, area)
      await LandParcelsPage.clickButton('Continue')

      await expect(browser).toHaveTitle(
        `Funding details | Manage land-based actions`
      )

      assert.equal(
        await FundingDetailsPage.getFundingDetailsValue('Parcel'),
        parcel,
        `Expected parcel ${parcel} is not present`
      )
      assert.equal(
        await FundingDetailsPage.getFundingDetailsValue('Actions'),
        action,
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
