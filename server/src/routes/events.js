const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');
const { verifyAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEventById);
router.post('/', verifyAdmin, upload.single('flyer'), eventsController.createEvent);
router.put('/:id', verifyAdmin, upload.single('flyer'), eventsController.updateEvent);
router.delete('/:id', verifyAdmin, eventsController.deleteEvent);

module.exports = router;