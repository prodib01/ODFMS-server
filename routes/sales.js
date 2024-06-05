const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/SalesController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/addsales', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    SalesController.addsales(req, res);
});

module.exports = router;