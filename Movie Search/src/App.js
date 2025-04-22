import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

// Replace with your actual OMDb API key
const API_KEY = "1c6c6b65";

function App() {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const url = `https://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`;

  const searchMovie = async () => {
    setError("");
    setMovie(null);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError("sorry Movie not found.");
      }
    } catch (err) {
      setError("Failed to fetch movie.");
    }
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Enter movie name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchMovie}>Search</button>
      {error && <p className="error">{error}</p>}
      {movie && <MovieCard movie={movie} />}
    </div>
  );
}

export default App;
