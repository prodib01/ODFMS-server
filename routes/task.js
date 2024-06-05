const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/addtask' , authenticateToken, rbacMiddleware.checkPermission('add_records'),  (req, res) => {
    TaskController.addtask(req, res);
});

router.patch('/updatetask/:taskId', authenticateToken, rbacMiddleware.checkPermission('update_records'),  (req, res) => {
    TaskController.updatetask(req, res);
});

router.delete('/deletetask/:id', authenticateToken, rbacMiddleware.checkPermission('delete_records'),  (req, res) => {
    TaskController.deletetask(req, res);
});

router.get('/gettask', authenticateToken, rbacMiddleware.checkPermission('view_records'),  (req, res) => {
    TaskController.gettask(req, res);
});

module.exports = router;