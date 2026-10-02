import React from 'react';
import { Marquee } from '../Marquee';

interface MarqueeBannerProps {
  items?: string[];
  className?: string;
  speed?: 'normal' | 'fast' | 'slow';
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  items = [
    'UNDER 18 HACKATHON',
    'GAME DEVELOPMENT',
    'WEB DEVELOPMENT',
    'ROBOTICS',
    'CREATIVE SKILLS',
    '12H + 12H FORMAT',
    '2 DAYS',
    'BUILD SOMETHING WORTH REMEMBERING',
    'ZERO ENTRANCE FEE',
  ],
  className = '',
}) => {
  return <Marquee items={items} className={className} />;
};

export default MarqueeBanner;
