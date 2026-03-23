import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'
import ConfirmYourLandDetailsPage from 'page-objects/confirm.your.land.details.js'
import SelectLandParcelsPage from 'page-objects/select.land.parcels.page.js'
import ActionsPage from 'page-objects/select.actions.page.js'
import ConfirmYouWillBeEligiblePage from 'page-objects/confirm.you.will.be.eligible.page'

export async function performActionSelection({ crn, sbi, parcel, action }) {
  await HomePage.open()
  await LoginPage.login(crn)
  await ConfirmYourDetailsPage.clickButton('Continue')
  await ConfirmYouWillBeEligiblePage.clickButton('Continue')
  await ConfirmYourLandDetailsPage.clickButton('Continue')
  await SelectLandParcelsPage.selectRequiredLandParcel(parcel)
  await SelectLandParcelsPage.clickButton('Continue')
  await ActionsPage.selectRequiredAction(action)
  await SelectLandParcelsPage.clickButton('Continue')
}
