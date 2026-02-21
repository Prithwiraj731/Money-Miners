const Purchase = require('../models/Purchase');
const { Resend } = require('resend');

const getResend = () => {
    if (!process.env.RESEND_API_KEY) return null;
    return new Resend(process.env.RESEND_API_KEY);
};

// Send Purchase Email Helper
const sendPurchaseEmail = async (order, isAdmin = false) => {
    const resend = getResend();
    if (!resend) return;

    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'prithwi1016@gmail.com';
        const toEmail = isAdmin ? adminEmail : order.email;
        const subject = isAdmin ? `💰 NEW COURSE ENROLMENT: ${order.course_title}` : `✅ Order Received: ${order.course_title}`;

        const html = isAdmin ? `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                <h2 style="color: #10B981;">New Enrolment Received</h2>
                <p><strong>Course:</strong> ${order.course_title}</p>
                <p><strong>Student:</strong> ${order.full_name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Phone:</strong> ${order.phone}</p>
                <p><strong>Amount:</strong> ₹${order.amount}</p>
                <p><strong>Transaction ID:</strong> <span style="background: #eee; padding: 2px 6px;">${order.transaction_id}</span></p>
                <hr/>
                <p>Please login to the Admin Panel to verify this payment.</p>
            </div>
        ` : `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #10B981; border-radius: 8px; background: #fafafa;">
                <h2 style="color: #10B981;">Your Registration is Pending Verification</h2>
                <p>Hello <strong>${order.full_name}</strong>,</p>
                <p>Thank you for enrolling in <strong>${order.course_title}</strong>. We have received your payment information.</p>
                <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #ddd; margin: 20px 0;">
                    <p><strong>Order Details:</strong></p>
                    <p>Total Amount: ₹${order.amount}</p>
                    <p>Transaction ID: ${order.transaction_id}</p>
                </div>
                <p>Our team will manually verify the payment details. Once verified (usually within 24 hours), the course will be unlocked in your dashboard.</p>
                <p>If you have questions, feel free to reply to this email.</p>
                <br/>
                <p>Happy Learning!<br/><strong>Money Miners Team</strong></p>
            </div>
        `;

        await resend.emails.send({
            from: 'Money Miners <noreply@moneyminers.in>',
            to: toEmail,
            subject: subject,
            html: html
        });
    } catch (err) {
        console.error('[PURCHASE EMAIL ERROR]', err.message);
    }
};

// Send Status Update Email Helper
const sendStatusUpdateEmail = async (order) => {
    const resend = getResend();
    if (!resend) return;

    try {
        const isSuccess = order.status === 'success';
        const subject = isSuccess ? `✨ Course Unlocked: ${order.course_title}` : `⚠️ Update on your Enrolment: ${order.course_title}`;

        const html = isSuccess ? `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #10B981; border-radius: 8px;">
                <h2 style="color: #10B981;">Success! Your Course is Unlocked</h2>
                <p>Hello <strong>${order.full_name}</strong>,</p>
                <p>Great news! We have verified your payment for <strong>${order.course_title}</strong>.</p>
                <p>The course is now available in your Dashboard. You can start learning immediately.</p>
                <a href="https://moneyminers.in/dashboard" style="display: inline-block; background: #10B981; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px;">GO TO DASHBOARD</a>
                <br/><br/>
                <p>Happy Learning!<br/><strong>Money Miners Team</strong></p>
            </div>
        ` : `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #f43f5e; border-radius: 8px;">
                <h2 style="color: #f43f5e;">Update Regarding your Enrolment</h2>
                <p>Hello <strong>${order.full_name}</strong>,</p>
                <p>We encountered an issue while verifying your payment for <strong>${order.course_title}</strong>.</p>
                <p><strong>Current Status:</strong> ${order.status.toUpperCase()}</p>
                <p>Please contact our support team at prithwi1016@gmail.com with your transaction details for assistance.</p>
                <br/>
                <p>Best regards,<br/><strong>Money Miners Team</strong></p>
            </div>
        `;

        await resend.emails.send({
            from: 'Money Miners <noreply@moneyminers.in>',
            to: order.email,
            subject: subject,
            html: html
        });
    } catch (err) {
        console.error('[STATUS EMAIL ERROR]', err.message);
    }
};

// 1. Submit Purchase
exports.submitPurchase = async (req, res) => {
    try {
        const { course_id, course_title, full_name, email, phone, amount, transaction_id } = req.body;
        const user_id = req.user.id;

        if (!transaction_id) {
            return res.status(400).json({ message: 'Transaction ID is required' });
        }

        const newPurchase = await Purchase.create({
            user_id,
            course_id,
            course_title,
            full_name,
            email,
            phone,
            amount,
            transaction_id,
            status: 'pending'
        });

        // Send Emails (Non-blocking)
        sendPurchaseEmail(newPurchase, true); // To Admin
        sendPurchaseEmail(newPurchase, false); // To User

        res.status(201).json({
            message: 'Purchase request submitted successfully! Pending verification.',
            purchase: newPurchase
        });
    } catch (error) {
        console.error('Submit Purchase Error:', error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
};

// 2. Get User Purchases
exports.getUserPurchases = async (req, res) => {
    try {
        const userId = req.user.id;
        const purchases = await Purchase.getByUserId(userId);
        res.json({ purchases });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Admin: Get All Purchases
exports.getAllPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.getAll();
        res.json({ purchases });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Admin: Update Status
exports.updatePurchaseStatus = async (req, res) => {
    try {
        const { purchaseId, status } = req.body;
        const updatedPurchase = await Purchase.updateStatus(purchaseId, status);

        // Send Confirmation Email for Success/Update
        sendStatusUpdateEmail(updatedPurchase);

        res.json({ message: `Status updated to ${status}`, purchase: updatedPurchase });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
