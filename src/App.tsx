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
  }
}

export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    // Simple guard: only run once
    if (initialized.current) return;
    initialized.current = true;
    
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
    
    // Load HubSpot Tracking Code
    window._hsq = window._hsq || [];
    (function(d,s,i,r) {
      if (d.getElementById(i)) return;
      const n = d.createElement(s);
      const e = d.getElementsByTagName(s)[0];
      n.id = i;
      n.async = true;
      n.src = 'https://js.hs-scripts.com/' + r + '.js';
      e.parentNode.insertBefore(n, e);
    })(document, 'script', 'hs-script-loader', '10024036967634037');
    
    console.log('[Tracking] Meta Pixel and HubSpot loaded');
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
      {/* <DevNav /> */}
    </HashRouter>
  );
}