import { Page } from 'page-objects/page'

class ActionsPage extends Page {
  async selectRequiredAction(actionName, quantity) {
    const checkbox = await $(`input[type='checkbox'][value='${actionName}']`)
    await checkbox.click()
    const quantityInput = await $(`input[name='qty-${actionName}']`)
    await quantityInput.setValue(quantity)
  }
}

export default new ActionsPage()
