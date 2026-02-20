const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

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
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
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

            if (attempt < maxRetries && (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT' || err.code === 'ESOCKET')) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }

    throw lastError;
};

// Helper to get admin email
const getAdminEmail = () => process.env.ADMIN_EMAIL || 'prithwi1016@gmail.com';

exports.submitContactForm = async (req, res) => {
    try {
        const { full_name, email, phone, secondary_phone, address, query } = req.body;

        // Validation (Basic)
        if (!full_name || !email || !phone || !address || !query) {
            return res.status(400).json({ error: 'Please fill in all required fields' });
        }

        // 1. Save to Database
        const newContact = await Contact.create({
            full_name,
            email,
            phone,
            secondary_phone,
            address,
            query
        });

        // 2. Send Emails (don't fail the whole request if user confirmation fails)
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const adminEmail = getAdminEmail();

            // Admin notification email
            const adminMailOptions = {
                from: `"Money Miners" <${process.env.EMAIL_USER}>`,
                to: adminEmail,
                subject: `New Contact Query from ${full_name}`,
                html: `
                    <h2>New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${full_name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Secondary Phone:</strong> ${secondary_phone || 'N/A'}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <br/>
                    <h3>Query:</h3>
                    <p>${query}</p>
                `
            };

            // User confirmation email
            const userMailOptions = {
                from: `"Money Miners" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: '✅ Thank You for Contacting Money Miners',
                html: `
                    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #fff; border-radius: 16px; overflow: hidden; border: 2px solid #10B981;">
                        <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px; text-align: center;">
                            <h1 style="margin: 0; font-size: 32px; color: #000; font-weight: 800;">Thank You, ${full_name}!</h1>
                            <p style="margin: 10px 0 0 0; color: #000; font-size: 16px; opacity: 0.9;">We've received your message</p>
                        </div>
                        
                        <div style="padding: 40px 30px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <div style="display: inline-block; background: rgba(16, 185, 129, 0.2); border: 2px solid #10B981; border-radius: 50%; width: 80px; height: 80px; line-height: 80px; font-size: 40px;">✓</div>
                            </div>
                            
                            <h2 style="color: #10B981; text-align: center; margin-bottom: 20px;">Your Message Has Been Received</h2>
                            
                            <p style="color: #ddd; line-height: 1.8; text-align: center; font-size: 16px;">
                                Thank you for reaching out to Money Miners. We appreciate your interest!
                            </p>
                            
                            <div style="background: rgba(255, 215, 0, 0.1); border-left: 4px solid #FFD700; padding: 20px; margin: 30px 0; border-radius: 8px;">
                                <h3 style="margin: 0 0 10px 0; color: #FFD700; font-size: 18px;">What Happens Next?</h3>
                                <ul style="color: #ddd; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
                                    <li>Our team will review your query within 24 hours</li>
                                    <li>We'll contact you via email or phone with a response</li>
                                    <li>You'll receive expert guidance tailored to your needs</li>
                                </ul>
                            </div>
                            
                            <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                                <h3 style="color: #10B981; margin-top: 0;">Your Message</h3>
                                <p style="color: #ddd; line-height: 1.6; margin: 0; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px;">${query}</p>
                            </div>
                            
                            <div style="text-align: center; margin-top: 35px;">
                                <p style="color: #aaa; font-size: 14px; margin: 0 0 15px 0;">Need immediate assistance?</p>
                                <p style="margin: 5px 0;">
                                    <a href="mailto:${adminEmail}" style="color: #10B981; text-decoration: none; font-weight: 600;">📧 ${adminEmail}</a>
                                </p>
                                <p style="margin: 5px 0;">
                                    <a href="tel:+917667307696" style="color: #10B981; text-decoration: none; font-weight: 600;">📱 +91 76673 07696</a>
                                </p>
                            </div>
                        </div>
                        
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 25px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                            <p style="margin: 0 0 10px 0; color: #10B981; font-size: 20px; font-weight: 700;">Money Miners</p>
                            <p style="margin: 0; color: #888; font-size: 13px;">Your trusted partner in trading education and investment</p>
                            <div style="margin-top: 15px;">
                                <p style="margin: 0; color: #666; font-size: 12px;">This is an automated confirmation email. Please do not reply.</p>
                            </div>
                        </div>
                    </div>
                `
            };

            // Send both emails (allSettled so user-confirmation failure doesn't block admin notification)
            const results = await Promise.allSettled([
                sendMailSafe(adminMailOptions),
                sendMailSafe(userMailOptions)
            ]);

            results.forEach((r, i) => {
                if (r.status === 'rejected') {
                    console.error(`[CONTACT EMAIL] Email ${i + 1} failed:`, r.reason?.message);
                }
            });
        } else {
            console.warn('[CONTACT] Email credentials not found in env. Emails not sent.');
        }

        res.status(201).json({ message: 'Query submitted successfully! Check your email for confirmation.', contact: newContact });
    } catch (error) {
        console.error('[CONTACT ERROR]', error.message);
        res.status(500).json({
            error: 'Failed to submit query. Please try again.',
            error_code: error.code || 'UNKNOWN_ERROR'
        });
    }
};

exports.sendExclusiveInquiry = async (req, res) => {
    try {
        const { name, email, phone, plan, query } = req.body;

        if (!name || !email || !phone || !plan) {
            return res.status(400).json({ error: 'Please fill all required fields.' });
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('[EXCLUSIVE] Email credentials missing in environment.');
            return res.status(500).json({ error: 'Server misconfiguration: Email credentials missing.' });
        }

        const adminEmail = getAdminEmail();

        // 1. Send Email to Admin
        const adminMailOptions = {
            from: `"Money Miners" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `💎 EXCLUSIVE CHANNEL INQUIRY: ${plan} Plan`,
            html: `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #fff; border-radius: 16px; overflow: hidden; border: 2px solid #10B981;">
                    <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 30px; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px; color: #000;">💎 New Exclusive Inquiry</h1>
                    </div>
                    
                    <div style="padding: 40px 30px;">
                        <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10B981; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
                            <h2 style="margin: 0 0 10px 0; color: #FFD700; font-size: 24px;">Selected Plan: ${plan}</h2>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 12px; margin-bottom: 20px;">
                            <h3 style="color: #10B981; margin-top: 0;">Contact Information</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px 0; color: #aaa; width: 120px;"><strong>Name:</strong></td>
                                    <td style="padding: 12px 0; color: #fff;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; color: #aaa;"><strong>Email:</strong></td>
                                    <td style="padding: 12px 0; color: #fff;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 0; color: #aaa;"><strong>Phone:</strong></td>
                                    <td style="padding: 12px 0; color: #fff;">${phone}</td>
                                </tr>
                            </table>
                        </div>
                        
                        ${query ? `
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 12px;">
                            <h3 style="color: #10B981; margin-top: 0;">User Query</h3>
                            <p style="color: #ddd; line-height: 1.6; margin: 0;">${query}</p>
                        </div>
                        ` : ''}
                        
                        <div style="margin-top: 30px; padding-top: 25px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
                            <p style="color: #aaa; font-size: 14px; margin: 0;">Respond to this inquiry as soon as possible to maintain customer engagement.</p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; text-align: center;">
                        <p style="margin: 0; color: #888; font-size: 13px;">Money Miners - Exclusive Channel Management System</p>
                    </div>
                </div>
            `
        };

        // 2. Send Beautiful Confirmation Email to User
        const userMailOptions = {
            from: `"Money Miners" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '✅ Thank You for Your Interest in Money Miners Exclusive Channel',
            html: `
                <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); color: #fff; border-radius: 16px; overflow: hidden; border: 2px solid #10B981;">
                    <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 40px; text-align: center;">
                        <h1 style="margin: 0; font-size: 32px; color: #000; font-weight: 800;">Thank You, ${name}!</h1>
                        <p style="margin: 10px 0 0 0; color: #000; font-size: 16px; opacity: 0.9;">We've received your inquiry</p>
                    </div>
                    
                    <div style="padding: 40px 30px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div style="display: inline-block; background: rgba(16, 185, 129, 0.2); border: 2px solid #10B981; border-radius: 50%; width: 80px; height: 80px; line-height: 80px; font-size: 40px;">✓</div>
                        </div>
                        
                        <h2 style="color: #10B981; text-align: center; margin-bottom: 20px;">Your Inquiry Has Been Submitted</h2>
                        
                        <p style="color: #ddd; line-height: 1.8; text-align: center; font-size: 16px;">
                            Thank you for your interest in our <strong style="color: #FFD700;">${plan}</strong> exclusive channel plan.
                        </p>
                        
                        <div style="background: rgba(255, 215, 0, 0.1); border-left: 4px solid #FFD700; padding: 20px; margin: 30px 0; border-radius: 8px;">
                            <h3 style="margin: 0 0 10px 0; color: #FFD700; font-size: 18px;">What Happens Next?</h3>
                            <ul style="color: #ddd; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
                                <li>Our team will review your inquiry within 24 hours</li>
                                <li>We'll contact you via email or phone to discuss the plan details</li>
                                <li>You'll receive personalized investment strategies tailored to your goals</li>
                            </ul>
                        </div>
                        
                        <div style="background: rgba(255, 255, 255, 0.05); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
                            <h3 style="color: #10B981; margin-top: 0;">Your Submission Details</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px 0; color: #aaa; width: 140px;">Selected Plan:</td>
                                    <td style="padding: 10px 0; color: #FFD700; font-weight: bold;">${plan}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #aaa;">Contact Email:</td>
                                    <td style="padding: 10px 0; color: #fff;">${email}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #aaa;">Contact Phone:</td>
                                    <td style="padding: 10px 0; color: #fff;">${phone}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="text-align: center; margin-top: 35px;">
                            <p style="color: #aaa; font-size: 14px; margin: 0 0 15px 0;">Need immediate assistance?</p>
                            <p style="margin: 5px 0;">
                                <a href="mailto:${adminEmail}" style="color: #10B981; text-decoration: none; font-weight: 600;">📧 ${adminEmail}</a>
                            </p>
                            <p style="margin: 5px 0;">
                                <a href="tel:+917667307696" style="color: #10B981; text-decoration: none; font-weight: 600;">📱 +91 76673 07696</a>
                            </p>
                        </div>
                    </div>
                    
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 25px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                        <p style="margin: 0 0 10px 0; color: #10B981; font-size: 20px; font-weight: 700;">Money Miners</p>
                        <p style="margin: 0; color: #888; font-size: 13px;">Your trusted partner in trading education and investment</p>
                        <div style="margin-top: 15px;">
                            <p style="margin: 0; color: #666; font-size: 12px;">This is an automated confirmation email. Please do not reply.</p>
                        </div>
                    </div>
                </div>
            `
        };

        // Send both emails with retry logic
        const results = await Promise.allSettled([
            sendMailSafe(adminMailOptions),
            sendMailSafe(userMailOptions)
        ]);

        // Check if at least admin email succeeded
        if (results[0].status === 'rejected') {
            console.error('[EXCLUSIVE] Admin email failed:', results[0].reason?.message);
            throw results[0].reason;
        }

        if (results[1].status === 'rejected') {
            console.error('[EXCLUSIVE] User confirmation email failed:', results[1].reason?.message);
        }

        return res.status(200).json({
            message: 'Inquiry sent successfully! Check your email for confirmation.'
        });

    } catch (error) {
        console.error('[EXCLUSIVE ERROR]', error.message, error.code || '');
        return res.status(500).json({
            error: 'Failed to send inquiry. Please try again.',
            error_code: error.code || 'UNKNOWN_ERROR'
        });
    }
};

