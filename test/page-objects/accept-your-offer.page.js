import { Page } from './page.js'

class AcceptYourOfferPage extends Page {
  async getConfirmationText() {
    return await $(`.govuk-heading-l`).getText()
  }

  async getPageHeader() {
    return await $(`.govuk-heading-xl`).getText()
  }
}
export { AcceptYourOfferPage }
