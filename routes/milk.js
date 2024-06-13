const express = require('express');
const router = express.Router();
const MilkController = require('../controllers/MilkController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/addmilk', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    MilkController.addmilk(req, res);
});

router.get('/getmilkproduction', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    MilkController.getMilkProductionByDate(req, res);
});

router.get('/getweeklymilk/:year/:month',  (req, res) => {
    MilkController.getTotalMilkByMonth(req, res);
});

module.exports = router;