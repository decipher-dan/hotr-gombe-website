const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/partnership');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', verifyAdmin, partnershipController.getAllPartners);
router.get('/:id', verifyAdmin, partnershipController.getPartnersById);
router.post('/', partnershipController.createPartnership);

module.exports = router;