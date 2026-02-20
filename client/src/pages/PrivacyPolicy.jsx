import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const PrivacyPolicy = () => {
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
                    <Shield className="legal-icon" size={48} />
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last Updated: February 9, 2026</p>
                </motion.div>

                <motion.div
                    className="legal-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to Money Miners ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website moneyminers.in and use our services.
                        </p>
                        <p>
                            By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>

                        <h3>2.1 Personal Information</h3>
                        <p>We may collect the following personal information when you register or interact with our platform:</p>
                        <ul>
                            <li><strong>Account Information:</strong> Full name, username, email address, phone number, and password</li>
                            <li><strong>Profile Data:</strong> Trading experience level, investment preferences, and learning goals</li>
                            <li><strong>Payment Information:</strong> Billing details and transaction history (processed securely through third-party payment processors)</li>
                            <li><strong>Communication Data:</strong> Contact form submissions, email correspondence, and support inquiries</li>
                        </ul>

                        <h3>2.2 Automatically Collected Information</h3>
                        <ul>
                            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, navigation patterns, and feature usage</li>
                            <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers</li>
                            <li><strong>Cookies and Tracking:</strong> Session data, preferences, and analytics information</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the information we collect for the following purposes:</p>
                        <ul>
                            <li><strong>Service Delivery:</strong> To provide, maintain, and improve our trading education platform and exclusive channel services</li>
                            <li><strong>Account Management:</strong> To create and manage your account, process transactions, and verify your identity</li>
                            <li><strong>Communication:</strong> To send course updates, market insights, newsletters, and respond to your inquiries</li>
                            <li><strong>Personalization:</strong> To customize your learning experience and recommend relevant courses</li>
                            <li><strong>Analytics:</strong> To understand platform usage, improve features, and optimize user experience</li>
                            <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other security threats</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Information Sharing and Disclosure</h2>
                        <p>We do not sell your personal information. We may share your data only in the following circumstances:</p>

                        <h3>4.1 Service Providers</h3>
                        <p>We engage trusted third-party companies to perform functions on our behalf, such as:</p>
                        <ul>
                            <li>Payment processing (Razorpay, Stripe)</li>
                            <li>Email delivery services (Gmail SMTP, SendGrid)</li>
                            <li>Database hosting (Supabase)</li>
                            <li>Analytics providers (Google Analytics)</li>
                        </ul>

                        <h3>4.2 Legal Requirements</h3>
                        <p>We may disclose your information if required by law or in response to valid requests by public authorities, including to meet national security or law enforcement requirements.</p>

                        <h3>4.3 Business Transfers</h3>
                        <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>
                    </section>

                    <section>
                        <h2>5. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your personal information, including:
                        </p>
                        <ul>
                            <li><strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS protocols</li>
                            <li><strong>Secure Storage:</strong> Passwords are hashed using bcrypt; sensitive data is encrypted at rest</li>
                            <li><strong>Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
                            <li><strong>Regular Audits:</strong> Periodic security assessments and vulnerability testing</li>
                        </ul>
                        <p>
                            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2>6. Your Rights and Choices</h2>
                        <p>You have the following rights regarding your personal data:</p>
                        <ul>
                            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate or incomplete information</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails via the link in each email</li>
                            <li><strong>Data Portability:</strong> Request a portable copy of your data in a structured format</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                        </ul>
                        <p>To exercise these rights, contact us at <a href="mailto:prithwi1016@gmail.com">prithwi1016@gmail.com</a>.</p>
                    </section>

                    <section>
                        <h2>7. Cookies and Tracking Technologies</h2>
                        <p>We use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings. For more details, see our <Link to="/cookies">Cookie Policy</Link>.</p>
                    </section>

                    <section>
                        <h2>8. Data Retention</h2>
                        <p>
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Upon account deletion, we will remove or anonymize your data within 30 days, except where retention is required for legal or regulatory compliance.
                        </p>
                    </section>

                    <section>
                        <h2>9. Children's Privacy</h2>
                        <p>
                            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child without parental consent, we will take steps to delete that information promptly.
                        </p>
                    </section>

                    <section>
                        <h2>10. International Data Transfers</h2>
                        <p>
                            Your information may be transferred to and maintained on servers located outside of your jurisdiction. By using our services, you consent to the transfer of your data to India and other countries where we operate.
                        </p>
                    </section>

                    <section>
                        <h2>11. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2>12. Contact Us</h2>
                        <p>If you have questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
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

export default PrivacyPolicy;
