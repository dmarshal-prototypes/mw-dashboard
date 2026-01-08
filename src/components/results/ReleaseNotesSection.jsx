import React from 'react';
import { ExternalLink } from 'lucide-react';
import { RelevanceBar } from '@components/ui/RelevanceBar';
import { theme } from '@styles/theme';

export const ReleaseNotesSection = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: theme.spacing.xxl }}>
      <h2
        style={{
          fontSize: theme.fontSize['2xl'],
          fontWeight: theme.fontWeight.semibold,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.md,
        }}
      >
        Other Relevant Updates
      </h2>

      <div
        style={{
          background: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.default}`,
          borderRadius: theme.borderRadius.lg,
          overflow: 'hidden',
        }}
      >
        {items.map((note, idx) => (
          <ReleaseNoteItem key={idx} note={note} isLast={idx === items.length - 1} />
        ))}
      </div>
    </div>
  );
};

const ReleaseNoteItem = ({ note, isLast }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{
        padding: `${theme.spacing.md} 1.25rem`,
        borderBottom: isLast ? 'none' : `1px solid rgba(255, 255, 255, 0.05)`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'background 0.2s',
        cursor: 'pointer',
        background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(note.url, '_blank')}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: theme.fontSize.lg,
            color: theme.colors.text.primary,
            marginBottom: '0.25rem',
          }}
        >
          {note.title}
        </div>
        <div
          style={{
            fontSize: theme.fontSize.base,
            color: theme.colors.text.dimmed,
          }}
        >
          {note.category} · {note.release}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.md,
        }}
      >
        <RelevanceBar score={note.relevance} width="60px" />
        <ExternalLink style={{ color: '#5a7a9a', width: '14px', height: '14px' }} />
      </div>
    </div>
  );
};
