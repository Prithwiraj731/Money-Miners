import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    // Registration Steps: 1 = Details, 2 = Verify OTP
    const [regStep, setRegStep] = useState(1);

    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '', // Added for validation
        otp: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on edit
    };

    // --- OTP LOGIC ---
    const handleSendOtp = async () => {
        if (!formData.email) {
            setError('Please enter your email first.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to send OTP');

            setOtpSent(true);
            setSuccess('OTP sent to ' + formData.email);
            setRegStep(2); // Move to OTP step visually if needed, or just show OTP field
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- SUBMIT LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // --- VALIDATION ---
        if (!isLogin) {
            if (formData.password !== formData.confirm_password) {
                setError("Passwords do not match!");
                return;
            }
            if (!otpSent) {
                setError("Please verify your email first.");
                return;
            }
        }

        setLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        const url = `http://localhost:5000${endpoint}`;

        try {
            const payload = isLogin
                ? { email: formData.email, password: formData.password }
                : formData; // Send everything including OTP

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (isLogin) {
                // Login Success
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user)); // Save user data
                // Dispatch basic event or force update might be needed if Navbar doesn't listen to storage
                window.dispatchEvent(new Event('storage'));
                navigate('/dashboard');
            } else {
                // Register Success
                setSuccess('Registration Successful! Please Login.');
                setIsLogin(true);
                setRegStep(1);
                setOtpSent(false);
                setFormData({ ...formData, password: '', confirm_password: '', otp: '' });
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <motion.div
                    className="auth-box"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="auth-subtitle">
                        {isLogin ? 'Log in to access your dashboard' : 'Join Money Miners today'}
                    </p>

                    {error && <div className="error-msg">{error}</div>}
                    {success && <div className="success-msg">{success}</div>}

                    <form onSubmit={handleSubmit}>

                        {!isLogin && (
                            <>
                                <div className="input-group">
                                    <User size={20} />
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Full Name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <User size={20} />
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <Phone size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        <div className="input-group email-group">
                            <Mail size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {!isLogin && !otpSent && (
                                <button
                                    type="button"
                                    className="btn-verify"
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                >
                                    {loading ? '...' : 'Verify'}
                                </button>
                            )}
                        </div>

                        {/* OTP Field - Only show if not login, or logic can be tweaked */}
                        {!isLogin && otpSent && (
                            <motion.div
                                className="input-group"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                            >
                                <ShieldCheck size={20} className="text-green" />
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Enter 6-digit OTP"
                                    value={formData.otp}
                                    onChange={handleChange}
                                    required
                                    maxLength={6}
                                />
                            </motion.div>
                        )}

                        <div className="input-group">
                            <Lock size={20} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="input-group">
                                <Lock size={20} />
                                <input
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Confirm Password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <button className="btn btn-primary full-width" disabled={loading}>
                            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="auth-switch">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button className="text-btn" onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setSuccess('');
                                setOtpSent(false);
                            }}>
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
