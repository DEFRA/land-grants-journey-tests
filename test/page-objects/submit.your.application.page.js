import { Page } from './page.js'

class SubmitYourApplicationPage extends Page {
  async continueButton() {
    const button = await $("button[class='govuk-button']")
    return button
  }
}

export default new SubmitYourApplicationPage()
