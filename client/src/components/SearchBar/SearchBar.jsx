// src/components/SearchBar/SearchBar.jsx

import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { fetchSuggestions, fetchSearchResults } from '../../services/searchService';
import './SearchBar.css';

/**
 * SearchBar component
 * 
 * Props:
 * onResults — called with full results array when user presses Enter
 *             parent component uses this to display results
 */
export default function SearchBar({ onResults }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchRef = useRef(null);           // to detect outside clicks
  const debouncedQuery = useDebounce(query, 300);  // wait 300ms after typing stops

  // fetch suggestions whenever debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const loadSuggestions = async () => {
      const results = await fetchSuggestions(debouncedQuery);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
    };

    loadSuggestions();
  }, [debouncedQuery]);

  // close dropdown when user clicks outside search bar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // user presses Enter — fetch full results
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      setShowDropdown(false);
      setIsLoading(true);
      const results = await fetchSearchResults(query);
      setIsLoading(false);
      onResults(results, query);   // send results to parent
    }

    // close dropdown on Escape
    if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  // user clicks a suggestion — treat it as a full search
  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion.title);
    setShowDropdown(false);
    setIsLoading(true);
    const results = await fetchSearchResults(suggestion.title);
    setIsLoading(false);
    onResults(results, suggestion.title);
  };

  return (
    <div className="search-wrapper" ref={searchRef}>
      <div className="search-input-row">
        <input
          type="text"
          className="search-input"
          placeholder="Search blogs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        />
        {isLoading && <span className="search-spinner" />}
      </div>

      {/* Suggestions dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span className="suggestion-title">{suggestion.title}</span>
              {suggestion.category && (
                <span className="suggestion-category">{suggestion.category}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}