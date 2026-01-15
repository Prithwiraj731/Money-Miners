import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, Users, DollarSign, LogOut, Terminal } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    return (
        <div className="admin-dash-layout">
            <header className="admin-topbar">
                <div className="admin-brand">
                    <Terminal size={24} />
                    <span>ADMIN_CONSOLE_V1.0</span>
                </div>
                <div className="status-indicator">
                    <div className="dot"></div>
                    SYSTEM OPERATIONAL
                </div>
                <button onClick={handleLogout} className="admin-logout">
                    [ TERMINATE SESSION ]
                </button>
            </header>

            <main className="admin-content-container">
                <div className="admin-metrics-grid">
                    <div className="metric-card">
                        <h3>Total Registered Users</h3>
                        <div className="value">12,845</div>
                        <div className="sub up">▲ 124 today</div>
                    </div>
                    <div className="metric-card">
                        <h3>Server Latency</h3>
                        <div className="value">42ms</div>
                        <div className="sub up">● Optimal</div>
                    </div>
                    <div className="metric-card">
                        <h3>Pending Verifications</h3>
                        <div className="value">8</div>
                        <div className="sub">requires attention</div>
                    </div>
                    <div className="metric-card">
                        <h3>Monthly Revenue</h3>
                        <div className="value">$45,290</div>
                        <div className="sub up">▲ 8.1% vs last month</div>
                    </div>
                </div>

                <div className="admin-panel-section">
                    <div className="admin-panel-header">
                        <h2>USER MANAGEMENT DATABASE</h2>
                        <button className="admin-login-btn" style={{ width: 'auto', padding: '8px 20px' }}>
                            REFRESH DATA
                        </button>
                    </div>

                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>USER ID</th>
                                <th>USERNAME</th>
                                <th>EMAIL</th>
                                <th>STATUS</th>
                                <th>LAST LOGIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#USR-9921</td>
                                <td>crypto_king</td>
                                <td>king@example.com</td>
                                <td><span className="status-badge active">ACTIVE</span></td>
                                <td>2 mins ago</td>
                            </tr>
                            <tr>
                                <td>#USR-9922</td>
                                <td>sarah_trades</td>
                                <td>sarah@test.com</td>
                                <td><span className="status-badge active">ACTIVE</span></td>
                                <td>15 mins ago</td>
                            </tr>
                            <tr>
                                <td>#USR-9923</td>
                                <td>unknown_bot</td>
                                <td>bot@spam.com</td>
                                <td><span className="status-badge pending">FLAGGED</span></td>
                                <td>2 days ago</td>
                            </tr>
                            <tr>
                                <td>#USR-9924</td>
                                <td>money_maker</td>
                                <td>mm@demo.com</td>
                                <td><span className="status-badge active">ACTIVE</span></td>
                                <td>2 weeks ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
