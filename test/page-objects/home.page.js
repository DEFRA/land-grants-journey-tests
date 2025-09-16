import { Page } from 'page-objects/page'
import { browser } from '~/node_modules/@wdio/globals/build/index'

class HomePage extends Page {
  open() {
    return super.open('/find-funding-for-land-or-farms/start')
  }

  getURL() {
    return browser.getUrl()
  }
}

export default new HomePage()
