import React from "react";
import logoUrl from "../assets/logo.png";

interface HeaderProps {
  toggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, darkMode }) => {
  return (
    <header className={`${darkMode ? 'text-white' : 'text-gray'}`}>
      <div className="flex flex-row justify-between items-center py-4 px-8 container mx-auto">
        <div className="flex flex-row items-center space-x-4">
          <img className="h-24 w-auto" alt="tv-or-no-tv_logo" src={logoUrl} />
          <button
            onClick={toggleTheme}>toggle theme</button>
        </div>
        <div className="flex flex-row items-center space-x-6">
          <button className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Home
          </button>
          <button className="px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Favourites
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
