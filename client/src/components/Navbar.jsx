import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUpRight, Youtube, Menu, X, Twitch, TwitterIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const WhatsAppIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    </svg>
);

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const checkUser = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    useEffect(() => {
        const handleAuthChange = () => checkUser();
        window.addEventListener('storage', handleAuthChange);
        return () => window.removeEventListener('storage', handleAuthChange);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <header className="global-header">
                <div className="logo-area">
                    <Link to="/" className="logo-icon">
                        <img src="/logo.svg" alt="App Logo" style={{ width: '100%', height: '100%' }} />
                    </Link>
                    <nav className="global-nav">
                        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
                        <a href="#">Market</a>
                        <a href="#">Features</a>
                    </nav>
                </div>

                {/* Top Right Pill (Socials + CTA) - Desktop Only */}
                <div className="header-controls">
                    <div className="social-pill">
                        <a href="https://www.instagram.com/moneyminers.update?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
                        <div className="divider"></div>
                        <a href="http://www.youtube.com/@moneyminers_live"><Youtube size={18} /></a>
                        <div className="divider"></div>
                        <a href="https://wa.me/917667307696" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /></a>
                    </div>

                    {user ? (
                        <button className="btn-explore" onClick={() => navigate('/dashboard')}>
                            Hey {user.username} <ArrowUpRight size={18} />
                        </button>
                    ) : (
                        <button className="btn-explore" onClick={() => navigate('/auth')}>
                            Start Journey <ArrowUpRight size={18} />
                        </button>
                    )}
                </div>

                {/* Mobile Toggle - Visible only on mobile */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className="mobile-nav">
                            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
                            <a href="#">Market</a>
                            <a href="#">Features</a>
                        </nav>

                        <div className="mobile-socials">
                            <a href="https://www.instagram.com/moneyminers.update?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                            <a href="http://www.youtube.com/@moneyminers_live"><Youtube size={20} /></a>
                            <a href="https://wa.me/917667307696" target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} /></a>
                        </div>

                        {user ? (
                            <button className="btn-explore mobile-btn" onClick={() => navigate('/dashboard')}>
                                Dashboard <ArrowUpRight size={18} />
                            </button>
                        ) : (
                            <button className="btn-explore mobile-btn" onClick={() => navigate('/auth')}>
                                Start Journey <ArrowUpRight size={18} />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
