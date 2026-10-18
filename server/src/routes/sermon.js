const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermon');
const { verifyAdmin } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const sermonFiles = upload.fields([
    { name: 'cover_art', maxCount: 1 },
    { name: 'audio_file', maxCount: 1 },
]);

router.get('/', sermonController.getAllSermon);
router.get('/:id', sermonController.getSermonById);
router.post('/', verifyAdmin, sermonFiles, sermonController.createSermon);
router.put('/:id', verifyAdmin, sermonFiles, sermonController.updateSermon);
router.delete('/:id', verifyAdmin, sermonController.deleteSermon);

module.exports = router;