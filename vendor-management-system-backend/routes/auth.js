import express from 'express';
import passport from 'passport';
import { getUser, logout } from '../controllers/authController.js';
import requireAuth from '../middleware/auth.js';

const router = express.Router();

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login` }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// Get current user
router.get('/user', requireAuth, getUser);

// Logout
router.post('/logout', requireAuth, logout);

export default router;