import { Page } from 'page-objects/page'

class ActionsPage extends Page {
  async selectRequiredAction(actionName, quantity) {
    const checkbox = await $(`input[id='${actionName}']`)
    await checkbox.click()
    const quantityInput = await $(`input[name='qty-${actionName}']`)
    await quantityInput.setValue(quantity)
  }

  async getErrorMessage() {
    const errorElement = await $('.govuk-list.govuk-error-summary__list')
    return await errorElement.getText()
  }
}

export default new ActionsPage()
