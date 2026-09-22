import React from 'react';

/**
 * CustomCursor
 * The user requested normal native cursor.
 * Returning null ensures zero custom cursor DOM overhead,
 * zero trailing lag, and 100% standard OS pointer behavior.
 */
export const CustomCursor: React.FC = () => {
  return null;
};

export default CustomCursor;
