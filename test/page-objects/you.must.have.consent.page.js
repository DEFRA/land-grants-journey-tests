import { expect } from '@wdio/globals'
import { Page } from './page.js'

class YouMustHaveConsentPage extends Page {
  async validateHeferConsentContent() {
    const heading = await $('.govuk-panel__title')
    await expect(heading).toBeDisplayed()
    const headingText = (await heading.getText()).trim()
    const expectedHeading =
      'You must get an SFI Historic Environment Farm Environment Record (SFI HEFER) from Historic England'
    await expect(headingText).toContain(expectedHeading)

    const body = await $('.govuk-panel__body')
    await expect(body).toBeDisplayed()
    const bodyText = await body.getText()
    await expect(bodyText).toContain(
      'This is because you are applying for actions on land with historic or archaeological features. You must do this before you do your selected SFI actions on this land.'
    )
    await expect(bodyText).toContain(
      'Read the guidance on land with historic or archaeological features (opens in new tab) to find out what a HEFER is and how to request one.'
    )
  }

  async validateSssiAndHeferConsentContent() {
    const heading = await $('.govuk-panel__title')
    await expect(heading).toBeDisplayed()
    const headingText = (await heading.getText()).trim()
    const expectedHeading = 'You must get consent to do your actions'
    await expect(headingText).toContain(expectedHeading)

    const body = await $('.govuk-panel__body')
    await expect(body).toBeDisplayed()
    const bodyText = await body.getText()
    await expect(bodyText).toContain(
      "You are applying for actions on land that's a site of special scientific interest (SSSI) and land with historic or archaeological features. Before starting your actions, you must get:"
    )
    await expect(bodyText).toContain(
      'an SFI Historic Environment Farm Environment Record (SFI HEFER) (opens in new tab) from Historic England\n' +
        'SSSI consent (opens in new tab) from Natural England'
    )
  }
}

export default new YouMustHaveConsentPage()
