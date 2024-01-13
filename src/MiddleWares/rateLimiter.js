const rateLimit = require('express-rate-limit');

// Configure the rate limiter
const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});

module.exports = apiRateLimiter;