import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, Clock, BarChart3, LogOut } from 'lucide-react';
import { coursesData } from '../data/coursesData';
import API_URL from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/auth');
        } else {
            try {
                setUser(JSON.parse(userData));
                fetchCart(token);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem('user');
                navigate('/auth');
            }
        }
    }, [navigate]);

    const fetchCart = async (token) => {
        try {
            const response = await fetch(`${API_URL}/api/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch cart');

            const data = await response.json();
            setCart(data.cart || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/cart/${courseId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Failed to remove from cart');

            setCart(cart.filter(item => item.course_id !== courseId));
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Failed to remove course from cart');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        navigate('/');
    };

    if (!user) return null;

    // Get course details for cart items
    const cartCourses = cart.map(item => {
        const course = coursesData.find(c => c.id === item.course_id);
        return { ...course, cartId: item.id };
    }).filter(Boolean);

    return (
        <div className="dashboard-new">
            {/* Main Content */}
            <main className="dashboard-main">
                <div className="container">
                    {/* Welcome Section */}
                    <motion.div
                        className="welcome-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="welcome-content">
                            <div>
                                <h1>Welcome back, <span className="username-highlight">{user.username}</span>! 👋</h1>
                                <p>Your cart has {cartCourses.length} {cartCourses.length === 1 ? 'course' : 'courses'}</p>
                            </div>
                            <button className="logout-btn-dash" onClick={handleLogout} title="Logout">
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </motion.div>

                    {/* Cart Section */}
                    <div className="cart-section">
                        <div className="section-header-dash">
                            <div className="title-with-icon">
                                <ShoppingCart size={28} />
                                <h2>Your Cart</h2>
                            </div>
                            <span className="course-count">{cartCourses.length} Courses</span>
                        </div>

                        {loading ? (
                            <div className="loading-state">
                                <div className="loader"></div>
                                <p>Loading your cart...</p>
                            </div>
                        ) : cartCourses.length === 0 ? (
                            <motion.div
                                className="empty-cart"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <ShoppingCart size={64} />
                                <h3>Your cart is empty</h3>
                                <p>Start adding courses to your cart and begin your learning journey!</p>
                                <button className="btn-browse" onClick={() => navigate('/#courses')}>
                                    Browse Courses
                                </button>
                            </motion.div>
                        ) : (
                            <div className="cart-grid">
                                <AnimatePresence>
                                    {cartCourses.map((course, index) => (
                                        <motion.div
                                            key={course.cartId}
                                            className="cart-course-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -8 }}
                                        >
                                            <div className="course-image-dash">
                                                <img src={course.thumbnail} alt={course.title} />
                                                <div className="course-level-badge-dash">{course.level}</div>
                                            </div>

                                            <div className="course-content-dash">
                                                <h3>{course.title}</h3>
                                                <p className="course-desc-dash">{course.shortDesc}</p>

                                                <div className="course-meta-dash">
                                                    <div className="meta-item-dash">
                                                        <Clock size={16} />
                                                        <span>{course.duration}</span>
                                                    </div>
                                                    <div className="meta-item-dash">
                                                        <BarChart3 size={16} />
                                                        <span>{course.level}</span>
                                                    </div>
                                                </div>

                                                <div className="course-footer-dash">
                                                    <div className="price-dash">₹{course.price.toLocaleString()}</div>
                                                    <div className="course-actions-dash">
                                                        <motion.button
                                                            className="btn-buy-dash"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => navigate('/contact')}
                                                        >
                                                            Buy Now
                                                        </motion.button>
                                                        <motion.button
                                                            className="btn-remove"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleRemoveFromCart(course.id)}
                                                        >
                                                            <Trash2 size={18} />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
