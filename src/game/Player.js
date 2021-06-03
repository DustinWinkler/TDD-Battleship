import { createGameboard } from "./Gameboard";

const createPlayer = () => {
  let gameboard = createGameboard()

  const randomAttack = () => {
    let coord = []
    coord[0] = Math.floor(Math.random() * 10)
    coord[1] = Math.floor(Math.random() * 10)
    return coord
  }

  return {
    gameboard,
    randomAttack
  }
}

export {createPlayer}