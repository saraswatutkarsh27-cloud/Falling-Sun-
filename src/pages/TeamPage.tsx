import React from 'react';
import { TeamGrid } from '../components/team/TeamGrid';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';

export const TeamPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#F0EFF4] min-h-screen space-y-24 text-ink">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header matching Image 2 */}
        <div className="text-center space-y-4 pt-4">
          <div className="font-mono text-xs text-ink-muted tracking-[0.25em] uppercase font-bold">
            [00] — OUR CREW
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-ink break-word">
            The students behind the event.
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Team Falling Sun — student builders, designers, and organizers crafting the Falling Sun under-18 hackathon.
          </p>
        </div>

        {/* Team Grid Component */}
        <TeamGrid />

        {/* WhatsApp Callout */}
        <WhatsAppCTA
          title="MENTOR ROSTER WILL BE UNVEILED ON WHATSAPP"
          subtitle="Interested in mentoring or reviewing under-18 projects? Join our WhatsApp channel or submit your application to join the mentorship cohort."
        />
      </div>
    </div>
  );
};
