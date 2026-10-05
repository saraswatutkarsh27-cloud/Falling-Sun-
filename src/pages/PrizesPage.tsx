import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PrizeGrid } from '../components/prizes/PrizeGrid';

export const PrizesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg min-h-screen space-y-24 text-cream">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <SectionHeader
          number="04"
          category="RECOGNITION & REWARDS"
          title="PRIZES & REWARDS"
          subtitle="Build something great. Leave with something even better. Every participant takes home certificates and curated hampers, while winners unlock recognition, premium resources, technology rewards, and opportunities."
        />

        {/* Prize Grid Component */}
        <PrizeGrid />
      </div>
    </div>
  );
};
