import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuctionScreen from './components/AuctionScreen';
import CaptainDashboard from './components/CaptainDashboard';
import DraftMaster from './components/DraftMaster';
import Home from './pages/Home';
import Captains from './pages/Captains';
import PlayerPool from './pages/PlayerPool';
import LogPage from "./components/LogPage"; // New log page
import logo from "./assets/lob.jpg"; // Import the logo

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        {/* Navigation Menu */}
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/auction">Auction</Link></li>
            <li><Link to="/captains">Captains</Link></li>
            <li><Link to="/player-pool">Player Pool</Link></li>
            <li><Link to="/draft-master">Draft Master</Link></li>
          </ul>
          <h1 className="navbar-title">RBL AUCTION</h1>
          <img src={logo} alt="Company Logo" className="logo" />
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={<AuctionScreen />} />
          <Route path="/captains" element={<Captains />} />
          <Route path="/player-pool" element={<PlayerPool />} />
          <Route path="/draft-master" element={<DraftMaster />} />
          <Route path="/logs" element={<LogPage />} /> {/* Log Page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
