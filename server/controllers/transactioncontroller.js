
const asyncHandler = require('../utils/asyncHandler');
const { sendToKafka } = require('../services/kafkaproducer');
const { Transaction, Fraud } = require('../models/models');

exports.createTransaction = asyncHandler(async (req, res) => {
  const tx = await Transaction.create(req.body);
  
  // Send transaction to Kafka topic for fraud analysis
  await sendToKafka('transactions', tx);

  res.status(201).json(tx);
});

exports.getAllTransactions = asyncHandler(async (req, res) => {
  const txs = await Transaction.find().sort({ createdAt: -1 });
  res.status(200).json(txs);
});

exports.blockTransaction = asyncHandler(async (req, res) => {
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
});
