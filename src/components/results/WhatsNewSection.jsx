import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { Badge } from '@components/ui/Badge';
import { RelevanceBar } from '@components/ui/RelevanceBar';
import { theme } from '@styles/theme';

export const WhatsNewSection = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: theme.spacing.xxl }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.md,
        }}
      >
        <Sparkles style={{ color: theme.colors.primary, width: '22px', height: '22px' }} />
        <h2
          style={{
            fontSize: theme.fontSize['3xl'],
            fontWeight: theme.fontWeight.semibold,
            color: theme.colors.text.primary,
            margin: 0,
          }}
        >
          What's New in R2025b
        </h2>
        <Badge variant="primary">Latest</Badge>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: theme.spacing.md,
        }}
      >
        {items.map((item, idx) => (
          <WhatsNewCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

const WhatsNewCard = ({ item }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        background: isHovered ? theme.colors.accent.gradientHover : theme.colors.accent.gradient,
        border: `1px solid ${isHovered ? theme.colors.border.accentHover : theme.colors.border.accent}`,
        borderRadius: theme.borderRadius.lg,
        padding: '1.25rem',
        transition: 'all 0.2s',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(item.url, '_blank')}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.625rem',
        }}
      >
        <h3
          style={{
            fontSize: theme.fontSize.xl,
            fontWeight: theme.fontWeight.semibold,
            color: theme.colors.text.primary,
            margin: 0,
            lineHeight: '1.4',
            flex: 1,
          }}
        >
          {item.title}
        </h3>
        <ExternalLink
          style={{
            color: theme.colors.primary,
            width: '16px',
            height: '16px',
            marginLeft: theme.spacing.sm,
            flexShrink: 0,
          }}
        />
      </div>

      <p
        style={{
          color: '#b8cde5',
          fontSize: theme.fontSize.md,
          margin: `0 0 0.75rem 0`,
          lineHeight: '1.5',
        }}
      >
        {item.description}
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: theme.colors.text.dimmed,
            fontSize: theme.fontSize.base,
          }}
        >
          {item.category}
        </span>

        <RelevanceBar score={item.relevance} />
      </div>
    </div>
  );
};
