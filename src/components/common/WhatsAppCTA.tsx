import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bell, ShieldCheck } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig';
import { MagneticButton } from './MagneticButton';

interface WhatsAppCTAProps {
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
}

export const WhatsAppCTA: React.FC<WhatsAppCTAProps> = ({
  title = "STAY UPDATED VIA WHATSAPP",
  subtitle = "Schedule alerts, prize reveals, mentor announcements, and venue coordinates will be broadcast exclusively to the official WhatsApp community.",
  className = "",
  compact = false,
}) => {
  if (compact) {
    return (
      <MagneticButton
        href={eventConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        text="JOIN WHATSAPP CHANNEL"
        icon={<ArrowUpRight className="w-3.5 h-3.5" />}
        className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider ${className}`}
        variant="secondary"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-3xl border border-sun/40 bg-white p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)] ${className}`}
    >
      {/* Background ambient solar glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sun/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-sun-dark tracking-widest uppercase font-bold">
            <span className="h-2 w-2 rounded-full bg-sun animate-ping" />
            <span>OFFICIAL COMMUNICATIONS CHANNEL</span>
          </div>

          <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-ink break-word">
            {title}
          </h3>

          <p className="text-ink-muted text-sm md:text-base leading-relaxed font-sans">
            {subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sun" />
              <span>Zero Spam</span>
            </span>
            <span className="text-black/15">•</span>
            <span className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-sun" />
              <span>Instant Drop Alerts</span>
            </span>
            <span className="text-black/15">•</span>
            <span>Under-18 Verified</span>
          </div>
        </div>

        <MagneticButton
          href={eventConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          text="GET UPDATES ON WHATSAPP"
          icon={<ArrowUpRight className="w-4 h-4" />}
          className="px-8 py-4 rounded-full font-mono text-xs font-bold tracking-wider"
          variant="secondary"
        />
      </div>
    </motion.div>
  );
};

export default WhatsAppCTA;
