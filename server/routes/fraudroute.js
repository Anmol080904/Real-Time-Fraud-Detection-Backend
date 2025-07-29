const express = require('express');
const router = express.Router();
const { updateFraudScore } = require('../controllers/fraudcontroller');
const { verifyToken } = require('../middleware/authmiddleware');

router.post('/analyze', verifyToken, updateFraudScore);

module.exports = router;
