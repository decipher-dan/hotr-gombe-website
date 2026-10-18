const pool = require('../config/db');
const { streamUpload } = require('../middleware/upload');

// --- unchanged: getAllSermon, getSermonById ---

const getAllSermon = async (req, res) => {
    try {
        const queryText = await pool.query(`SELECT * FROM sermon`);
        const result = queryText.rows;
        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const getSermonById = async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = await pool.query(`SELECT * FROM sermon WHERE id = $1`, [id]);
        const result = queryText.rows[0];

        if (!result) {
            return res.status(404).json({ error: 'not found' });
        } else {
            return res.status(200).json({
                id: result.id, video: result.video_url, audio: result.audio_url,
                cover_art: result.cover_art, title: result.title,
                description: result.description, preacher: result.preacher,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

// --- new ---

const createSermon = async (req, res) => {
    const { video_url, title, description, preacher, preached_at } = req.body;

    try {
        const coverFile = req.files?.cover_art?.[0];
        const audioFile = req.files?.audio_file?.[0];

        if (!audioFile || !coverFile || !title || !preacher) {
            return res.status(400).json({ error: 'missing required fields' });
        }

        const coverUpload = await streamUpload(coverFile.buffer, 'hotr/sermons/covers', 'image');
        const audioUpload = await streamUpload(audioFile.buffer, 'hotr/sermons/audio', 'video'); // Cloudinary treats audio as 'video' resource type

        const queryText = await pool.query(
            `INSERT INTO sermon(video_url, audio_url, cover_art, title, description, preacher, preached_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [video_url || null, audioUpload.secure_url, coverUpload.secure_url, title, description, preacher, preached_at]
        );

        return res.status(201).json({ result: queryText.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const updateSermon = async (req, res) => {
    const { id } = req.params;
    const { video_url, title, description, preacher, preached_at } = req.body;

    try {
        const existing = await pool.query(`SELECT * FROM sermon WHERE id = $1`, [id]);
        if (!existing.rows[0]) {
            return res.status(404).json({ error: 'not found' });
        }

        let coverArt = existing.rows[0].cover_art;
        let audioUrl = existing.rows[0].audio_url;

        const coverFile = req.files?.cover_art?.[0];
        const audioFile = req.files?.audio_file?.[0];

        if (coverFile) {
            const coverUpload = await streamUpload(coverFile.buffer, 'hotr/sermons/covers', 'image');
            coverArt = coverUpload.secure_url;
        }
        if (audioFile) {
            const audioUpload = await streamUpload(audioFile.buffer, 'hotr/sermons/audio', 'video');
            audioUrl = audioUpload.secure_url;
        }

        const queryText = await pool.query(
            `UPDATE sermon SET video_url = $1, audio_url = $2, cover_art = $3, title = $4, description = $5, preacher = $6, preached_at = $7 WHERE id = $8 RETURNING *`,
            [video_url || null, audioUrl, coverArt, title, description, preacher, preached_at, id]
        );

        return res.status(200).json({ result: queryText.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const deleteSermon = async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = await pool.query(`DELETE FROM sermon WHERE id = $1 RETURNING *`, [id]);
        if (!queryText.rows[0]) {
            return res.status(404).json({ error: 'not found' });
        }
        return res.status(200).json({ message: 'sermon deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

module.exports = { getAllSermon, getSermonById, createSermon, updateSermon, deleteSermon };