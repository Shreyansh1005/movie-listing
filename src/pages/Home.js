import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import "../pages/Home.css";

const API_KEY = "b9bd48a6";
const API_URL = "https://www.omdbapi.com/";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("marvel"); // Default search term
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies(searchQuery, page);
  }, [searchQuery, page]);

  const fetchMovies = async (query, pageNumber) => {
    const url = `${API_URL}?apikey=${API_KEY}&s=${query}&page=${pageNumber}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Search) {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10)); // Each page has 10 results
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="container">
      <h1>Movie Listing</h1>
      <SearchBar onSearch={(query) => { setSearchQuery(query); setPage(1); }} />
      <MovieList movies={movies} />

      {movies.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
