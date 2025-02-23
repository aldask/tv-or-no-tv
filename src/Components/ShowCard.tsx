import React from "react";
import he from "he";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";
import { favContext } from "../Contexts/FavoriteContext";
import { TVShow } from "./TVShowsList";

export interface ShowCardProps {
  show: TVShow;
  onClick: () => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onClick }) => {
  const { darkMode } = useTheme();
  const { favorites, addFavorite, removeFavorite } = favContext();

  const isFavorite = favorites.some((fav) => fav.id === show.id);

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(show);
    } else {
      addFavorite(show);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`flex flex-row p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 w-full max-w-3xl cursor-pointer ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {show.image.medium && (
        <img
          src={show.image.medium}
          alt={show.name}
          className="w-32 sm:w-52 lg:w-64 h-auto object-cover rounded-lg"
        />
      )}
      <div className="ml-6 flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between items-start">
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {show.name}
            </h3>
            <button>
              <FaHeart
                onClick={handleFav}
                className={`text-xl cursor-pointer transition ${
                  isFavorite
                    ? "text-green-500"
                    : darkMode
                    ? "text-gray-500 hover:text-green-400"
                    : "text-gray-700 hover:text-green-500"
                }`}
              />
            </button>
          </div>
          <p
            className={`text-sm sm:text-base md:text-md mt-2 line-clamp-3 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {he.decode(show.summary.replace(/<[^>]+>/g, ""))}
          </p>
        </div>
        <div className="mt-4 text-sm sm:text-base md:text-lg">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            ⭐ <strong>Rating:</strong>{" "}
            {show.rating.average ? show.rating.average + "/10" : "N/A"}
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            🎭 <strong>Genres:</strong>{" "}
            {show.genres && show.genres.length > 0
              ? show.genres.join(", ")
              : "No genre"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
