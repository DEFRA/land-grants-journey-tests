import HomePage from 'page-objects/home.page.js'
import ConfirmYourLandDetailsPage from '~/test/page-objects/confirm.your.land.details.js'
import LandParcelsPage from 'page-objects/land.parcels.page.js'
import AddMoreActionsPage from 'page-objects/add.more.actions.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import CheckYourAnswersPage from '../page-objects/check.your.answers.page'
import SubmitYourApplicationPage from '../page-objects/submit.your.application.page'
import ConfirmYouWillBeEligiblePage from '../page-objects/confirm.you.will.be.eligible.page'
import { SERVICE_NAME } from '~/test/utils/config.js'

class ApplicationHelper {
  async submitPreviousInCompleteApplication(parcel, actionName) {
    // Navigate to the home page and start a new application
    await HomePage.open()
    await HomePage.clickButton('Start now')
    await ConfirmYourDetailsPage.clickButton('Continue')
    await ConfirmYouWillBeEligiblePage.clickButton('Continue')
    await ConfirmYourLandDetailsPage.clickButton('Continue')

    browser.waitUntil(
      async () => {
        return (
          (await browser.getTitle()) ===
          `Confirm your land details are up to date | ${SERVICE_NAME}`
        )
      },
      { timeout: 10000, timeoutMsg: 'Expected title to be different after 10s' }
    )

    // Select land parcel and click continue button on the land parcels page
    await LandParcelsPage.selectRadioButtonByValue(parcel)
    await LandParcelsPage.clickButton('Continue')

    // Click the continue button on the add actions page
    const checkbox = await $(`input[type='checkbox'][value='${actionName}']`)
    const isChecked = await checkbox.isSelected()
    if (!isChecked) {
      await checkbox.click()
    }
    await LandParcelsPage.clickButton('Continue')

    // Click the continue button on the add more actions page
    await AddMoreActionsPage.selectRadioButtonByValue('false')
    await AddMoreActionsPage.clickButton('Continue')

    // Click the continue button on the check your answers page
    const continueButton = await CheckYourAnswersPage.continueButton()
    continueButton.click()

    // Click the continue button on the submit your application page
    const submitButton = await SubmitYourApplicationPage.continueButton()
    submitButton.click()
  }
}

export default new ApplicationHelper()
