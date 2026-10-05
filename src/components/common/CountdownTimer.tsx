import React, { useState, useEffect } from 'react';
import { getRegistrationTimeLeft, RegistrationTimeLeft } from '../../utils/registration';

export const useCountdown = (): RegistrationTimeLeft => {
  const [timeLeft, setTimeLeft] = useState<RegistrationTimeLeft>(getRegistrationTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getRegistrationTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
};

interface CountdownGridProps {
  timeLeft: RegistrationTimeLeft;
  variant?: 'light' | 'dark';
}

export const CountdownGrid: React.FC<CountdownGridProps> = ({ timeLeft, variant = 'light' }) => {
  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ];

  const dark = variant === 'dark';

  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div
            className={`p-3 border ${
              dark ? 'bg-cream/10 border-cream/30' : 'bg-ink border-ink'
            }`}
          >
            <span className="font-display text-3xl font-black tabular-nums text-cream">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span
            className={`font-mono text-[10px] tracking-widest mt-2 block ${
              dark ? 'text-cream/80' : 'text-ink-muted'
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
