# MathWorks Content Discovery Assistant

A smart, AI-powered dashboard that analyzes MathWorks documentation URLs and surfaces the most relevant features, release notes, and resources tailored to your specific context.

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

- **React**: UI framework with hooks (useState)
- **Lucide React**: Icon library
- **Claude AI (Anthropic)**: Sonnet 4 model for intelligent content analysis
- **Inline Styles**: Component-scoped styling

## Current Architecture

The application currently exists as a single-file React component (`mw-dashboard.jsx`) containing:

- Component logic and state management
- Claude API integration
- Complete UI rendering with inline styles
- All styling (including custom fonts and animations)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Anthropic API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mw-dashboard

# Install dependencies (will need package.json - see Setup section)
npm install

# Set up environment variables
echo "VITE_ANTHROPIC_API_KEY=your-api-key-here" > .env.local

# Start development server
npm run dev
```

### Current Usage

The single JSX file can be integrated into a React application by:

1. Importing the component: `import ContentDiscoveryAssistant from './mw-dashboard.jsx'`
2. Rendering it in your app: `<ContentDiscoveryAssistant />`

## How It Works

1. **Input**: User enters a MathWorks documentation URL (e.g., `https://mathworks.com/help/matlab/ref/plot.html`)
2. **Analysis**: The Claude API analyzes the URL and generates contextual recommendations
3. **Parsing**: Response is parsed into structured data (context, features, release notes, content)
4. **Display**: Results are rendered in an organized, visually appealing layout with relevance scores

## API Integration

The application communicates directly with the Anthropic Claude API:

- **Model**: `claude-sonnet-4-20250514`
- **Max Tokens**: 4000
- **Endpoint**: `https://api.anthropic.com/v1/messages`

The prompt is carefully crafted to extract:
- User context (what they're working on)
- R2025b new features (2-4 items)
- Top picks from earlier releases (1-2 items)
- Related release notes (2-4 items)
- Additional content (videos, blogs, examples)

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

## Future Enhancements

See the refactoring proposal below for planned improvements to architecture, scalability, and maintainability.

## License

[Add license information]

## Contributing

[Add contribution guidelines]

## Support

For issues or questions, please [add support contact information].
