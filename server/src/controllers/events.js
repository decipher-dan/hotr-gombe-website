const pool = require('../config/db');
const { streamUpload } = require('../middleware/upload');

// --- unchanged: getAllEvents, getEventById ---

const getAllEvents = async (req, res) => {
    try {
        const queryText = await pool.query(`SELECT * FROM events`);
        const result = queryText.rows;
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
        const result = queryText.rows[0];

        if (!result) {
            return res.status(404).json({ error: 'not found' });
        } else {
            return res.status(200).json({
                id: result.id, title: result.title, flyer: result.flyer,
                description: result.description, start: result.start_date,
                end: result.end_date, time: result.event_time, venue: result.venue,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

// --- new ---

const createEvent = async (req, res) => {
    const { title, description, start_date, end_date, event_time, venue } = req.body;

    try {
        if (!req.file || !title || !start_date || !venue) {
            return res.status(400).json({ error: 'missing required fields' });
        }

        const uploadResult = await streamUpload(req.file.buffer, 'hotr/events', 'image');
        const flyer = uploadResult.secure_url;

        const queryText = await pool.query(
            `INSERT INTO events(flyer, title, description, start_date, end_date, event_time, venue) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [flyer, title, description, start_date, end_date || null, event_time || null, venue]
        );

        return res.status(201).json({ result: queryText.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'something went wrong' });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, start_date, end_date, event_time, venue } = req.body;

    try {
        const existing = await pool.query(`SELECT * FROM events WHERE id = $1`, [id]);
        if (!existing.rows[0]) {
            return res.status(404).json({ error: 'not found' });
        }

        let flyer = existing.rows[0].flyer;
        if (req.file) {
            const uploadResult = await streamUpload(req.file.buffer, 'hotr/events', 'image');
            flyer = uploadResult.secure_url;
        }

        const queryText = await pool.query(
            `UPDATE events SET flyer = $1, title = $2, description = $3, start_date = $4, end_date = $5, event_time = $6, venue = $7 WHERE id = $8 RETURNING *`,
            [flyer, title, description, start_date, end_date || null, event_time || null, venue, id]
        );

        return res.status(200).json({ result: queryText.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = await pool.query(`DELETE FROM events WHERE id = $1 RETURNING *`, [id]);
        if (!queryText.rows[0]) {
            return res.status(404).json({ error: 'not found' });
        }
        return res.status(200).json({ message: 'event deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };