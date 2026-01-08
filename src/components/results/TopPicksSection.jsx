import React from 'react';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { theme } from '@styles/theme';

export const TopPicksSection = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: theme.spacing.xxl }}>
      <h2
        style={{
          fontSize: theme.fontSize['3xl'],
          fontWeight: theme.fontWeight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
        }}
      >
        <TrendingUp style={{ color: theme.colors.primary, width: '22px', height: '22px' }} />
        Still Worth Your Attention
      </h2>

      {items.map((pick, idx) => (
        <TopPickCard key={idx} pick={pick} />
      ))}
    </div>
  );
};

const TopPickCard = ({ pick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(61, 167, 255, 0.12) 0%, rgba(30, 126, 217, 0.08) 100%)',
        border: `1px solid ${isHovered ? theme.colors.border.accentHover : theme.colors.border.accent}`,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        transition: 'all 0.3s',
        cursor: 'pointer',
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(pick.url, '_blank')}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.75rem',
        }}
      >
        <h3
          style={{
            fontSize: theme.fontSize['2xl'],
            fontWeight: theme.fontWeight.semibold,
            color: theme.colors.text.primary,
            margin: 0,
            lineHeight: '1.4',
          }}
        >
          {pick.title}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            marginLeft: theme.spacing.md,
            flexShrink: 0,
          }}
        >
          {pick.release && (
            <span
              style={{
                background: theme.colors.accent.bg,
                color: theme.colors.primary,
                padding: `${theme.spacing.xs} 0.75rem`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.fontSize.sm,
                fontWeight: theme.fontWeight.medium,
              }}
            >
              {pick.release}
            </span>
          )}
          <ExternalLink style={{ color: theme.colors.primary, width: '16px', height: '16px' }} />
        </div>
      </div>

      <p
        style={{
          color: '#b8cde5',
          fontSize: theme.fontSize.lg,
          margin: 0,
          lineHeight: '1.6',
          fontStyle: 'italic',
        }}
      >
        {pick.reason}
      </p>
    </div>
  );
};
