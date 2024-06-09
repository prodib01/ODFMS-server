const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432
});

const addproduct = async (name, code) => {
    try{
        const query = 'insert into "product" (product_name, product_code) values ($1, $2)';
        const values = [name, code];
        await pool.query(query, values);
    } catch (error) {
        console.error(error.message );
    }
};

const getproducts = async () => {
    try {
        const query ='select * from "product"';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

module.exports = {
    addproduct,
    getproducts
};