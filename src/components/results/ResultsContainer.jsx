import React from 'react';
import { ContextBanner } from './ContextBanner';
import { WhatsNewSection } from './WhatsNewSection';
import { TopPicksSection } from './TopPicksSection';
import { ReleaseNotesSection } from './ReleaseNotesSection';
import { RelatedContentSection } from './RelatedContentSection';

export const ResultsContainer = ({ results }) => {
  if (!results) return null;

  return (
    <div className="fade-in">
      <ContextBanner context={results.context} />
      <WhatsNewSection items={results.whatsNew} />
      <TopPicksSection items={results.topPicks} />
      <ReleaseNotesSection items={results.releaseNotes} />
      <RelatedContentSection items={results.relatedContent} />
    </div>
  );
};
