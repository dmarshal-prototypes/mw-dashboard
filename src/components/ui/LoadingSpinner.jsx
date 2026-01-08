import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ size = 16 }) => {
  return (
    <Loader2
      className="spin"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
