const express = require('express');
const Auction = require('../models/Auction');
const Player = require('../models/Player');
const Captain = require('../models/Captain');
const router = express.Router();

// Start a new auction
router.post('/start', async (req, res) => {
  try {
    const { playerId } = req.body;

    // Ensure the player exists and is not already auctioned
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ error: 'Player not found' });
    if (player.auctioned) return res.status(400).json({ error: 'Player already auctioned' });

    const auction = new Auction({ player: playerId });
    await auction.save();

    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start auction' });
  }
});

// Update the auction with the latest bid
router.put('/bid', async (req, res) => {
  try {
    const { auctionId, captainId, bidAmount } = req.body;

    const auction = await Auction.findById(auctionId);
    if (!auction) return res.status(404).json({ error: 'Auction not found' });

    // Ensure the bid is higher than the current bid
    if (bidAmount <= auction.currentBid)
      return res.status(400).json({ error: 'Bid must be higher than the current bid' });

    const captain = await Captain.findById(captainId);
    if (!captain) return res.status(404).json({ error: 'Captain not found' });

    // Ensure the captain has enough budget
    if (captain.budget < bidAmount)
      return res.status(400).json({ error: 'Insufficient budget' });

    // Update auction details
    auction.currentBid = bidAmount;
    auction.currentCaptain = captainId;
    await auction.save();

    res.json(auction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place bid' });
  }
});

// End the auction and assign the player to the winning captain
router.post('/end', async (req, res) => {
  try {
    const { auctionId } = req.body;

    const auction = await Auction.findById(auctionId).populate('player').populate('currentCaptain');
    if (!auction) return res.status(404).json({ error: 'Auction not found' });

    // Assign the player to the winning captain
    if (auction.currentCaptain) {
      const captain = await Captain.findById(auction.currentCaptain);
      captain.team.push(auction.player);
      captain.budget -= auction.currentBid;
      await captain.save();

      const player = await Player.findById(auction.player);
      player.auctioned = true;
      player.team = captain.name;
      await player.save();
    }

    // Remove the auction entry
    await Auction.findByIdAndDelete(auctionId);

    res.json({ message: 'Auction ended successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to end auction' });
  }
});

// Get all ongoing auctions
router.get('/ongoing', async (req, res) => {
  try {
    const auctions = await Auction.find().populate('player').populate('currentCaptain');
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ongoing auctions' });
  }
});

module.exports = router;
