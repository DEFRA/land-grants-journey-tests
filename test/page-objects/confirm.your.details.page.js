import { browser, expect } from '@wdio/globals'
import { Page } from './page.js'

class ConfirmYourDetailsPage extends Page {
  get contactDetailsKey() {
    return $(
      "//dt[contains(@class,'govuk-summary-list__key')][normalize-space()='Contact details']"
    )
  }

  async getSummaryValue(label) {
    const row = await $(
      `//dt[contains(@class,'govuk-summary-list__key')][normalize-space()="${label}"]/following-sibling::dd[1]`
    )
    return await row.getText()
  }

  async clickSignOut() {
    const signOutLink = await $('a[href="/auth/sign-out"]')
    await signOutLink.click()
  }

  async confirmSignedOut() {
    await expect(browser).toHaveTitle('Index | Farm and land service')
  }

  async signOutAndConfirm() {
    await this.clickSignOut()
    await this.confirmSignedOut()
  }
}

export default new ConfirmYourDetailsPage()
