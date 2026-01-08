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

  if (!API_KEY) {
    throw new ClaudeAPIError('API key not configured. Please set VITE_ANTHROPIC_API_KEY in your .env file.', 401);
  }

  try {
    console.log('Making API request...');

    const response = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        max_tokens: MAX_TOKENS,
        messages: [
          {
            role: 'user',
            content: contentDiscoveryPrompt(url),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new ClaudeAPIError(
        errorData.error?.message || 'API request failed',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    console.log('API response received:', data);

    return parseClaudeResponse(data);
  } catch (error) {
    console.error('Error analyzing URL:', error);

    if (error instanceof ClaudeAPIError) {
      throw error;
    }

    throw new ClaudeAPIError('Network error or unexpected error occurred', 0, error);
  }
};

const parseClaudeResponse = (data) => {
  // Extract the text content from Claude's response
  const textContent = data.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');

  console.log('Extracted text:', textContent);

  // Clean up any markdown code blocks
  const cleanedText = textContent
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  console.log('Cleaned text:', cleanedText);

  // Parse the JSON response
  try {
    const parsedResults = JSON.parse(cleanedText);
    console.log('Parsed results:', parsedResults);
    return parsedResults;
  } catch (parseError) {
    console.error('Failed to parse JSON:', parseError);
    throw new ClaudeAPIError('Failed to parse API response', 500, parseError);
  }
};
