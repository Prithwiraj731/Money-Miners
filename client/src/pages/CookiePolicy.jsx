import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cookie, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const CookiePolicy = () => {
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
                    <Cookie className="legal-icon" size={48} />
                    <h1>Cookie Policy</h1>
                    <p className="last-updated">Last Updated: February 9, 2026</p>
                </motion.div>

                <motion.div
                    className="legal-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
                        </p>
                        <p>
                            Cookies help us understand how you interact with Money Miners, remember your preferences, and improve your overall user experience. This Cookie Policy explains what cookies are, how we use them, and how you can control them.
                        </p>
                    </section>

                    <section>
                        <h2>2. Types of Cookies We Use</h2>

                        <h3>2.1 Essential Cookies</h3>
                        <p>These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.</p>
                        <ul>
                            <li><strong>Authentication cookies:</strong> Keep you logged in as you navigate between pages</li>
                            <li><strong>Security cookies:</strong> Protect your account from unauthorized access and fraud</li>
                            <li><strong>Session cookies:</strong> Maintain your shopping cart and course selections</li>
                        </ul>
                        <p><em>These cookies cannot be disabled as they are essential for the website to work.</em></p>

                        <h3>2.2 Performance Cookies</h3>
                        <p>These cookies collect information about how visitors use our website, helping us improve functionality and user experience.</p>
                        <ul>
                            <li><strong>Analytics cookies:</strong> Track page visits, time spent on pages, and navigation patterns</li>
                            <li><strong>Error tracking:</strong> Monitor technical issues and application errors</li>
                            <li><strong>Load balancing:</strong> Optimize server performance and response times</li>
                        </ul>

                        <h3>2.3 Functional Cookies</h3>
                        <p>These cookies enable enhanced functionality and personalization based on your activity.</p>
                        <ul>
                            <li><strong>Preference cookies:</strong> Remember your settings, language, and display preferences</li>
                            <li><strong>Personalization:</strong> Customize course recommendations and content</li>
                            <li><strong>Video playback:</strong> Remember your playback position and quality settings</li>
                        </ul>

                        <h3>2.4 Marketing and Tracking Cookies</h3>
                        <p>These cookies track your browsing activity to deliver relevant ads and measure campaign effectiveness.</p>
                        <ul>
                            <li><strong>Advertising cookies:</strong> Show you relevant ads based on your interests</li>
                            <li><strong>Retargeting:</strong> Display ads for courses you've viewed but not purchased</li>
                            <li><strong>Social media cookies:</strong> Enable sharing and social media integration</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Third-Party Cookies</h2>
                        <p>We use services from trusted third-party providers that may set cookies on your device:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> To understand website usage and user behavior</li>
                            <li><strong>Supabase:</strong> For database authentication and secure data storage</li>
                            <li><strong>Vercel:</strong> For content delivery and performance optimization</li>
                            <li><strong>Payment processors:</strong> To handle secure payment transactions</li>
                        </ul>
                        <p>
                            These third parties have their own privacy policies and cookie policies. We recommend reviewing their policies to understand how they use cookies.
                        </p>
                    </section>

                    <section>
                        <h2>4. How We Use Cookies</h2>
                        <p>We use cookies for the following purposes:</p>
                        <ul>
                            <li><strong>Authentication:</strong> Keep you logged in and verify your identity</li>
                            <li><strong>Security:</strong> Protect against fraudulent activity and unauthorized access</li>
                            <li><strong>Preferences:</strong> Remember your settings, language, and customization choices</li>
                            <li><strong>Analytics:</strong> Understand how you use our platform to improve features and content</li>
                            <li><strong>Performance:</strong> Optimize page load times and server efficiency</li>
                            <li><strong>Marketing:</strong> Deliver relevant ads and measure campaign success</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Managing Cookies</h2>

                        <h3>5.1 Browser Settings</h3>
                        <p>Most web browsers allow you to control cookies through their settings. You can:</p>
                        <ul>
                            <li>View and delete cookies stored on your device</li>
                            <li>Block all cookies or only third-party cookies</li>
                            <li>Clear cookies when you close your browser</li>
                            <li>Set exceptions for specific websites</li>
                        </ul>

                        <h3>5.2 How to Manage Cookies in Popular Browsers</h3>
                        <ul>
                            <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                            <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                            <li><strong>Microsoft Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
                        </ul>

                        <h3>5.3 Opt-Out Options</h3>
                        <p>You can opt out of certain types of cookies:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                            <li><strong>Advertising cookies:</strong> Visit the <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">Your Online Choices</a> website</li>
                        </ul>

                        <p><strong>Note:</strong> Disabling cookies may affect website functionality. Some features may not work properly if you block all cookies.</p>
                    </section>

                    <section>
                        <h2>6. Cookie Retention</h2>
                        <p>Different cookies have different lifespans:</p>
                        <ul>
                            <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                            <li><strong>Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</li>
                            <li><strong>Authentication cookies:</strong> Expire after 30 days of inactivity</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Updates to This Cookie Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for legal reasons. When we make material changes, we will update the "Last Updated" date at the top of this page. Your continued use of our website constitutes acceptance of the updated policy.
                        </p>
                    </section>

                    <section>
                        <h2>8. Contact Us</h2>
                        <p>If you have questions or concerns about our use of cookies, please contact us:</p>
                        <div className="contact-info">
                            <p><strong>Money Miners</strong></p>
                            <p>Email: <a href="mailto:tyaseen500@gmail.com">tyaseen500@gmail.com</a></p>
                            <p>Support: <a href="mailto:prithwi1016@gmail.com">prithwi1016@gmail.com</a></p>
                            <p>Website: <a href="https://moneyminers.in">moneyminers.in</a></p>
                        </div>
                    </section>

                    <section className="cookie-consent-notice">
                        <h2>Cookie Consent</h2>
                        <p>
                            By continuing to use Money Miners, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by changing your browser settings or contacting us.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default CookiePolicy;
