import React from 'react';
import { Sparkles } from 'lucide-react';
import { theme } from '@styles/theme';

export const Header = () => {
  return (
    <div style={{ marginBottom: theme.spacing.xl }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: theme.spacing.sm,
        }}
      >
        <Sparkles style={{ color: theme.colors.primary, width: '32px', height: '32px' }} />
        <h1
          style={{
            fontSize: theme.fontSize['4xl'],
            fontWeight: theme.fontWeight.semibold,
            background: 'linear-gradient(135deg, #ffffff 0%, #a0c4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
          }}
        >
          Content Discovery Assistant
        </h1>
      </div>

      <p
        style={{
          color: theme.colors.text.muted,
          fontSize: theme.fontSize.lg,
          marginBottom: 0,
          lineHeight: '1.5',
        }}
      >
        Finding the needle in the haystack. Paste any MathWorks documentation URL and discover
        the 1-2 release notes, features, or resources that actually matter to your work.
      </p>
    </div>
  );
};
