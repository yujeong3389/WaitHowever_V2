import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home/Home';
import Outcome from './pages/outcome/Outcome';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/outcome" element={<Outcome />} />
      </Routes>
    </Router>
  );
}

export default App;
