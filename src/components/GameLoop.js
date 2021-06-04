import React, {useState} from 'react'
import Setup from './Setup';
import PostSetup from "./PostSetup";

function GameLoop(props) {
  const [rotated, setRotated] = useState(false)
  const [playerToPassDown, setPlayerToPassDown] = useState({})
  const [shipsPlaced, setShipsPlaced] = useState(0)

  function updateShipsPlaced() {
    setShipsPlaced(prev => {
      let newNum = prev + 1
      return newNum
    })
  }

  function bringPlayerUp(player) {
    setPlayerToPassDown(player)
  }

  function toggleRotated() {
    setRotated(!rotated)
  }

  let gameState
  if (shipsPlaced >= 5) {
    gameState = <PostSetup humanPlayer={playerToPassDown} />
  } else {
    gameState = (
      <div>
        <button className={"rotate " + (rotated ? "green" : "red")} onClick={()=>{toggleRotated()}}>{"Rotate " + (rotated ? "✓" : "✕")}</button>
        <Setup sendPlayer={bringPlayerUp} rotated={rotated} placeShip={updateShipsPlaced} />
      </div>)
  }

  return (
    <div>
      {gameState}
    </div>
  )
}

export default GameLoop
