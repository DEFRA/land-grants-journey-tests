import { Page } from './page.js'

class ConfirmYourDetailsPage extends Page {
  async getSummaryValue(label) {
    const row = await $(
      `//dt[contains(@class,'govuk-summary-list__key')][normalize-space()="${label}"]/following-sibling::dd[1]`
    )
    return await row.getText()
  }
}

export default new ConfirmYourDetailsPage()
