# 🚀 DEPLOYMENT TEST CHECKLIST

## Before Deploying

Run these checks locally:

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Start dev server
npm run dev

# 3. Open browser to http://localhost:5173
```

### Local Testing Checklist

#### Hero Section
- [ ] "Grand Gimeno" heading is centered
- [ ] Logo appears in top-left corner
- [ ] CTA button is centered below heading
- [ ] Scroll indicator bounces at bottom

#### Scroll Behavior
- [ ] Desktop CTA appears in top-right after scrolling
- [ ] Clicking CTA scrolls smoothly to form
- [ ] All animations trigger on scroll

#### Content Sections
- [ ] "Where History Meets Luxury" section is centered
- [ ] Featured image displays at full width
- [ ] 3-column grid on desktop (1024px+)
- [ ] 2-column grid on tablet (768px+)
- [ ] 1-column grid on mobile (<768px)

#### HubSpot Form
- [ ] Form loads within 2 seconds
- [ ] All fields are styled with your design system
- [ ] Labels use Space Mono font
- [ ] Input fields have blue underline on focus
- [ ] Submit button is blue (#669CC4)

#### Form Submission
- [ ] Fill out form and submit
- [ ] Page transitions to "Thank You" view
- [ ] Thank you page is centered
- [ ] Logo remains in top-left

#### Responsive Testing
Test these breakpoints:
- [ ] 1920px (Desktop) - 3 columns
- [ ] 1024px (Laptop) - 3 columns
- [ ] 768px (Tablet) - 2 columns
- [ ] 375px (Mobile) - 1 column

## Deploy to Vercel

### Option 1: GitHub Auto-Deploy
```bash
git add .
git commit -m "Zero-Tailwind rebuild - production ready"
git push origin main
```

Vercel will auto-deploy if connected to your repo.

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option 3: Vercel Dashboard
1. Go to vercel.com/dashboard
2. Select your project
3. Click "Deployments"
4. Click "Redeploy" → Check "Clear cache"
5. Click "Deploy"

## After Deployment

### Production URL Testing

Visit your Vercel URL (e.g., `grandgimeno.vercel.app`) and test:

#### Layout Verification
- [ ] All content is horizontally centered
- [ ] No content stuck to left side
- [ ] Sections have proper vertical spacing
- [ ] Images load correctly

#### Mobile Testing (375px)
- [ ] Open Chrome DevTools
- [ ] Toggle device toolbar (Cmd/Ctrl + Shift + M)
- [ ] Select iPhone SE (375px)
- [ ] Verify layout is responsive
- [ ] Test form on mobile

#### Performance Check
Open Chrome DevTools → Lighthouse:
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90

#### Form Functionality
- [ ] Fill out form with real data
- [ ] Submit form
- [ ] Check HubSpot dashboard for submission
- [ ] Verify email notification received

#### Tracking Verification
Open Chrome DevTools → Network tab:
- [ ] Filter by "gtag" - GA4 should fire
- [ ] Filter by "fbevents" - Meta Pixel should fire
- [ ] Fill form and submit
- [ ] Check for tracking events

### Meta Ads Manager Check
1. Go to Meta Events Manager
2. Select your Pixel (511510642697274)
3. Test Events tab
4. Enter your Vercel URL
5. Verify "PageView" fires
6. Submit form
7. Verify "Lead" event fires

### Google Analytics Check
1. Go to GA4 Property (G-260342425)
2. Realtime → Overview
3. Visit your Vercel URL
4. You should see 1 active user
5. Submit form
6. Check Events for form submission

## Troubleshooting

### Layout Still Left-Aligned
**Check:** View source and verify globals.css loads
**Fix:** Clear Vercel cache and redeploy

### Form Not Loading
**Check:** Browser console for errors
**Check:** HubSpot form ID matches (aff9e4b8-d8da-425c-ae96-e8fc1c25b850)
**Fix:** Verify script tag in index.html

### Images Not Loading
**Check:** Network tab for 404 errors
**Check:** Image URLs are valid Unsplash links
**Fix:** Images should load from Unsplash CDN

### Tracking Not Working
**Check:** Browser console for tracking script errors
**Check:** Ad blockers are disabled
**Check:** index.html has correct Pixel/GA IDs

### CSS Not Applying
**Check:** View source → styles/globals.css loads
**Check:** No 404 for CSS file
**Fix:** Rebuild with `npm run build`

## Success Criteria

Your deployment is successful if:

✅ Layout is centered on all devices  
✅ HubSpot form loads and submits  
✅ Thank you page displays after submission  
✅ Meta Pixel fires PageView and Lead events  
✅ Google Analytics tracks visits  
✅ Mobile experience is smooth  
✅ No console errors  
✅ No horizontal scroll on mobile  

## Final Verification

Test the complete user flow:

1. **User lands from Meta ad** (mobile device)
2. **Sees centered hero section** with compelling headline
3. **Scrolls through content** (animations trigger)
4. **Fills out form** (fields styled correctly)
5. **Submits form** (smooth transition)
6. **Sees thank you message** (centered, professional)
7. **Tracking fires** (Meta + GA4 capture lead)

If ALL steps work perfectly, you're ready for traffic! 🚀
