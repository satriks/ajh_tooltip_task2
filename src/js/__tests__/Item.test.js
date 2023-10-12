/** @jest-environment jsdom */
import { Item } from '../components/item/Item'

test('test getter dom', () => {
  const item = new Item('test', 5000)
  expect(item.itemDom).toBeTruthy()
})
test('test title', () => {
  const item = new Item('test', 5000)
  expect(item.title).toBe('test')
})
test('test price', () => {
  const item = new Item('test', 5000)
  expect(item.price).toBe(5000)
})
