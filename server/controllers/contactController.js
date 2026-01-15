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
