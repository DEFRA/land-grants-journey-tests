import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  async open(path) {
    return browser.url(path)
  }

  async navigateTo(path) {
    return browser.url(path)
  }

  async clickButton(selector) {
    const button = await $("button[type='submit']")
    await button.click()
  }

  async clickBackLink() {
    const backLink = await $('a.govuk-back-link')
    await backLink.click()
  }

  async clickBackToReviewSelectedActions() {
    const link = await $('a=Back to review selected actions')
    await link.click()
  }

  async clearApplicationState() {
    const link = await $("a[href='./clear-application-state']")
    await link.scrollIntoView()
    await link.click()
  }
}

export { Page }
