import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://fallingsun2026.vercel.app';
const SITE_NAME = 'FALLING SUN 2026';

const DEFAULT_DESCRIPTION =
  'FALLING SUN is a premier 2-day (12H + 12H) under-18 hackathon focusing on Game Development, Web Development, and Robotics. Build something worth remembering.';

const ROUTE_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'FALLING SUN — Under 18 Hackathon | 12H + 12H, 2 Days',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: 'About | FALLING SUN 2026 — Under 18 Hackathon',
    description:
      'Learn about FALLING SUN 2026, a student-run under-18 hackathon running a 12H + 12H format across 2 days with tracks in Game Dev, Web Dev, and Robotics.',
  },
  '/tracks': {
    title: 'Tracks | FALLING SUN 2026 — Game Dev, Web Dev, Robotics',
    description:
      'Explore the three FALLING SUN 2026 hackathon tracks: Game Development, Web Development, and Robotics — focus areas, tools, and judging criteria.',
  },
  '/schedule': {
    title: 'Schedule | FALLING SUN 2026 — 12H + 12H Over 2 Days',
    description:
      'Day-by-day schedule for FALLING SUN 2026: check-in, keynote, two 12-hour hacking sprints, mentoring, live demos, and awards.',
  },
  '/prizes': {
    title: 'Prizes | FALLING SUN 2026 — Under 18 Hackathon',
    description:
      'Prize pool and awards for FALLING SUN 2026, including Grand Champion, track champions, Most Innovative Concept, and Rising Builder Award.',
  },
  '/team': {
    title: 'Team | FALLING SUN 2026 — Team Falling Sun',
    description:
      'Meet Team Falling Sun — the student organizers, leads, and backbone behind the FALLING SUN 2026 under-18 hackathon.',
  },
  '/faq': {
    title: 'FAQ | FALLING SUN 2026 — Under 18 Hackathon',
    description:
      'Answers to frequently asked questions about FALLING SUN 2026: eligibility, 12H + 12H format, tracks, teams, registration, and mentorship.',
  },
  '/register': {
    title: 'Register | FALLING SUN 2026 — Applications',
    description:
      'Register for FALLING SUN 2026. Under-18 hackers can apply solo or in teams of up to 4 across Game Dev, Web Dev, and Robotics tracks. 100% free.',
  },
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const RouteSeo: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/'];
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:url', url);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
};

export default RouteSeo;
