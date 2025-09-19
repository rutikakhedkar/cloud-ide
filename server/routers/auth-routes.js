const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');
const authMiddleware=require('../middlewares/auth-middleware')

// Google Auth
router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleCallback);

// GitHub Auth
router.get("/github", authController.githubAuth);
router.get("/github/callback",authController.githubCallback);

router.get('/authcheck', authMiddleware, (req, res) => {
  res.send({ message: "Authentication successful" });
});


module.exports = router;
