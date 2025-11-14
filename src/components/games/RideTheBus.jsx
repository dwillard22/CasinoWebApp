import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/rideTheBus.css";

export default function RideTheBus() {
  const navigate = useNavigate();

   // Create a full deck
  const createDeck = () => {
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const values = [
      { label: "Ace", num: 1 },
      { label: "2", num: 2 },
      { label: "3", num: 3 },
      { label: "4", num: 4 },
      { label: "5", num: 5 },
      { label: "6", num: 6 },
      { label: "7", num: 7 },
      { label: "8", num: 8 },
      { label: "9", num: 9 },
      { label: "10", num: 10 },
      { label: "Jack", num: 11 },
      { label: "Queen", num: 12 },
      { label: "King", num: 13 },
    ];

    let deck = [];
    for (let s of suits) {
      for (let v of values) {
        deck.push({ suit: s, label: v.label, value: v.num });
      }
    }
    return deck.sort(() => Math.random() - 0.5);
  };

  // State
  const [deck, setDeck] = useState(createDeck());
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState([]);
  const [message, setMessage] = useState("");

  // Draw card
  const drawCard = () => {
    const newDeck = [...deck];
    const card = newDeck.pop();
    setDeck(newDeck);
    return card;
  };

  // Reset everything on ANY wrong answer
  const restart = (customMessage = "") => {
    setDeck(createDeck());
    setRound(1);
    setCards([]);
    setMessage(customMessage);
  };

  // --- ROUND HANDLERS ---

  // ROUND 1 – Red or Black
  const handleRedBlack = (guess) => {
    const card = drawCard();
    setCards([card]);

    const isRed = card.suit === "hearts" || card.suit === "diamonds";
    const actual = isRed ? "red" : "black";

    if (actual !== guess) {
      restart(
        `❌ Wrong! The card was ${card.label} of ${card.suit} (${actual}). Starting over.`
      );
      return;
    }

    setMessage(`✔ Correct! It was ${actual} ${card.label} of ${card.suit}. `);
    setRound(2);
  };

  // ROUND 2 – Higher or Lower
  const handleHigherLower = (guess) => {
    const first = cards[0];
    const next = drawCard();
    setCards([first, next]);

    const correct =
      (guess === "higher" && next.value > first.value) ||
      (guess === "lower" && next.value < first.value);

    if (!correct) {
      restart(`❌ Wrong! It was ${next.label}. Restarting.`);
      return;
    }

    setMessage(`✔ Correct! Drew ${next.label}.`);
    setRound(3);
  };

  // ROUND 3 – Inside or Outside
  const handleInsideOutside = (guess) => {
    const [c1, c2] = cards;
    const next = drawCard();
    setCards([c1, c2, next]);

    const min = Math.min(c1.value, c2.value);
    const max = Math.max(c1.value, c2.value);
    const inside = next.value > min && next.value < max;

    const correct =
      (inside && guess === "inside") || (!inside && guess === "outside");

    if (!correct) {
      restart(`❌ Wrong! It was ${next.label}. Restarting.`);
      return;
    }

    setMessage(`✔ Correct! Drew ${next.label}.`);
    setRound(4);
  };

  // ROUND 4 – Suit Guess
  const handleSuit = (guess) => {
    const next = drawCard();
    setCards([...cards, next]);

    if (next.suit !== guess) {
      restart(
        `❌ Wrong! It was ${next.label} of ${next.suit}. Restarting game.`
      );
      return;
    }
    setMessage('Card: ' + next.label + ' of ' + next.suit + '.');
    setMessage(`🎉 Correct! Finished all 4 rounds!`);
    setRound(5);
  };

  return (
    <div className="game-page">
      <h2>🚌 Ride The Bus</h2>

      <p>{message}</p>
      <p>Round {round}</p>

      {/* ROUND 1 */}
      {round === 1 && (
        <>
          <p>Red or Black?</p>
          <button onClick={() => handleRedBlack("red")}>Red</button>
          <button onClick={() => handleRedBlack("black")}>Black</button>
        </>
      )}

      {/* ROUND 2 */}
      {round === 2 && (
        <>
          <p>Higher or Lower?</p>
          <button onClick={() => handleHigherLower("higher")}>Higher</button>
          <button onClick={() => handleHigherLower("lower")}>Lower</button>
        </>
      )}

      {/* ROUND 3 */}
      {round === 3 && (
        <>
          <p>Inside or Outside?</p>
          <button onClick={() => handleInsideOutside("inside")}>Inside</button>
          <button onClick={() => handleInsideOutside("outside")}>Outside</button>
        </>
      )}

      {/* ROUND 4 */}
      {round === 4 && (
        <>
          <p>Pick a Suit:</p>
          <button onClick={() => handleSuit("hearts")}>Hearts</button>
          <button onClick={() => handleSuit("diamonds")}>Diamonds</button>
          <button onClick={() => handleSuit("clubs")}>Clubs</button>
          <button onClick={() => handleSuit("spades")}>Spades</button>
        </>
      )}

      {/* FINISHED */}
      {round === 5 && (
        <>
          <h3>🎉 You completed all 4 rounds!</h3>
          <button onClick={() => restart("New Game Started!")}>Play Again</button>
        </>
      )}

      <button className="back-button" onClick={() => navigate("/games")}>
        ⬅ Back to Games
      </button>
    </div>
  );
}