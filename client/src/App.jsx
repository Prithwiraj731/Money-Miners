import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Analytics from './components/Analytics';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Surprise from './pages/Surprise';
import Auth from './pages/Auth';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

import Dashboard from './pages/Dashboard';
import ExclusiveChannel from './pages/ExclusiveChannel';
import CoursePage from './pages/CoursePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import RefundPolicy from './pages/RefundPolicy';

function Layout() {
  const location = useLocation();
  // Hide global navbar/footer on Home page ('/') as it has internal ones
  const isHomePage = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/exclusive" element={<ExclusiveChannel />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />

        {/* Legal Pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
