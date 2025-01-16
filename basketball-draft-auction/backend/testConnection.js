const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.MONGO_URI;

const testConnection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.disconnect();
  }
};

testConnection();
