import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import GgLogo from '../components/GgLogo';
import { initializeTracking } from '../utils/tracking';

const oliveGroveAerial = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765780333/3J4A8985_qzhoes.jpg";
const pizzaOven = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765780827/_AJB3193_turfsf.jpg";
const oliveCeremony = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765780355/3J4A0229_cpnpow.jpg";

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
          formId: "83c1be77-a158-4a0a-9938-e04f79ced417",
          target: '#hubspot-form-container',
          onFormSubmitted: () => {
            window.location.href = '/thank-you';
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
            <span className="mono">Old Towne Orange, California</span>
          </p>
          <h1 className="hero-title">
            <span className="hero-title-line">Grand</span>
            <span className="hero-title-line">Gimeno</span>
          </h1>
          <p className="hero-subtitle">
            A 30,000-square-foot Spanish Colonial sanctuary.<br />
            Built 1928. Architect Harold Gimeno.
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
            <p className="stat-main">Up to 300</p>
            <p className="stat-sub">guests across six spaces</p>
          </div>
          <div className="stat-item">
            <p className="stat-main">Two VIP Suites</p>
            <p className="stat-sub">optional 8am access</p>
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
            <h2>A journey through 30,000 square feet</h2>
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
              <p>The arrival point. A lush, open-air space with a large Spanish fountain and arched breezeways.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="architecture-item"
            >
              <h3>The Foyer</h3>
              <p>An intimate space with wrought-iron chandeliers and two fireplaces leading to the heart of the building.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
              className="architecture-item"
            >
              <h3>Grand Central</h3>
              <p>The primary indoor reception space. Soaring 30-foot ceilings, exposed timber trusses, and massive windows. Rustic industrial luxury—no crystal chandeliers here.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="architecture-item"
            >
              <h3>The Olive Grove</h3>
              <p>The crown jewel. A large outdoor sanctuary filled with 100-year-old olive trees, market lights, and decomposed granite floors—designed for al fresco dining.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.25 }}
              className="architecture-item"
            >
              <h3>The Suites</h3>
              <p>Two high-end VIP suites—The Parlor and The Speakeasy—to prepare in style.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
              className="architecture-item"
            >
              <h3>The Sanctuary</h3>
              <p>Enclosed by high walls and greenery, Grand Gimeno creates a silent, private world inside the bustling city of Orange.</p>
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
              <h2>Where architecture meets fire</h2>
              <div className="culinary-paragraphs">
                <p>Grand Gimeno wasn't designed around food—it was designed from food. Created by Jay's Catering, this is a culinary vision made architecture.</p>
                <p>The permanent outdoor kitchen features an Argentine Asado Grill and a Wood-Fired Pizza Oven, cooking live in front of your guests.</p>
                <p>Every event becomes a performance of fire, flavor, and craft—orchestrated by the team that built this place.</p>
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
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765846540/8W6A9496_vndbyv.jpg"
              alt="Grand Gimeno event detail"
              className="tall-photo-img"
            />
          </div>
          <div className="tall-photo-item">
            <img 
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765846212/Jennifer_Michael_Wedding_Day_1011_smkp1z.jpg"
              alt="Grand Gimeno interior"
              className="tall-photo-img"
            />
          </div>
          <div className="tall-photo-item">
            <img 
              src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765846541/Gimeno_Selects_35_emhokx.jpg"
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
  }
}