import { useEffect, useState } from "react";
import axios from "axios";
import ShowCard from "./ShowCard";
import { useTheme } from "../Contexts/ThemeContext";

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
  const { darkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Pagination thingies
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageShows = tvShows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tvShows.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // NEED TO UPDATE STYLING, RIGHT NOW JUST FOR A QUICK DEMO

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 place-items-center">
        {currentPageShows.map((show) => (
          <ShowCard key={show.id} show={show} darkMode={darkMode} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </>
  );
};

export default TVShowsList;
