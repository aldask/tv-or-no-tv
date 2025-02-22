import React from "react";
import { useTheme } from "../Contexts/ThemeContext";

interface SortDropdownProps {
  onSort: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort }) => {
  const { darkMode } = useTheme();

  return (
    <div className="relative w-full lg:w-44 mb-4">
      <select
        className={`${
          darkMode
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-gray-100 text-gray-800 border-gray-300"
        } px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-600`}
        onChange={(e) => onSort(e.target.value)}
      >
        <option value="">No sort</option>
        <option value="Name ascending">Name ascending</option>
        <option value="Name descending">Name descending</option>
        <option value="Premiered ascending">Premiered ascending</option>
        <option value="Premiered descending">Premiered descending</option>
      </select>
    </div>
  );
};

export default SortDropdown;
