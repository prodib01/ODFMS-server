const express = require('express');
const router = express.Router();
const CalendarController = require('../controllers/CalendarController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.get('/getevents', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    CalendarController.getevents(req, res);
});

router.post('/addevent', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    CalendarController.addevent(req, res);
});

router.patch('/updateevent/:eventId', authenticateToken, rbacMiddleware.checkPermission('update_records'), (req, res) => {
    CalendarController.updateevent(req, res);
});

router.delete('/deleteevent/:eventId', authenticateToken, rbacMiddleware.checkPermission('delete_records'), (req, res) => {
    CalendarController.deleteevent(req, res);
});


module.exports = router;
