const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactFormLimiter } = require('../middleware/rateLimiters');

// Apply rate limiting to prevent spam
router.post('/', contactFormLimiter, contactController.submitContactForm);
router.post('/exclusive-inquiry', contactFormLimiter, contactController.sendExclusiveInquiry);

module.exports = router;
