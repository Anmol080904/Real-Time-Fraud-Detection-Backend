'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      });
      Transaction.hasOne(models.FraudAlert, {
        foreignKey: 'transactionId',
        as: 'fraudAlert',
        onDelete: 'CASCADE'
      });
    }
  }

  Transaction.init({
    userId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
    isFraud: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Transaction',
  });

  return Transaction;
};
