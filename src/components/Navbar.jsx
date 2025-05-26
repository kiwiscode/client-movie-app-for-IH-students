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

  const { data, error, loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData({
      url: SEARCH_API_URL(searchTerm),
    });
  }, [searchTerm]);

  useEffect(() => {
    onSearch(searchTerm, data, error, loading);
  }, [searchTerm, data, error, loading, onSearch]);

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/30 shadow-md">
      <div className="max-w-9xl mx-auto px-4 sm:px-6">
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

          {/* IronHack Logo */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g id="Atom / Icon / Logo / Ironhack / M (32px)">
                <g id="icon/Ironhack">
                  <path
                    id="BG"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.9508 31.3747C15.123 31.4716 15.2772 31.5178 15.4218 31.5539C15.6219 31.604 15.8025 31.6229 15.9754 31.6234C16.3476 31.6245 16.6949 31.5502 17.2051 31.2589L29.46 24.6104C30.3785 24.086 30.779 23.5377 30.779 22.4889V8.96266C30.779 7.91392 30.1353 7.44508 29.2118 6.92071L16.8983 0.249533C16.7854 0.186034 16.6964 0.137155 16.6045 0.104543C16.3994 0.0317434 16.2305 0.00390625 16.0167 0.00390625C15.7069 0.00390625 15.4006 0.00553089 14.845 0.322735L2.82195 6.77421C1.90342 7.29858 1 7.91392 1 8.96266L1.02469 22.5477C1.02469 23.5964 1.79243 24.278 2.71589 24.8024L14.9508 31.3747Z"
                    fill="#32C3FF"
                  ></path>
                  <path
                    id="HACK"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.838 19.4558C16.838 21.2041 17.2243 21.9636 18.7981 21.9636C19.1987 21.9636 19.5564 21.9206 19.8712 21.8633L19.8283 21.5337C19.5564 21.5767 19.2846 21.6053 19.0127 21.6053C17.4675 21.6053 17.2672 20.9031 17.2672 19.4558C17.2672 18.0084 17.4389 17.3062 19.0127 17.3062C19.2846 17.3062 19.5707 17.3492 19.8283 17.3778L19.8712 17.0339C19.5707 16.9766 19.1987 16.9336 18.7981 16.9336C17.2243 16.9479 16.838 17.7074 16.838 19.4558ZM14.0336 17.2345L12.2452 21.9206H12.6744L13.2181 20.4589H15.4358L15.9795 21.9206H16.423L14.6489 17.2345C14.5773 17.0482 14.4772 16.9479 14.3341 16.9479C14.2053 16.9479 14.1195 17.0339 14.0336 17.2345ZM14.3341 17.5068L15.307 20.115H13.3469L14.3341 17.5068ZM23.491 17.0052L21.2161 19.2838V17.0052H20.8012V21.9206H21.2161V19.4987L23.534 21.9206H24.0777L21.631 19.3841L24.0061 17.0052H23.491ZM10.9289 17.0052V19.2265H8.16749V17.0052H7.75256V21.9206H8.16749V19.5847H10.9432V21.9206H11.3581V17.0052H10.9289Z"
                    fill="white"
                  ></path>
                  <path
                    id="IRON"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.8507 10.7237V15.2597H20.8149V11.3675L22.4949 14.6159C22.7725 15.1427 23.0208 15.3183 23.4007 15.3183C23.8097 15.3183 24.0435 15.0695 24.0435 14.5135V9.97747H23.0793V13.855L21.3992 10.6213C21.1363 10.1092 20.8587 9.93358 20.4935 9.93358C20.099 9.91895 19.8507 10.1677 19.8507 10.7237ZM14.6206 12.6259C14.6206 14.5428 15.0881 15.3183 16.7389 15.3183C18.3752 15.3183 18.8426 14.5281 18.8426 12.6259C18.8426 10.7091 18.3752 9.93358 16.7389 9.93358C15.0881 9.91895 14.6206 10.7091 14.6206 12.6259ZM15.7163 12.6259C15.7163 11.5431 15.7455 10.8115 16.7389 10.8115C17.7324 10.8115 17.7616 11.5431 17.7616 12.6259C17.7616 13.7087 17.7324 14.4403 16.7389 14.4403C15.7309 14.4257 15.7163 13.6941 15.7163 12.6259ZM9.93112 10.0653V15.2597H10.9976V13.2405C11.1875 13.2551 11.4212 13.2697 11.6404 13.2697L12.7214 15.2597H13.9486L12.7361 13.1381C13.3642 12.9478 13.7441 12.5089 13.7441 11.5724C13.7441 10.1384 12.7945 9.91895 11.6258 9.91895C11.0122 9.91895 10.384 9.97747 9.93112 10.0653ZM10.9976 12.3918V10.7969C11.2167 10.7676 11.4651 10.753 11.6696 10.753C12.4439 10.753 12.7068 10.9871 12.7068 11.5724C12.7068 12.2455 12.3124 12.4211 11.655 12.4211C11.4505 12.4211 11.2459 12.4211 11.0268 12.3918C11.0268 12.3918 11.0268 12.3918 11.0122 12.3918C11.0122 12.3918 11.0122 12.3918 10.9976 12.3918C11.0122 12.3918 11.0122 12.3918 10.9976 12.3918C11.0122 12.3918 11.0122 12.3918 10.9976 12.3918ZM7.71054 15.2597H8.79161V9.97747H7.71054V15.2597ZM16.7389 15.3183C16.7389 15.3183 15.0881 15.3183 16.7389 15.3183V15.3183Z"
                    fill="white"
                  ></path>
                </g>
              </g>
            </svg>
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
        </div>
      )}
    </nav>
  );
}

export default Navbar;
