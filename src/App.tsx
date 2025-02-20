import { Routes, Route } from "react-router-dom";
import TVShowsList from "./Components/TVShowsList";
import Header from "./Components/Header";
import ShowDetails from "./Components/ShowDetails";
import { useTheme } from "./Contexts/ThemeContext";
import "./App.css";

const App: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header toggleTheme={toggleTheme} darkMode={darkMode} />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<TVShowsList />} />
          <Route path="/shows/:id" element={<ShowDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
