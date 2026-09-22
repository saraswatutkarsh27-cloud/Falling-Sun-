import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';
import { Zap, Compass, Heart, ArrowUpRight } from 'lucide-react';
import { eventConfig } from '../config/eventConfig';
import { MagneticButton } from '../components/common/MagneticButton';
import { MaskedReveal } from '../components/common/AnimatedText';
import { useRegistrationLock } from '../components/common/RegistrationLockModal';

export const AboutPage: React.FC = () => {
  const { open: openRegLock } = useRegistrationLock();
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#F0EFF4] min-h-screen space-y-24 text-ink">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <SectionHeader
          number="01"
          category="ABOUT THE HACKATHON"
          title="ENGINEERED FOR THE RELENTLESS."
          subtitle="Falling Sun was created to destroy the myth that under-18 developers should be confined to simple toy projects or drag-and-drop block coding."
        />

        {/* Big Editorial Quote (Light Theme) */}
        <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sun/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="font-mono text-xs text-sun-dark uppercase tracking-widest mb-6 font-bold">
            // OUR CONVICTION
          </div>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-ink leading-snug tracking-tight break-word">
            "The most innovative creative engineers in history didn't wait for a college diploma to start breaking things. FALLING SUN is the proving ground for the generation that builds before permission is granted."
          </blockquote>
          <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between font-mono text-xs text-ink-muted">
            <span>FALLING SUN FOUNDING CHARTER</span>
            <span className="text-sun-dark font-bold">{eventConfig.edition}</span>
          </div>
        </div>

        {/* The 3 Core Pillars */}
        <div className="space-y-8">
          <div className="font-mono text-xs text-ink-faint tracking-widest uppercase font-bold">
            // THE THREE PILLARS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-sun hover:shadow-[0_16px_36px_rgba(245,158,11,0.12)] transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sun/10 border border-sun/30 flex items-center justify-center text-sun-dark">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-black text-ink break-word">
                01. VELOCITY
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed font-sans font-medium">
                Zero bureaucracy. No endless panels or corporate fluff. We give you high-bandwidth connectivity, dedicated power rails, and mentor access so you can write code at peak velocity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-sun hover:shadow-[0_16px_36px_rgba(245,158,11,0.12)] transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sun/10 border border-sun/30 flex items-center justify-center text-sun-dark">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-black text-ink break-word">
                02. DEPTH
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed font-sans font-medium">
                We reward technical ambition. Whether it's crafting custom physics solvers in Godot, optimizing websocket servers in Rust, or soldering embedded motor drivers, we celebrate builders who go deep.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-sun hover:shadow-[0_16px_36px_rgba(245,158,11,0.12)] transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sun/10 border border-sun/30 flex items-center justify-center text-sun-dark">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-black text-ink break-word">
                03. CRAFTSMANSHIP
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed font-sans font-medium">
                Software is an art form. We emphasize thoughtful UI design, micro-interactions, silky frame rates, and tactile hardware casings over hastily cobbled together mockups.
              </p>
            </motion.div>
          </div>
        </div>

        {/* The 12H + 12H Format Explainer */}
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-6">
          <div className="font-mono text-xs text-sun-dark font-bold tracking-widest uppercase">
            // WHY 12 HOURS + 12 HOURS?
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-black text-ink">
            <MaskedReveal text="THE SPRINT PARADIGM" />
          </h3>
          <p className="text-ink text-base md:text-lg leading-relaxed font-sans max-w-4xl font-medium">
            Typical 36-hour non-stop hackathons lead to sleep-deprived code that barely runs and collapses during judging. Falling Sun introduces the structured <strong>12H + 12H</strong> format:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 font-mono text-xs">
            <div className="p-6 rounded-2xl bg-surface-subtle border border-black/10 space-y-2">
              <div className="text-sun-dark font-black text-sm">DAY 01 (12H) — THE ARCHITECTURE SPRINT</div>
              <p className="text-ink-muted font-sans text-xs sm:text-sm font-medium">
                Focus purely on systems engineering, engine setup, hardware wiring, and establishing working MVPs without fatigue.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-surface-subtle border border-black/10 space-y-2">
              <div className="text-flame font-black text-sm">DAY 02 (12H) — THE POLISH & PITCH</div>
              <p className="text-ink-muted font-sans text-xs sm:text-sm font-medium">
                Wake up refreshed, squash edge bugs, polish user interactions, and deliver confident, high-caliber live stage demonstrations.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Callout */}
        <WhatsAppCTA
          title="GET THE COMPLETE RULES & SCHEDULE ON WHATSAPP"
          subtitle="Specific project judging rubrics, hardware allowances, and check-in times will be distributed directly to WhatsApp members."
        />

        {/* Bottom Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-black/10 font-mono text-xs">
          <MagneticButton
            to="/tracks"
            text="NEXT: EXPLORE TRACKS"
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="px-6 py-3 rounded-full font-mono text-xs font-bold"
            variant="secondary"
          />
          <MagneticButton
            onClick={openRegLock}
            text="REGISTER NOW"
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="px-6 py-3 rounded-full font-mono text-xs font-bold"
            variant="outline"
          />
        </div>
      </div>
    </div>
  );
};
