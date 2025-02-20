import React, { useState } from "react";
import logoUrl from "../assets/logo.png";
import { useTheme } from "../Contexts/ThemeContext.tsx";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router";

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const currentLocation = useLocation();

  const isHomePage = currentLocation.pathname === "/";

  return (
    <header>
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

        {isHomePage && (
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes
                className={`text-3xl transition-all ${
                  darkMode ? "text-white" : "dark_text"
                }`}
              />
            ) : (
              <FaBars
                className={`text-3xl transition-all ${
                  darkMode ? "text-white" : "dark_text"
                }`}
              />
            )}
            <div></div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
