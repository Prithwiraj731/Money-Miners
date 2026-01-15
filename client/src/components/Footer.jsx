import React from 'react';
import './Footer.css';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="global-footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <Link to="/" className="logo-icon small">
                            <img src="/logo.svg" alt="App Logo" style={{ width: 'auto', height: '100%' }} />
                        </Link>
                    </div>
                    <div className="footer-links-row">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Settings</a>
                        <a href="#">Support</a>
                        <Link to="/admin" className="admin-link">Admin</Link>
                    </div>
                    <div className="footer-socials">
                        <a href="http://www.youtube.com/@moneyminers_live"><Youtube size={18} /></a>
                        <a href="https://www.instagram.com/moneyminers.update?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><Instagram size={18} /></a>
                        <a href="#"><Facebook size={18} /></a>
                    </div>
                </div>
                <div className="footer-bottom-text">
                    <p>© 2026 Money Miners Inc. All rights reserved. Crypto assets are volatile and not suitable for all investors.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
