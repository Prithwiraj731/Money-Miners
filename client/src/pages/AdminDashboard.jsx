import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, Users, DollarSign, LogOut, Terminal, CheckCircle, XCircle, Clock } from 'lucide-react';
import API_URL from '../config/api';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('enrolments'); // 'users' or 'enrolments'

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        } else {
            fetchPurchases(token);
        }
    }, [navigate]);

    const fetchPurchases = async (token) => {
        try {
            const response = await fetch(`${API_URL}/api/admin/purchases/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch purchases');
            const data = await response.json();
            setPurchases(data.purchases || []);
        } catch (error) {
            console.error('Error fetching admin purchases:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (purchaseId, newStatus) => {
        if (!window.confirm(`Are you sure you want to mark this as ${newStatus}?`)) return;

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_URL}/api/admin/purchases/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ purchaseId, status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update status');

            // Update local state
            setPurchases(purchases.map(p => p.id === purchaseId ? { ...p, status: newStatus } : p));
            alert('Status updated successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    const stats = {
        totalRevenue: purchases.filter(p => p.status === 'success')
            .reduce((sum, p) => sum + Number(p.amount), 0),
        pendingCount: purchases.filter(p => p.status === 'pending').length,
        totalEnrolments: purchases.length
    };

    return (
        <div className="admin-dash-layout">
            <header className="admin-topbar">
                <div className="admin-brand">
                    <Terminal size={24} />
                    <span>ADMIN_CONSOLE_V2.2</span>
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
                        <h3>Total Enrolments</h3>
                        <div className="value">{stats.totalEnrolments}</div>
                        <div className="sub">all time</div>
                    </div>
                    <div className="metric-card">
                        <h3>Pending Verification</h3>
                        <div className="value" style={{ color: stats.pendingCount > 0 ? '#FFD700' : 'inherit' }}>
                            {stats.pendingCount}
                        </div>
                        <div className="sub">requires attention</div>
                    </div>
                    <div className="metric-card">
                        <h3>Total Revenue</h3>
                        <div className="value">₹{stats.totalRevenue.toLocaleString()}</div>
                        <div className="sub up">▲ from course sales</div>
                    </div>
                    <div className="metric-card">
                        <h3>Active Systems</h3>
                        <div className="value">100%</div>
                        <div className="sub up">● Optimal</div>
                    </div>
                </div>

                <div className="admin-panel-section">
                    <div className="admin-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #333' }}>
                        <button
                            className={`tab-btn ${activeTab === 'enrolments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('enrolments')}
                            style={{ background: 'none', border: 'none', padding: '10px 0', borderBottom: activeTab === 'enrolments' ? '2px solid #10B981' : 'none', color: activeTab === 'enrolments' ? '#10B981' : '#666', cursor: 'pointer', fontWeight: 600 }}
                        >
                            COURSE ENROLMENTS
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                            style={{ background: 'none', border: 'none', padding: '10px 0', borderBottom: activeTab === 'users' ? '2px solid #10B981' : 'none', color: activeTab === 'users' ? '#10B981' : '#666', cursor: 'pointer', fontWeight: 600 }}
                        >
                            USER DATABASE
                        </button>
                    </div>

                    {activeTab === 'enrolments' ? (
                        <>
                            <div className="admin-panel-header">
                                <h2>MANUAL PAYMENT VERIFICATION</h2>
                                <button className="admin-refresh-btn" onClick={() => fetchPurchases(localStorage.getItem('adminToken'))}>
                                    REFRESH DATA
                                </button>
                            </div>

                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>DATE</th>
                                        <th>STUDENT</th>
                                        <th>COURSE</th>
                                        <th>TXN ID (UTR)</th>
                                        <th>AMOUNT</th>
                                        <th>STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases.length === 0 ? (
                                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>No enrolments found</td></tr>
                                    ) : (
                                        purchases.map(p => (
                                            <tr key={p.id}>
                                                <td>{new Date(p.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <div style={{ fontWeight: 'bold' }}>{p.full_name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: '#666' }}>{p.email}</div>
                                                </td>
                                                <td>{p.course_title}</td>
                                                <td style={{ fontFamily: 'monospace', color: '#10B981' }}>{p.transaction_id}</td>
                                                <td>₹{Number(p.amount).toLocaleString()}</td>
                                                <td>
                                                    <span className={`status-badge ${p.status}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {p.status === 'pending' && (
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            <button
                                                                onClick={() => handleUpdateStatus(p.id, 'success')}
                                                                title="Approve & Unlock Course"
                                                                style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10B981', color: '#10B981', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(p.id, 'failed')}
                                                                title="Reject & Notify"
                                                                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', color: '#EF4444', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                            User Database view is currently under maintenance. Use Supabase dashboard for direct audits.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
