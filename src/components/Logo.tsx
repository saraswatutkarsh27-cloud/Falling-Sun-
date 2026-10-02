import React from 'react';

/**
 * Falling Sun logo emblem.
 * Renders the site's logo mark in cream with red accent — matching /logo_transparent.png.
 */
export const Logo: React.FC = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="w-28 h-28 md:w-36 md:h-36"
    >
      {/* Outer ring */}
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#1d1210"
        strokeWidth="3"
        strokeDasharray="4 6"
      />
      {/* Inner core */}
      <circle cx="60" cy="60" r="34" fill="#1d1210" />

      {/* SUN glyph (top-right quadrant) */}
      <g fill="#ffc50f">
        <path d="M78 46 C80 42 84 42 86 46 C88 50 84 54 80 54 C76 54 72 50 74 46 Z" />
        <path d="M88 36 C90 32 94 32 96 36 C98 40 94 44 90 44 C86 44 82 40 84 36 Z" />
        <circle cx="78" cy="40" r="1.6" fill="#1d1210" />
        <circle cx="88" cy="30" r="1.6" fill="#1d1210" />
        <circle cx="80" cy="24" r="1" fill="#1d1210" />
        <circle cx="92" cy="38" r="1" fill="#1d1210" />
      </g>

      {/* SUN glyph (bottom-left quadrant) */}
      <g fill="#1f9a4a">
        <path d="M42 74 C44 78 40 82 36 80 C32 76 36 72 40 72 C44 72 48 76 46 80 Z" />
        <path d="M32 84 C30 88 26 88 24 84 C22 80 26 76 30 76 C34 76 38 80 36 84 Z" />
        <circle cx="42" cy="80" r="1.6" fill="#ffffff" />
        <circle cx="32" cy="88" r="1.6" fill="#ffffff" />
        <circle cx="40" cy="94" r="1" fill="#ffffff" />
        <circle cx="28" cy="82" r="1" fill="#ffffff" />
      </g>

      {/* Stem + lemon-chilli halves */}
      <rect x="53" y="40" width="14" height="40" rx="2" fill="#1d1210" />
      <path d="M53 66 C49 66 49 70 53 70" stroke="#e4161b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M53 78 C49 78 49 82 53 82" stroke="#ffc50f" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* FALLING SUN text (cream) */}
      <text
        x="60"
        y="98"
        textAnchor="middle"
        fontFamily="'Londrina Solid', 'Space Grotesk', sans-serif"
        fontSize="11"
        fontWeight="900"
        fill="#f3dfc6"
        letterSpacing="2"
      >
        FALLING SUN
      </text>
    </svg>
  );
};

export default Logo;
