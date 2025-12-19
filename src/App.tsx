import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import ThankYouPage from './pages/ThankYouPage';
import PrivatePage from './pages/PrivatePage';
import DevNav from './components/DevNav';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    gtag: any;
    dataLayer: any[];
    _hsq: any[];
    hbspt: any;
  }
}

export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    // Simple guard: only run once
    if (initialized.current) return;
    initialized.current = true;
    
    // Initialize dataLayer for GTM (safe even if GTM not loaded)
    window.dataLayer = window.dataLayer || [];
    
    // Load Meta Pixel (simple version)
    (function(f,b,e,v,n,t,s) {
      if(f.fbq) return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
    })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', '511510642697274');
    window.fbq('track', 'PageView');
    
    // Load HubSpot Website Tracking Code
    window._hsq = window._hsq || [];
    const hsScript = document.createElement('script');
    hsScript.id = 'hs-script-loader';
    hsScript.type = 'text/javascript';
    hsScript.async = true;
    hsScript.defer = true;
    hsScript.src = '//js-na2.hs-scripts.com/48463492.js';
    document.head.appendChild(hsScript);
    
    console.log('[Tracking] Meta Pixel and HubSpot loaded');
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
      <DevNav />
    </HashRouter>
  );
}