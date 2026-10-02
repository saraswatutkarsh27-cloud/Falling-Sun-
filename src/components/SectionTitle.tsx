import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

/** Tilted cream label with red, rough-edged display text. */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
}) => (
  <h2
    className={`rough inline-block -rotate-2 bg-cream text-bg px-4 py-0.5 font-display font-black uppercase leading-[0.92] text-[clamp(2.6rem,9vw,5rem)] mb-7 break-word ${className}`}
  >
    {children}
  </h2>
);

export default SectionTitle;
