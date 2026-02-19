import { browser } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'

afterEach(async () => {
  // Sign out and then clear all cookies after each test
  await ConfirmYourDetailsPage.signOutAndConfirm()
  await browser.deleteAllCookies()
})

describe('Missing Personal Details or Business details for a Farmer @cdp @dev', () => {
  describe('SBI 400000008 - Title for Farmer is missing', async () => {
    it('Then farmer is shown validation message and not allowed to complete the application', async () => {
      const crn = '1400000008'
      const sbi = '400000008'

      await HomePage.open()
      await LoginPage.login(crn)
      await HomePage.clearApplicationStateWithApi(crn, sbi)

      await ConfirmYourDetailsPage.validateMissingDetailsWarning()
      await ConfirmYourDetailsPage.validateValueEmptyFor('Title')
      await ConfirmYourDetailsPage.validateContinueButtonDisabled()
    })
  })

  describe('SBI 400000006 - Last name for Farmer is missing', async () => {
    it('Then farmer is shown validation message and not allowed to complete the application', async () => {
      const crn = '1400000006'
      const sbi = '400000006'

      await HomePage.open()
      await LoginPage.login(crn)
      await HomePage.clearApplicationStateWithApi(crn, sbi)

      await ConfirmYourDetailsPage.validateMissingDetailsWarning()
      await ConfirmYourDetailsPage.validateValueEmptyFor('Last name')
      await ConfirmYourDetailsPage.validateContinueButtonDisabled()
    })
  })

  describe('SBI 400000002 - Address line 1 for Farmer is missing', async () => {
    it('Then farmer is shown validation message and not allowed to complete the application', async () => {
      const crn = '1400000002'
      const sbi = '400000002'

      await HomePage.open()
      await LoginPage.login(crn)
      await HomePage.clearApplicationStateWithApi(crn, sbi)

      await ConfirmYourDetailsPage.validateMissingDetailsWarning()
      await ConfirmYourDetailsPage.validateValueEmptyFor('Address 1')
      await ConfirmYourDetailsPage.validateContinueButtonDisabled()
    })
  })
})
