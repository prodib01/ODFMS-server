const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsersController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');



// Route to handle user signup
router.post('/signup', (req, res) => {
    userController.signup(req, res);
});

// Route to handle user login
router.post('/login', (req, res) => {
    userController.login(req, res);
});

// Route to add staff
router.post('/addStaff', authenticateToken, rbacMiddleware.checkPermission('add_staff'), (req, res) => {
    userController.addStaff(req, res);
});

// Route to get staff
router.get('/getStaff', authenticateToken, rbacMiddleware.checkPermission('view_staff'), (req, res) => {
    userController.getStaff(req, res);
});
 
router.patch('/updateStaff/:staffId', authenticateToken, rbacMiddleware.checkPermission('update_staff'), (req, res) => { 
    userController.updateStaff(req, res);
});

router.delete('/deleteStaff/:staffId', authenticateToken, rbacMiddleware.checkPermission('delete_staff'), (req, res) => {
    userController.deleteStaff(req, res);
});
module.exports = router;
