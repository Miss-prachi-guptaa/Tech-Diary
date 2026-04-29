import { useState, useEffect, useRef } from 'react';
import { FaGlobeAsia, FaSearch, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDebounce } from '../../hooks/useDebounce';
import { fetchSuggestions } from '../../services/searchService';

export const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // search state
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // fetch suggestions when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    const load = async () => {
      const results = await fetchSuggestions(debouncedQuery);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
    };
    load();
  }, [debouncedQuery]);

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Enter key → navigate to home with query param
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      setShowDropdown(false);
      navigate(`/?q=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === 'Escape') setShowDropdown(false);
  };

  // click suggestion → navigate with that title as query
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    setShowDropdown(false);
    navigate(`/?q=${encodeURIComponent(suggestion.title)}`);
  };

  const handleLogout = async () => {
    try {
      await postLogout();
    } catch (err) {
      console.error("Logout failed");
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  return (
    <header className="h-16 w-full bg-iron_grey-300 border-b border-iron_grey-400
    flex items-center justify-between px-4 sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="md:hidden text-dust_grey-700" onClick={onMenuClick}>
          <HiMenu size={24} />
        </button>
        <div className="flex items-center gap-2 font-bold text-powder_petal-900">
          <FaGlobeAsia className="text-xl text-cherry_blossom" />
          <span className="hidden sm:block">Blogify</span>
        </div>
      </div>

      {/* Search */}
      <div ref={searchRef} className="relative w-36 sm:w-64 md:w-1/3">
        <div className="flex items-center bg-iron_grey-200 border border-iron_grey-400
        rounded-lg px-3 py-2">
          <FaSearch className="text-dust_grey-700 mr-2 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder="Search blogs..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Suggestions dropdown */}
        {showDropdown && (
          <ul className="absolute top-full mt-1 left-0 right-0 bg-iron_grey-300
          border border-iron_grey-400 rounded-lg shadow-lg z-50 overflow-hidden">
            {suggestions.map((s) => (
              <li
                key={s._id}
                onClick={() => handleSuggestionClick(s)}
                className="flex items-center justify-between px-4 py-2
                cursor-pointer hover:bg-iron_grey-200 transition"
              >
                <span className="text-sm text-powder_petal-900 truncate">
                  {s.title}
                </span>
                {s.category && (
                  <span className="text-xs text-dust_grey-700 ml-2 shrink-0
                  bg-iron_grey-400 px-2 py-0.5 rounded-full">
                    {s.category}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        {!isLoggedIn ? (
          <NavLink
            to="/login"
            className="hidden sm:block bg-cherry_blossom text-iron_grey-100
            px-4 py-2 rounded-lg text-sm"
          >
            Login
          </NavLink>
        ) : (
          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        )}
        <NavLink
          to="/profile"
          className="flex items-center gap-2 cursor-pointer
          text-dust_grey-700 hover:text-powder_petal-900 transition"
        >
          <FaUserCircle size={28} />
          <span className="hidden md:block text-sm">Prachi</span>
        </NavLink>
      </div>

    </header>
  );
};