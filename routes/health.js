const express = require('express');
const router = express.Router();
const HealthController = require('../controllers/HealthController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');


router.get('/getHealthRecordsByCowId/:cowId', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => { 
    HealthController.getHealthRecordsByCowId(req, res);
});

router.patch('/updateCowHealth/:cowId', authenticateToken, rbacMiddleware.checkPermission('update_records'), (req, res) => {
    HealthController.updateCowHealth(req, res);
});

router.post('/createCowHealth/', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    HealthController.createCowHealth(req, res);
});

router.get('/gethealthrecords', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    HealthController.gethealthrecords(req, res);
});

module.exports = router;