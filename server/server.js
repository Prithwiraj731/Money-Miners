const express = require('express');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const {
    apiGeneralLimiter
} = require('./middleware/rateLimiters');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// SECURITY: Validate Required Environment Variables
// ============================================================
const requiredEnvVars = ['JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('❌ FATAL ERROR: Missing required environment variables:');
    missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\nServer cannot start without these variables. Please check your .env file.');
    process.exit(1); // Exit with error code
}

console.log('✅ All required environment variables are set');

// ============================================================
// MIDDLEWARE: Compression
// ============================================================
app.use(compression());

// ============================================================
// MIDDLEWARE: CORS Configuration (Multi-Origin Support)
// ============================================================
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173']; // Default for development

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, Postman, curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️  CORS blocked request from unauthorized origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

console.log(`✅ CORS enabled for origins: ${allowedOrigins.join(', ')}`);

// ============================================================
// MIDDLEWARE: Body Parser
// ============================================================
app.use(express.json());

// ============================================================
// MIDDLEWARE: Global API Rate Limiting
// ============================================================
app.use('/api/', apiGeneralLimiter);

// ============================================================
// ROUTES
// ============================================================
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', require('./routes/contactRoutes'));

// ============================================================
// HEALTH CHECK
// ============================================================
app.get('/', (req, res) => {
    res.json({
        status: 'running',
        message: 'Money Miners API',
        version: '2.0.0',
        security: 'enabled'
    });
});

// ============================================================
// ERROR HANDLING: 404
// ============================================================
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// ============================================================
// ERROR HANDLING: Global Error Handler
// ============================================================
app.use((err, req, res, next) => {
    console.error('Server Error:', err.message);

    // CORS errors
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({ error: 'CORS policy violation' });
    }

    res.status(500).json({ error: 'Internal server error' });
});

// ============================================================
// SERVER START
// ============================================================
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`🔒 Security features enabled`);
    console.log(`📊 Rate limiting active`);
});
