const express = require("express");
const dotenv = require("dotenv");
const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('PostgreSQL Connected ✅'))
  .catch(err => console.error('Connection error:', err));

const errorHandler = require("./middleware/errormiddleware");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionroute");
const fraudRoutes = require("./routes/fraudroute");

// Load environment variables
dotenv.config();



// Initialize express app
const app = express();
app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/fraud-alerts", fraudRoutes);

// Error handler middleware
app.use(errorHandler);

// Start Kafka consumer
const runConsumer = require("../broker/consumer");
runConsumer().catch(console.error);

// Start server on PORT 5002
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
