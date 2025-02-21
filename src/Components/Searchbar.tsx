import { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";

interface SearchbarProps {
  onSearch: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full lg:w-54">
      <input
        type="text"
        placeholder="Look for shows"
        value={search}
        onChange={handleSearch}
        className={`${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full transition-all`}
      />
    </div>
  );
};

export default Searchbar;
