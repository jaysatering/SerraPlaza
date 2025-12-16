import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import GgLogo from '../components/GgLogo';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { AccordionSingle } from '../components/Accordion';

export default function PrivatePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  const heroImageUrl = "https://images.unsplash.com/photo-1738800076744-c37b80b37d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwbWluaW1hbHxlbnwxfHx8fDE3NjU3ODMyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const courtyardImageUrl = "https://images.unsplash.com/photo-1721860982031-e1a031beb5f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwY291cnR5YXJkJTIwZm91bnRhaW58ZW58MXx8fHwxNzY1NzU3NzUzfDA&ixlib=rb-4.1.0&q=80&w=1080";
  const archImageUrl = "https://images.unsplash.com/photo-1762375164298-2f8f14bd8d36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwZGV0YWlsJTIwYXJjaHxlbnwxfHx8fDE3NjU3ODMyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const culinaryImageUrl = "https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765856956/Serra_Plaza_Selects16_ix49dm.jpg";

  const faqItems = [
    {
      question: "Can we bring our own caterer?",
      answer: "Serra Plaza was built in partnership with Jay's Catering Collection. All culinary services are provided exclusively by our in-house team to maintain the highest standards of quality, execution, and venue knowledge."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We require a non-refundable deposit to secure your date. Our full cancellation policy will be provided during your consultation and outlined in your contract."
    },
    {
      question: "Do you allow outside vendors?",
      answer: "Yes. You are welcome to work with your preferred florist, photographer, DJ, planner, and other vendors. We'll provide a list of preferred partners who are intimately familiar with the venue."
    },
    {
      question: "Is there parking available?",
      answer: "Yes. Serra Plaza offers ample on-site parking for guests. Additional overflow parking and valet coordination can be arranged if needed."
    },
    {
      question: "Can we see the venue before booking?",
      answer: "Absolutely. We offer private tours by appointment only. Please submit an inquiry and our venue coordinator will schedule a personalized walkthrough."
    },
    {
      question: "What time can we access the venue?",
      answer: "Your rental includes flexible timing with setup beginning three hours before your event start time. Events conclude by midnight. Extended hours can be arranged for an additional fee."
    },
    {
      question: "Can we have amplified music or a live band?",
      answer: "Yes. We welcome live music and DJs. Courtyard events conclude by 10pm due to noise ordinances. Indoor Grand Salon events can continue until midnight."
    },
    {
      question: "What's included in the venue rental?",
      answer: "Tables and chairs for 200 guests, vintage furniture collection, market lighting, coordinators, security, and complete privacy with one event at a time."
    }
  ];

  const vendorCollective = [
    {
      name: "Adore You Events",
      description: "Full-service planning"
    },
    {
      name: "Blush Botanicals",
      description: "Seasonal florals"
    },
    {
      name: "The Simplifiers",
      description: "Day-of coordination"
    },
    {
      name: "Honey & Lace Co.",
      description: "Romantic design"
    },
    {
      name: "Maven Made",
      description: "Strategic planning"
    },
    {
      name: "Luna & Wilde",
      description: "Floral installations"
    },
    {
      name: "Alexandra Rose Events",
      description: "Detail-obsessed planning"
    },
    {
      name: "Studio Bloom OC",
      description: "Organic florals"
    },
    {
      name: "Vow'd Weddings",
      description: "Creative direction"
    },
    {
      name: "Salt & Cedar Collective",
      description: "Minimalist design"
    },
    {
      name: "The Wildflowers",
      description: "Garden-inspired florals"
    },
    {
      name: "Gather & Gold",
      description: "Experiential design"
    },
    {
      name: "Whispered Whimsy",
      description: "Romantic planning"
    },
    {
      name: "Branch & Cole",
      description: "Sculptural florals"
    },
    {
      name: "Noir Events",
      description: "Editorial planning"
    },
    {
      name: "Wild Heart Events",
      description: "Bohemian luxury"
    },
    {
      name: "Kaleidoscope Weddings",
      description: "Colorful design"
    },
    {
      name: "Poppy & Vine Co.",
      description: "Seasonal florals"
    },
    {
      name: "Sterling Social",
      description: "Modern planning"
    },
    {
      name: "Celadon & Celery",
      description: "Botanical design"
    }
  ];

  const pricingRowStyle = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--color-border)'
  };

  return (
    <div className="page-wrapper">
      <div className="fixed-logo">
        <GgLogo />
      </div>

      <section className="hero-section">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="hero-content"
        >
          <p className="hero-eyebrow">
            <span className="mono">Private Venue Profile</span>
          </p>
          <h1 className="hero-title">
            <span className="hero-title-line">The Plaza</span>
            <span className="hero-title-line">Is Yours.</span>
          </h1>
        </motion.div>

        <button 
          onClick={scrollToNextSection}
          className="scroll-indicator"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={32} strokeWidth={1} />
        </button>
      </section>

      <section style={{ padding: 'var(--space-section-mobile) 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{ 
            maxWidth: '1000px', 
            margin: '0 auto',
            padding: '0 24px'
          }}
        >
          <div className="pricing-row-container">
            <div className="pricing-row-item">
              <span className="mono" style={{ color: 'var(--color-primary)', marginBottom: '8px', display: 'block' }}>FRIDAY</span>
              <span className="pricing-value">$8,000</span>
            </div>

            <div className="pricing-row-item">
              <span className="mono" style={{ color: 'var(--color-primary)', marginBottom: '8px', display: 'block' }}>SATURDAY</span>
              <span className="pricing-value">$11,000</span>
            </div>

            <div className="pricing-row-item">
              <span className="mono" style={{ color: 'var(--color-primary)', marginBottom: '8px', display: 'block' }}>SUNDAY</span>
              <span className="pricing-value">$8,000</span>
            </div>
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
          <ImageWithFallback 
            src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765857890/Serra_Plaza_Selects08_toxflm.jpg"
            alt="Grand Central Hall"
            className="editorial-image-wide"
          />
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
              <span className="mono">INCLUSIONS</span>
            </p>
            <h2>The design spec</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '1100px', margin: '0 auto', padding: '0 48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ opacity: 0.7 }}>Full-day venue access with flexible timing options</p>
                <p style={{ opacity: 0.7 }}>Four distinct spaces: Grand Plaza Courtyard, Salon Patio, Lounge, and Bridal Suite</p>
                <p style={{ opacity: 0.7 }}>Tables and chairs for up to 200 guests (additional seating available)</p>
                <p style={{ opacity: 0.7 }}>Curated collection of vintage furniture and decor pieces</p>
                <p style={{ opacity: 0.7 }}>Market lighting throughout the courtyard with ambient uplighting</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
                <p style={{ opacity: 0.7 }}>Professional venue coordinator and event manager</p>
                <p style={{ opacity: 0.7 }}>Security personnel and setup/breakdown crew</p>
                <p style={{ opacity: 0.7 }}>On-site parking for guests</p>
                <p style={{ opacity: 0.7 }}>Stone fireplace in Salon Patio and Lounge</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
                <p style={{ opacity: 0.7 }}>Complete privacy—one event at a time</p>
                <p style={{ opacity: 0.7 }}>Complimentary tasting for two with Jay's Catering</p>
                <p style={{ opacity: 0.7 }}>Access to our curated vintage furniture collection</p>
                <p style={{ opacity: 0.7 }}>Optional drapery for archways and loggias</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border)', paddingTop: '40px' }}>
                <p style={{ opacity: 0.7 }}>Chandelier and lantern lighting options</p>
              </div>
            </div>
          </motion.div>
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
                src={culinaryImageUrl}
                alt="Grand Gimeno Olive Grove"
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
                <span className="mono">Culinary Experience</span>
              </p>
              <h2>Jay's Catering Collection</h2>
              <div className="culinary-paragraphs">
                <p>
                  Every event at Serra Plaza is exclusively catered by Jay's Catering Collection—the culinary team that transformed this historic property into one of Southern California's most sought-after wedding venues.
                </p>
                <p>
                  The menu is yours to design: passed appetizers, family-style platters, plated dinners, dessert bars, and full-service beverage programs. Each detail is crafted with the same precision that built this place.
                </p>
                <p>
                  Pricing averages $100-$175 per guest depending on menu selection, bar package, and service style. Customized proposals available upon request.
                </p>
              </div>
              <a 
                href="http://www.jayscatering.com/food-and-drink/the-serra-plaza-bespoke-menu"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button" 
                style={{ marginTop: '32px', display: 'inline-block', textDecoration: 'none' }}
              >
                <span className="mono">Bespoke Menu</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="architecture-header center-aligned"
          >
            <p className="section-eyebrow">
              <span className="mono">Trusted professionals who know Serra Plaza.</span>
            </p>
            <h2>The List</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            style={{ padding: '0 48px' }}
          >
            <div className="vendor-collective-grid">
              {vendorCollective.map((vendor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.02 }}
                >
                  <p className="vendor-name">
                    {vendor.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="full-height-image-section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="editorial-full-height"
        >
          <img 
            src="https://res.cloudinary.com/dr9hlxnbp/image/upload/v1765857513/Serra_Plaza_Selects14_cfqgng.jpg"
            alt="Grand Gimeno"
            className="editorial-full-height-img"
          />
        </motion.div>
      </section>

      <section className="architecture-section" style={{ paddingBottom: 'var(--space-section)' }}>
        <div className="container-content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="architecture-header"
          >
            <p className="section-eyebrow">
              <span className="mono">Questions</span>
            </p>
            <h2>Frequently asked</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            style={{ padding: '0 48px', maxWidth: '1100px', margin: '0 auto' }}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <AccordionSingle
                  question={item.question}
                  answer={item.answer}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <footer style={{ 
        padding: '80px 24px 48px', 
        borderTop: '1px solid var(--color-border)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            marginBottom: '64px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
              <div>
                <p className="mono" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>LOCATION</p>
                <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-charcoal)' }}>
                  Serra Plaza<br />
                  31910 Del Obispo Street<br />
                  San Juan Capistrano, California 92675
                </p>
              </div>

              <div>
                <p className="mono" style={{ color: 'var(--color-primary)', marginBottom: '16px' }}>CONTACT</p>
                <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-charcoal)' }}>
                  <a 
                    href="tel:+17146360045"
                    style={{ 
                      color: 'var(--color-charcoal)', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-charcoal)'}
                  >
                    (714) 636-6045
                  </a>
                  <br />
                  <a 
                    href="mailto:info@serraplaza.com"
                    style={{ 
                      color: 'var(--color-charcoal)', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-charcoal)'}
                  >
                    info@serraplaza.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>
            © {new Date().getFullYear()} Serra Plaza. All rights reserved.
          </p>
        </motion.div>

        <style>{`
          @media (min-width: 768px) {
            footer {
              padding: 96px 48px 64px !important;
            }
            footer > div > div {
              margin-bottom: 80px !important;
            }
            footer > div > div > div {
              grid-template-columns: 1fr 1fr !important;
              gap: 96px !important;
            }
          }
        `}</style>
      </footer>
    </div>
  );
}