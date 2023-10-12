export class ConfirmForm {
  constructor () {
    this.confirm = false
    this.confirmForm = null
  }

  get dom () {
    return this.createForm()
  }

  createForm = () => {
    const confirmForm = document.createElement('div')
    confirmForm.classList.add('conform-form')
    const textForm = document.createElement('h2')
    textForm.innerText = 'Вы точно хотите удалить запись ?'

    const containerBtn = document.createElement('div')
    containerBtn.classList.add('container-btn')

    const confirmBtn = document.createElement('button')
    confirmBtn.innerText = 'Да'
    confirmBtn.classList.add('confirmBtn')
    confirmBtn.addEventListener('click', this.onConfirm)

    const unconfirmedBtn = document.createElement('button')
    unconfirmedBtn.innerText = 'Нет'
    unconfirmedBtn.classList.add('unconfirmedBtn')
    unconfirmedBtn.addEventListener('click', this.onUnconfirmed)

    containerBtn.append(confirmBtn, unconfirmedBtn)
    confirmForm.append(textForm, containerBtn)

    this.confirmForm = confirmForm
    return confirmForm
  }

  onConfirm = () => {
    this.confirm = true
    this.confirmForm.remove()
  }

  onUnconfirmed = () => {
    this.confirm = false
    this.confirmForm.remove()
  }
}
