import "../../styles/gameScreen.css";

/**
 * Simulate playing a slot machine. The game costs 10 coins to play. If
 * all three randomly chosen symbols match the player wins 50 coins; if
 * two symbols match they win 20 coins; otherwise they win nothing.
 * @param {object} userProfile – The player's profile, mutated in place.
 * @returns {object} – Result containing the symbols, winnings and updated coin count.
 */
function playSlots(userProfile) {
  const cost = 10;
  if (userProfile.coins < cost) {
    throw new Error("Insufficient coins to play");
  }
  userProfile.coins -= cost;
  const symbols = ["🍒", "🔔", "7️⃣", "🍋"];
  const result = Array.from({ length: 3 }, () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  });
  let winnings = 0;
  const unique = new Set(result).size;
  if (unique === 1) {
    winnings = 50;
  } else if (unique === 2) {
    winnings = 20;
  }
  userProfile.coins += winnings;
  return { result, winnings, coins: userProfile.coins };
}

export default playSlots;
