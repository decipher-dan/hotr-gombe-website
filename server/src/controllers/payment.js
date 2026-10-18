const pool = require('../config/db');

const createPayment = async (req, res) => {
    // ...unchanged, your existing createPayment stays exactly as is
};

const getAllPayments = async (req, res) => {
    try {
        // joins partnership so the admin sees who paid, not just a bare partnership_id
        const queryText = await pool.query(`
            SELECT payments.*, partnership.full_name, partnership.email
            FROM payments
            JOIN partnership ON payments.partnership_id = partnership.id
            ORDER BY payments.created_at DESC
        `);
        return res.status(200).json({ result: queryText.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
        const queryText = await pool.query(`SELECT * FROM payments WHERE id = $1`, [id]);
        const result = queryText.rows[0];
        if (!result) {
            return res.status(404).json({ error: 'not found' });
        }
        return res.status(200).json({ result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

module.exports = { createPayment, getAllPayments, getPaymentById };