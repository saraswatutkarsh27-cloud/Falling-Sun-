import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* -------------------------------------------------------------
 * MASKED WORD-BY-WORD TEXT REVEAL
 * Clean word-level entrance animation with natural text wrap
 * ------------------------------------------------------------- */
interface MaskedRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  highlightWords?: string[];
  highlightClass?: string;
}

export const MaskedReveal: React.FC<MaskedRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  highlightWords = [],
  highlightClass = 'text-sun',
}) => {
  const words = text.split(' ');

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top mr-[0.28em] py-[1px]">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.65,
                delay: delay + i * stagger,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block will-change-transform ${isHighlight ? highlightClass : ''}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

/* -------------------------------------------------------------
 * CHARACTER-BY-CHARACTER STAGGER REVEAL
 * Typographic entrance where individual letters reveal with crisp motion
 * ------------------------------------------------------------- */
interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const CharReveal: React.FC<CharRevealProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.02,
}) => {
  const chars = Array.from(text);

  return (
    <span className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <span key={`${char}-${i}`} className="inline-block overflow-hidden align-top">
          <motion.span
            initial={{ opacity: 0, y: '100%' }}
            whileInView={{ opacity: 1, y: '0%' }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block will-change-transform"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/* -------------------------------------------------------------
 * INTERACTIVE ROLL TEXT (HOVER & CLICK ANIMATED)
 * Glitch-free, GPU-composited vertical character roll.
 * Works both controlled (via isHovered prop) and self-hovering.
 * ------------------------------------------------------------- */
interface InteractiveRollTextProps {
  text: string;
  isHovered?: boolean;
  activeColor?: string;
  className?: string;
}

export const InteractiveRollText: React.FC<InteractiveRollTextProps> = ({
  text,
  isHovered,
  activeColor = 'text-sun',
  className = '',
}) => {
  const [selfHover, setSelfHover] = useState(false);
  const hovered = isHovered !== undefined ? isHovered : selfHover;
  const chars = Array.from(text);

  return (
    <span
      onMouseEnter={() => setSelfHover(true)}
      onMouseLeave={() => setSelfHover(false)}
      className={`relative inline-flex items-center overflow-hidden font-mono uppercase leading-none py-0.5 tracking-wider select-none align-middle ${className}`}
    >
      {chars.map((char, index) => {
        if (char === ' ') {
          return (
            <span key={`space-${index}`} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={`${char}-${index}`}
            className="relative inline-flex items-center overflow-hidden h-[1.25em]"
          >
            {/* Primary Char (Slides up smoothly) */}
            <motion.span
              animate={{
                y: hovered ? '-100%' : '0%',
                opacity: hovered ? 0 : 1,
              }}
              transition={{
                duration: 0.26,
                delay: index * 0.014,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block will-change-transform leading-none"
            >
              {char}
            </motion.span>

            {/* Duplicate Char (Slides in from below in active accent color) */}
            <motion.span
              animate={{
                y: hovered ? '0%' : '100%',
                opacity: hovered ? 1 : 0,
              }}
              transition={{
                duration: 0.26,
                delay: index * 0.014,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`absolute top-0 left-0 inline-block font-black ${activeColor} will-change-transform leading-none`}
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};

/* -------------------------------------------------------------
 * ODOMETER NUMBER COUNTER
 * Numbers count up dynamically as they scroll into view
 * ------------------------------------------------------------- */
interface NumberCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}

export const NumberCounter: React.FC<NumberCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [current, setCurrent] = useState(0);
  const [inView, setInView] = useState(false);

  React.useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * end);
      setCurrent(start);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [inView, value]);

  return (
    <motion.span
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
      className={`font-mono inline-block will-change-transform ${className}`}
    >
      {prefix}
      {current}
      {suffix}
    </motion.span>
  );
};
