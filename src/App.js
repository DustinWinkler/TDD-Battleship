import React, {useState} from 'react'
import Header from "./components/Header";
import GameLoop from "./components/GameLoop"
import StartModal from './components/StartModal';

function App() {
  const [gameMode, setGameMode] = useState('')

  function startGame(mode) {
    setGameMode(mode)
  }

  return(
    <div className="app">
      <StartModal setGameFunc={startGame} gameStarted={gameMode === '' ? false : true} />
      <Header />
      <GameLoop />
    </div>
  )
}

export default App
