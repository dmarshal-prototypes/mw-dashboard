# MathWorks Content Discovery Assistant

A smart dashboard that demonstrates how AI could analyze MathWorks documentation URLs and surface relevant features, release notes, and resources.

**⚠️ Proof of Concept:** This application currently uses mock data to demonstrate the UI and functionality. API integration is disabled.

## Overview

The Content Discovery Assistant helps MATLAB and Simulink users cut through the noise of extensive documentation and release notes. Simply paste any MathWorks documentation URL, and the assistant will:

- **Understand your context**: Analyzes what you're likely working on based on the URL
- **Highlight what's new**: Shows relevant features from the latest MATLAB release (R2025b)
- **Surface hidden gems**: Identifies valuable features from earlier releases you might have missed
- **Recommend related content**: Suggests videos, blogs, and examples that align with your work

## Features

- 🎯 **Context-Aware Analysis**: Intelligently understands what you're working on from your documentation URL
- ✨ **Latest Release Highlights**: Automatically surfaces R2025b features relevant to your needs
- 📚 **Historical Feature Discovery**: Finds valuable capabilities from earlier releases
- 🎨 **Beautiful UI**: Modern, gradient-based dark theme with smooth interactions
- 🔗 **Direct Links**: One-click access to all recommended resources
- 📊 **Relevance Scoring**: Visual indicators show how relevant each recommendation is

## Technology Stack

- **React 18**: Modern UI framework with hooks
- **Vite**: Fast build tool and dev server
- **Lucide React**: Icon library
- **Claude AI (Anthropic)**: Sonnet 4 model for intelligent content analysis
- **Theme System**: Centralized design tokens

## Architecture

The application has been refactored into a modern, scalable multi-file structure:

- **29+ files** organized into logical modules
- **Separation of concerns**: UI, logic, API, and styles are isolated
- **Reusable components**: Badge, LoadingSpinner, RelevanceBar, and more
- **Custom hooks**: `useContentAnalysis` for state management
- **Theme system**: Centralized design tokens for consistent styling
- **Path aliases**: Clean imports with `@components`, `@services`, etc.

See `REFACTORING_PROPOSAL.md` for detailed architecture documentation.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mw-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will start on `http://localhost:3000` and will display mock data to demonstrate functionality.

**Note:** No API key is required for this proof of concept. The app uses sample data to show how the interface would work.

## How It Works

1. **Input**: User enters a MathWorks documentation URL (e.g., `https://mathworks.com/help/matlab/ref/plot.html`)
2. **Analysis**: The Claude API analyzes the URL and generates contextual recommendations
3. **Parsing**: Response is parsed into structured data (context, features, release notes, content)
4. **Display**: Results are rendered in an organized, visually appealing layout with relevance scores

## Data Structure

**Current Implementation:** The application uses mock data to demonstrate the interface without requiring API access.

**Proposed API Integration:** In a production version, this would communicate with the Anthropic Claude API to:
- Analyze the documentation URL
- Extract user context (what they're working on)
- Identify R2025b new features (2-4 items)
- Recommend top picks from earlier releases (1-2 items)
- Surface related release notes (2-4 items)
- Suggest additional content (videos, blogs, examples)

## Response Structure

```json
{
  "context": "Brief description of what the user is likely working on",
  "whatsNew": [
    {
      "title": "Feature name",
      "description": "Brief description",
      "category": "Product area",
      "relevance": 85,
      "url": "Release notes URL"
    }
  ],
  "topPicks": [
    {
      "type": "release|doc",
      "title": "Feature or doc title",
      "reason": "Why this matters to the user",
      "url": "Resource URL",
      "release": "R2024b"
    }
  ],
  "releaseNotes": [...],
  "relatedContent": [...]
}
```

## Deployment

### GitHub Pages

This app can be easily deployed to GitHub Pages:

**Via GitHub Web Interface (Recommended):**
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: Select the branch with your code (e.g., `main`)
4. Folder: `/ (root)`
5. Save

GitHub Pages will automatically build and deploy your app.

**Manual Deployment:**
```bash
npm run build  # Build the app
npm run deploy # Deploy to gh-pages branch
```

**Live URL:** `https://dmarshal-prototypes.github.io/mw-dashboard/`

**Note:** Since this is a proof of concept using mock data, no API keys or secrets are required for deployment.

## Project Structure

```
mw-dashboard/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── input/      # UrlInput component
│   │   ├── layout/     # Header, EmptyState
│   │   ├── results/    # Result display components
│   │   └── ui/         # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API and business logic
│   ├── styles/         # Theme and global styles
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .github/workflows/  # GitHub Actions
├── package.json        # Dependencies
├── vite.config.js      # Build configuration
└── *.md               # Documentation
```

## Documentation

- `README.md` - This file, project overview
- `QUICK_START.md` - Setup and development guide
- `DEPLOYMENT.md` - GitHub Pages deployment guide
- `REFACTORING_PROPOSAL.md` - Detailed architecture documentation

## Future Enhancements

- Add backend proxy for secure API key management
- Implement user authentication
- Add tests (Jest + React Testing Library)
- Convert to TypeScript
- Add URL history with localStorage
- Export results feature
- Mobile responsiveness improvements

## License

[Add license information]

## Contributing

[Add contribution guidelines]

## Support

For issues or questions, please [add support contact information].
