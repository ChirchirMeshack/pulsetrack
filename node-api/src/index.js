const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    version: '1.0.0'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`PulseTrack API running on port ${port}`);
});

// Export the Express API for serverless functions
module.exports = app;