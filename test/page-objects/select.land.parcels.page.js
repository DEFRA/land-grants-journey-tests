import { Page } from './page.js'

class SelectLandParcelsPage extends Page {
  async selectRequiredLandParcel(value) {
    const radioButton = await $(`input[type='radio'][value='${value}']`)
    await radioButton.click()
  }
}

export default new SelectLandParcelsPage()
