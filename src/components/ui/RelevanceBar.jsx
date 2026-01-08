import React from 'react';
import { theme } from '@styles/theme';

export const RelevanceBar = ({ score, showLabel = true, width = '50px' }) => {
  const color = score > 80 ? theme.colors.primary : score > 70 ? theme.colors.primary : theme.colors.text.dimmed;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm }}>
      <div
        style={{
          width: showLabel ? width : '60px',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${score}%`,
            height: '100%',
            background: color,
            transition: 'width 0.5s ease-out',
          }}
        />
      </div>
      {showLabel && (
        <span
          style={{
            color: theme.colors.text.dimmed,
            fontSize: theme.fontSize.sm,
            width: '30px',
            textAlign: 'right',
          }}
        >
          {score}%
        </span>
      )}
    </div>
  );
};
