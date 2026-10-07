const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermon');


router.get('/', sermonController.getAllSermon);
router.get('/:id', sermonController.getSermonById);
router.post('/', sermonController.createSermon);




module.exports = router;
