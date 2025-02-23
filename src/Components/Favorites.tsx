import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeContext";
import { favContext } from "../Contexts/FavoriteContext";
import ShowCard from "./ShowCard";

const Favorites: React.FC = () => {
  const { darkMode } = useTheme();
  const { favorites } = favContext();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        My Favorite Shows
      </h2>

      {favorites.length > 0 ? (
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 place-items-center ${
            darkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {favorites.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onClick={() => navigate(`/shows/${show.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No favorite shows yet.
        </p>
      )}
    </div>
  );
};

export default Favorites;
