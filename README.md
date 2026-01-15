# 💰 MoneyMiners

**MoneyMiners** is a next-generation crypto trading platform built for speed, security, and a premium user experience. Featuring a stunning holographic 3D interface, real-time market data capabilities, and secure multi-signature storage integration.

## 🚀 Features

*   **Premium 3D Aesthetics**: Immersive UI with holographic animations, scrolling marquees, and dynamic 3D pop-out features using Spline and Framer Motion.
*   **Secure Authentication**: Robust JWT-based auth system with bcrypt hashing and Supabase integration.
*   **Real-time Dashboard**: Interactive trading interface with live charts and data verification.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

### Client
*   **React** (Vite)
*   **Tailwind CSS** (v4)
*   **Framer Motion** (Animations)
*   **Spline** (3D Models)
*   **Lucide React** (Icons)

### Server
*   **Node.js & Express**
*   **Supabase** (Database & Auth)
*   **JSON Web Tokens (JWT)**
*   **Nodemailer**

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Prithwiraj731/Money-Miners.git
    cd Money-Miners
    ```

2.  **Install Client Dependencies**
    ```bash
    cd client
    npm install
    ```

3.  **Install Server Dependencies**
    ```bash
    cd ../server
    npm install
    ```

4.  **Environment Setup**
    Create a `.env` file in the `server` directory and add your credentials:
    ```env
    PORT=5000
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    JWT_SECRET=your_jwt_secret
    ```

5.  **Run the App**
    *   **Server**: `npm run dev` (in `server/` terminal)
    *   **Client**: `npm run dev` (in `client/` terminal)

## 🎨 Contributors

*   **Taha Yasin Aftab** - *CEO*
*   **Prithwiraj** - *Lead Developer*

## 📄 License

This project is licensed under the MIT License.
