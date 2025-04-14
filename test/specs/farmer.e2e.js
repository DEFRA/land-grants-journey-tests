import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import knockoutQuestionsPage from 'page-objects/knockout.questions.page.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import ActionsPage from 'page-objects/actions.page.js'
import FundingDetailsPage from 'page-objects/funding.details.page.js'
import * as assert from 'node:assert'

describe('Given farmer is eligible for funding', () => {
  describe('When farmer goes through the land grands application', () => {
    const parcel = 'SX0679-9238'
    const action = 'CSAM1'
    const area = 1
    const totalApplicationValue = '£100.98'
    it('Then the farmer is shown the landing page', async () => {
      await HomePage.open()
      await expect(browser).toHaveTitle(
        'Start page - Find Funding for Land or Farms - GOV.UK'
      )
    })

    it('Then the farmer is shown the eligibility questions', async () => {
      await HomePage.clickButton('Start now')

      await expect(browser).toHaveTitle(
        `Do your digital maps show the correct land details? - Find Funding for Land or Farms - GOV.UK`
      )
    })

    it('Then the farmer is shown the land parcels for this application', async () => {
      await knockoutQuestionsPage.selectRadioButtonByValue('true')
      await knockoutQuestionsPage.clickButton('Continue')

      await expect(browser).toHaveTitle(
        `Select Land Parcel - Find Funding for Land or Farms - GOV.UK`
      )
    })

    it('Then the farmer has option to select the action for the land parcel', async () => {
      await LandParcelsPage.selectRadioButtonByValue(parcel)
      await LandParcelsPage.clickButton('Continue')

      await expect(browser).toHaveTitle(
        `Select Land Actions - Find Funding for Land or Farms - GOV.UK`
      )
    })

    it('Then the farmer is shown the funding summary for the selected action on the land parcel', async () => {
      await ActionsPage.selectRequiredAction(action, area)
      await LandParcelsPage.clickButton('Continue')

      await expect(browser).toHaveTitle(
        `Funding details - Find Funding for Land or Farms - GOV.UK`
      )
      assert.equal(
        await FundingDetailsPage.getActionName(),
        action,
        `Expected Action name ${action} is not present`
      )

      assert.equal(
        await FundingDetailsPage.getTotalApplicationValue(),
        totalApplicationValue,
        `Expected total application value ${totalApplicationValue} is not present`
      )
    })
  })
})
