const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const supabase = require('../config/supabase');

// ============================================================
// PRODUCTION-GRADE EMAIL SENDING
// Creates a fresh transporter per request to avoid stale pool
// connections that break silently in production environments.
// ============================================================
const createTransporter = () => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('[EMAIL] Missing EMAIL_USER or EMAIL_PASS in environment variables.');
        return null;
    }

    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,               // Use SSL on port 465
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 10000,    // 10s to establish TCP connection
        greetingTimeout: 10000,      // 10s for SMTP greeting
        socketTimeout: 15000,        // 15s for socket inactivity
        tls: {
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2'
        },
        debug: false,
        logger: false
    });
};

// Send mail with automatic retry + fresh transporter on each attempt
const sendMailSafe = async (mailOptions) => {
    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const transporter = createTransporter();
        if (!transporter) throw new Error('Email credentials not configured');

        try {
            const result = await transporter.sendMail(mailOptions);
            console.log(`[EMAIL] Sent to ${mailOptions.to} (attempt ${attempt})`);
            transporter.close();
            return result;
        } catch (err) {
            lastError = err;
            console.error(`[EMAIL] Attempt ${attempt} failed:`, err.message);
            try { transporter.close(); } catch (_) { }

            // Only retry on transient errors
            if (attempt < maxRetries && (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT' || err.code === 'ESOCKET')) {
                await new Promise(r => setTimeout(r, 1000)); // wait 1s before retry
            }
        }
    }

    throw lastError;
};

// Generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        // Check if user already exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

        // Save OTP to DB
        const { error } = await supabase
            .from('email_verifications')
            .insert([{ email, otp, expires_at: expiresAt.toISOString(), verified: false }]);

        if (error) throw error;

        // Check email credentials exist
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('[OTP] Mock mode (no email credentials):', otp);
            return res.json({ message: 'OTP sent (Check server console for mock)' });
        }

        // Send Email with retry logic
        await sendMailSafe({
            from: `"Money Miners" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Money Miners - Your Verification Code',
            html: `
                <div style="font-family: 'Arial', sans-serif; max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a, #1a1a1a); color: #fff; border-radius: 16px; overflow: hidden; border: 2px solid #10B981;">
                    <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px; color: #000; font-weight: 800;">Money Miners</h1>
                        <p style="margin: 8px 0 0; color: #000; opacity: 0.8;">Email Verification</p>
                    </div>
                    <div style="padding: 40px 30px; text-align: center;">
                        <p style="color: #ddd; font-size: 16px; margin-bottom: 25px;">Your verification code is:</p>
                        <div style="background: rgba(16,185,129,0.15); border: 2px solid #10B981; border-radius: 12px; padding: 20px; display: inline-block; letter-spacing: 8px; font-size: 36px; font-weight: 800; color: #10B981;">
                            ${otp}
                        </div>
                        <p style="color: #888; font-size: 14px; margin-top: 25px;">This code expires in <strong style="color:#FFD700;">10 minutes</strong>.</p>
                        <p style="color: #666; font-size: 13px; margin-top: 20px;">If you did not request this code, please ignore this email.</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
                        <p style="margin: 0; color: #666; font-size: 12px;">© Money Miners. All rights reserved.</p>
                    </div>
                </div>
            `
        });

        res.json({ message: 'OTP sent successfully to your email.' });

    } catch (error) {
        console.error('[OTP ERROR]', error.message, error.code || '');
        res.status(500).json({
            message: 'Failed to send OTP. Please try again in a moment.',
            error_code: error.code || 'UNKNOWN_ERROR',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.register = async (req, res) => {
    try {
        const { full_name, username, email, phone, password, otp } = req.body;

        // 1. Verify OTP
        const { data: verificationData, error: verifyError } = await supabase
            .from('email_verifications')
            .select('*')
            .eq('email', email)
            .eq('otp', otp)
            .gte('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (verifyError || !verificationData) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // 2. Check if user exists (Double check)
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 3. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create User
        const newUser = await User.create({
            full_name,
            username,
            email,
            phone,
            password: hashedPassword
        });

        // 5. Cleanup OTPs (Optional but good practice)
        await supabase.from('email_verifications').delete().eq('email', email);

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                full_name: user.full_name
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
