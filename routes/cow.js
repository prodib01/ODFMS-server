const express = require('express');
const router = express.Router();
const CowController = require('../controllers/CowController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

console.log('CowController:', CowController);
console.log('authenticateToken:', authenticateToken);
console.log('rbacMiddleware:', rbacMiddleware);

router.post('/addCow', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
CowController.addCow(req, res);
});

router.get('/getCowDetailsByOwner', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    CowController.getCowDetails(req, res); 
});

router.delete('/deleteCow/:cowId', authenticateToken, rbacMiddleware.checkPermission('delete_records'), (req, res) => {
    CowController.deleteCow(req, res);
});

module.exports = router;