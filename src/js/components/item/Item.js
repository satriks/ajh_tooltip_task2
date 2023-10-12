export class Item {
  constructor (name, price) {
    this.title = name
    this.price = price
    this.createItem()
  }

  get itemDom () {
    return this.createItem()
  }

  createItem () {
    const item = document.createElement('tr')
    item.classList.add('item')
    const name = document.createElement('td')
    name.innerText = this.title
    const price = document.createElement('td')
    price.innerText = this.price
    const actions = document.createElement('td')
    const redact = document.createElement('span')
    redact.classList.add('redact')
    redact.innerText = '\u270E '
    const del = document.createElement('span')
    del.classList.add('del')
    del.innerText = '\u0078'
    actions.append(redact, del)

    item.append(name, price, actions)

    return item
  }
}
