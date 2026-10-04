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
        className={`px-5 py-2.5 font-mono text-xs font-bold tracking-wider ${className}`}
        variant="primary"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden bg-cream text-ink border-2 border-ink p-8 md:p-12 shadow-card ${className}`}
    >
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-reddark tracking-widest uppercase font-bold">
            <span className="h-2 w-2 bg-green animate-pulse" />
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
              <ShieldCheck className="w-4 h-4 text-brown" />
              <span>Zero Spam</span>
            </span>
            <span className="text-ink/30">•</span>
            <span className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-brown" />
              <span>Instant Drop Alerts</span>
            </span>
          </div>
        </div>

        <MagneticButton
          href={eventConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          text="GET UPDATES ON WHATSAPP"
          icon={<ArrowUpRight className="w-4 h-4" />}
          className="px-8 py-4 font-mono text-xs font-bold tracking-wider"
          variant="primary"
        />
      </div>
    </motion.div>
  );
};

export default WhatsAppCTA;
