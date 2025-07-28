const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const connectDB = require('../server/config/db');

const { consumeMessages } = require('../broker/consumer');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const userRoutes = require('../server/routes/userroutes');
const transactionRoutes = require('../server/routes/transactionroute');

app.use('/api/users', userRoutes);

app.use('/api/transaction', transactionRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('🚀 Fraud Detection Backend API Running...');
});

module.exports = app;
