import React from "react";
import Movie from "../component/Movie";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year");
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie key={movie.id} movieId={movie.id} coverImg={movie.medium_cover_image} title={movie.title} summary={movie.summary} rating={movie.rating} genres={movie.genres} />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
