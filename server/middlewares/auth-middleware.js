const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Requires cookie-parser
    if (!token) {
      return res.status(401).json({
        status: "unauthenticated",
        message: "No token provided",
        redirect: "/signup"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.log("Invalid or expired token");
    return res.status(401).json({
      status: "unauthenticated",
      message: "Token invalid or expired",
      redirect:"/login"
    });
  }
};

module.exports = authMiddleware;
