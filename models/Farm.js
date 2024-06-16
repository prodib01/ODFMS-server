const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'farm',
  password: 'prosper',
  port: 5432
});

const addFarm = async (farm_name, farm_owner, location, logo) => {
  try {
    const query = 'INSERT INTO "farm" (farm_name, farm_owner, location, logo) VALUES ($1, $2, $3, $4)';
    const values = [farm_name, farm_owner, location, logo];
    await pool.query(query, values);
  } catch (error) {
    console.error("Error adding farm:", error);
    throw error;
  }
};

const getFarmDetailsByOwner = async (farm_owner) => {
  try {
    const query = 'SELECT * FROM "farm" WHERE farm_owner = $1';
    const values = [farm_owner];
    const result = await pool.query(query, values);
    return result.rows[0]; // Returns undefined if no farm found
  } catch (error) {
    console.error("Error finding farm by owner:", error);
    throw error;
  }
};

const updateFarmDetails = async (farm_owner, farm_name, location) => {
  try {
    const query = 'UPDATE "farm" SET farm_name = $1, location = $2 WHERE farm_owner = $3';
    const values = [farm_name, location, farm_owner];
    await pool.query(query, values);
  } catch (error) {
    console.error("Error updating farm details:", error);
    throw error;
  }
};

const updateFarmLogo = async (farm_owner, logo) => {
  try {
    const query = 'UPDATE "farm" SET logo = $1 WHERE farm_owner = $2';
    const values = [logo, farm_owner];
    await pool.query(query, values);
  } catch (error) {
    console.error("Error updating farm logo:", error);
    throw error;
  }
};

module.exports = {
  addFarm,
  getFarmDetailsByOwner,
  updateFarmDetails,
  updateFarmLogo
};
