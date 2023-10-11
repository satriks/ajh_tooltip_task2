import puppeteer from 'puppeteer'

jest.setTimeout(50000) //

describe('Page start', () => {
  let browser = null
  let page = null
  const baseUrl = 'http://localhost:9000' //eslint-disable-line

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: process.env.CI,
      slowMo: 300
    })
    page = await browser.newPage()
  })

  test('check popover chow ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.tooltip__btn')

    await btn.click()

    expect(await page.$('.popover')).toBeTruthy()
  })

  test('check hide popover ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.tooltip__btn')

    await btn.click()

    const title = await page.$('h1')

    await title.click()

    expect(await page.$('.input-not-valid')).toBe(null)
  })

  afterAll(async () => {
    await browser.close()
  })
})
