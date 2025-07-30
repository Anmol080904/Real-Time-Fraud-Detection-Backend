const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  merchant: String,
  location: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "approved", "blocked"], default: "pending" },
  fraudScore: { type: Number, default: 0.0 },
  isFraud: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transSchema);
