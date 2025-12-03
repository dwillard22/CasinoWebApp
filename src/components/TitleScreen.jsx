import { useNavigate } from "react-router-dom";
import "../styles/TitleScreen.css";
import MirageLogo from "../assets/MirageLogo.png";

export default function TitleScreen() {
  const navigate = useNavigate();

  return (
    <div className="title-screen">
      <img src={MirageLogo} alt="Logo" className="logo" />
      <h1>Welcome to Mirage Casino 🎰</h1>
      <button onClick={() => navigate("/games")}>Start Game</button>
    </div>
  );
}