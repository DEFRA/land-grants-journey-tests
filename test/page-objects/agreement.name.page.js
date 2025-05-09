import { Page } from 'page-objects/page'

class AgreementNamePage extends Page {
  async enterAgreementName(value) {
    const agreementField = await $(`input[id='agreementName']`)
    await agreementField.click()
    await agreementField.setValue(value)
  }
}

export default new AgreementNamePage()
