# Stape Server-Side Tracking Setup Guide

## Current Status
✅ **Client-Side Tracking Active** (Standard GA4 + Meta Pixel)  
⏳ **Server-Side Tracking Ready** (Awaiting Stape configuration)

## Why Server-Side Tracking?
- **Better accuracy**: Bypass ad blockers and browser restrictions
- **Improved cookie persistence**: Server sets cookies, more reliable tracking
- **CAPI + Conversions API**: Enhanced Meta and Google conversion tracking
- **Reduced page load impact**: Offload tracking to server

---

## Setup Steps

### 1. Complete Your Stape Setup
In Stape.io:
1. Create your server container
2. Set up GA4 and Meta Pixel tags in GTM
3. Configure Facebook CAPI and Google Ads Enhanced Conversions
4. Get your **Stape server URL** (custom domain recommended)
5. Get your **GTM container ID**

### 2. Update Tracking Configuration
Open `/config/tracking.ts` and update:

```typescript
export const TRACKING_CONFIG = {
  USE_SERVER_SIDE_TRACKING: true, // Change to true
  STAPE_SERVER_URL: 'https://tracking.grandgimeno.com', // Your Stape URL
  GTM_CONTAINER_ID: 'GTM-XXXXXX', // Your GTM container ID
  
  // Keep these the same
  META_PIXEL_ID: '511510642697274',
  GA4_MEASUREMENT_ID: 'G-260342425',
};
```

### 3. Rebuild & Deploy
```bash
npm run build
# Deploy to Vercel
```

---

## What Switches Automatically

When you enable server-side tracking, these URLs automatically switch:

### GA4
- **Before:** `https://www.googletagmanager.com/gtag/js`
- **After:** `https://tracking.grandgimeno.com/gtag/js`

### Meta Pixel
- **Before:** `https://connect.facebook.net/en_US/fbevents.js`
- **After:** `https://tracking.grandgimeno.com/fbevents.js`

### GTM (if you add it)
- **Before:** `https://www.googletagmanager.com/gtm.js`
- **After:** `https://tracking.grandgimeno.com/gtm.js`

---

## Current Tracking Features (Working Now)

✅ **Meta Pixel**
- PageView on load
- Lead event on form submit
- _fbc and _fbp capture
- LocalStorage backup for cookies

✅ **Google Analytics 4**
- PageView tracking
- Conversion event on form submit
- Event categorization

✅ **Conversion Attribution**
- Meta FBC/FBP cookies captured
- GCLID parameter captured
- HubSpot form field injection
- LocalStorage backup for resilience

---

## Testing After Stape Setup

1. **Check Network Tab**: Verify tracking requests go to your Stape domain
2. **Facebook Events Manager**: Confirm events show "Browser and Server" source
3. **GA4 Realtime**: Verify events appear
4. **Test Ad Blocker**: Should still track with server-side enabled

---

## Questions?
- Stape docs: https://stape.io/docs
- GTM Server-Side: https://developers.google.com/tag-platform/tag-manager/server-side
