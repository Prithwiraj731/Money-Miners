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


            {/* TEAM */}
            <section className="team-section">
                <div className="team-header">
                    <h2>Meet The Minds</h2>
                    <p>Building the future of finance, one block at a time.</p>
                </div>

                <div className="team-grid">
                    {[
                        { name: "Sarah Jenkins", role: "CEO & Founder", initial: "S", color: "#6366f1" },
                        { name: "David Chen", role: "CTO", initial: "D", color: "#10b981" },
                        { name: "Michael Ross", role: "Head of Product", initial: "M", color: "#f59e0b" },
                        { name: "Emily White", role: "Lead Analyst", initial: "E", color: "#ec4899" }
                    ].map((member, index) => (
                        <motion.div
                            className="team-card"
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="team-avatar" style={{ background: `linear-gradient(135deg, ${member.color}, #111)` }}>
                                {member.initial}
                            </div>
                            <h3>{member.name}</h3>
                            <span>{member.role}</span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div >
    );
};

export default About;
