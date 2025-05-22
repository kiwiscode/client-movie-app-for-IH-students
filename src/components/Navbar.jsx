import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SEARCH_API_URL } from "../constants/env";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const { data, error, loading } = useFetch(SEARCH_API_URL(searchTerm));

  useEffect(() => {
    onSearch(searchTerm, data, error, loading);
  }, [searchTerm, data, error, loading, onSearch]);

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
            }}
            className="text-xl font-bold text-gray-800 cursor-pointer"
          >
            🎬 Movie App
          </div>

          {/* Menu - Desktop */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-blue-600 focus:outline-none cursor-pointer"
            >
              Search
            </button>
            <a href="#" className="hover:text-blue-600">
              Favorites
            </a>
            <a href="#" className="hover:text-blue-600">
              Profile
            </a>
          </div>

          {/* Hamburger Menu Button - Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none cursor-pointer"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Input - Desktop & Mobile */}
        <div
          className={`transition-all duration-300 overflow-hidden px-[2px] ${
            searchOpen ? "max-h-20 opacity-100 py-2" : "max-h-0 opacity-0"
          }`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search movies..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white/30 backdrop-blur-md">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="block text-left w-full text-gray-700 hover:text-blue-600 cursor-pointer"
          >
            Search
          </button>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Favorites
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Profile
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
