import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { FaqAccordion } from '../components/faq/FaqAccordion';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';
import { HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-bg min-h-screen space-y-24 text-cream">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Page Header */}
        <SectionHeader
          number="06"
          category="FREQUENTLY ASKED QUESTIONS"
          title="QUESTIONS & ANSWERS."
          subtitle="Clear answers regarding eligibility, rules, hardware allowances, team sizes, and the competition schedule."
        />

        {/* FAQ Accordion Component */}
        <FaqAccordion />

        {/* Have more questions callout */}
        <div className="p-8 sm:p-10 bg-cream border-2 border-ink shadow-card text-center space-y-4 max-w-2xl mx-auto">
          <HelpCircle className="w-8 h-8 text-reddark mx-auto" />
          <h4 className="font-display text-2xl font-black text-ink">
            STILL HAVE AN UNANSWERED QUESTION?
          </h4>
          <p className="text-ink-muted text-sm font-sans font-medium">
            Our organizers answer participant queries in real time inside the official WhatsApp community group.
          </p>
          <div className="pt-2">
            <WhatsAppCTA compact />
          </div>
        </div>
      </div>
    </div>
  );
};
