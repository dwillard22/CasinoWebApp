import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Kick off Google login
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirects back here
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/', // back to login on failure
    session: true
  }),
  (req, res) => {
    // On success, redirect to games page on frontend
    res.redirect('http://localhost:5173/games');
  }
);

// Logout
router.post('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({ ok: true });
    });
  });
});

export default router;
