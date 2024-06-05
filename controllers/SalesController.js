const salesModel = require('../models/Sales');

const addsales = async (req, res) => {
    const {product, date, amount, quantity, buyer } = req.body;
    if (!product || !date || !amount || !quantity || !buyer ){
        return res.status(400).json({
            msg: 'Please fill in all the fields'
        });
    }
    try {
        await salesModel.addsales({product, date, amount, quantity, buyer});
        return res.status(201).json({
            msg: 'Sales added successfully'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error')
    }
};

module.exports ={
    addsales
};