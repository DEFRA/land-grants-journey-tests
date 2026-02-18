import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page.js'
import LoginPage from 'page-objects/login.page.js'
import ConfirmYourDetailsPage from 'page-objects/confirm.your.details.page.js'

afterEach(async () => {
  // Sign out and then clear all cookies after each test
  await ConfirmYourDetailsPage.signOutAndConfirm()
  await browser.deleteAllCookies()
})

describe('Contact Details validation for a SBI @cdp @dev', () => {
  it('SBI 300000011 - Unstructured contact details are shown correctly', async () => {
    const crn = '1300000011'
    await HomePage.open()
    await LoginPage.login(crn)

    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('SBI number')
    ).toContain('300000011')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Business name')
    ).toContain('Rose Farm')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 1')
    ).toContain('12 Green Lane')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 2')
    ).toContain('Trading Estate')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('City')
    ).toContain('Birmingham')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Postcode')
    ).toContain('ZE60 6BA')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Mobile number')
    ).toContain('07300 000011')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Email address')
    ).toContain('contact+300000011@example.test')
  })

  it('SBI 300000001 - Structured contact details are shown correctly', async () => {
    const crn = '1300000001'
    await HomePage.open()
    await LoginPage.login(crn)

    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('SBI number')
    ).toContain('300000001')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Business name')
    ).toContain('Green Farm')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 1')
    ).toContain('York Park House')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('City')
    ).toContain('Maidstone')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Postcode')
    ).toContain('W50 5UY')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Mobile number')
    ).toContain('07300 000001')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Email address')
    ).toContain('contact+300000001@example.test')
  })

  it('SBI 106440951 - Structured contact details are shown correctly', async () => {
    const crn = '1103019058'
    await HomePage.open()
    await LoginPage.login(crn)

    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('SBI number')
    ).toContain('106440951')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Business name')
    ).toContain('Alport Farm')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 1')
    ).toContain('Top Farm')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 2')
    ).toContain('04 Holloway Saxby-All-Saints Orford Road')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 3')
    ).toContain('Havering')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 4')
    ).toContain('Redbridge')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('City')
    ).toContain('Yeovil')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Postcode')
    ).toContain('YO25 3PF')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Email address')
    ).toContain('alportfarmi@mraftroplax.com.test')
  })

  it('SBI 107034848 - Structured contact details are shown correctly', async () => {
    const crn = '1103711172'
    await HomePage.open()
    await LoginPage.login(crn)

    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('SBI number')
    ).toContain('107034848')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Business name')
    ).toContain('MA SCOTT & SON')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Address 1')
    ).toContain('Nirvana HydeWay')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('City')
    ).toContain('WESTERHAM')
    await expect(
      await ConfirmYourDetailsPage.getSummaryValue('Postcode')
    ).toContain('LE4 0SR')
    await expect(ConfirmYourDetailsPage.contactDetailsKey).not.toBeExisting()
  })
})
