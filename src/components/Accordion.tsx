import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '32px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '32px',
          textAlign: 'left'
        }}
      >
        <h3 style={{ margin: '0', fontSize: '1.125rem', fontWeight: '500' }}>{question}</h3>
        <span 
          className="mono" 
          style={{ 
            fontSize: '20px', 
            color: 'var(--color-primary)',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
        >
          +
        </span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '40px' }}>
              <p style={{ color: 'var(--color-muted)', lineHeight: '1.7', fontSize: '1rem' }}>
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: Array<{ question: string; answer: string }>;
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

// Single accordion item export for individual use
interface SingleAccordionProps {
  question: string;
  answer: string;
}

export function AccordionSingle({ question, answer }: SingleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem
      question={question}
      answer={answer}
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    />
  );
}