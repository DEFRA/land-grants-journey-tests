import { Page } from 'page-objects/page'

class AgreementsPage extends Page {
  open() {
    return super.open('/agreements/SFI123456789')
  }
}

export default new AgreementsPage()
