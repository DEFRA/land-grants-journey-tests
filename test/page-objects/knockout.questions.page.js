import { Page } from 'page-objects/page'

class KnockoutQuestionsPage extends Page {
  async selectRadioButtonByValue(value) {
    const radioButton = await $(`input[type='radio'][value='${value}']`)
    await radioButton.click()
  }
}

export default new KnockoutQuestionsPage()
