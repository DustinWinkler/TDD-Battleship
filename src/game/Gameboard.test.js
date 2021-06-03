import {createGameboard} from './Gameboard'

let newBoard
beforeEach(() => {
  newBoard = createGameboard()
})

test('should have grid of 10 by 10', () => {
  expect(newBoard.grid.length).toBe(10)
  for (let i = 0; i < newBoard.grid.length; i++) {
    const element = newBoard.grid[i];
    expect(element.length).toBe(10)
  }
})

test('should place ships correctly', () => {
  newBoard.placeShip(3, [3,4], false)
  expect(newBoard.grid[3][4]).toBe('x')
  expect(newBoard.grid[4][4]).toBe('x')
  expect(newBoard.grid[5][4]).toBe('x')
})

test('should place ships vertical', () => {
  newBoard.placeShip(3, [3,4], true)
  expect(newBoard.grid[3][4]).toBe('x')
  expect(newBoard.grid[3][5]).toBe('x')
  expect(newBoard.grid[3][6]).toBe('x')
})

test('should not place ship if it will go out of bounds', () => {
  expect(newBoard.placeShip(3, [10, 10], false)).toBe(false)
  expect(newBoard.placeShip(3, [10, 10], true)).toBe(false)
})

test('ship should have coords after placeShip()', () => {
  newBoard.placeShip(3, [3,3], false)
  expect(newBoard.ships[0].coords).toEqual([[3,3], [4,3], [5,3]])
})


test('should receiveAttack() and ship should store that hit', () => {
  newBoard.placeShip(3, [3,3], false)
  newBoard.receiveAttack([4, 3])
  expect(newBoard.ships[0].hits).toContain(1)
})

test('ship.isSunk() should be true after requisite receiveAttacks', () => {
  newBoard.placeShip(3, [3,3], false)
  newBoard.receiveAttack([3, 3])
  newBoard.receiveAttack([4, 3])
  newBoard.receiveAttack([5, 3])
  expect(newBoard.ships[0].isSunk()).toBe(true)
})


test('should receiveAttack() for missing coordinate and return false', () => {
  newBoard.placeShip(3, [3,3], false)
  expect(newBoard.receiveAttack([7, 3])).toBe(false)
})

test('receiveAttack should return false when hitting same place', () => {
  newBoard.placeShip(3, [3,3], false)
  newBoard.receiveAttack([7, 3])
  expect(newBoard.receiveAttack([7, 3])).toBe(false)
})

test('receive attack should return false when hitting ship in same place twice', () => {
  newBoard.placeShip(3, [3,3], false)
  newBoard.receiveAttack([3, 3])
  expect(newBoard.receiveAttack([3, 3])).toBe(false)
})

test('allSunk() should return true if all ships are fully hit', () => {
  newBoard.placeShip(2, [3,3], false)
  newBoard.placeShip(2, [5,5], false)
  newBoard.receiveAttack([3,3])
  newBoard.receiveAttack([4,3])
  newBoard.receiveAttack([5,5])
  newBoard.receiveAttack([6,5])
  expect(newBoard.allSunk()).toBe(true)
})
