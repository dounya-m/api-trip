const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 1080;
const cors = require('cors')
const connectDB =  require ('./config/db');


connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/bus', require('./routes/busRoutes'));
app.use('/api/trip', require('./routes/tripRoutes'));
app.use('/api/book', require('./routes/bookingRoutes'))

app.use(errorHandler)
    

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});