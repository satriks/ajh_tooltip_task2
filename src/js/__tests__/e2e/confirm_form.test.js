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

  test('check start form ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.del')

    await btn.click()

    expect(await page.$('.conform-form')).toBeTruthy()
  })

  test('check form unconfirmed ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.del')

    await btn.click()

    const unconfirmedBtn = await page.$('.unconfirmedBtn')

    await unconfirmedBtn.click()

    expect(await page.$('.conform-form')).toBe(null)
  })

  test('check form confirmed ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')
    await page.waitForSelector('.item')

    const btn = await page.$('.del')

    await btn.click()

    const confirmBtn = await page.$('.confirmBtn')

    await confirmBtn.click()

    const result = await page.evaluate(() => {
      const length = document.querySelectorAll('.item').length
      return {
        length
      }
    })

    expect(result).toEqual({ length: 2 })
  })

  afterAll(async () => {
    await browser.close()
  })
})
