import { expect } from '@wdio/globals'
import { ReviewOfferPage } from 'page-objects/review-offer.page.js'
import { AcceptYourOfferPage } from 'page-objects/accept-your-offer.page.js'
const reviewOfferPage = new ReviewOfferPage()
const acceptYourOfferPage = new AcceptYourOfferPage()
const ACCEPT_OFFER_TITLE = 'Accept offer'
const ACCEPT_OFFER_HEADER = 'Accept your offer'
const REVIEW_OFFER_TITLE = 'Review funding offer'
const REVIEW_OFFER_HEADER = 'Review your funding offer'

describe('Display Agreements - Review Offer Page and AcceptYourOfferPage', () => {
  describe('Given farmer has received offer notification', () => {
    describe('When farmer clicks on the offer link', () => {
      beforeEach(async () => {
        await reviewOfferPage.open()
      })

      it('shows the Review Offer Page', async () => {
        await expect(browser).toHaveTitle(REVIEW_OFFER_TITLE)
        expect(await reviewOfferPage.getPageHeader()).toBe(REVIEW_OFFER_HEADER)
      })

      it('shows the Accept Your Offer Page', async () => {
        await reviewOfferPage.selectContinue()
        await expect(browser).toHaveTitle(ACCEPT_OFFER_TITLE)
        expect(await acceptYourOfferPage.getPageHeader()).toBe(
          ACCEPT_OFFER_HEADER
        )
      })
    })
  })
})
