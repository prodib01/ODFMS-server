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

const getMilkProductionByDate = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = await milkModel.getMilkProductionByDate(today);

    if (data && data.total_quantity != null) {
      return res.status(200).json({
        msg: 'Milk production retrieved successfully',
        date: today,
        totalQuantity: data.total_quantity,
      });
    } else {
      return res.status(200).json({
        msg: 'No milk production found for today',
        date: today,
        totalQuantity: 0,
      });
    }
  } catch (err) {
    console.error("Error in getMilkProductionByDate controller:", err.message);
    return res.status(500).send('Server Error');
  }
};

const getTotalMilkByMonth = async (req, res) => {
  const {year, month } = req.params;
  if (!year || !month) {
    return res.status(400).json({ error: 'Year and month are required' });
  }
  try {
    const milkData = await milkModel.getTotalMilkByWeek(year, month);
    res.json(milkData);
  } catch (error) {
    console.error('Error fetching milk data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



module.exports = {
    addmilk,
    getMilkProductionByDate,
    getTotalMilkByMonth
};
