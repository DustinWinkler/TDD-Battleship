import { createPlayer } from "./Player";

let newPlayer
beforeEach(() => {
  newPlayer = createPlayer()
})

test('should have a gameboard', () => {
  expect(newPlayer.gameboard).toBeDefined()
})

test('should have randomAttack that return coord array', () => {
  let attack = newPlayer.randomAttack()
  expect(attack[0] % 1 === 0).toBe(true)
  expect(attack[1] % 1 === 0).toBe(true)
  expect(attack[0]).toBeLessThan(10)
  expect(attack[0]).toBeGreaterThan(0)
  expect(attack[1]).toBeLessThan(10)
  expect(attack[1]).toBeGreaterThan(0)
})
