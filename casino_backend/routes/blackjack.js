// casino_backend/routes/blackjack.js
import { Router } from 'express';

const router = Router();

router.post("/result", async (req, res) => {
    try {
        const userId = req.session?.userId ?? 1;
        const { bet, outcome } = req.body;

        if (!bet || bet < 1) {
            return res.status(400).json({ error: "INVALID_BET" });
        }

        // Get user coins
        let user = await req.db.get(
            "SELECT coins FROM users WHERE id = ?",
            [userId]
        );

        if (!user) {
            await req.db.run("INSERT INTO users (id, coins) VALUES (?, 250)", [userId]);
            user = { coins: 250 };
        }

        let coins = user.coins;

        // Deduct bet at start of round
        coins -= bet;

        // Apply outcome payouts
        if (outcome === "blackjack") {
            coins += Math.floor(bet * 2.5);
        } else if (outcome === "win") {
            coins += bet * 2;
        } else if (outcome === "push") {
            coins += bet; // refund
        }

        // Update DB
        await req.db.run(
            "UPDATE users SET coins = ? WHERE id = ?",
            [coins, userId]
        );

        return res.json({ coins });

    } catch (err) {
        console.error("Blackjack backend error:", err);
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
});

export default router;
