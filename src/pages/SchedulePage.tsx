import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ScheduleTimeline } from '../components/schedule/ScheduleTimeline';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';

export const SchedulePage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg min-h-screen space-y-24 text-cream">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <SectionHeader
          number="03"
          category="EVENT TIMELINE"
          title="CHRONOLOGY & MILESTONES"
          subtitle="A structured 2-day sprint across 12 + 12 hours. Detailed hourly marks will be published via WhatsApp as venue permissions and stage schedules finalize."
        />

        {/* Schedule Timeline Component */}
        <ScheduleTimeline />

        {/* WhatsApp Callout */}
        <WhatsAppCTA
          title="GET LIVE NOTIFICATIONS WHEN SCHEDULE IS CONFIRMED"
          subtitle="Do not guess timings. As soon as the schedule lock is signed off by the organizing team, it will be broadcast directly via our official WhatsApp channel."
        />
      </div>
    </div>
  );
};
