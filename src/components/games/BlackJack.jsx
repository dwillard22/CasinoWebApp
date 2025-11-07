import { useNavigate } from "react-router-dom";
import "../../styles/gameScreen.css";

export default function BlackJack() {
  const navigate = useNavigate();
  return (
    <div className="game-page">
      <h2>🃏 BlackJack Coming Soon!</h2>
      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
    
  );
}