const { Transaction } = require("../models");
const { FraudAlert } = require("../models");

const FRAUD_THRESHOLD = 10000000;

exports.analyzeTransaction = async (transactionData) => {
  try {
    const tx = JSON.parse(transactionData.value);

    const isFraud = tx.amount > FRAUD_THRESHOLD;

    // Update transaction
    await Transaction.update(
      {
        fraudScore: isFraud ? 0.95 : 0.01,
        isFraud,
        status: isFraud ? "blocked" : "approved",
      },
      { where: { id: tx.id } }
    );

    if (isFraud) {
      await FraudAlert.create({
        transactionId: tx.id,
        flaggedBy: "model",
        reason: "Amount exceeds 10,000,000",
        actionTaken: "blocked",
      });

      console.log(`🚨 Fraud detected: TX ${tx.id}`);
    } else {
      console.log(`✅ TX ${tx.id} is safe`);
    }
  } catch (err) {
    console.error("Fraud detection failed:", err);
  }
};
