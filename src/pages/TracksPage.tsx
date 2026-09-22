import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { GameDevVisual, WebDevVisual, RoboticsVisual } from '../components/tracks/TrackVisuals';
import { eventConfig } from '../config/eventConfig';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';
import { MaskedReveal } from '../components/common/AnimatedText';
import { useRegistrationLock } from '../components/common/RegistrationLockModal';

export const TracksPage: React.FC = () => {
  const { open: openRegLock } = useRegistrationLock();
  const visuals = [
    <GameDevVisual key="game" />,
    <WebDevVisual key="web" />,
    <RoboticsVisual key="robotics" />,
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#F0EFF4] min-h-screen space-y-24 text-ink">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <SectionHeader
          number="02"
          category="COMPETITION ARENAS"
          title="THREE PATHWAYS. INFINITE OUTCOMES."
          subtitle="Select your focus track. Whether your craft is graphics pipelines, distributed web applications, or kinetic robotics, Falling Sun provides the infrastructure to build without limits."
        />

        {/* Detailed Track Sections with 3D Perspective Entrance */}
        <div className="space-y-20" style={{ perspective: 1200 }}>
          {eventConfig.tracks.map((track, idx) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 50, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-12 md:p-16 rounded-3xl bg-white border border-black/10 shadow-[0_4px_28px_rgba(0,0,0,0.03)] hover:border-sun transition-all relative overflow-hidden"
            >
              {/* Top indicator */}
              <div className="flex items-center justify-between font-mono text-xs text-sun pb-8 border-b border-black/10 mb-10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-sun">{track.number}</span>
                  <span className="text-black/20">//</span>
                  <span className="tracking-widest uppercase text-ink font-bold">
                    {track.title}
                  </span>
                </div>
                <span className="text-ink-muted hidden sm:inline uppercase tracking-widest font-semibold">
                  TRACK SPECIFICATION
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Information Column */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="font-mono text-xs text-sun-dark uppercase tracking-wider font-bold">
                    {track.tagline}
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl font-black text-ink break-word">
                    <MaskedReveal text={track.title} />
                  </h3>

                  <p className="text-ink-muted text-sm sm:text-base leading-relaxed font-sans font-medium">
                    {track.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="space-y-3 pt-2">
                    <div className="font-mono text-xs text-ink-faint uppercase tracking-widest font-bold">
                      // EVALUATION FOCUS AREAS
                    </div>
                    <div className="space-y-2">
                      {track.focusAreas.map((area) => (
                        <div key={area} className="flex items-start gap-3 text-xs sm:text-sm text-ink font-sans font-medium">
                          <CheckCircle2 className="w-4 h-4 text-sun shrink-0 mt-0.5" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Stack */}
                  <div className="space-y-2 pt-2">
                    <div className="font-mono text-xs text-ink-faint uppercase tracking-widest font-bold">
                      // SUGGESTED ENGINES & STACKS
                    </div>
                    <div className="flex flex-wrap gap-2 font-mono text-xs">
                      {track.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-black/10 text-ink font-semibold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <MagneticButton
                      onClick={openRegLock}
                      text="ENROLL IN THIS TRACK"
                      icon={<ArrowUpRight className="w-4 h-4" />}
                      className="px-6 py-3.5 rounded-full font-mono text-xs font-bold tracking-wider"
                      variant="primary"
                    />
                  </div>
                </div>

                {/* Interactive Visual Column */}
                <div className="lg:col-span-6">
                  {visuals[idx]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Callout */}
        <WhatsAppCTA
          title="TRACK PROBLEM STATEMENTS DROP ON WHATSAPP"
          subtitle="Specific prompt themes and mentor office hours for each track will be released to the WhatsApp cohort prior to kickoff."
        />
      </div>
    </div>
  );
};
