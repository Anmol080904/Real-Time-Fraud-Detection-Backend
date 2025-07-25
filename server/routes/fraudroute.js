const express = require('express');
const router = express.Router();
const { analyzeTransaction } = require('../controllers/fraudcontroller');
const { verifyToken } = require('../middleware/authmiddleware');

router.post('/analyze', verifyToken, analyzeTransaction);

module.exports = router;
