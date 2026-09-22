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
  let rollAccentColor = 'text-sun';

  if (variant === 'primary') {
    variantStyles =
      'bg-ink text-white hover:bg-sun hover:text-black border border-ink shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_28px_rgba(245,158,11,0.35)]';
    rollAccentColor = 'text-black group-hover:text-black';
  } else if (variant === 'secondary') {
    variantStyles =
      'bg-sun text-black hover:bg-ink hover:text-white border border-sun shadow-[0_4px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)]';
    rollAccentColor = 'text-white';
  } else if (variant === 'outline') {
    variantStyles =
      'bg-white text-ink border border-black/15 hover:border-sun hover:bg-sun/10 shadow-sm';
    rollAccentColor = 'text-sun-dark';
  } else if (variant === 'dark') {
    variantStyles =
      'bg-black text-white hover:bg-sun hover:text-black border border-black shadow-sm';
    rollAccentColor = 'text-black';
  }

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
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden select-none cursor-pointer transition-colors duration-200 will-change-transform transform-gpu ${variantStyles} ${className}`}
      data-cursor={dataCursor}
      data-cursor-label={dataCursorLabel}
    >
      {/* Animated Glowing Solar Border Sweep */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 pointer-events-none bg-gradient-to-r from-sun via-amber-400 to-flame blur-[6px]"
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer Light Streak on Hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none -skew-x-12"
        initial={{ x: '-160%' }}
        animate={{ x: isHovered ? '160%' : '-160%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

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
            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-sun/40 rounded-full pointer-events-none"
          />
        ))}
      </AnimatePresence>

      {/* Beacon Dot indicator */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full transition-opacity duration-200 ${
            isHovered ? 'bg-sun opacity-100' : 'opacity-0'
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 transition-colors duration-200 ${
            isHovered ? 'bg-sun' : 'bg-current opacity-40'
          }`}
        />
      </span>

      {/* Dynamic Text Roll or Custom Children */}
      {chars.length > 0 ? (
        <span className="relative inline-flex items-center overflow-hidden font-mono text-xs font-black uppercase leading-none py-0.5 tracking-wider">
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
