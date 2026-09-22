import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Crown } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig';

export const HomeTeamSection: React.FC = () => {
  const backboneMembers = eventConfig.team.filter((m) => m.section === 'backbone');
  const regularMembers = eventConfig.team.filter((m) => m.section !== 'backbone');

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#F0EFF4] border-t border-black/10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted font-semibold"
            >
              THE STUDENTS BEHIND THE EVENT
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-ink tracking-tight break-word"
            >
              Team Falling Sun
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/30 hover:border-black bg-transparent hover:bg-black text-ink hover:text-white font-sans text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <span>Our Team</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* Backbone Members */}
        {backboneMembers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
            {backboneMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-sun/30 hover:border-sun shadow-[0_4px_20px_rgba(245,158,11,0.06)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.15)] transition-all duration-300"
                >
                  <div className="relative aspect-[220/280] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-sun-light tracking-widest uppercase font-bold z-10 shadow-sm flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5 text-amber-400" />
                      <span>{member.role === 'Director' ? 'DIRECTOR' : 'ASSOC. DIRECTOR'}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              ))}
          </div>
        )}

        {/* Regular Team Cards Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regularMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-black/10 hover:border-black/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="relative aspect-[220/280] w-full overflow-hidden bg-neutral-900">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {member.role === 'Lead Organizer' && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-sun-light tracking-widest uppercase font-bold z-10 shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-sun-light" />
                      <span>LEAD ORG</span>
                    </div>
                  )}

                  {member.role === 'Director' && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-amber-300 tracking-widest uppercase font-bold z-10 shadow-sm flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5 text-amber-400" />
                      <span>DIRECTOR</span>
                    </div>
                  )}

                  {member.role === 'Associate Director' && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[9px] text-purple-300 tracking-widest uppercase font-bold z-10 shadow-sm flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5 text-purple-400" />
                      <span>ASSOC. DIRECTOR</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
