import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from 'page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'
import SubmitYourApplicationPage from 'page-objects/submit.your.application.page.js'
import ConfirmYouWillBeEligiblePage from 'page-objects/confirm.you.will.be.eligible.page'
import LoginPage from 'page-objects/login.page.js'
import YouMustHaveConsentPage from 'page-objects/you.must.have.consent.page.js'
import ConfirmationPage from 'page-objects/confirmation.page.js'
import PrintSubmittedApplicationPage from 'page-objects/print.submitted.application.page.js'
import {
  switchToNewTab,
  getCurrentWindowHandle,
  closeCurrentTabAndSwitch
} from '~/test/utils/window.handler.js'

describe('Print submitted application @cdp @dev @ci', () => {
  const crn = '1102760349'
  const sbi = '121428499'

  before(async () => {
    await HomePage.clearApplicationStateWithApi(crn, sbi)
  })

  after(async () => {
    await HomePage.clearApplicationStateWithApi(crn, sbi)
  })

  it('Given the farmer submits an application', async () => {
    await HomePage.open()
    await LoginPage.login(crn)

    await ConfirmYourDetailsPage.clickButton('Continue')
    await ConfirmYouWillBeEligiblePage.clickButton('Continue')
    await ConfirmYourLandDetailsPage.clickButton('Continue')

    await SelectLandParcelsPage.selectRequiredLandParcel('SD5949-6060')
    await SelectLandParcelsPage.clickButton('Continue')

    await ActionsPage.selectRequiredAction('CMOR1')
    await ActionsPage.selectRequiredAction('UPL1')
    await SelectLandParcelsPage.clickButton('Continue')

    await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
      'true'
    )
    await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')

    await SelectLandParcelsPage.selectRequiredLandParcel('SD6352-1073')
    await SelectLandParcelsPage.clickButton('Continue')

    await ActionsPage.selectRequiredAction('UPL2')
    await SelectLandParcelsPage.clickButton('Continue')

    await ReviewTheActionsYouHaveSelectedPage.doYouWantToAddAnotherAction(
      'false'
    )
    await ReviewTheActionsYouHaveSelectedPage.clickButton('Continue')

    await YouMustHaveConsentPage.clickButton('Continue')

    const submitButton = await SubmitYourApplicationPage.submitButton()
    await submitButton.click()
  })

  it('When the farmer opens the print application page', async () => {
    const submittedReferenceNumber = await ConfirmationPage.referenceNumber()
    const tabHandle = await getCurrentWindowHandle()
    await ConfirmationPage.printSubmittedApplication()
    await switchToNewTab()
    await expect(browser).toHaveUrl(
      expect.stringContaining('/print-submitted-application')
    )
    await closeCurrentTabAndSwitch(tabHandle)

    await PrintSubmittedApplicationPage.open()
    await expect(PrintSubmittedApplicationPage.pageHeading).toHaveText(
      'Farm payments application'
    )
    await expect(await PrintSubmittedApplicationPage.applicationNumber()).toBe(
      submittedReferenceNumber
    )
  })

  it('Then the selected land parcels and additional payments can be printed', async () => {
    await expect(await PrintSubmittedApplicationPage.totalAnnualPayment()).toBe(
      '£8,814.00'
    )

    const parcels = await PrintSubmittedApplicationPage.landParcels()

    expect(parcels[0].title).toBe('Land parcel ID SD5949 6060')
    expect(parcels[0].actions[0].action).toContain(
      'Assess moorland and produce a written record: CMOR1'
    )
    expect(parcels[0].actions[0].quantity).toBe('681.6133')
    expect(parcels[0].actions[0].annualPayment).toBe('£7,225.10')
    expect(parcels[0].actions[1].quantity).toBe('2.7321')
    expect(parcels[0].actions[1].annualPayment).toBe('£95.62')

    expect(parcels[1].title).toBe('Land parcel ID SD6352 1073')
    expect(parcels[1].actions[0].action).toContain(
      'Low livestock grazing on moorland: UPL2'
    )
    expect(parcels[1].actions[0].quantity).toBe('13.7223')
    expect(parcels[1].actions[0].annualPayment).toBe('£1,221.28')

    const additionalPayments =
      await PrintSubmittedApplicationPage.additionalAnnualPayments()

    expect(additionalPayments[0].action).toContain(
      'Assess moorland and produce a written record: CMOR1'
    )
    expect(additionalPayments[0].annualPayment).toBe('£272.00')
  })
})
