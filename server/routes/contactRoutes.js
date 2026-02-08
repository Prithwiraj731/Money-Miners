const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.submitContactForm);
router.post('/exclusive-inquiry', contactController.sendExclusiveInquiry);

module.exports = router;
