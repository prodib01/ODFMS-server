const jwt = require('jsonwebtoken');
const CalendarModel = require('../models/Calendar');

const getevents = async (req, res) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const events = await CalendarModel.getevents();
        return res.status(200).json({
            status:'success',
            data: events
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const addevent = async (req, res) => {
    try {
        const { title, description, date, start_time, end_time } = req.body;
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const decodedToken = jwt.decode(token); 
        const created_by = decodedToken.userId;
        await CalendarModel.addevent(title, description, date, start_time, end_time, created_by);
        return res.status(200).json({
            status:'success',
            message: 'Event added successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const updateevent = async (req, res) => {
    const { title, description, date, start_time, end_time } = req.body;
    const eventId = req.params.eventId;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const updatedEvent = await CalendarModel.updateevent(title, description, date,start_time, end_time, eventId);
        res.status(200).json({
            status:'success',
            message: 'Event updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
};

const deleteevent = async (req, res) => {
    const eventId = req.params.eventId;
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            });
        }
        const deletedEvent = await CalendarModel.deleteevent(eventId);
        res.status(200).json({
            status:'success',
            message: 'Event deleted successfully'
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
    getevents,
    addevent,
    updateevent,
    deleteevent
};
