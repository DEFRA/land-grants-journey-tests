import { Page } from './page.js'
import Backend from '~/test/utils/backend.js'

class HomePage extends Page {
  async open() {
    return super.open('/farm-payments/')
  }

  async clearApplicationState() {
    return super.open('/farm-payments/clear-application-state')
  }

  async clearApplicationStateWithApi(crn, sbi) {
    await Backend.deleteLock(crn, sbi, 'farm-payments')
    await Backend.deleteState(crn, sbi, 'farm-payments')
  }
}

export default new HomePage()
