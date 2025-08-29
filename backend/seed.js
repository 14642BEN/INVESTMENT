const mongoose = require("mongoose");
require("dotenv").config();

const Investment = require("./models/Investment");

const uri = process.env.MONGO_URI;

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected for seeding");

    // Clear old data
    await Investment.deleteMany();

    // Insert new investments
    await Investment.insertMany([
      {
        name: "Bronze Package",
        price: 5000,
        description: "Starter investment package"
      },
      {
        name: "Silver Package",
        price: 10000,
        description: "Intermediate investment package"
      },
      {
        name: "Gold Package",
        price: 25000,
        description: "Premium investment package"
      }
    ]);

    console.log("✅ Investments seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
