import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';

import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Training from './pages/Training';
import Practice from './pages/Practice';
import Test from './pages/Test';

import './App.css';

function App() {
  const [score, setScore] = useState(0);

  const handleReset = () => {
    setScore(0);
  };

  return (
    <HashRouter>
      <Navbar score={score} onReset={handleReset} />
      <Routes>
        {/* Home landing page */}
        <Route path="/" element={<Home />} />

        {/* Count-N-Compare game */}
        <Route
          path="/count-n-compare"
          element={
            <main className="main-content">
              <GameBoard score={score} setScore={setScore} />
            </main>
          }
        />

        {/* GeoLearn section — wrapped in ProgressProvider */}
        <Route
          path="/geolearn/*"
          element={
            <ProgressProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/training" element={<Training />} />
                <Route path="/practice" element={<Practice />} />
                <Route path="/test" element={<Test />} />
              </Routes>
            </ProgressProvider>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
