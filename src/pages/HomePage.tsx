import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import GgLogo from '../components/GgLogo';
import { initializeTracking } from '../utils/tracking';

const oliveGroveAerial = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765859034/Serra_Plaza_Selects82_ebhc0o.jpg";
const pizzaOven = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856956/Serra_Plaza_Selects30_ix3n6x.jpg";
const oliveCeremony = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1766169496/Pasanella-Wedding-Reception-VibyCreative-29_z1ojls.jpg";

export default function HomePage() {
  const [showCTA, setShowCTA] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Show CTA after user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track hero visibility
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setHeroInView(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!formRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (hasScrolled) {
            setShowCTA(!entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(formRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasScrolled]);

  useEffect(() => {
    // 1. Generate Master ID (Unique Receipt Number)
    const masterEventId = 'serra_lp_' + new Date().getTime() + '_' + Math.floor(Math.random() * 10000);

    const script = document.createElement('script');
    script.src = '//js-na2.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na2",
          portalId: "48463492",
          formId: "52e1922c-438e-446b-9845-75bf623b620e",
          target: '#hubspot-form-container',
          
          onFormReady: function($form) {
            console.log('✅ Serra Plaza LP - Form Loaded with ID:', masterEventId);

            // --- A. GET TRACKING DATA ---
            const urlParams = new URLSearchParams(window.location.search);
            const sessionData = JSON.parse(sessionStorage.getItem('hubspot_tracking_data') || '{}');

            const getVal = (p, k) => urlParams.get(p) || sessionData[k || p] || '';
            const getCookie = (n) => { const m = document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)'); return m ? m.pop() : ''; };

            const trackingData = {
              'utm_source': getVal('utm_source'),
              'utm_medium': getVal('utm_medium'),
              'utm_campaign': getVal('utm_campaign'),
              'utm_content': getVal('utm_content', 'custom_utm_content'),
              'utm_term': getVal('utm_term', 'custom_utm_term'),
              'gclid': getVal('gclid'),
              'fbc': getCookie('_fbc') || getVal('meta_fbc'),
              'fbp': getCookie('_fbp') || getVal('meta_fbp'),
              'event_id': masterEventId,
              'landing_page': window.location.href,
              'referrer_url': document.referrer
            };

            // --- B. SAVE SESSION (Persist Data) ---
            sessionStorage.setItem('hubspot_tracking_data', JSON.stringify({
              utm_source: trackingData.utm_source,
              utm_medium: trackingData.utm_medium,
              utm_campaign: trackingData.utm_campaign,
              custom_utm_content: trackingData.utm_content,
              custom_utm_term: trackingData.utm_term,
              gclid: trackingData.gclid,
              meta_fbc: trackingData.fbc,
              meta_fbp: trackingData.fbp
            }));

            // --- C. FILL HIDDEN FIELDS ---
            const mapping = {
              'utm_source': trackingData.utm_source,
              'utm_medium': trackingData.utm_medium,
              'utm_campaign': trackingData.utm_campaign,
              'custom_utm_content': trackingData.utm_content,
              'custom_utm_term': trackingData.utm_term,
              'gclid': trackingData.gclid,
              'meta_fbc': trackingData.fbc,
              'meta_fbp': trackingData.fbp,
              'event_id': trackingData.event_id,
              'landing_page': trackingData.landing_page,
              'referrer_url': trackingData.referrer_url
            };

            for (const key in mapping) {
              if (mapping[key]) {
                const input = $form.querySelector('input[name="' + key + '"]');
                if (input) {
                  input.value = mapping[key];
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }
            }
          },

          onFormSubmit: function($form) {
            const emailInput = $form.querySelector('input[name="email"]');
            const emailVal = emailInput ? emailInput.value : '';
            
            // 🔥 Fire GTM Event (One Perfect Lead)
            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'hubspot_form_success',
                'form_name': 'Serra Plaza Landing Page',
                'hs-form-email': emailVal,
                'lead_event_id': masterEventId 
              });
            }
            console.log('✅ Serra Plaza LP - Submitted. Event ID:', masterEventId);
          }
        });
      }
    };
    
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) { document.body.removeChild(script); }
    };
  }, []);

  // Initialize tracking system for GCLID and FBCLID
  useEffect(() => {
    initializeTracking();
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('inquiry-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ctaClassDesktop = showCTA ? "cta-fixed cta-fixed-desktop" : "cta-fixed cta-fixed-desktop cta-hidden";
  const ctaClassMobile = hasScrolled && showCTA && !heroInView ? "cta-fixed cta-fixed-mobile" : "cta-fixed cta-fixed-mobile cta-hidden";

  return (
    <div className="page-wrapper">
      <div className="fixed-logo">
        <GgLogo />
      </div>

      <div className={ctaClassDesktop}>
        <button onClick={scrollToForm} className="cta-button">
          <span className="mono">Inquire</span>
        </button>
      </div>

      <div className={ctaClassMobile}>
        <button onClick={scrollToForm} className="cta-button">
          <span className="mono">Inquire</span>
        </button>
      </div>

      <section className="hero-section" ref={heroRef}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="hero-content"
        >
          <p className="hero-eyebrow">
            <span className="mono">San Juan Capistrano, California</span>
          </p>
          <h1 className="hero-title">
            <span className="hero-title-line">Serra</span>
            <span className="hero-title-line">Plaza</span>
          </h1>
          <p className="hero-subtitle">
            A Spanish Colonial hidden jewel. Adjacent to Los Rios Historic District.<br />
            A neighborhood paused in time.
          </p>
        </motion.div>

        <button 
          onClick={scrollToForm}
          className="scroll-indicator"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} strokeWidth={1} />
        </button>
      </section>

      <section className="stats-bar">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="stats-container"
        >
          <div className="stat-item">
            <p className="stat-main">Up to 350</p>
            <p className="stat-sub">guests across four dreamy spaces</p>
          </div>
          <div className="stat-item">
            <p className="stat-main">Walking Distance</p>
            <p className="stat-sub">to The Mission San Juan Capistrano</p>
          </div>
          <div className="stat-item">
            <p className="stat-main">Created by</p>
            <p className="stat-sub">Jay's Catering</p>
          </div>
        </motion.div>
      </section>

      <section className="editorial-image-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="editorial-image-wrapper"
        >
          <img 
            src={oliveGroveAerial}
            alt="Grand Gimeno olive grove aerial view"
            className="editorial-image"
          />
          <div className="editorial-overlay">
            <button onClick={scrollToForm} className="cta-button cta-overlay">
              <span className="mono">Ready to see it in person?</span>
            </button>
          </div>
        </motion.div>
      </section>

      <section className="architecture-section">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="architecture-header"
          >
            <p className="section-eyebrow">
              <span className="mono">The Architecture</span>
            </p>
            <h2>Old world romance, reimagined</h2>
          </motion.div>

          <div className="architecture-grid">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="architecture-item"
            >
              <h3>The Courtyard</h3>
              <p>The heart. An open-air sanctuary framed by draped archways, towering trees, and a bubbling Spanish fountain at center.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="architecture-item"
            >
              <h3>The Lounge</h3>
              <p>Artisan tiles, arched alcoves, and exposed wooden beams. A space that transitions seamlessly from day to night.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              className="architecture-item"
            >
              <h3>The Hidden Terrace</h3>
              <p>An intimate gathering space. Stone fireplace, market lighting overhead—ideal for cocktails and conversation.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="architecture-item"
            >
              <h3>The Bridal Suite</h3>
              <p>A space for quiet luxury. Custom vanities for styling, refreshments within reach, lounges for a breath before the celebration.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.25 }}
              className="architecture-item"
            >
              <h3>The Setting</h3>
              <p>You can hear the faint sound of trains passing. Swallows fly overhead. Time slows down. This is the oldest neighborhood in California—and it feels like it.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="culinary-section">
        <div className="container-content">
          <div className="culinary-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="culinary-image-wrapper"
            >
              <img 
                src={pizzaOven}
                alt="Wood-fired pizza oven"
                className="culinary-image"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="culinary-text"
            >
              <p className="section-eyebrow">
                <span className="mono">Culinary Distinction</span>
              </p>
              <h2>Where craft meets celebration</h2>
              <div className="culinary-paragraphs">
                <p>Serra Plaza was created by the culinary and event experts of Jay's Catering.</p>
                <p>Every dish is imagined with intention, plated with precision, and served with care. From crafted hors d'oeuvres to unforgettable dinners, the menu is yours to design.</p>
                <p>This isn't banquet food. This is culinary artistry woven into the space itself—where flavor and design live side by side.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="inquiry-form" className="form-section" ref={formRef}>
        <div className="container-text">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="form-content"
          >
            <p className="section-eyebrow">
              <span className="mono">Limited 2026 Availability</span>
            </p>
            <h2>Tell us about your event</h2>
            
            <div id="hubspot-form-container" className="hubspot-form-wrapper"></div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-section-mobile) 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="three-tall-photos-grid"
        >
          <div className="tall-photo-item">
            <img 
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765857628/Serra_Plaza_Selects77_mjjfzm.jpg"
              alt="Grand Gimeno event detail"
              className="tall-photo-img"
            />
          </div>
          <div className="tall-photo-item">
            <img 
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856961/Serra_Plaza_Selects92_dhdntb.jpg"
              alt="Grand Gimeno interior"
              className="tall-photo-img"
            />
          </div>
          <div className="tall-photo-item">
            <img 
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1766169491/JSTN7462_flcocf.jpg"
              alt="Architectural detail"
              className="tall-photo-img"
            />
          </div>
        </motion.div>
      </section>

      <section className="final-image-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <img 
            src={oliveCeremony}
            alt="Olive grove ceremony at Grand Gimeno"
            className="final-image"
          />
        </motion.div>
      </section>
    </div>
  );
}

declare global {
  interface Window {
    hbspt: any;
    gtag: any;
    fbq: any;
    dataLayer: any;
  }
}