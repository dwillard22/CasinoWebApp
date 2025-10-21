import { useState } from "react";
import "./TitleScreen.css";
import MirageLogo from "./assets/MirageLogo.png";

function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <>
      {started ? (
        <div className="game-screen">
          <h2>🎰 Welcome to the Casino Game! 🎰</h2>
          {/* You can add your game components here */}
        </div>
      ) : (
        <div className="title-screen">
          <img src={MirageLogo} alt="Logo"></img>
          <h1>🎲 Mirage Casino 🎲</h1>
          <p>Step into the ultimate casino experience!</p>
          <button onClick={handleStart}>Start Game</button>
        </div>
      )}
    </>
  );
}

export default App;