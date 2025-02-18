import React from "react";
import logoUrl from "../assets/logo.png";
import { useTheme } from "../Contexts/ThemeContext.tsx";

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
          <button
            onClick={toggleTheme}
            className={`${
              darkMode
                ? "text-white hover:text-gray-200"
                : "text-gray-800 hover:text-gray-500"
            } transition`}
          >
            toggle theme
          </button>
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
