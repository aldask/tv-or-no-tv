import React from "react";
import he from "he";
import { FaHeart } from "react-icons/fa";

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
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  return (
    <div className="flex flex-row bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl text-white transition-transform transform hover:scale-105 w-full max-w-3xl cursor-pointer">
      {show.image?.medium && (
        <img
          src={show.image.medium}
          alt={show.name}
          className="w-52 h-72 object-cover rounded-lg"
        />
      )}
      <div className="ml-6 flex flex-col justify-between w-full">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold">{show.name}</h3>
            <button>
              <FaHeart className="text-2xl text-gray-500 hover:text-red-500 transition" />
            </button>
          </div>

          <p className="text-gray-300 text-md mt-2 line-clamp-3">
            {he.decode(show.summary.replace(/<[^>]+>/g, ""))}
          </p>
        </div>

        <div className="mt-4 text-gray-400 text-lg">
          <p>
            ⭐ <strong>Rating:</strong> {show.rating.average}/10
          </p>
          <p>
            🎭 <strong>Genres:</strong> {show.genres.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
