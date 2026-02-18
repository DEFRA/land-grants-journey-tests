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

  async validateMissingDetailsWarning() {
    const warningElement = await $('#missing-fields-warning')
    await expect(warningElement).toBeDisplayed()

    const warningText = await $(
      '#missing-fields-warning .govuk-warning-text__text'
    )
    const actualText = await warningText.getText()
    const expectedText =
      'You have some missing details. The missing information must be completed before you can continue. To update your details, phone the Rural Payments Agency (RPA) on 020 8026 2395.'

    await expect(actualText).toContain(expectedText)
    return actualText
  }

  async validateValueEmptyFor(label) {
    const keyElement = await $(
      `//dt[contains(@class,'govuk-summary-list__key')][normalize-space()="${label}"]`
    )
    await expect(keyElement).toBeDisplayed()

    const valueElement = await $(
      `//dt[contains(@class,'govuk-summary-list__key')][normalize-space()="${label}"]/following-sibling::dd[contains(@class,'govuk-summary-list__value')][1]`
    )
    const valueText = await valueElement.getText()
    await expect(valueText.trim()).toBe('This information is missing')
  }

  async validateContinueButtonDisabled() {
    const continueButton = await $("button[type='submit']")
    await expect(continueButton).toBeDisabled()
  }
}

export default new ConfirmYourDetailsPage()
