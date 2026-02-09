import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Check, X, Loader } from 'lucide-react';
import axios from 'axios';
import API_URL from '../config/api';
import './ExclusiveChannel.css';

const ExclusiveChannel = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        query: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const plans = [
        {
            title: 'Quarterly',
            duration: '3 Months',
            price: '₹3,000',
            features: ['Daily Premium Signals', 'Risk Management Guide', '24/7 Support', 'Entry & Exit Points'],
            color: '#10B981'
        },
        {
            title: 'Half-Yearly',
            duration: '6 Months',
            price: '₹6,000',
            features: ['All Quarterly Features', 'Long-term Analysis', 'Portfolio Review', 'Webinar Access'],
            featured: true,
            color: '#FFD700'
        },
        {
            title: 'Yearly',
            duration: '1 Year',
            price: '₹10,000',
            features: ['All Half-Yearly Features', '1-on-1 Mentorship Session', 'Exclusive Market Reports', 'Priority Support'],
            color: '#3B82F6'
        },
        {
            title: 'Lifetime',
            duration: 'Lifetime Access',
            price: '₹20,000',
            features: ['Everything Unlimited', 'Direct CEO Access', 'Private Inner Circle', 'Automated Trading Setup'],
            color: '#8B5CF6'
        }
    ];

    const openModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
        setStatus({ type: '', message: '' });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', query: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post(`${API_URL}/api/contact/exclusive-inquiry`, {
                ...formData,
                plan: selectedPlan.title
            });
            setStatus({ type: 'success', message: response.data.message });
            setTimeout(closeModal, 2000);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.error || 'Failed to submit. Try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="exclusive-page">
            <div className="exclusive-bg"></div>

            <div className="container">
                <motion.div
                    className="exclusive-hero"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="premium-tag"><Crown size={16} /> PREMIUM ACCESS</span>
                    <h1>Unlock Exclusive Signals</h1>
                    <p>Join the elite circle of traders. Get high-accuracy signals, expert analysis, and maximize your profits with our tailored plans.</p>
                </motion.div>

                <div className="plans-grid">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            {plan.featured && <div className="popular-tag">MOST POPULAR</div>}
                            <div className="card-header">
                                <h3>{plan.title}</h3>
                                <div className="price">
                                    <span className="price-value">{plan.price}</span>
                                    <span className="price-duration">/ {plan.duration}</span>
                                </div>
                            </div>
                            <ul className="features-list">
                                {plan.features.map((feature, i) => (
                                    <li key={i}><Check size={16} className="check-icon" /> {feature}</li>
                                ))}
                            </ul>
                            <button className="btn-select-plan" onClick={() => openModal(plan)}>
                                Choose {plan.title}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <button className="close-modal" onClick={closeModal}><X size={24} /></button>
                            <h2>Join {selectedPlan?.title} Plan</h2>
                            <p className="modal-subtitle">Fill in your details to get started.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 9876543210" />
                                </div>
                                <div className="form-group">
                                    <label>Any Query? (Optional)</label>
                                    <textarea name="query" value={formData.query} onChange={handleChange} placeholder="Ask us anything..." rows="3"></textarea>
                                </div>

                                {status.message && (
                                    <div className={`status-msg ${status.type}`}>{status.message}</div>
                                )}

                                <button type="submit" className="btn-submit-inquiry" disabled={loading}>
                                    {loading ? <Loader className="spin" size={20} /> : 'Submit Inquiry'}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExclusiveChannel;
