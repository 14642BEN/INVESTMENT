// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Use environment variable for MongoDB URI
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI is not defined in environment variables");
  process.exit(1);
}

// ✅ Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// ✅ Investment API route
app.get("/api/investments", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Bronze Package",
      price: 50,
      description: "Starter investment package",
    },
    {
      id: 2,
      name: "Silver Package",
      price: 100,
      description: "Intermediate investment package",
    },
    {
      id: 3,
      name: "Gold Package",
      price: 500,
      description: "Premium investment package",
    },
  ]);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
