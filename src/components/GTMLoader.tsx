import { useEffect } from 'react';
import { TRACKING_CONFIG } from '../config/tracking';

/**
 * GTMLoader Component
 * 
 * Loads Google Tag Manager from the Stape server-side tracking endpoint.
 * GTM handles all tracking: Meta Pixel, GA4, and HubSpot.
 * 
 * This component must be rendered once at the app root level.
 */
export default function GTMLoader() {
  useEffect(() => {
    // Only load if GTM is configured
    if (!TRACKING_CONFIG.GTM_CONTAINER_ID) {
      console.warn('[GTM] No container ID configured');
      return;
    }

    // Initialize dataLayer before GTM loads
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    // Determine script URL based on configuration
    const scriptUrl = TRACKING_CONFIG.USE_SERVER_SIDE_TRACKING && TRACKING_CONFIG.STAPE_SERVER_URL
      ? `${TRACKING_CONFIG.STAPE_SERVER_URL}/gtm.js?id=${TRACKING_CONFIG.GTM_CONTAINER_ID}`
      : `https://www.googletagmanager.com/gtm.js?id=${TRACKING_CONFIG.GTM_CONTAINER_ID}`;

    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    document.head.appendChild(script);

    const mode = TRACKING_CONFIG.USE_SERVER_SIDE_TRACKING ? 'server-side (Stape)' : 'client-side';
    console.log(`[GTM] Loading ${TRACKING_CONFIG.GTM_CONTAINER_ID} via ${mode}`);
    console.log(`[GTM] Script URL: ${scriptUrl}`);

  }, []);

  // Render GTM noscript iframe for users without JavaScript
  const noscriptUrl = TRACKING_CONFIG.USE_SERVER_SIDE_TRACKING && TRACKING_CONFIG.STAPE_SERVER_URL
    ? `${TRACKING_CONFIG.STAPE_SERVER_URL}/ns.html?id=${TRACKING_CONFIG.GTM_CONTAINER_ID}`
    : `https://www.googletagmanager.com/ns.html?id=${TRACKING_CONFIG.GTM_CONTAINER_ID}`;

  return (
    <noscript>
      <iframe
        src={noscriptUrl}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

declare global {
  interface Window {
    dataLayer: any[];
  }
}
