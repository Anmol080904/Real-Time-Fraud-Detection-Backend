const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const FraudAlert = require("../models/FraudAlert");

// GET all fraud alerts (admin only)
router.get("/", auth, async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const alerts = await FraudAlert.find().populate("transactionId reviewedBy");
    res.json({ data: alerts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
