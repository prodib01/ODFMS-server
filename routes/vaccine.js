const express = require('express');
const router = express.Router();
const VaccineController = require('../controllers/VaccineController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const { route } = require('./feed');

router.get('/getvaccine', authenticateToken, rbacMiddleware.checkPermission('view_records'),  (req, res) => {
    VaccineController.getvaccine(req, res);
});

router.post('/addvaccine', authenticateToken, rbacMiddleware.checkPermission('add_records'),  (req, res) => {
    VaccineController.addvaccine(req, res);
});

router.patch('/updatevaccine/:vaccineId', authenticateToken, rbacMiddleware.checkPermission('update_records'),  (req, res) => {
    VaccineController.updatevaccine(req, res);
});

router.delete('/deletevaccine/:id', authenticateToken, rbacMiddleware.checkPermission('delete_records'),  (req, res) => {
    VaccineController.deletevaccine(req, res);
});

module.exports = router;