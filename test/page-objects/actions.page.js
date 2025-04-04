import { Page } from 'page-objects/page'

class ActionsPage extends Page {
  async selectRequiredAction(actionName, quantity) {
    const checkbox = await $(`input[type='checkbox'][value='${actionName}']`)
    await checkbox.click()
    const quantityInput = await $(`input[id='area-1']`)
    await quantityInput.setValue(quantity)
  }
}

export default new ActionsPage()
