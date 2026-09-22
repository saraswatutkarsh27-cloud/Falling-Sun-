import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Terminal, Radio, Sparkles, ArrowDown, ArrowUpRight, Zap } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig';
import { MagneticButton } from '../common/MagneticButton';
import { useRegistrationLock } from '../common/RegistrationLockModal';
import { RulerTicker } from '../common/RulerTicker';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const { open: openRegLock } = useRegistrationLock();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.94]);

  // High performance GPU mouse spring motion values - ZERO React re-renders on mousemove
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseSpringConfig = { damping: 30, stiffness: 180 };
  const smoothMouseX = useSpring(rawMouseX, mouseSpringConfig);
  const smoothMouseY = useSpring(rawMouseY, mouseSpringConfig);

  const logoTranslateX = useTransform(smoothMouseX, [-1, 1], [14, -14]);
  const logoTranslateY = useTransform(smoothMouseY, [-1, 1], [14, -14]);
  const laserTranslateX = useTransform(smoothMouseX, [-1, 1], [-20, 20]);

  // Live system simulation clock
  const [systemTime, setSystemTime] = useState<string>('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(
        now.toTimeString().split(' ')[0] +
          '.' +
          Math.floor(now.getMilliseconds() / 100)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      rawMouseX.set((clientX / innerWidth) * 2 - 1);
      rawMouseY.set((clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  const scrollToExplore = () => {
    const intro = document.getElementById('intro-section');
    if (intro) {
      intro.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden select-none">
      {/* TECHNICAL RULER TICKER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="relative z-10 w-full mb-4"
      >
        <RulerTicker />
      </motion.div>

      {/* TOP DECORATIVE METADATA BAR */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[11px] text-ink-muted border-b border-black/10 pb-4"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sun" />
          </span>
          <span className="text-ink font-bold tracking-widest uppercase">
            {eventConfig.statusText}
          </span>
          <span className="hidden md:inline text-black/20">|</span>
          <span className="hidden md:inline text-ink-faint">
            SYS CLOCK: {systemTime}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span className="text-ink-soft">{eventConfig.coordinates}</span>
          <span className="text-black/20">|</span>
          <span className="text-sun-dark font-semibold tracking-wider">
            {eventConfig.format}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-ink-soft">
          <Terminal className="w-3.5 h-3.5 text-sun" />
          <span className="font-semibold">V2.6 // UNDER-18</span>
        </div>
      </motion.div>

      {/* CENTER HERO TYPOGRAPHY & LOGO */}
      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col items-center text-center py-6"
      >
        {/* Floating Logo with buttery GPU spring parallax */}
        <motion.div
          style={{ x: logoTranslateX, y: logoTranslateY }}
          className="relative mb-4"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative"
          >
            <img
              src="/logo_transparent.png"
              alt="Falling Sun Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(245,158,11,0.25)]"
            />
          </motion.div>
        </motion.div>

        {/* Sub-badge: UNDER 18 HACKATHON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-sun-dark uppercase mb-3 font-bold"
        >
          <span>UNDER 18 HACKATHON</span>
          <span className="text-black/25">•</span>
          <span className="text-ink">GAME • WEB • ROBOTICS</span>
        </motion.div>

        {/* Editorial Typography: FALLING */}
        <div className="overflow-hidden py-1 w-full max-w-full flex items-center justify-center">
          <div className="font-display font-black text-[15vw] sm:text-[14vw] md:text-[13vw] leading-[0.85] tracking-tighter text-ink flex items-center justify-center">
            {Array.from('FALLING').map((char, i) => (
              <span key={`falling-${i}`} className="inline-block overflow-hidden align-top">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.35 + i * 0.025,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </div>
        </div>

        {/* Editorial Typography: SUN (Vibrant Solar Gold with 4K Glow) */}
        <div className="overflow-hidden py-1 w-full flex items-center justify-center">
          <div className="font-display font-black text-[15vw] sm:text-[14vw] md:text-[13vw] leading-[0.85] tracking-tighter text-sun flex items-center justify-center drop-shadow-[0_6px_35px_rgba(245,158,11,0.3)]">
            {Array.from('SUN').map((char, i) => (
              <span key={`sun-${i}`} className="inline-block overflow-hidden align-top">
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: 0.55 + i * 0.035,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </div>
        </div>

        {/* Laser Hairline Line responding smoothly to mouse */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: laserTranslateX }}
          className="w-full max-w-4xl h-[1.5px] bg-gradient-to-r from-transparent via-sun to-transparent my-6"
        />

        {/* Supporting Format Statement & Interactive Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs sm:text-sm text-ink-muted uppercase tracking-widest font-medium"
        >
          <span className="text-ink font-bold">12H + 12H</span>
          <span className="text-black/20">/</span>
          <span>2 DAYS</span>
          <span className="text-black/20">/</span>
          <span className="text-sun-dark font-bold">BUILD • BREAK • CREATE</span>
        </motion.div>

        {/* Interactive Studio Telemetry Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-6 inline-flex flex-wrap items-center gap-3 p-1.5 px-4 rounded-full bg-white/80 border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] font-mono text-[11px]"
        >
          <span className="flex items-center gap-1.5 text-sun-dark font-bold">
            <Zap className="w-3.5 h-3.5 fill-sun text-sun" />
            <span>COHORT CAPACITY</span>
          </span>
          <span className="text-black/20">|</span>
          <div className="w-20 h-2 rounded-full bg-black/10 overflow-hidden">
            <div className="h-full w-[78%] bg-gradient-to-r from-sun to-flame rounded-full" />
          </div>
          <span className="text-ink font-bold">78% FILLED</span>
          <span className="hidden sm:inline text-ink-faint">(44 SLOTS REMAINING)</span>
        </motion.div>
      </motion.div>

      {/* BOTTOM ACTION & SCROLL INDICATOR */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-xs text-ink-muted pt-4 border-t border-black/10"
      >
        <div className="hidden sm:flex items-center gap-2 text-ink-soft">
          <Radio className="w-3.5 h-3.5 text-sun animate-pulse" />
          <span>EDITION // 2026</span>
        </div>

        {/* Interactive CTAs */}
        <div className="flex items-center gap-3 mx-auto sm:mx-0">
          <MagneticButton
            onClick={scrollToExplore}
            dataCursor="link"
            text="SCROLL TO EXPLORE"
            icon={<ArrowDown className="w-3.5 h-3.5" />}
            className="px-5 py-2.5 rounded-full font-mono text-[11px] font-bold"
            variant="outline"
          />

          <MagneticButton
            onClick={openRegLock}
            dataCursor="cta"
            dataCursorLabel="JOIN"
            text="APPLY NOW"
            icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            className="px-5 py-2.5 rounded-full font-mono text-[11px] font-bold"
            variant="primary"
          />
        </div>

        <div className="hidden sm:flex items-center gap-2 text-ink-soft">
          <Sparkles className="w-3 h-3 text-sun" />
          <span className="font-semibold">ZERO ENTRY FEE</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
