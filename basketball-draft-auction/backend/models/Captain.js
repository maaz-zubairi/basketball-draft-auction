const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  budget: { type: Number, required: true },
  players: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
      price: { type: Number, required: true }, // Add the price field
    },
  ],
});

module.exports = mongoose.model("Captain", captainSchema, "captains");
