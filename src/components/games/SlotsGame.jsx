import { useNavigate } from "react-router-dom";
import "../../styles/gameScreen.css";

export default function SlotsGame() {
  const navigate = useNavigate();
  return (
    <div className="game-page">
      <h2>🎰 Slots Game Coming Soon!</h2>
      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
  );
}