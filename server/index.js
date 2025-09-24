const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter=require('./routers/auth-routes')
const workspaceRouter=require('./routers/workspace-routes')
const passport= require('./config/passport')
const cors=require('cors')
const cookieParser=require("cookie-parser");



const app = express();
app.use(passport.initialize());
// Middleware
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,               // allow cookies to be sent
}));
app.use(cookieParser());;


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use('/auth',authRouter)
app.use('/workspace',workspaceRouter)
// Sample Route
app.get("/", (req, res) => {
  res.send("Hello from Express + Mongoose!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
