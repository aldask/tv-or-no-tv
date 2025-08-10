import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "./Contexts/ThemeContext";
import TVShowsList from "./Components/TVShowsList";
import Header from "./Components/Header";
import ShowDetails from "./Components/ShowDetails";
import Favorites from "./Components/Favorites";
import EasterEggs from "./Components/DontLookHere";

const App: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`min-h-screen font-sans text-[17px] transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-gray-950 to-gray-800 text-gray-300"
          : "bg-[#e4e7eb] text-gray-800"
      }`}
    >
      <Header
        onSelectedSort={setSelectedSort}
        onSelectedGenres={setSelectedGenres}
        onStatusFilter={setStatusFilter}
        onSearch={setSearchQuery}
      />
      <main className="container mx-auto px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-12 lg:py-6 xl:px-16 xl:py-8">
        <Routes>
          <Route
            path="/"
            element={
              <TVShowsList
                statusFilter={statusFilter}
                selectedGenres={selectedGenres}
                selectedSorting={selectedSort}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/shows/:id" element={<ShowDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <EasterEggs />
      </main>
      <footer>
        <p
          className={`flex justify-center text-center p-4 text-xs font-semibold ${
            darkMode ? "text-green-500" : "text-gray-800"
          }`}
        >
          &#169; by Aldas {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
