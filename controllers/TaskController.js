const jwt = require('jsonwebtoken');
const TaskModel = require('../models/Task');

const addtask = async (req, res) => {
    try {
        const {title, description, priority, due_date, category, status, assigned_to  } = req.body;
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        await TaskModel.addtask(title, description, priority, due_date, category, status, assigned_to);
        return res.status(200).json({
            status:'success',
            message: 'Task added successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const updatetask = async (req, res) => {
    const {title, description, priority, due_date, category, status, assigned_to  } = req.body;
    const taskId = req.params.taskId;
    console.log("TaskId", taskId);
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const updatedTask = await TaskModel.updatetask(title, description, priority, due_date, category, status, assigned_to, taskId);
        res.status(200).json({
            status:'success',
            message: 'Task updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const deletetask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const deletedTask = await TaskModel.deletetask(taskId);
        if (!deletedTask) {
            return res.status(404).json({
                status: 'error',
                message: 'Task not found'
            });
        }
        return res.status(200).json({
            status:'success',
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const gettask = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const task = await TaskModel.gettask();
return res.status(200).json({
            status:'success',
            data: task
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

module.exports = {
    addtask,
    updatetask,
    deletetask,
    gettask
};