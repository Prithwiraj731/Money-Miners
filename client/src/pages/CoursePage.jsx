import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft, Clock, BarChart3, BookOpen, Award, ShoppingCart } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import API_URL from '../config/api';
import './CoursePage.css';

const CoursePage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const course = coursesData.find(c => c.id === courseId);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [inCart, setInCart] = useState(false);

    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('token');

    // Add to cart function
    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            setMessage({ text: 'Please login to add courses to cart', type: 'error' });
            setTimeout(() => navigate('/auth'), 2000);
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ courseId: course.id })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add to cart');
            }

            setMessage({ text: 'Course added to cart!', type: 'success' });
            setInCart(true);
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);

        } catch (error) {
            setMessage({ text: error.message, type: 'error' });
            setTimeout(() => setMessage({ text: '', type: '' }), 3000);
        } finally {
            setLoading(false);
        }
    };

    if (!course) {
        return (
            <div className="course-not-found">
                <h2>Course Not Found</h2>
                <button onClick={() => navigate('/')}>Return to Home</button>
            </div>
        );
    }

    return (
        <div className="course-page">
            {/* Hero Section */}
            <section className="course-hero">
                <div className="course-hero-overlay"></div>
                <div className="container">
                    <motion.button
                        className="back-btn"
                        onClick={() => navigate('/')}
                        whileHover={{ x: -5 }}
                    >
                        <ArrowLeft size={20} />
                        Back to Home
                    </motion.button>

                    <div className="course-hero-content">
                        <motion.div
                            className="course-hero-left"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="course-level-badge">{course.level}</div>
                            <h1>{course.title}</h1>
                            <p className="course-hero-desc">{course.description}</p>

                            <div className="course-meta">
                                <div className="meta-item">
                                    <Clock size={20} />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="meta-item">
                                    <BarChart3 size={20} />
                                    <span>{course.level}</span>
                                </div>
                                <div className="meta-item">
                                    <BookOpen size={20} />
                                    <span>{course.modules.length} Modules</span>
                                </div>
                            </div>

                            <div className="course-price-section">
                                <div className="price-tag">
                                    <span className="price-label">Course Fee</span>
                                    <span className="price-value">₹{course.price.toLocaleString()}</span>
                                </div>
                                <div className="course-action-buttons">
                                    <motion.button
                                        className="btn-enroll"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigate('/contact')}
                                    >
                                        Enroll Now
                                    </motion.button>
                                    <motion.button
                                        className={`btn-cart ${inCart ? 'in-cart' : ''}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleAddToCart}
                                        disabled={loading || inCart}
                                    >
                                        <ShoppingCart size={20} />
                                        {loading ? 'Adding...' : inCart ? 'In Cart' : 'Add to Cart'}
                                    </motion.button>
                                </div>
                            </div>

                            {message.text && (
                                <motion.div
                                    className={`course-message ${message.type}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {message.text}
                                </motion.div>
                            )}
                        </motion.div>

                        <motion.div
                            className="course-hero-right"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="course-image-wrapper">
                                <img src={course.thumbnail} alt={course.title} />
                                <div className="image-glow"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="what-you-learn-section">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>What You'll Learn</h2>
                        <div className="learn-grid">
                            {course.whatYouLearn.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="learn-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Check className="check-icon" />
                                    <span>{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Course Curriculum */}
            <section className="curriculum-section">
                <div className="container">
                    <motion.div
                        className="section-header-curriculum"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Award size={40} className="curriculum-icon" />
                        <h2>Course Curriculum</h2>
                        <p>Comprehensive modules designed to take you from beginner to expert</p>
                    </motion.div>

                    <div className="modules-list">
                        {course.modules.map((module, moduleIndex) => (
                            <motion.div
                                key={moduleIndex}
                                className="module-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: moduleIndex * 0.1 }}
                            >
                                <div className="module-header">
                                    <div className="module-number">Module {moduleIndex + 1}</div>
                                    <h3>{module.title}</h3>
                                </div>
                                <ul className="lessons-list">
                                    {module.lessons.map((lesson, lessonIndex) => (
                                        <motion.li
                                            key={lessonIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: lessonIndex * 0.05 }}
                                        >
                                            <Check size={16} className="lesson-check" />
                                            {lesson}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="course-cta-section">
                <div className="container">
                    <motion.div
                        className="cta-box-course"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join hundreds of successful traders who transformed their financial future</p>
                        <div className="cta-actions">
                            <motion.button
                                className="btn-primary-cta"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/contact')}
                            >
                                Enroll for ₹{course.price.toLocaleString()}
                            </motion.button>
                            <motion.button
                                className="btn-secondary-cta"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/contact')}
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default CoursePage;
