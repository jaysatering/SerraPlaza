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
    _metaPixelLoaded?: boolean; // Global flag to prevent double-init
  }
}

export default function App() {
  const pixelInitialized = useRef(false);

  useEffect(() => {
    // Triple-layer protection against double initialization
    if (pixelInitialized.current || window.fbq || window._metaPixelLoaded) {
      console.log('[Meta Pixel] Already initialized - skipping');
      return;
    }
    
    // Set ALL flags BEFORE loading
    pixelInitialized.current = true;
    window._metaPixelLoaded = true;
    
    console.log('[Meta Pixel] Initializing...');
    
    (function(f,b,e,v,n,t,s) {
      if(f.fbq) return;
      n=f.fbq=function(){
        n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
      };
      if(!f._fbq) f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    window.fbq('init', '511510642697274');
    window.fbq('track', 'PageView');
    console.log('[Meta Pixel] Initialized successfully');
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