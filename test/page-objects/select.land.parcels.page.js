import { Page } from 'page-objects/page'

class SelectLandParcelsPage extends Page {
  async selectRequiredLandParcel(value) {
    const radioButton = await $(`input[type='radio'][value='${value}']`)
    await radioButton.click()
  }
}

export default new SelectLandParcelsPage()
