import React, { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import { useTheme } from "../Contexts/ThemeContext";
import { TVShow } from "./TVShowsList";
import { useNavigate } from "react-router-dom";

const Favorites: React.FC = () => {
  const { darkMode } = useTheme();
  const [favorites, setFavorites] = useState<TVShow[]>([]);
  const navigate = useNavigate();

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Handle adding/removing a show from favorites
  const handleFav = (show: TVShow) => {
    const storedFavorites = localStorage.getItem("favorites");
    let updatedFavorites: TVShow[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : [];

    const isFavorite = updatedFavorites.some((fav) => fav.id === show.id);

    if (isFavorite) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.id !== show.id);
    } else {
      updatedFavorites.push(show);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="p-6">
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Your Favorite Shows
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
              saveShow={true}
              handleFav={() => handleFav(show)}
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
