const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432
});


const createUser = async (full_name, email, phone, address, gender, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO "users" (full_name, email, phone, address, gender, password, position) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [full_name, email, phone, address, gender, hashedPassword, role];

    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


const findUserByEmail = async (email) => {
  try {
    const result = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
    return result.rows[0]; // Returns undefined if no user found
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

const findUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM "users" WHERE id = $1', [id]);
    return result.rows[0]; // Returns undefined if no user found
  } catch (error) {
    console.error("Error finding user by id:", error);
throw error;
  }};

// Function to create a new staff member
const createStaffMember = async (full_name, email, phone, address, gender, password, position, department, state_of_employment, added_by) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO "users" (full_name, email, phone, address, gender, password, position, added_by, department, state_of_employment) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const values = [full_name, email, phone, address, gender, hashedPassword, position, added_by, department, state_of_employment];

    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error creating staff member:", error);
    throw error;
  }
};

const getStaffAddeByUser = async (loggedInUserId) => {
  try {
    const query = {
      text: 'SELECT * FROM "users" WHERE added_by = $1',
      values: [loggedInUserId],
    };

    const result = await pool.query(query);
    console.log('Result:', result.rows); // Log the result of the query

    return result.rows;
  } catch (error) {
    console.error('Error fetching staff members:', error); // Log any errors that occur
    throw error;
  }
};

const updateStaffMember = (full_name, email, phone, address, gender, position, department, state_of_employment, user_id) => {
  try {
    const query = 'UPDATE "users" SET full_name = $1, email = $2, phone = $3, address = $4, gender = $5, position = $6, department = $7, state_of_employment = $8 WHERE id = $9';
    const values = [full_name, email, phone, address, gender, position, department, state_of_employment, user_id];
    pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error updating staff member:", error);
    throw error;
  }

}

const deleteStaffMember = async (user_id) => {
  try {
    const query = 'DELETE FROM "users" WHERE id = $1';
    const values = [user_id];
    await pool.query(query, values);
    return true;
  } catch (error) {
    console.error("Error deleting staff member:", error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail, createStaffMember,  getStaffAddedByUser: getStaffAddeByUser, findUserById, updateStaffMember, deleteStaffMember };


