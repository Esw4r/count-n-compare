import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ score, onReset }) {
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/';
  const isGame = path.startsWith('/count-n-compare');
  const isGeo = path.startsWith('/geolearn');

  return (
    <nav className="navbar">
      {/* LEFT: Brand + back link */}
      <div className="navbar-brand">
        {!isHome && (
          <Link to="/" className="navbar-home-link">🏠 Home</Link>
        )}
        <span className="navbar-emoji">
          {isGeo ? '🌍' : '🎮'}
        </span>
        <h1 className="navbar-title">
          {isGeo ? 'GeoLearn' : isGame ? 'Count-N-Compare' : 'Learning Hub'}
        </h1>
      </div>

      {/* RIGHT: Section-specific controls */}
      <div className="navbar-stats">
        {/* GeoLearn nav links */}
        {isGeo && (
          <div className="nav-left">
            <Link to="/geolearn">Dashboard</Link>
            <Link to="/geolearn/training">Training</Link>
            <Link to="/geolearn/practice">Practice</Link>
            <Link to="/geolearn/test">Test</Link>
          </div>
        )}

        {/* Count-N-Compare score + reset */}
        {isGame && (
          <>
            <div className="score-display">
              <span className="score-label">Score:</span>
              <span className="score-value">{score}</span>
              <span className="star-emoji">⭐</span>
            </div>
            <button className="reset-button" onClick={onReset}>
              🔄 New Game
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

