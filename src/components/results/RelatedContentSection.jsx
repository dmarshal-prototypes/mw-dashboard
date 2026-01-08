import React from 'react';
import { getTypeIcon } from '@utils/iconMapper';
import { theme } from '@styles/theme';

export const RelatedContentSection = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <h2
        style={{
          fontSize: theme.fontSize['2xl'],
          fontWeight: theme.fontWeight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}
      >
        You Might Also Like
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: theme.spacing.md,
        }}
      >
        {items.map((content, idx) => (
          <RelatedContentCard key={idx} content={content} />
        ))}
      </div>
    </div>
  );
};

const RelatedContentCard = ({ content }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const IconComponent = getTypeIcon(content.type);

  return (
    <div
      style={{
        background: isHovered ? theme.colors.background.cardHover : 'rgba(255, 255, 255, 0.04)',
        border: `1px solid ${isHovered ? theme.colors.border.hover : theme.colors.border.default}`,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        transition: 'all 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(content.url, '_blank')}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
        }}
      >
        <IconComponent style={{ width: '16px', height: '16px', color: theme.colors.primary }} />
        <span
          style={{
            color: theme.colors.primary,
            fontSize: theme.fontSize.sm,
            textTransform: 'uppercase',
            fontWeight: theme.fontWeight.medium,
          }}
        >
          {content.type}
        </span>
      </div>

      <div
        style={{
          color: theme.colors.text.primary,
          fontSize: theme.fontSize.lg,
          marginBottom: theme.spacing.sm,
        }}
      >
        {content.title}
      </div>

      {content.duration && (
        <div style={{ color: theme.colors.text.dimmed, fontSize: theme.fontSize.base }}>
          {content.duration}
        </div>
      )}

      {content.author && (
        <div style={{ color: theme.colors.text.dimmed, fontSize: theme.fontSize.base }}>
          by {content.author}
        </div>
      )}
    </div>
  );
};
