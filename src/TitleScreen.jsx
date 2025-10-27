import { useState } from "react";
import "./TitleScreen.css";
import MirageLogo from "./assets/MirageLogo.png";

function App() {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  };

   const handleHome = () => {
    setStarted(false);
  };


  return (
    <>
      {started ? (
        <div className="game-screen">
          <h2>🎰 Welcome to the Casino Game! 🎰</h2>
          <img
            src={MirageLogo}
            alt="Mirage Logo"
            className="logo-button"
            onClick={handleHome}
          />

          {/* You can add your game components here */}
        </div>
      ) : (
        <div className="title-screen">
          <img src={MirageLogo} alt="Logo"></img>
          <button onClick={handleStart}>Start Game</button>
        </div>
      )}
    </>
  );
}

export default App;