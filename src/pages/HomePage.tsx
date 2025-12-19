import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import GgLogo from '../components/GgLogo';
import { initializeTracking } from '../utils/tracking';

const oliveGroveAerial = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765859034/Serra_Plaza_Selects82_ebhc0o.jpg";
const pizzaOven = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856956/Serra_Plaza_Selects30_ix3n6x.jpg";
const oliveCeremony = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856959/Serra_Plaza_Selects86_g5wa6t.jpg";

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
            console.log('✅ Serra Plaza Landing Page - Form loaded');
          },
          onFormSubmit: function($form) {
            // Fire Meta Pixel
            if (window.fbq) {
              window.fbq('trackCustom', 'FormSubmit_SerraPlaza_LP', {
                content_name: 'Serra Plaza Landing Page Form',
                content_category: 'Venue Inquiry',
                venue: 'Serra Plaza',
                source: 'Landing Page'
              });
            }
            
            // Fire GTM dataLayer
            if (window.dataLayer) {
              window.dataLayer.push({
                'event': 'form_submission',
                'form_name': 'Serra Plaza Landing Page',
                'form_id': '52e1922c-438e-446b-9845-75bf623b620e',
                'venue': 'Serra Plaza',
                'form_location': 'Landing Page'
              });
            }
            
            console.log('✅ Serra Plaza Landing Page - Form submitted, redirecting to thank you page...');
          }
        });
      }
    };
    
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
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
            Within walking distance of The Mission.
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
            <p className="stat-sub">guests across four intimate spaces</p>
          </div>
          <div className="stat-item">
            <p className="stat-main">One Bridal Suite</p>
            <p className="stat-sub">French-inspired with vintage details</p>
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
              <h3>The Grand Plaza Courtyard</h3>
              <p>The heart. An open-air sanctuary framed by elegant archways, towering trees, and a bubbling Spanish fountain at center.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="architecture-item"
            >
              <h3>The Salon Patio</h3>
              <p>An intimate gathering space. Stone fireplace, covered loggias, draped archways—ideal for cocktails or ceremony.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              className="architecture-item"
            >
              <h3>The Bridal Suite</h3>
              <p>French luxury meets Spanish charm. Antique armoire, floor-length mirrors, natural light flooding through expansive windows. Built for getting ready in style.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="architecture-item"
            >
              <h3>The Lounge</h3>
              <p>Indoor and outdoor fireplace. Market lighting overhead. A space that transitions seamlessly from day to night.</p>
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
                <p>Serra Plaza was designed to be catered by Jay's Catering—the award-winning team behind this venue and five others across Southern California.</p>
                <p>Every dish is built from scratch, plated with precision, and served with intention. From passed hors d'oeuvres to family-style dinners, the menu is yours to design.</p>
                <p>This isn't outsourced catering. This is culinary craft that lives in the architecture of the space itself.</p>
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
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856957/Serra_Plaza_Selects33_oa76ct.jpg"
              alt="Grand Gimeno interior"
              className="tall-photo-img"
            />
          </div>
          <div className="tall-photo-item">
            <img 
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856964/Serra_Plaza_Selects84_z7xvdu.jpg"
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