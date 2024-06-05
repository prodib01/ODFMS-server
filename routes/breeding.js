const express = require('express');
const router = express.Router();
const BreedingController = require('../controllers/BreedingController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.get('/method', authenticateToken, rbacMiddleware.checkPermission('view_records'),  (req, res) => {
    BreedingController.getmethod(req, res);
});

router.post('/addbreeding' , authenticateToken, rbacMiddleware.checkPermission('add_records'),  (req, res) => {
    BreedingController.addbreeding(req, res);
});

router.patch('/updatebreeding/:breedingId', authenticateToken, rbacMiddleware.checkPermission('update_records'),  (req, res) => {
    BreedingController.updatebreeding(req, res);
});

router.delete('/deletebreeding/:id', authenticateToken, rbacMiddleware.checkPermission('delete_records'),  (req, res) => {
    BreedingController.deletebreeding(req, res);
});

router.get('/getbreeding', authenticateToken, rbacMiddleware.checkPermission('view_records'),  (req, res) => {
    BreedingController.getbreeding(req, res);
});

router.get('/getAllData', authenticateToken, rbacMiddleware.checkPermission('view_records'),  (req, res) => {
    BreedingController.getAllData(req, res);
});

module.exports = router;