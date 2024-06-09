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


const addfeedinventory = async (feed_id, quantity) => {
    try{
        const query = 'insert into "feedinventory" (feed_id, quantity) values ($1, $2)';
        const values = [feed_id, quantity];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error adding feed inventory', error.message );
        throw error;
    }
};

const addfeedingschedules = async (cow, feed_id, quantity, schedule_date) => {
    try{
        const query = 'insert into "feedingschedules" (cow, feed_id, quantity, schedule_date) values ($1, $2, $3, $4)';
        const values = [cow, feed_id, quantity, schedule_date];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error adding feeding schedule', error.message );
        throw error;
    }
};

const getFeedingScheduleById = async () => {
    const result = await pool.query('SELECT * FROM feedingschedules');
    return result.rows; // Returning all rows instead of just the first one
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

const updatefeed = async (name, cost_per_unit, unit, id) => {
    try {
        const query = 'UPDATE Feeds SET name = $1, cost_per_unit = $2, unit = $3 WHERE id = $4';
        const values = [name, cost_per_unit, unit, id];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error updating feed:', error.message);
        throw error;
    }
};

const deletefeed = async (feedId) => {
    try {
        const query = 'DELETE FROM Feeds WHERE id = $1';
        const values = [feedId];
        await pool.query(query, values);
    } catch (error) {   
        console.error('Error deleting feed:', error.message);
        throw error;
    }
};


module.exports = {
    addfeed,
    addfeedinventory,
    addfeedingschedules,
    getFeedingScheduleById,
    getFeedById,
    insertFeedingCost,
    getFeeds,
    updatefeed,
    deletefeed
};