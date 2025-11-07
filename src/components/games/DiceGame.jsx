import { useNavigate } from "react-router-dom";
import "../../styles/gameScreen.css";

export default function DiceGame() {
  const navigate = useNavigate();
  return (
    <div className="game-page">
      <h2>🎲 Dice Game Coming Soon!</h2>
      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
  );
}