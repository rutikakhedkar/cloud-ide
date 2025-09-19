const express = require("express");
const mongoose = require("mongoose");
const authRouter=require('./routers/auth-routes')
require("dotenv").config();
const passport= require('./config/passport')
const cors=require('cors')


const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(passport.initialize());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.use('/auth',authRouter)
// Sample Route
app.get("/", (req, res) => {
  res.send("Hello from Express + Mongoose!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
