import { Page } from './page.js'

class HomePage extends Page {
  async open() {
    return super.open('/find-funding-for-land-or-farms/')
  }
}

export default new HomePage()
