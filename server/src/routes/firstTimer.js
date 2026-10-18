const express = require('express');
const router = express.Router();
const firstTimerController = require('../controllers/firstTimer');
const { verifyAdmin } = require('../middleware/auth');

router.get('/', verifyAdmin, firstTimerController.getAllFirstTimer);
router.get('/:id', verifyAdmin, firstTimerController.getFirstTimerById);
router.post('/', firstTimerController.createFirstTimer);

module.exports = router;