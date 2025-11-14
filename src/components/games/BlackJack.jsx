import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/blackJack.css";

export default function BlackJack() {
  const navigate = useNavigate();

  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  // Create and shuffle a deck
  const createDeck = () => {
    const suits = ["♠", "♥", "♦", "♣"];
    const values = [
      "A", "2", "3", "4", "5", "6", "7",
      "8", "9", "10", "J", "Q", "K"
    ];
    const newDeck = [];
    for (let suit of suits) {
      for (let value of values) {
        newDeck.push({ suit, value });
      }
    }
    return newDeck.sort(() => Math.random() - 0.5);
  };

  const getCardValue = (card) => {
    if (["J", "Q", "K"].includes(card.value)) return 10;
    if (card.value === "A") return 11;
    return parseInt(card.value);
  };

  const getHandValue = (hand) => {
    let value = hand.reduce((sum, card) => sum + getCardValue(card), 0);
    let aces = hand.filter((card) => card.value === "A").length;

    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }
    return value;
  };

  const startGame = () => {
    const newDeck = createDeck();
    const player = [newDeck.pop(), newDeck.pop()];
    const dealer = [newDeck.pop(), newDeck.pop()];

    setDeck(newDeck);
    setPlayerHand(player);
    setDealerHand(dealer);
    setGameOver(false);
    setMessage("");
  };

  const hit = () => {
    if (gameOver) return;
    const newDeck = [...deck];
    const newCard = newDeck.pop();
    const newHand = [...playerHand, newCard];
    setDeck(newDeck);
    setPlayerHand(newHand);

    const playerValue = getHandValue(newHand);
    if (playerValue > 21) {
      setMessage("💥 You Busted! Dealer Wins!");
      setGameOver(true);
    }
  };

  const stand = () => {
    let newDeck = [...deck];
    let newDealer = [...dealerHand];

    while (getHandValue(newDealer) < 17) {
      newDealer.push(newDeck.pop());
    }

    const playerValue = getHandValue(playerHand);
    const dealerValue = getHandValue(newDealer);

    let result = "";
    if (dealerValue > 21 || playerValue > dealerValue) {
      result = "🎉 You Win!";
    } else if (playerValue === dealerValue) {
      result = "🤝 It's a Tie!";
    } else {
      result = "💀 Dealer Wins!";
    }

    setDealerHand(newDealer);
    setDeck(newDeck);
    setMessage(result);
    setGameOver(true);
  };

  return (
    <div className="game-page">
      <h2>🃏 Blackjack</h2>

      {playerHand.length === 0 ? (
        <button className="game-button" onClick={startGame}>
          Start Game
        </button>
      ) : (
        <>
          <div className="hand">
            <h3>Dealer's Hand ({gameOver ? getHandValue(dealerHand) : "?"})</h3>
            <div className="cards">
              {dealerHand.map((card, i) => (
                <div key={i} className="card">
                  {gameOver || i === 0 ? `${card.value}${card.suit}` : "🂠"}
                </div>
              ))}
            </div>
          </div>

          <div className="hand">
            <h3>Your Hand ({getHandValue(playerHand)})</h3>
            <div className="cards">
              {playerHand.map((card, i) => (
                <div key={i} className="card">
                  {card.value}
                  {card.suit}
                </div>
              ))}
            </div>
          </div>

          {!gameOver && (
            <div className="buttons">
              <button className="game-button" onClick={hit}>Hit</button>
              <button className="game-button" onClick={stand}>Stand</button>
            </div>
          )}

          {gameOver && (
            <button className="game-button" onClick={startGame}>
              Play Again
            </button>
          )}

          {message && <h3 className="message">{message}</h3>}
        </>
      )}

      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
  );
}
