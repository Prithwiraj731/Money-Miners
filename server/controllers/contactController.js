const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

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

        // 2. Send Email
        // Only attempt to send email if credentials are present to avoid crashing validation
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'tyaseen500@gmail.com',
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

            await transporter.sendMail(mailOptions);
        } else {
            console.warn('Email credentials not found in .env. Email not sent.');
        }

        res.status(201).json({ message: 'Query submitted successfully!', contact: newContact });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ error: 'Failed to submit query. Please try again.' });
    }
};

exports.sendExclusiveInquiry = async (req, res) => {
    try {
        const { name, email, phone, plan, query } = req.body;

        if (!name || !email || !phone || !plan) {
            return res.status(400).json({ error: 'Please fill all required fields.' });
        }

        // Send Email to Admin
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'tyaseen500@gmail.com', // Admin Email
                subject: `💎 EXCLUSIVE CHANNEL INQUIRY: ${plan} Plan`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #10B981;">New Exclusive Channel Inquiry</h2>
                        <p><strong>Selected Plan:</strong> <span style="font-size: 1.2em; color: #d4af37;">${plan}</span></p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <br/>
                        <h3>User Query:</h3>
                        <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #10B981;">${query || 'No specific query provided.'}</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Inquiry sent successfully!' });
        } else {
            console.warn('Email credentials missing.');
            return res.status(500).json({ error: 'Server misconfiguration: Email credentials missing.' });
        }

    } catch (error) {
        console.error('Exclusive inquiry error:', error);
        return res.status(500).json({ error: 'Failed to send inquiry.' });
    }
};
