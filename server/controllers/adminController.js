const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hardcoded check against .env variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {

            // Create a simple admin token
            const token = jwt.sign(
                { role: 'admin', email: email },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.status(200).json({
                message: 'Admin access granted',
                token,
                user: {
                    email: email,
                    role: 'admin'
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid Admin Credentials' });
        }
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(500).json({ message: 'Server error during admin login' });
    }
};

module.exports = { login };
