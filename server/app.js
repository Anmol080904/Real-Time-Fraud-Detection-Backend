const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./routes/userroutes');
const transactionRoutes = require('./routes/transactionroutes');

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('🚀 Fraud Detection Backend API Running...');
});

module.exports = app;
