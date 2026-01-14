import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'

afterEach(async () => {
  // Clear all cookies after each test
  await browser.deleteAllCookies()
})

describe('A user with valid credentials @cdp @ci', () => {
  it('Can login to the service successfully and his information is shown correctly', async () => {
    const crn = '1106700499'
    await HomePage.open()
    await LoginPage.login(crn)

    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('SBI number')
    ).toContain('201086496')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Business name')
    ).toContain('test-prod-1-land-grants-business-1')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address')
    ).toContain('PEASHOLME GREEN\n' + 'YORK\n' + 'YO1 7PX')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Contact details')
    ).toContain('96325 874100\n' + 'test-prod-1-land-grants@equalexperts.com')
  })
})
