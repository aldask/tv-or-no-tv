import React from "react";
import TVShowsList from "./Components/TVShowsList";
import "./App.css";
import Header from "./Components/Header";
import { useTheme } from "./Contexts/ThemeContext";

const App: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <main className="container mx-auto px-4 py-6">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <TVShowsList />
      </main>
    </div>
  );
};

export default App;
