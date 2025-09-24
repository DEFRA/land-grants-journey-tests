import { Page } from './page.js'
import { browser, expect } from '@wdio/globals'
import { SERVICE_NAME } from '../utils/config.js'

class LoginPage extends Page {
  async login(crn) {
    await expect(browser).toHaveTitle(
      /Sign in to your acccount|FCP Defra ID stub - GOV.UK/
    )

    const usernameInput = await $('#crn')
    const passwordInput = await $('#password')

    const submitButton = await $('button[type="submit"]')

    await usernameInput.setValue(crn)
    await passwordInput.setValue(process.env.DEFRA_ID_USER_PASSWORD)
    await submitButton.click()
    // ensure we wait and are redirected to our service start page
    await expect(browser).toHaveTitle(`Start page | ${SERVICE_NAME}`)
  }
}

export default new LoginPage()
