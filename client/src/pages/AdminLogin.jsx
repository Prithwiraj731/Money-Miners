import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import API_URL from '../config/api';
import './Admin.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await response.json();

            if (response.ok) {
                // Simple admin session storage
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminUser', JSON.stringify(data.user));
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Access Denied');
            }
        } catch (err) {
            setError('Server connection failed');
        }
    };

    return (
        <div className="admin-auth-container">
            <div className="admin-auth-bg">
                <div className="grid-line horizontal"></div>
                <div className="grid-line vertical"></div>
            </div>

            <motion.div
                className="admin-login-card"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="admin-header">
                    <div className="admin-icon-wrapper">
                        <ShieldCheck size={40} color="#00ff9d" />
                    </div>
                    <h1>SYSTEM ACCESS</h1>
                    <p>Restricted Area. Authorized Personnel Only.</p>
                </div>

                {error && <div className="admin-error-msg">⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="admin-input-group">
                        <label>OPERATOR ID</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="admin-input-group">
                        <label>ACCESS KEY</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="admin-login-btn">
                        <Lock size={16} /> AUTHENTICATE
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
