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
}

export default new SelectActionsPage()
