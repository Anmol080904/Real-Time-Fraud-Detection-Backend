const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const {
  createTransaction,
  getUserTransactions
} = require("../controllers/transactionController");

router.post("/", auth, createTransaction);
router.get("/", auth, getUserTransactions);

module.exports = router;
