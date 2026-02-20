const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const supabase = require('../config/supabase');

// ============================================================
// SINGLETON TRANSPORTER — Reuse one SMTP connection for all emails
// ============================================================
let transporter = null;

const getTransporter = () => {
    if (!transporter && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            pool: true,        // Use connection pooling for speed
            maxConnections: 5,  // Allow up to 5 simultaneous connections
            maxMessages: 100,   // Send up to 100 messages per connection
            tls: {
                rejectUnauthorized: false // Prevent TLS issues in some environments
            }
        });
    }
    return transporter;
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

        // Send Email using the singleton transporter
        const mailer = getTransporter();
        if (mailer) {
            await mailer.sendMail({
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
        } else {
            console.log('OTP (Mock):', otp);
            res.json({ message: 'OTP sent (Check server console for mock)' });
        }

    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
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
