import { Page } from 'page-objects/page'

class CheckYourAnswersPage extends Page {
  async getValueFor(key) {
    const keyElement = await $(
      `//dt[contains(@class, 'govuk-summary-list__key') and text()='\n      ${key}\n    ']`
    )
    const valueElement = await keyElement.nextElement()
    return await valueElement.getText()
  }

  async getValueForParcelBasedActions(parcel) {
    const keyElement = await $(
      `//dt[contains(@class, 'govuk-summary-list__key govuk-!-font-weight-regular') and text()='\n      ${parcel}\n    ']`
    )
    const valueElement = await keyElement.nextElement()
    return await valueElement.getText()
  }

  async continueButton() {
    const button = await $("button[class='govuk-button']")
    return button
  }
}
export default new CheckYourAnswersPage()
