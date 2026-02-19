import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// ⚠️ REPLACE THIS with your actual Google Analytics 4 Measurement ID
const MEASUREMENT_ID = 'G-82WFXDWJMG';

// Initialize GA4
ReactGA.initialize(MEASUREMENT_ID);

/**
 * Analytics component that tracks page views on every route change.
 * Place this inside a <Router> so useLocation() works.
 */
export default function Analytics() {
    const location = useLocation();

    useEffect(() => {
        // Send a pageview event whenever the route changes
        ReactGA.send({
            hitType: 'pageview',
            page: location.pathname + location.search,
            title: document.title,
        });
    }, [location]);

    return null; // This component renders nothing
}
