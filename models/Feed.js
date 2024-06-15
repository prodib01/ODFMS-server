const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432,
});

const addfeed = async (name, cost_per_unit, unit) => {
    try {
        const query = 'INSERT INTO Feeds (name, cost_per_unit, unit) VALUES ($1, $2, $3)';
        const values = [name, cost_per_unit, unit];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error adding feed:', error.message);
        throw error;
    }
};

const addfeedinventory = async (feed_id, quantity, total_cost) => {
const result = await pool.query(
    `INSERT INTO feedinventory (feed_id, quantity, total_cost) VALUES ($1, $2, $3) RETURNING *`,
    [feed_id, quantity, total_cost]
);
    return result.rows[0];
};

const addfeedingschedule = async (cow, feed_id, quantity, schedule_date, total_cost) => {
    const result = await pool.query(
        `INSERT INTO feedingschedules (cow, feed_id, quantity, schedule_date, total_cost) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [cow, feed_id, quantity, schedule_date, total_cost]
    );
    return result.rows[0];
};

// Updated: get a feeding schedule by its ID
const getFeedingscheduleById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM feedingschedules WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching feeding schedule by ID:', error.message);
        throw error;
    }
};

const getFeedingSchedules = async () => {
    try {
        const result = await pool.query('SELECT * FROM feedingschedules');
        return result.rows;
    } catch (error) {
        console.error('Error fetching feeding schedules:', error.message);
        throw error;
    }

};

const getFeedById = async (id) => {
    const result = await pool.query('SELECT * FROM Feeds WHERE id = $1', [id]);
    return result.rows[0];
};

const insertFeedingCost = async (feeding_schedule_id, total_cost) => {
    const result = await pool.query(
        'INSERT INTO feedingcosts (feeding_schedule_id, total_cost) VALUES ($1, $2) RETURNING *',
        [feeding_schedule_id, total_cost]
    );
    return result.rows[0];
};

const getFeeds = async () => {
    try {
        const query = 'SELECT * FROM Feeds';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching feeds:', error.message);
        throw error;
    }
};

const updateFeedingschedule = async (schedule_id, cow, feed_id, quantity, schedule_date, total_cost) => {
    try {
        const query = 'UPDATE feedingschedules SET cow = $1, feed_id = $2, quantity = $3, schedule_date = $4, total_cost = $5 WHERE id = $6 RETURNING *';
        const values = [cow, feed_id, quantity, schedule_date, total_cost, schedule_id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating feeding schedule:', error.message);
        throw error;
    }
};

const deleteFeedingschedule = async (id) => {
    try {
        const query = 'DELETE FROM feedingschedules WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0]; // Ensure to handle result correctly if needed
    } catch (error) {
        console.error('Error deleting feeding schedule:', error.message);
        throw error;
    }
};


module.exports = {
    addfeed,
    addfeedinventory,
    addfeedingschedule,
    getFeedingscheduleById, // Renamed for consistency
    getFeedById,
    insertFeedingCost,
    getFeeds,
    updateFeedingschedule,
    deleteFeedingschedule,
    getFeedingSchedules,
};
