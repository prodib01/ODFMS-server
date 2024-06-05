const milkModel = require('../models/Milk');

const addmilk = async (req, res) => {
    const { date, time, quantity } = req.body;
    if (!date || !time || !quantity) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        await milkModel.addmilk({ date, time, quantity });
        return res.status(201).json({
            msg: 'Milk record added successfully'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

module.exports = {
    addmilk
};
