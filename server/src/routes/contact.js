const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', verifyAdmin, contactController.getAllContact);
router.get('/slots', contactController.getSlots);
router.get('/availability', contactController.getAvailability);
router.post('/', contactController.createContact);

module.exports = router;
