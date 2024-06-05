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
        const query = 'insert into "sales" (product, saledate, saleamount, quantity, buyername) values ($1, $2, $3, $4,$5)';
        const values = [product, date, amount, quantity, buyer];
        await pool.query(query, values);
        console.log('Sales added successfully');
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

module.exports = {
    addsales
};