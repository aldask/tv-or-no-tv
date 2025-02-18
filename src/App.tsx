import React from "react";
import TVShowsList from "./Components/TVShowsList";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="container mx-auto px-4 py-6">
        <TVShowsList />
      </main>
    </div>
  );
};

export default App;
