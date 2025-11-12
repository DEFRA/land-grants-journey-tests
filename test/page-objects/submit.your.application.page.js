import { Page } from './page.js'

class SubmitYourApplicationPage extends Page {
  async submitButton() {
    return await $("//button[contains(text(),'Submit')]")
  }
}

export default new SubmitYourApplicationPage()
