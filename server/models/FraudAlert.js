const mongoose = require("mongoose");

const fraudAlertSchema = new mongoose.Schema({
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  flaggedBy: { type: String, enum: ["model", "admin"], default: "model" },
  reason: String,
  actionTaken: { type: String, enum: ["blocked", "investigating", "allowed"], default: "investigating" },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("FraudAlert", fraudAlertSchema);
