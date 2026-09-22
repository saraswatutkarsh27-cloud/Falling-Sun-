import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { Plus } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {eventConfig.faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const isHovered = hoveredIndex === index;

        return (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className={`rounded-3xl border transition-all duration-300 overflow-hidden will-change-transform ${
              isOpen
                ? 'bg-white border-sun shadow-[0_8px_30px_rgba(245,158,11,0.08)]'
                : 'bg-white border-black/10 hover:border-black/25 shadow-[0_2px_12px_rgba(0,0,0,0.02)]'
            }`}
          >
            {/* Question Button with Tactile Tap */}
            <motion.button
              type="button"
              onClick={() => toggle(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileTap={{ scale: 0.99 }}
              className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left cursor-pointer"
              aria-expanded={isOpen}
              data-cursor="link"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-xs text-sun font-black text-sm shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={`font-display text-lg sm:text-xl md:text-2xl font-black transition-colors duration-200 break-word ${
                  isOpen || isHovered ? 'text-sun-dark' : 'text-ink'
                }`}>
                  {faq.question}
                </span>
              </div>

              {/* Animated Plus morphing to Close (X) */}
              <motion.div
                animate={{
                  rotate: isOpen ? 45 : 0,
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isOpen
                    ? 'border-sun bg-sun text-black'
                    : 'border-black/15 text-ink-soft bg-black/[0.02] group-hover:border-black'
                }`}
              >
                <Plus className="w-4 h-4" />
              </motion.div>
            </motion.button>

            {/* Answer Content with Height & Opacity Transition */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 pt-2 border-t border-black/5">
                    <p className="text-ink-muted text-sm md:text-base leading-relaxed font-sans font-medium">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
