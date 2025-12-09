import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/slots.css";


const INITIAL_REELS = ["❔", "❔", "❔"];

export default function SlotsGame() {
  const navigate = useNavigate();
  const [reels, setReels] = useState(INITIAL_REELS);
  const [coins, setCoins] = useState(null); // backend is source of truth
  const [message, setMessage] = useState("Click SPIN to play!");
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastPayout, setLastPayout] = useState(0);
  const [error, setError] = useState(null);

  async function handleSpin() {
    setIsSpinning(true);
    setError(null);
    setMessage("Good luck…");

    try {
      const res = await fetch("/api/slots/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      // Handle backend-level errors (like NO_COINS)
      if (!res.ok) {
        if (data.error === "NO_COINS") {
          setMessage("You're out of coins. 😢");
        } else {
          setMessage("Something went wrong. Try again.");
        }
        if (typeof data.coins === "number") setCoins(data.coins);
        setIsSpinning(false);
        return;
      }

      // Successful spin
      setReels(data.result);
      setCoins(data.coins);
      setLastPayout(data.payout);

      // Match the backend payout logic for messages
      if (data.payout === 50) {
        setMessage("JACKPOT! Triple 7s! +50 coins 🎉");
      } else if (data.payout === 20) {
        setMessage("Nice! Triple match! +20 coins 🤑");
      } else {
        const [a, b, c] = data.result;
        if (a === b || b === c || a === c) {
          setMessage("You hit a pair – close one! 😅 (No payout)");
        } else {
          setMessage("No match this time. Try again!");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Is the backend running on port 3000?");
      setMessage("Unable to connect to server.");
    } finally {
      setIsSpinning(false);
    }
  }

  return (
    <div className="slots-game">
      <h1>Slots</h1>

      <p className="slots-coins">
        Coins: {coins === null ? "…" : coins}
      </p>

      <div className="slots-reels">
        {reels.map((symbol, i) => (
          <div key={i} className="slots-reel">
            {symbol}
          </div>
        ))}
      </div>

      <button
        className="slots-spin-btn"
        onClick={handleSpin}
        disabled={isSpinning}
      >
        {isSpinning ? "Spinning..." : "Spin (1 coin)"}
      </button>

      <p className="slots-message">{message}</p>

      {lastPayout > 0 && (
        <p className="slots-payout">You won {lastPayout} coins!</p>
      )}

      {error && <p className="slots-error">{error}</p>}
      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
    
  );
}