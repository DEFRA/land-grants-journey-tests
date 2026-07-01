import { browser } from '@wdio/globals'

export async function signOutAndClearCookies() {
  try {
    await browser.url('/auth/sign-out')
  } finally {
    await browser.deleteAllCookies()
  }
}
