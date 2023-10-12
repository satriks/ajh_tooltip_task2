import { Item } from "./item/Item"
import { AddItem } from "./add_item_form/AddItem";
import { ConfirmForm } from "./confirm/confirmForm";

export class DomControl {
    constructor (){
        this.board = document.querySelector('.crm__table');
        this.items = []
        
        document.querySelector('.crm__add-btn').addEventListener('click', this.onAddItem)


    }
    init(){
        const item1 = new Item('Тест', 5000);
        this.items.push(item1)
        const item2 = new Item('Тест2', 500);
        this.items.push(item2)
        const item3 = new Item('Тест3', 50030);
        this.items.push(item3)
        this.drawItem()

    }

    onAddItem = () =>{
        const addForm = new AddItem()
        addForm.showForm([...this.items].map(el => el.title))
        addForm.itemForm.addEventListener('reset',() => {
            this.items.push(addForm.item)
            this.drawItem()
        })

    }

    onDelete = (event) => {
      const currentItem = event.target.closest('.item')  
      const confirmElement = new ConfirmForm()
      document.querySelector('body').appendChild(confirmElement.dom)
      confirmElement.confirmForm.addEventListener('click',() => this.confirmDelete(confirmElement.confirm, currentItem) )
    }
    confirmDelete = (confirm, element) => {
        if (confirm){
            this.items = this.items.filter(el => el.title !== element.children[0].innerText)
            element.remove()
        }
    }  

    onRedact = (event) => {
        const element = event.target.closest('.item')
        const redactElement = new AddItem(element.children[0].innerText, element.children[1].innerText)
        redactElement.showForm([...this.items].filter(el => el.title !== element.children[0].innerText).map(el => el.title));
        redactElement.itemForm.addEventListener('reset',() => this.updateItem(element, redactElement.item)) 

    }
    updateItem(item, newItem){
        const updateItem  = this.items.find(el => el.title === item.children[0].innerText)
        const index = this.items.indexOf(updateItem)
        if (index >= 0) {
            this.items[index] = newItem
        }
        this.drawItem()

    }

    drawItem = (items = this.items) => {
        const oldItems = this.board.querySelectorAll('.item')
        if (oldItems){
            oldItems.forEach(el => el.remove())
        }
        for (const item of items){
            const elem = item.itemDom
            this.board.insertAdjacentElement('beforeend', elem)
            elem.querySelector('.redact').addEventListener('click', this.onRedact )
            elem.querySelector('.del').addEventListener('click', this.onDelete)
              
        }
    }
}