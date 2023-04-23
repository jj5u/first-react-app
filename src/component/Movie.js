import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Movie({ movieId, coverImg, title, summary, rating, genres }) {
  return (
    <div>
      <img src={coverImg} alt="title" />
      <h2>
        <Link to={`/movie/${movieId}`}>{title}</Link>
      </h2>
      <p>{summary}</p>
      <ul>
        <li>ratings: {rating}</li>
      </ul>
      <ul>
        {genres.map((genre, index) => (
          <li key={index}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
Movie.propTypes = {
  movieId: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Movie;
