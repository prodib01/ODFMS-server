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
  } catch (error) {
    console.error(error.message);
    throw error;  // Ensure the error is thrown to be caught in the controller
  }
};

const getMilkProductionByDate = async (date) => {
  try {
    const query = `
      SELECT 
        COALESCE(SUM(m.quantity), 0) AS total_quantity
      FROM production m
      WHERE m.date = $1;
    `;
    const result = await pool.query(query, [date]);
    return result.rows[0]; // Ensure to return only the first row
  } catch (error) {
    console.error("Error in getMilkProductionByDate:", error.message);
    throw error;
  }
};

const getTotalMilkByWeek = async (year, month) => {
  const query = `
  SELECT
  EXTRACT(week FROM date) - EXTRACT(week FROM DATE_TRUNC('month', date)) + 1 AS week_of_month,
  SUM(quantity) AS total_quantity
  FROM production
  WHERE EXTRACT(year FROM date) = $1 AND EXTRACT(month FROM date) = $2
  GROUP BY week_of_month
  ORDER BY week_of_month ;
  `;
  const values = [year, month];
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error in getTotalMilkByWeek:", error.message);
    throw error;
  }
};



module.exports = {
  addmilk,
  getMilkProductionByDate,
  getTotalMilkByWeek,
};
