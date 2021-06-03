import {createShip} from './Ship'

let newShip
beforeEach(() => {
  newShip = createShip(3)
})

test('should return Ship object with proper attributes', () => {
  expect(newShip.length).toBe(3)
})

test('should have hit function and have hits array', () => {
  expect(newShip.hit).toBeDefined()
  expect(newShip.hits).toBeDefined()
})

test('should mutate hits when hit()', () => {
  newShip.hit(2)
  expect(newShip.hits.includes(2)).toBe(true)
})

test('hit should return false when space is already hit', () => {
  newShip.hit(2)
  expect(newShip.hit(2)).toBe(false)
})

test('should return false when hit is called on space not on ship', () => {
  expect(newShip.hit(10)).toBe(false)
})

test('should have isSunk()', () => {
  expect(newShip.isSunk).toBeDefined()
})

test('isSunk() should return true and false properly', () => {
  newShip.hit(0)
  expect(newShip.isSunk()).toBe(false)
  newShip.hit(1)
  newShip.hit(2)
  expect(newShip.isSunk()).toBe(true)
})

test('should store coords', () => {
  newShip.coords.push([3,4])
  expect(newShip.coords[0]).toStrictEqual([3,4])
})
