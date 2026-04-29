
import {
  semanticSearch,
  getSearchSuggestions
} from '../services/recommendation/semanticSearch.js';

/**
 * GET /api/search?q=docker
 * Full search results — called when user presses Enter
 */
export const searchBlogs = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const results = await semanticSearch(q.trim(), 10);

    return res.status(200).json({
      success: true,
      query: q,
      count: results.length,
      results,
    });

  } catch (error) {
    console.error('Search error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Search failed',
    });
  }
};

/**
 * GET /api/search/suggestions?q=dock
 * Lightweight suggestions — called on every keystroke
 */
export const searchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(200).json({
        success: true,
        suggestions: [],
      });
    }

    const suggestions = await getSearchSuggestions(q.trim(), 5);

    return res.status(200).json({
      success: true,
      suggestions,
    });

  } catch (error) {
    console.error('Suggestions error:', error.message);
    return res.status(500).json({
      success: false,
      suggestions: [],
    });
  }
};