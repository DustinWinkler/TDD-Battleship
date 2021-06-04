import React, {useState, useEffect} from 'react'
import GridSquare from "./GridSquare";
import { createPlayer } from "../game/Player";

function PostSetup(props) {
  const [human, setHuman] = useState(props.humanPlayer)
  const [ai, setAI] = useState(createPlayer())
  const [humanMisses, setHumanMisses] = useState([])
  const [humanHits, setHumanHits] = useState([])
  const [aiMisses, setAIMisses] = useState([])
  const [aiHits, setAIHits] = useState([])

  useEffect(() => {
    setAI(prev => {
      let prevPlayer = Object.assign({}, prev)
      prevPlayer.gameboard.populateRandomShips()
      return prevPlayer
    })
  },[])

  if (ai.gameboard.allSunk()) {
    setTimeout(()=>{
      alert('You Won!')
      window.location.reload()
    },1000)
  }

  if (human.gameboard.allSunk()) {
    setTimeout(()=>{
      alert('You Lost!')
      window.location.reload()
    },1000)
  }

  function attack(coord) {
    let attackHit = false
    let aiHit = true
    let stringyCoord = JSON.stringify(coord)
    if (humanHits.some(coord => JSON.stringify(coord) === stringyCoord) ||
        humanMisses.some(coord => JSON.stringify(coord) === stringyCoord)) {
      alert("You have attacked there already!")
      return
    }

    if(ai.gameboard.receiveAttack(coord)) {
      attackHit = true
      setHumanHits(prev => {
        return [...prev, coord]
      })
    } else {
      setHumanMisses(prev => {
        return [...prev, coord]
      })
    }

    if (!attackHit) {
      console.log("ai is attacking")
      while(aiHit) {
        let attack = getRandomAttack()
        console.log(attack)
        if(human.gameboard.receiveAttack(attack)) {
          aiHit = true
          setAIHits(prev => {
            return [...prev, attack]
          })
        } else {
          aiHit = false
          setAIMisses(prev => {
            return [...prev, attack]
          })
        }
      }
      console.log(aiHit)
    }
  }

  function getRandomAttack() {
    let attack = ai.randomAttack()
    function attackAlreadyUsed() {
      let statement = false
      let string = JSON.stringify(attack)
      
      if (aiMisses.some(coord => JSON.stringify(coord) === string) ||
          aiHits.some(coord => JSON.stringify(coord) === string)) {
        statement = true
      }
      return statement
    }

    while (attackAlreadyUsed()) {
      attack = ai.randomAttack()
    }
    return attack
  }

  function getBoardContent(player, human) {
    let boardContent = []
    player.gameboard.grid.forEach((array, arrIndex) => {
      array.forEach((cell, cellIndex) => {
        let hit = false
        let miss = false
        let placed = false
        let allCoords = player.gameboard.allCoords()
        let currCoord = JSON.stringify([arrIndex, cellIndex])

        // ADD && human BACK
        if(allCoords.some(coord => JSON.stringify(coord) === currCoord) && human) {placed = true}

        if(human) {
          if(aiMisses.some(coord => JSON.stringify(coord) === currCoord)) {
            miss = true
          }
        } else {
          if(humanMisses.some(coord => JSON.stringify(coord) === currCoord)) {
            miss = true
          }
        }

        if(human) {
          if(aiHits.some(coord => JSON.stringify(coord) === currCoord)) {
            hit = true
          }
        } else {
          if(humanHits.some(coord => JSON.stringify(coord) === currCoord)) {
            hit = true
          }
        }

        boardContent.push(
          <GridSquare hit={hit} miss={miss} attack={human ? ()=>{} : attack} placed={placed} coord={[arrIndex, cellIndex]} key={currCoord} />
        )
      })
    })
    return boardContent
  }
  return (
    <div>
      <div className="game-container">
        <div>
          <p className="board-text">Your Board</p>
          <div className="square-container">
            {getBoardContent(human, true)}
          </div>
        </div>

        <div>
          <p className="board-text">Enemy Board</p>
          <div className="square-container">
            {getBoardContent(ai, false)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostSetup
