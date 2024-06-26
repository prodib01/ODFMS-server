const ProductModel = require('../models/Product');
const FarmModel = require('../models/Farm');
const jwt = require('jsonwebtoken');

const addproduct = async (req, res) => {
    try {
        const { product_name } = req.body;
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

        // Generate a random 3-digit number
        const randomNumber = Math.floor(100 + Math.random() * 900); 

        // Extract the first two letters of the farm name
        const farmInitials = farmName.substring(0, 2).toUpperCase(); 

        // Extract the first two letters of the product name
        const productInitials = product_name.substring(0, 2).toUpperCase();

        // Concatenate the farm initials, random number, and product initials
        const code = `${farmInitials}${randomNumber}${productInitials}`;

        await ProductModel.addproduct(product_name, code);
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