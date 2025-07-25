const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactioncontroller");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/", authMiddleware, transactionController.createTransaction);

router.get("/", authMiddleware, transactionController.getAllTransactions);

router.get("/:id", authMiddleware, transactionController.getTransactionById);

router.put("/:id/block", authMiddleware, transactionController.blockTransaction);

router.get("/user/:userId", authMiddleware, transactionController.getTransactionsByUser);

module.exports = router;
