const Transaction = require("../models/Transaction");
const FraudAlert = require("../models/FraudAlert");

const FRAUD_THRESHOLD = 10000000; 

exports.analyzeTransaction = async (transactionData) => {
  try {
    const tx = JSON.parse(transactionData.value);

    // Temporary fraud detection rule
    const isFraud = tx.amount > FRAUD_THRESHOLD;

    // Update transaction fraud status
    await Transaction.findByIdAndUpdate(tx._id, {
      fraudScore: isFraud ? 0.95 : 0.01, // simulated score
      isFraud,
      status: isFraud ? "blocked" : "approved",
    });

    if (isFraud) {
      // Create fraud alert
      await FraudAlert.create({
        transactionId: tx._id,
        flaggedBy: "model",
        reason: "Amount exceeds 10,000,000",
        actionTaken: "blocked",
      });

      console.log(`🚨 Fraud detected: TX ${tx._id}`);
    } else {
      console.log(`✅ TX ${tx._id} is safe`);
    }

  } catch (err) {
    console.error("Fraud detection failed:", err);
  }
};
