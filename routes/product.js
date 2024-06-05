const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authenticateToken = require('../middleware/authenticateToken');
const rbacMiddleware = require('../middleware/rbacMiddleware');

router.post('/addproduct', authenticateToken, rbacMiddleware.checkPermission('add_records'), (req, res) => {
    ProductController.addproduct(req, res);
});

router.get('/getproducts', authenticateToken, rbacMiddleware.checkPermission('view_records'), (req, res) => {
    ProductController.getproducts(req, res);
});

module.exports = router;