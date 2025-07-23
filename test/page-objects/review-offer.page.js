import { Page } from './page.js'

class ReviewOfferPage extends Page {
  open(id) {
    const path = id
      ? `/agreement/review-offer/${id}`
      : '/agreement/review-offer/SFI123456789'
    return super.open(path)
  }

  async selectContinue(selector) {
    await $('.govuk-button').click()
  }

  async getPageHeader() {
    return await $(`.govuk-heading-xl`).getText()
  }
}
export { ReviewOfferPage }
