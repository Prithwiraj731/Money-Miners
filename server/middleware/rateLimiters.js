const rateLimit = require('express-rate-limit');

/**
 * Rate Limiter Configurations
 * Different limits for different route types to prevent abuse
 */

// Helper to get limit from env or use default
const getLimit = (envVar, defaultValue) => {
    return process.env[envVar] ? parseInt(process.env[envVar]) : defaultValue;
};

// Auth Login Rate Limiter - Strict to prevent brute force
const authLoginLimiter = rateLimit({
    windowMs: getLimit('RATE_LIMIT_AUTH_LOGIN_WINDOW', 15 * 60 * 1000), // 15 minutes
    max: getLimit('RATE_LIMIT_AUTH_LOGIN_MAX', 5), // 5 requests per window
    message: 'Too many login attempts. Please try again after 15 minutes.',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many login attempts. Please try again after 15 minutes.',
            retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() / 1000)
        });
    }
});

// Auth OTP Rate Limiter - Very strict to prevent OTP spam
const authOtpLimiter = rateLimit({
    windowMs: getLimit('RATE_LIMIT_AUTH_OTP_WINDOW', 5 * 60 * 1000), // 5 minutes
    max: getLimit('RATE_LIMIT_AUTH_OTP_MAX', 3), // 3 requests per window
    message: 'Too many OTP requests. Please try again after 5 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many OTP requests. Please try again after 5 minutes.',
            retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() / 1000)
        });
    }
});

// Auth Register Rate Limiter - Moderate to prevent fake accounts
const authRegisterLimiter = rateLimit({
    windowMs: getLimit('RATE_LIMIT_AUTH_REGISTER_WINDOW', 60 * 60 * 1000), // 1 hour
    max: getLimit('RATE_LIMIT_AUTH_REGISTER_MAX', 10), // 10 requests per hour
    message: 'Too many registration attempts. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many registration attempts. Please try again later.',
            retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() / 1000)
        });
    }
});

// Admin Login Rate Limiter - Very strict for admin security
const adminLoginLimiter = rateLimit({
    windowMs: getLimit('RATE_LIMIT_ADMIN_LOGIN_WINDOW', 15 * 60 * 1000), // 15 minutes
    max: getLimit('RATE_LIMIT_ADMIN_LOGIN_MAX', 3), // 3 requests per window
    message: 'Too many admin login attempts. Please try again after 15 minutes.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many admin login attempts. Account may be locked. Contact support if needed.',
            retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() / 1000)
        });
    }
});

// Contact Form Rate Limiter - Prevent spam submissions
const contactFormLimiter = rateLimit({
    windowMs: getLimit('RATE_LIMIT_CONTACT_WINDOW', 10 * 60 * 1000), // 10 minutes
    max: getLimit('RATE_LIMIT_CONTACT_MAX', 3), // 3 requests per window
    message: 'Too many contact submissions. Please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many submissions. Please wait before submitting again.',
            retryAfter: Math.ceil(req.rateLimit.resetTime.getTime() / 1000)
        });
    }
});

// API General Rate Limiter - Generous for authenticated users
const apiGeneralLimiter = rateLimit({
    windowMs: getLimit('RATE_LIMIT_API_WINDOW', 15 * 60 * 1000), // 15 minutes
    max: getLimit('RATE_LIMIT_API_MAX', 200), // 200 requests per window (increased from 100)
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    authLoginLimiter,
    authOtpLimiter,
    authRegisterLimiter,
    adminLoginLimiter,
    contactFormLimiter,
    apiGeneralLimiter
};
