import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { Trophy, Award, Sparkles } from 'lucide-react';
import { WhatsAppCTA } from '../common/WhatsAppCTA';

export const PrizeGrid: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Editorial Announcement Banner */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sun/15 border border-sun/40 text-sun-dark font-mono text-xs uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRIZE ANNOUNCEMENT PENDING</span>
        </div>

        <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-ink">
          BUILD. SHIP. <span className="text-sun">WIN.</span>
        </h3>

        <p className="text-ink-muted text-sm md:text-base leading-relaxed font-sans font-medium">
          The official cash prize pool, partner company bounties, and hardware perks are being curated. Exact values will be disclosed via our official WhatsApp community.
        </p>

        <WhatsAppCTA compact className="mx-auto" />
      </div>

      {/* Dynamic Editorial Prize Grid (Light Theme + 3D Perspective Entrance) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
        {eventConfig.prizes.map((prize, idx) => (
          <motion.div
            key={prize.id}
            initial={{ opacity: 0, y: 40, rotateX: 12, rotateY: idx % 2 === 0 ? 6 : -6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: idx * 0.09, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative p-8 rounded-3xl bg-white border border-black/10 hover:border-sun shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient hover light */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-sun/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-sun/25 transition-all duration-500" />

            <div className="space-y-6 min-w-0">
              {/* Header: Rank Number and Category */}
              <div className="flex items-center justify-between font-mono text-xs text-ink-muted">
                <span className="font-black text-3xl text-sun group-hover:text-ink transition-colors">
                  {prize.rank}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-black/[0.04] border border-black/5 text-ink-soft uppercase tracking-widest text-[10px] font-bold">
                  {prize.category}
                </span>
              </div>

              {/* Title & TBA Value Badge */}
              <div className="space-y-3 min-w-0">
                <h4 className="font-display text-2xl font-black text-ink tracking-tight break-word">
                  {prize.title}
                </h4>

                {/* TBA value pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-sun/10 border border-sun/30 font-mono text-xs text-sun-dark font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>VALUE // {prize.status}</span>
                </div>

                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-sans pt-1 font-medium">
                  {prize.description}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-8 border-t border-black/5 flex items-center justify-between font-mono text-[11px] text-ink-muted">
              <span className="flex items-center gap-1.5 font-semibold text-ink-soft">
                <Award className="w-3.5 h-3.5 text-sun group-hover:scale-110 transition-transform" />
                <span>OFFICIAL TROPHY</span>
              </span>
              <span className="text-ink-faint uppercase font-bold">WHATSAPP DROP</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp Full Banner */}
      <WhatsAppCTA
        title="WANT FIRST ACCESS TO THE PRIZE REVEAL?"
        subtitle="Join the WhatsApp group to receive push notifications the second our sponsor bounties and cash pool go live."
      />
    </div>
  );
};
