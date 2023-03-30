const rateLimit = require("express-rate-limit");

exports.set = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 20, // Maximum 20 requests within a minute window per IP address
    message: "You had too much request. Please try again later."
});