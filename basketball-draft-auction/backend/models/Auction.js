const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: "Captain", required: true },
  bidAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "won", "cancelled"], default: "pending" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Auction", auctionSchema);
