import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { eventConfig } from '../config/eventConfig';
import { CheckCircle2, ShieldCheck, MessageSquare, Lock, Clock } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';
import { MaskedReveal, InteractiveRollText } from '../components/common/AnimatedText';

const REGISTRATION_OPENS_AT = new Date('2026-10-05T00:00:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, REGISTRATION_OPENS_AT - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isOpen: diff <= 0 };
}

export const RegisterPage: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>('game-development');
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#F0EFF4] min-h-screen space-y-24 text-ink">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <SectionHeader
          number="07"
          category="REGISTRATION PORTAL"
          title="APPLICATION ENROLLMENT"
          subtitle="Submit your application to participate in the Falling Sun 2026 cohort. Solo creators and teams of up to 4 members are welcome."
        />

        {/* Hero Card: READY TO BUILD? (Light Theme) */}
        <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-white border border-black/10 shadow-[0_8px_36px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sun/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Details */}
            <div className="lg:col-span-7 space-y-8">
              <div className="font-mono text-xs text-sun-dark uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sun animate-ping" />
                <span>APPLICATIONS OPENING SOON</span>
              </div>

              <div className="space-y-2 min-w-0">
                <div className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-ink tracking-tight leading-[0.95] break-word">
                  <MaskedReveal text="READY TO BUILD?" highlightWords={["BUILD?"]} highlightClass="text-sun" />
                </div>
                <p className="font-display text-xl sm:text-2xl text-ink font-bold pt-2">
                  FALLING SUN // UNDER 18 HACKATHON
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-ink to-neutral-800 border border-black/10">
                <div className="flex items-center gap-2 font-mono text-xs text-white/50 tracking-widest uppercase mb-4">
                  <Lock className="w-3.5 h-3.5 text-sun" />
                  <span>REGISTRATION COUNTDOWN</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'DAYS', value: timeLeft.days },
                    { label: 'HRS', value: timeLeft.hours },
                    { label: 'MIN', value: timeLeft.minutes },
                    { label: 'SEC', value: timeLeft.seconds },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                        <span className="font-display text-3xl font-black text-white tabular-nums">
                          {String(item.value).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-white/40 tracking-widest mt-2 block">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-white/40">
                  <Clock className="w-3.5 h-3.5 text-sun" />
                  <span>OCTOBER 5, 2026 • 12:00 AM</span>
                </div>
              </div>

              {/* Event Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs text-ink">
                <div className="p-4 rounded-2xl bg-surface-subtle border border-black/10 space-y-1">
                  <span className="text-ink-faint uppercase font-bold text-[10px]">DURATION</span>
                  <div className="text-ink font-black text-sm">{eventConfig.format}</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-black/10 space-y-1">
                  <span className="text-ink-faint uppercase font-bold text-[10px]">ELIGIBILITY</span>
                  <div className="text-sun-dark font-black text-sm">{eventConfig.ageGroup}</div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-black/10 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-ink-faint uppercase font-bold text-[10px]">COST</span>
                  <div className="text-ink font-black text-sm">100% FREE</div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-ink-soft font-sans font-medium">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sun shrink-0" />
                  <span>Individual or team registration (up to 4 members)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sun shrink-0" />
                  <span>Choose from Game Dev, Web Dev, or Robotics tracks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sun shrink-0" />
                  <span>Full access to mentors, hardware power rails, and workshops</span>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <MagneticButton
                  href={eventConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  text="JOIN WHATSAPP FOR UPDATES"
                  icon={<MessageSquare className="w-4 h-4 text-sun" />}
                  className="px-9 py-4 rounded-full font-mono text-xs font-bold tracking-wider"
                  variant="primary"
                />
              </div>
            </div>

            {/* Right Column: Track Selector with High Motion */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#F6F5FA] border border-black/10 space-y-6">
              <div className="font-mono text-xs text-ink-muted uppercase tracking-widest flex items-center justify-between font-bold">
                <span>SELECT PREFERRED TRACK</span>
                <span className="text-sun-dark">03 OPTIONS</span>
              </div>

              <div className="space-y-3">
                {eventConfig.tracks.map((track) => {
                  const isSelected = selectedTrack === track.id;
                  const isHovered = hoveredTrack === track.id;

                  return (
                    <motion.button
                      key={track.id}
                      type="button"
                      onClick={() => setSelectedTrack(track.id)}
                      onMouseEnter={() => setHoveredTrack(track.id)}
                      onMouseLeave={() => setHoveredTrack(null)}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.96 }}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer will-change-transform ${
                        isSelected
                          ? 'bg-white border-sun shadow-[0_4px_16px_rgba(245,158,11,0.15)] text-ink'
                          : 'bg-white/60 border-black/5 hover:border-black/20 text-ink-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs mb-1">
                        <span className="text-sun font-black">{track.number}</span>
                        <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-sun-dark' : 'text-ink-faint'}`}>
                          {isSelected ? '● SELECTED' : 'CLICK TO SELECT'}
                        </span>
                      </div>
                      <div className="font-display text-lg font-black text-ink">
                        <InteractiveRollText
                          text={track.title}
                          isHovered={isHovered || isSelected}
                          activeColor={isSelected ? "text-sun-dark" : "text-sun"}
                        />
                      </div>
                      <p className="text-ink-muted text-xs mt-1 font-sans line-clamp-2 font-medium">
                        {track.tagline}
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-2xl bg-white border border-black/10 font-mono text-[11px] text-ink-muted flex items-center gap-2 shadow-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-sun shrink-0" />
                <span>You can switch or adjust track preferences on event day.</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Callout */}
        <WhatsAppCTA
          title="INVITE CODE & ACCEPTANCE CONFIRMATION"
          subtitle="Once your registration application is received, team formation and confirmation passcodes will be coordinated via WhatsApp."
        />
      </div>
    </div>
  );
};
