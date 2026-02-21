// API Configuration
// Uses VITE_API_URL env var if set, otherwise auto-detects production vs development
const API_URL = import.meta.env.VITE_API_URL
    || (window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://money-miners.onrender.com');

export default API_URL;
