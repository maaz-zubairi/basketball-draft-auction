const express = require("express");
const router = express.Router();
const Captain = require("../models/Captain");
const Player = require("../models/Player");

// Get a captain's team
router.get("/:captainId/team", async (req, res) => {
  try {
    const captain = await Captain.findById(req.params.captainId).populate("team");
    if (!captain) return res.status(404).json({ error: "Captain not found" });
    res.json(captain.team);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team" });
  }
});

module.exports = router;
