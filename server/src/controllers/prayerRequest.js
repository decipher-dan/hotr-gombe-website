const pool = require('../config/db');

const createPrayerRequest = async (req, res) => {
    const { name, phone_number, message } = req.body;

    try {
        if (!message) {
            return res.status(400).json({ error: 'message is required' });
        }

        const queryText = await pool.query(
            `INSERT INTO prayer_requests(name, phone_number, message) VALUES($1, $2, $3) RETURNING *`,
            [name || null, phone_number || null, message]
        );

        const result = queryText.rows[0];
        return res.status(201).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const getAllPrayerRequests = async (req, res) => {
    try {
        const queryText = await pool.query(`SELECT * FROM prayer_requests ORDER BY created_at DESC`);
        return res.status(200).json({ result: queryText.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

module.exports = { createPrayerRequest, getAllPrayerRequests };