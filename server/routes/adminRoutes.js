const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminController');
const { getAllPurchases, updatePurchaseStatus } = require('../controllers/purchaseController');
const { adminLoginLimiter } = require('../middleware/rateLimiters');
const { requireAdmin } = require('../middleware/authMiddleware');

// Admin Auth
router.post('/login', adminLoginLimiter, login);

// Purchase Management (Admin)
router.get('/purchases/all', requireAdmin, getAllPurchases);
router.put('/purchases/status', requireAdmin, updatePurchaseStatus);

module.exports = router;
