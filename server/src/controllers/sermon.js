const pool = require('../config/db')


const getAllSermon = async ( req, res ) => {
    try {
        const queryText = await pool.query(`SELECT * FROM sermon`);
        const result = queryText.rows;

        return res.status(200).json({result});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'})
    }
}

const getSermonById = async ( req, res ) => {
    const { id } = req.params
    try {
        
        const queryText = await pool.query(`SELECT * FROM sermon WHERE id = $1`, [id]);
        const result = queryText.rows[0];

        if (!result) {
            return res.status(404).json({error: 'not found'});
        } else {
            return res.status(200).json({id: result.id, video: result.video_url, audio: result.audio_url, cover_art: result.cover_art, title: result.title, description: result.description, preacher: result.preacher,})
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({error: `server error`});
    }
}

const createSermon = async ( req, res ) => {

    const { video_url, audio_url, cover_art, title, description, preacher, preached_at } = req.body;

    try {
        if ( !audio_url || !cover_art || !title || !preacher ) {
            return res.status(400).json({error: 'missing required fields'})
        } else {
            
            const queryText = await pool.query(`INSERT INTO sermon(video_url, audio_url, cover_art, title, description, preacher, preached_at) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [video_url, audio_url, cover_art, title, description, preacher, preached_at]); 

            const result = queryText.rows[0];

            return res.status(201).json({id: result.id, video: result.video_url, audio: result.audio_url, cover_art: result.cover_art, title: result.title, description: result.description, preacher: result.preacher, preached_at: result.preached_at})

        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'server error'});
    }


}

module.exports = {getAllSermon, getSermonById, createSermon}