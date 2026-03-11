import { Page } from './page.js'

class ReviewTheActionsYouHaveSelectedPage extends Page {
  async doYouWantToAddAnotherAction(value) {
    const radioButton = await $(`input[type='radio'][value='${value}']`)
    await radioButton.click()
  }

  /**
   * Returns an array of action data for the land parcel at cardIndex.
   * Each land parcel can have multiple actions.
   * @param {number} cardIndex - 1-based index of the land parcel card
   * @returns {Promise<Array<{action: string, quantity: string, yearlyPayment: string}>>}
   */
  async getAddedActionsData(cardIndex) {
    const card = await $(`.govuk-summary-card:nth-of-type(${cardIndex})`)
    const rows = await card.$$('tbody tr')
    const actions = []

    for (const row of rows) {
      const cells = await row.$$('td')
      const action = await cells[0].getText()
      const quantity = await cells[1].getText()
      const yearlyPayment = await cells[2].getText()
      actions.push({ action, quantity, yearlyPayment })
    }

    return actions
  }

  async getLandParcelData(cardIndex) {
    const card = await $(`.govuk-summary-card:nth-of-type(${cardIndex})`)
    const title = await card.$('.govuk-summary-card__title')
    return await title.getText()
  }
}

export default new ReviewTheActionsYouHaveSelectedPage()
