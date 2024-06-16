const express = require('express');
const router = express.Router();
const farmController = require('../controllers/FarmController');

// Route to add farm details
router.post('/addFarm', farmController.addFarm);

// Route to fetch logo and farm name for the logged-in user
router.get('/myFarmDetails', farmController.getMyFarmDetails);

// Endpoint to serve images
router.get('/images/', farmController.serveImage);

module.exports = router;