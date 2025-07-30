const express = require('express');
const cors = require('cors');

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

// Routes
const userRoutes = require('./routes/userroutes');
const transactionRoutes = require('./routes/transactionroute');
const fraudRoutes = require('./routes/fraudroute');

const errorMiddleware = require('./middleware/errormiddleware');

app.use('/api/users', userRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/fraud', fraudRoutes);

// Root health check
app.get('/', (req, res) => {
  res.send('🚀 Fraud Detection Backend API Running...');
});

app.use(errorMiddleware);

module.exports = app;
