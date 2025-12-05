import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/slots.css';

const SYMBOLS = ['🍒', '🍋', '🔔', '⭐', '7'];

export default function SlotsGame() {
  const navigate = useNavigate();
  //const [bet, setBet] = useState(1);
  const [reels, setReels] = useState(['🍒', '🍋', '🔔']);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [coins, setCoins] = useState(250);

  // On component mount, load saved coin balance (if any)
  useEffect(() => {
    const saved = localStorage.getItem('coinBalance');
    if (saved) setCoins(JSON.parse(saved));
  }, []);

  // Whenever coins change, save the new value
  useEffect(() => {
    localStorage.setItem('coinBalance', JSON.stringify(coins));
  }, [coins]);

  const handleSpin = async () => {
    if (spinning) return;             // prevent double-clicks
    if (coins < 1) {                  // not enough coins to play
      setMessage('Insufficient balance for this bet.');
      return;
    }
    setSpinning(true);
    setMessage('');
    setCoins(prev => prev - 1);       // deduct 1 coin as the bet

    // Quick animation: randomize symbols a few times to simulate spinning
    for (let i = 0; i < 10; i++) {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ]);
      await new Promise(r => setTimeout(r, 100));  // pause 100ms between shuffles
    }

    // Determine final outcome
    const finalReels = [
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    ];
    setReels(finalReels);

    // Win logic: all 3 symbols match
    if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
      const payout = 50;  // reward for a win (e.g. 50 coins)
      setCoins(prev => prev + payout);
      setMessage(`🎉 You won ${payout} coins!`);
    } else {
      setMessage('No win this time. Try again!');
    }

    setSpinning(false);
  };


  return (
    <div className="game-page">
      <h2>🎰 Slots</h2>

      {/* Slot reels display */}
      <div className="reels">
        {reels.map((symbol, idx) => (
          <div key={idx} className="reel">{symbol}</div>
        ))}
      </div>

      {/* Coin balance and Spin button */}
      <p className="coins-display">Balance: ${coins}</p>
      <button className="game-button" onClick={handleSpin} disabled={spinning}>
        {spinning ? 'Spinning...' : 'Spin'}
      </button>

      {/* Result message (win or try-again) */}
      {message && <p className="message">{message}</p>}

      {/* Back navigation to games list */}
      <button className="back-button" onClick={() => navigate('/games')}>
        ⬅ Back to Games
      </button>
    </div>
  );
}

