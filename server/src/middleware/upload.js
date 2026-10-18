const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

// catches files into memory, not disk — we never write temp files
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB — sermon audio needs more headroom than images
});

// resourceType: 'image' for flyers/cover art, 'video' for audio (Cloudinary treats audio as 'video' resource type)
const streamUpload = (buffer, folder, resourceType = 'image') => {
    return new Promise((resolve, reject) => {
        // chunked upload for anything that isn't a small image — more resilient on slow connections
        const uploadMethod = resourceType === 'video'
            ? cloudinary.uploader.upload_chunked_stream
            : cloudinary.uploader.upload_stream;

        const stream = uploadMethod(
            { folder, resource_type: resourceType, chunk_size: 6000000 }, // 6MB chunks
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

module.exports = { upload, streamUpload };