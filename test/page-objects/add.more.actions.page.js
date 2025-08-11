import { Page } from 'page-objects/page'

class AddMoreActionsPage extends Page {
  async selectRadioButtonByValue(value) {
    const radioButton = await $(`input[type='radio'][value='${value}']`)
    await radioButton.click()
  }

  async getAddedActionsData(row, column) {
    const table = await $('tbody')
    const cell = await table.$(`tr:nth-child(${row}) td:nth-child(${column})`)
    return await cell.getText()
  }
}

export default new AddMoreActionsPage()
