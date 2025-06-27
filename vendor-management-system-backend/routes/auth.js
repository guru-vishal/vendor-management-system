import express from "express";
import passport from "passport";
import { getUser, logout } from "../controllers/authController.js";
import requireAuth from "../middleware/auth.js";
import { generateToken } from "../utils/jwt.js";

const router = express.Router();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${CLIENT_URL}/auth/success?token=${token}`);
  }
);

// Get current user
router.get("/user", requireAuth, getUser);

// Logout
router.post("/logout", requireAuth, logout);

export default router;
