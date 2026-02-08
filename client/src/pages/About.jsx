import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Users, Globe, Target, Award } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="outer-bg"></div>

            {/* HERO */}
            <motion.div
                className="about-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1>
                    <span className="gradient-text">We Are Shaping</span><br />
                    The Future of Wealth
                </h1>
                <p>
                    MoneyMiners is more than a platform; it’s a revolution. We empower individuals
                    to master the art of finance through cutting-edge technology and
                    community-driven intelligence.
                </p>
            </motion.div>

            {/* CEO SECTION */}
            <section className="ceo-section">
                <div className="ceo-container">
                    <motion.div
                        className="ceo-image-wrapper"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="ceo-image-glow"></div>
                        <img src="/taha.png" alt="Taha Yasin Aftab - CEO" className="ceo-img" />
                    </motion.div>

                    <motion.div
                        className="ceo-content"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="ceo-label">Visionary Leader</span>
                        <h2>Taha Yasin Aftab</h2>
                        <h3 className="gradient-text">CEO of Money Miners</h3>
                        <p>
                            With over 3+ years of experience in trading and the crypto market, Taha leads Money Miners with a
                            relentless passion for financial empowerment. As a seasoned trader and visionary, he combines
                            deep market technical analysis with a strategic foresight that helps navigate the volatile
                            landscapes of digital assets. His mission is to bridge the gap between complex financial
                            instruments and everyday investors.
                        </p>
                        <div className="ceo-signature">
                            <p>Taha Yasin Aftab</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* REAL TEAM LIST SECTION */}
            <section className="team-list-section">
                <div className="team-list-header">
                    <h2>Our Expert Team</h2>
                    <p> The minds behind the revolution.</p>
                </div>

                <div className="team-list-grid">
                    {[
                        { name: "Taha Yasin Aftab", role: "CEO" },
                        { name: "Najam Siddique", role: "Gold Analyst, BTC Master" },
                        { name: "Ayush Deb", role: "Gold Analyst, BTC Master" },
                        { name: "Ankit Aditya", role: "Forex Analyst, Crypto Trader" },
                        { name: "Shams Tabrez", role: "Crypto Trader" },
                        { name: "Aman Hussain Sk", role: "Director of Legal Affairs" },
                        { name: "Chandrasekhar Pathak", role: "Sales Department" },
                        { name: "Faiz Ahmed", role: "Sales Department" },
                        { name: "Shadan Khan", role: "Sales Department" }
                    ].map((member, index) => (
                        <motion.div
                            className="team-list-card"
                            key={index}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <h3>{member.name}</h3>
                            <span>{member.role}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MISSION */}
            <section className="mission-section">
                <motion.div
                    className="mission-visual"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="visual-ornament"></div>
                    {/* Placeholder for an actual team/office image context */}
                    <Globe size={120} strokeWidth={0.5} style={{ opacity: 0.3, position: 'absolute' }} />
                </motion.div>

                <motion.div
                    className="mission-text"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Our Mission</h2>
                    <p>
                        In a world where financial markets are gatekept by institutions, we built
                        MoneyMiners to break down walls. Our mission is to democratize financial
                        literacy and algorithmic trading tools for everyone.
                    </p>
                    <p>
                        Whether you are a seasoned investor or just starting, our ecosystem provides
                        the clarity, speed, and security you need to thrive in the digital economy.
                    </p>
                </motion.div>
            </section>

            {/* VALUES */}
            <section className="values-section">
                <div className="values-header">
                    <h2>Core Principles</h2>
                </div>

                <div className="values-grid">
                    <motion.div
                        className="value-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="value-icon"><Shield size={32} /></div>
                        <h3>Uncompromised Security</h3>
                        <p>Your assets and data are our top priority. We employ military-grade encryption and protocol standards.</p>
                    </motion.div>

                    <motion.div
                        className="value-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="value-icon"><Zap size={32} /></div>
                        <h3>Lightning Speed</h3>
                        <p>Market opportunities last milliseconds. Our infrastructure ensures you never miss a beat.</p>
                    </motion.div>

                    <motion.div
                        className="value-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="value-icon"><Users size={32} /></div>
                        <h3>Community First</h3>
                        <p>We believe in the power of the collective. Our platform thrives on shared knowledge and success.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
