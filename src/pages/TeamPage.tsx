import React from 'react';
import { TeamGrid } from '../components/team/TeamGrid';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';

export const TeamPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg min-h-screen space-y-24 text-cream">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header matching Image 2 */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-block bg-cream text-bg border-2 border-ink px-3 py-1 font-mono text-xs tracking-[0.25em] uppercase font-bold -rotate-1">
            [00] — OUR CREW
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-cream break-word">
            The students behind the event.
          </h1>
          <p className="text-cream text-base sm:text-lg max-w-2xl mx-auto font-bold leading-relaxed">
            Team Falling Sun — student builders, designers, and organizers crafting the Falling Sun hackathon.
          </p>
        </div>

        {/* Team Grid Component */}
        <TeamGrid />

        {/* WhatsApp Callout */}
        <WhatsAppCTA
          title="MENTOR ROSTER WILL BE UNVEILED ON WHATSAPP"
          subtitle="Interested in mentoring or reviewing projects? Join our WhatsApp channel or submit your application to join the mentorship cohort."
        />
      </div>
    </div>
  );
};
