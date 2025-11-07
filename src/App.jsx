import { useState } from "react";
import TitleScreen from "./components/TitleScreen";
import GameScreen from "./components/gameScreen";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {started ? (
        <GameScreen onHome={() => setStarted(false)} />
      ) : (
        <TitleScreen onStart={() => setStarted(true)} />
      )}
    </>
  );
}

export default App;