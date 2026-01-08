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

      // Fallback results for error state
      setResults({
        context: 'Unable to analyze this URL',
        whatsNew: [],
        topPicks: [
          {
            type: 'doc',
            title: 'Analysis Error',
            reason: err.message || 'There was an error analyzing this URL. Please try again or check that it\'s a valid MathWorks documentation URL.',
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
