import { Routes, Route } from "react-router-dom";
import TVShowsList from "./Components/TVShowsList";
import Header from "./Components/Header";
import ShowDetails from "./Components/ShowDetails";
import { useTheme } from "./Contexts/ThemeContext";
import "./App.css";
import { useState } from "react";

const App: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header onSelectedSort={setSelectedSort} onSearch={setSearchQuery} />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <TVShowsList
                selectedSorting={selectedSort}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
