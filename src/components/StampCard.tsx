import React from 'react';

interface StampCardProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Perforated card. The "NO. 0N" number is drawn by the CSS counter
 * (.card::before) — the container needs the `.cards` class so the
 * counter restarts per group. Cards alternate -1deg / +1deg rotation.
 */
export const StampCard: React.FC<StampCardProps> = ({
  title,
  children,
  className = '',
}) => (
  <div className={`card odd:-rotate-1 even:rotate-1 ${className}`}>
    <h3 className="font-display font-black uppercase text-bg text-[1.9rem] leading-none m-0 mb-2 break-word">
      {title}
    </h3>
    {children}
  </div>
);

export default StampCard;
