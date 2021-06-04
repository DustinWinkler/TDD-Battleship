import {createShip} from './Ship'

const createGameboard = () => {
  let grid = buildGrid()
  let ships = []
  let attacks = []

  // returns array of length 10 with items being arrays of length 10
  function buildGrid() {
    let grid = []
    for (let i = 0; i < 10; i++) {
      let innerGrid = []
      for (let i = 0; i < 10; i++) {
        innerGrid.push('')
      }
      grid.push(innerGrid)
    }
    return grid
  }
  
  const placeShip = (shipLength, coords, horizontal) => {
    let ship = createShip(shipLength)
    let x = coords[0]
    let y = coords[1]
    let stringified = JSON.stringify(coords)

    if(allCoords().some(coord => JSON.stringify(coord) === stringified)) { return false}

    // if out of bounds, return false
    const oOB = () => {
      let statement = false
      if (coords[0] > 10 || coords[1] > 10) {
        statement = true
      } else if (horizontal && (coords[1] + shipLength) > 10) {
        statement = true
      } else if (!horizontal && (coords[0] + shipLength) > 10) {
        statement = true
      }
      return statement
    }

    if (oOB()) {
      return false
    }

    if (horizontal) {
      for (let i = 0; i < ship.length; i++) {
        ship.coords.push([x, (y + i)])
        grid[x][y + i] = 'x'
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        ship.coords.push([(x + i), y])
        grid[x + i][y] = 'x'
      }
    }
    ships.push(ship)
    return true
  }

  const receiveAttack = (array) => {
    
    // Technique used to emulate attacks.includes(array)
    let meme = JSON.stringify(array)
    if(attacks.some(coord => JSON.stringify(coord) === meme)) { return false }
    
    let shipToHit
    let spaceToHit
    (() => {
      ships.forEach((ship) => {
        ship.coords.forEach((coord, index) => {
          if (coord[0] === array[0] && coord[1] === array[1]) {
            spaceToHit = index
            shipToHit = ship
          }
        })
      })
    })()

    attacks.push(array)

    if (shipToHit) {
      shipToHit.hit(spaceToHit)
      return true
    } else {
      return false
    }
  }

  const allSunk = () => {
    if (ships.length === 0) {
      return false
    }

    if (ships.every(ship => ship.isSunk())) {
      return true
    } else {
      return false
    }
  }

  const allCoords = () => {
    let allCoords = []
    ships.forEach(ship => {
      ship.coords.forEach(coord => {
        allCoords.push(coord)
      })
    })
    return allCoords
  }

  const populateRandomShips = () => {
    ships = []

    placeShip(5, randomCoords(), (Math.random() < parseFloat(0.5)))

    function randomCoords () {
      let coord = []
      coord.push(Math.floor(Math.random() * 10))
      coord.push(Math.floor(Math.random() * 10))
      return coord
    }

    function getShortestShip() {
      let shortGuy = 6
      ships.forEach(ship => {
        if (ship.length < shortGuy) {shortGuy = ship.length}
      })
      return shortGuy
    }

    while (ships.length <= 4) {
     placeShip((getShortestShip() - 1), randomCoords(), (Math.random() < parseFloat(0.5)))
    }
    
    let overlap = false

    let stringedArray = allCoords().map(JSON.stringify)
    let newSet = new Set(stringedArray)
    
    if (newSet.size < allCoords().length) {
      overlap = true
    }
 
    if (overlap) {
      populateRandomShips()
    }
    
  }

  return {
    grid,
    placeShip,
    ships,
    receiveAttack,
    attacks,
    allSunk,
    allCoords,
    populateRandomShips
  }
}

export {createGameboard}