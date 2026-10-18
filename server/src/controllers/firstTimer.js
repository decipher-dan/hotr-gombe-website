const pool = require('../config/db')


const createFirstTimer = async (req, res) => {
    const {name, phone_number, address, email, reached_out, sex, joining_church} = req.body;
    try {
        if ( !name || !phone_number || !address || !email || !reached_out || !sex || !joining_church ) {
            return res.status(400).json({error: 'missing required fields'})
        } else {
            const queryText = await pool.query(`INSERT INTO first_timer(name, phone_number, address, email, reached_out, sex, joining_church) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [name, phone_number, address, email, reached_out, sex, joining_church]);

            const result = queryText.rows[0];

            return res.status(201).json({name: result.name, phoneNumber: result.phone_number, address: result.address, email: result.email, reachedOut: result.reached_out, sex: result.sex, joinChurch: result.joining_church});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'})
    }
}

const getAllFirstTimer = async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM first_timer ORDER BY created_at DESC'
        );
        return res.status(200).json({ result: result.rows });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

const getFirstTimerById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT * FROM first_timer WHERE id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'not found' });
        }
        return res.status(200).json({ result: result.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'server error' });
    }
};

module.exports = { createFirstTimer, getAllFirstTimer, getFirstTimerById };
