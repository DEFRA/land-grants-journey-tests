import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ReviewTheActionsYouHaveSelectedPage from 'page-objects/review.the.actions.page.js'
import { performActionSelection } from '~/test/utils/journey-helpers.js'
import { SERVICE_NAME } from '~/test/utils/config.js'

const crn = '1103623923'
const sbi = '107365747'

afterEach(async () => {
  // Clear all cookies after each test
  await browser.deleteAllCookies()
})

describe('Selecting back link through the journey @cdp @ci @dev', () => {
  describe('Given farmer is eligible for funding', () => {
    it('Farmer can select back links while going through the journey', async () => {
      const parcelOne = 'SD7858-1059'
      const actionOne = 'CMOR1'
      const parcelTwo = 'SD7858-5623'
      const expectedActionText =
        'Assess moorland and produce a written record: CMOR1'

      await HomePage.clearApplicationStateWithApi(crn, sbi)
      await performActionSelection({
        crn,
        sbi,
        parcel: parcelOne,
        action: actionOne
      })

      await expect(
        await ReviewTheActionsYouHaveSelectedPage.getLandParcelData(1)
      ).toContain(parcelOne.replace('-', ' '))
      const actions =
        await ReviewTheActionsYouHaveSelectedPage.getAddedActionsData(1)
      await expect(actions[0].action).toContain(expectedActionText)

      await ReviewTheActionsYouHaveSelectedPage.clickBackLink()
      await expect(browser).toHaveTitle(
        `Select land parcel for actions | ${SERVICE_NAME}`
      )

      await SelectLandParcelsPage.selectRequiredLandParcel(parcelTwo)
      await SelectLandParcelsPage.clickButton('Continue')
      await expect(browser).toHaveTitle(
        `Select actions for land parcel ${parcelTwo.replace('-', ' ')} | ${SERVICE_NAME}`
      )

      await SelectLandParcelsPage.clickBackToReviewSelectedActions()

      await expect(
        await ReviewTheActionsYouHaveSelectedPage.getLandParcelData(1)
      ).toContain(parcelOne.replace('-', ' '))
      const sameAction =
        await ReviewTheActionsYouHaveSelectedPage.getAddedActionsData(1)
      await expect(sameAction[0].action).toContain(expectedActionText)
    })
  })
})
