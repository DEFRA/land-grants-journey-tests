import { Page } from 'page-objects/page'
import { browser, expect } from '@wdio/globals'
import { SERVICE_NAME } from '~/test/utils/config.js'

class LoginPage extends Page {
  async login(crn) {
    console.log('At login page')
    await expect(browser).toHaveTitle(`Sign in to your acccount`)

    console.log('Logging in with CRN:', crn)
    const usernameInput = await $('#crn')
    const passwordInput = await $('#password')

    console.log('Entering username and password')
    const submitButton = await $('button[type="submit"]')

    await usernameInput.setValue(crn)
    await passwordInput.setValue(process.env.DEFRA_ID_USER_PASSWORD)
    console.log('Entered username and password')
    await submitButton.click()
    console.log('Clicked submit button')
    // ensure we wait and are redirected to our service start page
    await expect(browser).toHaveTitle(`Start page | ${SERVICE_NAME}`)
  }
}

export default new LoginPage()
