import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { eventConfig } from '../../config/eventConfig';
import { Clock, AlertCircle } from 'lucide-react';
import { WhatsAppCTA } from '../common/WhatsAppCTA';
import { MagneticButton } from '../common/MagneticButton';
import { EVENT_DATE_LABEL } from '../../data/event';

export const ScheduleTimeline: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);
  const currentDay = eventConfig.schedule[activeDay];
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="space-y-16">
      {/* Notice Banner */}
      <div className="p-6 bg-cream border-2 border-ink shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-reddark shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-mono text-xs font-bold text-reddark uppercase tracking-wider">
              TIMELINE ANNOUNCEMENT PENDING
            </div>
            <p className="text-ink-muted text-xs sm:text-sm font-sans">
              Exact hourly milestones, keynote speakers, and judging blocks will be announced through WhatsApp. The chronological event structure is outlined below.
            </p>
            <p className="font-mono text-xs text-ink font-bold tracking-widest pt-1">
              {EVENT_DATE_LABEL}
            </p>
          </div>
        </div>

        <WhatsAppCTA compact className="shrink-0" />
      </div>

      {/* Day Selector Buttons */}
      <div className="flex items-center justify-center gap-4">
        {eventConfig.schedule.map((day, idx) => (
          <MagneticButton
            key={day.dayNumber}
            onClick={() => setActiveDay(idx)}
            text={`${day.dayNumber} — ${day.duration}`}
            className="px-8 py-3.5 font-mono text-xs font-bold tracking-wider"
            variant={activeDay === idx ? 'primary' : 'outline'}
          />
        ))}
      </div>

      {/* Selected Day Info */}
      <div className="text-center space-y-2">
        <div className="inline-block bg-cream text-bg border-2 border-ink px-3 py-1 font-mono text-xs font-black uppercase tracking-widest -rotate-1">
          {currentDay.dayNumber} // {currentDay.duration}
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-black text-cream">
          {currentDay.title}
        </h3>
        <p className="font-mono text-xs text-cream font-bold">
          {currentDay.dateLabel}
        </p>
      </div>

      {/* Vertical Timeline Skeleton with Active Scroll Rail */}
      <div
        ref={timelineRef}
        className="relative max-w-4xl mx-auto pl-6 sm:pl-10 md:pl-16 space-y-8"
        style={{ perspective: 1000 }}
      >
        {/* Static Base Rail */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-cream/50" />

        {/* Dynamic Scroll-Animated Rail */}
        <motion.div
          style={{ height: railHeight }}
          className="absolute left-0 top-0 w-[3px] bg-yellow origin-top"
        />

        {currentDay.events.map((event, index) => (
          <motion.div
            key={event.title}
            initial={{ opacity: 0, x: -30, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            {/* Timeline Dot with Pulse Beacon */}
            <div className="absolute -left-[34px] sm:-left-[50px] md:-left-[74px] top-2 w-4 h-4 bg-yellow border-2 border-ink group-hover:scale-135 transition-transform flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-ink" />
            </div>

            {/* Timeline Event Card */}
            <div className="p-6 md:p-8 bg-cream border-2 border-ink shadow-card group-hover:shadow-[8px_8px_0_#1d1210] transition-all duration-300 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-ink-muted">
                  <Clock className="w-3.5 h-3.5 text-brown" />
                  <span className="bg-yellow px-2.5 py-0.5 border-2 border-ink font-bold text-ink">
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-ink-muted uppercase tracking-widest text-[10px] font-semibold">
                    STAGE: {event.stage}
                  </span>
                  <span className="px-2.5 py-0.5 text-[9px] font-bold bg-reddark text-cream border-2 border-ink uppercase tracking-widest">
                    {event.status}
                  </span>
                </div>
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-black text-ink group-hover:text-reddark transition-colors break-word">
                {event.title}
              </h4>

              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed font-sans font-medium">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
