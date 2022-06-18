require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 5000;

// import database
const DB = require('./database/connection');

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// API Routes
app.use('/api/v1', require('./routes/v1/routes'));

// start server
app.listen(port, function() {
    console.log(`Server is running at ${port}`);
});