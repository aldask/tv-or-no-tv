import React, { useState } from "react";
import logoUrl from "../assets/logo.png";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar.tsx";
import Dropdown from "./Dropdown.tsx";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({onSearch}) => {
  const { toggleTheme, darkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const currentLocation = useLocation();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const isHomePage = currentLocation.pathname === "/";

  return (
    <header>
      <div className="flex flex-col justify-between items-center py-4 px-8 container mx-auto">
        <div className="flex flex-row justify-between items-center py-4 px-8 container mx-auto">
          <div className="flex flex-row items-center space-x-4">
            <img className="h-24 w-auto" alt="tv-or-no-tv_logo" src={logoUrl} />
            <div
              onClick={toggleTheme}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
                darkMode ? "bg-gray-800" : "bg-yellow-300"
              }`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-all ${
                  darkMode ? "translate-x-[26px]" : "translate-x-[-2px]"
                } flex items-center justify-center`}
              >
                {darkMode ? (
                  <FaMoon className="text-gray-800" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex space-x-6">
            <Link to="/">
              <button
                className={`${
                  darkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                } px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg border-2 border-transparent hover:border-gray-400`}
              >
                Home
              </button>
            </Link>
            <button
              className={`${
                darkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } px-6 py-3 rounded-xl text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none shadow-lg border-2 border-transparent hover:border-gray-400`}
            >
              Favourites
            </button>
          </div>
        </div>
        <div className="hidden lg:flex flex-row lg:justify-center xl:justify-start align-center space-x-4 w-full">
          <div className="relative w-full sm:w-54">
            <select
              className={`${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } px-4 py-[0.55rem] rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full transition-all`}
            >
              <option value="none">No sort</option>
              <option value="name-asc">Name ascending</option>
              <option value="name-desc">Name descending</option>
              <option value="premiered-asc">Premiered ascending</option>
              <option value="premiered-desc">Premiered descending</option>
            </select>
          </div>
          <Dropdown
            title="Genres"
            options={[
              "Action",
              "Crime",
              "Science-Fiction",
              "Drama",
              "Thriller",
              "Espionage",
              "Music",
              "Romance",
            ]}
            selectedValue=""
            onSelect={(value) => console.log(value)}
            darkMode={darkMode}
            isMultiple={true}
          />
          <Dropdown
            title="Status"
            options={["All", "Ended", "Running", "To Be Determined"]}
            selectedValue=""
            onSelect={(value) => console.log(value)}
            darkMode={darkMode}
            isMultiple={false}
          />
          <Searchbar onSearch={handleSearch} />
        </div>
      </div>
      {/* {isHomePage && (
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes
                className={`text-3xl transition ${
                  darkMode ? "text-white" : "dark_text"
                }`}
              />
            ) : (
              <FaBars
                className={`text-3xl transition ${
                  darkMode ? "text-white" : "dark_text"
                }`}
              />
            )}
          </div>
        )} */}
    </header>
  );
};

export default Header;
