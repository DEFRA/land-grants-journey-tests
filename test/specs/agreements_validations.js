import { expect } from '@wdio/globals'
import AgreementsPage from 'page-objects/agreements.page.js'

describe('Display Agreements - Offer Page for farmer', () => {
  // Context: Farmer is eligible for funding
  describe('Given farmer has received offer notification', () => {
    describe('When farmer clicks on the offer link', () => {
      beforeEach(async () => {
        await AgreementsPage.open()
      })

      it('shows the offer page', async () => {
        await expect(browser).toHaveTitle(
          // TODO:
          'Something went wrong | Manage land-based actions'
        )
      })

      it('has different sections', async () => {
        // TODO:
      })

      it('shows the accept button', async () => {
        // TODO:
      })
    })
  })
})
