const express = require('express');
const router = express.Router();
const FeedController = require('../controllers/FeedController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/addfeed', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    FeedController.addfeed(req, res);
});

router.post('/addfeedinventory', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    FeedController.addfeedinventory(req, res);
});

router.post('/addfeedingschedules', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    FeedController.addfeedingschedules(req, res);
});

router.get('/getFeedingScheduleById/:id', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    FeedController.getFeedingScheduleById(req, res);
});

router.get('/getFeedById', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    FeedController.getFeedById(req, res);
});



router.get('/getfeeds', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    FeedController.getfeeds(req, res);
});

router.patch('/updatefeedingschedules/:feedId', authenticateToken, rbacMiddleware.checkPermission('update_records'), (req, res) => {
    FeedController.updatefeed(req, res);
});

router.delete('/deletefeedingschedules/:feedId', authenticateToken, rbacMiddleware.checkPermission('delete_records'), (req, res) => {   
    FeedController.deletefeed(req, res);
});

router.get('/getschedules', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    FeedController.getschedules(req, res);
});

module.exports = router;