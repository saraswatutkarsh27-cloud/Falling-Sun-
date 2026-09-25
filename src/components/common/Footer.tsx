import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig';
import { MagneticButton } from './MagneticButton';
import { InteractiveRollText } from './AnimatedText';

const FooterLink: React.FC<{ to: string; number?: string; label: string; highlight?: boolean }> = ({
  to,
  number,
  label,
  highlight = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <Link
        to={to}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-2 group cursor-pointer"
      >
        {number && (
          <span className={`text-[11px] font-mono ${highlight ? 'text-sun font-bold' : 'text-ink-faint'}`}>
            {number}
          </span>
        )}
        <InteractiveRollText
          text={label}
          isHovered={isHovered}
          activeColor={highlight ? 'text-sun-dark' : 'text-sun'}
          className={`font-mono text-xs ${highlight ? 'font-black text-ink' : 'text-ink-muted group-hover:text-ink'}`}
        />
      </Link>
    </li>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white text-ink border-t border-black/10 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting and grid */}
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sun/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        {/* Top CTA Bar: WhatsApp Updates */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#F6F5FA] border border-black/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-20 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-sun-dark tracking-widest uppercase font-bold">
              <span className="h-2 w-2 rounded-full bg-sun animate-pulse" />
              <span>OFFICIAL DISPATCH SYSTEM</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-black text-ink break-word">
              STAY INFORMED VIA WHATSAPP
            </h3>
            <p className="text-ink-muted text-sm max-w-lg font-sans">
              Schedule updates, mentor lineups, venue directions, and prize drops will be published directly to our official WhatsApp channel.
            </p>
          </div>

          <MagneticButton
            href={eventConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            text="GET UPDATES ON WHATSAPP"
            icon={<ArrowUpRight className="w-4 h-4" />}
            className="px-7 py-3.5 rounded-full font-mono text-xs font-bold tracking-wider"
            variant="secondary"
          />
        </div>

        {/* Middle: Brand, Statement, Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          {/* Brand & Slogan */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="/logo_transparent.webp"
                alt="Falling Sun Logo"
                className="w-12 h-12 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
              />
              <span className="font-display text-2xl font-black tracking-widest text-ink">
                FALLING SUN
              </span>
            </div>

            <div className="space-y-2">
              <div className="font-display text-3xl md:text-4xl font-black tracking-tight text-ink leading-tight break-word">
                BUILD SOMETHING<br />
                <span className="text-sun">WORTH REMEMBERING.</span>
              </div>
              <p className="font-mono text-xs text-ink-muted max-w-md pt-2">
                A two-day under-18 hackathon where young builders turn raw imagination into playable games, distributed web applications, and autonomous robotics.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-ink-muted pt-2">
              <Terminal className="w-4 h-4 text-sun" />
              <span>{eventConfig.format}</span>
              <span className="mx-2 text-black/20">|</span>
              <span className="font-semibold text-ink">{eventConfig.ageGroup}</span>
            </div>
          </div>

          {/* Navigation Links with Interactive Character Rolls */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-mono text-xs text-ink-faint tracking-widest uppercase font-bold">
              // SITE INDEX
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-ink-muted">
              <FooterLink to="/" number="00" label="HOME" />
              <FooterLink to="/about" number="01" label="ABOUT" />
              <FooterLink to="/tracks" number="02" label="TRACKS" />
              <FooterLink to="/schedule" number="03" label="SCHEDULE" />
              <FooterLink to="/prizes" number="04" label="PRIZES" />
              <FooterLink to="/team" number="05" label="TEAM" />
              <FooterLink to="/faq" number="06" label="FAQ" />
              <FooterLink to="/register" number="07" label="REGISTER" highlight />
            </ul>
          </div>

          {/* Tracks & Community Links with Interactive Character Rolls */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-mono text-xs text-ink-faint tracking-widest uppercase font-bold">
              // DISCIPLINES
            </div>
            <ul className="space-y-2.5 font-mono text-xs text-ink-muted">
              <FooterLink to="/tracks" number="01" label="GAME DEVELOPMENT" />
              <FooterLink to="/tracks" number="02" label="WEB DEVELOPMENT" />
              <FooterLink to="/tracks" number="03" label="ROBOTICS" />
            </ul>

            <div className="font-mono text-xs text-ink-faint tracking-widest uppercase pt-6 font-bold">
              // CHANNELS
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-xs text-ink-muted">
              <a
                href={eventConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sun transition-colors underline-offset-4 hover:underline"
              >
                WHATSAPP
              </a>
              <span className="text-black/20">/</span>
              <a
                href={eventConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sun transition-colors underline-offset-4 hover:underline"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </div>

        {/* Giant Typographic Brand Watermark (Light Theme) */}
        <div className="pt-10 select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.06 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display font-black text-center text-[13vw] leading-none tracking-tighter text-ink"
          >
            FALLING SUN
          </motion.div>
        </div>

        {/* Bottom Copyright & Coordinates */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 font-mono text-xs text-ink-muted">
          <div>
            © {eventConfig.name} — {eventConfig.ageGroup} HACKATHON. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-3">
            <span>{eventConfig.coordinates}</span>
            <span>•</span>
            <span className="text-sun font-bold">{eventConfig.statusText}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
