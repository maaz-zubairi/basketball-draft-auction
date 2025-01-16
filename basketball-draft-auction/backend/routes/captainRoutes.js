const express = require("express");
const router = express.Router();
const Captain = require("../models/Captain");

// Get all captains
router.get("/", async (req, res) => {
  try {
    const captains = await Captain.find();
    res.status(200).json(captains);
  } catch (error) {
    res.status(500).json({ message: "Error fetching captains", error });
  }
});

// Deduct budget from a captain
router.post("/:id/deduct-budget", async (req, res) => {
  const { id } = req.params; // Captain ID
  const { amount } = req.body; // Amount to deduct

  try {
    const captain = await Captain.findById(id);
    if (!captain) return res.status(404).json({ message: "Captain not found" });

    if (captain.budget < amount) {
      return res.status(400).json({ message: "Insufficient budget for this bid" });
    }

    captain.budget -= amount;
    await captain.save();

    res.status(200).json({ message: "Budget deducted successfully", captain });
  } catch (error) {
    res.status(500).json({ message: "Error deducting budget", error });
  }
});

// Add a new captain
router.post("/", async (req, res) => {
  try {
    const captain = new Captain(req.body);
    await captain.save();
    res.status(201).json({ message: "Captain added successfully", captain });
  } catch (error) {
    res.status(500).json({ message: "Error adding captain", error });
  }
});

// Update a captain's details
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const captain = await Captain.findByIdAndUpdate(id, req.body, { new: true });
    if (!captain) return res.status(404).json({ message: "Captain not found" });
    res.status(200).json({ message: "Captain updated successfully", captain });
  } catch (error) {
    res.status(500).json({ message: "Error updating captain", error });
  }
});

// Update captain's budget or initialBudget
router.put("/:id/budget", async (req, res) => {
  const { id } = req.params;
  const { budget, initialBudget } = req.body;

  try {
    const captain = await Captain.findById(id);
    if (!captain) return res.status(404).json({ message: "Captain not found" });

    if (budget !== undefined) captain.budget = budget;
    if (initialBudget !== undefined) captain.initialBudget = initialBudget;

    await captain.save();

    res.status(200).json({ message: "Captain budget updated successfully", captain });
  } catch (error) {
    res.status(500).json({ message: "Error updating captain budget", error });
  }
});

module.exports = router;
