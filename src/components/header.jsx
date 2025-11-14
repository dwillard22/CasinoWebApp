// src/components/Header.jsx
import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  return (
    <div className="header-bar">
      <div className="left-section">
        <Link to="/profile" className="header-link">👤 Profile</Link>
      </div>

      <div className="center-section">
        <h2>🎰 Casino Game</h2>
      </div>

      <div className="right-section">
        <span className="coins">🪙 250 Coins</span>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}
