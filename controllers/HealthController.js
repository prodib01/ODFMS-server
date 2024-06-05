const jwt = require('jsonwebtoken');
const HealthModel = require('../models/Health');
const CowModel = require('../models/Cow');

const getHealthRecordsByCowId = async (req, res) => {
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
        const { cowId } = req.params;

        const healthRecords = await HealthModel.getHealthRecordsByCowId(cowId);

        return res.status(200).json({
            status:'success',
            message: 'Health records fetched successfully',
            records: healthRecords
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const updateCowHealth = async (req, res) => {
  const { date, healthissue, treatmentgiven } = req.body;
  const cowId = req.params.cowId;
  console.log('Updating cow health with:', { date, healthissue, treatmentgiven, cowId }); // Add this line for debugging
  try {
    await HealthModel.updateCowHealth(date, healthissue, treatmentgiven, cowId);
    res.status(200).json({ message: 'Health records updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update health records' });
  }
};

const createCowHealth = async (req, res) => {
    const {date, healthissue, treatmentgiven, cowId } = req.body;   
    console.log('Creating cow health with:', { date, healthissue, treatmentgiven, cowId }); // Add this line for debugging
    try {
        await HealthModel.createCowHealth(date, healthissue, treatmentgiven, cowId);
        res.status(200).json({ 
            status: "success",
            message: "Health records created successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to create health records"
        });
    }
};



module.exports = {
    getHealthRecordsByCowId,
    updateCowHealth,
createCowHealth

};
