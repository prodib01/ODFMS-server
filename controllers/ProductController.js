const ProductModel = require('../models/Product');
const FarmModel = require('../models/Farm');
const jwt = require('jsonwebtoken');

const addproduct = async (req, res) => {
    try {
        const { name } = req.body;
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                message: 'Please login to add product'
            });
        }

        let dtoken;
        try {
            dtoken = jwt.decode(token);
        } catch (error) {
            return res.status(400).json({
                message: 'Invalid token'
            });
        }

        const owner = dtoken.userId;

        const farmDetails = await FarmModel.getFarmDetailsByOwner(owner);
        if (!farmDetails) {
            return res.status(404).json({
                message: 'Farm details not found'
            });
        }

        const farmName = farmDetails.farm_name;
        if (!farmName) {
            return res.status(400).json({
                message: 'Farm name is missing'
            });
        }

        const farmInitials = farmName.substring(0, 2).toUpperCase();
        const productInitial = name.substring(0, 1).toUpperCase();
        const randomNumber = Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number

        const code = `${farmInitials}${randomNumber}${productInitial}`;

        await ProductModel.addproduct(name, code);
        return res.status(200).json({
            message: 'Product added successfully',
            code: code // Optionally return the generated code
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

//endpoint to fetch products
const getproducts = async (req, res) => {
    try {
        const products = await ProductModel.getproducts();
        return res.status(200).json({
            products: products
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addproduct,
    getproducts
}