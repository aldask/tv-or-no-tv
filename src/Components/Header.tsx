import React, { useState } from "react";
import logoUrl from "../assets/logo.png";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar.tsx";
import Dropdown from "./Dropdown.tsx";
import MobileMenu from "./MobileHeader.tsx";
import SortDropdown from "./SortDropdown.tsx";

interface HeaderProps {
  onSelectedSort: (sort: string) => void;
  onSelectedGenres: (sort: string[]) => void;
  onStatusFilter: (sort: string) => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSelectedSort,
  onSelectedGenres,
  onStatusFilter,
  onSearch,
}) => {
  const [, setSortingFilterValue] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [, setSearchQuery] = useState("");

  const { toggleTheme, darkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLocation = useLocation();

  // Handler for sorting
  const handleSortingFilter = (value: string) => {
    setSortingFilterValue(value);
    onSelectedSort(value);
  };

  // Handler for genres
  const handleGenreFilter = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setSelectedGenres(value);
      onSelectedGenres(value);
    }
  };

  // Handler for status filter
  const handleStatusFilter = (value: string | string[]) => {
    if (typeof value === "string") {
      setStatusFilter(value);
      onStatusFilter(value);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
          <div>
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
            <MobileMenu
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              onSearch={handleSearch}
              onSelectedSort={onSelectedSort}
              selectedGenres={selectedGenres}
              selectedStatus={statusFilter}
              onSelectedGenres={handleGenreFilter}
              onSelectedStatus={handleStatusFilter}
            />
          </div>
        </div>
        {isHomePage && (
          <div className="hidden lg:flex flex-row lg:justify-center xl:justify-start align-center space-x-4 w-full">
            <SortDropdown onSort={handleSortingFilter} />
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
              selectedValue={selectedGenres}
              onSelect={handleGenreFilter}
              isMultiple={true}
            />
            <Dropdown
              title="Status"
              options={["All", "Ended", "Running", "To Be Determined"]}
              selectedValue={statusFilter}
              onSelect={handleStatusFilter}
              isMultiple={false}
            />
            <Searchbar onSearch={handleSearch} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
