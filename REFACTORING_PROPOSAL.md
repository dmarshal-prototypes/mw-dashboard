# Refactoring Proposal: Multi-File Web Application Structure

## Executive Summary

Transform the single-file `mw-dashboard.jsx` (757 lines) into a scalable, maintainable multi-file React application following modern best practices.

## Current State Analysis

### Strengths
- ✅ Functional React component with proper hooks usage
- ✅ Clear UI/UX with well-organized sections
- ✅ Working Claude API integration
- ✅ Good error handling in API calls
- ✅ Responsive design considerations

### Pain Points
- ❌ All code in a single 757-line file
- ❌ No separation of concerns (UI, logic, API, styles)
- ❌ Inline styles make theming difficult
- ❌ No reusable components
- ❌ API key hardcoded in client-side code (security risk)
- ❌ No build configuration
- ❌ No testing infrastructure
- ❌ No type safety
- ❌ Difficult to maintain and extend

## Proposed Architecture

### Directory Structure

```
mw-dashboard/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── input/
│   │   │   └── UrlInput.jsx
│   │   ├── results/
│   │   │   ├── ResultsContainer.jsx
│   │   │   ├── ContextBanner.jsx
│   │   │   ├── WhatsNewSection.jsx
│   │   │   ├── TopPicksSection.jsx
│   │   │   ├── ReleaseNotesSection.jsx
│   │   │   └── RelatedContentSection.jsx
│   │   └── ui/
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       ├── RelevanceBar.jsx
│   │       └── LoadingSpinner.jsx
│   ├── services/
│   │   ├── api/
│   │   │   ├── claude.js
│   │   │   └── endpoints.js
│   │   └── prompts/
│   │       └── contentDiscovery.js
│   ├── hooks/
│   │   ├── useContentAnalysis.js
│   │   └── useDebounce.js
│   ├── styles/
│   │   ├── theme.js
│   │   ├── colors.js
│   │   ├── animations.css
│   │   └── global.css
│   ├── utils/
│   │   ├── urlValidator.js
│   │   ├── formatters.js
│   │   └── iconMapper.js
│   ├── types/
│   │   └── content.types.js (or .ts if using TypeScript)
│   ├── App.jsx
│   ├── main.jsx
│   └── config.js
├── .env.example
├── .env.local (gitignored)
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
├── README.md
└── REFACTORING_PROPOSAL.md
```

## Detailed Refactoring Plan

### Phase 1: Project Setup & Configuration

#### 1.1 Initialize Build System
```json
// package.json
{
  "name": "mw-content-discovery",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\""
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.462.0",
    "axios": "^1.7.9"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.3",
    "eslint": "^9.17.0",
    "prettier": "^3.4.2"
  }
}
```

#### 1.2 Environment Configuration
```bash
# .env.example
VITE_ANTHROPIC_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.anthropic.com/v1
VITE_MODEL_NAME=claude-sonnet-4-20250514
VITE_MAX_TOKENS=4000
```

#### 1.3 Vite Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### Phase 2: Extract Styles & Theme

#### 2.1 Theme System
```javascript
// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#3da7ff',
    primaryDark: '#1e7ed9',
    background: {
      gradient: 'linear-gradient(135deg, #0a1628 0%, #1a2942 100%)',
      card: 'rgba(255, 255, 255, 0.03)',
      cardHover: 'rgba(255, 255, 255, 0.06)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e8f3',
      muted: '#8ba3c7',
      dimmed: '#7a92b0',
    },
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.15)',
      accent: 'rgba(61, 167, 255, 0.25)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '10px',
    xl: '12px',
  },
  fontFamily: '"Instrument Sans", -apple-system, sans-serif',
};
```

#### 2.2 Global Styles
```css
/* src/styles/global.css */
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Instrument Sans", -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
```

#### 2.3 Animations
```css
/* src/styles/animations.css */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.spin {
  animation: spin 1s linear infinite;
}
```

### Phase 3: Extract Services & API Layer

#### 3.1 Claude API Service
```javascript
// src/services/api/claude.js
import axios from 'axios';
import { contentDiscoveryPrompt } from '../prompts/contentDiscovery';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME;
const MAX_TOKENS = parseInt(import.meta.env.VITE_MAX_TOKENS);

export class ClaudeAPIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ClaudeAPIError';
    this.status = status;
    this.data = data;
  }
}

export const analyzeUrl = async (url) => {
  if (!API_KEY) {
    throw new ClaudeAPIError('API key not configured', 401);
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/messages`,
      {
        model: MODEL_NAME,
        max_tokens: MAX_TOKENS,
        messages: [
          {
            role: 'user',
            content: contentDiscoveryPrompt(url),
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
        },
      }
    );

    return parseClaudeResponse(response.data);
  } catch (error) {
    if (error.response) {
      throw new ClaudeAPIError(
        error.response.data.error?.message || 'API request failed',
        error.response.status,
        error.response.data
      );
    }
    throw new ClaudeAPIError('Network error', 0, error);
  }
};

const parseClaudeResponse = (data) => {
  const textContent = data.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');

  const cleanedText = textContent
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  return JSON.parse(cleanedText);
};
```

#### 3.2 Prompt Template
```javascript
// src/services/prompts/contentDiscovery.js
export const contentDiscoveryPrompt = (url) => `You are a MathWorks content discovery assistant. Analyze this documentation URL and help surface the most relevant content for someone viewing this page.

URL: ${url}

The most recent MATLAB release is R2025b. Based on this URL and what you know about MathWorks documentation structure, provide:

1. Context: What is this person likely working on? (1 sentence)

2. What's New in R2025b (2-4 items): Features from ONLY the R2025b release that are relevant to this user:
   - title: Feature name
   - description: Brief description (1 sentence)
   - category: Product area (like "Graphics", "Core MATLAB", etc.)
   - relevance: Score 60-95 (higher = more relevant)
   - url: Release notes URL

3. Top Picks from Earlier Releases (1-2 items): The most relevant features from R2024b or earlier that would genuinely help them:
   - type: "release" or "doc"
   - title: Clear, concise title
   - reason: Why this matters to them specifically (conversational tone)
   - url: A realistic MathWorks URL (use real release note or doc patterns)
   - release: Version like "R2024b" or "R2024a"

4. Other Relevant Updates (2-4 items): Related release notes from earlier releases:
   - title: Feature name
   - category: Product area (like "Graphics", "Core MATLAB", etc.)
   - release: Version (R2024b or earlier, NOT R2025b)
   - relevance: Score 60-85 (higher = more relevant)
   - url: Release notes URL

5. Related Content (0-3 items): Videos, blogs, or examples:
   - type: "video", "blog", or "example"
   - title: Content title
   - duration: (for videos, like "8:32")
   - author: (for blogs)
   - url: Content URL

Return ONLY valid JSON in this exact structure (no markdown, no preamble):
{
  "context": "string",
  "whatsNew": [{
    "title": "string",
    "description": "string",
    "category": "string",
    "relevance": number,
    "url": "string"
  }],
  "topPicks": [{
    "type": "release" or "doc",
    "title": "string",
    "reason": "string",
    "url": "string",
    "release": "string"
  }],
  "releaseNotes": [{
    "title": "string",
    "category": "string",
    "release": "string",
    "relevance": number,
    "url": "string"
  }],
  "relatedContent": [{
    "type": "string",
    "title": "string",
    "url": "string"
  }]
}

Be specific and realistic about MathWorks features. Use your knowledge of MATLAB/Simulink to make genuinely helpful recommendations.`;
```

### Phase 4: Create Custom Hooks

#### 4.1 Content Analysis Hook
```javascript
// src/hooks/useContentAnalysis.js
import { useState, useCallback } from 'react';
import { analyzeUrl, ClaudeAPIError } from '@services/api/claude';

export const useContentAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (url) => {
    if (!url.trim()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await analyzeUrl(url);
      setResults(data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message);

      // Fallback results
      setResults({
        context: 'Unable to analyze this URL',
        whatsNew: [],
        topPicks: [
          {
            type: 'doc',
            title: 'Analysis Error',
            reason: err.message || 'An error occurred. Please try again.',
            url: url,
            release: '',
          },
        ],
        releaseNotes: [],
        relatedContent: [],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    loading,
    results,
    error,
    analyze,
    reset,
  };
};
```

### Phase 5: Component Extraction

#### 5.1 Reusable UI Components

```javascript
// src/components/ui/Card.jsx
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { theme } from '@styles/theme';

export const Card = ({
  title,
  description,
  url,
  category,
  relevance,
  badge,
  variant = 'default'
}) => {
  const styles = getCardStyles(variant);

  return (
    <div
      style={styles.container}
      onClick={() => window.open(url, '_blank')}
      onMouseEnter={(e) => applyHoverStyles(e, variant)}
      onMouseLeave={(e) => removeHoverStyles(e, variant)}
    >
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        {badge && <span style={styles.badge}>{badge}</span>}
        <ExternalLink style={styles.icon} />
      </div>

      {description && <p style={styles.description}>{description}</p>}

      <div style={styles.footer}>
        {category && <span style={styles.category}>{category}</span>}
        {relevance && <RelevanceBar score={relevance} />}
      </div>
    </div>
  );
};
```

```javascript
// src/components/ui/RelevanceBar.jsx
import React from 'react';
import { theme } from '@styles/theme';

export const RelevanceBar = ({ score, showLabel = true }) => {
  const color = score > 80 ? theme.colors.primary : theme.colors.text.dimmed;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{
        width: showLabel ? '50px' : '60px',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${score}%`,
          height: '100%',
          background: color,
          transition: 'width 0.5s ease-out',
        }} />
      </div>
      {showLabel && (
        <span style={{
          color: theme.colors.text.dimmed,
          fontSize: '0.8rem',
          width: '30px',
          textAlign: 'right',
        }}>
          {score}%
        </span>
      )}
    </div>
  );
};
```

#### 5.2 Feature-Specific Components

```javascript
// src/components/input/UrlInput.jsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { theme } from '@styles/theme';

export const UrlInput = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');

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
    <div style={styles.container}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="https://mathworks.com/help/matlab/ref/plot.html"
        style={styles.input}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !url.trim()}
        style={getButtonStyles(loading, url)}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 spin" />
            Analyzing
          </>
        ) : (
          'Discover'
        )}
      </button>
    </div>
  );
};
```

```javascript
// src/components/results/WhatsNewSection.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Card } from '@components/ui/Card';

export const WhatsNewSection = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <Sparkles style={styles.icon} />
        <h2 style={styles.title}>What's New in R2025b</h2>
        <span style={styles.badge}>Latest</span>
      </div>

      <div style={styles.grid}>
        {items.map((item, idx) => (
          <Card
            key={idx}
            variant="whatsNew"
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
```

#### 5.3 Main App Component

```javascript
// src/App.jsx
import React from 'react';
import { Header } from '@components/layout/Header';
import { UrlInput } from '@components/input/UrlInput';
import { ResultsContainer } from '@components/results/ResultsContainer';
import { EmptyState } from '@components/layout/EmptyState';
import { useContentAnalysis } from '@hooks/useContentAnalysis';
import { theme } from '@styles/theme';
import '@styles/global.css';
import '@styles/animations.css';

const App = () => {
  const { loading, results, analyze } = useContentAnalysis();

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.background.gradient,
      fontFamily: theme.fontFamily,
      padding: theme.spacing.xl,
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Header />
        <UrlInput onSubmit={analyze} loading={loading} />

        {results ? (
          <ResultsContainer results={results} />
        ) : !loading && (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default App;
```

### Phase 6: Utilities & Helpers

```javascript
// src/utils/iconMapper.js
import { TrendingUp, BookOpen, Video, FileText, Sparkles } from 'lucide-react';

export const getTypeIcon = (type) => {
  const iconMap = {
    release: TrendingUp,
    doc: BookOpen,
    video: Video,
    blog: FileText,
    example: FileText,
  };

  return iconMap[type] || Sparkles;
};
```

```javascript
// src/utils/urlValidator.js
export const isValidMathWorksUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('mathworks.com');
  } catch {
    return false;
  }
};

export const normalizeMathWorksUrl = (url) => {
  if (!url.startsWith('http')) {
    return `https://${url}`;
  }
  return url;
};
```

## Migration Strategy

### Step-by-Step Implementation

1. **Week 1: Setup & Infrastructure**
   - Initialize Vite project
   - Set up ESLint, Prettier
   - Create directory structure
   - Configure environment variables
   - Set up Git workflow

2. **Week 2: Extract Styles & Theme**
   - Create theme.js
   - Extract CSS to separate files
   - Implement CSS modules or styled-components (optional)
   - Test theme consistency

3. **Week 3: Services & API Layer**
   - Extract Claude API logic
   - Create prompt templates
   - Add error handling
   - Write API tests

4. **Week 4: Custom Hooks**
   - Create useContentAnalysis hook
   - Add debounce hook for input
   - Test hook behavior

5. **Week 5: UI Components (Phase 1)**
   - Create base UI components (Card, Badge, etc.)
   - Extract Header and EmptyState
   - Test component rendering

6. **Week 6: UI Components (Phase 2)**
   - Create UrlInput component
   - Extract all result sections
   - Ensure all interactions work

7. **Week 7: Integration & Testing**
   - Integrate all components
   - End-to-end testing
   - Performance optimization
   - Bug fixes

8. **Week 8: Polish & Documentation**
   - Code review
   - Update documentation
   - Create deployment guide
   - Final QA

## Additional Improvements

### 1. TypeScript Migration (Optional)
- Add type safety
- Better IDE support
- Catch errors at compile time

### 2. State Management
- Consider Zustand or Context API for larger state
- Persist user preferences

### 3. Testing
```javascript
// Example test structure
// src/components/__tests__/UrlInput.test.jsx
import { render, fireEvent } from '@testing-library/react';
import { UrlInput } from '../input/UrlInput';

describe('UrlInput', () => {
  it('calls onSubmit when Enter is pressed', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <UrlInput onSubmit={onSubmit} loading={false} />
    );

    const input = getByPlaceholderText(/mathworks.com/);
    fireEvent.change(input, { target: { value: 'test.com' } });
    fireEvent.keyPress(input, { key: 'Enter' });

    expect(onSubmit).toHaveBeenCalledWith('test.com');
  });
});
```

### 4. Performance Optimizations
- Lazy load result sections
- Memoize expensive computations
- Virtualize long lists
- Add request caching

### 5. Security Enhancements
- Move API calls to backend proxy
- Add rate limiting
- Implement CORS properly
- Sanitize user inputs

### 6. Features to Add
- URL history (localStorage)
- Bookmark favorite results
- Share results via URL
- Export results as PDF/JSON
- Dark/light theme toggle
- Mobile-responsive design improvements

### 7. Backend Integration (Future)
```
mw-dashboard-backend/
├── server/
│   ├── routes/
│   │   └── analyze.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── rateLimit.js
│   ├── services/
│   │   └── claude.js
│   └── server.js
├── .env
└── package.json
```

## Success Metrics

- ✅ All functionality preserved
- ✅ Code split into <100 line files
- ✅ 80%+ code coverage with tests
- ✅ Build time <10 seconds
- ✅ Bundle size <500KB
- ✅ Lighthouse score >90
- ✅ No console errors
- ✅ Full ESLint compliance

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing functionality | High | Comprehensive testing, gradual migration |
| Increased complexity | Medium | Clear documentation, consistent patterns |
| Performance regression | Medium | Performance benchmarks, lazy loading |
| Developer onboarding | Low | Good documentation, clear structure |

## Conclusion

This refactoring will transform the single-file application into a modern, scalable, maintainable web application while preserving all existing functionality. The modular structure will make it easier to:

- Add new features
- Fix bugs
- Onboard new developers
- Test individual components
- Optimize performance
- Scale the application

The proposed architecture follows React best practices and industry standards, setting a solid foundation for future growth.
