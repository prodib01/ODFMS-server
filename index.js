const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const usersRouter = require('./routes/users'); // Import the user router
const farmRouter = require('./routes/farm'); // Import the farm router
const cowRouter = require('./routes/cow');
const healthRouter = require('./routes/health');
const milkRouter = require('./routes/milk');
const salesRouter = require('./routes/sales');
const productRouter = require('./routes/product');
const feedRouter = require('./routes/feed');
const breedingRouter = require('./routes/breeding');
const taskRouter = require('./routes/task');
const vaccineRouter = require('./routes/vaccine');
const calendarRouter = require('./routes/calendar');

app.use(cors());
app.use(express.json());

app.use('/uploaded_files', express.static(path.join(__dirname, 'uploaded_files')));

app.use('/users', usersRouter);
app.use('/farm' , farmRouter);
app.use('/cow', cowRouter);
app.use('/health', healthRouter);
app.use('/milk', milkRouter);
app.use('/sales', salesRouter);
app.use('/product', productRouter);
app.use('/feed', feedRouter);
app.use('/breeding', breedingRouter);
app.use('/task', taskRouter);
app.use('/vaccine', vaccineRouter);
app.use('/calendar', calendarRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
