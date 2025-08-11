import { Page } from 'page-objects/page'

class ActionsPage extends Page {
  async selectRequiredAction(actionName) {
    const checkbox = await $(`input[type='checkbox'][value='${actionName}']`)
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

export default new ActionsPage()
