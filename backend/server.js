const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increase limit for JSON body

// MongoDB Connection URL from environment variables
const uri = process.env.MONGODB_URI;

mongoose.connect(process.env.MONGODB_URI, {
  ssl: true,
  tls: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Import routes
const sarisRouter = require('./routes/saris');

// Use routes
app.use('/api/saris', sarisRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// You will need to create a .env file in the backend directory with:
// MONGODB_URI=your_mongodb_connection_string 