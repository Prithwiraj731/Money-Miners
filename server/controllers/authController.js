const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const supabase = require('../config/supabase');

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

        // Send Email
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Money Miners - Your Verification Code',
                text: `Your verification code is: ${otp}. It expires in 10 minutes.`
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
