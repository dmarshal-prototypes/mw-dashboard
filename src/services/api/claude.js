import { contentDiscoveryPrompt } from '../prompts/contentDiscovery';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.anthropic.com/v1';
const MODEL_NAME = import.meta.env.VITE_MODEL_NAME || 'claude-sonnet-4-20250514';
const MAX_TOKENS = parseInt(import.meta.env.VITE_MAX_TOKENS || '4000');

export class ClaudeAPIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ClaudeAPIError';
    this.status = status;
    this.data = data;
  }
}

export const analyzeUrl = async (url) => {
  console.log('analyzeUrl called with:', url);
  console.log('Using MOCK data for proof of concept - API integration disabled');

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock data instead of making API calls
  return getMockResults(url);
};

// Mock data generator for proof of concept
const getMockResults = (url) => {
  return {
    context: "You're likely working on data visualization and plotting in MATLAB",
    whatsNew: [
      {
        title: "Enhanced Plot Customization",
        description: "New styling options for 2D and 3D plots with improved color gradients and line styles",
        category: "Graphics",
        relevance: 92,
        url: "https://www.mathworks.com/help/matlab/release-notes.html"
      },
      {
        title: "Improved Export Quality",
        description: "Higher resolution exports with better handling of transparency and vector graphics",
        category: "Graphics",
        relevance: 85,
        url: "https://www.mathworks.com/help/matlab/release-notes.html"
      },
      {
        title: "Interactive Plot Editor",
        description: "New GUI tools for real-time plot adjustments and property editing",
        category: "Development Environment",
        relevance: 78,
        url: "https://www.mathworks.com/help/matlab/release-notes.html"
      }
    ],
    topPicks: [
      {
        type: "release",
        title: "Tiledlayout Enhancements",
        reason: "The tiledlayout function got major improvements in R2024b that make creating complex figure layouts much easier - perfect for multi-panel visualizations",
        url: "https://www.mathworks.com/help/matlab/ref/tiledlayout.html",
        release: "R2024b"
      },
      {
        type: "doc",
        title: "Best Practices for Publication-Quality Figures",
        reason: "Comprehensive guide on creating figures that meet journal requirements, with examples of common plot types",
        url: "https://www.mathworks.com/help/matlab/creating_plots/",
        release: "R2024a"
      }
    ],
    releaseNotes: [
      {
        title: "Live Editor Output Formatting",
        category: "Development Environment",
        release: "R2024b",
        relevance: 75,
        url: "https://www.mathworks.com/help/matlab/release-notes.html"
      },
      {
        title: "Performance Improvements for Large Datasets",
        category: "Core MATLAB",
        release: "R2024a",
        relevance: 82,
        url: "https://www.mathworks.com/help/matlab/release-notes.html"
      },
      {
        title: "New Colormap Options",
        category: "Graphics",
        release: "R2023b",
        relevance: 71,
        url: "https://www.mathworks.com/help/matlab/release-notes.html"
      }
    ],
    relatedContent: [
      {
        type: "video",
        title: "Advanced Plotting Techniques in MATLAB",
        duration: "12:45",
        url: "https://www.mathworks.com/videos/"
      },
      {
        type: "example",
        title: "Creating Professional Visualizations",
        url: "https://www.mathworks.com/help/matlab/examples.html"
      },
      {
        type: "blog",
        title: "What's New in MATLAB Graphics",
        author: "Loren Shure",
        url: "https://blogs.mathworks.com/"
      }
    ]
  };
};
