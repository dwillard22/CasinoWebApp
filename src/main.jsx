import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";

// Screens
import TitleScreen from "./components/TitleScreen";
import GameScreen from "./components/gameScreen";
import Header from "./components/header";

// Games
import BlackJack from "./components/games/BlackJack";
import DiceGame from "./components/games/DiceGame";
import RideTheBus from "./components/games/RideTheBus";
import SlotsGame from "./components/games/SlotsGame";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <Header />   {/* ← This stays on EVERY screen */}

    <div style={{ marginTop: "65px" }}></div>
    <Routes>
      {/* Main navigation screens */}
      <Route path="/" element={<TitleScreen />} />
      <Route path="/games" element={<GameScreen />} />

      {/* Individual games */}
      <Route path="/games/blackjack" element={<BlackJack />} />
      <Route path="/games/dice" element={<DiceGame />} />
      <Route path="/games/ride-the-bus" element={<RideTheBus />} />
      <Route path="/games/slots" element={<SlotsGame />} />
    </Routes>
  </BrowserRouter>
);