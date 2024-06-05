const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'farm',
    password: 'prosper',
    port: 5432,
});

const addtask = async (title, description, priority, due_date, category, status, assigned_to) => {
    try {
        const created_at = new Date();
        const query = 'INSERT INTO tasks (title, description, priority, due_date, category, status, assigned_to, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const values = [title, description, priority, due_date, category, status, assigned_to, created_at];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding task', error);
        throw error;
    }
};

const updatetask = async (title, description, priority, due_date, category, status, assigned_to, taskId) => {
    try {
        const query = 'UPDATE tasks SET title = $1, description = $2, priority = $3, due_date = $4, category = $5, status = $6, assigned_to = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *';
        const values = [title, description, priority, due_date, category, status, assigned_to, taskId];
        const result = await pool.query(query, values);
    } catch (error) {
        console.error('Error updating task', error);
        throw error;
    }
};

const deletetask = async (taskId) => {
    try {
        const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
        const values = [taskId];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting task', error);
        throw error;
    }
};

const gettask = async () => {
    try {
        const query = 'SELECT * FROM tasks';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error fetching task', error);
        throw error;
    }
};

module.exports = {
    addtask,
    updatetask,
    deletetask,
    gettask,
};
