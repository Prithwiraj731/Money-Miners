import React from 'react';
import './Footer.css';
import { Instagram, Youtube, Mail, Phone, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

// WhatsApp Icon Component
const WhatsAppIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
);

// Twitter/X Icon Component
const TwitterIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="global-footer">
            <div className="footer-container">
                <div className="footer-main">
                    {/* About Section */}
                    <div className="footer-about">
                        <Link to="/" className="footer-logo">
                            <img src="/logo.svg" alt="MoneyMiners Logo" />
                        </Link>
                        <p className="footer-tagline">
                            Your gateway to mastering financial markets through comprehensive education and cutting-edge trading strategies.
                        </p>
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/moneyminers.update?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="http://www.youtube.com/@moneyminers_live" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <Youtube size={20} />
                            </a>
                            <a href="https://wa.me/917667307696" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                                <WhatsAppIcon size={20} />
                            </a>
                            <a href="https://x.com/TahaYasinaftab?t=y3dMDhndUQSx4HOcvWZqGQ&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <TwitterIcon size={20} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Us Column */}
                    <div className="footer-column">
                        <h3>Contact Us</h3>
                        <ul>
                            <li>
                                <a href="mailto:contact@moneyminers.com">
                                    <Mail size={16} />
                                    <span>contact@moneyminers.com</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+917667307696">
                                    <Phone size={16} />
                                    <span>+91 76673 07696</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div className="footer-column">
                        <h3>Resources</h3>
                        <ul>
                            <li><Link to="/about">How it works</Link></li>
                            <li><Link to="/#courses">Courses</Link></li>
                            <li><Link to="/about">Our Team</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </div>

                    {/* For Traders Column */}
                    <div className="footer-column">
                        <h3>For Traders</h3>
                        <ul>
                            <li><Link to="/market-analysis">Market Analysis</Link></li>
                            <li><Link to="/strategies">Trading Strategies</Link></li>
                            <li><Link to="/learning">Learning Resources</Link></li>
                            <li><Link to="/success-stories">Success Stories</Link></li>
                            <li><Link to="/community">Community</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p className="footer-copyright">© 2026 MoneyMiners. All rights reserved.</p>
                    <div className="footer-legal-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <span className="separator">|</span>
                        <Link to="/terms">Terms of Service</Link>
                        <span className="separator">|</span>
                        <Link to="/cookies">Cookie Policy</Link>
                        <span className="separator">|</span>
                        <Link to="/refund">Refund Policy</Link>
                        <span className="separator">|</span>
                        <Link to="/admin" className="admin-link">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
