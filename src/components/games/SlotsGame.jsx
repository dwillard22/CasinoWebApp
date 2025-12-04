//This file has logic for a simple Slots game component in React.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/slots.css';

const SYMBOLS = ['🍒', '🍋', '🔔', '⭐', '7'];

export default function SlotsGame() {
  const navigate = useNavigate();
  const [reels, setReels] = useState(['🍒', '🍋', '🔔']);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [coins, setCoins] = useState(250); // optionally fetch from profile

  // quick client-side spin animation
  const animateSpin = () => new Promise(resolve => {
    let count = 0;
    const spins = 10;
    const interval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ]);
      if (++count >= spins) { clearInterval(interval); resolve(); }
    }, 100);
  });

  async function handleSpin() {
    if (spinning) return;
    setSpinning(true);
    setMessage('');
    await animateSpin();

    fetch('/api/slots/spin', { method: 'POST', credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setReels(data.result);
        setCoins(data.coins);
        setMessage(data.payout > 0 ? `🎉 You won ${data.payout} coins!` : 'Try again!');
        setSpinning(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Error spinning');
        setSpinning(false);
      });
  }

  return (
    <div className="game-page">
      <h2>🎰 Slots</h2>
      <div className="reels">
        {reels.map((sym, i) => (
          <div key={i} className="reel">{sym}</div>
        ))}
      </div>
      <p className="coins-display">Coins: {coins}</p>
      <button className="game-button" onClick={handleSpin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin (1 coin)'}
      </button>
      {message && <p className="message">{message}</p>}
      <button className="back-button" onClick={() => navigate('/games')}>
        ⬅ Back to Games
      </button>
    </div>
  );
}
