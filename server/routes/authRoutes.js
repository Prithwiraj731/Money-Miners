const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
    authLoginLimiter,
    authOtpLimiter,
    authRegisterLimiter
} = require('../middleware/rateLimiters');

// Apply specific rate limiters to each auth endpoint
router.post('/send-otp', authOtpLimiter, authController.sendOtp);
router.post('/register', authRegisterLimiter, authController.register);
router.post('/login', authLoginLimiter, authController.login);

module.exports = router;
