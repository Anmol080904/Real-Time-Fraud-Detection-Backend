const express = require("express");
const router = express.Router();

const {
  createTransaction,
  getAllTransactions,
  blockTransaction
} = require('../controllers/transactionController');

router.post('/transaction', createTransaction);
router.get('/transactions', getAllTransactions);

// Block transaction by ID
router.put('/transaction/block/:id', blockTransaction);
