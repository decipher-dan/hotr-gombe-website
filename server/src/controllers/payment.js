const pool = require('../config/db')


const createPayment = async (req, res) => {
    const { partnership_id, payment_type, payment_status, amount } = req.body;
    try {
        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({error: 'amount must be a valid number greater than 0'});
        }else if ( !partnership_id || !payment_type || !payment_status ) {
            return res.status(400).json({error: 'missing required fields'});
        } else {
            const queryText = await pool.query(`INSERT INTO payments(partnership_id, payment_type, payment_status, amount) VALUES( $1, $2, $3, $4 ) RETURNING *`, [ partnership_id, payment_type, payment_status, amount ]);

            const result = queryText.rows[0];

            return res.status(201).json({partnership_id: result.partnership_id, payment_type: result.payment_type, payment_status: result.payment_status, amount: result.amount});
        }
        
    } catch (error) {
        if (error.code === '23503') {
            console.error(error);
            return res.status(404).json({error: 'foreign key violation'})
        } else {
            console.error(error);
            return res.status(500).json({error: 'server error'});
        }
    }
}



module.exports = { createPayment };