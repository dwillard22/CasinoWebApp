import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import GameScreen from "./components/gameScreen";
import BlackJack from "./components/games/BlackJack";
// etc.

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setCheckingAuth(false);
      })
      .catch(() => {
        setUser(null);
        setCheckingAuth(false);
      });
  }, []);

  if (checkingAuth) {
    return <div className="game-page"><h2>Loading...</h2></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/games" /> : <AuthScreen />}
        />

        <Route
          path="/games"
          element={user ? <GameScreen /> : <Navigate to="/" />}
        />

        <Route
          path="/games/blackjack"
          element={user ? <BlackJack /> : <Navigate to="/" />}
        />

        {/* other games... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
