import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import GgLogo from '../components/GgLogo';

export default function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAccessPrivate = () => {
    navigate('/private');
  };

  return (
    <div className="page-wrapper">
      <div className="fixed-logo">
        <GgLogo />
      </div>
      
      <main className="thank-you-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="thank-you-content"
        >
          <h1>Thank you</h1>
          
          <p className="thank-you-subtitle">
            We'll be in touch shortly.
          </p>

          <p className="thank-you-subtitle" style={{ marginTop: '32px' }}>
            In the meantime, view our pricing guide.
          </p>
          
          <button 
            onClick={handleAccessPrivate}
            className="cta-button"
            style={{ marginTop: '48px', marginBottom: '48px' }}
          >
            <span className="mono">View Private Profile</span>
          </button>

          <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '1rem', color: 'var(--color-charcoal)' }}>
              The Grand Gimeno Team
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}