import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MoveiDetail.css";

const API_KEY = "b9bd48a6";
const API_URL = "https://www.omdbapi.com/";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${movieId}&plot=full`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieDetail();
  }, [movieId]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="movie-detail">
      <h1>{movie.Title} ({movie.Year})</h1>
      <img src={movie.Poster} alt={movie.Title} />

      <div className="movie-info">
        <p><strong>🕒 Runtime:</strong> {movie.Runtime}</p>
        <p><strong>🎭 Genre:</strong> {movie.Genre}</p>
        <p><strong>🎬 Director:</strong> {movie.Director}</p>
        <p><strong>✍️ Writer:</strong> {movie.Writer}</p>
        <p><strong>🎭 Actors:</strong> {movie.Actors}</p>
        <p><strong>📜 Plot:</strong> {movie.Plot}</p>
        <p><strong>🌎 Language:</strong> {movie.Language}</p>
        <p><strong>🌍 Country:</strong> {movie.Country}</p>
        <p><strong>🏆 Awards:</strong> {movie.Awards}</p>
        <p><strong>💰 Box Office:</strong> {movie.BoxOffice}</p>
      </div>

      <h3>📊 Ratings</h3>
      <ul>
        {movie.Ratings && movie.Ratings.map((rating, index) => (
          <li key={index}><strong>{rating.Source}:</strong> {rating.Value}</li>
        ))}
      </ul>

      <p><strong>⭐ IMDB Rating:</strong> {movie.imdbRating} / 10 ({movie.imdbVotes} votes)</p>
      <p><strong>📊 Metascore:</strong> {movie.Metascore}/100</p>

      <Link to="/" className="back-button">⬅ Back to Home</Link>
    </div>
  );
};

export default MovieDetail;
