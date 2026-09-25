import React from 'react';

interface RulerTickerProps {
  className?: string;
  label?: string;
  sublabel?: string;
}

export const RulerTicker: React.FC<RulerTickerProps> = ({
  className = '',
  label = 'SYS // 28°32\'N 77°14\'E',
  sublabel = 'FALLING SUN • UNDER 18',
}) => {
  // Generate 48 ruler tick marks
  const ticks = Array.from({ length: 48 }, (_, i) => i);

  return (
    <div className={`w-full overflow-hidden border-y border-black/10 bg-black/[0.015] select-none py-1.5 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between font-mono text-[10px] text-ink-muted">
        <span className="hidden sm:inline-block tracking-widest uppercase font-semibold text-ink-soft">
          {label}
        </span>

        {/* Center Ruler Marks (like Falling Sun) */}
        <div className="flex items-end gap-1.5 sm:gap-2.5 h-6 mx-auto">
          {ticks.map((t) => {
            const isTall = t % 6 === 0;
            const isMedium = t % 3 === 0 && !isTall;
            return (
              <div
                key={t}
                className={`w-[1px] bg-black/20 transition-all ${
                  isTall ? 'h-5 bg-black/40' : isMedium ? 'h-3.5 bg-black/25' : 'h-2 bg-black/15'
                }`}
              />
            );
          })}
        </div>

        <span className="hidden md:inline-block tracking-widest text-sun font-bold uppercase">
          {sublabel}
        </span>
      </div>
    </div>
  );
};

