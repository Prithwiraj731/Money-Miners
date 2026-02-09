const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { requireAuth } = require('../middleware/authMiddleware');

// All cart routes require authentication
router.post('/add', requireAuth, cartController.addToCart);
router.get('/', requireAuth, cartController.getCart);
router.delete('/:courseId', requireAuth, cartController.removeFromCart);

module.exports = router;
