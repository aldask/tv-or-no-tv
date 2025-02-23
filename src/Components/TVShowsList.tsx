import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Contexts/ThemeContext";
import ShowCard from "./ShowCard";

export interface TVShow {
  id: number;
  name: string;
  summary: string;
  image: {
    original: string | undefined;
    medium: string;
  };
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, selectedGenres]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

  // Pagination numbers logic
  const pagesCountAround = 2;
  const pageNumbers = [];

  pageNumbers.push(1);

  // Pushing ellipsis BEFORE current page
  if (currentPage > pagesCountAround) {
    pageNumbers.push("...");
  }

  // Pushing ellipsis AROUND CURRENT page
  for (
    let i = Math.max(2, currentPage - pagesCountAround);
    i <= Math.min(totalPages - 1, currentPage + pagesCountAround);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Pushing ellipsis AFTER curent page
  if (currentPage < totalPages - pagesCountAround) {
    pageNumbers.push("...");
  }

  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {currentPageShows.length > 0 ? (
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 place-items-center ${
            darkMode ? "text-gray-300" : "text-gray-800"
          }`}
        >
          {currentPageShows.map((show) => {
            return (
              <ShowCard
                key={show.id}
                show={show}
                onClick={() => navigate(`/shows/${show.id}`)}
              />
            );
          })}
        </div>
      ) : searchQuery ? (
        <div
          className={`text-center text-gray-500 mt-10 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <h2 className="text-2xl font-semibold">No shows found</h2>
          <p className="text-lg">Try searching for something else.</p>
        </div>
      ) : (
        <div
          className={`text-center text-gray-500 mt-10 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <h2 className="text-2xl font-semibold">No shows found</h2>
          <p className="text-lg">Try searching for something else.</p>
        </div>
      )}
      {filteredShows.length > itemsPerPage && (
        <div className="flex justify-center mt-10 flex-wrap gap-1 sm:gap-2">
          {pageNumbers.map((number, index) =>
            typeof number === "string" ? (
              <span
                key={index}
                className="px-1 py-2 rounded-lg font-medium text-xs sm:text-sm"
              >
                {number}
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(number)}
                disabled={currentPage === number}
                className={`px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                  currentPage === number
                    ? darkMode
                      ? "bg-green-500 text-white cursor-not-allowed"
                      : "bg-green-600 text-white cursor-not-allowed"
                    : darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {number}
              </button>
            )
          )}
        </div>
      )}
    </>
  );
};

export default TVShowsList;
