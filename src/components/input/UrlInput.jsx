import React, { useState } from 'react';
import { LoadingSpinner } from '@components/ui/LoadingSpinner';
import { theme } from '@styles/theme';

export const UrlInput = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (url.trim() && !loading) {
      onSubmit(url);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div style={{ marginBottom: theme.spacing.xxl }}>
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          maxWidth: '800px',
        }}
      >
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="https://mathworks.com/help/matlab/ref/plot.html"
          style={{
            flex: 1,
            padding: '0.875rem 1rem',
            background: isFocused ? theme.colors.background.inputHover : theme.colors.background.input,
            border: `1px solid ${isFocused ? theme.colors.primary : theme.colors.border.input}`,
            borderRadius: theme.borderRadius.md,
            color: theme.colors.text.primary,
            fontSize: theme.fontSize.lg,
            outline: 'none',
            transition: 'all 0.2s',
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !url.trim()}
          style={{
            padding: '0.875rem 1.75rem',
            background: loading ? theme.colors.button.disabled : theme.colors.button.gradient,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            color: theme.colors.text.primary,
            fontSize: theme.fontSize.lg,
            fontWeight: theme.fontWeight.medium,
            cursor: loading || !url.trim() ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
            opacity: loading || !url.trim() ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!loading && url.trim()) {
              e.target.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {loading ? (
            <>
              <LoadingSpinner />
              Analyzing
            </>
          ) : (
            'Discover'
          )}
        </button>
      </div>
    </div>
  );
};
