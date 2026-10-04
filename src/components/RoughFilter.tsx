import React from 'react';

/**
 * Hidden SVG containing the #rough displacement filter used by the
 * `.rough` heading class. Rendered exactly once, in App.
 */
export const RoughFilter: React.FC = () => (
  <svg
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
    style={{ position: 'absolute', contentVisibility: 'visible' }}
  >
    <filter id="rough">
      <feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="3" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
    </filter>
  </svg>
);

export default RoughFilter;
