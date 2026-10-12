const rateLimit = require('express-rate-limit');

/**
 * Basic API Rate Limiter Middleware
 * 
 * Protects our backend and Gemini API quota from excessive calls.
 * Allows a maximum of 30 requests per 15 minutes per IP address.
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true, // Return standard rate limit info in headers (`RateLimit-*`)
  legacyHeaders: false, // Disable the deprecated `X-RateLimit-*` headers
  message: {
    status: 429,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

module.exports = { apiLimiter };
