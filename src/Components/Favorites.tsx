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
    <div className="flex flex-col justify-center mt-1 flex-wrap gap-1 sm:gap-2">
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
          You haven't selected any favorite shows yet
        </p>
      )}
    </div>
  );
};

export default Favorites;
