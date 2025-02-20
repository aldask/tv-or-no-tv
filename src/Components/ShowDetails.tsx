import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import he from "he";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";

interface Show {
  id: number;
  name: string;
  image: { medium: string };
  summary: string;
  rating: { average: number };
  genres: string[];
  averageRuntime: number;
  premiered: string;
  ended: string;
  language: string;
  officialSite: string;
}

const ShowDetails: React.FC = () => {
  const { id } = useParams();
  const { darkMode } = useTheme();
  const [show, setShow] = useState<Show | null>(null);
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!show) return <div>Show not found</div>;

  return (
    <div
      className={`flex flex-col md:flex-row p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 w-full max-w-4xl cursor-pointer ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {show.image?.medium && (
        <img
          src={show.image.medium}
          alt={show.name}
          className="w-full md:w-64 h-96 object-cover rounded-lg"
        />
      )}

      <div className="ml-0 md:ml-6 flex flex-col justify-between w-full mt-4 md:mt-0">
        <div className="flex justify-between items-start">
          <h2 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {show.name}
          </h2>
          <button>
            <FaHeart
              className={`text-2xl ${
                darkMode ? "text-gray-500 hover:text-red-500" : "text-gray-700 hover:text-red-500"
              } transition`}
            />
          </button>
        </div>

        <p className={`text-md mt-3 leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          {he.decode(show.summary.replace(/<[^>]+>/g, ""))}
        </p>

        <div className="mt-4 text-lg space-y-2">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            ⭐ <strong>Rating:</strong> {show.rating.average}/10
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            🎭 <strong>Genres:</strong> {show.genres.join(", ")}
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            🕒 <strong>Runtime:</strong> {show.averageRuntime} min/episode
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            📅 <strong>Premiered:</strong> {show.premiered} | <strong>Ended:</strong> {show.ended}
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
            🗣️ <strong>Language:</strong> {show.language}
          </p>
          {show.officialSite && (
            <p className={`${darkMode ? "text-blue-400" : "text-blue-600"} underline`}>
              <a href={show.officialSite} target="_blank" rel="noopener noreferrer">
                Official Site
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
