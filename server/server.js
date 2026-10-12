// 1. Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { apiLimiter } = require('./middleware/rateLimiter');
const travelRoutes = require('./routes/travelRoutes');

// 2. Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Global Middleware
// Enables Cross-Origin Resource Sharing so our frontend can communicate with the server
app.use(cors());

// Parses incoming requests with JSON payloads (e.g. form submissions)
app.use(express.json());

// 4. Serve Static Frontend Files
// Makes the 'public' directory accessible to the browser (for index.html, CSS, and JS)
app.use(express.static(path.join(__dirname, '../public')));

// 5. Apply Rate Limiting to all /api routes
// Protects endpoints from being spammed or exhausting API quotas
app.use('/api', apiLimiter);

// 6. Basic Health Check Route
// Useful for verifying the server is alive and functioning properly
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'AI Smart Travel Companion server is running!',
    timestamp: new Date().toISOString()
  });
});

// 7. Travel API Routes (Gemini Integration & Budget Calculations)
app.use('/api', travelRoutes);

// 7. Start the Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});
