
const { sendToKafka } = require('../services/kafkaproducer');
// controllers/transactionController.js
const { Transaction, Fraud } = require('../models/models');

exports.createTransaction = async (req, res) => {
  try {
    const tx = await Transaction.create(req.body);
    
    // Send transaction to Kafka topic for fraud analysis
    await sendToKafka('transactions', tx);

    res.status(201).json(tx);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(txs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.blockTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason = "Suspicious activity", flaggedBy = "admin", reviewedBy } = req.body;

    // Update the transaction
    const updatedTx = await Transaction.findByIdAndUpdate(
      id,
      { status: "blocked", isFraud: true, fraudScore: 1.0 },
      { new: true }
    );

    if (!updatedTx) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Create a fraud alert record
    const fraudRecord = await Fraud.create({
      transactionId: updatedTx._id,
      flaggedBy,
      reason,
      actionTaken: "blocked",
      reviewedBy
    });

    res.status(200).json({ message: "Transaction blocked and flagged", transaction: updatedTx, fraudRecord });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
