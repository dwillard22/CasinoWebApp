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
  const animateSpin = async () => {
    const STEPS = 10;
    const DELAY_MS = 70;

    for (let i = 0; i < STEPS; i++) {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
      // small delay between frames
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }
  };

  const handleSpin = async () => {
    if (spinning) return;

    if (coins <= 0) {
      setMessage('You have no coins left. Try another game or come back later.');
      return;
    }

    setSpinning(true);
    setMessage('');

    await animateSpin();

    try {
      const res = await fetch('/api/slots/spin', {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Spin error:', res.status, text);
        setMessage('Error spinning');
        return;
      }

      const data = await res.json();
      console.log('Spin result:', data);

      const newReels = data.result ?? reels;
      const payout = data.payout ?? 0;
      const newCoins =
        typeof data.coins === 'number'
          ? data.coins
          : coins;

      setReels(newReels);
      setCoins(newCoins);

      // build message based on reels + payout
      const counts = {};
      for (const s of newReels) {
        counts[s] = (counts[s] || 0) + 1;
      }
      const maxCount = Math.max(...Object.values(counts));
      const symbolOfMax = Object.keys(counts).find(
        k => counts[k] === maxCount
      );

      let userMessage = '';

      if (payout >= 50 && symbolOfMax === '7') {
        userMessage = `🎊 JACKPOT! Triple 7s — you won ${payout} coins!`;
      } else if (maxCount === 3 && payout > 0) {
        userMessage = `🎉 Triple ${symbolOfMax}! You won ${payout} coins!`;
      } else if (maxCount === 2 && payout > 0) {
        userMessage = `🎉 You won ${payout} coins with a pair of ${symbolOfMax}!`;
      } else if (maxCount === 2) {
        userMessage = `😮 So close — two ${symbolOfMax}! Try again for the triple.`;
      } else if (payout > 0) {
        userMessage = `🎉 You won ${payout} coins!`;
      } else {
        userMessage = 'No win — better luck next time.';
      }

      if (newCoins <= 0) {
        userMessage += ' You have no coins left.';
      }

      setMessage(userMessage);
    } catch (err) {
      console.error('Network/JSON error:', err);
      setMessage('Error spinning');
    } finally {
      setSpinning(false);
    }
  };

  return (
    <div className="slots-container">
      <h2>Slots</h2>
      <div className="reels">
        {reels.map((sym, i) => (
          <div key={i} className="reel">
            {sym}
          </div>
        ))}
      </div>
      <p className="coins-display">Coins: {coins}</p>
      <button
        className="game-button"
        onClick={handleSpin}
        disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin (1 coin)'}
      </button>
      {message && <p className="message">{message}</p>}
      <button className="back-button" onClick={() => navigate('/games')}>
        ⬅ Back to Games
      </button>
    </div>
  );
}
