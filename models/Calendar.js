const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432
});

const getevents = async () => {
  try {
    const query = 'SELECT * FROM calendar_events ';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error getting events', error);
    throw error;
  }
};

const addevent = async (title, description, date, start_time, end_time, created_by) => {
    try {
        const query = 'INSERT INTO calendar_events (title, description, date, start_time, end_time, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [title, description, date, start_time, end_time, created_by];
        await pool.query(query, values);
        return true;
    } catch (error) {
        console.error('Error adding event', error);
        throw error;
    }
};

const updateevent = async (title, description, date, start_time, end_time, eventId) => {
    try {
        const query = 'UPDATE calendar_events SET title = $1, description = $2, date = $3, start_time = $4, end_time = $5 WHERE id = $6 RETURNING *';
        const values = [title, description, date, start_time, end_time, eventId];
        const result = await pool.query(query, values);
    } catch (error) {
        console.error('Error updating event', error);
        throw error;
    }
};

const deleteevent = async (eventId) => {
    try {
        const query = 'DELETE FROM calendar_events WHERE id = $1 RETURNING *';
        const values = [eventId];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting event', error);
        throw error;
    }
};

module.exports = {
  getevents,
  addevent,
  updateevent,
  deleteevent
};