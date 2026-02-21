const express = require('express');
const router = express.Router();
const {
    submitPurchase,
    getUserPurchases,
    getAllPurchases,
    updatePurchaseStatus
} = require('../controllers/purchaseController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// User Routes
router.post('/submit', requireAuth, submitPurchase);
router.get('/user', requireAuth, getUserPurchases);

// Admin Routes
router.get('/admin/all', requireAdmin, getAllPurchases);
router.put('/admin/status', requireAdmin, updatePurchaseStatus);

module.exports = router;
