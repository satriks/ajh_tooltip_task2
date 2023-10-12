import puppeteer from 'puppeteer'

jest.setTimeout(50000) //

describe('Page start', () => {
  let browser = null
  let page = null
  const baseUrl = 'http://localhost:9000' //eslint-disable-line

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      slowMo: 300
    })
    page = await browser.newPage()
  })

  test('check start add form ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.crm__add-btn')

    await btn.click()

    expect(await page.$('.crm__add-form')).toBeTruthy()
  })

  test('check add form cancel ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.crm__add-btn')
    
    await btn.click()
    
    const unconfirmedBtn = await page.$('.cancelButton')
  
    await unconfirmedBtn.click()

    expect(await page.$('.crm__add-form')).toBe(null)
  })

  test('check add form save ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.crm__add-btn')
    
    await btn.click()

    const tittle = await page.$('.input-title')
    await tittle.click()
    await tittle.type('Новое')

    const price = await page.$('.input-price')
    await price.click()
    await price.type('50000')
    
    const confirmBtn = await page.$('.saveButton')
  
    await confirmBtn.click()
    
    const result = await page.evaluate(() => {
      let length = document.querySelectorAll('.item').length
    return {
      length
    }
    });

    expect(result).toEqual({length: 4})
  })

  test('check add form change ', async () => {
    await page.goto('http://localhost:9000')

    await page.waitForSelector('body')

    const btn = await page.$('.redact')
    
    await btn.click()

    const tittle = await page.$('.input-title')
    await tittle.click()
    await tittle.type('Новое')

    const price = await page.$('.input-price')
    await price.click()
    await price.type('50000')
    
    const confirmBtn = await page.$('.saveButton')
  
    await confirmBtn.click()
    
    const result = await page.evaluate(() => {
      let title = document.querySelector('.item').children[0].innerText
      let price = document.querySelector('.item').children[1].innerText
    return {
      title,
      price
    }
    });

    expect(result).toEqual({title: 'ТестНовое', price : '500050000'})
  })

  afterAll(async () => {
    await browser.close()
  })
})