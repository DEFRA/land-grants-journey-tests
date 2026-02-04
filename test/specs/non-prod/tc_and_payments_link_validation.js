import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import {
  switchToNewTab,
  getCurrentWindowHandle,
  closeCurrentTabAndSwitch
} from '~/test/utils/window.handler.js'

afterEach(async () => {
  // Light cleanup between tests
  await browser.deleteAllCookies()
})

describe('When clicking the Payments link, Terms & Conditions link and Farm Payment Actions link @cdp', () => {
  it('farmer is shown the correct page ', async () => {
    await HomePage.open()
    await LoginPage.login('1102838829')
    await HomePage.clearApplicationState()
    await HomePage.navigateTo('/farm-payments/submit-your-application')
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
