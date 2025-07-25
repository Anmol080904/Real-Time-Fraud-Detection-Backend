const Transaction = require('../models/models');

exports.updateFraudScore = async (req, res) => {
  const { id } = req.params;
  const { fraudScore, flagged } = req.body;

  try {
    const updated = await Transaction.findByIdAndUpdate(
      id,
      { fraudScore, flagged },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
