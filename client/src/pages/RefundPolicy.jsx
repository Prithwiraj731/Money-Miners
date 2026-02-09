import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const RefundPolicy = () => {
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
                    <DollarSign className="legal-icon" size={48} />
                    <h1>Refund Policy</h1>
                    <p className="last-updated">Last Updated: February 9, 2026</p>
                </motion.div>

                <motion.div
                    className="legal-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <section>
                        <h2>1. Our Commitment to You</h2>
                        <p>
                            At Money Miners, we stand behind the quality of our educational content. We want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions under which refunds are provided for courses and exclusive channel memberships.
                        </p>
                        <p>
                            We encourage you to review course previews, descriptions, and free content before making a purchase to ensure the course meets your needs and expectations.
                        </p>
                    </section>

                    <section>
                        <h2>2. 7-Day Money-Back Guarantee (Courses)</h2>

                        <h3>2.1 Eligibility Criteria</h3>
                        <p>We offer a 7-day money-back guarantee for all our courses, subject to the following conditions:</p>
                        <ul>
                            <li>You request a refund within <strong>7 days</strong> of your purchase date</li>
                            <li>You have accessed <strong>less than 20%</strong> of the course content (videos, materials, quizzes)</li>
                            <li>You provide a valid reason for the refund request</li>
                            <li>Your account is in good standing with no violations of our Terms of Service</li>
                        </ul>

                        <h3>2.2 Non-Refundable Scenarios</h3>
                        <p>Refunds will <strong>not</strong> be provided in the following cases:</p>
                        <ul>
                            <li>More than 7 days have passed since the purchase date</li>
                            <li>You have accessed more than 20% of the course content</li>
                            <li>You have downloaded course materials, certificates, or exclusive resources</li>
                            <li>The refund request is made in bad faith or violates our policies</li>
                            <li>You purchased the course during a promotional discount or bundle deal (special terms may apply)</li>
                        </ul>

                        <h3>2.3 How Content Access is Calculated</h3>
                        <p>Content access includes:</p>
                        <ul>
                            <li>Video watch time (even partial viewing counts as access)</li>
                            <li>Downloaded PDFs, worksheets, or course materials</li>
                            <li>Completed quizzes or assignments</li>
                            <li>Participation in course discussions or forums</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Exclusive Channel Membership Refunds</h2>

                        <h3>3.1 Quarterly and Half-Yearly Subscriptions</h3>
                        <p>For quarterly (3-month) and half-yearly (6-month) subscriptions:</p>
                        <ul>
                            <li>Refunds are available within <strong>7 days</strong> of the initial subscription purchase</li>
                            <li>You must not have accessed premium signals, private groups, or exclusive content</li>
                            <li>Pro-rated refunds are <strong>not available</strong> after the 7-day window</li>
                        </ul>

                        <h3>3.2 Yearly Subscriptions</h3>
                        <p>For yearly (12-month) subscriptions:</p>
                        <ul>
                            <li>Refunds are available within <strong>14 days</strong> of purchase</li>
                            <li>You must not have accessed more than 10% of premium content or signals</li>
                            <li>After 14 days, refunds are at the sole discretion of Money Miners management</li>
                        </ul>

                        <h3>3.3 Lifetime Membership</h3>
                        <p>For lifetime memberships:</p>
                        <ul>
                            <li>Refunds are available within <strong>30 days</strong> of purchase</li>
                            <li>You must not have accessed more than 5% of premium content</li>
                            <li>A detailed reason for the refund must be provided</li>
                            <li>Lifetime memberships purchased during special promotions may have different refund terms</li>
                        </ul>

                        <h3>3.4 Subscription Cancellations</h3>
                        <p>
                            You can cancel your subscription at any time from your account settings. Cancellation stops future billing, but you retain access to the exclusive channel until the end of your current billing period. <strong>No refunds are provided for partial billing periods.</strong>
                        </p>
                    </section>

                    <section>
                        <h2>4. How to Request a Refund</h2>

                        <h3>4.1 Step-by-Step Process</h3>
                        <ol>
                            <li><strong>Contact Support:</strong> Email us at <a href="mailto:tyaseen500@gmail.com">tyaseen500@gmail.com</a> or <a href="mailto:prithwi1016@gmail.com">prithwi1016@gmail.com</a></li>
                            <li><strong>Provide Details:</strong> Include your order ID, purchase date, and reason for the refund</li>
                            <li><strong>Verification:</strong> Our team will verify your eligibility according to this policy</li>
                            <li><strong>Approval:</strong> If approved, you will receive a confirmation email within 2-3 business days</li>
                            <li><strong>Processing:</strong> Refunds are processed within 5-7 business days from approval</li>
                        </ol>

                        <h3>4.2 Required Information</h3>
                        <p>When requesting a refund, please include:</p>
                        <ul>
                            <li>Full name and registered email address</li>
                            <li>Order ID or transaction reference number</li>
                            <li>Date of purchase</li>
                            <li>Course or subscription name</li>
                            <li>Detailed reason for the refund request</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Refund Processing</h2>

                        <h3>5.1 Processing Time</h3>
                        <p>Once your refund is approved:</p>
                        <ul>
                            <li>Refunds are initiated within <strong>5-7 business days</strong></li>
                            <li>The refund will be credited to your original payment method</li>
                            <li>It may take an additional 7-10 business days for the funds to appear in your account, depending on your bank or payment provider</li>
                        </ul>

                        <h3>5.2 Refund Method</h3>
                        <p>Refunds are processed through the same payment method used for the original purchase:</p>
                        <ul>
                            <li><strong>Credit/Debit Card:</strong> Refund appears as a credit on your card statement</li>
                            <li><strong>UPI/Net Banking:</strong> Refund is credited directly to the linked bank account</li>
                            <li><strong>Wallet Payments:</strong> Refund is returned to the wallet balance</li>
                        </ul>

                        <h3>5.3 Account Suspension</h3>
                        <p>Upon refund approval, your access to the course or exclusive channel will be revoked immediately. You will no longer be able to access any course materials, videos, or membership benefits.</p>
                    </section>

                    <section>
                        <h2>6. Special Circumstances</h2>

                        <h3>6.1 Technical Issues</h3>
                        <p>
                            If you experience technical issues preventing you from accessing purchased content, please contact support <strong>before</strong> requesting a refund. We will work to resolve technical problems promptly. Refunds for technical issues are considered on a case-by-case basis.
                        </p>

                        <h3>6.2 Course Updates or Discontinuation</h3>
                        <p>
                            If a course is significantly updated or discontinued after your purchase, you may be eligible for a refund or credit toward another course. Contact support for assistance.
                        </p>

                        <h3>6.3 Duplicate Purchases</h3>
                        <p>
                            If you accidentally purchase the same course or subscription twice, contact us immediately. We will provide a full refund for the duplicate purchase, regardless of the refund window.
                        </p>

                        <h3>6.4 Chargebacks and Disputes</h3>
                        <p>
                            If you initiate a chargeback or payment dispute with your bank without first contacting us, your account will be suspended immediately pending investigation. We encourage you to contact our support team first to resolve any billing issues.
                        </p>
                    </section>

                    <section>
                        <h2>7. Bundle and Promotional Offers</h2>
                        <p>
                            Courses or memberships purchased as part of a bundle, promotional discount, or limited-time offer may have different refund terms. These terms will be clearly stated at the time of purchase. Generally:
                        </p>
                        <ul>
                            <li>Bundle deals are refundable only if <strong>no individual course</strong> in the bundle has been accessed</li>
                            <li>Promotional discounts do not extend the refund window</li>
                            <li>Limited-time offers may be marked as "Final Sale" and are non-refundable</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Exceptions and Discretionary Refunds</h2>
                        <p>
                            In exceptional circumstances (e.g., medical emergencies, natural disasters, or other hardships), we may consider refund requests outside the standard policy at our sole discretion. Contact our support team with documentation to request consideration.
                        </p>
                    </section>

                    <section>
                        <h2>9. Changes to This Refund Policy</h2>
                        <p>
                            We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on this page. Your purchase constitutes acceptance of the Refund Policy in effect at the time of purchase.
                        </p>
                    </section>

                    <section>
                        <h2>10. Contact Us</h2>
                        <p>If you have questions about our Refund Policy or need assistance with a refund request, please contact us:</p>
                        <div className="contact-info">
                            <p><strong>Money Miners</strong></p>
                            <p><strong>Refund Support Team</strong></p>
                            <p>Email: <a href="mailto:tyaseen500@gmail.com">tyaseen500@gmail.com</a></p>
                            <p>Support: <a href="mailto:prithwi1016@gmail.com">prithwi1016@gmail.com</a></p>
                            <p>Website: <a href="https://moneyminers.in">moneyminers.in</a></p>
                            <p>Response Time: Within 24-48 hours on business days</p>
                        </div>
                    </section>

                    <section className="refund-summary">
                        <h2>Quick Reference: Refund Windows</h2>
                        <div className="refund-table">
                            <div className="refund-row header">
                                <div>Product Type</div>
                                <div>Refund Window</div>
                                <div>Content Access Limit</div>
                            </div>
                            <div className="refund-row">
                                <div>Courses</div>
                                <div>7 days</div>
                                <div>Less than 20%</div>
                            </div>
                            <div className="refund-row">
                                <div>Quarterly/Half-Yearly Membership</div>
                                <div>7 days</div>
                                <div>No premium access</div>
                            </div>
                            <div className="refund-row">
                                <div>Yearly Membership</div>
                                <div>14 days</div>
                                <div>Less than 10%</div>
                            </div>
                            <div className="refund-row">
                                <div>Lifetime Membership</div>
                                <div>30 days</div>
                                <div>Less than 5%</div>
                            </div>
                        </div>
                    </section>
                </motion.div>
            </div>
        </div>
    );
};

export default RefundPolicy;
