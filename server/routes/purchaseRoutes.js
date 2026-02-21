const express = require('express');
const router = express.Router();
const {
    submitPurchase,
    getUserPurchases
} = require('../controllers/purchaseController');
const { requireAuth } = require('../middleware/authMiddleware');

// User Routes
router.post('/submit', requireAuth, submitPurchase);
router.get('/user', requireAuth, getUserPurchases);

module.exports = router;
