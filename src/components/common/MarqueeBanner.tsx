import React from 'react';

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
    '12H + 12H FORMAT',
    '2 DAYS',
    'BUILD SOMETHING WORTH REMEMBERING',
    'ZERO ENTRANCE FEE',
  ],
  className = '',
}) => {
  // Duplicate array for seamless infinite loop
  const list = [...items, ...items, ...items];

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap border-y border-black/10 bg-white py-3 select-none ${className}`}>
      <div className="inline-flex animate-marquee items-center gap-8">
        {list.map((item, index) => (
          <div key={`${item}-${index}`} className="inline-flex items-center gap-8">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-widest text-ink uppercase">
              {item}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-sun" />
          </div>
        ))}
      </div>
    </div>
  );
};

