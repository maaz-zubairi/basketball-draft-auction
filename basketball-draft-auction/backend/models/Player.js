const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  contact: { type: String },
  startingPrice: { type: Number, required: true },
  auctioned: { type: Boolean, default: false },
});

module.exports = mongoose.model("Player", playerSchema);
