import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { FaTimes, FaBars } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import Dropdown from "./Dropdown.tsx";
import Searchbar from "./Searchbar.tsx";

interface MobileMenuProps {
  isMenuOpen: boolean;
  onFilterReset: () => void;
  toggleMenu: () => void;
  selectedSort: string;
  onSelectedSort: (sort: string | string[]) => void;
  selectedGenres: string[];
  onSelectedGenres: (genres: string | string[]) => void;
  selectedStatus: string;
  onSelectedStatus: (status: string | string[]) => void;
  onSearch: (query: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  onFilterReset,
  toggleMenu,
  selectedSort,
  onSearch,
  onSelectedSort,
  selectedGenres,
  selectedStatus,
  onSelectedGenres,
  onSelectedStatus,
}) => {
  const { darkMode } = useTheme();
  const currentLocation = useLocation();

  const isHomePage = currentLocation.pathname === "/";

  // Effect to disable scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes
            className={`text-2xl transition z-10000 relative ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          />
        ) : (
          <FaBars
            className={`text-2xl transition z-10000 relative ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          />
        )}
      </div>
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-0 z-10 flex justify-center items-center transition-all duration-300 ease-in-out lg:hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`flex flex-col w-full max-w-md items-center py-6 space-y-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <Link
            to="/"
            onClick={() => {
              toggleMenu();
              onFilterReset();
            }}
          >
            <button
              className={`${
                darkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              } px-9 py-2 text-base rounded-md font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none shadow-md w-full sm:w-auto max-w-xs border-2 border-transparent hover:border-green-400`}
            >
              Home
            </button>
          </Link>
          <Link
            to="/favorites"
            onClick={() => {
              toggleMenu();
              onFilterReset();
            }}
          >
            <button
              className={`${
                darkMode
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-green-500 text-white hover:bg-green-600"
              } px-5 py-2 text-base rounded-md font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none shadow-md w-full sm:w-auto max-w-xs border-2 border-transparent hover:border-green-400`}
            >
              Favourites
            </button>
          </Link>
          {isHomePage && (
            <div className="flex flex-col w-full px-6 space-y-6">
              <Dropdown
                title="Sort By"
                options={[
                  "No sort",
                  "Name ascending",
                  "Name descending",
                  "Premiered ascending",
                  "Premiered descending",
                ]}
                selectedValue={selectedSort}
                onSelect={onSelectedSort}
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
                onSelect={onSelectedGenres}
                isMultiple={true}
              />
              <Dropdown
                title="Status"
                options={["All", "Ended", "Running", "To Be Determined"]}
                selectedValue={selectedStatus}
                onSelect={onSelectedStatus}
                isMultiple={false}
              />
              <Searchbar onSearch={onSearch} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
