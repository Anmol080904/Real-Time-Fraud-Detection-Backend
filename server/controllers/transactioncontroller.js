const Transaction = require("../models/Transaction");
const { sendToKafka } = require("../kafka/producer");

exports.createTransaction = async (req, res, next) => {
  try {
    const { amount, merchant, location } = req.body;
    const newTx = new Transaction({
      userId: req.user.id,
      amount,
      merchant,
      location,
    });

    const savedTx = await newTx.save();

    // Send transaction to Kafka for fraud scoring
    await sendToKafka("transactions", savedTx);

    res.status(201).json({ message: "Transaction created and sent to Kafka", data: savedTx });
  } catch (err) {
    next(err);
  }
};

exports.getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ data: transactions });
  } catch (err) {
    next(err);
  }
};
