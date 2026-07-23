import { Page } from './page.js'

class HomePage extends Page {
  async open() {
    return super.open('/farm-payments/')
  }
}

export default new HomePage()
