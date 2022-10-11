const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000;
const connectDB =  require ('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/travel', require('./routes/usersRoutes'));

app.use(errorHandler)
    

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});