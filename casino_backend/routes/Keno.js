// casino_backend/routes/keno.js
import { Router } from "express";

const router = Router();

// Same payout table used on the frontend
const PAYOUT_TABLE = {
    0: 0,
    1: 0,
    2: 1,   // break even
    3: 3,
    4: 15,
    5: 50,
};

router.post("/result", async (req, res) => {
    try {
        const userId = req.session?.userId ?? 1;
        const { bet, hits } = req.body;

        if (!bet || bet < 1) {
            return res.status(400).json({ error: "INVALID_BET" });
        }

        if (hits < 0 || hits > 5) {
            return res.status(400).json({ error: "INVALID_HIT_COUNT" });
        }

        // Get user from DB
        let user = await req.db.get(
            "SELECT coins FROM users WHERE id = ?",
            [userId]
        );

        if (!user) {
            // Default new user with 250 coins (same as blackjack)
            await req.db.run("INSERT INTO users (id, coins) VALUES (?, 250)", [userId]);
            user = { coins: 250 };
        }

        let coins = user.coins;

        // Deduct bet at start (same as Blackjack)
        coins -= bet;

        // Determine winnings
        const multiplier = PAYOUT_TABLE[hits] ?? 0;
        const winnings = bet * multiplier;

        // Add winnings back
        coins += winnings;

        // Save updated coins
        await req.db.run(
            "UPDATE users SET coins = ? WHERE id = ?",
            [coins, userId]
        );

        return res.json({ coins, winnings, hits });

    } catch (err) {
        console.error("Keno backend error:", err);
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
});

export default router;
