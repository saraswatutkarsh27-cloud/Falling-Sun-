import React from 'react';

interface SparkleProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Four-point star with the twinkle animation.
 * Position, size and colour come from className / style.
 */
export const Sparkle: React.FC<SparkleProps> = ({ className = '', style }) => (
  <i
    aria-hidden="true"
    className={`block animate-twinkle pointer-events-none ${className}`}
    style={{
      clipPath:
        'polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%)',
      ...style,
    }}
  />
);

export default Sparkle;
