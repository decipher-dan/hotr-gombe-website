const express = require('express');
const router = express.Router();
const firstTimerController = require('../controllers/firstTimer');


router.post('/', firstTimerController.createFirstTimer);



module.exports = router;