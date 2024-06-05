const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
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

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter); // Mount the user router at the /users base URL
app.use('/farm' , farmRouter); // Mount the farm router at the /farm base URL
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

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
