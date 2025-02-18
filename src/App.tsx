import React, { useState } from "react";
import TVShowsList from "./Components/TVShowsList";
import "./App.css";
import Header from "./Components/Header";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } min-h-screen transition`}
    >
      <main className="container mx-auto px-4 py-6">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <TVShowsList />
      </main>
    </div>
  );
};

export default App;
