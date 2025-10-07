import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  async open(path) {
    return browser.url(path)
  }

  async clickButton(selector) {
    const button = await $("button[type='submit']")
    await button.click()
  }

  async clearApplicationState() {
    const link = await $("a[href='./clear-application-state']")
    await link.click()
  }
}

export { Page }
