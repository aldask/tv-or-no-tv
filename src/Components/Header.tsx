import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import logoUrl from "../assets/logo.png";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import Searchbar from "./Searchbar.tsx";
import Dropdown from "./Dropdown.tsx";
import MobileMenu from "./MobileHeader.tsx";

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
  const { toggleTheme, darkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentLocation = useLocation();

  // Handler for sorting
  const [sortingFilterValue, setSortingFilterValue] = useState("");

  const handleSortingFilter = (value: string | string[]) => {
    if (typeof value === "string") {
      setSortingFilterValue(value);
      onSelectedSort(value);
    }
  };

  // Handler for genres
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreFilter = (value: string | string[]) => {
    if (Array.isArray(value)) {
      setSelectedGenres(value);
      onSelectedGenres(value);
    }
  };

  // Handler for status filter
  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusFilter = (value: string | string[]) => {
    if (typeof value === "string") {
      setStatusFilter(value);
      onStatusFilter(value);
    }
  };

  // Handler for search
  const [, setSearchQuery] = useState("");

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
      <div className="flex flex-col justify-between items-center py-4 px-4 container mx-auto">
        <div className="flex flex-row justify-between items-center py-4 px-8 container mx-auto">
          <div className="flex flex-row items-center space-x-4">
            <img
              className="h-16 md:h-24 w-auto"
              alt="tv-or-no-tv_logo"
              src={logoUrl}
            />
            <div
              onClick={toggleTheme}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all ${
                darkMode ? "bg-gray-800" : "bg-yellow-500"
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
                  <FaSun className="text-yellow-500" />
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="hidden lg:flex space-x-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <button
                  className={`${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-green-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  } px-5 py-3 text-base rounded-md font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none shadow-md border-2 border-transparent hover:border-green-500`}
                >
                  Home
                </button>
              </Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>
                <button
                  className={`${
                    darkMode
                      ? "bg-gray-800 text-white hover:bg-green-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  } px-5 py-3 text-base rounded-md font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none shadow-md border-2 border-transparent hover:border-green-500`}
                >
                  Favourites
                </button>
              </Link>
            </div>
            <MobileMenu
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              selectedSort={sortingFilterValue}
              onSelectedSort={handleSortingFilter}
              onSearch={handleSearch}
              selectedGenres={selectedGenres}
              selectedStatus={statusFilter}
              onSelectedGenres={handleGenreFilter}
              onSelectedStatus={handleStatusFilter}
            />
          </div>
        </div>
        {isHomePage && (
          <div className="hidden lg:flex flex-row lg:justify-center xl:justify-start align-center space-x-4 w-full">
            <Dropdown
              title="Sort By"
              options={[
                "No sort",
                "Name ascending",
                "Name descending",
                "Premiered ascending",
                "Premiered descending",
              ]}
              selectedValue={sortingFilterValue}
              onSelect={handleSortingFilter}
              isMultiple={false}
            />
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
