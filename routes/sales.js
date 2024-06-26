const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/SalesController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/addsales', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    SalesController.addsales(req, res);
});

router.get('/getsales', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    SalesController.getsales(req, res);
});

router.get('/getsalesbymonthyear', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    SalesController.getsalesByMonthYear(req, res);
});

router.get('/getsalesbyyear', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    SalesController.getsalesbyyear(req, res);
});

router.get('/getweeklysales/:year/:month', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    SalesController.getTotalSalesByMonth(req, res);
});

module.exports = router;
