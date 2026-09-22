import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Moon, Sun, ArrowRight } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';
import { TiltCard } from '../common/TiltCard';

export const Format1212: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const numScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.06, 0.95]);
  const numShiftLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const numShiftRight = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const numRotateLeft = useTransform(scrollYProgress, [0, 0.5, 1], [-8, 0, 8]);
  const numRotateRight = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const plusRotate = useTransform(scrollYProgress, [0, 1], [-35, 35]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.75, 1.2, 0.85]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-[#EAE9EF] border-t border-black/10 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Background Animated Orbital Rings on Scroll */}
      <motion.div
        style={{ scale: ringScale, rotate: ringRotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-sun/20 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sun shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-flame shadow-[0_0_8px_rgba(234,88,12,0.8)]" />
      </motion.div>

      {/* Floating Parallax Background Text */}
      <motion.div
        style={{ x: watermarkX }}
        className="absolute top-1/4 left-0 whitespace-nowrap font-display font-black text-[22vw] text-black/[0.03] select-none pointer-events-none"
      >
        24 HOURS • 2 DAYS
      </motion.div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sun/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex items-center justify-between font-mono text-xs text-ink-muted border-b border-black/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-sun font-black text-base">02</span>
            <span className="text-black/20">//</span>
            <span className="tracking-widest uppercase font-semibold text-ink-soft">COMPETITION ARCHITECTURE</span>
          </div>
          <div className="flex items-center gap-2 text-ink-muted">
            <Clock className="w-3.5 h-3.5 text-sun" />
            <span className="font-semibold text-ink">24 HOURS ACTIVE SPRINT</span>
          </div>
        </div>

        {/* GIANT 12 + 12 NUMERICAL PRESENTATION (Light Theme + 3D Perspective Tilt) */}
        <motion.div
          style={{ scale: numScale }}
          className="flex flex-col items-center justify-center text-center select-none py-6"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-6 md:gap-10 font-display font-black leading-none tracking-tighter" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div
              style={{ x: numShiftLeft, rotateY: numRotateLeft }}
              className="text-[20vw] sm:text-[18vw] md:text-[16vw] text-ink drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform"
            >
              12
            </motion.div>
            <motion.div
              style={{ rotate: plusRotate }}
              className="text-[12vw] sm:text-[10vw] text-sun font-normal select-none"
            >
              +
            </motion.div>
            <motion.div
              style={{ x: numShiftRight, rotateY: numRotateRight }}
              className="text-[20vw] sm:text-[18vw] md:text-[16vw] text-ink drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform"
            >
              12
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-base sm:text-2xl font-black tracking-[0.2em] text-sun-dark uppercase -mt-2 md:-mt-6"
          >
            HOURS SPRINT
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-ink-soft mt-4"
          >
            2 DAYS. <span className="text-ink">ONE BUILD.</span>
          </motion.div>
        </motion.div>

        {/* 2-DAY BREAKDOWN COMPARISON CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* DAY 01 */}
          <TiltCard maxTilt={6} delay={0.1}>
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-sun transition-all space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span className="text-sun-dark font-black text-sm">DAY 01</span>
                  <span className="flex items-center gap-1.5 text-ink-soft font-semibold">
                    <Sun className="w-3.5 h-3.5 text-sun" />
                    <span>FIRST 12 HOURS</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-2xl md:text-3xl font-black text-ink break-word">
                    THE BUILD WINDOW
                  </h4>
                  <p className="text-ink-muted text-sm leading-relaxed font-sans">
                    Teams receive the problem statement prompts, calibrate their workstations, and commit the initial codebase. Mentors circulate to validate system design and hardware pinouts before you lock in architecture.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-black/5 font-mono text-xs text-ink-soft">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">FOCUS:</span>
                  <span className="font-bold text-ink">Architecture & Core Mechanics</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">CHECKPOINT:</span>
                  <span className="text-sun-dark font-bold">Midpoint Repository Snapshot</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">REST WINDOW:</span>
                  <span>Overnight Sleep & Re-energize</span>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* DAY 02 */}
          <TiltCard maxTilt={6} delay={0.2}>
            <div className="p-8 md:p-10 rounded-3xl bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-flame transition-all space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span className="text-flame font-black text-sm">DAY 02</span>
                  <span className="flex items-center gap-1.5 text-ink-soft font-semibold">
                    <Moon className="w-3.5 h-3.5 text-flame" />
                    <span>FINAL 12 HOURS</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display text-2xl md:text-3xl font-black text-ink break-word">
                    THE POLISH & SHOWCASE
                  </h4>
                  <p className="text-ink-muted text-sm leading-relaxed font-sans">
                    The final sprint pushes features to production, squashes critical bugs, and rehearses live demos. Submissions freeze, followed immediately by stage pitches in front of our technical judging panel.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-black/5 font-mono text-xs text-ink-soft">
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">FOCUS:</span>
                  <span className="font-bold text-ink">UX Polish & Live Presentations</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">SUBMISSION:</span>
                  <span className="text-flame font-bold">Hard Code Freeze</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-muted">FINALE:</span>
                  <span className="text-sun font-bold">Judging, Demos & Awards Ceremony</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Schedule deep link with MagneticButton */}
        <div className="text-center pt-4">
          <MagneticButton
            to="/schedule"
            text="VIEW COMPLETE TIMELINE SKELETON"
            icon={<ArrowRight className="w-4 h-4" />}
            className="px-7 py-3.5 rounded-full font-mono text-xs font-bold tracking-wider"
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
};
