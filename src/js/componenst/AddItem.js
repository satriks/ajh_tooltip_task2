export class AddItem {
  constructor(){
    this.itemForm = this.createItem()
    
  }

createItem(){
  const itemForm = document.createElement('div')
  itemForm.classList.add('crm__add-form')

  const tittleItem = document.createElement('span')
  tittleItem.innerText = 'Название'
  const inputTittle =document.createElement('input');

  const priceItem = document.createElement('span');
  priceItem.innerText = 'Стоимость';
  const inputPrice = document.createElement('input');
  
  const buttonCont = document.createElement('div')
  buttonCont.classList.add('add-form__btn-container')
  const saveButton=  document.createElement("button");
  saveButton.innerText = 'Сохранить'
  const cancelButton=  document.createElement("button");
  cancelButton.innerText = 'Отмена'
  buttonCont.append(saveButton, cancelButton)

  itemForm.append(tittleItem, inputTittle, priceItem, inputPrice, buttonCont)

  return itemForm
}

showForm(){
  const container = document.querySelector('body')
  const {top, left} = document.querySelector('.crm__table').getBoundingClientRect()
  this.itemForm.style.top = top - 20 + 'px'
  this.itemForm.style.left = left + 40 + 'px'
  container.appendChild(this.itemForm)
}

}
