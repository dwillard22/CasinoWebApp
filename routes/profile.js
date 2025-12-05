//This route handles user profile retrieval and creation.

import { Router } from 'express';
const router = Router();

// existing GET / handler …
router.get('/', async (req, res) => {
    const userId = req.session.userId ?? 1;
    const user = await req.db.get(
        'SELECT id, username, email, coins FROM users WHERE id = ?',
        [userId]
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

// NEW: create a profile
router.post('/', async (req, res) => {
    const { username, email } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    // insert user into the DB with starting coins (250)
    const result = await req.db.run(
        'INSERT INTO users (username, email, coins) VALUES (?, ?, 250)',
        [username, email]
    );
    const newUser = await req.db.get(
        'SELECT id, username, email, coins FROM users WHERE id = ?',
        [result.lastID]
    );
    // store new user ID in session
    req.session.userId = newUser.id;
    return res.status(201).json(newUser);
});

export default router;

