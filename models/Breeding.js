const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'farm',
    password: 'prosper',
    port: 5432,
});

const getMethod = async () => {
    try {
        const query = 'SELECT * FROM method';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching method', error);
        throw error;
    }
};

const addBreeding = async (cow, breeding_date, method, pregnancy_status, due_date) => {
    try {
        const query = 'INSERT INTO breeding (cow, breeding_date, method, pregnancy_status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [cow, breeding_date, method, pregnancy_status, due_date];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding breeding', error);
        throw error;
    }
};

const updateBreeding = async (cow, breeding_date, method, pregnancy_status, due_date, id) => {
    try {
        const query = 'UPDATE breeding SET cow = $1, breeding_date = $2, method = $3, pregnancy_status = $4, due_date = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *';
        const values = [cow, breeding_date, method, pregnancy_status, due_date, id];
        const result = await pool.query(query, values);
    } catch (error) {
        console.error('Error updating breeding', error);
        throw error;
    }
};

const deleteBreeding = async (id) => {
    try {
        const query = 'DELETE FROM breeding WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting breeding', error);
        throw error;
    }
};

const getbreeding = async () => {
    try {
        const query = 'SELECT * FROM breeding';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching breeding', error);
        throw error;
    }
};

const getBreedingRecordsWithDetails = async () => {
  try {
    const query = `
      SELECT breeding.id, cow.tag, breeding.breeding_date, method.method, breeding.pregnancy_status, breeding.due_date
      FROM breeding
      INNER JOIN cows ON breeding.cow = cows.id
      INNER JOIN method ON breeding.method = method.id
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching breeding records with details:', error);
    throw error;
  }
};

module.exports = {
    getMethod,
    addBreeding,
    updateBreeding,
    deleteBreeding,
    getbreeding,
    getBreedingRecordsWithDetails,
};
