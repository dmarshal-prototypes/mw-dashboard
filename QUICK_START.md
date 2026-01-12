# Quick Start Guide

**⚠️ Proof of Concept:** This application uses mock data to demonstrate functionality. No API key is required.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React 18.3.1
- React DOM 18.3.1
- Lucide React (icons)
- Vite (build tool)
- ESLint & Prettier (code quality)

### 2. Run the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` and automatically open in your browser.

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

This builds and deploys your app to the `gh-pages` branch.

## Project Structure

```
mw-dashboard/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── components/
│   │   ├── input/
│   │   │   └── UrlInput.jsx    # URL input field and submit button
│   │   ├── layout/
│   │   │   ├── Header.jsx      # App header with title
│   │   │   └── EmptyState.jsx  # Empty state when no results
│   │   ├── results/
│   │   │   ├── ContextBanner.jsx         # Context banner
│   │   │   ├── WhatsNewSection.jsx       # R2025b features
│   │   │   ├── TopPicksSection.jsx       # Top picks from earlier releases
│   │   │   ├── ReleaseNotesSection.jsx   # Other relevant updates
│   │   │   ├── RelatedContentSection.jsx # Videos, blogs, examples
│   │   │   └── ResultsContainer.jsx      # Results orchestrator
│   │   └── ui/
│   │       ├── Badge.jsx           # Reusable badge component
│   │       ├── LoadingSpinner.jsx  # Loading spinner
│   │       └── RelevanceBar.jsx    # Relevance score bar
│   ├── hooks/
│   │   └── useContentAnalysis.js   # Custom hook for API calls
│   ├── services/
│   │   ├── api/
│   │   │   └── claude.js           # Claude API integration
│   │   └── prompts/
│   │       └── contentDiscovery.js # Prompt template
│   ├── styles/
│   │   ├── theme.js          # Design tokens (colors, spacing, etc.)
│   │   ├── global.css        # Global styles
│   │   └── animations.css    # CSS animations
│   ├── utils/
│   │   └── iconMapper.js     # Icon mapping utility
│   ├── App.jsx               # Main app component
│   └── main.jsx              # React entry point
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── package.json              # Project dependencies and scripts
├── vite.config.js            # Vite configuration with path aliases
├── README.md                 # Project documentation
└── REFACTORING_PROPOSAL.md   # Detailed refactoring plan

```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier

## Path Aliases

The project uses path aliases for cleaner imports:

```javascript
import { Header } from '@components/layout/Header';
import { theme } from '@styles/theme';
import { analyzeUrl } from '@services/api/claude';
import { useContentAnalysis } from '@hooks/useContentAnalysis';
import { getTypeIcon } from '@utils/iconMapper';
```

## Key Features

### 1. Theme System
All design tokens are centralized in `src/styles/theme.js`:
- Colors (primary, background, text, borders)
- Spacing (xs, sm, md, lg, xl, etc.)
- Typography (font sizes, weights, family)
- Border radius

### 2. Component Architecture
- **Presentational Components**: UI components in `components/ui/`
- **Layout Components**: Page structure in `components/layout/`
- **Feature Components**: Business logic in `components/results/` and `components/input/`

### 3. API Layer
- Centralized API calls in `src/services/api/claude.js`
- Custom error handling with `ClaudeAPIError`
- Environment-based configuration

### 4. Custom Hooks
- `useContentAnalysis`: Manages API calls, loading states, and results

## Development Tips

### Hot Reload
Vite provides instant hot module replacement (HMR). Changes to components will reflect immediately without losing state.

### Debugging
All API calls include console logging. Open browser DevTools to see:
- API requests and responses
- Parsed JSON data
- Error details

### Adding New Components
1. Create component in appropriate directory
2. Export it from the file
3. Import using path alias
4. Use theme tokens for styling

Example:
```javascript
import React from 'react';
import { theme } from '@styles/theme';

export const MyComponent = () => {
  return (
    <div style={{
      padding: theme.spacing.md,
      background: theme.colors.background.card,
      borderRadius: theme.borderRadius.lg,
    }}>
      Content here
    </div>
  );
};
```

## Troubleshooting

### Module not found errors
- Check that path aliases are correct
- Ensure files are in the right directories
- Restart dev server if structure changed

### Styling issues
- Verify you're importing theme tokens from `@styles/theme`
- Check that global.css and animations.css are imported in App.jsx
- Clear browser cache if styles aren't updating

## Next Steps

1. **Add Backend Proxy**: Move API calls to a backend server for better security
2. **Add Tests**: Implement Jest and React Testing Library
3. **TypeScript**: Convert to TypeScript for type safety
4. **State Management**: Add Context API or Zustand if needed
5. **Error Boundaries**: Add React error boundaries for graceful error handling
6. **Analytics**: Track user interactions and API usage

## Performance Considerations

The refactored app is optimized for:
- Fast initial load with Vite
- Code splitting (can be enhanced with lazy loading)
- Minimal re-renders (React.memo can be added where needed)
- Efficient animations with CSS

## Support

For issues or questions, refer to:
- `README.md` - Full project documentation
- `REFACTORING_PROPOSAL.md` - Detailed architecture and design decisions
