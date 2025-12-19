import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ThankYouPage from './pages/ThankYouPage';
import PrivatePage from './pages/PrivatePage';
import GTMLoader from './components/GTMLoader';
import DevNav from './components/DevNav';

export default function App() {
  // All tracking is now handled by GTM (GTM-TJG6R99K) via Stape server-side
  // Meta Pixel, GA4, and HubSpot are all loaded through GTM's universal tags

  return (
    <>
      <GTMLoader />
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/private" element={<PrivatePage />} />
        </Routes>
        <DevNav />
      </HashRouter>
    </>
  );
}