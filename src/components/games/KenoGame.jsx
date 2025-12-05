// src/components/games/KenoGame.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/gameScreen.css";   // your existing shared styles
import "../../styles/kenoGame.css";     // new Keno-specific styles

export default function KenoGame() {
  const navigate = useNavigate();

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [drawnNumbers, setDrawnNumbers] = useState([]);
  const [hits, setHits] = useState(0);
  const [message, setMessage] = useState("");
  const [gamePlayed, setGamePlayed] = useState(false);

  const MAX_PICKS = 5;
  const TOTAL_NUMBERS = 40;
  const DRAW_COUNT = 10;

  const allNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);

  const handleNumberClick = (number) => {
    // Don’t allow changing picks after game is played
    if (gamePlayed) return;

    // Toggle selection
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      // Enforce max 5 picks
      if (selectedNumbers.length >= MAX_PICKS) {
        setMessage(`You can only pick ${MAX_PICKS} numbers.`);
        return;
      }
      setSelectedNumbers([...selectedNumbers, number]);
      setMessage(""); // clear any previous warning
    }
  };

  const generateDraw = () => {
    const pool = [...allNumbers];
    const result = [];

    while (result.length < DRAW_COUNT) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool[idx]);
      pool.splice(idx, 1);
    }

    return result;
  };

  const startGame = () => {
    if (selectedNumbers.length !== MAX_PICKS) {
      setMessage(`Please select exactly ${MAX_PICKS} numbers to play.`);
      return;
    }

    const draw = generateDraw();
    setDrawnNumbers(draw);

    const hitCount = selectedNumbers.filter((n) => draw.includes(n)).length;
    setHits(hitCount);
    setGamePlayed(true);

    if (hitCount >= 3) {
      setMessage(`🎉 You hit ${hitCount} numbers! You win!`);
    } else if (hitCount === 2) {
      setMessage(`So close! You hit 2 numbers. Try again!`);
    } else if (hitCount === 1) {
      setMessage(`You hit 1 number. Better luck next time!`);
    } else {
      setMessage(`No hits this time. 😅 Try again!`);
    }
  };

  const resetGame = () => {
    setSelectedNumbers([]);
    setDrawnNumbers([]);
    setHits(0);
    setMessage("");
    setGamePlayed(false);
  };

  const getCellClassName = (number) => {
    const isSelected = selectedNumbers.includes(number);
    const isDrawn = drawnNumbers.includes(number);
    const isHit = isSelected && isDrawn;

    let className = "keno-cell";
    if (isSelected) className += " selected";
    if (isDrawn) className += " drawn";
    if (isHit) className += " hit";
    return className;
  };

  return (
    <div className="game-page">
      <h2>🎲 Keno</h2>

      <div className="keno-header">
        <div>
          <strong>Pick {MAX_PICKS} numbers</strong> from 1–{TOTAL_NUMBERS}.
        </div>
        <div>
          Selected: <strong>{selectedNumbers.length}</strong> / {MAX_PICKS}
        </div>
        {gamePlayed && (
          <div>
            Hits: <strong>{hits}</strong> / {MAX_PICKS}
          </div>
        )}
      </div>

      <div className="keno-grid">
        {allNumbers.map((number) => (
          <button
            key={number}
            className={getCellClassName(number)}
            onClick={() => handleNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="keno-controls">
        {!gamePlayed ? (
          <button
            className="game-button"
            onClick={startGame}
            disabled={selectedNumbers.length !== MAX_PICKS}
          >
            🎯 Draw Numbers
          </button>
        ) : (
          <button className="game-button" onClick={resetGame}>
            🔁 Play Again
          </button>
        )}
      </div>

      {drawnNumbers.length > 0 && (
        <div className="keno-drawn">
          <h3>Drawn Numbers:</h3>
          <div className="keno-drawn-list">
            {drawnNumbers.map((n) => (
              <span
                key={n}
                className={
                  selectedNumbers.includes(n) ? "drawn-number hit" : "drawn-number"
                }
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {message && <p className="keno-message">{message}</p>}

      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
  );
}
