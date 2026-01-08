import React from 'react';
import { Header } from '@components/layout/Header';
import { EmptyState } from '@components/layout/EmptyState';
import { UrlInput } from '@components/input/UrlInput';
import { ResultsContainer } from '@components/results/ResultsContainer';
import { useContentAnalysis } from '@hooks/useContentAnalysis';
import { theme } from '@styles/theme';
import '@styles/global.css';
import '@styles/animations.css';

const App = () => {
  const { loading, results, analyze } = useContentAnalysis();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.colors.background.gradient,
        fontFamily: theme.fontFamily,
        padding: theme.spacing.xl,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Header />
        <UrlInput onSubmit={analyze} loading={loading} />

        {results ? (
          <ResultsContainer results={results} />
        ) : !loading ? (
          <EmptyState />
        ) : null}
      </div>
    </div>
  );
};

export default App;
