const { Pool }= require('pg');
const { get } = require('../routes/cow');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'farm',
    password: 'prosper',
    port: 5432,
});

const addCow = async (breed, date_of_birth, weight, health_status, cow_tag, gender, owner) => {
    try{
        const query = 'INSERT INTO cows (breed, date_of_birth, weight, health_status, cow_tag, gender, owner) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const values = [breed, date_of_birth, weight, health_status, cow_tag, gender, owner];
        await pool.query(query, values);
        console.log('Cow added successfully');
    }catch(error){
        console.error(error);
    }
};

const getCowDetailsByOwner = async (owner) => {
    try{
        const query = 'SELECT * FROM cows WHERE owner = $1';
        const values = [owner];
        const result = await pool.query(query, values);
        return result.rows; // Returns undefined if no cow found
    }
    catch(error){
        console.error(error);
    }
};

const getCowDetailsById = async (cowId) => {
    try {
        const query = 'SELECT id, owner, weight FROM cows WHERE id = $1'; // Add other required fields
        const result = await pool.query(query, [cowId]);
        console.log('Database query result:', result.rows[0]); // Add this line for debugging
        return result.rows[0];
    } catch (error) {
        console.error('Error finding cow by id:', error);
        throw error;
    }
};


const deleteCow = async (cowId) => {
    try{
        const query = 'DELETE FROM cows WHERE id = $1';
        const values = [cowId];
        await pool.query(query, values);
        console.log('Cow deleted successfully');
    }catch(error){
        console.error("Error deleting cow", error);
        throw error;
    }
};

module.exports = {
    addCow,
    getCowDetailsByOwner,
     getCowDetailsById,
     deleteCow
};