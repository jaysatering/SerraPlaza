import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import ThankYouPage from './pages/ThankYouPage';
import PrivatePage from './pages/PrivatePage';
import DevNav from './components/DevNav';

export default function App() {
  const pixelInitialized = useRef(false);

  useEffect(() => {
    // Initialize Meta Pixel only once - bulletproof check
    if (pixelInitialized.current || window.fbq) {
      console.log('Meta Pixel already initialized - skipping');
      return;
    }
    
    pixelInitialized.current = true; // Set flag BEFORE loading
    
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
    console.log('Meta Pixel initialized');
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

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}