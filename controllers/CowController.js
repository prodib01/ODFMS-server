const jwt = require('jsonwebtoken');
const CowModel = require('../models/Cow');
const FarmModel = require('../models/Farm'); // Assuming you have a Farm model to fetch farm details

const addCow = async (req, res) => {
    try {
        const { breed, date_of_birth, weight, health_status, gender } = req.body;
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const decodedToken = jwt.decode(token);
        const owner = decodedToken.userId;

        // Fetch farm details to get the farm name
        const farmDetails = await FarmModel.getFarmDetailsByOwner(owner); // Assuming you have a function to get farm details by owner
        const farmName = farmDetails.farm_name;

        // Generate cow tag based on farm name and gender
        const cowTag = generateCowTag(farmName, gender);

        // Call CowModel to insert cow with generated cow_tag
        await CowModel.addCow(breed, date_of_birth, weight, health_status, cowTag, gender, owner);

        return res.status(201).json({
            status: 'success',
            message: 'Cow added successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

// Function to generate cow tag based on farm name and gender
const generateCowTag = (farmName, gender) => {
    const prefix = farmName.slice(0, 2).toUpperCase();
    const cowCount = Math.floor(Math.random() * 1000); // Generate a random three-digit number
    const genderSuffix = gender === 'male' ? 'M' : 'F';
    return `${prefix}${cowCount.toString().padStart(3, '0')}${genderSuffix}`;
};

//endpoint to get cow details bassed on owner = loggedinuser
const getCowDetails = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const decodedToken = jwt.decode(token);
        const owner = decodedToken.userId;
        const cows = await CowModel.getCowDetailsByOwner(owner);
        return res.status(200).json({
            status :'success',
            message : 'Cow details fetched successfully',
            cows : cows
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const deleteCow = async (req, res) => {
    const cowId = req.params.cowId;
    const loggedInUser = req.user.userId;


    try {
        const cow = await CowModel.getCowDetailsById(cowId);

        if (!cow) {
            return res.status(404).json({
                status: 'error',
                message: 'Cow not found'
            });
        }

        if (cow.owner !== loggedInUser) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }

        await CowModel.deleteCow(cowId);
        res.status(200).json({
            status: "success",
            message: "Cow deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};


module.exports = {
    addCow,
    getCowDetails,
    deleteCow
};
