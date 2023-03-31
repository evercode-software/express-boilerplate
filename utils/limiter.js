const rateLimit = require("express-rate-limit");

exports.guest = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 10, // Maximum 10 requests within a minute window per IP address
    message: "You had too much request. Please try again later."
});

exports.auth = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 20, // Maximum 20 requests within a minute window per IP address
    message: "You had too much request. Please try again later."
});
