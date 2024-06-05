const jwt = require('jsonwebtoken');    
const VaccineModel = require('../models/Vaccine');

const getvaccine = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const vaccine = await VaccineModel.getvaccine();
        return res.status(200).json({
            status:'success',
            data: vaccine
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const addvaccine = async (req, res) => {
    try {
        const {cattle_id, vaccine_name, date, next_due_date, notes  } = req.body;
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        await VaccineModel.addvaccine(cattle_id, vaccine_name, date, next_due_date, notes);
        return res.status(200).json({
            status:'success',
            message: 'Vaccine added successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const updatevaccine = async (req, res) => {
    const {cattle_id, vaccine_name, date, next_due_date, notes  } = req.body;
    const vaccineId = req.params.id;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const updatedVaccine = await VaccineModel.updatevaccine(cattle_id, vaccine_name, date, next_due_date, notes, vaccineId);
        res.status(200).json({
            status:'success',
            message: 'Vaccine updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const deletevaccine = async (req, res) => {
    const vaccineId = req.params.id;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const deletedVaccine = await VaccineModel.deletevaccine(vaccineId);
        res.status(200).json({
            status:'success',
            message: 'Vaccine deleted successfully'
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
    getvaccine,
    addvaccine,
    updatevaccine,
    deletevaccine
};