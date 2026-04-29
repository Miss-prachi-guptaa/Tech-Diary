// src/services/searchService.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Get live suggestions while user is typing
 * Called with debounced query — not every keystroke
 */
export async function fetchSuggestions(query) {
  if (!query || query.trim().length < 2) return [];

  const response = await fetch(
    `${BASE_URL}/search/suggestions?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.suggestions || [];
}

/**
 * Get full search results when user presses Enter
 */
export async function fetchSearchResults(query) {
  if (!query || query.trim().length === 0) return [];

  const response = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results || [];
}

/**
 * Get recommendations for a specific blog
 * Called when user opens a blog page
 */
export async function fetchRecommendations(blogId) {
  const response = await fetch(
    `${BASE_URL}/api/recommendations/${blogId}`
  );
  const data = await response.json();
  return data.recommendations || [];
}