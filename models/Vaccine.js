const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'farm',
    password: 'prosper',
    port: 5432,
});

const getvaccine = async () => {
    try {
        const query = 'SELECT * FROM vaccinations ';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting vaccine', error);
        throw error;
    }
};

const addvaccine = async (cattle_id, vaccine_name, date, next_due_date, notes) => {
    try {
        const query = 'INSERT INTO vaccinations (cattle_id, vaccine_name, date, next_due_date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [cattle_id, vaccine_name, date, next_due_date, notes];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding vaccine', error);
        throw error;
    }
};

const updatevaccine = async (cattle_id, vaccine_name, date, next_due_date, notes, vaccineId) => {
    try {
        const query = 'UPDATE vaccinations SET cattle_id = $1, vaccine_name = $2, date = $3, next_due_date = $4, notes = $5 WHERE id = $6 RETURNING *';
        const values = [cattle_id, vaccine_name, date, next_due_date, notes, vaccineId];
        const result = await pool.query(query, values);
    } catch (error) {
        console.error('Error updating vaccine', error);
        throw error;
    }
};

const deletevaccine = async (vaccineId) => {
    try {
        const query = 'DELETE FROM vaccinations WHERE id = $1 RETURNING *';
        const values = [vaccineId];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting vaccine', error);
        throw error;
    }
};

module.exports = {
    getvaccine,
    addvaccine,
    updatevaccine,
    deletevaccine
};