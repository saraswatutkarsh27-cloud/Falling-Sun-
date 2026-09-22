import React from 'react';
import { motion } from 'framer-motion';
import { MaskedReveal } from './AnimatedText';

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
    <div className={`space-y-4 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {/* Category & Section Number with CyferNode tick mark */}
      <div className={`flex items-center gap-3 font-mono text-xs text-ink-muted ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="text-sun font-black text-sm">{number}</span>
        <span className="text-black/20">//</span>
        <span className="tracking-widest uppercase font-semibold text-ink-soft">{category}</span>
      </div>

      {/* Main Title with Masked Reveal Animation */}
      <div className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink break-word">
        <MaskedReveal text={title} />
      </div>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-ink-muted text-base md:text-lg max-w-2xl font-sans leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Animated Hairline Rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`h-[1px] bg-black/10 origin-left mt-6 ${align === 'center' ? 'origin-center' : ''}`}
      />
    </div>
  );
};
