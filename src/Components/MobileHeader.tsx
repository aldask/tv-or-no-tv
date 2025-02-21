import React from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Dropdown from "./Dropdown.tsx";
import Searchbar from "./Searchbar.tsx";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import SortDropdown from "./SortDropdown.tsx";

interface MobileMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onSearch: (query: string) => void;
  onSelectedSort: (sort: string) => void;
  selectedGenres: string[];
  selectedStatus: string;
  onSelectedGenres: (genres: string | string[]) => void;
  onSelectedStatus: (status: string | string[]) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  toggleMenu,
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

  return (
    <div>
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes
            className={`text-3xl transition z-10000 relative ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          />
        ) : (
          <FaBars
            className={`text-3xl transition z-10000 relative ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          />
        )}
      </div>
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-0 z-5 flex flex-col justify-center items-center transition-all duration-300 ease-in-out lg:hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div
          className={`flex flex-col w-full items-center mt-8 space-y-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          <Link to="/" onClick={toggleMenu}>
            <button
              className={`${
                darkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } text-2xl py-2 px-8 w-full text-center rounded-lg transition-all duration-300`}
            >
              Home
            </button>
          </Link>
          <Link to="/favourites" onClick={toggleMenu}>
            <button
              className={`${
                darkMode
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              } text-2xl py-2 px-8 w-full text-center rounded-lg transition-all duration-300`}
            >
              Favourites
            </button>
          </Link>
          <div
            className={`flex flex-col w-full px-8 mt-4 space-y-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {isHomePage && (
              <div className="flex flex-col lg:flex-row justify-center xl:justify-start align-center space-x-4 w-full">
                <SortDropdown onSort={onSelectedSort} />
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
    </div>
  );
};

export default MobileMenu;
