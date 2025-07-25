const Transaction = require('../models/models');
const { sendToKafka } = require('../services/kafkaproducer');

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
