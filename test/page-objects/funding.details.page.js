import { Page } from 'page-objects/page'

class FundingDetailsPage extends Page {
  async getValueByKey(keyText) {
    const keyElement = await $(
      `//dt[contains(@class, 'govuk-summary-list__key') and text()='\n      ${keyText}\n    ']`
    )
    const valueElement = await keyElement.nextElement()
    return await valueElement.getText()
  }

  async getActionName() {
    return await this.getValueByKey('Actions')
  }

  async getTotalApplicationValue() {
    return await this.getValueByKey('Total Application Value')
  }
}

export default new FundingDetailsPage()
