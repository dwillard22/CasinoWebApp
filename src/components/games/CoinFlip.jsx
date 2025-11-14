import "../../styles/gameScreen.css";
/**
 * Simulate a coin flip game. The player bets 5 coins and guesses either
 * "heads" or "tails". If their guess is correct they win 8 coins.
 *
 * @param {object} userProfile – The player's profile, mutated in place.
 * @param {string} guess – Player's guess ("heads" or "tails").
 * @returns {object} – Outcome details including whether they won and coins.
 */
function playCoinflip(userProfile, guess) {
    const stake = 5;
    const normalizedGuess = (guess || "").toLowerCase();
    if (userProfile.coins < stake) {
        throw new Error("Insufficient coins");
    }
    if (!["heads", "tails"].includes(normalizedGuess)) {
        throw new Error("Invalid guess: must be 'heads' or 'tails'");
    }
    userProfile.coins -= stake;
    const outcome = Math.random() < 0.5 ? "heads" : "tails";
    const winnings = normalizedGuess === outcome ? 8 : 0;
    userProfile.coins += winnings;
    return {
        guess: normalizedGuess,
        outcome,
        won: normalizedGuess === outcome,
        winnings,
        coins: userProfile.coins
    };
}
export default playCoinflip;
