const express = require('express');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');

// Import Middleware
const { apiGeneralLimiter } = require('./middleware/rateLimiters');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// SECURITY: Validate Required Environment Variables
// ============================================================
const requiredEnvVars = ['JWT_SECRET', 'SUPABASE_URL', 'SUPABASE_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('❌ FATAL ERROR: Missing required environment variables:');
    missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
    process.exit(1);
}

// ============================================================
// MIDDLEWARE
// ============================================================
app.use(compression());

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
};

app.use(cors(corsOptions));
app.use(express.json());

// Global API Rate Limiting (Applied to all /api routes)
app.use('/api', apiGeneralLimiter);

// ============================================================
// ROUTES
// ============================================================
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/purchases', purchaseRoutes);

// Debug Route
app.get('/api/debug-status', async (req, res) => {
    res.json({
        status: 'online',
        purchases_ready: true,
        env: {
            SUPABASE: !!process.env.SUPABASE_URL,
            RESEND: !!process.env.RESEND_API_KEY
        }
    });
});

app.get('/', (req, res) => {
    res.json({ status: 'running', message: 'Money Miners API v2.1' });
});

// ============================================================
// ERROR HANDLING
// ============================================================

// 404 Handler with Logging for Debugging
app.use((req, res) => {
    console.warn(`[404] Route not found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});

app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS policy violation' });
    }
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
