import HomePage from 'page-objects/home.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from 'page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'
import { SERVICE_NAME } from '~/test/utils/config.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ConfirmYouWillBeEligiblePage from 'page-objects/confirm.you.will.be.eligible.page'
import LoginPage from 'page-objects/login.page.js'
import ConfirmationPage from 'page-objects/confirmation.page.js'
import Gas from '~/test/utils/gas.js'

describe('Amend an application @ci', () => {
  const crn = '1102760349'
  const sbi = '121428499'
  const parcelOne = 'SD5949-6060'
  const actionOne = 'CMOR1'
  const parcelTwo = 'SD6352-1073'
  const actionTwo = 'UPL2'

  let referenceNumber
  let applicationAmendExpectationId

  before(async () => {
    await HomePage.clearApplicationStateWithApi(crn, sbi)
  })

  after(async () => {
    await HomePage.clearApplicationStateWithApi(crn, sbi)
    if (applicationAmendExpectationId) {
      await Gas.clearExpectation(applicationAmendExpectationId)
    }
  })

  it('Given the farmer submits their land grants application for the first time', async () => {
    await HomePage.open()
    await LoginPage.login(crn)
    await ConfirmYourDetailsPage.clickButton('Continue')
    await ConfirmYouWillBeEligiblePage.clickButton('Continue')
    await ConfirmYourLandDetailsPage.clickButton('Continue')

    await SelectLandParcelsPage.selectRequiredLandParcel(parcelOne)
    await SelectLandParcelsPage.clickButton('Continue')
    await ActionsPage.selectRequiredAction(actionOne)
    await SelectLandParcelsPage.clickButton('Continue')

    await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
      'false'
    )
    await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')

    const submitButton = await SubmitYourApplicationPage.submitButton()
    await submitButton.click()
    referenceNumber = await ConfirmationPage.referenceNumber()
  })

  it('When the application is set to APPLICATION_AMEND in GAS', async () => {
    applicationAmendExpectationId = await Gas.setStatusQueryResponse(
      referenceNumber,
      'APPLICATION_AMEND'
    )
  })

  it('And the farmer navigates to the home page', async () => {
    await HomePage.open()
  })

  it('Then the farmer should be taken to the actions page to review their application', async () => {
    await expect(browser).toHaveUrl(
      expect.stringContaining('/check-selected-land-actions')
    )
  })

  it('And should be able to add another land parcel and re-submit their amended application', async () => {
    await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
      'true'
    )
    await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')

    await SelectLandParcelsPage.selectRequiredLandParcel(parcelTwo)
    await SelectLandParcelsPage.clickButton('Continue')
    await ActionsPage.selectRequiredAction(actionTwo)
    await SelectLandParcelsPage.clickButton('Continue')

    await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
      'false'
    )
    await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')

    const submitButton = await SubmitYourApplicationPage.submitButton()
    await submitButton.click()
    await expect(browser).toHaveTitle(`Confirmation | ${SERVICE_NAME}`)
  })

  it('And should see a new reference number for their application', async () => {
    const newReferenceNumber = await ConfirmationPage.referenceNumber()
    expect(referenceNumber).not.toEqual(newReferenceNumber)
  })
})
