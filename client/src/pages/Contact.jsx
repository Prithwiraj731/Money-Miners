import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../config/api';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        secondary_phone: '',
        address: '',
        query: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you shortly.' });
                setFormData({
                    full_name: '',
                    email: '',
                    phone: '',
                    secondary_phone: '',
                    address: '',
                    query: ''
                });
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Server connection failed. Please try again later.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-page">
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>

            <motion.div
                className="contact-container"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="contact-wrapper">
                    {/* Left Panel: Contact Info */}
                    <div className="contact-info-panel">
                        <div className="info-content">
                            <h2>Let's talk business.</h2>
                            <p className="subtitle">Have anything in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>

                            <div className="info-items">
                                <div className="info-item">
                                    <div className="icon-box"><Mail size={20} /></div>
                                    <div className="item-text">
                                        <span className="label">Email Us</span>
                                        <p>tyaseen500@gmail.com</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="icon-box"><Phone size={20} /></div>
                                    <div className="item-text">
                                        <span className="label">Call Us</span>
                                        <p>+91 76673 07696</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <div className="icon-box"><MapPin size={20} /></div>
                                    <div className="item-text">
                                        <span className="label">Visit Us</span>
                                        <p>Barasat, North 24 Parganas, West Bengal, 700126, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Form */}
                    <div className="contact-form-panel">
                        <div className="form-header">
                            <h3>Get In Touch With Us</h3>
                        </div>

                        {status.message && (
                            <motion.div
                                className={`status-message ${status.type}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                {status.message}
                            </motion.div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="full_name">Full Name</label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="secondary_phone">Secondary Phone</label>
                                    <input
                                        type="tel"
                                        id="secondary_phone"
                                        name="secondary_phone"
                                        value={formData.secondary_phone}
                                        onChange={handleChange}
                                        placeholder="Optional"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="Full street address"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="query">Your Message</label>
                                <textarea
                                    id="query"
                                    name="query"
                                    value={formData.query}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help you today?"
                                />
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                {!isSubmitting && <Send size={18} />}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
