import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Surprise = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'radial-gradient(circle at center, #1a202c 0%, #000 100%)',
            padding: '20px'
        }}>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
            >
                <Rocket size={80} color="#00ff88" style={{ marginBottom: '20px' }} />
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    Coming <span className="text-gradient">Soon</span>
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#a0aec0', marginBottom: '40px', maxWidth: '600px' }}>
                    You've discovered our secret project! We are building the next generation of algorithmic trading tools.
                    Stay tuned for early access.
                </p>
                <Link to="/" className="btn btn-primary">Return to Base</Link>
            </motion.div>
        </div>
    );
};

export default Surprise;
