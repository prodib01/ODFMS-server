const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432,
});

const getHealthRecordsByCowId = async (cowId) => {
  try {
    const query = 'SELECT * FROM HealthRecords WHERE cow = $1';
    const values = [cowId];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    throw error;
  }
};

const findCowById = async (cowId) => {
  try {
    const result = await pool.query('SELECT * FROM cows WHERE id = $1', [cowId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error finding cow by id:', error);
    throw error;
  }
};

const updateCowHealth = async (date, healthissue, treatmentgiven, cowId) => {
  try {
    console.log('Executing updateCowHealth with:', { date, healthissue, treatmentgiven, cowId }); // Add this line for debugging
    const query = 'UPDATE HealthRecords SET date = $1, healthissue = $2, treatmentgiven = $3 WHERE cow = $4';
    const values = [date, healthissue, treatmentgiven, cowId];
    await pool.query(query, values);
  } catch (error) {
    console.error('Error updating cow health:', error);
    throw error;
  }
};

const createCowHealth = async (date, healthissue, treatmentgiven, cowId) => {
  try {
    console.log('Executing createCowHealth with:', { date, healthissue, treatmentgiven, cowId }); // Add this line for debugging
    const query = 'INSERT INTO HealthRecords (date, healthissue, treatmentgiven, cow) VALUES ($1, $2, $3, $4)';
    const values = [date, healthissue, treatmentgiven, cowId];
    await pool.query(query, values);
  } catch (error) {
    console.error('Error creating cow health:', error);
    throw error;
  }
};



module.exports = {
  getHealthRecordsByCowId,
  findCowById,
  updateCowHealth,
  createCowHealth, // Make sure this is exported
};
