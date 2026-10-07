const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');


router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEventById);
router.post('/', eventsController.createEvent);



module.exports = router;