import { Routes, Route } from "react-router-dom";
import TVShowsList from "./Components/TVShowsList";
import Header from "./Components/Header";
import ShowDetails from "./Components/ShowDetails";
import { useTheme } from "./Contexts/ThemeContext";
import { useState } from "react";
import "./App.css";

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
      <main className="container mx-auto px-6 py-4">
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
        </Routes>
      </main>
      <footer className="flex justify-center text-center p-4 text-xs text-green-500">
        &#169; by Aldas For Reiz Tech {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
