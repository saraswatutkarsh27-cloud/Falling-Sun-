import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { IntroSection } from '../components/home/IntroSection';
import { Format1212 } from '../components/home/Format1212';
import { TrackHorizontal } from '../components/tracks/TrackHorizontal';
import { SponsorSection } from '../components/sponsors/SponsorSection';
import { WhatsAppCTA } from '../components/common/WhatsAppCTA';
import { SectionHeader } from '../components/common/SectionHeader';
import { FaqAccordion } from '../components/faq/FaqAccordion';
import { MarqueeBanner } from '../components/common/MarqueeBanner';
import { ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../components/common/MagneticButton';
import { HomeTeamSection } from '../components/team/HomeTeamSection';
import { eventConfig } from '../config/eventConfig';
import { useRegistrationLock } from '../components/common/RegistrationLockModal';

export const HomePage: React.FC = () => {
  const { open: openRegLock } = useRegistrationLock();
  return (
    <div className="space-y-0 bg-bg text-cream">
      {/* 00: HERO */}
      <HeroSection />

      {/* INFINITE MARQUEE TICKER */}
      <MarqueeBanner />

      {/* 01: INTRO / MANIFESTO */}
      <IntroSection />

      {/* 02: 12 + 12 HOURS FORMAT */}
      <Format1212 />

      {/* 03: TRACKS EXPERIENCE */}
      <section className="relative py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <SectionHeader
            number="03"
            category="DISCIPLINES"
            title="THREE FORCES OF CREATION."
            subtitle="Explore our three specialized hackathon domains. Pick your arena and construct something that operates flawlessly under pressure."
          />
        </div>
        <TrackHorizontal />
      </section>

      {/* SECONDARY MARQUEE */}
      <MarqueeBanner
        items={[
          'SOLAR ENGINE ACTIVE',
          'ZERO SPAM',
          'ALL SKILL LEVELS WELCOME',
          'BRING YOUR OWN HARDWARE',
          'SOLO OR UP TO 4 MEMBERS',
          'DIRECT WHATSAPP DISPATCH',
        ]}
      />

      {/* 04: SPONSORS & PARTNERS (With TBA & The Black Card + Sponsor Form Modal) */}
      <SponsorSection />

      {/* 05: WHATSAPP ANNOUNCEMENT CALLOUT */}
      <section className="py-24 px-6 md:px-12 bg-reddark border-y-[3px] border-cream">
        <div className="max-w-7xl mx-auto">
          <WhatsAppCTA
            title="ALL UPDATES LIVE ON WHATSAPP"
            subtitle="Do not miss critical announcements. Team members, confirmed schedule timings, sponsor bounties, and venue details will be released through our WhatsApp community channel."
          />
        </div>
      </section>

      {/* 05: TEAM CYFERNODE */}
      <HomeTeamSection />

      {/* 06: FAQ PREVIEW */}
      <section className="py-28 px-6 md:px-12 bg-bg">
        <div className="max-w-7xl mx-auto space-y-16">
          <SectionHeader
            number="06"
            category="INTELLIGENCE & FAQ"
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="Everything you need to know about team limits, eligibility, equipment rules, and submissions."
          />
          <FaqAccordion />
          <div className="text-center pt-6">
            <MagneticButton
              to="/faq"
              text="VIEW ALL FAQS & GUIDELINES"
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="px-6 py-3 font-mono text-xs font-bold tracking-wider"
              variant="outline"
            />
          </div>
        </div>
      </section>

      {/* 07: FINAL CALL TO ACTION (Light Theme) */}
      <section className="py-32 px-6 md:px-12 bg-cream border-t-[3px] border-ink text-center relative overflow-hidden text-ink">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="text-xs text-brown font-bold tracking-widest uppercase">
            // JOIN THE COHORT
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-ink tracking-tight">
            ARE YOU READY<br />
            <span className="text-bg">TO BUILD?</span>
          </h2>

          <p className="text-ink-muted text-base md:text-lg max-w-xl mx-auto font-sans leading-relaxed font-medium">
            {eventConfig.format} across Game Dev, Web Dev, and Robotics. Reserve your spot before applications reach capacity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <MagneticButton
              onClick={openRegLock}
              dataCursor="cta"
              dataCursorLabel="JOIN"
              text="REGISTER NOW"
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="px-8 py-4 rounded-full font-mono text-xs font-bold tracking-wider"
              variant="primary"
            />

            <MagneticButton
              href={eventConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              text="WHATSAPP COMMUNITY"
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="px-8 py-4 font-mono text-xs font-bold tracking-wider"
              variant="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
