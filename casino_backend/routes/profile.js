// casino_backend/routes/profile.js
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    try {
        const userId = req.session?.userId ?? 1;

        // Look up the user
        let user = await req.db.get(
            'SELECT id, username, email, coins FROM users WHERE id = ?',
            [userId]
        );

        // If user does not exist → create them automatically
        if (!user) {
            await req.db.run(
                'INSERT INTO users (id, coins) VALUES (?, ?)',
                [userId, 250]
            );

            user = {
                id: userId,
                username: null,
                email: null,
                coins: 250
            };
        }

        return res.json(user);

    } catch (err) {
        console.error("PROFILE ROUTE ERROR:", err);
        return res.status(500).json({ error: "SERVER_ERROR" });
    }
});

export default router;
