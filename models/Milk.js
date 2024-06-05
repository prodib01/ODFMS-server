const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432
});

const addmilk = async ({ date, time, quantity }) => {
  try {
    const query = 'INSERT INTO "production" (date, time, quantity) VALUES ($1, $2, $3)';
    const values = [date, time, quantity];
    await pool.query(query, values);
    console.log('Milk record added successfully');
  } catch (error) {
    console.error(error.message);
    throw error;  // Ensure the error is thrown to be caught in the controller
  }
};

module.exports = {
  addmilk
};
