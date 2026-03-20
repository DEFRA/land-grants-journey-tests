import { Page } from './page.js'

class PrintSubmittedApplicationPage extends Page {
  async open() {
    return super.open('/farm-payments/print-submitted-application')
  }

  async applicationNumber() {
    return $('p.govuk-body strong').getText()
  }

  async totalAnnualPayment() {
    return $('p.govuk-body-l strong').getText()
  }

  async landParcels() {
    const cards = await $$('.govuk-summary-card')
    const results = []

    for (const card of cards) {
      const title = await card.$('.govuk-summary-card__title').getText()

      if (title.includes('Additional')) {
        continue
      }

      const rows = await card.$$('.govuk-table__body .govuk-table__row')
      const actions = []

      for (const row of rows) {
        const cells = await row.$$('.govuk-table__cell')
        actions.push({
          action: await cells[0].getText(),
          quantity: await cells[1].getText(),
          annualPayment: await cells[2].getText()
        })
      }

      results.push({ title: title.trim(), actions })
    }

    return results
  }

  async additionalAnnualPayments() {
    const cards = await $$('.govuk-summary-card')
    const results = []

    for (const card of cards) {
      const title = await card.$('.govuk-summary-card__title').getText()
      if (!title.includes('Additional')) {
        continue
      }

      const rows = await card.$$('.govuk-table__body .govuk-table__row')

      for (const row of rows) {
        const cells = await row.$$('.govuk-table__cell')
        results.push({
          action: await cells[0].getText(),
          annualPayment: await cells[1].getText()
        })
      }
    }

    return results
  }
}

export default new PrintSubmittedApplicationPage()
