import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
            className="will-change-transform"
          >
            <details
              open={isOpen}
              className="bg-cream text-ink border-[3px] border-ink border-l-[10px] border-l-green shadow-btn transition-shadow hover:shadow-[7px_7px_0_#1d1210]"
            >
              <summary
                onClick={(e) => {
                  // Fully controlled: prevent the native toggle and drive it from state
                  e.preventDefault();
                  toggle(index);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="p-4 md:p-5 flex items-center justify-between gap-4 md:gap-6 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden"
                aria-expanded={isOpen}
                data-cursor="link"
              >
                <span className="flex items-center gap-3 md:gap-4 min-w-0">
                  <span className="shrink-0 bg-yellow border-2 border-ink px-1.5 py-0.5 text-xs font-black">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-lg sm:text-xl md:text-2xl font-black uppercase leading-tight break-word transition-colors duration-200 ${
                      isOpen || isHovered ? 'text-reddark' : 'text-ink'
                    }`}
                  >
                    {faq.question}
                  </span>
                </span>

                <span
                  className={`w-9 h-9 border-2 border-ink flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-yellow rotate-45' : 'bg-cream'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </span>
              </summary>

              <div className="px-4 md:px-5 pb-5 pt-3 border-t border-ink/20">
                <p className="text-ink-muted text-sm md:text-base leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            </details>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
