import React from 'react';
import { Sparkles } from 'lucide-react';
import { theme } from '@styles/theme';

export const EmptyState = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: `${theme.spacing.xxxl} ${theme.spacing.xl}`,
        color: theme.colors.text.dimmed,
      }}
    >
      <Sparkles
        style={{
          width: '48px',
          height: '48px',
          margin: `0 auto ${theme.spacing.md}`,
          opacity: 0.3,
        }}
      />
      <p style={{ fontSize: theme.fontSize['2xl'], margin: 0 }}>
        Enter a MathWorks documentation URL to get started
      </p>
    </div>
  );
};
