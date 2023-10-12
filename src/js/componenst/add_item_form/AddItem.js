import { Item } from "../item/Item"

export class AddItem {
  constructor(title = null, price = null){
    this.inputTittleValue = title
    this.inputPriceValue  = price
    this.itemForm = this.createItem()
    this.item = null
    this.busyName = null
    this.errors = {
      title :
        {valueMissing : 'Введите название !',
        busyName: 'Такое имя уже есть!'},
      price : 
        {valueMissing : 'Укажите стоимость !',
        rangeUnderflow: 'Цена должна быть больше 0',
        stepMismatch : 'Ну какие копейки в учебном заднии'
      }


    }
  }

createItem (){
  const itemForm = document.createElement('form')
  itemForm.classList.add('crm__add-form')
  itemForm.noValidate = true

  const tittleItem = document.createElement('span')
  tittleItem.innerText = 'Название'
  const inputTittle = document.createElement('input');
  inputTittle.classList.add('input-title')
  inputTittle.name = 'title'
  if(this.inputTittleValue){
    inputTittle.value = this.inputTittleValue
  }
  inputTittle.required = true

  const priceItem = document.createElement('span');
  priceItem.innerText = 'Стоимость';
  const inputPrice = document.createElement('input');
  inputPrice.name = 'price'
  inputPrice.required = true
  inputPrice.classList.add('input-price')
  inputPrice.type = 'number'
  inputPrice.min = 0

  if(this.inputPriceValue){
    inputPrice.value = this.inputPriceValue;
  }
  
  const buttonCont = document.createElement('div')
  buttonCont.classList.add('add-form__btn-container')

  const saveButton=  document.createElement("button");
  saveButton.innerText = 'Сохранить'
  saveButton.addEventListener('click', this.onSave)
  const cancelButton=  document.createElement("button");
  cancelButton.innerText = 'Отмена'
  cancelButton.addEventListener('click', this.onClose)
  buttonCont.append(saveButton, cancelButton)

  itemForm.append(tittleItem, inputTittle, priceItem, inputPrice, buttonCont)

  return itemForm
}

showForm (busyName){
  this.busyName = busyName
  const container = document.querySelector('body')
  const {top, left} = document.querySelector('.crm__table').getBoundingClientRect()
  this.itemForm.style.top = top - 20 + 'px'
  this.itemForm.style.left = left + 40 + 'px'
  container.appendChild(this.itemForm)
}

createError(massage){
  const errorMassage = document.createElement('p')
  errorMassage.className ='error_message'
  errorMassage.innerText = massage
  return errorMassage
}

onClose = (event) => {
  event.preventDefault()
  this.itemForm.remove()
}

onSave = (event) => {
  event.preventDefault()
  const form = event.target.closest('.crm__add-form')
  const formElements = form.elements;
 
  const invalid = [...formElements].some(element => {
    if (element.name === 'title' && this.busyName.includes(element.value)){
      const err = this.createError(this.errors[element.name].busyName)
      element.insertAdjacentElement('afterend', err)
      setTimeout(()=>err.remove(),3000)
      return true
    }
    if(!element.checkValidity()){
     return Object.keys(ValidityState.prototype).some((key) => {
        if(element.validity[key]){
          const err = this.createError(this.errors[element.name][key])
          element.insertAdjacentElement('afterend', err)
          setTimeout(()=>err.remove(),3000)

          // element.setCustomValidity(this.errors[element.name])

          return true
        }
      })
    }

  });
  if (!invalid){
    this.inputTittleValue = this.itemForm.querySelector('.input-title').value
    this.inputPriceValue = this.itemForm.querySelector('.input-price').value
    this.item = new Item(this.inputTittleValue, this.inputPriceValue)
    this.itemForm.reset()
    this.itemForm.remove()
    
  }
  //Не работает на яндекс браузер, показывает подсказки заполнения, поставил через таймаут 
  // if (invalid){
  //   form.reportValidity()
  // }


}


}
