import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import './AllCourses.css';

const AllCourses = () => {
    const navigate = useNavigate();

    const getLevelColor = (level) => {
        switch (level) {
            case 'Beginner': return '#10B981';
            case 'Intermediate': return '#F59E0B';
            case 'Advanced': return '#EF4444';
            case 'All Levels': return '#8B5CF6';
            default: return '#10B981';
        }
    };

    return (
        <div className="all-courses-page">
            {/* Hero Section */}
            <section className="courses-hero">
                <div className="courses-hero-glow courses-hero-glow-1" />
                <div className="courses-hero-glow courses-hero-glow-2" />
                <div className="courses-hero-content">
                    <motion.p
                        className="courses-hero-tag"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        EXPLORE OUR PROGRAMS
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Our <span className="text-green">Courses</span>
                    </motion.h1>
                    <motion.p
                        className="courses-hero-desc"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        From fundamentals to advanced institutional strategies — master the markets with comprehensive, hands-on courses designed by professional traders.
                    </motion.p>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="courses-grid-section">
                <div className="courses-grid-container">
                    {coursesData.map((course, index) => (
                        <motion.div
                            key={course.id}
                            className="course-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Thumbnail */}
                            <div className="course-card-image">
                                <img src={course.thumbnail} alt={course.title} loading="lazy" />
                                <div className="course-card-badge" style={{ background: getLevelColor(course.level) }}>
                                    {course.level}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="course-card-body">
                                <h3 className="course-card-title">{course.title}</h3>
                                <p className="course-card-desc">{course.shortDesc}</p>

                                {/* Meta */}
                                <div className="course-card-meta">
                                    <div className="course-card-meta-item">
                                        <Clock size={15} />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="course-card-meta-item">
                                        <BookOpen size={15} />
                                        <span>{course.modules.length} Modules</span>
                                    </div>
                                </div>

                                {/* Price + CTA */}
                                <div className="course-card-footer">
                                    <div className="course-card-price">
                                        <span className="price-currency">₹</span>
                                        <span className="price-amount">{course.price.toLocaleString()}</span>
                                    </div>
                                    <motion.button
                                        className="course-card-btn"
                                        onClick={() => navigate(`/courses/${course.id}`)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View Course <ArrowRight size={16} />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="courses-cta">
                <motion.div
                    className="courses-cta-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2>Not Sure Which Course Is Right for You?</h2>
                    <p>Reach out to our team for personalized guidance based on your experience and goals.</p>
                    <motion.button
                        className="courses-cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                    >
                        Get in Touch <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default AllCourses;
