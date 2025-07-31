const { Transaction } = require("../models");
const { sendToKafka } = require("../../broker/producer");

exports.createTransaction = async (req, res, next) => {
  try {
    const { amount, merchant, location } = req.body;

    const newTx = await Transaction.create({
      userId: req.user.id,
      amount,
      merchant,
      location,
    });

    await sendToKafka("transactions", newTx);

    res.status(201).json({ message: "Transaction created and sent to Kafka", data: newTx });
  } catch (err) {
    next(err);
  }
};
exports.getUserTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.json({ data: transactions });
  } catch (err) {
    next(err);
  }
};