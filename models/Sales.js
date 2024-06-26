const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432
});


const addsales = async ({ product, date, amount, quantity, buyer }) => {
    try {
        const query = `
            INSERT INTO sales (product, saledate, saleamount, quantity, buyername)
            VALUES ($1, $2, $3, $4, $5);
        `;
        const values = [product, date, amount, quantity, buyer];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error adding sale:', error.message);
        throw error;
    }
};


const getsalesForDate = async (date) => {
    try {
        const query = `
            SELECT s.id, s.product, p.product_name, s.saledate, s.saleamount, s.quantity, s.buyername
            FROM sales s
            JOIN product p ON s.product = p.id
            WHERE s.saledate = $1;
        `;
        const result = await pool.query(query, [date]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching sales:', error.message);
        throw error;
    }
};



const getsalesByMonthYear = async (month, year) => {
    try {
        const query = `
            SELECT p.product_name, SUM(s.saleamount) AS totalsales
            FROM sales s
            JOIN product p ON s.product = p.id
            WHERE EXTRACT(MONTH FROM s.saledate) = $1
              AND EXTRACT(YEAR FROM s.saledate) = $2
            GROUP BY p.product_name;
        `;
        const values = [month, year];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching sales by month and year:', error.message);
        throw error;
    }
};

const getsalesbyyear = async (year) => {
    try {
        const query = `
        SELECT
            TRIM(TO_CHAR(s.saledate, 'Month')) AS month,  -- Remove trailing spaces
            SUM(s.saleamount) AS totalsales
        FROM sales s
        WHERE EXTRACT(YEAR FROM s.saledate) = $1
        GROUP BY TRIM(TO_CHAR(s.saledate, 'Month')), EXTRACT(MONTH FROM s.saledate)
        ORDER BY EXTRACT(MONTH FROM s.saledate);
        `;
        const values = [year];
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching sales by year:', error.message);
        throw error;
    }
};

const getTotalSalesByWeek = async (year, month) => {
  const query = `
    SELECT 
      EXTRACT(WEEK FROM saledate) - EXTRACT(WEEK FROM DATE_TRUNC('month', saledate)) + 1 AS week_of_month,
      SUM(saleamount) AS total_sales
    FROM sales
    WHERE EXTRACT(YEAR FROM saledate) = $1 AND EXTRACT(MONTH FROM saledate) = $2
    GROUP BY week_of_month
    ORDER BY week_of_month;
  `;
  
  const values = [year, month];
  
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Propagate the error back to the controller for proper handling
  }
};




module.exports = {
    addsales,
    getsalesForDate,
    getsalesByMonthYear,
    getsalesbyyear,
    getTotalSalesByWeek
}
