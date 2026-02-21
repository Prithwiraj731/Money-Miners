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
    const [purchases, setPurchases] = useState([]);
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
                fetchPurchases(token);
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem('user');
                navigate('/auth');
            }
        }
    }, [navigate]);

    const fetchCart = async (token) => {
        try {
            const targetUrl = API_URL.includes('localhost') && !window.location.hostname.includes('localhost')
                ? '/api/cart'
                : `${API_URL}/api/cart`;

            const response = await fetch(targetUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch cart');
            const data = await response.json();
            setCart(data.cart || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const fetchPurchases = async (token) => {
        try {
            const targetUrl = API_URL.includes('localhost') && !window.location.hostname.includes('localhost')
                ? '/api/purchases/user'
                : `${API_URL}/api/purchases/user`;

            const response = await fetch(targetUrl, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch purchases');
            const data = await response.json();
            setPurchases(data.purchases || []);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async (courseId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/cart/${courseId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to remove from cart');
            setCart(cart.filter(item => item.course_id !== courseId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
        navigate('/');
    };

    if (!user) return null;

    const cartCourses = cart.map(item => {
        const course = coursesData.find(c => c.id === item.course_id);
        return course ? { ...course, cartId: item.id } : null;
    }).filter(Boolean);

    return (
        <div className="dashboard-new">
            <main className="dashboard-main">
                <div className="container">
                    <motion.div className="welcome-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="welcome-content">
                            <div>
                                <h1>Welcome back, <span className="username-highlight">{user.username}</span>! 👋</h1>
                                <p>Manage your courses and learning journey below.</p>
                            </div>
                            <button className="logout-btn-dash" onClick={handleLogout}>
                                <LogOut size={20} /> Logout
                            </button>
                        </div>
                    </motion.div>

                    {/* My Enrolments Section */}
                    <div className="cart-section" style={{ marginBottom: '60px' }}>
                        <div className="section-header-dash">
                            <div className="title-with-icon">
                                <BarChart3 size={28} color="#10B981" />
                                <h2>My Enrolments</h2>
                            </div>
                            <span className="course-count">{purchases.length} Orders</span>
                        </div>

                        {purchases.length === 0 ? (
                            <div className="empty-state-small">
                                <p>You haven't enrolled in any courses yet.</p>
                            </div>
                        ) : (
                            <div className="enrolments-list">
                                {purchases.map((order) => (
                                    <div key={order.id} className="enrolment-item">
                                        <div className="enrolment-info">
                                            <h3>{order.course_title}</h3>
                                            <div className="enrolment-meta">
                                                <span>TXN: {order.transaction_id}</span>
                                                <span>•</span>
                                                <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <div className={`status-badge ${order.status}`}>
                                            {order.status === 'success' ? 'Unlocked' : 'Pending Verification'}
                                        </div>
                                        {order.status === 'success' && (
                                            <button className="btn-start-learning" onClick={() => navigate(`/courses/${order.course_id}`)}>
                                                Start Learning
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Section */}
                    <div className="cart-section">
                        <div className="section-header-dash">
                            <div className="title-with-icon">
                                <ShoppingCart size={28} />
                                <h2>Your Cart</h2>
                            </div>
                        </div>

                        {loading ? (
                            <div className="loading-state"><div className="loader"></div></div>
                        ) : cartCourses.length === 0 ? (
                            <div className="empty-cart">
                                <ShoppingCart size={64} />
                                <h3>Your cart is empty</h3>
                                <button className="btn-browse" onClick={() => navigate('/courses')}>Browse Courses</button>
                            </div>
                        ) : (
                            <div className="cart-grid">
                                {cartCourses.map((course) => (
                                    <div key={course.cartId} className="cart-course-card">
                                        <div className="course-image-dash">
                                            <img src={course.thumbnail} alt={course.title} />
                                        </div>
                                        <div className="course-content-dash">
                                            <h3>{course.title}</h3>
                                            <div className="course-footer-dash">
                                                <div className="price-dash">₹{course.price.toLocaleString()}</div>
                                                <div className="course-actions-dash">
                                                    <button className="btn-buy-dash" onClick={() => navigate(`/checkout/${course.id}`)}>Buy Now</button>
                                                    <button className="btn-remove" onClick={() => handleRemoveFromCart(course.id)}><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
