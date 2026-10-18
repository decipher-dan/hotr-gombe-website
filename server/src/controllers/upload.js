const { upload, streamUpload } = require('../middleware/upload');

// route: router.post('/', verifyAdmin, upload.single('flyer'), eventsController.createEvent);

const createEvent = async (req, res) => {
    try {
        let flyerUrl = null;
        if (req.file) {
            const result = await streamUpload(req.file.buffer, 'hotr/events', 'image');
            flyerUrl = result.secure_url;
        }
        // ...insert into DB using flyerUrl
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};