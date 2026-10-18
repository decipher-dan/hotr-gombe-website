const express = require('express');
const router = express.Router();
const prayerRequestController = require('../controllers/prayerRequest');

router.get('/', prayerRequestController.getAllPrayerRequests);
router.post('/', prayerRequestController.createPrayerRequest);

module.exports = router;