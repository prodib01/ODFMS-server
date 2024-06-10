const salesModel = require('../models/Sales');

// Controller to add a sale
const addsales = async (req, res) => {
    try {
        const { product, date, amount, quantity, buyer } = req.body;
        await salesModel.addsales({ product, date, amount, quantity, buyer });
        return res.status(200).json({ msg: 'Sale added successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

// Controller to get all sales
const getsales = async (req, res) => {
    try {
        const sales = await salesModel.getsales();
        return res.status(200).json({
            msg: 'Sales retrieved successfully',
            sales
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

const getsalesByMonthYear = async (req, res) => {
    const { month, year } = req.query;
    try {
        const sales = await salesModel.getsalesByMonthYear(month, year);
        return res.status(200).json({
            msg: 'Sales retrieved successfully',
            sales
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

const getsalesbyyear = async (req, res) => {
    const { year } = req.query;
    try {
        const sales = await salesModel.getsalesbyyear(year);
        return res.status(200).json({
            msg: 'Yearly sales retrieved successfully',
            data: sales
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};


module.exports = {
    addsales,
    getsales,
    getsalesByMonthYear,
    getsalesbyyear
};
