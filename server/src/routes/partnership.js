const express = require('express');
const router = express.Router();
const partnershipController = require('../controllers/partnership');

router.get('/', partnershipController.getAllPartners);
router.get('/:id', partnershipController.getPartnersById);
router.post('/', partnershipController.createPartnership);



module.exports = router;