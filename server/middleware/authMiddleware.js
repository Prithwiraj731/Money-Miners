const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user info to request
 */
const requireAuth = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token - JWT_SECRET must be set in environment
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, username, role }
        next();

    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

/**
 * Admin Authorization Middleware
 * Requires authentication and admin role
 * Use after requireAuth or as standalone (includes auth check)
 */
const requireAdmin = (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user has admin role
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.error('Admin Middleware Error:', error.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = {
    requireAuth,
    requireAdmin,
    // Backward compatibility
    authMiddleware: requireAuth
};
