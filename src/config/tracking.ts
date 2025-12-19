/**
 * Tracking Configuration
 * 
 * Serra Plaza tracking via Stape server-side GTM
 */

export const TRACKING_CONFIG = {
  // Server-Side Tracking (Stape)
  USE_SERVER_SIDE_TRACKING: true,
  STAPE_SERVER_URL: 'https://tracking.jayscatering.com',
  GTM_CONTAINER_ID: 'GTM-TJG6R99K',
  
  // Client-Side Tracking (Serra Plaza specific IDs)
  META_PIXEL_ID: '511510642697274',
  GA4_MEASUREMENT_ID: 'G-2GGX4RHXPR',
};

/**
 * Get the GTM script URL
 * Returns server-side URL if Stape is configured, otherwise returns standard GTM URL
 */
export function getGTMScriptUrl(): string {
  if (TRACKING_CONFIG.USE_SERVER_SIDE_TRACKING && TRACKING_CONFIG.STAPE_SERVER_URL) {
    return `${TRACKING_CONFIG.STAPE_SERVER_URL}/gtm.js?id=${TRACKING_CONFIG.GTM_CONTAINER_ID}`;
  }
  return `https://www.googletagmanager.com/gtm.js?id=${TRACKING_CONFIG.GTM_CONTAINER_ID}`;
}

/**
 * Get the GA4 script URL
 * Returns server-side URL if Stape is configured, otherwise returns standard GA4 URL
 */
export function getGA4ScriptUrl(): string {
  if (TRACKING_CONFIG.USE_SERVER_SIDE_TRACKING && TRACKING_CONFIG.STAPE_SERVER_URL) {
    return `${TRACKING_CONFIG.STAPE_SERVER_URL}/gtag/js?id=${TRACKING_CONFIG.GA4_MEASUREMENT_ID}`;
  }
  return `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.GA4_MEASUREMENT_ID}`;
}

/**
 * Get the Meta Pixel script URL
 * Returns server-side URL if Stape is configured, otherwise returns standard Meta Pixel URL
 */
export function getMetaPixelScriptUrl(): string {
  if (TRACKING_CONFIG.USE_SERVER_SIDE_TRACKING && TRACKING_CONFIG.STAPE_SERVER_URL) {
    return `${TRACKING_CONFIG.STAPE_SERVER_URL}/fbevents.js`;
  }
  return 'https://connect.facebook.net/en_US/fbevents.js';
}