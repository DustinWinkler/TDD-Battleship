import React, {useState} from 'react'
import { createPlayer } from "../game/Player";
import GridSquare from "./GridSquare";

function GameLoop() {
  const [hoveredCoords, setHoveredCoords] = useState([])

  let currentLength = 3
  let rotated = false
  let player1 = createPlayer()
  //let player2 = createPlayer()

  //Adds hovered Coords
  window.addEventListener('mouseover', e => {

    if (e.target.classList.contains('square')) {
      setHoveredCoords([])
      let id = e.target.id.split(',')
      hoverSquares(id, currentLength, rotated)
      console.log(hoveredCoords)
    }
  })

  function hoverSquares(coord, length, rotated) {
    let numberifiedCoord = coord.map(meme => parseInt(meme))
    let coordsToHover = []
    coordsToHover.push(numberifiedCoord)

    for (let i = 1; i < length; i++) {
      let newCoord = []
      if (rotated){
        newCoord.push(numberifiedCoord[0])
        newCoord.push(numberifiedCoord[1] + i)
      } else {
        newCoord.push(numberifiedCoord[0] + i)
        newCoord.push(numberifiedCoord[1])
      }
      coordsToHover.push(newCoord)
    }
    setHoveredCoords(coordsToHover)
  }

  player1.gameboard.placeShip(3, [3,3], false)

  let player1Content = []
  //let player2Content = []
  
  console.log(player1.gameboard.allCoords())

  player1.gameboard.grid.forEach((array, arrIndex) => {
    array.forEach((cell, cellIndex) => {
      let somethingPlacedHere = false
      let hovered = false
      let allCoords = player1.gameboard.allCoords()
      let currCoord = JSON.stringify([arrIndex, cellIndex])

      if(allCoords.some(coord => JSON.stringify(coord) === currCoord)) {somethingPlacedHere = true}
      if(hoveredCoords.some(coord => JSON.stringify(coord) === currCoord)) {hovered = true}

      player1Content.push(
        <GridSquare hovered={hovered} placed={somethingPlacedHere} coord={[arrIndex, cellIndex]} key={currCoord}/>
      )
    })
  })

  return (
    <div className="square-container">
      {player1Content}
    </div>
  )
}

export default GameLoop
