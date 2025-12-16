/**
 * Grand Gimeno Tracking Utility
 * Handles GCLID (Google Ads), FBCLID (Meta), UTM parameters, and attribution tracking
 */

// Cookie helper functions
function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; secure; samesite=Lax";
}

function getQueryParam(param: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Generate a unique event ID for CAPI deduplication
 */
function generateEventId(): string {
  return `gg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Captures tracking parameters from URL and stores them in cookies
 */
function captureTrackingParameters(): void {
  // 1. GCLID (Google Click ID) Logic
  const gclid = getQueryParam('gclid');
  if (gclid) {
    setCookie('gclid', gclid, 90);
  }

  // 2. FBCLID (Facebook Click ID) & FBC Logic
  const fbclid = getQueryParam('fbclid');
  const fbc = getCookie('_fbc');

  if (fbclid && !fbc) {
    const timestamp = new Date().getTime();
    const newFbc = `fb.1.${timestamp}.${fbclid}`;
    setCookie('_fbc', newFbc, 90);
  }

  // 3. UTM Parameters - Store for session
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  utmParams.forEach(param => {
    const value = getQueryParam(param);
    if (value) {
      setCookie(param, value, 30); // 30 day attribution window
    }
  });

  // 4. Landing Page - Capture on first visit
  if (!getCookie('landing_page')) {
    setCookie('landing_page', window.location.href, 30);
  }

  // 5. Referrer - Capture on first visit
  if (!getCookie('referrer') && document.referrer) {
    setCookie('referrer', document.referrer, 30);
  }
}

/**
 * Polls for HubSpot form fields and fills them with tracking data
 * Uses MutationObserver for efficiency, falls back to polling if needed
 */
function waitForFormAndFill(): void {
  const maxAttempts = 50; // 10 seconds max (50 * 200ms)
  let attempts = 0;

  const fillFormFields = (): boolean => {
    // Ad platform tracking fields
    const gclidField = document.querySelector('input[name="gclid"]') as HTMLInputElement;
    const fbcField = document.querySelector('input[name="meta_fbc"]') as HTMLInputElement;
    const fbpField = document.querySelector('input[name="meta_fbp"]') as HTMLInputElement;

    // UTM parameter fields
    const utmSourceField = document.querySelector('input[name="utm_source"]') as HTMLInputElement;
    const utmMediumField = document.querySelector('input[name="utm_medium"]') as HTMLInputElement;
    const utmCampaignField = document.querySelector('input[name="utm_campaign"]') as HTMLInputElement;
    const utmContentField = document.querySelector('input[name="custom_utm_content"]') as HTMLInputElement;
    const utmTermField = document.querySelector('input[name="custom_utm_term"]') as HTMLInputElement;

    // Attribution fields
    const landingPageField = document.querySelector('input[name="landing_page_url"]') as HTMLInputElement;
    const referrerField = document.querySelector('input[name="referrer_url"]') as HTMLInputElement;
    const eventIdField = document.querySelector('input[name="event_id"]') as HTMLInputElement;

    // Check if at least one field exists
    if (!gclidField && !fbcField && !fbpField && !utmSourceField && !landingPageField) {
      return false;
    }

    // Fill ad platform tracking fields
    const finalGclid = getCookie('gclid') || getQueryParam('gclid');
    const finalFbc = getCookie('_fbc');
    const finalFbp = getCookie('_fbp');

    if (finalGclid && gclidField) {
      gclidField.value = finalGclid;
      console.log('[Tracking] GCLID field populated:', finalGclid);
    }

    if (finalFbc && fbcField) {
      fbcField.value = finalFbc;
      console.log('[Tracking] Meta FBC field populated:', finalFbc);
    }

    if (finalFbp && fbpField) {
      fbpField.value = finalFbp;
      console.log('[Tracking] Meta FBP field populated:', finalFbp);
    }

    // Fill UTM parameter fields
    const utmSource = getCookie('utm_source') || getQueryParam('utm_source');
    const utmMedium = getCookie('utm_medium') || getQueryParam('utm_medium');
    const utmCampaign = getCookie('utm_campaign') || getQueryParam('utm_campaign');
    const utmContent = getCookie('utm_content') || getQueryParam('utm_content');
    const utmTerm = getCookie('utm_term') || getQueryParam('utm_term');

    if (utmSource && utmSourceField) {
      utmSourceField.value = utmSource;
      console.log('[Tracking] UTM Source field populated:', utmSource);
    }

    if (utmMedium && utmMediumField) {
      utmMediumField.value = utmMedium;
      console.log('[Tracking] UTM Medium field populated:', utmMedium);
    }

    if (utmCampaign && utmCampaignField) {
      utmCampaignField.value = utmCampaign;
      console.log('[Tracking] UTM Campaign field populated:', utmCampaign);
    }

    if (utmContent && utmContentField) {
      utmContentField.value = utmContent;
      console.log('[Tracking] UTM Content field populated:', utmContent);
    }

    if (utmTerm && utmTermField) {
      utmTermField.value = utmTerm;
      console.log('[Tracking] UTM Term field populated:', utmTerm);
    }

    // Fill attribution fields
    const landingPage = getCookie('landing_page');
    const referrer = getCookie('referrer');
    const eventId = generateEventId();

    if (landingPage && landingPageField) {
      landingPageField.value = landingPage;
      console.log('[Tracking] Landing Page field populated:', landingPage);
    }

    if (referrer && referrerField) {
      referrerField.value = referrer;
      console.log('[Tracking] Referrer field populated:', referrer);
    }

    if (eventIdField) {
      eventIdField.value = eventId;
      console.log('[Tracking] Event ID field populated:', eventId);
    }

    return true;
  };

  // Try to fill immediately first
  if (fillFormFields()) {
    console.log('[Tracking] Form fields found and filled immediately');
    return;
  }

  // Set up MutationObserver to watch for form changes
  const formContainer = document.getElementById('hubspot-form-container');
  
  if (formContainer) {
    const observer = new MutationObserver((mutations, obs) => {
      if (fillFormFields()) {
        console.log('[Tracking] Form fields found and filled via MutationObserver');
        obs.disconnect();
      }
    });

    observer.observe(formContainer, {
      childList: true,
      subtree: true
    });

    // Safety timeout - disconnect observer after 15 seconds
    setTimeout(() => {
      observer.disconnect();
      console.log('[Tracking] MutationObserver disconnected after timeout');
    }, 15000);
  }

  // Fallback polling mechanism
  const pollInterval = setInterval(() => {
    attempts++;

    if (fillFormFields()) {
      console.log('[Tracking] Form fields found and filled via polling');
      clearInterval(pollInterval);
      return;
    }

    if (attempts >= maxAttempts) {
      console.warn('[Tracking] Form fields not found after maximum attempts');
      clearInterval(pollInterval);
    }
  }, 200);
}

/**
 * Initialize tracking system
 * Call this from your React component's useEffect
 */
export function initializeTracking(): void {
  // Capture tracking parameters immediately
  captureTrackingParameters();

  // Wait for form to render, then fill fields
  waitForFormAndFill();
}