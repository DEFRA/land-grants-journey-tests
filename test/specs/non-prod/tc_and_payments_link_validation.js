import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import {
  switchToNewTab,
  getCurrentWindowHandle,
  closeCurrentTabAndSwitch
} from '~/test/utils/window.handler.js'
import { performActionSelection } from '~/test/utils/journey-helpers.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'

afterEach(async () => {
  // Light cleanup between tests
  await browser.deleteAllCookies()
})

describe('When clicking the Payments link, Terms & Conditions link and Farm Payment Actions link @cdp', () => {
  it('farmer is shown the correct page ', async () => {
    const crn = '1102760349'
    const sbi = '121428499'
    const parcel = 'SD5949-6060'
    const action = 'CMOR1'
    await HomePage.clearApplicationStateWithApi(crn, sbi)

    await performActionSelection({ crn, sbi, parcel, action })
    await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
      'false'
    )
    await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')

    const originalHandle = await getCurrentWindowHandle()
    await SubmitYourApplicationPage.selectFarmPaymentsLink()
    await switchToNewTab()
    await expect(browser).toHaveTitle(
      `Farm payments technical test information | ${SERVICE_NAME}`
    )
    await closeCurrentTabAndSwitch(originalHandle)
    await SubmitYourApplicationPage.selectTermsAndConditionsLink()
    await switchToNewTab()
    await expect(browser).toHaveTitle(
      `Farm payments technical test terms and conditions | ${SERVICE_NAME}`
    )
    await closeCurrentTabAndSwitch(originalHandle)
    await SubmitYourApplicationPage.selectPaymentActionsLink()
    await switchToNewTab()
    await expect(browser).toHaveTitle(
      `Farm payments technical test actions | ${SERVICE_NAME}`
    )
    await closeCurrentTabAndSwitch(originalHandle)
  })
})
