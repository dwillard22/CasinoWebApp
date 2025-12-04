//This route handles user profile retrieval
import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
    // uses session user or defaults to id=1
    const userId = req.session.userId ?? 1;
    const user = await req.db.get(
        'SELECT id, username, email, coins FROM users WHERE id = ?', [userId]
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

export default router;
