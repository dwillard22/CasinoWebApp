// backend/routes/slots.js
import { Router } from 'express';

const router = Router();
const symbols = ['🍒', '🍋', '🔔', '⭐', '7'];
const STARTING_COINS = 250;
const SPIN_COST = 1;
const JACKPOT_PAYOUT = 50;  // triple 7s
const TRIPLE_PAYOUT = 20;   // any other triple

router.post('/spin', async (req, res) => {
    try {
        // Use real session user if available; fallback to demo user 1 for now
        const userId = req.session?.userId ?? 1;

        // 1) Get or initialize user coins
        let user = await req.db.get(
            'SELECT coins FROM users WHERE id = ?',
            [userId]
        );

        // If user row doesn't exist, create one with starting coins
        if (!user) {
            await req.db.run(
                'INSERT INTO users (id, coins) VALUES (?, ?)',
                [userId, STARTING_COINS]
            );
            user = { coins: STARTING_COINS };
        }

        let currentCoins = user.coins ?? 0;

        // 2) If user has no coins, don't spin – front end can show "no coins" message
        if (currentCoins < SPIN_COST) {
            return res.status(400).json({
                result: null,
                payout: 0,
                coins: currentCoins,
                error: 'NO_COINS',
            });
        }

        // 3) Generate random spin (3 symbols)
        const result = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
        ];

        // 4) Compute payout to match JSX logic (triple-based)
        const allEqual = result.every(sym => sym === result[0]);

        let payout = 0;
        if (allEqual && result[0] === '7') {
            // Triple 7s => JACKPOT
            payout = JACKPOT_PAYOUT;
        } else if (allEqual) {
            // Any other triple
            payout = TRIPLE_PAYOUT;
        } else {
            // Pairs and everything else: message handled in JSX, payout 0
            payout = 0;
        }

        // 5) Apply spin cost and payout
        const newCoins = currentCoins - SPIN_COST + payout;

        await req.db.run(
            'UPDATE users SET coins = ? WHERE id = ?',
            [newCoins, userId]
        );

        // 6) Record result for history/analytics
        await req.db.run(
            'INSERT INTO game_results (user_id, game, score) VALUES (?, ?, ?)',
            [userId, 'slots', payout]
        );

        // 7) Respond in the exact shape the JSX expects:
        //    result: ['🍒','🍒','🍒'], payout: number, coins: updated total
        return res.json({
            result,
            payout,
            coins: newCoins,
        });
    } catch (err) {
        console.error('Error in /api/slots/spin:', err);
        return res.status(500).json({
            result: null,
            payout: 0,
            coins: null,
            error: 'SERVER_ERROR',
        });
    }
});

export default router;
