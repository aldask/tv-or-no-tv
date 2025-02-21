import React from "react";
import { useTheme } from "../Contexts/ThemeContext";

interface SortDropdownProps {
  onSort: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort }) => {
  const { darkMode } = useTheme();

  return (
    <div className="relative w-full lg:w-54 mb-4">
      <select
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full text-lg transition-all`}
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
