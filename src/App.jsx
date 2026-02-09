import React, { useState } from 'react';
import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  const handleReset = () => {
    setScore(0);
  };

  return (
    <div className="app">
      <Navbar score={score} onReset={handleReset} />
      <main className="main-content">
        <GameBoard score={score} setScore={setScore} />
      </main>
    </div>
  );
}

export default App;
