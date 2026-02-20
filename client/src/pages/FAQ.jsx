import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css';

const faqData = [
    {
        category: 'General',
        questions: [
            {
                q: 'What is Money Miners?',
                a: 'Money Miners is a premium trading education platform that offers comprehensive courses on stock market trading, cryptocurrency, and advanced investment strategies. Our courses are designed by professional traders with years of real-market experience to help you build a solid foundation and achieve consistent profitability.'
            },
            {
                q: 'Who are the courses designed for?',
                a: 'Our courses cater to all experience levels — from absolute beginners who have never placed a trade, to intermediate traders looking to refine their strategy, to advanced traders seeking institutional-grade techniques. Each course clearly states the recommended level so you can choose the right fit.'
            },
            {
                q: 'Do I need any prior experience to get started?',
                a: 'No prior experience is required for our beginner-level courses. Our "Basics of Trading" course is specifically designed for newcomers and covers everything from market fundamentals to chart reading. For intermediate and advanced courses, we recommend completing the prerequisites listed on each course page.'
            },
            {
                q: 'What makes Money Miners different from other trading education platforms?',
                a: 'We focus on practical, real-world trading education rather than theoretical knowledge alone. Our instructors are active traders who share live market examples, provide hands-on exercises, and offer ongoing mentorship. We also maintain a vibrant community where students can discuss strategies and share insights.'
            }
        ]
    },
    {
        category: 'Courses & Enrollment',
        questions: [
            {
                q: 'How do I enroll in a course?',
                a: 'Simply browse our Courses page, select the course you\'re interested in, and click "Enroll Now." You\'ll be guided through the registration and payment process. Once enrolled, you\'ll get immediate access to all course materials.'
            },
            {
                q: 'Are the courses self-paced or live?',
                a: 'Our courses combine the best of both worlds. You get access to pre-recorded modules that you can study at your own pace, supplemented by live Q&A sessions, webinars, and community discussion forums where you can interact with instructors in real time.'
            },
            {
                q: 'How long do I have access to a course after enrolling?',
                a: 'Once enrolled, you get lifetime access to the course materials, including all future updates and additions. This means you can revisit concepts anytime, even after completing the course.'
            },
            {
                q: 'Can I switch between courses after enrolling?',
                a: 'Course enrollment is for the specific course selected. However, if you feel a different course would be a better fit, please contact our support team within 7 days of enrollment and we\'ll work with you to find the best solution.'
            }
        ]
    },
    {
        category: 'Payments & Refunds',
        questions: [
            {
                q: 'What payment methods do you accept?',
                a: 'We accept all major payment methods including UPI, credit/debit cards, net banking, and popular digital wallets. All transactions are processed through secure, encrypted payment gateways to ensure your financial information is safe.'
            },
            {
                q: 'Is there a refund policy?',
                a: 'Yes, we offer a 7-day refund policy from the date of enrollment. If you\'re not satisfied with the course content, you can request a full refund by contacting our support team at prithwi1016@gmail.com. Please refer to our Refund Policy page for complete details and conditions.'
            },
            {
                q: 'Are there any hidden fees?',
                a: 'Absolutely not. The price listed on the course page is the total amount you pay. There are no hidden charges, subscription fees, or additional costs. You get full access to all course materials, updates, and community features included in the course price.'
            }
        ]
    },
    {
        category: 'Trading & Markets',
        questions: [
            {
                q: 'Can I start trading with a small capital?',
                a: 'Yes, absolutely. Our courses teach you risk management strategies that work regardless of your capital size. Many of our students start with modest amounts and gradually scale up as they gain confidence and experience. We emphasize protecting your capital above all else.'
            },
            {
                q: 'Do you guarantee profits from trading?',
                a: 'No legitimate trading education platform can guarantee profits, and we are transparent about this. Trading involves inherent risk. What we do guarantee is top-quality education, proven methodologies, and the skills to make informed decisions. Your success depends on discipline, practice, and consistent application of what you learn.'
            },
            {
                q: 'Which markets do your courses cover?',
                a: 'Our courses cover Indian stock markets (NSE/BSE), cryptocurrency markets (Bitcoin, Ethereum, altcoins), forex basics, and commodity trading. We primarily focus on strategies that work well in Indian and global crypto markets since that\'s where most of our students trade actively.'
            },
            {
                q: 'Do you provide trading tools or software?',
                a: 'Our courses teach you how to use widely-available, industry-standard trading tools and platforms. While we don\'t provide proprietary software, we guide you on setting up free and paid tools for charting, analysis, and trade execution. We recommend platforms that offer the best features for each trading style.'
            }
        ]
    },
    {
        category: 'Support & Community',
        questions: [
            {
                q: 'How can I get support if I have questions?',
                a: 'You can reach our support team via email at prithwi1016@gmail.com, through our Contact page, or via WhatsApp. We typically respond within 24 hours on business days. Additionally, our community forums and group chats provide peer support from fellow traders.'
            },
            {
                q: 'Is there a community or group I can join?',
                a: 'Yes! All enrolled students get access to our exclusive community channels where you can discuss strategies, share insights, and learn from fellow traders. We also have an Exclusive Channel with premium market analysis, real-time trade ideas, and dedicated mentorship from our expert team.'
            },
            {
                q: 'Do you offer one-on-one mentorship?',
                a: 'Yes, personalized mentorship is available through our Exclusive Channel plans. This includes direct access to our senior traders for strategy review, portfolio guidance, and real-time market discussions. Check our Exclusive Channel page for available plans and pricing.'
            }
        ]
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className={`faq-item ${isOpen ? 'faq-item-open' : ''}`} onClick={onClick}>
        <div className="faq-question">
            <span>{question}</span>
            <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <ChevronDown size={20} />
            </motion.div>
        </div>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>{answer}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQ = () => {
    const navigate = useNavigate();
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="faq-page">
            {/* Hero Section */}
            <section className="faq-hero">
                <div className="faq-hero-glow faq-hero-glow-1" />
                <div className="faq-hero-glow faq-hero-glow-2" />
                <div className="faq-hero-content">
                    <motion.div
                        className="faq-hero-icon"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <HelpCircle size={48} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Frequently Asked <span className="text-green">Questions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Everything you need to know about Money Miners, our courses, and trading education.
                    </motion.p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="faq-content-section">
                <div className="faq-container">
                    {faqData.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            className="faq-category"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            <h2 className="faq-category-title">{category.category}</h2>
                            <div className="faq-list">
                                {category.questions.map((item, qIndex) => (
                                    <FAQItem
                                        key={qIndex}
                                        question={item.q}
                                        answer={item.a}
                                        isOpen={openItems[`${catIndex}-${qIndex}`]}
                                        onClick={() => toggleItem(catIndex, qIndex)}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="faq-cta">
                <motion.div
                    className="faq-cta-box"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <MessageCircle size={40} className="faq-cta-icon" />
                    <h2>Still Have Questions?</h2>
                    <p>Our team is here to help. Reach out and we'll get back to you within 24 hours.</p>
                    <motion.button
                        className="faq-cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                    >
                        Contact Us
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default FAQ;
