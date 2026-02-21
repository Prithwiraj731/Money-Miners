import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, ShieldCheck, CreditCard, Send } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import API_URL from '../config/api';
import './Checkout.css';

const Checkout = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const course = coursesData.find(c => c.id === courseId);

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState({ full_name: '', email: '', phone: '' });
    const [transactionId, setTransactionId] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/auth');
            return;
        }

        try {
            const parsed = JSON.parse(userData);
            setUser({
                full_name: parsed.full_name || '',
                email: parsed.email || '',
                phone: parsed.phone || ''
            });
        } catch (e) {
            navigate('/auth');
        }
    }, [navigate]);

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (!transactionId) {
            setMessage({ text: 'Please enter your Transaction ID', type: 'error' });
            return;
        }

        setSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/purchases/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    course_id: course.id,
                    course_title: course.title,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone,
                    amount: course.price,
                    transaction_id: transactionId
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Submission failed');

            setMessage({ text: 'Order submitted successfully! Redirecting to dashboard...', type: 'success' });
            setTimeout(() => navigate('/dashboard'), 3000);

        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
            setSubmitting(false);
        }
    };

    if (!course) return <div className="checkout-not-found">Course not found</div>;

    return (
        <div className="checkout-page">
            <div className="container">
                <motion.button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                    whileHover={{ x: -5 }}
                >
                    <ArrowLeft size={20} /> Back
                </motion.button>

                <div className="checkout-grid">
                    {/* Left: QR and Instructions */}
                    <div className="checkout-payment-section">
                        <motion.div
                            className="payment-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="payment-header">
                                <CreditCard size={24} color="#10B981" />
                                <h2>Payment Details</h2>
                            </div>

                            <div className="qr-container">
                                <img src="/payment-qr.jpeg" alt="Payment QR" className="payment-qr-img" />
                                <div className="qr-overlay">
                                    <a href="/payment-qr.jpeg" download="MoneyMiners-QR.jpeg" className="download-qr-btn">
                                        <Download size={18} /> Download QR
                                    </a>
                                </div>
                            </div>

                            <div className="payment-instructions">
                                <h3>Steps to Pay:</h3>
                                <ol>
                                    <li>Scan the QR code using GPay, PhonePe, or Paytm.</li>
                                    <li>Pay the exact amount: <strong>₹{course.price.toLocaleString()}</strong></li>
                                    <li>Copy the <strong>Transaction ID / UTR Number</strong>.</li>
                                    <li>Submit the ID in the form on the right.</li>
                                </ol>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Confirmation Form */}
                    <div className="checkout-form-section">
                        <motion.div
                            className="confirmation-card"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="course-summary">
                                <span className="label">Enrolling in:</span>
                                <h3>{course.title}</h3>
                                <div className="total-price">
                                    <span className="price-label">Total to Pay:</span>
                                    <span className="price-val">₹{course.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmitOrder} className="checkout-form">
                                <div className="input-group">
                                    <label>Full Name</label>
                                    <input type="text" value={user.full_name} disabled className="disabled-input" />
                                </div>
                                <div className="input-group">
                                    <label>Email Address</label>
                                    <input type="email" value={user.email} disabled className="disabled-input" />
                                </div>
                                <div className="input-group">
                                    <label>Phone Number</label>
                                    <input type="text" value={user.phone} disabled className="disabled-input" />
                                </div>
                                <div className="input-group highlight">
                                    <label>Transaction ID / UTR Number *</label>
                                    <input
                                        type="text"
                                        placeholder="Enter 12-digit Transaction ID"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        required
                                    />
                                    <small>Payment will be verified manually by admin.</small>
                                </div>

                                {message.text && (
                                    <div className={`form-message ${message.type}`}>
                                        {message.text}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn-submit-order"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Verifying...' : 'Submit Order'}
                                    <Send size={18} />
                                </button>

                                <div className="secure-badge">
                                    <ShieldCheck size={16} />
                                    Secure Manual Verification Process
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
