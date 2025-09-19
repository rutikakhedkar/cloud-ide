const passport = require('passport');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// --- Google Auth request ---
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// --- Google Auth callback ---
const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) return res.status(500).json({ error: err?.message || 'Login failed' });

    const token = generateToken(user);
    // ✅ Save token in HttpOnly cookie (not accessible in JS)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use https in prod
      sameSite: "strict",
      maxAge: 3600000 // 1 hour
    });

    // Redirect back to frontend WITHOUT token in URL
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
    

  })(req, res, next);
};

// --- GitHub Auth request ---
const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

// --- GitHub Auth callback ---
const githubCallback = (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user) => {
    if (err || !user) return res.status(500).json({ error: err?.message || 'Login failed' });

    const token = generateToken(user);   
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 3600000 
    });
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
  })(req, res, next);
};

module.exports = {
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
};
