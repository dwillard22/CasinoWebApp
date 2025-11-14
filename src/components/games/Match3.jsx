import "../../styles/gameScreen.css";

/**
 * Simulate playing a match‑3 style game. The game costs 5 coins to play.
 * A 3×3 board is filled with random fruit symbols; if any row or column
 * consists of identical symbols the player wins 40 coins.
 *
 * @param {object} userProfile – The player's profile, mutated in place.
 * @returns {object} – Board, whether a match occurred, winnings and coins.
 */
function playMatch3(userProfile) {
    const cost = 5;
    if (userProfile.coins < cost) {
        throw new Error("Insufficient coins");
    }
    userProfile.coins -= cost;
    const tiles = ["🍎", "🍇", "🍊", "🍓"];
    const board = [...Array(3)].map(() => {
        return [...Array(3)].map(() => tiles[Math.floor(Math.random() * tiles.length)]);
    });
    // Determine whether a row or column has all equal symbols
    const rowMatch = board.some(row => new Set(row).size === 1);
    const colMatch = board[0].some((_, colIndex) => {
        return new Set(board.map(row => row[colIndex])).size === 1;
    });
    const win = rowMatch || colMatch;
    const winnings = win ? 40 : 0;
    userProfile.coins += winnings;
    return { board, match: win, winnings, coins: userProfile.coins };
}
export default playMatch3; // Added export statement
