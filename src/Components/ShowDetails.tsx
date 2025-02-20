import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import he from "he";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "../Contexts/ThemeContext";

interface Show {
  id: number;
  name: string;
  image: { medium: string; original: string };
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
  }, [id]);

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
        darkMode ? "bg-gray-800" : "bg-white"
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
              className={`text-4xl font-bold ${
                darkMode ? "text-white" : "dark_text"
              }`}
            >
              {show.name}
            </h1>
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
          <div className="mb-8">
            <p
              className={`text-lg mt-2 ${
                darkMode ? "white_text" : "dark_text"
              }`}
            >
              {he.decode(show.summary.replace(/<[^>]+>/g, ""))}
            </p>
          </div>
          <div className="mt-4 space-y-2 text-lg flex-grow flex flex-col justify-end">
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
              📅 <strong>Premiered:</strong> {show.premiered}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
              📅 <strong>Ended:</strong> {show.ended}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-700"}`}>
              🗣️ <strong>Language:</strong> {show.language}
            </p>
            {show.officialSite && (
              <div className="mt-4">
                <a
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline cursor-pointer text-green-600 font-bold"
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
