import { Page } from './page.js'

class ConfirmationPage extends Page {
  async getReferenceNumber() {
    return await $('//h1/following-sibling::div[1]/strong').getText()
  }
}

export default new ConfirmationPage()
