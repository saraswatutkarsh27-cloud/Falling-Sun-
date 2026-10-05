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
          title="THE REWARD ARCHITECTURE"
          subtitle="Honoring exceptional technical depth, uncompromised design execution, and raw ingenuity across all competition disciplines."
        />

        {/* Prize Grid Component */}
        <PrizeGrid />
      </div>
    </div>
  );
};
