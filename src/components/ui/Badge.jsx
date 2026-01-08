import React from 'react';
import { theme } from '@styles/theme';

export const Badge = ({ children, variant = 'primary' }) => {
  const styles = {
    primary: {
      background: theme.colors.button.gradient,
      color: theme.colors.text.primary,
    },
    secondary: {
      background: theme.colors.accent.bg,
      color: theme.colors.primary,
    },
  };

  return (
    <span
      style={{
        ...styles[variant],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.borderRadius.sm,
        fontSize: theme.fontSize.xs,
        fontWeight: theme.fontWeight.semibold,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {children}
    </span>
  );
};
