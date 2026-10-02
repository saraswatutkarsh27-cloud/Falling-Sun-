import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MagneticButtonProps {
  children?: React.ReactNode;
  text?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  strength?: number;
  dataCursor?: 'link' | 'cta' | 'drag';
  dataCursorLabel?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  text,
  icon,
  className = '',
  onClick,
  href,
  to,
  target,
  rel,
  strength = 0.28,
  variant = 'primary',
  dataCursor,
  dataCursorLabel,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // High performance GPU spring motion values - ZERO React re-renders on mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 220, mass: 0.1 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rawX.set((e.clientX - centerX) * strength);
    rawY.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: Date.now() };
      setRipples((prev) => [...prev.slice(-2), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 550);
    }
    if (onClick) onClick(e);
  };

  let variantStyles = '';
  let rollAccentColor = 'text-brown';

  if (variant === 'primary') {
    variantStyles =
      'bg-yellow text-ink border-2 border-ink shadow-btn hover:shadow-[7px_7px_0_#1d1210] transition-shadow';
    rollAccentColor = 'text-brown';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-cream text-ink border-2 border-ink shadow-btn hover:shadow-[7px_7px_0_#1d1210] transition-shadow';
    rollAccentColor = 'text-brown';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-transparent text-cream border-2 border-cream hover:bg-cream hover:text-ink shadow-btn hover:shadow-[7px_7px_0_#1d1210] transition-colors';
    rollAccentColor = 'text-ink';
  } else if (variant === 'dark') {
    variantStyles =
      'bg-ink text-cream border-2 border-ink shadow-btn hover:shadow-[7px_7px_0_#1d1210] transition-shadow';
    rollAccentColor = 'text-yellow';
  }

  // Square off any rounded utility passed in — reference buttons are hard-edged
  const cleanedClassName = className.replace(
    /\brounded-(full|xl|2xl|3xl|lg|md|sm)\b/g,
    'rounded-none'
  );

  const displayText = text || (typeof children === 'string' ? children : '');
  const chars = displayText ? Array.from(displayText) : [];

  const buttonInner = (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.94 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden select-none cursor-pointer will-change-transform transform-gpu ${variantStyles} ${cleanedClassName}`}
      data-cursor={dataCursor}
      data-cursor-label={dataCursorLabel}
    >
      {/* Click Ripple Waves */}
      <AnimatePresence>
        {ripples.map((rip) => (
          <motion.span
            key={rip.id}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ left: rip.x, top: rip.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-yellow/50 pointer-events-none"
          />
        ))}
      </AnimatePresence>

      {/* Beacon Dot indicator */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className={`absolute inline-flex h-full w-full transition-opacity duration-200 bg-current ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>

      {/* Dynamic Text Roll or Custom Children */}
      {chars.length > 0 ? (
        <span className="relative inline-flex items-center overflow-hidden font-display text-sm uppercase leading-none py-0.5 tracking-wide">
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
                {/* Primary Char */}
                <motion.span
                  animate={{
                    y: isHovered ? '-100%' : '0%',
                    opacity: isHovered ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.014,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block will-change-transform leading-none"
                >
                  {char}
                </motion.span>

                {/* Duplicate Accent Char */}
                <motion.span
                  animate={{
                    y: isHovered ? '0%' : '100%',
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.014,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute top-0 left-0 inline-block font-black ${rollAccentColor} will-change-transform leading-none`}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ) : (
        <span className="relative z-10">{children}</span>
      )}

      {/* Interactive Icon */}
      {icon && (
        <motion.span
          animate={{
            x: isHovered ? 2.5 : 0,
            y: isHovered ? -2.5 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="relative z-10 shrink-0"
        >
          {icon}
        </motion.span>
      )}
    </motion.div>
  );

  // If internal router link ('to' prop)
  if (to) {
    return (
      <Link to={to} className="inline-block align-middle no-underline">
        {buttonInner}
      </Link>
    );
  }

  // If external link ('href' prop)
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className="inline-block align-middle no-underline"
      >
        {buttonInner}
      </a>
    );
  }

  // Default button
  return buttonInner;
};

export default MagneticButton;
