export async function switchToNewTab(timeoutMs = 5000) {
  await browser.waitUntil(
    async () => (await browser.getWindowHandles()).length > 1,
    { timeout: timeoutMs, timeoutMsg: 'New tab did not open' }
  )
  const handles = await browser.getWindowHandles()
  await browser.switchToWindow(handles[handles.length - 1])
}

export async function getCurrentWindowHandle() {
  return browser.getWindowHandle()
}

export async function closeCurrentTabAndSwitch(handleToSwitchBack) {
  await browser.closeWindow()
  if (handleToSwitchBack) {
    await browser.switchToWindow(handleToSwitchBack)
  }
}
