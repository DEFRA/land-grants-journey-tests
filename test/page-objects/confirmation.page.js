import { Page } from './page.js'

class ConfirmationPage extends Page {
  async referenceNumber() {
    const el = await $('//h1/following-sibling::div[1]/strong')
    return await el.getText()
  }

  async printSubmittedApplication() {
    await $('=View / Print submitted application (opens in new tab)').click()
  }
}

export default new ConfirmationPage()
