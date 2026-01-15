import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Home, ChartBar, Wallet, Newspaper, Settings, Bell, Search,
    ArrowUpRight, TrendingUp, Activity, User, LogOut, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            navigate('/auth');
        } else {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Failed to parse user data:", error);
                localStorage.removeItem('user');
                navigate('/auth');
            }
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage')); // Update Navbar
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="dashboard-layout">
            {/* --- SIDEBAR --- */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src="/logo.svg" alt="MM" />
                </div>

                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active"><Home size={20} /></a>
                    <a href="#" className="nav-item"><ChartBar size={20} /></a>
                    <a href="#" className="nav-item"><Wallet size={20} /></a>
                    <a href="#" className="nav-item"><Newspaper size={20} /></a>
                    <a href="#" className="nav-item"><Settings size={20} /></a>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout} title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="main-content">
                {/* Header */}
                <header className="dash-header">
                    <div className="welcome-text">
                        <h1>Hey, {user.username} 👋</h1>
                        <p>Here's what's happening with your portfolio today.</p>
                    </div>
                    <div className="header-actions">
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Search markets..." />
                        </div>
                        <button className="icon-btn"><Bell size={20} /></button>
                        <div className="user-avatar">
                            {user.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                </header>

                {/* Grid Layout */}
                <div className="content-grid">

                    {/* Left Column (Main Stats) */}
                    <div className="left-column">
                        {/* Overview Card with Graph */}
                        <motion.div
                            className="overview-card"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="card-header">
                                <h3>Portfolio Value</h3>
                                <div className="time-filters">
                                    <span className="active">1D</span>
                                    <span>1W</span>
                                    <span>1M</span>
                                    <span>1Y</span>
                                </div>
                            </div>
                            <div className="balance-info">
                                <h2>$12,450.00</h2>
                                <span className="profit positive">+2.4% ($340)</span>
                            </div>

                            {/* Simulated Graph Wave */}
                            <div className="graph-container">
                                <svg viewBox="0 0 500 150" className="wave-svg">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,100 C50,80 100,120 150,60 C200,0 250,80 300,50 C350,20 400,60 450,40 L500,60 L500,150 L0,150 Z"
                                        fill="url(#gradient)"
                                    />
                                    <path
                                        d="M0,100 C50,80 100,120 150,60 C200,0 250,80 300,50 C350,20 400,60 450,40 L500,60"
                                        fill="none"
                                        stroke="#10B981"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    {/* Glowing Dot */}
                                    <circle cx="300" cy="50" r="6" fill="#fff" className="graph-point">
                                        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    <text x="290" y="35" fill="#fff" fontSize="12" fontWeight="bold">9,178 Steps</text>
                                </svg>
                            </div>
                        </motion.div>

                        {/* Quick Action Cards */}
                        <div className="stats-row">
                            <motion.div className="stat-card" whileHover={{ y: -5 }}>
                                <div className="icon-wrapper purple"><TrendingUp size={24} /></div>
                                <div className="stat-info">
                                    <h4>Total Gain</h4>
                                    <p>+ $1,200</p>
                                </div>
                            </motion.div>
                            <motion.div className="stat-card" whileHover={{ y: -5 }}>
                                <div className="icon-wrapper blue"><Activity size={24} /></div>
                                <div className="stat-info">
                                    <h4>Daily Activity</h4>
                                    <p>14 Trades</p>
                                </div>
                            </motion.div>
                            <motion.div className="stat-card" whileHover={{ y: -5 }}>
                                <div className="icon-wrapper pink"><Wallet size={24} /></div>
                                <div className="stat-info">
                                    <h4>Wallet Bal</h4>
                                    <p>2.4 BTC</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Course Progress */}
                        <div className="course-progress-section">
                            <h3>Continue Learning</h3>
                            <div className="course-card">
                                <div className="course-icon">Crypto 101</div>
                                <div className="course-details">
                                    <h4>Introduction to Blockchain</h4>
                                    <div className="progress-bar-bg">
                                        <div className="progress-fill" style={{ width: '65%' }}></div>
                                    </div>
                                    <span>65% Completed</span>
                                </div>
                                <button className="resume-btn"><ChevronRight size={20} /></button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Sidebar Widgets) */}
                    <div className="right-column">
                        {/* Market Watch */}
                        <div className="widget-card">
                            <h3>Market Watch</h3>
                            <div className="market-list">
                                <div className="market-item">
                                    <div className="coin-info">
                                        <div className="coin-icon btc">B</div>
                                        <div>
                                            <h4>Bitcoin</h4>
                                            <span>BTC</span>
                                        </div>
                                    </div>
                                    <div className="coin-price">
                                        <p>$43,500</p>
                                        <span className="green">+1.2%</span>
                                    </div>
                                </div>
                                <div className="market-item">
                                    <div className="coin-info">
                                        <div className="coin-icon eth">E</div>
                                        <div>
                                            <h4>Ethereum</h4>
                                            <span>ETH</span>
                                        </div>
                                    </div>
                                    <div className="coin-price">
                                        <p>$2,240</p>
                                        <span className="red">-0.8%</span>
                                    </div>
                                </div>
                                <div className="market-item">
                                    <div className="coin-info">
                                        <div className="coin-icon sol">S</div>
                                        <div>
                                            <h4>Solana</h4>
                                            <span>SOL</span>
                                        </div>
                                    </div>
                                    <div className="coin-price">
                                        <p>$98</p>
                                        <span className="green">+5.4%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="widget-card">
                            <h3>Friend Activity</h3>
                            <div className="friend-list">
                                <div className="friend-item">
                                    <div className="avatar sm">A</div>
                                    <div className="activity-text">
                                        <strong>Alex</strong> bought 0.5 ETH
                                        <span>2m ago</span>
                                    </div>
                                </div>
                                <div className="friend-item">
                                    <div className="avatar sm">S</div>
                                    <div className="activity-text">
                                        <strong>Sarah</strong> finished a course
                                        <span>1h ago</span>
                                    </div>
                                </div>
                                <div className="friend-item">
                                    <div className="avatar sm">M</div>
                                    <div className="activity-text">
                                        <strong>Mike</strong> joined Money Miners
                                        <span>3h ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
