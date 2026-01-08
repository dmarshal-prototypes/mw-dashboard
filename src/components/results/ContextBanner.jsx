import React from 'react';
import { Sparkles } from 'lucide-react';
import { theme } from '@styles/theme';

export const ContextBanner = ({ context }) => {
  return (
    <div
      style={{
        background: theme.colors.accent.gradient,
        border: `1px solid ${theme.colors.accent.border}`,
        borderRadius: theme.borderRadius.xl,
        padding: `${theme.spacing.md} 1.25rem`,
        marginBottom: theme.spacing.xl,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <Sparkles
        style={{
          color: theme.colors.primary,
          width: '20px',
          height: '20px',
          flexShrink: 0,
        }}
      />
      <span style={{ color: theme.colors.text.secondary, fontSize: theme.fontSize.lg }}>
        Context: <strong style={{ color: theme.colors.text.primary }}>{context}</strong>
      </span>
    </div>
  );
};
