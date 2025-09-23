const passport = require('passport');
const jwt = require('jsonwebtoken');
const User=require('../models/user-model')

const JWT_SECRET = process.env.JWT_SECRET ;

console.log(JWT_SECRET,"JWT_SECRET")
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
    console.log("user",user)

    const token = generateToken(user);
    // ✅ Save token in HttpOnly cookie (not accessible in JS)
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // use https in prod
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    });

    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);

  })(req, res, next);
};

// --- GitHub Auth request ---
const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

// --- GitHub Auth callback ---
const githubCallback = (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user) => {
     console.log("user",user)
    if (err || !user) return res.status(500).json({ error: err?.message || 'Login failed' });

    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    });
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
  })(req, res, next);
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please log in", data: { loggedIn: false } });
    }

    const newUser = await User.create({ email, password }); // Make sure password is hashed in model

    res.status(201).json({
      message: "Registration successful",
      data: {
        loggedIn: true,
        user: { id: newUser._id, email: newUser.email }, // exclude password
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found", data: { loggedIn: false } });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", data: { loggedIn: false } });
    }

    res.json({
      message: "Login successful",
      data: {
        loggedIn: true,
        user: { id: user._id, email: user.email }, // exclude password
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "signup_required",
        message: "User not found",
        redirect:'/signup'
      });
    }

    res.json({
      status: "authenticated",
      message: "User authenticated",
      user,
      redirect: "/dashboard/oauth-success"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

module.exports = {
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
  login,
  authUser,
  register
};
