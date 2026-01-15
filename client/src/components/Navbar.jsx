import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ArrowUpRight, Youtube } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

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
        // Listen for storage events (login/logout from other tabs or Auth component)
        window.addEventListener('storage', checkUser);
        return () => window.removeEventListener('storage', checkUser);
    }, []);

    // Also listen for a custom event if we dispatch one from same window logic
    useEffect(() => {
        // Create a custom listener for immediate updates within same window
        const handleAuthChange = () => checkUser();
        window.addEventListener('storage', handleAuthChange);
        return () => window.removeEventListener('storage', handleAuthChange);
    }, []);


    return (
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

            {/* Top Right Pill (Socials + CTA) */}
            <div className="header-controls">
                <div className="social-pill">
                    <a href="https://www.instagram.com/moneyminers.update?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><Instagram size={18} /></a>
                    <div className="divider"></div>
                    <a href="http://www.youtube.com/@moneyminers_live"><Youtube size={18} /></a>
                    <div className="divider"></div>
                    <a href="#"><Facebook size={18} /></a>
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
        </header>
    );
};

export default Navbar;
