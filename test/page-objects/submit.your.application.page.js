import { Page } from 'page-objects/page'

class SubmitYourApplicationPage extends Page {
  async continueButton() {
    const button = await $("button[class='govuk-button']")
    return button
  }
}

export default new SubmitYourApplicationPage()
