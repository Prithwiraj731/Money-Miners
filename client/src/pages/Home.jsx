import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Instagram, Twitter, Facebook, Play, Zap, Shield, Globe, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';
import bgVideo from '../assets/background.mp4';
import Spline from '@splinetool/react-spline';
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { FocusCards } from "../components/ui/focus-cards";

const Home = () => {
    const navigate = useNavigate();
    const [currentWord, setCurrentWord] = useState(0);
    const words = ["TRADING", "INVESTING", "PROFITS"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-page">
            {/* Background Texture/Gradient for the outer page */}
            <div className="outer-bg"></div>

            {/* MAIN HERO FRAME - The "Window" Look */}
            <motion.div
                className="hero-frame"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Background Image within the Frame */}
                <div className="frame-bg-image">
                    <video
                        src={bgVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="bg-video"
                    />
                    <div className="frame-overlay"></div>
                </div>

                {/* --- CENTER HERO TEXT --- */}
                <div className="hero-center-content">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        MASTER THE <br />
                        FUTURE OF <br />
                        <span className="anim-text">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={words[currentWord]}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {words[currentWord]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </motion.h1>

                    <motion.a
                        href="https://www.youtube.com/@moneyminers_live/streams"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-watch"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                    >
                        <span className="play-circle"><Play size={14} fill="currentColor" /></span>
                        <span>WATCH DEMO</span>
                    </motion.a>
                </div>

                {/* --- RIGHT SIDE HERO IMAGE --- */}
                <div className="hero-right-image-container">
                    <Spline
                        scene="/robot_follow_cursor_for_landing_page.spline"
                        onLoad={(spline) => {
                            // 1. Force Transparent Background via API
                            if (spline) {
                                if (typeof spline.setBackgroundColor === 'function') {
                                    spline.setBackgroundColor('transparent');
                                }
                            }

                            // 2. Robust Watermark Removal (Interval based)
                            const removeLogo = () => {
                                // 1. Try standard DOM access
                                const logo = document.querySelector('.hero-right-image-container a');
                                if (logo) {
                                    logo.style.display = 'none';
                                    logo.remove();
                                }

                                // 2. Try Shadow DOM access
                                const viewer = document.querySelector('spline-viewer');
                                if (viewer && viewer.shadowRoot) {
                                    const logoInShadow = viewer.shadowRoot.querySelector('#logo');
                                    if (logoInShadow) {
                                        logoInShadow.style.display = 'none';
                                        logoInShadow.remove();
                                    }
                                }
                            };

                            // Run immediately and repeatedly for 5 seconds to catch lazy loading
                            removeLogo();
                            const intervalId = setInterval(removeLogo, 100);
                            setTimeout(() => clearInterval(intervalId), 5000);
                        }}
                    />
                </div>

                {/* --- BOTTOM LEFT CARD (Solid White Tab) --- */}
                <motion.div
                    className="bottom-left-card"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="stat-group">
                        <h3>$1M+</h3>
                        <p>Secured Assets</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-group">
                        <h3>5000+</h3>
                        <p>Active Traders</p>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-group">
                        <h3>24/7</h3>
                        <p>Live Support</p>
                    </div>
                </motion.div>

                {/* --- BOTTOM RIGHT CARD (Glassmorphism) --- */}


            </motion.div>

            {/* --- 1. MARKET TICKER (Infinite Scroll) --- */}
            <div className="market-ticker-wrap">
                <div className="ticker-track">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="ticker-content">
                            <span className="ticker-item">BTC <span className="up">+2.4%</span></span>
                            <span className="ticker-item">ETH <span className="up">+1.8%</span></span>
                            <span className="ticker-item">SOL <span className="down">-0.5%</span></span>
                            <span className="ticker-item">ADA <span className="up">+5.2%</span></span>
                            <span className="ticker-item">DOT <span className="down">-1.2%</span></span>
                            <span className="ticker-item">XRP <span className="up">+0.8%</span></span>
                            <span className="ticker-item">AVAX <span className="up">+3.1%</span></span>
                            <span className="ticker-item">MATIC <span className="down">-0.2%</span></span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- 2. EXPANDED FEATURES --- */}
            <section className="section-padding features-section">
                <div className="container">
                    <motion.div
                        className="section-header center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="sub-tag">WHY MONEY MINERS</span>
                        <h2>Powering the Future of Finance</h2>
                        <p>Built for the bold. Designed for the driven.</p>
                    </motion.div>

                    <div className="features-grid-3">
                        <motion.div className="feature-card-glass" whileHover={{ y: -10 }}>
                            <div className="f-icon-box"><BarChart2 /></div>
                            <h3>Pro-Grade Analytics</h3>
                            <p>Real-time technical indicators and on-chain metrics at your fingertips. Spot trends before they happen.</p>
                        </motion.div>
                        <motion.div className="feature-card-glass" whileHover={{ y: -10 }}>
                            <div className="f-icon-box"><Zap /></div>
                            <h3>Lightning Execution</h3>
                            <p>Zero-latency matching engine ensures you never miss a beat. Trade at the speed of thought.</p>
                        </motion.div>
                        <motion.div className="feature-card-glass" whileHover={{ y: -10 }}>
                            <div className="f-icon-box"><Shield /></div>
                            <h3>Fortress Security</h3>
                            <p>Multi-signature cold storage and insurance funds keep your assets safe from any threat.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- 2.5 3D POP-OUT SECTION --- */}
            <section className="popout-section">
                <BackgroundBeamsWithCollision
                    className="absolute inset-0 w-full h-full z-0"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 0
                    }}
                >
                    {/* Beams will play in background */}
                </BackgroundBeamsWithCollision>

                {/* Graph Paper Grid Overlay */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                    }}
                ></div>

                {/* SLANTED SCROLLING TEXT */}
                <div className="marquee-container">
                    <div className="marquee-wrapper">
                        <div className="marquee-track scroll-left">
                            <div className="flex">
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                            </div>
                            <div className="flex">
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                                <span className="text-filled">CRYPTO</span><span className="text-outline">CRYPTO</span>
                            </div>
                        </div>
                    </div>
                    <div className="marquee-wrapper">
                        <div className="marquee-track scroll-right">
                            <div className="flex">
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                            </div>
                            <div className="flex">
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                                <span className="text-outline">TRADING</span><span className="text-filled">TRADING</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <div className="popout-wrapper">
                        <div className="platform-base"></div>
                        <motion.img
                            src="/female.png"
                            alt="Female Trader Feature"
                            className="popout-image"
                            initial={{ y: 50, opacity: 0, scale: 0.9 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                        />
                        <motion.img
                            src="/male.png"
                            alt="Male Trader Feature"
                            className="popout-image"
                            initial={{ y: 50, opacity: 0, scale: 0.9 }}
                            whileInView={{ y: 0, opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 0.1 }}
                        />
                    </div>
                </div>
            </section>

            {/* --- 3. DIGITAL ECOSYSTEM (Visual Break) --- */}
            <section className="section-padding ecosystem-section">
                <div className="container">
                    <div className="eco-content">
                        <motion.div
                            className="eco-text"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="sub-tag">GLOBAL REACH</span>
                            <h2>A Global Financial Ecosystem</h2>
                            <p>Join a network that spans continents. From Tokyo to New York, Money Miners connects liquidity and opportunity.</p>
                            <div className="stats-row">
                                <div className="stat-item">
                                    <strong>150+</strong>
                                    <span>Countries</span>
                                </div>
                                <div className="stat-item">
                                    <strong>$50B+</strong>
                                    <span>Quarterly Vol</span>
                                </div>
                            </div>
                        </motion.div>
                        <div className="eco-visual">
                            {/* Abstract Globe/Network Representation */}
                            <div className="globe-circle">
                                <div className="orbit orbit-1"></div>
                                <div className="orbit orbit-2"></div>
                                <div className="orbit orbit-3"></div>
                                <img
                                    src="/cartoon.png"
                                    alt="Ecosystem Center"
                                    style={{
                                        width: '95%',
                                        height: 'auto',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 10,
                                        filter: 'drop-shadow(0 0 20px rgba(0, 255, 157, 0.3))'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. TESTIMONIALS --- */}
            <section className="section-padding testimonials-section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Trusted by the Best</h2>
                    </motion.div>

                    <div className="testimonials-grid">
                        <div className="testi-card">
                            <div className="user-profile">
                                <div className="avatar">A</div>
                                <div>
                                    <h4>Alex Chen</h4>
                                    <span>Day Trader</span>
                                </div>
                            </div>
                            <p>"The execution speed is unmatched. I've used every major platform, but Money Miners is in a league of its own."</p>
                            <div className="stars">★★★★★</div>
                        </div>
                        <div className="testi-card">
                            <div className="user-profile">
                                <div className="avatar">S</div>
                                <div>
                                    <h4>Sarah Jones</h4>
                                    <span>Crypto Analyst</span>
                                </div>
                            </div>
                            <p>"The analytics tools are a game changer. I can do my entire technical analysis without leaving the dashboard."</p>
                            <div className="stars">★★★★★</div>
                        </div>
                        <div className="testi-card">
                            <div className="user-profile">
                                <div className="avatar">M</div>
                                <div>
                                    <h4>Mike Ross</h4>
                                    <span>Institutional Investor</span>
                                </div>
                            </div>
                            <p>"Security is my top priority. Money Miners gives me the peace of mind I need to manage large portfolios."</p>
                            <div className="stars">★★★★★</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. EDUCATIONAL HUB --- */}
            <section className="section-padding education-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Master existing Strategies</h2>
                        <button className="link-btn">View all courses <ArrowUpRight size={16} /></button>
                    </div>
                    <div className="edu-grid-wrapper mt-12 w-full flex justify-center">
                        <FocusCards cards={[
                            {
                                title: "Beginner Trading",
                                description: "Master the basics of stock and forex trading. Understand charts, trends, and risk management to start your profitable journey.",
                                price: "Rs 15,000/-",
                                src: "/beginnerCourse.jpg",
                            },
                            {
                                title: "Cryptocurrency",
                                description: "Explore the world of Blockchain, Bitcoin, and Altcoins. Learn secure wallet management and advanced crypto trading strategies.",
                                price: "Rs 30,000/-",
                                src: "/cryptoCourse.jpg",
                            }
                        ]} />
                    </div>
                </div>
            </section>

            {/* --- 6. FINAL CTA --- */}
            <section className="section-padding final-cta-section">
                <div className="container">
                    <motion.div
                        className="cta-box"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join over 1.8 million traders today.</p>
                        <button className="btn-final-cta" onClick={() => navigate('/auth')}>
                            Create Free Account
                        </button>

                    </motion.div>
                </div>
            </section>

            {/* --- 7. PLATFORM PREVIEW --- */}
            <section style={{
                width: 'calc(100% + 40px)',
                marginLeft: '-20px',
                marginRight: '-20px',
                height: '500px',
                marginTop: '50px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                position: 'relative',
                borderTopLeftRadius: '80px',
                borderTopRightRadius: '80px',
                backgroundImage: 'url("/imageBackground.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}>
                <motion.img
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src="/image1.png"
                    alt="Platform Preview"
                    style={{
                        maxWidth: '90%',
                        height: 'auto',
                        maxHeight: '140%', // Pops out the top
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                    }}
                />
            </section>

        </div>
    );
};

export default Home;