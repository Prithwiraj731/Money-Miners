import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const TermsOfService = () => {
    return (
        <div className="legal-page">
            <div className="legal-container">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <motion.div
                    className="legal-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <FileText className="legal-icon" size={48} />
                    <h1>Terms of Service</h1>
                    <p className="last-updated">Last Updated: February 9, 2026</p>
                </motion.div>

                <motion.div
                    className="legal-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            Welcome to Money Miners. By accessing or using our website, mobile application, or any related services (collectively, the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use our Platform.
                        </p>
                        <p>
                            These Terms constitute a legally binding agreement between you ("User," "you," or "your") and Money Miners ("we," "us," or "our"). We reserve the right to modify these Terms at any time. Your continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.
                        </p>
                    </section>

                    <section>
                        <h2>2. Description of Services</h2>
                        <p>Money Miners provides educational content and tools related to cryptocurrency trading, stock market analysis, and investment strategies. Our services include:</p>
                        <ul>
                            <li>Online courses and learning materials on trading fundamentals, technical analysis, and market strategies</li>
                            <li>Exclusive membership channels offering premium trading signals, market insights, and personalized support</li>
                            <li>Community forums and discussion groups for knowledge sharing</li>
                            <li>Educational resources, including articles, videos, webinars, and tutorials</li>
                        </ul>
                        <p>
                            <strong>Important Disclaimer:</strong> Money Miners is an educational platform. We do not provide financial advice, investment recommendations, or portfolio management services. All content is for informational purposes only and should not be construed as professional financial advice.
                        </p>
                    </section>

                    <section>
                        <h2>3. User Accounts</h2>

                        <h3>3.1 Registration</h3>
                        <p>To access certain features, you must create an account. You agree to:</p>
                        <ul>
                            <li>Provide accurate, current, and complete information during registration</li>
                            <li>Maintain and promptly update your account information</li>
                            <li>Maintain the security and confidentiality of your password</li>
                            <li>Notify us immediately of any unauthorized use of your account</li>
                            <li>Be responsible for all activities that occur under your account</li>
                        </ul>

                        <h3>3.2 Account Eligibility</h3>
                        <p>You must be at least 18 years old to create an account and use our services. By registering, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.</p>

                        <h3>3.3 Account Termination</h3>
                        <p>We reserve the right to suspend or terminate your account at our discretion if you violate these Terms, engage in fraudulent activity, or for any other reason we deem appropriate. You may also request account deletion at any time by contacting support.</p>
                    </section>

                    <section>
                        <h2>4. Payments and Subscriptions</h2>

                        <h3>4.1 Pricing</h3>
                        <p>Course prices and subscription fees are listed on our Platform. All prices are in Indian Rupees (INR) unless otherwise stated. We reserve the right to change prices at any time, but changes will not affect purchases already made.</p>

                        <h3>4.2 Payment Methods</h3>
                        <p>We accept payments through secure third-party processors. By providing payment information, you authorize us to charge the applicable fees to your chosen payment method.</p>

                        <h3>4.3 Subscriptions</h3>
                        <p>Exclusive channel memberships are offered on a subscription basis (quarterly, half-yearly, yearly, or lifetime). Subscriptions automatically renew unless canceled before the renewal date. You are responsible for canceling your subscription through your account settings.</p>

                        <h3>4.4 Refunds</h3>
                        <p>Refund requests are handled according to our <Link to="/refund">Refund Policy</Link>. Generally, refunds are provided within 7 days of purchase if you have not accessed more than 20% of the course content.</p>
                    </section>

                    <section>
                        <h2>5. Intellectual Property Rights</h2>

                        <h3>5.1 Our Content</h3>
                        <p>All content on the Platform, including but not limited to text, graphics, logos, videos, course materials, software, and data compilations, is the property of Money Miners and is protected by intellectual property laws. You may not:</p>
                        <ul>
                            <li>Copy, reproduce, distribute, or create derivative works from our content without permission</li>
                            <li>Share course materials, videos, or exclusive content with non-subscribers</li>
                            <li>Use automated tools or bots to scrape or download content from the Platform</li>
                            <li>Remove or alter any copyright, trademark, or proprietary notices</li>
                        </ul>

                        <h3>5.2 Limited License</h3>
                        <p>Upon purchase or subscription, we grant you a limited, non-exclusive, non-transferable license to access and use the educational content for personal, non-commercial purposes only.</p>

                        <h3>5.3 User-Generated Content</h3>
                        <p>By posting content in community forums or discussions, you grant us a worldwide, royalty-free license to use, display, and distribute your content on the Platform.</p>
                    </section>

                    <section>
                        <h2>6. Prohibited Conduct</h2>
                        <p>When using our Platform, you agree not to:</p>
                        <ul>
                            <li>Violate any applicable laws, regulations, or third-party rights</li>
                            <li>Impersonate any person or entity or misrepresent your affiliation</li>
                            <li>Upload malware, viruses, or any harmful code</li>
                            <li>Engage in spamming, phishing, or fraudulent activities</li>
                            <li>Interfere with or disrupt the Platform's functionality or security</li>
                            <li>Attempt to gain unauthorized access to accounts or systems</li>
                            <li>Use the Platform for market manipulation, pump-and-dump schemes, or illegal trading</li>
                            <li>Harass, abuse, or harm other users</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Disclaimers and Limitations of Liability</h2>

                        <h3>7.1 Educational Purpose Only</h3>
                        <p>
                            <strong>Money Miners is strictly an educational platform.</strong> All content, including courses, signals, and market analysis, is provided for informational purposes only and does not constitute financial, investment, tax, or legal advice. You should consult with qualified professionals before making any investment decisions.
                        </p>

                        <h3>7.2 No Guarantees</h3>
                        <p>
                            We do not guarantee any specific results, profits, or outcomes from using our Platform. Trading and investing involve substantial risk of loss, and past performance is not indicative of future results. You are solely responsible for your trading and investment decisions.
                        </p>

                        <h3>7.3 Platform Availability</h3>
                        <p>
                            While we strive to maintain continuous availability, we do not guarantee that the Platform will be error-free or uninterrupted. We reserve the right to suspend or discontinue services for maintenance, updates, or other reasons without liability.
                        </p>

                        <h3>7.4 Limitation of Liability</h3>
                        <p>
                            To the fullest extent permitted by law, Money Miners and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or opportunities, arising from your use of or inability to use the Platform.
                        </p>
                    </section>

                    <section>
                        <h2>8. Indemnification</h2>
                        <p>
                            You agree to indemnify, defend, and hold harmless Money Miners, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.
                        </p>
                    </section>

                    <section>
                        <h2>9. Third-Party Links and Services</h2>
                        <p>
                            Our Platform may contain links to third-party websites, services, or resources. We are not responsible for the content, accuracy, or practices of these external sites. Your interactions with third parties are solely between you and them.
                        </p>
                    </section>

                    <section>
                        <h2>10. Modifications to the Platform</h2>
                        <p>
                            We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time without notice. We may also update course content, pricing, or features as needed to improve user experience.
                        </p>
                    </section>

                    <section>
                        <h2>11. Governing Law and Dispute Resolution</h2>

                        <h3>11.1 Governing Law</h3>
                        <p>These Terms are governed by and construed in accordance with the laws of India, without regard to conflict of law principles.</p>

                        <h3>11.2 Dispute Resolution</h3>
                        <p>
                            Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in English and take place in India.
                        </p>

                        <h3>11.3 Class Action Waiver</h3>
                        <p>You agree to resolve disputes on an individual basis and waive the right to participate in class actions or class arbitrations.</p>
                    </section>

                    <section>
                        <h2>12. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
                        </p>
                    </section>

                    <section>
                        <h2>13. Contact Information</h2>
                        <p>For questions, concerns, or support regarding these Terms of Service, please contact us:</p>
                        <div className="contact-info">
                            <p><strong>Money Miners</strong></p>
                            <p>Email: <a href="mailto:prithwi1016@gmail.com">prithwi1016@gmail.com</a></p>
                            <p>Support: <a href="mailto:prithwi1016@gmail.com">prithwi1016@gmail.com</a></p>
                            <p>Website: <a href="https://moneyminers.in">moneyminers.in</a></p>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
