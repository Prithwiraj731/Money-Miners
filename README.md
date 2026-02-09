# 💰 Money Miners

> **A secure, professional crypto trading education platform with enterprise-grade security and premium user experience**

[![Security: Enterprise-Grade](https://img.shields.io/badge/Security-Enterprise--Grade-success)](https://github.com/Prithwiraj731/Money-Miners)
[![Rate Limiting: Active](https://img.shields.io/badge/Rate%20Limiting-Active-blue)](https://github.com/Prithwiraj731/Money-Miners)
[![Authentication: JWT](https://img.shields.io/badge/Auth-JWT%20Tokens-orange)](https://github.com/Prithwiraj731/Money-Miners)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Money Miners** is a next-generation cryptocurrency trading education platform built with security-first architecture, featuring stunning 3D interfaces, real-time course management, and comprehensive legal compliance. Designed for both beginners and advanced traders.

---

## 🔒 Security First

### Enterprise-Grade Protection

Money Miners implements **production-level security** to protect your data and prevent unauthorized access:

✅ **Advanced Rate Limiting**
- Login attempts: **5 per 15 minutes** (prevents brute-force attacks)
- OTP requests: **3 per 5 minutes** (prevents SMS spam)
- Admin access: **3 per 15 minutes** (ultra-strict protection)
- Contact forms: **3 per 10 minutes** (prevents spam)

✅ **Secure Authentication**
- JWT-based authentication with **no fallback secrets**
- Role-based access control (User/Admin)
- Encrypted password storage with **bcrypt hashing**
- Environment variable validation on startup

✅ **API Security**
- Multi-origin CORS with whitelist
- Request validation and sanitization
- Comprehensive error handling (no data leaks)
- Secure headers and HTTPS enforcement

✅ **Data Protection**
- Supabase integration with RLS (Row Level Security)
- Secure environment configuration
- No sensitive data in source code
- Regular security audits

> **Your safety is our priority.** All transactions, personal data, and communications are protected by industry-standard security protocols.

---

## 🚀 Features

### For Students
- 📚 **Professional Courses** - Comprehensive trading education from basics to advanced
- 💎 **Exclusive Channel** - VIP community with premium insights and strategies
- 📊 **Interactive Dashboard** - Track your learning progress and achievements
- 🎓 **Certification Ready** - Structured curriculum with clear learning paths

### For Administrators
- 🛡️ **Admin Dashboard** - Secure control panel with role-based access
- 📈 **Analytics** - User engagement and course performance metrics
- 📧 **Email Notifications** - Automated confirmations and updates
- 🔐 **Protected Routes** - Multi-layer security for sensitive operations

### User Experience
- 🎨 **Premium 3D Interface** - Immersive UI with holographic animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Optimized performance with lazy loading
- 🌐 **SEO Optimized** - Proper meta tags and semantic HTML

### Legal Compliance
- 📜 **Privacy Policy** - GDPR-compliant data protection
- 📋 **Terms of Service** - Clear user agreements
- 🍪 **Cookie Policy** - Transparent tracking disclosure
- 💰 **Refund Policy** - Fair and clear refund terms

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | Modern UI framework with Vite |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Smooth animations |
| **Spline** | 3D interactive models |
| **Lucide React** | Beautiful icon library |
| **React Router** | Client-side routing |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js & Express** | RESTful API server |
| **Supabase** | PostgreSQL database with auth |
| **JWT** | Secure token-based authentication |
| **Nodemailer** | Email notifications |
| **Express Rate Limit** | DDoS and brute-force protection |
| **CORS** | Cross-origin security |
| **Bcrypt** | Password encryption |

### DevOps & Deployment
- **Vercel** - Frontend hosting (CDN, auto-deployment)
- **Render** - Backend hosting (auto-scaling, SSL)
- **GitHub Actions** - CI/CD pipeline
- **Environment Variables** - Secure configuration management

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account (free tier available)

### 1. Clone the Repository
```bash
git clone https://github.com/Prithwiraj731/Money-Miners.git
cd Money-Miners
```

### 2. Install Client Dependencies
```bash
cd client
npm install
```

### 3. Install Server Dependencies
```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

#### Server Configuration (`server/.env`)
```env
# Server
PORT=5000

# Database (Supabase)
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Authentication (REQUIRED - Server won't start without this)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars

# CORS (Comma-separated, no spaces)
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# Email (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Admin
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASS=secure-admin-password
```

> **Security Note:** Never commit `.env` files to version control. Use `.env.example` as a template.

#### Client Configuration (`client/.env.development`)
```env
VITE_API_URL=http://localhost:5000
```

#### Client Production (`client/.env.production`)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### 5. Run the Application

**Development Mode (2 terminals):**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 6. Build for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

---

## 🔐 Security Configuration

### Required Environment Variables

The server **will not start** without these critical variables:

| Variable | Purpose | Example |
|----------|---------|---------|
| `JWT_SECRET` | Token signing (min 32 chars) | `openssl rand -base64 32` |
| `SUPABASE_URL` | Database connection | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Database auth | `eyJhbGc...` |

### Optional Security Configuration

Fine-tune rate limits via environment variables:

```env
# Auth endpoints
RATE_LIMIT_AUTH_LOGIN_MAX=5
RATE_LIMIT_AUTH_OTP_MAX=3
RATE_LIMIT_ADMIN_LOGIN_MAX=3

# Contact forms
RATE_LIMIT_CONTACT_MAX=3
```

### CORS Setup

For production, update `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

## 📁 Project Structure

```
Money-Miners/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── assets/        # Images, videos, fonts
│   │   └── App.jsx        # Main app component
│   ├── .env.development   # Dev environment config
│   └── .env.production    # Prod environment config
│
├── server/                 # Express backend
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, rate limiting
│   │   ├── authMiddleware.js      # JWT verification
│   │   └── rateLimiters.js        # Rate limit configs
│   ├── routes/            # API endpoints
│   ├── models/            # Database models
│   └── server.js          # Entry point
│
└── README.md              # This file
```

---

## 🚀 Deployment Guide

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables:
   - `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy!

### Backend (Render)

1. Create new Web Service
2. Connect GitHub repository
3. Set environment variables (see above)
4. Important: Add `ALLOWED_ORIGINS` with your frontend URL
5. Deploy!

**Post-Deployment Checklist:**
- ✅ Test authentication flow
- ✅ Verify CORS allows your frontend
- ✅ Check rate limiting (try multiple logins)
- ✅ Test email notifications
- ✅ Review security logs

---

## 🛡️ API Security Features

### Rate Limiting Endpoints

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/auth/login` | 5 requests | 15 minutes |
| `POST /api/auth/send-otp` | 3 requests | 5 minutes |
| `POST /api/auth/register` | 10 requests | 1 hour |
| `POST /api/admin/login` | 3 requests | 15 minutes |
| `POST /api/contact/*` | 3 requests | 10 minutes |
| All other API routes | 200 requests | 15 minutes |

### Authentication Flow

1. User registers → Email verification
2. Login → JWT token issued (expires 7 days)
3. Protected routes require valid JWT
4. Admin routes require `role: 'admin'` in token

### Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| `401` | Unauthorized | Token missing or invalid |
| `403` | Forbidden | Insufficient permissions |
| `429` | Too Many Requests | Rate limit exceeded, retry later |
| `500` | Server Error | Contact support |

---

## 📄 Legal & Compliance

Money Miners provides comprehensive legal documentation:

- **[Privacy Policy](/privacy)** - How we handle your data
- **[Terms of Service](/terms)** - User agreement and disclaimers
- **[Cookie Policy](/cookies)** - Tracking and analytics
- **[Refund Policy](/refund)** - Refund terms and conditions

All policies are accessible via the footer and comply with:
- ✅ GDPR (European data protection)
- ✅ Indian IT Act compliance
- ✅ CAN-SPAM Act (email marketing)
- ✅ Consumer protection laws

---

## 👥 Team

| Role | Name | Contact |
|------|------|---------|
| **CEO & Founder** | Taha Yasin Aftab | [tyaseen500@gmail.com](mailto:tyaseen500@gmail.com) |
| **Lead Developer** | Prithwiraj Mazumdar | [prithwi1016@gmail.com](mailto:prithwi1016@gmail.com) |

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Security Contributions:**
If you discover a security vulnerability, please email [tyaseen500@gmail.com](mailto:tyaseen500@gmail.com) directly instead of opening a public issue.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend-as-a-service
- [Vercel](https://vercel.com/) for seamless frontend hosting
- [Render](https://render.com/) for reliable backend hosting
- [Spline](https://spline.design/) for stunning 3D graphics
- [Lucide](https://lucide.dev/) for beautiful icons

---

## 📞 Support

**Need help?**
- 📧 Email: [tyaseen500@gmail.com](mailto:tyaseen500@gmail.com)
- 📱 Phone: [+91 76673 07696](tel:+917667307696)
- 🌐 Website: [moneyminers.in](https://moneyminers.in)

**Business Hours:** Monday - Saturday, 9 AM - 6 PM IST

---

<div align="center">

**Made with ❤️ in India**

⭐ **Star this repo if you find it useful!** ⭐

[Report Bug](https://github.com/Prithwiraj731/Money-Miners/issues) · [Request Feature](https://github.com/Prithwiraj731/Money-Miners/issues)

</div>
