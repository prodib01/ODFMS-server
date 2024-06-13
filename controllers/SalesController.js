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


const getsales = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // get current date in YYYY-MM-DD format
        const sales = await salesModel.getsalesForDate(today);
        return res.status(200).json({
            msg: 'Sales retrieved successfully',
            sales
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
};

const getTotalSalesByMonth = async (req, res) => {
  const { year, month } = req.params;
  
  if (!year || !month) {
    return res.status(400).json({ error: 'Year and month are required' });
  }
  
  try {
    const salesData = await salesModel.getTotalSalesByWeek(year, month);
    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    getsalesbyyear,
    getTotalSalesByMonth
};
