import React, { useEffect, useState } from "react";
import axios from "axios";

interface TVShow {
  id: number;
  name: string;
  summary: string;
  image: { medium: string };
  rating: { average: number };
  genres: string[];
}

const TVShowsList = () => {
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/shows")
      .then((response) => {
        setTvShows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // This part will need to be improved for better user experience
  }

  if (error) {
    return <div>Error: {error}</div>; // This one also need to be improved
  }

  // NEED TO UPDATE STYLING, RIGHT NOW JUST FOR A QUICK DEMO

  return (
    <>
      <div>
        <h1 className="text-3xl">TV Shows</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl"
            >
              <img
                src={show.image.medium}
                alt={show.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl mt-2">{show.name}</h3>
              <p className="text-gray-500 text-sm">{show.summary}</p>
              <p className="text-sm mt-2">
                Rating: {show.rating.average || "N/A"}
              </p>
              <p className="text-sm mt-1">Genres: {show.genres.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TVShowsList;
