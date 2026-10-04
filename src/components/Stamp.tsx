import React from 'react';

interface StampProps {
  children: React.ReactNode;
  className?: string;
}

/** Cream panel with perforated edges and a hard offset shadow. */
export const Stamp: React.FC<StampProps> = ({ children, className = '' }) => (
  <div className={`stamp ${className}`}>{children}</div>
);

export default Stamp;
