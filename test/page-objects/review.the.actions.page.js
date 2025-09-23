import { Page } from './page.js'

class ReviewTheActionsYouHaveSelectedPage extends Page {
  async doYouWantToAddAnotherAction(value) {
    const radioButton = await $(`input[type='radio'][value='${value}']`)
    await radioButton.click()
  }

  async getAddedActionsData(cardIndex) {
    const card = await $(`.govuk-summary-card:nth-of-type(${cardIndex})`)
    const firstRow = await card.$('tbody tr')
    const cells = await firstRow.$$('td')

    const action = await cells[0].getText()
    const quantity = await cells[1].getText()
    const yearlyPayment = await cells[2].getText()

    return { action, quantity, yearlyPayment }
  }

  async getLandParcelData(cardIndex) {
    const card = await $(`.govuk-summary-card:nth-of-type(${cardIndex})`)
    const title = await card.$('.govuk-summary-card__title')
    return await title.getText()
  }
}

export default new ReviewTheActionsYouHaveSelectedPage()
