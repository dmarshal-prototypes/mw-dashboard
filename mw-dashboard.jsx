import React, { useState } from 'react';
import { Sparkles, TrendingUp, BookOpen, Video, FileText, ExternalLink, Loader2 } from 'lucide-react';

const ContentDiscoveryAssistant = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Real Claude API integration
  const analyzeUrl = async (inputUrl) => {
    console.log('analyzeUrl called with:', inputUrl);
    setLoading(true);
    
    try {
      console.log('Making API request...');
      // First, fetch the content from the URL
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              role: "user",
              content: `You are a MathWorks content discovery assistant. Analyze this documentation URL and help surface the most relevant content for someone viewing this page.

URL: ${inputUrl}

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

Be specific and realistic about MathWorks features. Use your knowledge of MATLAB/Simulink to make genuinely helpful recommendations.`
            }
          ]
        })
      });

      const data = await response.json();
      console.log('API response received:', data);
      
      // Extract the text content from Claude's response
      const textContent = data.content
        .filter(block => block.type === "text")
        .map(block => block.text)
        .join("");
      
      console.log('Extracted text:', textContent);
      
      // Parse the JSON response
      const cleanedText = textContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      console.log('Cleaned text:', cleanedText);
      
      const parsedResults = JSON.parse(cleanedText);
      console.log('Parsed results:', parsedResults);
      
      setResults(parsedResults);
    } catch (error) {
      console.error("Error analyzing URL:", error);
      console.error("Error details:", error.message, error.stack);
      // Fallback to a simple message
      setResults({
        context: "Unable to analyze this URL",
        whatsNew: [],
        topPicks: [{
          type: "doc",
          title: "Analysis Error",
          reason: "There was an error analyzing this URL. Please try again or check that it's a valid MathWorks documentation URL.",
          url: inputUrl,
          release: ""
        }],
        releaseNotes: [],
        relatedContent: []
      });
    }
    
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with URL:', url);
    if (url.trim()) {
      console.log('Starting analysis...');
      analyzeUrl(url);
    } else {
      console.log('URL is empty, not analyzing');
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'release': return <TrendingUp className="w-4 h-4" />;
      case 'doc': return <BookOpen className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'example': return <FileText className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a1628 0%, #1a2942 100%)',
      fontFamily: '"Instrument Sans", -apple-system, sans-serif',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <Sparkles style={{ color: '#3da7ff', width: '32px', height: '32px' }} />
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #ffffff 0%, #a0c4ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Content Discovery Assistant
          </h1>
        </div>
        
        <p style={{
          color: '#8ba3c7',
          fontSize: '0.95rem',
          marginBottom: '2rem',
          lineHeight: '1.5'
        }}>
          Finding the needle in the haystack. Paste any MathWorks documentation URL and discover the 1-2 release notes, features, or resources that actually matter to your work.
        </p>

        {/* Input Form */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            maxWidth: '800px'
          }}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && url.trim() && !loading) {
                  analyzeUrl(url);
                }
              }}
              placeholder="https://mathworks.com/help/matlab/ref/plot.html"
              style={{
                flex: 1,
                padding: '0.875rem 1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = '#3da7ff';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            <button
              onClick={() => {
                if (url.trim() && !loading) {
                  analyzeUrl(url);
                }
              }}
              disabled={loading || !url.trim()}
              style={{
                padding: '0.875rem 1.75rem',
                background: loading ? '#2a4a6a' : 'linear-gradient(135deg, #3da7ff 0%, #1e7ed9 100%)',
                border: 'none',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
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
                  <Loader2 className="w-4 h-4 animate-spin" style={{
                    animation: 'spin 1s linear infinite',
                  }} />
                  Analyzing
                </>
              ) : (
                'Discover'
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {/* Context Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(61, 167, 255, 0.1) 0%, rgba(30, 126, 217, 0.1) 100%)',
              border: '1px solid rgba(61, 167, 255, 0.2)',
              borderRadius: '12px',
              padding: '1rem 1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Sparkles style={{ color: '#3da7ff', width: '20px', height: '20px', flexShrink: 0 }} />
              <span style={{ color: '#e0e8f3', fontSize: '0.95rem' }}>
                Context: <strong style={{ color: '#ffffff' }}>{results.context}</strong>
              </span>
            </div>

            {/* What's New in R2025b */}
            {results.whatsNew && results.whatsNew.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <Sparkles style={{ color: '#3da7ff', width: '22px', height: '22px' }} />
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    margin: 0
                  }}>
                    What's New in R2025b
                  </h2>
                  <span style={{
                    background: 'linear-gradient(135deg, #3da7ff 0%, #1e7ed9 100%)',
                    color: '#ffffff',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Latest
                  </span>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '1rem'
                }}>
                  {results.whatsNew.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'linear-gradient(135deg, rgba(61, 167, 255, 0.1) 0%, rgba(30, 126, 217, 0.06) 100%)',
                        border: '1px solid rgba(61, 167, 255, 0.25)',
                        borderRadius: '10px',
                        padding: '1.25rem',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#3da7ff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(61, 167, 255, 0.15) 0%, rgba(30, 126, 217, 0.1) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(61, 167, 255, 0.25)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(61, 167, 255, 0.1) 0%, rgba(30, 126, 217, 0.06) 100%)';
                      }}
                      onClick={() => window.open(item.url, '_blank')}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.625rem'
                      }}>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#ffffff',
                          margin: 0,
                          lineHeight: '1.4',
                          flex: 1
                        }}>
                          {item.title}
                        </h3>
                        <ExternalLink style={{ 
                          color: '#3da7ff', 
                          width: '16px', 
                          height: '16px',
                          marginLeft: '0.5rem',
                          flexShrink: 0
                        }} />
                      </div>
                      
                      <p style={{
                        color: '#b8cde5',
                        fontSize: '0.9rem',
                        margin: '0 0 0.75rem 0',
                        lineHeight: '1.5'
                      }}>
                        {item.description}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          color: '#7a92b0',
                          fontSize: '0.85rem'
                        }}>
                          {item.category}
                        </span>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <div style={{
                            width: '50px',
                            height: '3px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${item.relevance}%`,
                              height: '100%',
                              background: item.relevance > 80 ? '#3da7ff' : '#5a7a9a',
                              transition: 'width 0.5s ease-out'
                            }} />
                          </div>
                          <span style={{
                            color: '#7a92b0',
                            fontSize: '0.8rem',
                            width: '30px',
                            textAlign: 'right'
                          }}>
                            {item.relevance}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Picks - The Hero Section */}
            {results.topPicks.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <TrendingUp style={{ color: '#3da7ff', width: '22px', height: '22px' }} />
                  Still Worth Your Attention
                </h2>
                
                {results.topPicks.map((pick, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'linear-gradient(135deg, rgba(61, 167, 255, 0.12) 0%, rgba(30, 126, 217, 0.08) 100%)',
                      border: '1px solid rgba(61, 167, 255, 0.25)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      marginBottom: '1rem',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3da7ff';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(61, 167, 255, 0.25)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    onClick={() => window.open(pick.url, '_blank')}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem'
                    }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#ffffff',
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {pick.title}
                      </h3>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginLeft: '1rem',
                        flexShrink: 0
                      }}>
                        {pick.release && (
                          <span style={{
                            background: 'rgba(61, 167, 255, 0.2)',
                            color: '#3da7ff',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}>
                            {pick.release}
                          </span>
                        )}
                        <ExternalLink style={{ color: '#3da7ff', width: '16px', height: '16px' }} />
                      </div>
                    </div>
                    
                    <p style={{
                      color: '#b8cde5',
                      fontSize: '0.95rem',
                      margin: 0,
                      lineHeight: '1.6',
                      fontStyle: 'italic'
                    }}>
                      {pick.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Release Notes - Condensed, Ranked */}
            {results.releaseNotes.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  Other Relevant Updates
                </h2>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  overflow: 'hidden'
                }}>
                  {results.releaseNotes.map((note, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1rem 1.25rem',
                        borderBottom: idx < results.releaseNotes.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                      onClick={() => window.open(note.url, '_blank')}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '0.95rem',
                          color: '#ffffff',
                          marginBottom: '0.25rem'
                        }}>
                          {note.title}
                        </div>
                        <div style={{
                          fontSize: '0.85rem',
                          color: '#7a92b0'
                        }}>
                          {note.category} · {note.release}
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{
                          width: '60px',
                          height: '4px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${note.relevance}%`,
                            height: '100%',
                            background: note.relevance > 70 ? '#3da7ff' : '#5a7a9a',
                            transition: 'width 0.5s ease-out'
                          }} />
                        </div>
                        <span style={{
                          color: '#7a92b0',
                          fontSize: '0.85rem',
                          width: '35px',
                          textAlign: 'right'
                        }}>
                          {note.relevance}%
                        </span>
                        <ExternalLink style={{ color: '#5a7a9a', width: '14px', height: '14px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Content */}
            {results.relatedContent.length > 0 && (
              <div>
                <h2 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '1rem'
                }}>
                  You Might Also Like
                </h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1rem'
                }}>
                  {results.relatedContent.map((content, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '10px',
                        padding: '1rem',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onClick={() => window.open(content.url, '_blank')}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {getTypeIcon(content.type)}
                        <span style={{
                          color: '#3da7ff',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          fontWeight: '500'
                        }}>
                          {content.type}
                        </span>
                      </div>
                      
                      <div style={{
                        color: '#ffffff',
                        fontSize: '0.95rem',
                        marginBottom: '0.5rem'
                      }}>
                        {content.title}
                      </div>
                      
                      {content.duration && (
                        <div style={{ color: '#7a92b0', fontSize: '0.85rem' }}>
                          {content.duration}
                        </div>
                      )}
                      
                      {content.author && (
                        <div style={{ color: '#7a92b0', fontSize: '0.85rem' }}>
                          by {content.author}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#5a7a9a'
          }}>
            <Sparkles style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 1rem',
              opacity: 0.3
            }} />
            <p style={{ fontSize: '1.05rem', margin: 0 }}>
              Enter a MathWorks documentation URL to get started
            </p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');
        
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
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ContentDiscoveryAssistant;