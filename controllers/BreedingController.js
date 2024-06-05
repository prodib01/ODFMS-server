const jwt = require('jsonwebtoken');
const BreedingModel = require('../models/Breeding');

const getmethod = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const method = await BreedingModel.getMethod();
        return res.status(200).json({
            status: 'success',
            data: method
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const getAllData = async (req, res) => {
  try {
    // Fetch breeding records
    const breedingRecords = await BreedingModel.getBreedingRecordsWithDetails();

    return res.status(200).json({
      status: 'success',
      data: breedingRecords
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

const addbreeding = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const { cow, breeding_date, method, pregnancy_status, due_date } = req.body;
        const newBreeding = await BreedingModel.addBreeding(cow, breeding_date, method, pregnancy_status, due_date);
        return res.status(201).json({
            status: 'success',
            data: newBreeding
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const updatebreeding = async (req, res) => {
const { cow, breeding_date, method, pregnancy_status, due_date } = req.body;
const breedingId = req.params.breedingId;
try{
    await BreedingModel.updateBreeding( cow, breeding_date, method, pregnancy_status, due_date, breedingId);
    res.status(200).json({
        status:'success',
        message: 'Breeding record updated successfully'
    });
} catch (error) {
    console.error(error);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
}
};

const deletebreeding = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const { id } = req.params;
        const deletedBreeding = await BreedingModel.deleteBreeding(id);
        if (!deletedBreeding) {
            return res.status(404).json({
                status: 'error',
                message: 'Breeding record not found'
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Breeding record deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const getbreeding = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const breeding = await BreedingModel.getbreeding();
        return res.status(200).json({
            status: 'success',
            data: breeding
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
    getmethod,
    addbreeding,
    updatebreeding,
    deletebreeding,
    getbreeding,
    getAllData
};
