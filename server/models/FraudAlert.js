'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FraudAlert extends Model {
    static associate(models) {
      FraudAlert.belongsTo(models.Transaction, {
        foreignKey: 'transactionId',
        as: 'transaction',
        onDelete: 'CASCADE'
      });
    }
  }

  FraudAlert.init({
    transactionId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    score: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'FraudAlert',
  });

  return FraudAlert;
};
