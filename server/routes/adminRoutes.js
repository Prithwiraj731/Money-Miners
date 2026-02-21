const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminController');
const { adminLoginLimiter } = require('../middleware/rateLimiters');

// POST /api/admin/login - Protected with strict rate limiting
router.post('/login', adminLoginLimiter, login);

module.exports = router;
