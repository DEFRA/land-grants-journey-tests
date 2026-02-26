import { Page } from './page.js'

class SelectActionsPage extends Page {
  async selectRequiredAction(actionName) {
    const checkbox =
      actionName === 'CMOR1'
        ? await $(`input[type='checkbox'][value='${actionName}']`)
        : await $(`input[type='radio'][value='${actionName}']`)
    const isChecked = await checkbox.isSelected()
    if (!isChecked) {
      await checkbox.click()
    }
  }

  async getErrorMessage() {
    const errorElement = await $('.govuk-list.govuk-error-summary__list')
    return await errorElement.getText()
  }

  async getSssiConsentMessage() {
    const message = await $(
      "//div[contains(@class,'govuk-hint')][contains(., 'SSSI consent')]"
    )
    return await message.getText()
  }

  async getHeferMessage() {
    const message = await $(
      "//div[contains(@class,'govuk-hint')][contains(., 'HEFER')]"
    )
    return await message.getText()
  }

  async getSssiAndHeferMessage() {
    const message = await $(
      "//div[contains(@class,'govuk-hint')][contains(., 'and get a')]"
    )
    return await message.getText()
  }

  async isSssiConsentMessageDisplayed() {
    const el = await $(
      "//div[contains(@class,'govuk-hint')][contains(., 'SSSI consent')]"
    )
    return (await el.isExisting()) && (await el.isDisplayed())
  }
}

export default new SelectActionsPage()
