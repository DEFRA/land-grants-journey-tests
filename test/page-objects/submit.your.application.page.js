import { Page } from './page.js'

class SubmitYourApplicationPage extends Page {
  async submitButton() {
    return await $("//button[contains(text(),'Submit')]")
  }

  async selectFarmPaymentsLink() {
    const link = await $(
      "//a[contains(text(),'Farm payments technical test information (opens in new tab)')]"
    )
    await link.click()
  }

  async selectTermsAndConditionsLink() {
    const link = await $(
      "//a[contains(text(),'terms and conditions (opens in new tab)')]"
    )
    await link.click()
  }
}

export default new SubmitYourApplicationPage()
