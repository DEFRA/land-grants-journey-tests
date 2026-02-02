import { Page } from './page.js'

class HomePage extends Page {
  async open() {
    return super.open('/farm-payments/')
  }

  async clearApplicationState() {
    return super.open('/farm-payments/clear-application-state')
  }
}

export default new HomePage()
