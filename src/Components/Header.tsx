import React from "react";
import logoUrl from "../assets/logo.png";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import { FaMoon, FaSun } from "react-icons/fa";

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
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
                darkMode ? "translate-x-7" : "translate-x-0"
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
        <div className="flex flex-row items-center space-x-6">
          <button
            className={`${
              darkMode
                ? "text-white hover:bg-gray-700"
                : "text-gray-800 hover:bg-gray-200"
            } px-4 py-2 rounded-lg transition`}
          >
            Home
          </button>
          <button
            className={`${
              darkMode
                ? "text-white hover:bg-gray-700"
                : "text-gray-800 hover:bg-gray-200"
            } px-4 py-2 rounded-lg transition`}
          >
            Favourites
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
