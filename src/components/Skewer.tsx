import React from 'react';

interface SkewerProps {
  className?: string;
}

const O = {
  stroke: '#111',
  strokeWidth: 5,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
} as const;

const LABEL = {
  fontFamily: '"Caveat Brush", cursive',
  fill: '#9a3f12',
  fontSize: '30px',
  textAnchor: 'middle' as const,
};

/**
 * The nimbu-mirchi skewer: red and green chillies, yellow lemons,
 * thick black outlines and hand-lettered FALLING / SUN / 2026 labels.
 * SVG markup copied from reference.html.
 */
export const Skewer: React.FC<SkewerProps> = ({ className = '' }) => (
  <svg
    className={`block mx-auto w-full max-w-[820px] ${className}`}
    viewBox="0 0 900 240"
    role="img"
    aria-label="Skewer of lemons and chillies reading Falling Sun 2026"
  >
    <line x1="5" y1="130" x2="895" y2="130" {...O} />
    <path
      {...O}
      fill="#e4161b"
      d="M40 60 C56 56 62 70 60 100 C58 150 46 210 34 224 C34 150 28 110 32 80 Z"
    />
    <path d="M38 84 L38 130" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path {...O} fill="#ffc50f" d="M70 130 C80 70 170.0 62 270 130 C170.0 198 80 190 70 130Z" />
    <path d="M86 112 Q88 98 100 92" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
    <text x="170" y="142" {...LABEL}>
      FALLING
    </text>
    <path
      {...O}
      fill="#1f9a4a"
      d="M300 60 C316 56 322 70 320 100 C318 150 306 220 294 234 C294 150 288 110 292 80 Z"
    />
    <path d="M298 84 L298 130" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path
      {...O}
      fill="#e4161b"
      d="M330 60 C346 56 352 70 350 100 C348 150 336 210 324 224 C324 150 318 110 322 80 Z"
    />
    <path d="M328 84 L328 130" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path {...O} fill="#ffc50f" d="M350 130 C360 70 445.0 62 540 130 C445.0 198 360 190 350 130Z" />
    <path d="M366 112 Q368 98 380 92" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
    <text x="445" y="142" {...LABEL}>
      SUN
    </text>
    <path
      {...O}
      fill="#1f9a4a"
      d="M570 60 C586 56 592 70 590 100 C588 150 576 220 564 234 C564 150 558 110 562 80 Z"
    />
    <path d="M568 84 L568 130" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path
      {...O}
      fill="#e4161b"
      d="M600 60 C616 56 622 70 620 100 C618 150 606 210 594 224 C594 150 588 110 592 80 Z"
    />
    <path d="M598 84 L598 130" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path {...O} fill="#ffc50f" d="M630 130 C640 70 745.0 62 860 130 C745.0 198 640 190 630 130Z" />
    <path d="M646 112 Q648 98 660 92" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
    <text x="745" y="142" {...LABEL}>
      2026
    </text>
  </svg>
);

export default Skewer;
