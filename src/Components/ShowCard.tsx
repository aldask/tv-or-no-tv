import React from "react";
import he from "he";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";

interface Show {
  id: number;
  name: string;
  image: { medium: string };
  summary: string;
  rating: { average: number };
  genres: string[];
}

interface ShowCardProps {
  show: Show;
  onClick: () => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onClick }) => {
  const { darkMode } = useTheme();
  
  return (
    <div
      onClick={onClick}
      className={`flex flex-row p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 w-full max-w-3xl cursor-pointer ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {show.image.medium && (
        <img
          src={show.image.medium}
          alt={show.name}
          className="w-52 h-72 object-cover rounded-lg"
        />
      )}
      <div className="ml-6 flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between items-start">
            <h3
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "dark_text"
              }`}
            >
              {show.name}
            </h3>
            <button>
              <FaHeart
                className={`text-2xl ${
                  darkMode
                    ? "text-gray-500 hover:text-red-500"
                    : "text-gray-700 hover:text-red-500"
                } transition`}
              />
            </button>
          </div>
          <p
            className={`text-md mt-2 line-clamp-3 ${
              darkMode ? "white_text" : "dark_text"
            }`}
          >
            {he.decode(show.summary.replace(/<[^>]+>/g, ""))}
          </p>
        </div>
        <div className="mt-4 text-lg">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            ⭐ <strong>Rating:</strong> {show.rating.average}/10
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            🎭 <strong>Genres:</strong> {show.genres.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
