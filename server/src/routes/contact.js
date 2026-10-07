const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');


router.get('/', contactController.getAllContact);
router.get('/slots', contactController.getSlots);
router.get('/availability', contactController.getAvailability);
router.post('/', contactController.createContact);





module.exports = router;
