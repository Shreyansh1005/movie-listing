import React from "react";
import { Link } from "react-router-dom";
import "../components/MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <Link to={`/movie/${movie.imdbID}`}>Movie Details</Link>
    </div>
  );
};

export default MovieCard;
