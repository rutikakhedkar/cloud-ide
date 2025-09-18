const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello from Express + Mongoose!");
});

// Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
