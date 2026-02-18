import { browser, expect } from '@wdio/globals'
import { Page } from './page.js'

class ConfirmYourDetailsPage extends Page {
  get contactDetailsKey() {
    return $(
      "//h2[contains(@class,'govuk-heading-m')][normalize-space()='Contact details']"
    )
  }

  async getSummaryValue(label) {
    const valueCell = await $(
      `//dt[contains(@class,'govuk-summary-list__key')][normalize-space()="${label}"]/following-sibling::dd[contains(@class,'govuk-summary-list__value')][1]`
    )
    return await valueCell.getText()
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
