export class Popover {
  constructor () {
    this.popovers = document.querySelectorAll('[data-toggle="popover"]')
    this.popovers.forEach(el => el.addEventListener('click', this.handelTooltip))
    this.popovers.forEach(el => el.addEventListener('blur', this.removeTooltip))
    this.currentPopovers = []
  }

  removeTooltip = () => {
    this.currentPopovers.forEach(el => el.remove())
    this.currentPopovers = []
  }

  handelTooltip = (event) => {
    const button = event.target
    const popoverElement = this.createTooltip(button.dataset)
    const container = button.closest('body')

    const { top, left } = button.getBoundingClientRect()
    container.appendChild(popoverElement)
    this.currentPopovers.push(popoverElement)
    popoverElement.style.top = top - popoverElement.offsetHeight - 10 + 'px'
    popoverElement.style.left = left + button.offsetWidth / 2 - popoverElement.offsetWidth / 2 + 'px'
  }

  createTooltip = (dataset) => {
    const { title, content } = dataset

    const div = document.createElement('div')
    div.classList.add('popover')
    const popoverTitle = document.createElement('h2')
    popoverTitle.innerText = title
    const popoverContent = document.createElement('p')
    popoverContent.innerText = content
    div.appendChild(popoverTitle)
    div.appendChild(popoverContent)

    return div
  }
}
