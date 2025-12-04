//This route handles the backend logic for the Slots game
import { Router } from 'express';
const router = Router();
const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];

router.post('/spin', async (req, res) => {
    const userId = req.session.userId ?? 1;
    // random spin
    const result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];
    // check for win
    const allEqual = result.every(sym => sym === result[0]);
    const payout = allEqual ? (result[0] === '7' ? 50 : 20) : 0;
    // update coins: deduct one coin per spin, add payout
    const user = await req.db.get('SELECT coins FROM users WHERE id = ?', [userId]);
    const newCoins = (user?.coins ?? 0) - 1 + payout;
    await req.db.run('UPDATE users SET coins = ? WHERE id = ?', [newCoins, userId]);
    // record result
    await req.db.run(
        'INSERT INTO game_results (user_id, game, score) VALUES (?, ?, ?)',
        [userId, 'slots', payout]
    );
    res.json({ result, payout, coins: newCoins });
});

export default router;
