import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import he from "he";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";
import { favContext } from "../Contexts/FavoriteContext";
import { TVShow } from "./TVShowsList";

interface ShowDetails extends TVShow {
  averageRuntime: number;
  premiered: string;
  ended: string;
  language: string;
  officialSite: string;
}

const ShowDetails: React.FC = () => {
  const { id } = useParams();
  const { darkMode } = useTheme();
  const { favorites, addFavorite, removeFavorite } = favContext();
  const [show, setShow] = useState<ShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => {
        setShow(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const isFavorite = favorites.some((fav: TVShow) => fav.id === Number(id));

  const handleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(show!);
    } else {
      addFavorite(show!);
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!show)
    return (
      <div className="text-center py-10 text-gray-500">Show not found</div>
    );

  return (
    <div
      className={`container mx-auto p-8 rounded-lg shadow-lg ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-shrink-0 w-full lg:w-1/3">
          <img
            src={show.image.original}
            alt={show.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col w-full lg:w-2/3 justify-between">
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {show.name}
            </h1>
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
          <div className="mb-8">
            <p
              className={`text-sm sm:text-base lg:text-lg mt-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {he.decode(show.summary.replace(/<[^>]+>/g, ""))}
            </p>
          </div>
          <div className="mt-4 space-y-2 text-xs sm:text-sm lg:text-base flex-grow flex flex-col justify-end">
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              ⭐{" "}
              <strong className="text-sm sm:text-base lg:text-lg">
                Rating:
              </strong>{" "}
              {show.rating.average ? show.rating.average + "/10" : "N/A"}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              🎭{" "}
              <strong className="text-sm sm:text-base lg:text-lg">
                Genres:
              </strong>{" "}
              {show.genres && show.genres.length > 0
                ? show.genres.join(", ")
                : "No genre"}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              🕒{" "}
              <strong className="text-sm sm:text-base lg:text-lg">
                Runtime:
              </strong>{" "}
              {show.averageRuntime} min/episode
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              📅{" "}
              <strong className="text-sm sm:text-base lg:text-lg">
                Premiered:
              </strong>{" "}
              {show.premiered}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              📅{" "}
              <strong className="text-sm sm:text-base lg:text-lg">
                Ended:
              </strong>{" "}
              {show.ended ? show.ended : "Ongoing"}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              🗣️{" "}
              <strong className="text-sm sm:text-base lg:text-lg">
                Language:
              </strong>{" "}
              {show.language}
            </p>
            {show.officialSite && (
              <div className="mt-4">
                <a
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:underline cursor-pointer font-bold transition ${
                    darkMode ? "text-green-500" : "text-green-600"
                  }`}
                >
                  Visit Official Site
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
