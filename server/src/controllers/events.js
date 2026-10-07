const pool = require('../config/db')

// get all events by id starts here

const getAllEvents = async (req, res) => {
    try {
        const queryText = await pool.query(`SELECT * FROM events`);

        const result = queryText.rows

       return res.status(200).json({result})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'server error'})
    }
}

// get all events by id ends here

// get events by id starts here
const getEventById = async (req, res) => {
    const {id} = req.params;
    try {
        const queryText = await pool.query(`SELECT * FROM  events WHERE id = $1`, [id]);
        const result = queryText.rows[0];

        if(!result){
            return res.status(404).json({error:  'not found'})
        }else{
            return res.status(200).json({id: result.id, title:result.title, flyer: result.flyer, description: result.description, start: result.start_date, end: result.end_date, time: result.event_time, venue: result.venue });
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'server error'})
    }
}



const createEvent = async (req, res) => {
    const { flyer, title, description, start_date, end_date, event_time, venue } = req.body

    try {

        if (!flyer || !title || !start_date || !venue) {
            return res.status(400).json({error: 'missing required fields'});
        } else {
            const queryText = await pool.query(`INSERT INTO events(flyer, title, description, start_date, end_date, event_time, venue) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [flyer, title, description, start_date, end_date, event_time, venue]);


            const result = queryText.rows[0];


            res.status(201).json({flyer: result.flyer, title: result.title, description: result.description, start_date: result.start_date, end_date: result.end_date, event_time: result.event_time, venue: result.venue})   
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'something went wrong'});
    }
}

module.exports = {getAllEvents, getEventById, createEvent};