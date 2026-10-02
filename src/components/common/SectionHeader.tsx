import React from 'react';
import { motion } from 'framer-motion';
import { MaskedReveal } from './AnimatedText';
import { SectionTitle } from '../SectionTitle';

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {/* Category & Section Number sticker row */}
      <div
        className={`flex items-center gap-3 text-xs ${
          align === 'center' ? 'justify-center' : 'justify-start'
        }`}
      >
        <span className="bg-cream text-bg border-2 border-ink px-2 py-0.5 font-black text-sm">
          {number}
        </span>
        <span className="text-ink font-bold">//</span>
        <span className="tracking-widest uppercase font-bold text-ink">{category}</span>
      </div>

      {/* Main Title as a tilted cream label with rough edges */}
      <div className="mt-4">
        <SectionTitle>
          <MaskedReveal text={title} />
        </SectionTitle>
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-cream text-lg md:text-xl font-bold leading-snug max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated Rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`h-[3px] bg-cream origin-left mt-6 ${align === 'center' ? 'origin-center' : ''}`}
      />
    </div>
  );
};

export default SectionHeader;
