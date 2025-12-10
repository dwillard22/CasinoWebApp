// routes/slots.js

//This file handles the backend logic for the Slots game
import { Router } from 'express';
const router = Router();
const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];

router.post('/spin', async (req, res) => {
    const userId = req.session.userId ?? 1;
    const bet = parseInt(req.body.bet, 10) || 1; // default to 1 if not provided
    if (bet <= 0) return res.status(400).json({ error: 'Invalid bet amount' });

    // fetch current coins
    const user = await req.db.get('SELECT coins FROM users WHERE id = ?', [userId]);
    const currentCoins = user?.coins ?? 0;
    if (currentCoins < bet) {
        return res
            .status(400)
            .json({ error: 'Not enough coins', coins: currentCoins });
    }

    // perform spin
    const result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
    ];
    const allEqual = result.every((sym) => sym === result[0]);
    // base payout: 50 for 7s, 20 for other triples, 0 otherwise
    const basePayout = allEqual ? (result[0] === '7' ? 50 : 20) : 0;
    const payout = basePayout * bet; // scale with bet

    const newCoins = currentCoins - bet + payout;
    await req.db.run('UPDATE users SET coins = ? WHERE id = ?', [newCoins, userId]);
    await req.db.run(
        'INSERT INTO game_results (user_id, game, score) VALUES (?, ?, ?)',
        [userId, 'slots', payout]
    );

    res.json({ result, payout, coins: newCoins });
});

export default router;
