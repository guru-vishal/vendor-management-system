import express from 'express';
import passport from 'passport';
import { getUser, logout } from '../controllers/authController.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/login` }),
  (req, res) => {
    res.redirect(CLIENT_URL);
  }
);

// Get current user
router.get('/user', requireAuth, getUser);

router.get('/session-debug', (req, res) => {
  res.json({
    session: req.session,
    user: req.user,
    isAuthenticated: req.isAuthenticated()
  });
});


// Logout
router.post('/logout', requireAuth, logout);

export default router;