import { useEffect, useState } from "react";
import axios from "axios";
import ShowCard from "./ShowCard";

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
    setLoading(true);
    setError("");

    axios
      .get("https://api.tvmaze.com/shows")
      .then((response) => {
        setTvShows(response.data);
        setLoading(false);
        setError("");
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
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 place-items-center">
        {tvShows.map((show) => (
          <ShowCard key={show.id} show={show}  />
        ))}
      </div>
    </>
  );
};

export default TVShowsList;
