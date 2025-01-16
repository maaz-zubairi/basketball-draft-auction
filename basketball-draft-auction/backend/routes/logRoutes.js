const express = require("express");
const router = express.Router();
let logs = []; // Temporary in-memory log storage

// Get logs
router.get("/", (req, res) => {
  res.json(logs);
});

// Add a log
router.post("/", (req, res) => {
  const { message } = req.body;
  if (message) {
    logs.push(message);
    return res.status(201).send("Log added.");
  }
  res.status(400).send("Invalid log message.");
});

module.exports = router;
