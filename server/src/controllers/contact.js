const pool = require('../config/db')


const getAllContact = async (req, res) => {
    try {
        const queryText = await pool.query(`SELECT * FROM contact`);
        
        const result = queryText.rows

        return res.status(200).json({result});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'server error'})
    }
}

const createContact = async (req, res) => {
    const {name, phone_number, message, appointment_date, appointment_time} = req.body;
    const appDate = new Date(appointment_date);
    try {
        if (!name || !phone_number || !appointment_date || !appointment_time) {
            return res.status(400).json({error: 'missing required fields'})
        } else if (appDate.getDay() === 0 || appDate.getDay() === 6) {
            return res.status(400).json({error: 'pastor will not be available'});
        } else {
            const queryText = await pool.query(`INSERT INTO contact(name, phone_number, message, appointment_date, appointment_time) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, phone_number, message, appointment_date, appointment_time]);

            const result = queryText.rows[0];

            return res.status(201).json({name: result.name, phoneNumber: result.phone_number, appointment_date: result.appointment_date, appointment_time: result.appointment_time});
        }
    } catch (error) {

        if (error.code === '23505') {
            console.error(error);
            return res.status(409).json({error: 'This item already exists. Please choose a different value.'})
        } else {
            console.error(error);
            return res.status(500).json({error: 'server error'});   
        }
    }
}

const getSlots = (req, res) => {
  const slots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "12:30 PM","02:00 PM", "02:30 PM", "03:00 PM"
]
 return res.status(200).json({slots})
}

const getAvailability = async (req, res) => {
    const { date } = req.query;
    try {
        if (!date) {
            return res.status(400).json({error: 'please select a date'});
        }

        const queryText = await pool.query(`SELECT appointment_time FROM contact WHERE appointment_date = $1`, [date]);
        const result = queryText.rows;

        return res.status(200).json({result});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'});
    }
}


module.exports = {getAllContact, createContact, getSlots, getAvailability};