import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [coins, setCoins] = useState(null);

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setCoins(data.coins))
      .catch(() => setCoins(null));
  }, []);

  return (
    <div className="header-bar">
      <div className="left-section">
        <Link to="/profile" className="header-link">👤 Profile</Link>
      </div>
      <div className="center-section">
        <h2>🎰 Casino Game</h2>
      </div>
      <div className="right-section">
        {coins != null ? (
          <span className="coins">🪙 {coins}.Coins</span>
        ) : (
          <span className="coins">🪙 ---</span>
        )}
        {/* Logout button for when I implement authentication*/}
      </div>
    </div>
  );
}
