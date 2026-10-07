const pool = require('../config/db');

const getAllPartners = async ( req, res ) => {
    try{
        const queryText = await pool.query(`SELECT * FROM partnership`);

        const result = queryText.rows;

        return res.status(200).json({result});
    }catch(error){
        console.error('error in getting all partners', error);
        return res.status(500).json({error: 'server error'})
    }
}

const getPartnersById = async ( req, res ) => {
    const { id } = req.params;
    try {
        const queryText = await pool.query(`SELECT * FROM partnership WHERE id = $1`, [id]);

        const result = queryText.rows[0];

        if (!result) {
            return res.status(404).json({ error: 'not found' });
        } else {
            return res.status(200).json({id: result.id, name: result.full_name, email: result.email, frequency: result.frequency, amount: result.amount})
        }
    } catch (error) {
        console.error('error in get partners by id', error)
        return res.status(500).json({ error: 'server error' })
    }

}

const createPartnership = async (req, res) => {

    const {full_name, email, frequency, amount} = req.body;

    try {

        const numericAmount = Number(amount);

        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({error: 'Amount must be a valid number greater than 0'});
        }else if (!full_name || !email || !frequency) {
            return res.status(400).json({error: 'missing required fields'});
        } else {
            const queryText = await pool.query(`INSERT INTO partnership(full_name, email, frequency, amount) VALUES($1, $2, $3, $4) RETURNING *`, [full_name, email, frequency, amount]);

            const result = queryText.rows[0];
            return res.status(201).json({full_name: result.full_name, email: result.email, frequency: result.frequency, amount: result.amount});
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'});
    }
}




module.exports = {createPartnership, getPartnersById, getAllPartners}