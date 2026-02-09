import React from 'react';
import './Navbar.css';

function Navbar({ score, onReset }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-emoji">🎮</span>
        <h1 className="navbar-title">Count N Compare</h1>
      </div>
      <div className="navbar-stats">
        <div className="score-display">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
          <span className="star-emoji">⭐</span>
        </div>
        <button className="reset-button" onClick={onReset}>
          🔄 New Game
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
