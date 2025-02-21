import { useEffect, useState } from "react";
import axios from "axios";
import ShowCard from "./ShowCard";
import { useTheme } from "../Contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

interface TVShow {
  id: number;
  name: string;
  summary: string;
  image: { medium: string };
  rating: { average: number };
  genres: string[];
  premiered: string;
  status: string;
}

interface TVShowsListProps {
  selectedSorting: string;
  selectedGenres: string[];
  statusFilter: string;
  searchQuery: string;
}

const TVShowsList: React.FC<TVShowsListProps> = ({
  selectedSorting,
  selectedGenres,
  statusFilter,
  searchQuery,
}) => {
  const { darkMode } = useTheme();
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");

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

  // Filter shows based on search query
  const filteredShows = tvShows.filter((show) => {
    const matchesSearch = searchQuery
      ? show.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesStatus =
      statusFilter && statusFilter !== "All"
        ? show.status === statusFilter
        : true;

    const matchesGenres =
      selectedGenres.length > 0
        ? selectedGenres.some((genre) => show.genres.includes(genre))
        : true;

    return matchesSearch && matchesStatus && matchesGenres;
  });

  // Sort the filtered shows
  const sortedShows = filteredShows.sort((a, b) => {
    switch (selectedSorting) {
      case "Name ascending":
        return a.name.localeCompare(b.name);
      case "Name descending":
        return b.name.localeCompare(a.name);
      case "Premiered ascending":
        return (
          new Date(a.premiered).getTime() - new Date(b.premiered).getTime()
        );
      case "Premiered descending":
        return (
          new Date(b.premiered).getTime() - new Date(a.premiered).getTime()
        );
      default:
        return a.id - b.id;
    }
  });

  // Pagination thingies
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageShows = sortedShows.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedShows.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {currentPageShows.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 place-items-center">
          {currentPageShows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onClick={() => navigate(`/shows/${show.id}`)}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center text-gray-500 mt-10">
          <h2 className="text-2xl font-semibold">No shows found</h2>
          <p className="text-lg">Try searching for something else.</p>
        </div>
      ) : null}
      {filteredShows.length > itemsPerPage && (
        <div className="flex justify-center mt-10 flex-wrap gap-1 sm:gap-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              disabled={currentPage === number}
              className={`px-3 py-1 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                currentPage === number
                  ? darkMode
                    ? "bg-green-400 text-black cursor-not-allowed"
                    : "bg-green-600 text-white cursor-not-allowed"
                  : darkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default TVShowsList;
