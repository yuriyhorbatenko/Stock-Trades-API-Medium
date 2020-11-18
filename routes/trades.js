const express = require('express');
const router = express.Router();

const db = require('../controllers/trades');

router.post('/', db.createTrade);

router.get('/:id', db.getTradeId)

router.get('/', db.getAllTrades)

module.exports = router;
